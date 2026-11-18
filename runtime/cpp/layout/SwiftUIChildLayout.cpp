//
//  SwiftUIChildLayout.cpp
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#include "layout/SwiftUIChildLayout.h"

#include "core/SwiftUIPixelGrid.h"

#include <react/renderer/core/LayoutMetrics.h>

namespace swiftuireactnative {

using namespace facebook::react;
namespace yoga = facebook::yoga;

ChildStyle childStyle(const ShadowNode &child) {
  ChildStyle result;
  auto props = dynamic_cast<const YogaStylableProps *>(child.getProps().get());
  if (props == nullptr) {
    return result;
  }
  result.isHidden = props->yogaStyle.display() == yoga::Display::None;
  return result;
}

void layoutChildren(
    YogaLayoutableShadowNode &parent,
    LayoutContext context,
    const std::function<ChildPlacement(size_t, const LayoutableShadowNode &)> &placement) {
  parent.ensureUnsealed();

  // Copy: `replaceChild` mutates the list we are iterating.
  auto children = parent.getChildren();
  size_t layoutableIndex = 0;

  for (size_t index = 0; index < children.size(); index++) {
    const auto &child = children[index];
    auto layoutableChild = dynamic_cast<const LayoutableShadowNode *>(child.get());
    if (layoutableChild == nullptr) {
      continue;
    }

    auto childPlacement = placement(layoutableIndex++, *layoutableChild);

    auto clone = child->clone({});
    auto &layoutableClone = dynamic_cast<LayoutableShadowNode &>(*clone);

    if (childPlacement.hidden) {
      layoutableClone.setLayoutMetrics(LayoutMetrics{.frame = {}, .displayType = DisplayType::None});
    } else {
      layoutableClone.layoutTree(context, childPlacement.constraints);

      auto metrics = layoutableClone.getLayoutMetrics();
      metrics.frame.origin = childPlacement.origin;
      metrics.frame = roundToPixelGrid(metrics.frame, context.pointScaleFactor);
      layoutableClone.setLayoutMetrics(metrics);
    }

    if (context.affectedNodes != nullptr) {
      context.affectedNodes->push_back(&layoutableClone);
    }

    parent.replaceChild(*child, clone, index);
  }
}

} // namespace swiftuireactnative
