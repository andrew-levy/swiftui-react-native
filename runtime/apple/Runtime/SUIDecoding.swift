//
//  SUIDecoding.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/5/26.
//

import CoreGraphics
import Foundation
import SwiftUI
import UIKit
import UniformTypeIdentifiers

enum SUIDecodeError: Error, CustomStringConvertible {
  case mismatch(String)
  case unavailable(String)
  case unknownModifier(String)
  case noMatchingOverload(String, [String])

  var description: String {
    switch self {
    case .mismatch(let reason): return reason
    case .unavailable(let api): return "\(api) is not available on this OS version"
    case .unknownModifier(let name): return "Unknown modifier '\(name)'"
    case .noMatchingOverload(let name, let reasons):
      return "No overload of '\(name)' accepts these arguments:\n  - " + reasons.joined(separator: "\n  - ")
    }
  }
}

enum SUI {
  // MARK: Tags

  static func isUndefined(_ value: Any?) -> Bool {
    guard let value else { return true }
    if let object = value as? [String: Any], object.count == 1, object["$u"] != nil { return true }
    return false
  }

  static func isNull(_ value: Any?) -> Bool {
    value is NSNull
  }

  // MARK: Primitives

  private static func number(_ value: Any?) -> NSNumber? {
    // JSON has no infinity / NaN: JavaScript sends `{ "$inf": ±1 }` / `{ "$nan": true }`.
    if let object = value as? [String: Any], object.count == 1 {
      if let sign = object["$inf"] as? NSNumber {
        return NSNumber(value: sign.doubleValue < 0 ? -Double.infinity : Double.infinity)
      }
      if object["$nan"] != nil { return NSNumber(value: Double.nan) }
      return nil
    }
    guard let number = value as? NSNumber, CFGetTypeID(number) != CFBooleanGetTypeID() else { return nil }
    return number
  }

  static func bool(_ value: Any?) throws -> Bool {
    guard let number = value as? NSNumber, CFGetTypeID(number) == CFBooleanGetTypeID() else {
      throw mismatch("a boolean", value)
    }
    return number.boolValue
  }

  static func double(_ value: Any?) throws -> Double {
    guard let number = number(value) else { throw mismatch("a number", value) }
    return number.doubleValue
  }

  static func cgFloat(_ value: Any?) throws -> CGFloat {
    CGFloat(try double(value))
  }

  static func float(_ value: Any?) throws -> Float {
    Float(try double(value))
  }

  static func int<T: BinaryInteger>(_ value: Any?, as type: T.Type = Int.self) throws -> T {
    let double = try double(value)
    guard double.rounded() == double, let result = T(exactly: double) else {
      throw mismatch("an integer of type \(T.self)", value)
    }
    return result
  }

  static func string(_ value: Any?) throws -> String {
    guard let string = value as? String else { throw mismatch("a string", value) }
    return string
  }

  // expo-font aliases only resolve through UIFont: SwiftUI.Font.custom never sees them.
  static func fontName(_ value: Any?) throws -> String {
    let name = try string(value)
    if UIFont(name: name, size: 12) != nil { return name }
    return UIFont.fontNames(forFamilyName: name).first ?? name
  }

  private static let loadedImages = NSCache<NSString, UIImage>()

  // Synchronous: a decoder has to return the image. Bundled files are local; only Metro's dev server is a request.
  static func uiImage(_ value: Any?) throws -> UIImage {
    let fields = try fields(value, allowed: ["uri", "scale"], required: ["uri"])
    let uri: String = try fields.value("uri") { try string($0) }
    let scale: CGFloat = try fields.value("scale", default: { 1 }) { try cgFloat($0) }
    let key = "\(uri)@\(scale)" as NSString
    if let image = loadedImages.object(forKey: key) { return image }
    guard let url = URL(string: uri), let data = try? Data(contentsOf: url), let image = UIImage(data: data, scale: scale) else {
      throw mismatch("a loadable image", value)
    }
    loadedImages.setObject(image, forKey: key)
    return image
  }

  static func text(_ value: Any?) throws -> Text {
    Text(verbatim: try string(value))
  }

  static func localizedStringKey(_ value: Any?) throws -> LocalizedStringKey {
    LocalizedStringKey(try string(value))
  }

  static func attributedString(_ value: Any?) throws -> AttributedString {
    AttributedString(try string(value))
  }

  static func url(_ value: Any?) throws -> URL {
    guard let url = URL(string: try string(value)) else { throw mismatch("a URL", value) }
    return url
  }

