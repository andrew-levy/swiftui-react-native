import ExpoModulesCore
import SwiftUI

class SliderExpoView: ExpoView {
  let props: SliderProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = SliderProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: SliderView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
