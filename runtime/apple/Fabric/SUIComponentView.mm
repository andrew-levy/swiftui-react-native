//
//  SUIComponentView.mm
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#import "SUIComponentView.h"

#import <react/renderer/core/ConcreteState.h>

#import "SUIJSON.h"
#import "state/SwiftUIHostState.h"

#include <cmath>

using namespace facebook::react;
using SwiftUIHostState = ConcreteState<swiftuireactnative::SwiftUIHostStateData>;

#pragma mark - SUIComponentView

@implementation SUIComponentView {
  std::shared_ptr<const SwiftUIHostState> _hostState;
  BOOL _hasMeasurement;
  SUIHostMeasurement _measurement;
  std::vector<facebook::react::Float> _childProposalWidths;
}

+ (NSString *)hostViewClassName
{
  [NSException raise:NSInternalInconsistencyException
              format:@"%@ must override +hostViewClassName", NSStringFromClass(self)];
  return @"";
}

// SwiftUI hierarchies are stateful and expensive to rebuild; never recycle them.
+ (BOOL)shouldBeRecycled
{
  return NO;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    NSString *className = [[self class] hostViewClassName];
    Class hostClass = NSClassFromString(className);
    NSAssert(hostClass != nil, @"[swiftui-react-native] Swift host view %@ was not linked", className);

    _hostView = [(UIView<SUIHostView> *)[hostClass alloc] initWithFrame:frame];

    __weak __typeof(self) weakSelf = self;
    _hostView.onEvent = ^(NSDictionary<NSString *, id> *payload) {
      NSString *json = SUIJSONStringFromPayload(payload);
      if (json != nil) {
        [weakSelf dispatchEventPayload:json];
      }
    };
    _hostView.onMeasure = ^(SUIHostMeasurement measurement) {
      [weakSelf applyMeasurement:measurement];
    };
    _hostView.onChildProposals = ^(NSArray<NSNumber *> *widths) {
      [weakSelf applyChildProposals:widths];
    };

    self.contentView = _hostView;
  }
  return self;
}

- (void)applyChangedProps:(NSDictionary<NSString *, id> *)changedProps
{
  if (changedProps.count > 0) {
    [_hostView applyProps:changedProps];
  }
}

- (void)dispatchEventPayload:(NSString *)payload
{
}

#pragma mark - Measurement -> shadow node state

// A React commit can carry stale state and mount it after our update, so re-send until they match.

- (void)updateState:(const State::Shared &)state oldState:(const State::Shared &)oldState
{
  _hostState = std::dynamic_pointer_cast<const SwiftUIHostState>(state);
  [self syncHostState];
}

- (void)applyMeasurement:(SUIHostMeasurement)measurement
{
  _measurement = measurement;
  _hasMeasurement = YES;
  [self syncHostState];
}

- (void)applyChildProposals:(NSArray<NSNumber *> *)widths
{
  _childProposalWidths.clear();
  for (NSNumber *width in widths) {
    _childProposalWidths.push_back(width.doubleValue);
  }
  [self syncHostState];
}

- (void)syncHostState
{
  if (_hostState == nullptr) {
    return;
  }
  auto data = _hostState->getData();
  if (_hasMeasurement) {
    data.idealSize = facebook::react::Size{.width = _measurement.idealSize.width, .height = _measurement.idealSize.height};
    data.flexibleWidth = _measurement.flexibleWidth;
    data.flexibleHeight = _measurement.flexibleHeight;
    data.fittedWidth = _measurement.fittedWidth;
    data.fittedHeight = _measurement.fittedHeight;
    data.childProposalWidth = _measurement.childProposalWidth;
    data.isMeasured = true;
  }
  data.childProposalWidths = _childProposalWidths;
  // `!=` treats NaN widths as equal, so an unchanged report never triggers an update.
  if (data != _hostState->getData()) {
    _hostState->updateState(std::move(data));
  }
}

#pragma mark - Children

// Children are owned by SwiftUI (see ReactChildView.swift), not added as subviews.

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_hostView insertReactChild:childComponentView atIndex:index];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  [_hostView removeReactChild:childComponentView];
  [childComponentView removeFromSuperview];
}

@end
