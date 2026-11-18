//
//  SUINode.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/5/26.
//

import SwiftUI
import UIKit

final class SUINode: ObservableObject {
  let component: String
  @Published private(set) var props: [String: Any] = [:]
  @Published private(set) var modifiers: [SUIModifierCall] = []
  @Published private(set) var children: [SUIChild] = []
  private var slotNodes: [String: SUINode] = [:]
  @Published var state: [String: Any] = [:]

  let context = SUIContext()
  /// Unique for the lifetime of the process (object addresses are reused after deallocation).
  let serial = SUINode.nextSerial()
  private static var serialCounter = 0
  private static func nextSerial() -> Int {
    serialCounter += 1
    return serialCounter
  }
  weak var host: SUINodeHostView?
  private let render: (SUINode) throws -> AnyView
  private var reportedErrors = Set<String>()
  private var reportedOverload: String?
  var consumedModifiers = 0

  let family: String?

  init(component: String, family: String? = nil, render: @escaping (SUINode) throws -> AnyView) {
    self.component = component
    self.family = family
    self.render = render
  }

  // MARK: Updates (from the host)

  func setProps(_ newProps: [String: Any]) { props = newProps }
  func setModifiers(_ calls: [SUIModifierCall]) { modifiers = calls }
  func setChildren(_ newChildren: [SUIChild]) {
    children = newChildren
    slotNodes = [:]
    for case .node(let node) in newChildren {
      if let name = node.slotName { slotNodes[name] = node }
    }
  }

  // MARK: Identity

  var partName: String? { props["$part"] as? String }
  var slotName: String? { props["$slot"] as? String }

  // MARK: Props

  func has(_ key: String) -> Bool {
    guard let value = props[key] else { return false }
    return !SUI.isUndefined(value)
  }

  func prop<T>(_ key: String, _ decode: (Any) throws -> T) throws -> T {
    guard has(key), let value = props[key] else { throw SUIDecodeError.mismatch("missing prop '\(key)'") }
    do {
      return try decode(value)
    } catch let error as SUIDecodeError {
      throw SUIDecodeError.mismatch("prop '\(key)': \(error)")
    }
  }

  func prop<T>(_ key: String, default fallback: () -> T, _ decode: (Any) throws -> T) throws -> T {
    has(key) ? try prop(key, decode) : fallback()
  }

  func expect(allowed: Set<String>, required: Set<String>, nodes: Bool) throws {
    for key in props.keys where !key.hasPrefix("$") && !allowed.contains(key) && has(key) {
      throw SUIDecodeError.mismatch("takes no prop '\(key)'")
    }
    for key in required where !has(key) {
      throw SUIDecodeError.mismatch("missing prop '\(key)'")
    }
    if !nodes, children.contains(where: { !$0.isPartOrSlot }) {
      throw SUIDecodeError.mismatch("takes no children")
    }
  }

  func expectFamily(_ family: String) throws {
    guard !familyChildren(family).isEmpty else { throw SUIDecodeError.mismatch("needs \(family) children") }
  }

  func familyChildren(_ family: String) -> [SUINode] {
    children.compactMap { child in
      if case .node(let node) = child, node.family == family { return node }
      return nil
    }
  }

  func familyChildren(_ family: String, inSlot name: String) -> [SUINode] {
    slotNodes[name]?.familyChildren(family) ?? []
  }

  func didRender(_ overload: String) {
    guard props["$probe"] != nil, reportedOverload != overload else { return }
    reportedOverload = overload
    context.reportRendered(overload)
  }

  func string(_ key: String) -> String? { try? prop(key) { try SUI.string($0) } }
  func bool(_ key: String) -> Bool? { try? prop(key) { try SUI.bool($0) } }
  func double(_ key: String) -> Double? { try? prop(key) { try SUI.double($0) } }

