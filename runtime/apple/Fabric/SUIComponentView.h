//
//  SUIComponentView.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#import "SUIEventDispatch.h"
#import "SUIHostView.h"
#import "SUIPropConversion.h"

NS_ASSUME_NONNULL_BEGIN

@interface SUIComponentView : RCTViewComponentView

@property (nonatomic, strong, readonly) UIView<SUIHostView> *hostView;

+ (NSString *)hostViewClassName;

- (void)applyChangedProps:(NSDictionary<NSString *, id> *)changedProps;

- (void)dispatchEventPayload:(NSString *)payload;

@end

NS_ASSUME_NONNULL_END
