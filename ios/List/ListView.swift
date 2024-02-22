import SwiftUI
import ExpoModulesCore

struct ListView: View {
  @ObservedObject var props: ListProps
  
  var body: some View {
    if #available(iOS 15.0, *) {
      List {
        Section(header: Text(props.header.toMarkdown()), footer: Text(props.footer.toMarkdown())) {
          ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
            RepresentableView(view: props.children?[index] ?? UIView())
              .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
          }
        }
      }.reactNativeViewModifiers(mods: props.modifiers)
    }
  }
}



// For supporting sections:
//List {
//  ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
//    let childSubviews = props.children?[index].reactSubviews().first?.reactSubviews()
//    if let section = props.children?[index].reactSubviews().first as? SectionExpoView {
//      Section(header: Text(section.props.header), footer: Text(section.props.footer)) {
//        ForEach(childSubviews ?? [], id: \.self) { v in
//          RepresentableView(view: v)
//            .frame(width: v.frame.width, height: v.frame.height)
//        }
//      }.reactNativeViewModifiers(mods: section.props.modifiers)
//    } else {
//      RepresentableView(view: props.children?[index] ?? UIView())
//        .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
//    }
//  }
//}
