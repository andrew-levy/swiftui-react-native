import ExpoModulesCore
import SwiftUI

class ColorPickerExpoView: ExpoView {
  let props: ColorPickerProps
  let onEvent = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ColorPickerProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: ColorPickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
