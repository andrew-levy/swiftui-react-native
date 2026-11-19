//
//  SUIProgram.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/6/26.
//

import CoreGraphics
import Foundation
import SwiftUI

final class SUIProgramFrame {
  let arguments: [Any]
  let parameters: [Double]
  var slots: [Int: Any] = [:]

  init(arguments: [Any], parameters: [Double] = []) {
    self.arguments = arguments
    self.parameters = parameters
  }

  @TaskLocal static var current: SUIProgramFrame?

  static func member(_ value: Any?, _ path: String?) -> Any? {
    guard let path else { return value }
    var current = value
    for key in path.split(separator: ".").map(String.init) {
      switch current {
      case let handle as SUIHandleValue: current = handle.properties[key]
      case let object as [String: Any]: current = object[key] ?? derivedField(object, key)
      default: return nil
      }
    }
    return current
  }

  private static func derivedField(_ rect: [String: Any], _ key: String) -> Double? {
    guard let x = field(rect["x"], nil), let y = field(rect["y"], nil), let width = field(rect["width"], nil), let height = field(rect["height"], nil) else { return nil }
    switch key {
    case "minX": return x
    case "midX": return x + width / 2
    case "maxX": return x + width
    case "minY": return y
    case "midY": return y + height / 2
    case "maxY": return y + height
    default: return nil
    }
  }

  static func field(_ value: Any?, _ name: String?) -> Double? {
    if value is [String: Any] || value is SUIHandleValue, name != nil { return field(member(value, name), nil) }
    switch value {
    case let value as CGFloat: return Double(value)
    case let value as Double: return value
    case let value as Float: return Double(value)
    case let value as Int: return Double(value)
    case let value as Bool: return value ? 1 : 0
    case let value as CGSize:
      switch name {
      case "width": return Double(value.width)
      case "height": return Double(value.height)
      default: return nil
      }
    case let value as CGPoint:
      switch name {
      case "x": return Double(value.x)
      case "y": return Double(value.y)
      default: return nil
      }
    case let value as CGRect:
      switch name {
      case "x", "origin.x": return Double(value.origin.x)
      case "y", "origin.y": return Double(value.origin.y)
      case "width", "size.width": return Double(value.size.width)
      case "height", "size.height": return Double(value.size.height)
      case "minX": return Double(value.minX)
      case "midX": return Double(value.midX)
      case "maxX": return Double(value.maxX)
      case "minY": return Double(value.minY)
      case "midY": return Double(value.midY)
      case "maxY": return Double(value.maxY)
      default: return nil
      }
    case let value as CGAffineTransform:
      switch name {
      case "a": return Double(value.a)
      case "b": return Double(value.b)
      case "c": return Double(value.c)
      case "d": return Double(value.d)
      case "tx": return Double(value.tx)
      case "ty": return Double(value.ty)
      default: return nil
      }
    case let value as [String: Any]:
      return field(name.flatMap { value[$0] }, nil)
    case let value as NSNumber:
      return value.doubleValue
    default:
      return nil
    }
  }
}

typealias SUIExpression = (SUIProgramFrame) -> Double

enum SUIExpressions {
  private static let unary: [String: (Double) -> Double] = [
    "neg": { -$0 }, "abs": { $0.magnitude }, "sqrt": { $0.squareRoot() }, "floor": { $0.rounded(.down) },
    "ceil": { $0.rounded(.up) }, "round": { $0.rounded() }, "sin": { sin($0) }, "cos": { cos($0) },
    "tan": { tan($0) }, "asin": { asin($0) }, "acos": { acos($0) }, "atan": { atan($0) },
    "exp": { exp($0) }, "log": { log($0) }, "not": { $0 == 0 ? 1 : 0 },
  ]
  private static let binary: [String: (Double, Double) -> Double] = [
    "add": { $0 + $1 }, "sub": { $0 - $1 }, "mul": { $0 * $1 }, "div": { $0 / $1 },
    "mod": { $0.truncatingRemainder(dividingBy: $1) }, "pow": { pow($0, $1) }, "atan2": { atan2($0, $1) },
    "min": { min($0, $1) }, "max": { max($0, $1) }, "lt": { $0 < $1 ? 1 : 0 }, "le": { $0 <= $1 ? 1 : 0 },
    "gt": { $0 > $1 ? 1 : 0 }, "ge": { $0 >= $1 ? 1 : 0 }, "eq": { $0 == $1 ? 1 : 0 }, "ne": { $0 != $1 ? 1 : 0 },
    "and": { $0 != 0 && $1 != 0 ? 1 : 0 }, "or": { $0 != 0 || $1 != 0 ? 1 : 0 },
  ]

