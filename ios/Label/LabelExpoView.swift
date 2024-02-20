import ExpoModulesCore
import SwiftUI

class LabelExpoView: ExpoView {
  let props: LabelProps
  
  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
  }

  required init(appContext: AppContext? = nil) {
    props = LabelProps()
    let hostingController = UIHostingController(rootView: LabelView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
