import ExpoModulesCore
import SwiftUI

class MenuExpoView: ExpoView {
  let props: MenuProps
  let onEvent = EventDispatcher()
  
  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = MenuProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: MenuView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
  
}