  static func compile(_ raw: Any?) throws -> SUIExpression {
    if let number = try? SUI.double(raw) { return { _ in number } }
    guard let node = raw as? [Any], let operation = node.first as? String else {
      throw SUI.mismatch("an expression", raw)
    }
    let operands = node.dropFirst()
    if let function = unary[operation], operands.count == 1 {
      let a = try compile(node[1])
      return { function(a($0)) }
    }
    if operation == "eq", operands.count == 2, let text = node[2] as? String {
      let reference = try reader(node[1])
      return { (reference($0) as? String) == text ? 1 : 0 }
    }
    if let function = binary[operation], operands.count == 2 {
      let a = try compile(node[1])
      let b = try compile(node[2])
      return { function(a($0), b($0)) }
    }
    switch operation {
    case "arg":
      let index = try SUI.int(node[1], as: Int.self)
      let name = node.count > 2 ? node[2] as? String : nil
      return { frame in
        guard index < frame.arguments.count else { return 0 }
        return SUIProgramFrame.field(frame.arguments[index], name) ?? 0
      }
    case "call":
      let read = try reader(node.dropLast(node.count > 5 ? 1 : 0).map { $0 })
      let name = node.count > 5 ? node[5] as? String : nil
      return { SUIProgramFrame.field(read($0), name) ?? 0 }
    case "param":
      let index = try SUI.int(node[1], as: Int.self)
      return { $0.parameters.indices.contains(index) ? $0.parameters[index] : 0 }
    case "slot":
      let id = try SUI.int(node[1], as: Int.self)
      let name = node.count > 2 ? node[2] as? String : nil
      return { SUIProgramFrame.field($0.slots[id], name) ?? 0 }
    case "select":
      guard node.count == 4 else { throw SUI.mismatch("select(condition, then, else)", raw) }
      let condition = try compile(node[1])
      let yes = try compile(node[2])
      let no = try compile(node[3])
      return { condition($0) != 0 ? yes($0) : no($0) }
    case "query":
      guard node.count >= 5, let type = node[1] as? String, let member = node[3] as? String else {
        throw SUI.mismatch("query(type, value, member, arguments)", raw)
      }
      let value = try SUITemplate(node[2])
      let arguments = try SUITemplate(node[4])
      let name = node.count > 5 ? node[5] as? String : nil
      return { frame in
        let raw = (arguments.resolve(frame) as? [Any]) ?? []
        guard let result = try? SUIQueries.evaluate(type, value.resolve(frame), member, raw, SUIContext.detached) else { return 0 }
        return SUIProgramFrame.field(result, name) ?? 0
      }
    default:
      throw SUI.mismatch("a known operation", operation)
    }
  }
}

extension SUIExpressions {
  fileprivate static func reader(_ raw: Any?) throws -> (SUIProgramFrame) -> Any? {
    guard let node = raw as? [Any], let operation = node.first as? String else { throw SUI.mismatch("a value of a closure", raw) }
    switch operation {
    case "arg":
      let index = try SUI.int(node[1], as: Int.self)
      let name = node.count > 2 ? node[2] as? String : nil
      return { frame in frame.arguments.indices.contains(index) ? SUIProgramFrame.member(frame.arguments[index], name) : nil }
    case "call":
      guard node.count >= 5, let method = node[3] as? String else { throw SUI.mismatch("a method call", raw) }
      let index = try SUI.int(node[1], as: Int.self)
      let path = node[2] as? String
      let arguments = try SUITemplate(node[4])
      return { frame in
        guard frame.arguments.indices.contains(index), let handle = SUIProgramFrame.member(frame.arguments[index], path) as? SUIHandleValue else { return nil }
        return try? handle.call(method, (arguments.resolve(frame) as? [Any]) ?? [], SUIContext.detached)
      }
    default:
      throw SUI.mismatch("a value of a closure", raw)
    }
  }
}

