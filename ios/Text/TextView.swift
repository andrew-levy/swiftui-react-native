import SwiftUI

struct TextView: View {
  @ObservedObject var props: TextProps
  var body: some View {
    if #available(iOS 15, *) {
      Text(props.text.toMarkdown())
        .modifier(ReactNativeViewModifiers(mods: props.modifiers))
        .sizedToFit(onSized: props.onSized)
    } else {
      Text(props.text)
        .modifier(ReactNativeViewModifiers(mods: props.modifiers))
        .sizedToFit(onSized: props.onSized)
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
