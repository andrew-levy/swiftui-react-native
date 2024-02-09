import ExpoModulesCore
import SwiftUI

class ColorExpoView: ExpoView {
  let props: ColorProps

  required init(appContext: AppContext? = nil) {
    props = ColorProps()
    let hostingController = UIHostingController(rootView: ColorView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