indirect enum SUITemplate {
  case constant(Any)
  case number(SUIExpression)
  case array([SUITemplate])
  case object([String: SUITemplate])

  init(_ raw: Any?) throws {
    if let object = raw as? [String: Any] {
      if object.count == 1, let expression = object["$e"] {
        self = .number(try SUIExpressions.compile(expression))
        return
      }
      if object["$ops"] != nil {
        self = .constant(object)
        return
      }
      let fields = try object.mapValues { try SUITemplate($0) }
      self = fields.values.allSatisfy(\.isConstant) ? .constant(object) : .object(fields)
    } else if let array = raw as? [Any] {
      let items = try array.map { try SUITemplate($0) }
      self = items.allSatisfy(\.isConstant) ? .constant(array) : .array(items)
    } else {
      self = .constant(raw ?? NSNull())
    }
  }

  var isConstant: Bool {
    if case .constant = self { return true }
    return false
  }

  func resolve(_ frame: SUIProgramFrame) -> Any {
    switch self {
    case .constant(let value): return value
    case .number(let expression): return NSNumber(value: expression(frame))
    case .array(let items): return items.map { $0.resolve(frame) }
    case .object(let fields): return fields.mapValues { $0.resolve(frame) }
    }
  }
}

private struct SUIProgramCall {
  let name: String
  let arguments: SUITemplate
  let result: Int?
  let target: Int?

  init(_ raw: Any) throws {
    guard let object = raw as? [String: Any], let name = object["m"] as? String else {
      throw SUI.mismatch("a recorded call", raw)
    }
    self.name = name
    arguments = try SUITemplate(object["a"] ?? [Any]())
    result = (object["r"] as? NSNumber)?.intValue
    target = (object["on"] as? NSNumber)?.intValue
  }
}

final class SUIProgramRunner<T> {
  typealias Apply = (inout T, String, [Any]) throws -> Any?

  private let calls: [SUIProgramCall]
  private let apply: Apply
  private weak var context: SUIContext?

  init(_ raw: Any?, _ context: SUIContext, _ apply: @escaping Apply) throws {
    guard let object = raw as? [String: Any], let list = object["$ops"] as? [Any] else {
      throw SUI.mismatch("a closure of recorded calls", raw)
    }
    calls = try list.map { try SUIProgramCall($0) }
    self.apply = apply
    self.context = context
  }

  func run(_ target: inout T, _ arguments: [Any] = []) {
    let frame = SUIProgramFrame.current ?? SUIProgramFrame(arguments: arguments)
    SUIProgramFrame.$current.withValue(frame) {
      for call in calls {
        if call.name == "$copy", let slot = call.result {
          frame.slots[slot] = call.target.map { frame.slots[$0] as Any } ?? target
          continue
        }
        do {
          let raw = (call.arguments.resolve(frame) as? [Any]) ?? []
          let result: Any?
          if let slot = call.target {
            result = try SUIQueries.call(&frame.slots[slot], call.name, raw)
          } else {
            result = try apply(&target, call.name, raw)
          }
          if let slot = call.result { frame.slots[slot] = result }
        } catch {
          report(error, call.name)
        }
      }
    }
  }

  private func report(_ error: Error, _ name: String) {
    // A renderer can run off the main thread (`rendersAsynchronously`).
    DispatchQueue.main.async { [weak context] in context?.report(error, in: ".\(name)()") }
  }
}

extension SUI {
  static func ref<T>(_ value: Any?, as type: T.Type = T.self) throws -> T {
    guard let object = value as? [String: Any], let id = object["$ref"] as? NSNumber,
      let held = SUIProgramFrame.current?.slots[id.intValue] as? T
    else {
      throw mismatch("a value returned earlier in this closure", value)
    }
    return held
  }
}

// MARK: - Shapes

struct SUIAnimatableVector: VectorArithmetic, @unchecked Sendable {
  var values: [Double]

  init(_ values: [Double] = []) {
    self.values = values
  }

  static var zero: SUIAnimatableVector { SUIAnimatableVector() }

  private static func combine(_ a: Self, _ b: Self, _ operation: (Double, Double) -> Double) -> Self {
    let count = max(a.values.count, b.values.count)
    return SUIAnimatableVector(
      (0..<count).map { index in
        operation(index < a.values.count ? a.values[index] : 0, index < b.values.count ? b.values[index] : 0)
      })
  }