  func binding<T>(
    _ key: String, defaultKey: String, event: String, fallback: T, _ decode: @escaping (Any) throws -> T
  ) -> Binding<T> {
    Binding(
      get: { [weak self] in
        guard let self else { return fallback }
        if self.has(key), let value = try? self.prop(key, decode) { return value }
        if let value = self.state[key], let decoded = try? decode(value) { return decoded }
        if self.has(defaultKey), let value = try? self.prop(defaultKey, decode) { return value }
        return fallback
      },
      set: { [weak self] newValue in
        guard let self else { return }
        if !self.has(key) { self.state[key] = SUI.encode(newValue) }
        self.context.emit(event, [newValue])
      })
  }

  // MARK: Children

  var content: SUIChildrenView {
    SUIChildrenView(children: children.filter { !$0.isPartOrSlot }, owner: host)
  }

  func parts(_ name: String) -> [SUINode] {
    children.compactMap { child in
      if case .node(let node) = child, node.partName == name { return node }
      return nil
    }
  }

  func part(_ name: String) -> SUINode? { parts(name).first }

  func slotView(_ name: String) -> AnyView? {
    slotNodes[name].map { AnyView(SUISlotContentView(node: $0)) }
  }

  func elementView(_ element: SUIElement) -> AnyView {
    slotView("el:\(element.id)") ?? AnyView(EmptyView())
  }

  // MARK: Rendering

  func renderContent() -> AnyView {
    consumedModifiers = 0
    do {
      return try render(self)
    } catch {
      reportOnce(error, in: "<\(component)>")
      return AnyView(EmptyView())
    }
  }

  func reportOnce(_ error: Error, in api: String) {
    let message = "\(api): \(error)"
    guard reportedErrors.insert(message).inserted else { return }
    context.report(error, in: api)
  }
}

enum SUIChild: Identifiable {
  case node(SUINode)
  case react(UIView, mount: Int)

  var id: String {
    switch self {
    case .node(let node): return "node:\(node.serial)"
    case .react(_, let mount): return "react:\(mount)"
    }
  }

  var isPartOrSlot: Bool {
    if case .node(let node) = self { return node.partName != nil || node.slotName != nil }
    return false
  }
}

private struct SUINamespaceKey: EnvironmentKey {
  static let defaultValue: Namespace.ID? = nil
}

extension EnvironmentValues {
  var suiNamespace: Namespace.ID? {
    get { self[SUINamespaceKey.self] }
    set { self[SUINamespaceKey.self] = newValue }
  }
}

struct SUINodeView: View {
  @ObservedObject var node: SUINode
  @Environment(\.suiNamespace) private var inheritedNamespace
  @Namespace private var localNamespace

  init(node: SUINode) {
    self.node = node
  }

  var body: some View {
    let namespace = inheritedNamespace ?? localNamespace
    node.context.namespace = namespace
    let content = node.renderContent()
    return content
      .suiModifiers(Array(node.modifiers.dropFirst(node.consumedModifiers)), context: node.context)
      .environment(\.suiNamespace, namespace)
  }
}

struct SUISlotContentView: View {
  @ObservedObject var node: SUINode

  var body: some View { node.content }
}

struct SUIDynamicSlotView: View {
  @ObservedObject var node: SUINode
  let name: String

  var body: some View { node.slotView(name) ?? AnyView(EmptyView()) }
}

struct SUIChildrenView: View {
  let children: [SUIChild]
  weak var owner: SwiftUIHostView?

  var body: some View {
    ForEach(children) { child in
      switch child {
      case .node(let node): SUINodeView(node: node)
      case .react(let view, let mount): ReactChildView(view: view, owner: owner, identity: mount)
      }
    }
  }
}

struct SUIScope {
  let id: Int
  let name: String
  let arguments: [Any]

  init?(_ value: Any?) {
    guard let object = value as? [String: Any], let id = object["id"] as? Int, let name = object["name"] as? String else {
      return nil
    }
    self.id = id
    self.name = name
    arguments = object["args"] as? [Any] ?? []
  }
}

enum SUIScopedCommit {
  private static var open: (scope: SUIScope, context: SUIContext, updates: [() -> Void])?

