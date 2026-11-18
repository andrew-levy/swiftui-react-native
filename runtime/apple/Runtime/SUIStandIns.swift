//
//  SUIStandIns.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/6/26.
//

import Combine
import CoreTransferable
import Foundation
import SwiftUI
import Symbols
import UniformTypeIdentifiers

@available(iOS 16.0, *)
extension SUIJSONValue: Transferable {
  static var transferRepresentation: some TransferRepresentation {
    CodableRepresentation(contentType: .json)
    ProxyRepresentation(exporting: { $0.plainText }, importing: { (text: String) in SUIJSONValue.string(text) })
  }

  private var plainText: String {
    switch self {
    case .string(let text): return text
    case .null: return ""
    case .bool(let value): return String(value)
    case .number(let value): return String(value)
    case .array, .object:
      guard let data = try? JSONEncoder().encode(self) else { return "" }
      return String(decoding: data, as: UTF8.self)
    }
  }
}

extension SUIJSONValue {
  private func member(_ key: String) -> SUIJSONValue {
    guard case .object(let fields) = self else { return .null }
    return fields[key] ?? .null
  }

  subscript(json key: String) -> SUIJSONValue { member(key) }
  subscript(optionalJSON key: String) -> SUIJSONValue? {
    if case .null = member(key) { return nil }
    return member(key)
  }
  subscript(string key: String) -> String {
    if case .string(let text) = member(key) { return text }
    return member(key).plainTextValue
  }
  subscript(optionalString key: String) -> String? {
    if case .null = member(key) { return nil }
    return self[string: key]
  }
  subscript(number key: String) -> Double {
    if case .number(let value) = member(key) { return value }
    return 0
  }
  subscript(bool key: String) -> Bool {
    if case .bool(let value) = member(key) { return value }
    return false
  }
  subscript(list key: String) -> [SUIJSONValue]? {
    if case .array(let items) = member(key) { return items }
    return nil
  }

  fileprivate var plainTextValue: String {
    switch self {
    case .string(let text): return text
    case .bool(let value): return String(value)
    case .number(let value): return String(value)
    default: return ""
    }
  }
}

