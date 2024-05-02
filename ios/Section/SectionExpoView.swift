import ExpoModulesCore
import SwiftUI

class SectionExpoView: ExpoView {
  let props: SectionProps
  let onEvent = EventDispatcher()

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
  }
  
  required init(appContext: AppContext? = nil) {
    props = SectionProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: SectionView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
