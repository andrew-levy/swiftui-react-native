import ExpoModulesCore
import SwiftUI

class ColorPickerExpoView: ExpoView {
  let props: ColorPickerProps
  let onValueChange = EventDispatcher()
  
  required init(appContext: AppContext? = nil) {
    props = ColorPickerProps(onValueChange: onValueChange)
    let hostingController = UIHostingController(rootView: ColorPickerView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
