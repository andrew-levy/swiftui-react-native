//
//  SwiftUIMath.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/graphics/Float.h>

#include <algorithm>
#include <cmath>
#include <limits>

namespace swiftuireactnative {

using facebook::react::Float;

inline constexpr Float kInfinity = std::numeric_limits<Float>::infinity();
inline constexpr Float kUndefined = std::numeric_limits<Float>::quiet_NaN();

inline constexpr Float kLayoutEpsilon = 0.25;

inline Float clamp(Float value, Float minimum, Float maximum) {
  return std::max(minimum, std::min(value, maximum));
}

/* Equality for layout values; NaN (our "unset" sentinel) equals NaN. */
inline bool nearlyEqual(Float lhs, Float rhs, Float epsilon = kLayoutEpsilon) {
  if (std::isnan(lhs) || std::isnan(rhs)) {
    return std::isnan(lhs) && std::isnan(rhs);
  }
  return std::abs(lhs - rhs) < epsilon;
}

} // namespace swiftuireactnative
