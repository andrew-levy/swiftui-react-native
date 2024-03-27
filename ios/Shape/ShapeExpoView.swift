import ExpoModulesCore
import SwiftUI

class ShapeExpoView: ExpoView {
  let props: ShapeProps
  let onEvent = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    props = ShapeProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ShapeView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
