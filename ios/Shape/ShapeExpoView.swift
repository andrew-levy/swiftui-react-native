import ExpoModulesCore
import SwiftUI

class ShapeExpoView: ExpoView {
  let props: ShapeProps

  required init(appContext: AppContext? = nil) {
    props = ShapeProps()
    let hostingController = UIHostingController(rootView: ShapeView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
