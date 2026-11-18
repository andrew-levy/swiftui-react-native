//
//  SwiftUIChildLayout.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/components/view/YogaLayoutableShadowNode.h>
#include <react/renderer/components/view/YogaStylableProps.h>
#include <react/renderer/core/LayoutConstraints.h>
#include <react/renderer/core/LayoutContext.h>
#include <react/renderer/core/LayoutableShadowNode.h>
#include <react/renderer/graphics/Float.h>
#include <react/renderer/graphics/Rect.h>
#include <react/renderer/graphics/Size.h>

#include <functional>

namespace swiftuireactnative {

using facebook::react::Float;
using facebook::react::LayoutableShadowNode;
using facebook::react::LayoutConstraints;
using facebook::react::LayoutContext;
using facebook::react::Point;
using facebook::react::ShadowNode;
using facebook::react::Size;
using facebook::react::YogaLayoutableShadowNode;

struct ChildPlacement {
  LayoutConstraints constraints{};
  Point origin{};
  bool hidden{false};
};

struct ChildStyle {
  bool isHidden{false};
};

ChildStyle childStyle(const ShadowNode &child);

void layoutChildren(
    YogaLayoutableShadowNode &parent,
    LayoutContext context,
    const std::function<ChildPlacement(size_t, const LayoutableShadowNode &)> &placement);

} // namespace swiftuireactnative
