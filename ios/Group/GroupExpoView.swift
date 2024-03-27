import ExpoModulesCore
import SwiftUI

class GroupExpoView: ExpoView {
  let props: GroupProps
  let onEvent = EventDispatcher()

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = GroupProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: GroupView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
