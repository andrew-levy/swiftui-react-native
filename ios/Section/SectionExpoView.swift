import ExpoModulesCore
import SwiftUI

class SectionExpoView: ExpoView {
  let props: SectionProps
  let onEvent = EventDispatcher()
  var parentList: ListExpoView?

  override func didUpdateReactSubviews() {
    let subChildren = self.reactSubviews()
    props.children = subChildren
    parentList?.didUpdateReactSubviews()
  }
  
  required init(appContext: AppContext? = nil) {
    props = SectionProps(onEvent: onEvent)
    let hostingController = UIHostingController(rootView: SectionView(props: props))
    super.init(appContext: appContext)
    setupHostingController(hostingController)
  }
}
