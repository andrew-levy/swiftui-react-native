//
//  SUIGeneratedComponentView.h
//  swiftui-react-native
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#import "SUIComponentView.h"

#define SUI_GENERATED_COMPONENT_VIEW(Name)                                                                   \
  @interface SUIGenerated##Name##ComponentView : SUIComponentView                                            \
  @end                                                                                                       \
                                                                                                             \
  @implementation SUIGenerated##Name##ComponentView                                                          \
                                                                                                             \
  +(facebook::react::ComponentDescriptorProvider)componentDescriptorProvider                                 \
  {                                                                                                          \
    return facebook::react::concreteComponentDescriptorProvider<                                             \
        facebook::react::SwiftUIGenerated##Name##ComponentDescriptor>();                                     \
  }                                                                                                          \
                                                                                                             \
  +(NSString *)hostViewClassName                                                                             \
  {                                                                                                          \
    return @"SUIGenerated" #Name "HostView";                                                                 \
  }                                                                                                          \
                                                                                                             \
  -(instancetype)initWithFrame : (CGRect)frame                                                               \
  {                                                                                                          \
    if (self = [super initWithFrame:frame]) {                                                                \
      static const auto defaultProps = std::make_shared<const facebook::react::SwiftUIGenerated##Name##Props>(); \
      _props = defaultProps;                                                                                 \
    }                                                                                                        \
    return self;                                                                                             \
  }                                                                                                          \
                                                                                                             \
  -(void)updateProps : (const facebook::react::Props::Shared &)props oldProps                                \
      : (const facebook::react::Props::Shared &)oldProps                                                     \
  {                                                                                                          \
    const auto &oldViewProps =                                                                               \
        *std::static_pointer_cast<const facebook::react::SwiftUIGenerated##Name##Props>(_props);             \
    const auto &newViewProps =                                                                               \
        *std::static_pointer_cast<const facebook::react::SwiftUIGenerated##Name##Props>(props);              \
    NSMutableDictionary<NSString *, id> *changedProps = [NSMutableDictionary new];                           \
    SUI_DIFF_PROP(nodeProps)                                                                                   \
    SUI_DIFF_PROP(modifiers)                                                                                 \
    [self applyChangedProps:changedProps];                                                                   \
    [super updateProps:props oldProps:oldProps];                                                             \
  }                                                                                                          \
                                                                                                             \
  -(void)dispatchEventPayload : (NSString *)payload                                                          \
  {                                                                                                          \
    swiftuireactnative::dispatchEvent<facebook::react::SwiftUIGenerated##Name##EventEmitter>(_eventEmitter, payload); \
  }                                                                                                          \
                                                                                                             \
  @end
