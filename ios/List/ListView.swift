import SwiftUI
import ExpoModulesCore

struct ListView: View {
  @ObservedObject var props: ListProps
  let listExpoView: ListExpoView
  
  var body: some View {
    if #available(iOS 15.0, *) {
      List {
        ForEach(props.children?.indices ?? 0..<0, id: \.self) { index in
          let childSubviews = props.children?[index].reactSubviews().first?.reactSubviews()
          if let section = props.children?[index].reactSubviews().first as? SectionExpoView {
            Section(header: Text(section.props.header.toMarkdown()), footer: Text(section.props.footer.toMarkdown())) {
              ForEach(childSubviews ?? [], id: \.self) { v in
                RepresentableView(view: v)
                  .frame(width: v.frame.width, height: v.frame.height)
              }
            }.reactNativeViewModifiers(mods: section.props.modifiers)
          } else {
            RepresentableView(view: props.children?[index] ?? UIView())
              .frame(width: props.children?[index].frame.width, height: props.children?[index].frame.height)
          }
        }
      }
      .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
      .onAppear {
        for child in props.children ?? [] {
          let childSubviews = child.reactSubviews().first?.reactSubviews()
          if let section = child.reactSubviews().first as? SectionExpoView {
            section.parentList = listExpoView
          }
        }
      }
    }
  }
}
