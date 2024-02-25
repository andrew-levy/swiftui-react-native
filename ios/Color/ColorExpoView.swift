import ExpoModulesCore
import SwiftUI

class ColorExpoView: ExpoView {
  let props: ColorProps
  let onEvent = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    props = ColorProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ColorView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