extension SUI {
  static func memberName(_ value: Any?) throws -> String {
    guard let name = value as? String else { throw SUI.mismatch("the name of a property", value) }
    return name
  }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, SUIJSONValue> { \SUIJSONValue.[json: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, SUIJSONValue?> { \SUIJSONValue.[optionalJSON: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, String> { \SUIJSONValue.[string: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, String?> { \SUIJSONValue.[optionalString: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, Double> { \SUIJSONValue.[number: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, Bool> { \SUIJSONValue.[bool: try memberName(value)] }
  static func memberPath(_ value: Any?) throws -> KeyPath<SUIJSONValue, [SUIJSONValue]?> { \SUIJSONValue.[list: try memberName(value)] }

  static func decoded<T>(_ value: Any, _ decode: (Any) throws -> T) rethrows -> T { try decode(value) }
}

struct SUIError: LocalizedError, Hashable, Sendable {
  var errorDescription: String?
  var failureReason: String?
  var recoverySuggestion: String?
  var helpAnchor: String?

  init(_ value: Any?) throws {
    if let message = value as? String {
      errorDescription = message
      return
    }
    guard let fields = value as? [String: Any] else { throw SUI.mismatch("an error", value) }
    errorDescription = fields["errorDescription"] as? String
    failureReason = fields["failureReason"] as? String
    recoverySuggestion = fields["recoverySuggestion"] as? String
    helpAnchor = fields["helpAnchor"] as? String
  }

  var encoded: [String: Any] {
    var fields: [String: Any] = [:]
    if let errorDescription { fields["errorDescription"] = errorDescription }
    if let failureReason { fields["failureReason"] = failureReason }
    if let recoverySuggestion { fields["recoverySuggestion"] = recoverySuggestion }
    if let helpAnchor { fields["helpAnchor"] = helpAnchor }
    return fields
  }
}

struct SUIChainModifier: ViewModifier {
  let calls: [SUIModifierCall]
  let context: SUIContext

  init(_ value: Any?, _ context: SUIContext) throws {
    calls = try SUIModifierCall.chain(value)
    self.context = context
  }

  func body(content: Content) -> some View {
    content.suiModifiers(calls, context: context)
  }
}

extension SUIModifierCall {
  static func chain(_ value: Any?) throws -> [SUIModifierCall] {
    guard let object = value as? [String: Any], let list = object["$chain"] as? [[String: Any]] else {
      throw SUI.mismatch("a compose() chain", value)
    }
    return list.compactMap { entry in
      guard let name = entry["m"] as? String else { return nil }
      return SUIModifierCall(name: name, arguments: entry["a"] as? [Any] ?? [])
    }
  }
}

extension SUI {
  @available(iOS 16.0, *)
  static func language(_ value: Any?) throws -> Locale.Language { Locale.Language(identifier: try string(value)) }
  static func characterSet(_ value: Any?) throws -> CharacterSet { CharacterSet(charactersIn: try string(value)) }
  static func userDefaults(_ value: Any?) throws -> UserDefaults {
    let name = try string(value)
    return UserDefaults(suiteName: name) ?? .standard
  }
  static func urlSession(_ value: Any?) throws -> URLSession {
    switch try string(value) {
    case "shared": return .shared
    case "ephemeral": return URLSession(configuration: .ephemeral)
    case let other: throw SUI.mismatch("'shared' or 'ephemeral'", other)
    }
  }
  @available(iOS 26.0, *)
  static func lineHeight(_ value: Any?) throws -> AttributedString.LineHeight {
    if let name = value as? String {
      switch name {
      case "normal": return .normal
      case "tight": return .tight
      case "loose": return .loose
      default: throw SUI.mismatch("normal, tight or loose", value)
      }
    }
    guard let fields = value as? [String: Any], let key = fields.keys.first, fields.count == 1 else { throw SUI.mismatch("a line height", value) }
    let number = CGFloat(try SUI.double(fields[key]))
    switch key {
    case "exact": return .exact(points: number)
    case "multiple": return .multiple(factor: number)
    case "leading": return .leading(increase: number)
    default: throw SUI.mismatch("exact, multiple or leading", key)
    }
  }

  static func itemProvider(_ value: Any?) throws -> NSItemProvider { NSItemProvider(object: try string(value) as NSString) }
  static func optionalItemProvider(_ value: Any?) throws -> NSItemProvider? { try optional(value) { try itemProvider($0) } }
}

// MARK: - Publishers

enum SUIPublisher {
  static func decode(_ value: Any?) throws -> AnyPublisher<SUIJSONValue, Never> {
    guard let object = value as? [String: Any] else { throw SUI.mismatch("{ notification } or { every }", value) }
    if let name = object["notification"] as? String {
      return NotificationCenter.default.publisher(for: Notification.Name(name))
        .map { SUIJSONValue(["name": $0.name.rawValue, "object": $0.object.map { String(describing: $0) } as Any]) }
        .eraseToAnyPublisher()
    }
    if let seconds = (object["every"] as? NSNumber)?.doubleValue {
      return Timer.publish(every: seconds, on: .main, in: .common).autoconnect()
        .map { SUIJSONValue($0.timeIntervalSince1970 * 1000) }
        .eraseToAnyPublisher()
    }
    throw SUI.mismatch("{ notification } or { every }", value)
  }
}

// MARK: - Values with no fields to read

extension SUI {
  static func encodeCodable<T: Encodable>(_ value: T) -> Any {
    guard let data = try? JSONEncoder().encode(value) else { return NSNull() }
    return ["$codable": String(decoding: data, as: UTF8.self)]
  }

  static func decodeCodable<T: Decodable>(_ value: Any?, as type: T.Type) -> T? {
    guard let text = (value as? [String: Any])?["$codable"] as? String else { return nil }
    return try? JSONDecoder().decode(type, from: Data(text.utf8))
  }

  @available(iOS 17.0, *)
  static func symbolEffectOptions(_ value: Any?) throws -> SymbolEffectOptions {
    guard let fields = value as? [String: Any] else { throw SUI.mismatch("symbol effect options", value) }
    var options = SymbolEffectOptions.default
    if let speed = (fields["speed"] as? NSNumber)?.doubleValue { options = options.speed(speed) }
    if let count = (fields["repeat"] as? NSNumber)?.intValue { options = options.repeat(count) }
    if fields["repeating"] as? Bool == true { options = options.repeating }
    if fields["repeating"] as? Bool == false { options = options.nonRepeating }
    return options
  }

  static func encodeUserActivity(_ activity: NSUserActivity) -> Any {
    var fields: [String: Any] = ["activityType": activity.activityType]
    if let title = activity.title { fields["title"] = title }
    if let url = activity.webpageURL { fields["webpageURL"] = url.absoluteString }
    if let info = activity.userInfo { fields["userInfo"] = info.reduce(into: [String: Any]()) { $0[String(describing: $1.key)] = $1.value } }
    return fields
  }

  static func userActivityPatch(_ value: Any?) throws -> (NSUserActivity) -> Void {
    guard let fields = value as? [String: Any] else { throw SUI.mismatch("properties of a user activity", value) }
    return { activity in
      if let title = fields["title"] as? String { activity.title = title }
      if let url = fields["webpageURL"] as? String { activity.webpageURL = URL(string: url) }
      if let info = fields["userInfo"] as? [String: Any] { activity.userInfo = info }
      if let eligible = fields["isEligibleForHandoff"] as? Bool { activity.isEligibleForHandoff = eligible }
      if let eligible = fields["isEligibleForSearch"] as? Bool { activity.isEligibleForSearch = eligible }
      if let eligible = fields["isEligibleForPrediction"] as? Bool { activity.isEligibleForPrediction = eligible }
    }
  }
}

// MARK: - Recorded modifier chains

final class SUIRecordedChain {
  private let steps: [(name: String, arguments: SUITemplate)]
  private let context: SUIContext

  init(_ raw: Any?, _ context: SUIContext) throws {
    guard let object = (raw as? [String: Any])?["$ret"] as? [String: Any], let list = object["$chain"] as? [[String: Any]] else {
      throw SUI.mismatch("a closure returning a compose() chain", raw)
    }
    steps = try list.compactMap { entry in
      guard let name = entry["m"] as? String else { return nil }
      return (name, try SUITemplate(entry["a"] ?? [Any]()))
    }
    self.context = context
  }

  func apply<V: View>(to view: V, _ arguments: [Any]) -> AnyView {
    let frame = SUIProgramFrame(arguments: arguments)
    return view.suiModifiers(steps.map { SUIModifierCall(name: $0.name, arguments: ($0.arguments.resolve(frame) as? [Any]) ?? []) }, context: context)
  }
}

// MARK: - Keyframes

// Tracks are spelled out because KeyframesBuilder can't loop over them.
struct SUIKeyframeValues: Sendable {
  static let capacity = 8
  var keys: [String] = []
  var v0 = 0.0, v1 = 0.0, v2 = 0.0, v3 = 0.0, v4 = 0.0, v5 = 0.0, v6 = 0.0, v7 = 0.0

  init(_ raw: Any?) throws {
    guard let fields = raw as? [String: Any] else { throw SUI.mismatch("an object of numbers", raw) }
    guard fields.count <= Self.capacity else { throw SUI.mismatch("at most \(Self.capacity) animated values", raw) }
    keys = fields.keys.sorted()
    for (index, key) in keys.enumerated() { self[index] = try SUI.double(fields[key]) }
  }

  subscript(index: Int) -> Double {
    get { [v0, v1, v2, v3, v4, v5, v6, v7][index] }
    set {
      switch index {
      case 0: v0 = newValue
      case 1: v1 = newValue
      case 2: v2 = newValue
      case 3: v3 = newValue
      case 4: v4 = newValue
      case 5: v5 = newValue
      case 6: v6 = newValue
      default: v7 = newValue
      }
    }
  }

  var encoded: [String: Any] {
    keys.enumerated().reduce(into: [String: Any]()) { $0[$1.element] = self[$1.offset] }
  }
}

@available(iOS 17.0, *)
struct SUIKeyframeTracks: @unchecked Sendable {
  enum Frame {
    case linear(Double, TimeInterval, UnitCurve)
    case spring(Double, TimeInterval?, Spring)
    case cubic(Double, TimeInterval)
    case move(Double)
  }

  private let frames: [String: [Frame]]

  init(_ raw: Any?, _ context: SUIContext) throws {
    guard let tracks = raw as? [String: Any] else { throw SUI.mismatch("keyframes by value name", raw) }
    frames = try tracks.mapValues { value in
      guard let list = value as? [[String: Any]] else { throw SUI.mismatch("a list of keyframes", value) }
      return try list.map { frame in
        let to = try SUI.double(frame["to"])
        let duration = try (frame["duration"]).map { try SUI.double($0) }
        switch frame["kind"] as? String {
        case "linear":
          let curve = try frame["timingCurve"].map { try SUIValues.decode_UnitCurve($0, context) } ?? .linear
          return .linear(to, duration ?? 0, curve)
        case "spring":
          let spring = try frame["spring"].map { try SUIValues.decode_Spring($0, context) } ?? Spring()
          return .spring(to, duration, spring)
        case "cubic": return .cubic(to, duration ?? 0)
        case "move": return .move(to)
        default: throw SUI.mismatch("linear, spring, cubic or move", frame["kind"])
        }
      }
    }
  }

  private func list(_ value: SUIKeyframeValues, _ index: Int) -> [Frame] {
    index < value.keys.count ? frames[value.keys[index]] ?? [] : []
  }

  @KeyframeTrackContentBuilder<Double>
  private func track(_ list: [Frame]) -> some KeyframeTrackContent<Double> {
    for frame in list {
      switch frame {
      case .linear(let to, let duration, let curve): LinearKeyframe(to, duration: duration, timingCurve: curve)
      case .spring(let to, let duration, let spring): SpringKeyframe(to, duration: duration, spring: spring)
      case .cubic(let to, let duration): CubicKeyframe(to, duration: duration)
      case .move(let to): MoveKeyframe(to)
      }
    }
  }

  @KeyframesBuilder<SUIKeyframeValues>
  func keyframes(_ value: SUIKeyframeValues) -> some Keyframes<SUIKeyframeValues> {
    KeyframeTrack(\SUIKeyframeValues.v0) { track(list(value, 0)) }
    KeyframeTrack(\SUIKeyframeValues.v1) { track(list(value, 1)) }
    KeyframeTrack(\SUIKeyframeValues.v2) { track(list(value, 2)) }
    KeyframeTrack(\SUIKeyframeValues.v3) { track(list(value, 3)) }
    KeyframeTrack(\SUIKeyframeValues.v4) { track(list(value, 4)) }
    KeyframeTrack(\SUIKeyframeValues.v5) { track(list(value, 5)) }
    KeyframeTrack(\SUIKeyframeValues.v6) { track(list(value, 6)) }
    KeyframeTrack(\SUIKeyframeValues.v7) { track(list(value, 7)) }
  }
}

// MARK: - Table columns

struct SUITableColumn: Identifiable, @unchecked Sendable {
  let id: String
  let title: String
  let value: String?
  let cell: (([Any]) -> AnyView)?

  static func list(_ raw: Any?, _ context: SUIContext) throws -> [SUITableColumn] {
    guard let list = raw as? [[String: Any]] else { throw SUI.mismatch("a list of columns", raw) }
    return try list.enumerated().map { index, fields in
      let title = try SUI.string(fields["title"])
      return SUITableColumn(
        id: fields["id"] as? String ?? "\(index):\(title)", title: title, value: fields["value"] as? String,
        cell: try fields["cell"].map { try context.renderClosure($0) })
    }
  }

  @ViewBuilder
  func content(_ row: SUIJSONValue) -> some View {
    if let cell {
      cell([SUI.encode(row)])
    } else if let value {
      Text(row[string: value])
    }
  }
}

@available(iOS 17.4, *)
extension SUITableColumn {
  @TableColumnBuilder<SUIJSONValue, Never>
  static func columns(_ list: [SUITableColumn]) -> some TableColumnContent<SUIJSONValue, Never> {
    TableColumnForEach(list) { column in
      TableColumn(column.title) { (row: SUIJSONValue) in column.content(row) }
    }
  }
}
