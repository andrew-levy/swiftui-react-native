import SwiftUI

struct MenuView: View {
  @ObservedObject var props: MenuProps

  var body: some View {
    if #available(iOS 15.0, *) {
      if props.hasPrimaryAction  {
        if let systemImage = props.systemImage {
          Menu("\(props.title)", systemImage: systemImage) {
            buildMenu(props.children ?? [])
          } primaryAction: {
            props.onEvent(["onPrimaryAction": true])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        } else {
          Menu(props.title) {
            buildMenu(props.children ?? [])
          } primaryAction: {
            props.onEvent(["onPrimaryAction": true])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        }
        
      } else {
        if let systemImage = props.systemImage {
          Menu(props.title, systemImage: systemImage) {
            buildMenu(props.children ?? [])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        } else {
          Menu(props.title) {
            buildMenu(props.children ?? [])
          }
          .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
        }
      }
    }
  }
}

func buildMenu(_ children: [UIView]) -> some View {
 AnyView( 
  ForEach(children.indices , id: \.self) { index in
    let child = children[index]
    if let section = child as? SectionExpoView {
      Section(header: Text(section.props.header), footer: Text(section.props.footer)) {
        buildMenu(child.reactSubviews())
      }
    } else if let subMenu = child as? MenuExpoView {
      if #available(iOS 14.0, *) {
        Menu(subMenu.props.title) {
          buildMenu(child.reactSubviews())
        }
      }
    } else if let button = child as? ButtonExpoView {
      ButtonView(props: button.props)
    }
    else if let divider = child as? DividerExpoView {
      DividerView(props: divider.props)
    } else if let text = child as? TextExpoView {
      TextView(props: text.props)
    } else if let toggle = child as? ToggleExpoView {
      ToggleView(props: toggle.props)
    } else if let label = child as? LabelExpoView {
      LabelView(props: label.props)
    } 
  }
 )
}
