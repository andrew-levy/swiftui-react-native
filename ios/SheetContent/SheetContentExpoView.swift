import ExpoModulesCore
import SwiftUI

class SheetContentExpoView: ExpoView {
  let props: SheetContentProps

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()    
    props.children = subChildren
  }

  required init(appContext: AppContext? = nil) {
    props = SheetContentProps()
    let hostingController = UIHostingController(rootView: SheetContentView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
