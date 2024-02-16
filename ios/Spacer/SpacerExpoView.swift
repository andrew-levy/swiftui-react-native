import ExpoModulesCore
import SwiftUI

class SpacerExpoView: ExpoView {
  let props: SpacerProps
  
  required init(appContext: AppContext? = nil) {
    props = SpacerProps()
    let hostingController = UIHostingController(rootView: SpacerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
