import ExpoModulesCore
import SwiftUI

class HStackExpoView: ExpoView {
  let props: HStackProps

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = HStackProps()
    let hostingController = UIHostingController(rootView: HStackView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
