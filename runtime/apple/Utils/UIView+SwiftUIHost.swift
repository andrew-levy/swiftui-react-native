//
//  UIView+SwiftUIHost.swift
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

import UIKit

// MARK: - Locating hosts behind Fabric component views

extension UIView {
  var swiftUIHost: SwiftUIHostView? {
    if let host = self as? SwiftUIHostView { return host }
    return subviews.lazy.compactMap { $0 as? SwiftUIHostView }.first
  }
}
