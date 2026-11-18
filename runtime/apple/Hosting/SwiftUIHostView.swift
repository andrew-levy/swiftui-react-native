//
//  SwiftUIHostView.swift
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

import SwiftUI
import UIKit

// Subclasses are created from Objective-C++ by name, so each needs @objc(SUI<Name>HostView).
@objc(SUISwiftUIHostView)
open class SwiftUIHostView: UIView, SUIHostView {
  @objc public var onEvent: SUIHostViewEventBlock?
  @objc public var onMeasure: SUIHostViewMeasureBlock? {
    didSet { setNeedsMeasurement() }
  }

  public private(set) var reactChildren: [UIView] = []

  open var respectsSafeArea: Bool { false }

  private var hostingController: UIViewController?
  private var sizeThatFits: ((CGSize) -> CGSize)?
  private var childObservations: [ObjectIdentifier: NSKeyValueObservation] = [:]

  private var lastMeasurement: SUIHostMeasurement?
  private var isMeasurementScheduled = false
  private var lastMeasuredWidth: CGFloat = .nan

  private static let probeLength: CGFloat = 100_000

  public override init(frame: CGRect) {
    super.init(frame: frame)
    setUp()
  }

  open func setUp() {}

  @available(*, unavailable)
  public required init?(coder: NSCoder) {
    fatalError("init(coder:) is not supported")
  }

  deinit {
    childObservations.values.forEach { $0.invalidate() }
  }

  public weak var measurementOwner: SwiftUIHostView? {
    didSet {
      guard (oldValue == nil) != (measurementOwner == nil) else { return }
      if measurementOwner != nil {
        finishAppearance()
        hostingController?.willMove(toParent: nil)
        hostingController?.view.removeFromSuperview()
        hostingController?.removeFromParent()
        hostingController = nil
        sizeThatFits = nil
        lastMeasurement = nil
        lastIntrinsicSize = nil
      } else if window != nil {
        installContent?()
      }
      // Unmounted with its parent: don't render again until it's back in a window.
    }
  }

  open override func didMoveToWindow() {
    super.didMoveToWindow()
    updateControllerParent()
    if window != nil, measurementOwner == nil, hostingController == nil {
      installContent?()
    }
  }

  private var installContent: (() -> Void)?

  open var defersContentInstallation: Bool { false }

  public func setContent<Content: View>(_ content: Content) {
    installContent = { [weak self] in self?.installHostingController(content) }
    guard measurementOwner == nil else { return }
    if defersContentInstallation {
      DispatchQueue.main.async { [weak self] in
        guard let self, self.measurementOwner == nil, self.hostingController == nil else { return }
        self.installContent?()
      }
    } else {
      installHostingController(content)
    }
  }

