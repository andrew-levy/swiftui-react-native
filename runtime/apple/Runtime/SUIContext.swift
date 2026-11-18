//
//  SUIContext.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/6/26.
//

import SwiftUI

final class SUIContext {
  var dispatch: (([String: Any]) -> Void)?
  var slotProvider: ((String) -> AnyView?)?
  var familyProvider: ((_ family: String, _ slot: String) -> [SUINode])?
  var dynamicSlotProvider: ((String) -> AnyView?)?

  var namespace: Namespace.ID?

  private var bindingOverrides: [String: Any] = [:]

  private var requestedRenders: [String: [String]] = [:]
  /// Must match `MAX_RENDERS_PER_CLOSURE` in runtime/react-native/runtime/bridge.ts.
  private static let maxRendersPerClosure = 256

  private var handles: [String: SUIHandleValue] = [:]
  private lazy var serial = SUIHandles.register(self)

  init() {}

  nonisolated(unsafe) static let detached = SUIContext()

  deinit {
    SUIHandles.unregister(serial)
  }

  // MARK: Handles

  func handle(_ id: String) -> SUIHandleValue? { handles[id] }

  func resolveHandles(_ value: Any, site: String) -> Any {
    switch value {
    case let handle as SUIHandleValue:
      let id = "\(serial)/\(site)"
      handles[id] = handle
      var object = handle.properties.reduce(into: [String: Any]()) { result, property in
        result[property.key] = resolveHandles(property.value, site: "\(site).\(property.key)")
      }
      object["$handle"] = id
      object["$methods"] = handle.methods
      return object
    case let array as [Any]:
      return array.enumerated().map { resolveHandles($1, site: "\(site).\($0)") }
    case let object as [String: Any]:
      return object.reduce(into: [String: Any]()) { $0[$1.key] = resolveHandles($1.value, site: "\(site).\($1.key)") }
    default:
      return value
    }
  }

  // MARK: Events

  func invoke(_ id: String, _ arguments: [Any] = []) {
    dispatch?(["$fn": id, "args": resolveHandles(arguments.map(SUI.encode), site: id)])
  }

  func emit(_ event: String, _ arguments: [Any] = []) {
    dispatch?(["$event": event, "args": arguments.map(SUI.encode)])
  }

  func report(_ error: Error, in api: String) {
    dispatch?(["$error": "\(api): \(error)"])
  }

  func reportRendered(_ overload: String) {
    dispatch?(["$rendered": overload])
  }

  // MARK: Decoding bridged references

  func callback(_ value: Any?) throws -> (_ arguments: [Any]) -> Void {
    guard let object = value as? [String: Any], let id = object["$fn"] as? String else {
      throw SUI.mismatch("a function", value)
    }
    return { [weak self] arguments in self?.invoke(id, arguments) }
  }

  func namespaceID(_ value: Any?) throws -> Namespace.ID {
    guard let namespace else { throw SUIDecodeError.mismatch("no SwiftUI namespace available yet") }
    return namespace
  }

  func slot(_ value: Any?) throws -> AnyView {
    if let string = value as? String { return AnyView(Text(string)) }
    if let number = value as? NSNumber, CFGetTypeID(number) != CFBooleanGetTypeID() { return AnyView(Text(number.stringValue)) }
    guard let object = value as? [String: Any], let name = object["$slot"] as? String else {
      throw SUI.mismatch("React content", value)
    }
    return slotProvider?(name) ?? AnyView(EmptyView())
  }

  func renderClosure(_ value: Any?) throws -> (_ arguments: [Any]) -> AnyView {
    guard let object = value as? [String: Any], let id = object["$fn"] as? String else {
      let view = try slot(value)
      return { _ in view }
    }
    return { [weak self] arguments in
      guard let self else { return AnyView(EmptyView()) }
      let arguments = self.resolveHandles(arguments, site: id) as? [Any] ?? []
      let name = "\(id)#\(SUI.stableKey(arguments))"
      self.requestRender(id, name, arguments)
      return self.dynamicSlotProvider?(name) ?? AnyView(EmptyView())
    }
  }

  private func requestRender(_ id: String, _ name: String, _ arguments: [Any]) {
    var requested = requestedRenders[id] ?? []
    guard !requested.contains(name) else { return }
    requested.append(name)
    if requested.count > Self.maxRendersPerClosure { requested.removeFirst() }
    requestedRenders[id] = requested
    // Closures run during SwiftUI's update: leave it before touching React state.
    DispatchQueue.main.async { [weak self] in
      self?.dispatch?(["$render": id, "key": name, "args": arguments])
    }
  }

  func familyNodes(_ value: Any?, _ family: String) throws -> [SUINode] {
    guard let object = value as? [String: Any], let name = object["$slot"] as? String,
      let nodes = familyProvider?(family, name), !nodes.isEmpty
    else {
      throw SUI.mismatch("\(family) content", value)
    }
    return nodes
  }

  func elements(_ value: Any?) throws -> [SUIElement] {
    guard let object = value as? [String: Any], let keys = object["$elements"] as? [String] else {
      throw SUI.mismatch("a collection", value)
    }
    return keys.map(SUIElement.init(id:))
  }

  func binding<T>(
    _ value: Any?, _ decode: @escaping (Any) throws -> T, encode: @escaping (T) -> Any = { SUI.encode($0) }
  ) throws -> Binding<T> {
    guard let object = value as? [String: Any], let id = object["$binding"] as? String else {
      throw SUI.mismatch("a binding", value)
    }
    let initial = try decode(object["value"] ?? NSNull())
    return Binding(
      get: { [weak self] in
        guard let override = self?.bindingOverrides[id], let value = try? decode(override) else { return initial }
        return value
      },
      set: { [weak self] newValue in
        let encoded = encode(newValue)
        self?.bindingOverrides[id] = encoded
        self?.dispatch?(["$binding": id, "value": encoded])
      })
  }

  func resetBindingOverrides() {
    bindingOverrides.removeAll()
  }
}

struct SUIElement: Identifiable, Hashable {
  let id: String
}

struct SUIModifierCall {
  let name: String
  let arguments: [Any]

  static func list(fromJSON json: Any?) -> [SUIModifierCall] {
    guard let text = json as? String, let data = text.data(using: .utf8),
      let list = try? JSONSerialization.jsonObject(with: data, options: [.fragmentsAllowed]) as? [[String: Any]]
    else {
      return []
    }
    return list.compactMap { entry in
      guard let name = entry["m"] as? String else { return nil }
      return SUIModifierCall(name: name, arguments: entry["a"] as? [Any] ?? [])
    }
  }
}

extension View {
  func suiModifiers(_ calls: [SUIModifierCall], context: SUIContext) -> AnyView {
    var view = AnyView(self)
    for call in calls {
      do {
        switch call.name {
        case "symbolEffect": view = try SUISymbolEffects.apply(view, call.arguments)
        case "$focusToken": view = try SUIFocusTokens.apply(view, call.arguments, context)
        default: view = try SUIGeneratedModifiers.apply(call.name, to: view, call.arguments, context)
        }
      } catch {
        context.report(error, in: ".\(call.name)()")
      }
    }
    return view
  }
}
