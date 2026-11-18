//
//  HybridSwiftUIRuntime.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/6/26.
//

import Foundation
import NitroModules

final class HybridSwiftUIRuntime: HybridSwiftUIRuntimeSpec {
  func call(handle: String, method: String, argumentsJSON: String) throws -> Promise<String> {
    let promise = Promise<String>()
    // Never block the JavaScript thread on the main thread.
    DispatchQueue.main.async {
      do {
        promise.resolve(withResult: try SUIHandles.call(handle, method, argumentsJSON: argumentsJSON))
      } catch {
        promise.reject(withError: error)
      }
    }
    return promise
  }

  func evaluate(type: String, valueJSON: String, member: String, argumentsJSON: String) throws -> String {
    let parse = { (text: String) throws -> Any in
      try JSONSerialization.jsonObject(with: Data(text.utf8), options: [.fragmentsAllowed])
    }
    let arguments = try parse(argumentsJSON) as? [Any] ?? []
    let result: Any
    switch type {
    case SUIProgramShape.probe:
      result = SUIProgramShape.answerProbe(member)
    case "$shapePath":
      let shape = try SUIValues.decode_Shape(try parse(valueJSON), SUIContext.detached)
      result = shape.path(in: try SUI.cgRect(arguments.first)).description
    default:
      result = try SUIQueries.evaluate(type, try parse(valueJSON), member, arguments, SUIContext.detached)
    }
    let data = try JSONSerialization.data(withJSONObject: [Self.finite(result)], options: [.fragmentsAllowed])
    return String(decoding: data, as: UTF8.self)
  }

  // CGRect.null has infinite coordinates, and JSONSerialization raises an exception Swift can't catch.
  private static func finite(_ value: Any) -> Any {
    switch value {
    case let array as [Any]:
      return array.map(finite)
    case let object as [String: Any]:
      return object.mapValues(finite)
    case let number as Double where number.isNaN:
      return ["$nan": true]
    case let number as Double where number.isInfinite:
      return ["$inf": number < 0 ? -1 : 1]
    default:
      return value
    }
  }
}
