//
//  SwiftUIHostMeasurement.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/core/LayoutConstraints.h>
#include <react/renderer/graphics/Size.h>

#include "state/SwiftUIHostState.h"

namespace swiftuireactnative {

using facebook::react::LayoutConstraints;

Size measureSwiftUIHost(const SwiftUIHostStateData &state, const LayoutConstraints &constraints);

} // namespace swiftuireactnative
