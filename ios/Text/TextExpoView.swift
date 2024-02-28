import ExpoModulesCore
import SwiftUI

class TextExpoView: ExpoView {
  let props: TextProps
  let onEvent = EventDispatcher()
  
  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = TextProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: TextView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