  static func date(_ value: Any?) throws -> Date {
    if let number = number(value) { return Date(timeIntervalSince1970: number.doubleValue / 1000) }
    let text = try string(value)
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    if let date = formatter.date(from: text) ?? ISO8601DateFormatter().date(from: text) { return date }
    throw mismatch("a date", value)
  }

  static func dateComponents(_ value: Any?) throws -> DateComponents {
    guard let object = value as? [String: Any], !object.isEmpty else { throw mismatch("date components", value) }
    var components = DateComponents()
    for (key, raw) in object {
      let number: Int = try int(raw)
      switch key {
      case "era": components.era = number
      case "year": components.year = number
      case "month": components.month = number
      case "day": components.day = number
      case "hour": components.hour = number
      case "minute": components.minute = number
      case "second": components.second = number
      default: throw mismatch("date components", value)
      }
    }
    return components
  }

  static func lineCap(_ value: Any?) throws -> CGLineCap {
    switch try string(value) {
    case "butt": return .butt
    case "round": return .round
    case "square": return .square
    default: throw mismatch("a line cap", value)
    }
  }

  static func lineJoin(_ value: Any?) throws -> CGLineJoin {
    switch try string(value) {
    case "miter": return .miter
    case "round": return .round
    case "bevel": return .bevel
    default: throw mismatch("a line join", value)
    }
  }

  static func required<T>(_ value: T?, _ api: String) throws -> T {
    guard let value else { throw SUIDecodeError.mismatch("\(api) rejected these arguments") }
    return value
  }

  static func utType(_ value: Any?) throws -> UTType {
    guard let type = UTType(try string(value)) else { throw mismatch("a uniform type identifier", value) }
    return type
  }

  static func keyboardType(_ value: Any?) throws -> UIKeyboardType {
    switch try string(value) {
    case "default": return .default
    case "asciiCapable": return .asciiCapable
    case "numbersAndPunctuation": return .numbersAndPunctuation
    case "URL": return .URL
    case "numberPad": return .numberPad
    case "phonePad": return .phonePad
    case "namePhonePad": return .namePhonePad
    case "emailAddress": return .emailAddress
    case "decimalPad": return .decimalPad
    case "twitter": return .twitter
    case "webSearch": return .webSearch
    case "asciiCapableNumberPad": return .asciiCapableNumberPad
    default: throw mismatch("a keyboard type", value)
    }
  }

  static func autocapitalizationType(_ value: Any?) throws -> UITextAutocapitalizationType {
    switch try string(value) {
    case "none": return .none
    case "words": return .words
    case "sentences": return .sentences
    case "allCharacters": return .allCharacters
    default: throw mismatch("an autocapitalization type", value)
    }
  }

  static func textContentType(_ value: Any?) throws -> UITextContentType {
    let name = try string(value)
    let named: [String: UITextContentType] = [
      "name": .name, "namePrefix": .namePrefix, "givenName": .givenName, "middleName": .middleName,
      "familyName": .familyName, "nameSuffix": .nameSuffix, "nickname": .nickname, "jobTitle": .jobTitle,
      "organizationName": .organizationName, "location": .location, "fullStreetAddress": .fullStreetAddress,
      "streetAddressLine1": .streetAddressLine1, "streetAddressLine2": .streetAddressLine2,
      "addressCity": .addressCity, "addressState": .addressState,
      "addressCityAndState": .addressCityAndState, "sublocality": .sublocality,
      "countryName": .countryName, "postalCode": .postalCode, "telephoneNumber": .telephoneNumber,
      "emailAddress": .emailAddress, "URL": .URL, "creditCardNumber": .creditCardNumber,
      "username": .username, "password": .password, "newPassword": .newPassword,
      "oneTimeCode": .oneTimeCode,
    ]
    return named[name] ?? UITextContentType(rawValue: name)
  }

  static func taskPriority(_ value: Any?) throws -> TaskPriority {
    switch try string(value) {
    case "high": return .high
    case "medium": return .medium
    case "low": return .low
    case "background": return .background
    case "userInitiated": return .userInitiated
    case "utility": return .utility
    default: throw mismatch("a task priority", value)
    }
  }

  static func uuid(_ value: Any?) throws -> UUID {
    guard let uuid = UUID(uuidString: try string(value)) else { throw mismatch("a UUID", value) }
    return uuid
  }

  // MARK: Structure

  static func valueChain(_ value: Any?) -> (base: Any, calls: [SUIModifierCall])? {
    guard let object = value as? [String: Any], object.count == 2, let base = object["$base"],
      let calls = object["$calls"] as? [[String: Any]]
    else {
      return nil
    }
    return (base, calls.compactMap { call in
      guard let name = call["m"] as? String else { return nil }
      return SUIModifierCall(name: name, arguments: call["a"] as? [Any] ?? [])
    })
  }

