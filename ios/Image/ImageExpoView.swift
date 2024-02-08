import ExpoModulesCore
import SwiftUI

class ImageExpoView: ExpoView {
  let props: ImageProps

  required init(appContext: AppContext? = nil) {
    props = ImageProps()
    let hostingController = UIHostingController(rootView: ImageView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
