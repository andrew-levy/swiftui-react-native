//
//  ReactChildView.swift
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

import Combine
import SwiftUI
import UIKit

struct ReactChildView: View {
  let view: UIView
  var owner: SwiftUIHostView? = nil
  // Fabric recycles views, so this has to change on every mount.
  var identity: Int? = nil

  var body: some View {
    ReactChildContent(view: view, owner: owner)
      .id(identity.map(AnyHashable.init) ?? AnyHashable(ObjectIdentifier(view)))
  }
}

private struct ReactChildContent: View {
  @StateObject private var container: ReactChildContainer
  let view: UIView
  weak var owner: SwiftUIHostView?

  init(view: UIView, owner: SwiftUIHostView?) {
    _container = StateObject(wrappedValue: ReactChildContainer(child: view))
    self.view = view
    self.owner = owner
  }

  var body: some View {
    if #available(iOS 16.0, *), owner != nil {
      let layout = ReactChildLayout(size: container.size) { [weak owner, weak view] width in
        guard let owner, let view else { return }
        owner.setProposedWidth(width, for: view)
      }
      layout {
        ReactChildRepresentable(container: container, child: view)
      }
    } else {
      ReactChildRepresentable(container: container, child: view)
        .frame(width: container.size.width, height: container.size.height)
    }
  }
}

@available(iOS 16.0, *)
private struct ReactChildLayout: Layout {
  let size: CGSize
  let onProposedWidth: (CGFloat) -> Void

  func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
    var result = size
    if let width = proposal.width, width.isFinite {
      result.width = min(size.width, width)
    }
    return result
  }

  func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
    if let width = proposal.width, width.isFinite, width > 0 {
      // Never mutate state during layout.
      DispatchQueue.main.async { onProposedWidth(width) }
    }
    for subview in subviews {
      subview.place(at: bounds.origin, anchor: .topLeading, proposal: ProposedViewSize(size))
    }
  }
}

private struct ReactChildRepresentable: UIViewRepresentable {
  let container: ReactChildContainer
  let child: UIView

  func makeUIView(context: Context) -> ReactChildContainer {
    container.attach(child)
    return container
  }

  func updateUIView(_ uiView: ReactChildContainer, context: Context) {
    uiView.attach(child)
  }
}

final class ReactChildContainer: UIView, ObservableObject {
  @Published private(set) var size: CGSize

  private weak var child: UIView?
  private var observations: [NSKeyValueObservation] = []

  init(child: UIView) {
    self.size = child.bounds.size
    super.init(frame: CGRect(origin: .zero, size: child.bounds.size))
    attach(child)
  }

  func attach(_ newChild: UIView) {
    if child !== newChild {
      observations.forEach { $0.invalidate() }
      child = newChild
      // Fabric updates layout through `center` and `bounds`, which go through the layer.
      observations = [
        newChild.layer.observe(\.bounds) { [weak self] _, _ in self?.syncWithChild() },
        newChild.layer.observe(\.position) { [weak self] _, _ in self?.syncWithChild() },
      ]
    }
    if newChild.superview !== self {
      addSubview(newChild)
    }
    // May run during a SwiftUI update: publish the size on the next turn.
    DispatchQueue.main.async { [weak self] in self?.syncWithChild() }
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) is not supported")
  }

  deinit {
    observations.forEach { $0.invalidate() }
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    syncWithChild()
  }

  private func syncWithChild() {
    guard let child, child.superview === self else { return }
    if child.frame.origin != .zero {
      child.frame.origin = .zero
    }
    let newSize = child.bounds.size
    if newSize != size {
      size = newSize
    }
  }
}
