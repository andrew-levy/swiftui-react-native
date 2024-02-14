import ExpoModulesCore
import SwiftUI

class VStackExpoView: ExpoView {
  let props: VStackProps

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = VStackProps()
    let hostingController = UIHostingController(rootView: VStackView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
