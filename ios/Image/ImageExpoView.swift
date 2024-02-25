import ExpoModulesCore
import SwiftUI

class ImageExpoView: ExpoView {
  let props: ImageProps
  let onEvent = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    props = ImageProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ImageView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
