//
//  SwiftUIHostMeasurement.cpp
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#include "measurement/SwiftUIHostMeasurement.h"

#include <algorithm>
#include <cmath>

namespace swiftuireactnative {

Size measureSwiftUIHost(const SwiftUIHostStateData &state, const LayoutConstraints &constraints) {
  const auto &minimum = constraints.minimumSize;
  const auto &maximum = constraints.maximumSize;

  Float width = (state.flexibleWidth && std::isfinite(maximum.width))
      ? maximum.width
      : std::min(state.idealSize.width, maximum.width);
  width = clamp(width, minimum.width, maximum.width);

  Float height = state.idealSize.height;
  if (state.flexibleHeight && std::isfinite(maximum.height)) {
    height = maximum.height;
  } else if (!std::isnan(state.fittedWidth) && std::abs(width - state.fittedWidth) < 0.5) {
    height = state.fittedHeight;
  }
  height = clamp(height, minimum.height, maximum.height);

  return Size{.width = width, .height = height};
}

} // namespace swiftuireactnative
