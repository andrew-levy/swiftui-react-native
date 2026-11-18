//
//  SwiftUIPixelGrid.cpp
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#include "core/SwiftUIPixelGrid.h"

#include <cmath>

namespace swiftuireactnative {

using facebook::react::Point;
using facebook::react::Size;

namespace {

Float normalizedScale(Float pointScaleFactor) {
  return pointScaleFactor > 0 ? pointScaleFactor : 1;
}

} // namespace

Rect roundToPixelGrid(const Rect &frame, Float pointScaleFactor) {
  auto scale = normalizedScale(pointScaleFactor);
  return Rect{
      .origin =
          Point{.x = std::round(frame.origin.x * scale) / scale, .y = std::round(frame.origin.y * scale) / scale},
      .size = Size{
          .width = std::ceil(frame.size.width * scale - 0.001f) / scale,
          .height = std::ceil(frame.size.height * scale - 0.001f) / scale}};
}

} // namespace swiftuireactnative
