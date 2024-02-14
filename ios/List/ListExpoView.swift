import ExpoModulesCore
import SwiftUI

class ListExpoView: ExpoView {
  let props: ListProps

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = ListProps()
    let hostingController = UIHostingController(rootView: ListView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
