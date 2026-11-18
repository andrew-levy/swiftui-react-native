//
//  SUIPropConversion.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#import <Foundation/Foundation.h>

#include <cmath>
#include <string>
#include <vector>

namespace swiftuireactnative {

// MARK: - C++ -> Objective-C

inline id toObjC(const std::string &value)
{
  return [NSString stringWithUTF8String:value.c_str()] ?: @"";
}

inline id toObjC(bool value)
{
  return @(value);
}

inline id toObjC(double value)
{
  return @(value);
}

inline id toObjC(float value)
{
  return @(value);
}

inline id toObjC(int value)
{
  return @(value);
}

template <typename T>
id toObjC(const std::vector<T> &values)
{
  NSMutableArray *array = [NSMutableArray arrayWithCapacity:values.size()];
  for (const auto &value : values) {
    [array addObject:toObjC(value)];
  }
  return array;
}

// MARK: - Equality (NaN is the "unset" sentinel for optional numbers, so NaN == NaN)

template <typename T>
bool propEqual(const T &lhs, const T &rhs)
{
  return lhs == rhs;
}

inline bool propEqual(double lhs, double rhs)
{
  return lhs == rhs || (std::isnan(lhs) && std::isnan(rhs));
}

inline bool propEqual(float lhs, float rhs)
{
  return lhs == rhs || (std::isnan(lhs) && std::isnan(rhs));
}

} // namespace swiftuireactnative

/// Expects locals named `oldViewProps`, `newViewProps` and `changedProps`.
#define SUI_DIFF_PROP(name)                                                         \
  if (!swiftuireactnative::propEqual(oldViewProps.name, newViewProps.name)) {       \
    changedProps[@#name] = swiftuireactnative::toObjC(newViewProps.name);           \
  }
