import ExpoModulesCore
import SwiftUI

class SectionExpoView: ExpoView {
  let props: SectionProps

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = SectionProps()
    let hostingController = UIHostingController(rootView: SectionView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