  static func add(_ scope: SUIScope, _ context: SUIContext, _ update: @escaping () -> Void) {
    if open?.scope.id == scope.id {
      open?.updates.append(update)
      return
    }
    flush()
    open = (scope, context, [update])
    // Twice: the updates of this transaction that were deferred to the next turn come first.
    DispatchQueue.main.async { DispatchQueue.main.async { flush() } }
  }

  static func join(_ update: @escaping () -> Void) -> Bool {
    guard open != nil else { return false }
    open?.updates.append(update)
    return true
  }

  private static func flush() {
    guard let commit = open else { return }
    open = nil
    let apply = { commit.updates.forEach { $0() } }
    do {
      try SUIGeneratedScopes.perform(commit.scope.name, commit.scope.arguments, commit.context, apply)
    } catch {
      commit.context.report(error, in: "\(commit.scope.name)()")
      apply()
    }
  }
}

class SUINodeHostView: SwiftUIHostView {
  class var componentName: String { "" }
  class var family: String? { nil }
  class func render(_ node: SUINode) throws -> AnyView { AnyView(EmptyView()) }

  private(set) lazy var node = SUINode(component: Self.componentName, family: Self.family, render: Self.render)
  override var defersContentInstallation: Bool { true }
  private weak var parentHost: SUINodeHostView?
  private var inlineChildren: [SUINodeHostView] = []
  private var appliedScope: Int?
  private var isMounted = false

  override func setUp() {
    node.host = self
    node.context.dispatch = { [weak self] payload in self?.onEvent?(payload) }
    node.context.slotProvider = { [weak node] name in node?.slotView(name) }
    node.context.familyProvider = { [weak node] family, slot in node?.familyChildren(family, inSlot: slot) ?? [] }
    node.context.dynamicSlotProvider = { [weak node] name in
      node.map { AnyView(SUIDynamicSlotView(node: $0, name: name)) }
    }
    setContent(SUINodeView(node: node))
    DispatchQueue.main.async { [weak self] in self?.isMounted = true }
  }

  override func applyProps(_ changes: [String: Any]) {
    let props = changes["nodeProps"].map(Self.object(fromJSON:))
    let apply = { [self] in
      if let props { node.setProps(props) }
      if let json = changes["modifiers"] { node.setModifiers(SUIModifierCall.list(fromJSON: json)) }
      node.context.resetBindingOverrides()
      contentDidChange()
      invalidateConsumers()
    }
    if let scope = SUIScope(props?["$scope"]), scope.id != appliedScope {
      appliedScope = scope.id
      SUIScopedCommit.add(scope, node.context, apply)
    } else if !SUIScopedCommit.join(apply) {
      apply()
    }
  }

  private func invalidateConsumers() {
    var current = node
    var owner = parentHost
    while current.slotName != nil || current.family != nil, let host = owner {
      host.node.objectWillChange.send()
      current = host.node
      owner = host.parentHost
    }
  }

  override func reactChildrenDidChange() {
    var attached: [SUINodeHostView] = []
    let children: [SUIChild] = reactChildren.map { view in
      if let child = view.swiftUIHost as? SUINodeHostView {
        attached.append(child)
        return .node(child.node)
      }
      return .react(view, mount: reactChildID(for: view))
    }
    for previous in inlineChildren where !attached.contains(where: { $0 === previous }) {
      previous.parentHost = nil
      previous.measurementOwner = nil
    }
    for child in attached {
      child.parentHost = self
      child.measurementOwner = self
    }
    inlineChildren = attached
    let apply = { [self] in
      node.setChildren(children)
      contentDidChange()
      invalidateConsumers()
    }
    // Fabric inserts views before it updates props, so a commit's scope isn't known yet.
    if isMounted {
      DispatchQueue.main.async { if !SUIScopedCommit.join(apply) { apply() } }
    } else {
      apply()
    }
  }

  func contentDidChange() {
    if let parentHost {
      parentHost.contentDidChange()
    } else {
      setNeedsMeasurement()
    }
  }

  private static func object(fromJSON value: Any?) -> [String: Any] {
    guard let text = value as? String, let data = text.data(using: .utf8),
      let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
    else {
      return [:]
    }
    return object
  }
}
