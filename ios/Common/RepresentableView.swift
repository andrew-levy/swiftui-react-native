import SwiftUI

struct RepresentableView: UIViewRepresentable {
  var view: UIView
  func makeUIView(context: Context) -> UIView {
    return view
  }
  func updateUIView(_ uiView: UIView, context: Context) {
  }
}
