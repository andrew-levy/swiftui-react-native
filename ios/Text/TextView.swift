import SwiftUI

struct TextView: View {
  @ObservedObject var props: TextProps
  
  var body: some View {
    if #available(iOS 16, *) {
      Text(props.text.toMarkdown())
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
    } else {
      Text(props.text)
        .reactNativeViewModifiers(mods: props.modifiers, onEvent: props.onEvent)
    }
  }
}

extension String {
  @available(iOS 15, *)
  func toMarkdown() -> AttributedString {
    do {
      return try AttributedString(markdown: self)
    } catch {
      print("Error parsing Markdown for string \(self): \(error)")
      return AttributedString(self)
    }
  }
}