  static func + (a: Self, b: Self) -> Self { combine(a, b, +) }
  static func - (a: Self, b: Self) -> Self { combine(a, b, -) }
  mutating func scale(by rhs: Double) { values = values.map { $0 * rhs } }
  var magnitudeSquared: Double { values.reduce(0) { $0 + $1 * $1 } }

  static func == (a: Self, b: Self) -> Bool {
    let count = max(a.values.count, b.values.count)
    return (0..<count).allSatisfy { index -> Bool in
      let left: Double = index < a.values.count ? a.values[index] : 0
      let right: Double = index < b.values.count ? b.values[index] : 0
      return left == right
    }
  }
}

struct SUIProgramShape: InsettableShape, @unchecked Sendable {
  private let template: SUITemplate
  private let decode: (Any) throws -> Path
  private let fixed: Path?
  var parameters: SUIAnimatableVector
  private var insetAmount: CGFloat = 0

  nonisolated(unsafe) static var recordsEvaluations = false
  nonisolated(unsafe) static var evaluations: [[Double]] = []

  static let probe = "$shapeEvaluations"

  static func answerProbe(_ command: String) -> Any {
    recordsEvaluations = command == "start"
    defer { if command == "stop" { evaluations = [] } }
    return evaluations
  }

  init?(_ value: Any?, decode: @escaping (Any) throws -> Path) throws {
    guard let object = value as? [String: Any], let shape = object["$shape"] as? [String: Any] else { return nil }
    template = try SUITemplate(shape["path"])
    self.decode = decode
    parameters = SUIAnimatableVector(try SUI.array(shape["parameters"] ?? [Any]()) { try SUI.double($0) })
    if case .constant(let raw) = template { fixed = try decode(raw) } else { fixed = nil }
  }

  var animatableData: SUIAnimatableVector {
    get { parameters }
    set { parameters = newValue }
  }

  func path(in rect: CGRect) -> Path {
    if let fixed { return fixed }
    if Self.recordsEvaluations { Self.evaluations.append(parameters.values) }
    let frame = SUIProgramFrame(arguments: [rect.insetBy(dx: insetAmount, dy: insetAmount)], parameters: parameters.values)
    return SUIProgramFrame.$current.withValue(frame) {
      (try? decode(template.resolve(frame))) ?? Path()
    }
  }

  func inset(by amount: CGFloat) -> SUIProgramShape {
    var copy = self
    copy.insetAmount += amount
    return copy
  }
}


final class SUIValueClosure<R> {
  private let template: SUITemplate
  private let decode: (Any) throws -> R
  private let notify: (([Any]) -> Void)?
  private var last: R

  init(_ raw: Any?, _ context: SUIContext, _ decode: @escaping (Any) throws -> R) throws {
    guard let object = raw as? [String: Any], let answer = object["$ret"] ?? object["returns"] else {
      throw SUI.mismatch("a closure's answer: { returns, perform }", raw)
    }
    template = try SUITemplate(answer)
    self.decode = decode
    notify = try object["perform"].map { try context.callback($0) }
    last = try decode(template.resolve(SUIProgramFrame(arguments: [])))
  }

  func call(_ arguments: [Any]) -> R {
    notify?(arguments)
    if let value = try? decode(template.resolve(SUIProgramFrame(arguments: arguments))) { last = value }
    return last
  }
}

final class SUIEffectStep {
  let name: String
  private let arguments: SUITemplate

  init(_ raw: Any) throws {
    guard let object = raw as? [String: Any], let name = object["m"] as? String else {
      throw SUI.mismatch("a recorded call", raw)
    }
    self.name = name
    arguments = try SUITemplate(object["a"] ?? [Any]())
  }

  static func list(_ raw: Any?) throws -> [SUIEffectStep] {
    guard let object = raw as? [String: Any], let steps = object["$effects"] as? [Any] else {
      throw SUI.mismatch("a closure returning the value it received", raw)
    }
    return try steps.map { try SUIEffectStep($0) }
  }

  func resolve(_ input: [Any]) -> [Any] {
    (arguments.resolve(SUIProgramFrame(arguments: input)) as? [Any]) ?? []
  }
}
