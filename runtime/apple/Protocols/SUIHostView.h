//
//  SUIHostView.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

// Keep this header plain Objective-C: Swift can't import React Native's C++ types.

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^SUIHostViewEventBlock)(NSDictionary<NSString *, id> *payload);

typedef struct {
  CGSize idealSize;
  BOOL flexibleWidth;
  BOOL flexibleHeight;
  CGFloat fittedWidth;
  CGFloat fittedHeight;
  CGFloat childProposalWidth;
} SUIHostMeasurement;

typedef void (^SUIHostViewMeasureBlock)(SUIHostMeasurement measurement);

typedef void (^SUIHostViewChildProposalsBlock)(NSArray<NSNumber *> *widths);

@protocol SUIHostView <NSObject>

@property (nonatomic, copy, nullable) SUIHostViewEventBlock onEvent;

@property (nonatomic, copy, nullable) SUIHostViewMeasureBlock onMeasure;

@property (nonatomic, copy, nullable) SUIHostViewChildProposalsBlock onChildProposals;

- (void)applyProps:(NSDictionary<NSString *, id> *)props;

- (void)insertReactChild:(UIView *)child atIndex:(NSInteger)index;
- (void)removeReactChild:(UIView *)child;

@end

NS_ASSUME_NONNULL_END
