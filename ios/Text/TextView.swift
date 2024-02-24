import SwiftUI

struct TextView: View {
  @ObservedObject var props: TextProps
  
  var body: some View {
    if #available(iOS 16, *) {
      Text(props.text.toMarkdown())
        .modifier(ReactNativeViewModifiers(mods: props.modifiers))
    } else {
      Text(props.text)
        .modifier(ReactNativeViewModifiers(mods: props.modifiers))
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
