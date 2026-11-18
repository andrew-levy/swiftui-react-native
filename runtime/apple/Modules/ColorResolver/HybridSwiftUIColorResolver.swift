//
//  HybridSwiftUIColorResolver.swift
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

import NitroModules
import SwiftUI
import UIKit

final class HybridSwiftUIColorResolver: HybridSwiftUIColorResolverSpec {
  func getColor(color: String) throws -> String {
    let uiColor: UIColor
    if #available(iOS 14.0, *) {
      // Thread-safe. Don't hop to main here, the JS thread must not block on it.
      uiColor = UIColor(swiftUIColor(named: color))
    } else {
      uiColor = .clear
    }
    var red: CGFloat = 0
    var green: CGFloat = 0
    var blue: CGFloat = 0
    var alpha: CGFloat = 0
    uiColor.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
    return convertRGBAToHexString(red: red, green: green, blue: blue, alpha: alpha)
  }

}

// A free function because inside the class `getColor` refers to the HybridObject method.
private func swiftUIColor(named color: String) -> Color {
  getColor(color)
}