  private func installHostingController<Content: View>(_ content: Content) {
    hostingController?.view.removeFromSuperview()
    let controller = SUIHostingController(rootView: content)
    // An intrinsic size change doesn't always lay out the superview, so re-measure here too.
    controller.onLayout = { [weak self] in
      self?.finishAppearanceIfReady()
      guard let self, !self.isMeasuring, self.idealSizeChanged() else { return }
      self.setNeedsMeasurement()
    }
    if #available(iOS 16.0, *) {
      controller.sizingOptions = [.intrinsicContentSize]
    }
    if #available(iOS 16.4, *), !respectsSafeArea {
      controller.safeAreaRegions = []
    }
    controller.view.translatesAutoresizingMaskIntoConstraints = false
    controller.view.backgroundColor = .clear
    addSubview(controller.view)
    NSLayoutConstraint.activate([
      controller.view.topAnchor.constraint(equalTo: topAnchor),
      controller.view.bottomAnchor.constraint(equalTo: bottomAnchor),
      controller.view.leftAnchor.constraint(equalTo: leftAnchor),
      controller.view.rightAnchor.constraint(equalTo: rightAnchor),
    ])
    hostingController = controller
    sizeThatFits = { [unowned controller] proposal in controller.sizeThatFits(in: proposal) }
    setNeedsMeasurement()
    updateControllerParent()
  }

  private func updateControllerParent() {
    guard respectsSafeArea, let controller = hostingController else { return }
    if window == nil {
      guard controller.parent != nil else { return }
      finishAppearance()
      controller.willMove(toParent: nil)
      controller.removeFromParent()
    } else if controller.parent == nil, let parent = nearestViewController {
      parent.addChild(controller)
      controller.didMove(toParent: parent)
      // Already in the window, so UIKit won't send viewWillAppear and the controller gets no safe area.
      controller.beginAppearanceTransition(true, animated: false)
      isAppearing = true
      // A container that creates no controller of its own must not stay mid-transition.
      DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self] in self?.finishAppearance() }
    }
  }

  private var isAppearing = false

  private func finishAppearanceIfReady() {
    guard hostingController?.children.isEmpty == false else { return }
    finishAppearance()
  }

  private func finishAppearance() {
    guard isAppearing else { return }
    isAppearing = false
    hostingController?.endAppearanceTransition()
  }

  private var nearestViewController: UIViewController? {
    var responder = next
    while let current = responder {
      if let controller = current as? UIViewController { return controller }
      responder = current.next
    }
    return nil
  }

  // MARK: - SUIHostView

  @objc open func applyProps(_ props: [String: Any]) {}

  // MARK: - React child identity

  private var reactChildIDs: [ObjectIdentifier: Int] = [:]
  private static var reactChildIDCounter = 0

  func reactChildID(for child: UIView) -> Int {
    if let id = reactChildIDs[ObjectIdentifier(child)] { return id }
    Self.reactChildIDCounter += 1
    reactChildIDs[ObjectIdentifier(child)] = Self.reactChildIDCounter
    return Self.reactChildIDCounter
  }

  @objc(insertReactChild:atIndex:)
  public func insertReactChild(_ child: UIView, at index: Int) {
    Self.reactChildIDCounter += 1
    reactChildIDs[ObjectIdentifier(child)] = Self.reactChildIDCounter
    reactChildren.insert(child, at: min(max(index, 0), reactChildren.count))
    childObservations[ObjectIdentifier(child)] = child.layer.observe(\.bounds) { [weak self] _, _ in
      self?.setNeedsMeasurement()
    }
    reactChildrenDidChange()
    setNeedsMeasurement()
    // Use the siblings' width until SwiftUI reports its own, so it never shows unwrapped for a frame.
    scheduleChildProposalPublish()
  }

  @objc(removeReactChild:)
  public func removeReactChild(_ child: UIView) {
    reactChildren.removeAll { $0 === child }
    childObservations.removeValue(forKey: ObjectIdentifier(child))?.invalidate()
    reactChildIDs.removeValue(forKey: ObjectIdentifier(child))
    proposedWidths.removeValue(forKey: ObjectIdentifier(child))
    reactChildrenDidChange()
    setNeedsMeasurement()
  }

  open func reactChildrenDidChange() {}

  // MARK: - Measurement

  public func setNeedsMeasurement() {
    if let measurementOwner {
      measurementOwner.setNeedsMeasurement()
      return
    }
    guard !isMeasurementScheduled else { return }
    isMeasurementScheduled = true
    DispatchQueue.main.async { [weak self] in
      guard let self else { return }
      self.isMeasurementScheduled = false
      self.measure()
    }
  }

  // MARK: - Widths proposed to React children

  @objc public var onChildProposals: SUIHostViewChildProposalsBlock?

  private var proposedWidths: [ObjectIdentifier: CGFloat] = [:]
  private var publishedProposals: [CGFloat] = []
  private var isProposalPublishScheduled = false
  private var lastProposedWidth: CGFloat = .nan

  private var rootHost: SwiftUIHostView {
    var host = self
    while let owner = host.measurementOwner { host = owner }
    return host
  }

  private var fallbackProposedWidth: CGFloat {
    lastProposedWidth.isNaN ? rootHost.lastProposedWidth : lastProposedWidth
  }

  func setProposedWidth(_ width: CGFloat, for child: UIView) {
    let key = ObjectIdentifier(child)
    lastProposedWidth = width
    rootHost.lastProposedWidth = width
    if let previous = proposedWidths[key], abs(previous - width) <= 0.25 { return }
    proposedWidths[key] = width
    scheduleChildProposalPublish()
  }

  private func scheduleChildProposalPublish() {
    guard !isProposalPublishScheduled else { return }
    isProposalPublishScheduled = true
    DispatchQueue.main.async { [weak self] in
      guard let self else { return }
      self.isProposalPublishScheduled = false
      self.publishChildProposals()
    }
  }

  private func publishChildProposals() {
    let live = Set(reactChildren.map(ObjectIdentifier.init))
    proposedWidths = proposedWidths.filter { live.contains($0.key) }
    let fallback = fallbackProposedWidth
    let widths = reactChildren.map { proposedWidths[ObjectIdentifier($0)] ?? fallback }
    let unchanged =
      widths.count == publishedProposals.count
      && zip(widths, publishedProposals).allSatisfy { a, b in (a.isNaN && b.isNaN) || abs(a - b) <= 0.25 }
    guard !unchanged else { return }
    publishedProposals = widths
    onChildProposals?(widths.map { NSNumber(value: Double($0)) })
  }

  public var childProposalWidth: CGFloat = .nan {
    didSet {
      if abs(childProposalWidth - oldValue) > 0.25 || childProposalWidth.isNaN != oldValue.isNaN {
        setNeedsMeasurement()
      }
    }
  }

  open override func layoutSubviews() {
    super.layoutSubviews()
    if abs(bounds.width - lastMeasuredWidth) > 0.25 || idealSizeChanged() {
      setNeedsMeasurement()
    }
  }

  private func idealSizeChanged() -> Bool {
    guard let controller = hostingController, let last = lastIntrinsicSize else { return false }
    let ideal = controller.view.intrinsicContentSize
    return abs(ideal.width - last.width) > 0.25 || abs(ideal.height - last.height) > 0.25
  }

  private var lastIntrinsicSize: CGSize?
  private var isMeasuring = false

  private func measure() {
    guard let controller = hostingController, let sizeThatFits, let onMeasure else { return }
    isMeasuring = true
    defer { isMeasuring = false }

    // SwiftUI renders in the layout pass, so intrinsicContentSize can still describe the old content.
    controller.view.setNeedsLayout()
    controller.view.layoutIfNeeded()

    let probe = Self.probeLength
    let maximum = sizeThatFits(CGSize(width: probe, height: probe))
    let flexibleWidth = maximum.width >= probe / 2
    let flexibleHeight = maximum.height >= probe / 2

    let intrinsic = controller.view.intrinsicContentSize
    lastIntrinsicSize = intrinsic
    func ideal(_ intrinsic: CGFloat, _ maximum: CGFloat, flexible: Bool) -> CGFloat {
      if intrinsic >= 0, intrinsic < probe / 2 { return intrinsic }
      return flexible ? 0 : maximum
    }
    let idealSize = CGSize(
      width: ideal(intrinsic.width, maximum.width, flexible: flexibleWidth),
      height: ideal(intrinsic.height, maximum.height, flexible: flexibleHeight)
    )

    var fittedWidth = CGFloat.nan
    var fittedHeight: CGFloat = 0
    let width = bounds.width
    if width > 0, !flexibleHeight, width < idealSize.width - 0.5 {
      fittedWidth = width
      fittedHeight = sizeThatFits(CGSize(width: width, height: probe)).height
    }
    lastMeasuredWidth = width

    let measurement = SUIHostMeasurement(
      idealSize: Self.roundedUp(idealSize),
      flexibleWidth: ObjCBool(flexibleWidth),
      flexibleHeight: ObjCBool(flexibleHeight),
      fittedWidth: fittedWidth,
      fittedHeight: Self.roundedUp(fittedHeight),
      childProposalWidth: childProposalWidth
    )
    if let last = lastMeasurement, Self.isEqual(last, measurement) { return }
    lastMeasurement = measurement
    onMeasure(measurement)
  }

  private static func roundedUp(_ value: CGFloat) -> CGFloat {
    let scale = UIScreen.main.scale
    return ceil(value * scale - 0.001) / scale
  }

  private static func roundedUp(_ size: CGSize) -> CGSize {
    CGSize(width: roundedUp(size.width), height: roundedUp(size.height))
  }

  private static func isEqual(_ lhs: SUIHostMeasurement, _ rhs: SUIHostMeasurement) -> Bool {
    func same(_ a: CGFloat, _ b: CGFloat) -> Bool { (a.isNaN && b.isNaN) || abs(a - b) < 0.25 }
    return same(lhs.idealSize.width, rhs.idealSize.width) && same(lhs.idealSize.height, rhs.idealSize.height)
      && lhs.flexibleWidth.boolValue == rhs.flexibleWidth.boolValue
      && lhs.flexibleHeight.boolValue == rhs.flexibleHeight.boolValue
      && same(lhs.fittedWidth, rhs.fittedWidth) && same(lhs.fittedHeight, rhs.fittedHeight)
      && same(lhs.childProposalWidth, rhs.childProposalWidth)
  }
}

private final class SUIHostingController<Content: View>: UIHostingController<Content> {
  var onLayout: (() -> Void)?

  override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()
    onLayout?()
  }
}