  static func conformer(_ value: Any?) -> (type: String, value: Any)? {
    guard let object = value as? [String: Any], let type = object["$type"] as? String else { return nil }
    return (type, object["value"] ?? [String: Any]())
  }

  static func decode<T>(_ value: Any, _ decode: (Any) throws -> T) throws -> T {
    try decode(value)
  }

  static func optional<T>(_ value: Any?, _ decode: (Any) throws -> T) throws -> T? {
    guard let value, !(value is NSNull) else { return nil }
    return try decode(value)
  }

  static func array<T>(_ value: Any?, _ decode: (Any) throws -> T) throws -> [T] {
    guard let array = value as? [Any] else { throw mismatch("an array", value) }
    return try array.map(decode)
  }

  static func dictionary<T>(_ value: Any?, _ decode: (Any) throws -> T) throws -> [String: T] {
    guard let object = object(value) else { throw mismatch("an object", value) }
    return try object.mapValues(decode)
  }

  static func object(_ value: Any?) -> [String: Any]? {
    guard let object = value as? [String: Any] else { return nil }
    if object.keys.contains(where: { $0.hasPrefix("$") }) { return nil }
    return object
  }

  static func payload<T>(_ value: Any?, _ name: String, _ decode: (Any) throws -> T) throws -> T {
    try decode(try payload(value, name))
  }

  static func payload(_ value: Any?, _ name: String) throws -> Any {
    guard let object = object(value), object.count == 1, let payload = object[name] else {
      throw mismatch("{ \(name): ... }", value)
    }
    return payload
  }

  static func fields(_ value: Any?, allowed: Set<String>, required: Set<String>) throws -> SUIFields {
    guard let object = object(value) else { throw mismatch("an object", value) }
    for key in object.keys where !allowed.contains(key) {
      throw mismatch("an object without '\(key)'", value)
    }
    for key in required where object[key] == nil {
      throw mismatch("an object with '\(key)'", value)
    }
    return SUIFields(values: object)
  }

  static func range<T: Comparable>(_ value: Any?, _ decode: (Any) throws -> T) throws -> ClosedRange<T> {
    let bounds = try array(value, decode)
    guard bounds.count == 2, bounds[0] <= bounds[1] else { throw mismatch("[lowerBound, upperBound]", value) }
    return bounds[0]...bounds[1]
  }

  static func halfOpenRange<T: Comparable>(_ value: Any?, _ decode: (Any) throws -> T) throws -> Range<T> {
    let bounds = try array(value, decode)
    guard bounds.count == 2, bounds[0] <= bounds[1] else { throw mismatch("[lowerBound, upperBound]", value) }
    return bounds[0]..<bounds[1]
  }

  static func optionSet<T: SetAlgebra>(_ value: Any?, _ element: (Any) throws -> T) throws -> T {
    if let array = value as? [Any] {
      var result = T()
      for item in array { result.formUnion(try element(item)) }
      return result
    }
    return try element(value as Any)
  }

  // MARK: Core Graphics

  static func cgPoint(_ value: Any?) throws -> CGPoint {
    let fields = try fields(value, allowed: ["x", "y"], required: ["x", "y"])
    return CGPoint(x: try cgFloat(fields["x"]), y: try cgFloat(fields["y"]))
  }

  static func cgSize(_ value: Any?) throws -> CGSize {
    let fields = try fields(value, allowed: ["width", "height"], required: ["width", "height"])
    return CGSize(width: try cgFloat(fields["width"]), height: try cgFloat(fields["height"]))
  }

  static func cgRect(_ value: Any?) throws -> CGRect {
    let fields = try fields(value, allowed: ["x", "y", "width", "height"], required: ["x", "y", "width", "height"])
    return CGRect(
      x: try cgFloat(fields["x"]), y: try cgFloat(fields["y"]),
      width: try cgFloat(fields["width"]), height: try cgFloat(fields["height"]))
  }

  static func cgVector(_ value: Any?) throws -> CGVector {
    let fields = try fields(value, allowed: ["dx", "dy"], required: ["dx", "dy"])
    return CGVector(dx: try cgFloat(fields["dx"]), dy: try cgFloat(fields["dy"]))
  }

  static func cgAffineTransform(_ value: Any?) throws -> CGAffineTransform {
    let keys: Set<String> = ["a", "b", "c", "d", "tx", "ty"]
    let fields = try fields(value, allowed: keys, required: keys)
    return CGAffineTransform(
      a: try cgFloat(fields["a"]), b: try cgFloat(fields["b"]), c: try cgFloat(fields["c"]),
      d: try cgFloat(fields["d"]), tx: try cgFloat(fields["tx"]), ty: try cgFloat(fields["ty"]))
  }

