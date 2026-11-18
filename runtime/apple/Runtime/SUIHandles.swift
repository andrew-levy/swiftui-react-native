//
//  SUIHandles.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/6/26.
//

import Foundation

final class SUIHandleValue {
  let properties: [String: Any]
  let methods: [String]
  let call: (_ method: String, _ arguments: [Any], _ context: SUIContext) throws -> Any

  init(
    properties: [String: Any] = [:], methods: [String] = ["callAsFunction"],
    call: @escaping (String, [Any], SUIContext) throws -> Any
  ) {
    self.properties = properties
    self.methods = methods
    self.call = call
  }
}

enum SUIHandleError: Error, CustomStringConvertible {
  case released(String)

  var description: String {
    switch self {
    case .released(let handle): return "The SwiftUI value '\(handle)' no longer exists"
    }
  }
}

enum SUIHandles {
  private final class WeakContext {
    weak var context: SUIContext?
    init(_ context: SUIContext) { self.context = context }
  }

  private static var contexts: [Int: WeakContext] = [:]
  private static var nextSerial = 1

  static func register(_ context: SUIContext) -> Int {
    let serial = nextSerial
    nextSerial += 1
    contexts[serial] = WeakContext(context)
    return serial
  }

  static func unregister(_ serial: Int) {
    contexts[serial] = nil
  }

  static func call(_ handle: String, _ method: String, argumentsJSON: String) throws -> String {
    guard let serial = handle.split(separator: "/").first.flatMap({ Int($0) }),
      let context = contexts[serial]?.context, let value = context.handle(handle)
    else {
      throw SUIHandleError.released(handle)
    }
    let data = Data(argumentsJSON.utf8)
    let arguments = try JSONSerialization.jsonObject(with: data, options: [.fragmentsAllowed]) as? [Any] ?? []
    let result = context.resolveHandles(try value.call(method, arguments, context), site: "\(handle).\(method)")
    let encoded = try JSONSerialization.data(withJSONObject: [result], options: [.fragmentsAllowed])
    return String(decoding: encoded, as: UTF8.self)
  }
}
