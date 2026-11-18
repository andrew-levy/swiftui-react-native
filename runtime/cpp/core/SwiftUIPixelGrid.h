//
//  SwiftUIPixelGrid.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/graphics/Float.h>
#include <react/renderer/graphics/Rect.h>

namespace swiftuireactnative {

using facebook::react::Float;
using facebook::react::Rect;

Rect roundToPixelGrid(const Rect &frame, Float pointScaleFactor);

} // namespace swiftuireactnative