  // MARK: Generic values

  static func json(_ value: Any?) throws -> SUIJSONValue {
    SUIJSONValue(value)
  }

  // MARK: Encoding (closure arguments, binding values)

  static func encode(_ value: Any?) -> Any {
    switch value {
    case nil: return NSNull()
    case is Void: return NSNull()
    case let value as SUIJSONValue: return value.foundationValue
    case let value as Bool: return value
    case let value as String: return value
    case let value as CGFloat: return Double(value)
    case let value as any BinaryInteger: return Int(value)
    case let value as any BinaryFloatingPoint: return Double(value)
    case let value as Date: return value.timeIntervalSince1970 * 1000
    case let value as URL: return value.absoluteString
    case let value as UUID: return value.uuidString
    case let value as CGPoint: return ["x": Double(value.x), "y": Double(value.y)]
    case let value as CGSize: return ["width": Double(value.width), "height": Double(value.height)]
    case let value as CGRect:
      return [
        "x": Double(value.origin.x), "y": Double(value.origin.y),
        "width": Double(value.size.width), "height": Double(value.size.height),
      ]
    case let value as [Any]: return value.map(encode)
    case let value as [String: Any]: return value
    case let value as SUIHandleValue: return value
    case let value as Set<SUIJSONValue>: return value.map(\.foundationValue)
    case let value as Color: return encodeColor(value)
    case let value as IndexSet: return Array(value)
    case let value as DateComponents:
      var result: [String: Any] = [:]
      if let era = value.era { result["era"] = era }
      if let year = value.year { result["year"] = year }
      if let month = value.month { result["month"] = month }
      if let day = value.day { result["day"] = day }
      if let hour = value.hour { result["hour"] = hour }
      if let minute = value.minute { result["minute"] = minute }
      if let second = value.second { result["second"] = second }
      return result
    default: return String(describing: value!)
    }
  }

  static func void(_: Void) -> Any { NSNull() }

  static func encodeColor(_ color: Color) -> Any {
    var red: CGFloat = 0
    var green: CGFloat = 0
    var blue: CGFloat = 0
    var alpha: CGFloat = 0
    UIColor(color).getRed(&red, green: &green, blue: &blue, alpha: &alpha)
    return ["red": Double(red), "green": Double(green), "blue": Double(blue), "opacity": Double(alpha)]
  }

  static func encodeOptional<T>(_ value: T?, _ encode: (T) -> Any) -> Any {
    value.map(encode) ?? NSNull()
  }

  static func encodeArray<S: Sequence>(_ values: S, _ encode: (S.Element) -> Any) -> Any {
    values.map(encode)
  }

  static func encodeResult<T, E>(_ result: Result<T, E>, _ encode: (T) -> Any) -> Any {
    switch result {
    case .success(let value): return ["success": encode(value)]
    case .failure(let error): return ["failure": String(describing: error)]
    }
  }

  static func stableKey(_ arguments: [Any]) -> String {
    guard JSONSerialization.isValidJSONObject(arguments),
      let data = try? JSONSerialization.data(withJSONObject: arguments, options: [.sortedKeys]),
      let text = String(data: data, encoding: .utf8)
    else {
      return String(describing: arguments)
    }
    return text
  }

  // MARK: Errors

  static func mismatch(_ expected: String, _ value: Any?) -> SUIDecodeError {
    .mismatch("expected \(expected), got \(describe(value))")
  }

  static func describe(_ value: Any?) -> String {
    guard let value else { return "undefined" }
    if value is NSNull { return "null" }
    if let data = try? JSONSerialization.data(withJSONObject: value, options: [.fragmentsAllowed]),
      let text = String(data: data, encoding: .utf8)
    {
      return text.count > 120 ? String(text.prefix(120)) + "…" : text
    }
    return String(describing: value)
  }

  static func firstMatch<T>(_ what: String, _ value: Any?, _ candidates: [(Any?) throws -> T]) throws -> T {
    var reasons: [String] = []
    for candidate in candidates {
      do {
        return try candidate(value)
      } catch let error as SUIDecodeError {
        reasons.append(error.description)
      }
    }
    throw SUIDecodeError.mismatch("\(describe(value)) is not a valid \(what)")
  }
}

struct SUIFields {
  let values: [String: Any]
  subscript(key: String) -> Any? { values[key] }
  func has(_ key: String) -> Bool {
    guard let value = values[key] else { return false }
    return !SUI.isUndefined(value)
  }

