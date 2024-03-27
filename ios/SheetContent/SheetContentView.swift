import SwiftUI
import ExpoModulesCore

struct SheetContentView: View {
  @ObservedObject var props: SheetContentProps
  
  var body: some View {
   ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
     RepresentableView(view: props.children?[index] ?? UIView())
       .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
   }
  }
}

