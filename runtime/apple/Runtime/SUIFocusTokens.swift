//
//  SUIFocusTokens.swift
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/10/26.
//

import SwiftUI
import UIKit

private struct SUIFocusTokensKey: FocusedValueKey {
  typealias Value = [String]
}

private struct SUIFocusChainKey: EnvironmentKey {
  static let defaultValue: [String] = []
}

private struct SUISceneFocusChainKey: EnvironmentKey {
  static let defaultValue: [String] = []
}

extension FocusedValues {
  fileprivate var suiFocusTokens: [String]? {
    get { self[SUIFocusTokensKey.self] }
    set { self[SUIFocusTokensKey.self] = newValue }
  }
}

extension EnvironmentValues {
  fileprivate var suiFocusChain: [String] {
    get { self[SUIFocusChainKey.self] }
    set { self[SUIFocusChainKey.self] = newValue }
  }

  fileprivate var suiSceneFocusChain: [String] {
    get { self[SUISceneFocusChainKey.self] }
    set { self[SUISceneFocusChainKey.self] = newValue }
  }
}

/// `focusedObject` and its relatives: the object stays in JavaScript, SwiftUI carries a token.
enum SUIFocusTokens {
  static func apply(_ view: AnyView, _ arguments: [Any], _ context: SUIContext) throws -> AnyView {
    guard let options = arguments.first as? [String: Any], let token = options["token"] as? String else {
      throw SUI.mismatch("a focus token", arguments.first)
    }
    if options["scene"] as? Bool ?? false {
      return AnyView(view.modifier(SUISceneTokenModifier(token: token, context: context)))
    }
    return AnyView(view.modifier(SUIFocusTokenModifier(token: token, context: context)))
  }
}

// Each publisher passes its ancestors' tokens down, so the focused one carries the whole chain.
private struct SUIFocusTokenModifier: ViewModifier {
  let token: String
  let context: SUIContext

  @Environment(\.suiFocusChain) private var chain
  @FocusedValue(\.suiFocusTokens) private var focused

  func body(content: Content) -> some View {
    let tokens = chain + [token]
    let reported = focused ?? []
    content
      .environment(\.suiFocusChain, tokens)
      .focusedValue(\.suiFocusTokens, tokens)
      .onAppear { send(reported) }
      .onChange(of: reported) { send($0) }
  }

  private func send(_ tokens: [String]) {
    context.dispatch?(["$focus": tokens])
  }
}

// Scene values of one key replace each other, so each scene publisher reports its own window instead.
private struct SUISceneTokenModifier: ViewModifier {
  let token: String
  let context: SUIContext

  @Environment(\.suiSceneFocusChain) private var chain

  func body(content: Content) -> some View {
    let tokens = chain + [token]
    content
      .environment(\.suiSceneFocusChain, tokens)
      .background(SUIKeyWindowProbe { isKey in send(depth: tokens.count, active: isKey) })
  }

  private func send(depth: Int, active: Bool) {
    context.dispatch?(["$sceneToken": token, "depth": depth, "active": active])
  }
}

/// Whether the view's window is the key window: what a focused scene is on iOS.
private struct SUIKeyWindowProbe: UIViewRepresentable {
  let onChange: (Bool) -> Void

  func makeUIView(context: Context) -> SUIKeyWindowView {
    let view = SUIKeyWindowView()
    view.onChange = onChange
    return view
  }

  func updateUIView(_ view: SUIKeyWindowView, context: Context) {
    view.onChange = onChange
  }
}

private final class SUIKeyWindowView: UIView {
  var onChange: ((Bool) -> Void)?
  private var reported: Bool?

  override init(frame: CGRect) {
    super.init(frame: frame)
    isUserInteractionEnabled = false
    let center = NotificationCenter.default
    center.addObserver(self, selector: #selector(windowChanged), name: UIWindow.didBecomeKeyNotification, object: nil)
    center.addObserver(self, selector: #selector(windowChanged), name: UIWindow.didResignKeyNotification, object: nil)
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) is not supported")
  }

  override func didMoveToWindow() {
    super.didMoveToWindow()
    windowChanged()
  }

  @objc private func windowChanged() {
    let isKey = window?.isKeyWindow ?? false
    guard isKey != reported else { return }
    reported = isKey
    onChange?(isKey)
  }
}