  func value<T>(_ key: String, _ decode: (Any) throws -> T) throws -> T {
    guard has(key), let value = values[key] else { throw SUIDecodeError.mismatch("missing field '\(key)'") }
    return try decode(value)
  }

  func value<T>(_ key: String, default fallback: () -> T, _ decode: (Any) throws -> T) throws -> T {
    guard has(key), let value = values[key] else { return fallback() }
    return try decode(value)
  }
}

struct SUIArguments {
  private let positional: [Any]
  private let options: [String: Any]

  init(_ raw: [Any], positional count: Int, options keys: Set<String>?, required: Set<String> = []) throws {
    var values = raw
    // Trailing `undefined` arguments are the same as omitted ones.
    while let last = values.last, SUI.isUndefined(last) { values.removeLast() }
    if let keys {
      if values.count == count + 1 {
        let object = values.removeLast()
        guard let fields = SUI.object(object) else { throw SUI.mismatch("an options object", object) }
        for key in fields.keys where !keys.contains(key) {
          throw SUIDecodeError.mismatch("unexpected option '\(key)'")
        }
        options = fields
      } else {
        options = [:]
      }
      for key in required where options[key] == nil || SUI.isUndefined(options[key]) {
        throw SUIDecodeError.mismatch("missing option '\(key)'")
      }
    } else {
      options = [:]
    }
    guard values.count <= count else {
      throw SUIDecodeError.mismatch("expected at most \(count) arguments, got \(values.count)")
    }
    positional = values
  }

  func has(_ index: Int) -> Bool {
    index < positional.count && !SUI.isUndefined(positional[index])
  }

  func has(_ key: String) -> Bool {
    guard let value = options[key] else { return false }
    return !SUI.isUndefined(value)
  }

  func positional<T>(_ index: Int, _ decode: (Any) throws -> T) throws -> T {
    guard has(index) else { throw SUIDecodeError.mismatch("missing argument \(index + 1)") }
    return try decode(positional[index])
  }

  func positional<T>(_ index: Int, default fallback: () -> T, _ decode: (Any) throws -> T) throws -> T {
    has(index) ? try decode(positional[index]) : fallback()
  }

  func option<T>(_ key: String, _ decode: (Any) throws -> T) throws -> T {
    guard has(key), let value = options[key] else { throw SUIDecodeError.mismatch("missing option '\(key)'") }
    return try decode(value)
  }

  func option<T>(_ key: String, default fallback: () -> T, _ decode: (Any) throws -> T) throws -> T {
    guard has(key), let value = options[key] else { return fallback() }
    return try decode(value)
  }
}

enum SUIJSONValue: Hashable, Sendable, Identifiable, Codable {
  case null
  case bool(Bool)
  case number(Double)
  case string(String)
  indirect case array([SUIJSONValue])
  indirect case object([String: SUIJSONValue])

  var id: SUIJSONValue { self }

  init(from decoder: Decoder) throws {
    let container = try decoder.singleValueContainer()
    if container.decodeNil() {
      self = .null
    } else if let value = try? container.decode(Bool.self) {
      self = .bool(value)
    } else if let value = try? container.decode(Double.self) {
      self = .number(value)
    } else if let value = try? container.decode(String.self) {
      self = .string(value)
    } else if let value = try? container.decode([SUIJSONValue].self) {
      self = .array(value)
    } else {
      self = .object(try container.decode([String: SUIJSONValue].self))
    }
  }

  func encode(to encoder: Encoder) throws {
    var container = encoder.singleValueContainer()
    switch self {
    case .null: try container.encodeNil()
    case .bool(let value): try container.encode(value)
    case .number(let value): try container.encode(value)
    case .string(let value): try container.encode(value)
    case .array(let value): try container.encode(value)
    case .object(let value): try container.encode(value)
    }
  }

  init(_ value: Any?) {
    switch value {
    case nil, is NSNull: self = .null
    case let number as NSNumber where CFGetTypeID(number) == CFBooleanGetTypeID(): self = .bool(number.boolValue)
    case let number as NSNumber: self = .number(number.doubleValue)
    case let string as String: self = .string(string)
    case let array as [Any]: self = .array(array.map { SUIJSONValue($0) })
    case let object as [String: Any]: self = .object(object.mapValues { SUIJSONValue($0) })
    default: self = .string(String(describing: value!))
    }
  }

  var foundationValue: Any {
    switch self {
    case .null: return NSNull()
    case .bool(let value): return value
    case .number(let value): return value
    case .string(let value): return value
    case .array(let values): return values.map(\.foundationValue)
    case .object(let values): return values.mapValues(\.foundationValue)
    }
  }
}
