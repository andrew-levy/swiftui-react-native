//
//  SwiftUIHostShadowNode.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/components/view/ConcreteViewShadowNode.h>

#include <cmath>
#include <limits>

#include "layout/SwiftUIChildLayout.h"
#include "measurement/SwiftUIHostMeasurement.h"
#include "state/SwiftUIHostState.h"

namespace swiftuireactnative {

enum class ChildSlotLayout {
  Natural,
  ListRows,
};

template <
    const char *ComponentNameT,
    typename PropsT,
    typename EventEmitterT,
    ChildSlotLayout Slots = ChildSlotLayout::Natural>
class SwiftUIHostShadowNode final
    : public facebook::react::ConcreteViewShadowNode<ComponentNameT, PropsT, EventEmitterT, SwiftUIHostStateData> {
  using Base = facebook::react::ConcreteViewShadowNode<ComponentNameT, PropsT, EventEmitterT, SwiftUIHostStateData>;

 public:
  using Base::Base;

  static facebook::react::ShadowNodeTraits BaseTraits() {
    auto traits = Base::BaseTraits();
    traits.set(facebook::react::ShadowNodeTraits::Trait::LeafYogaNode);
    traits.set(facebook::react::ShadowNodeTraits::Trait::MeasurableYogaNode);
    // SwiftUI places each React child as one unit, so Fabric must never flatten it.
    traits.set(facebook::react::ShadowNodeTraits::Trait::ChildrenFormStackingContext);
    return traits;
  }

  Size measureContent(const LayoutContext & /*context*/, const LayoutConstraints &constraints) const override {
    return measureSwiftUIHost(this->getStateData(), constraints);
  }

  void layout(LayoutContext context) override {
    if (this->getChildren().empty()) {
      return;
    }
    const auto &state = this->getStateData();
    const auto metrics = this->getLayoutMetrics();
    const auto content = metrics.getContentFrame();
    constexpr auto infinity = std::numeric_limits<Float>::infinity();

    LayoutConstraints constraints{.layoutDirection = metrics.layoutDirection};
    if constexpr (Slots == ChildSlotLayout::ListRows) {
      // Approximates the insetGrouped row insets until SwiftUI reports the real width.
      auto rowWidth = std::isnan(state.childProposalWidth) ? std::max<Float>(0, content.size.width - 80)
                                                           : state.childProposalWidth;
      constraints.minimumSize = Size{.width = rowWidth, .height = 0};
      constraints.maximumSize = Size{.width = rowWidth, .height = infinity};
    } else {
      auto width = std::isnan(state.childProposalWidth) ? infinity : state.childProposalWidth;
      constraints.maximumSize = Size{.width = width, .height = infinity};
    }

    layoutChildren(*this, context, [&](size_t index, const LayoutableShadowNode &child) {
      if (childStyle(child).isHidden) {
        return ChildPlacement{.hidden = true};
      }
      auto childConstraints = constraints;
      if (index < state.childProposalWidths.size() && !std::isnan(state.childProposalWidths[index])) {
        childConstraints.maximumSize.width = state.childProposalWidths[index];
        childConstraints.minimumSize.width =
            std::min(childConstraints.minimumSize.width, childConstraints.maximumSize.width);
      }
      return ChildPlacement{.constraints = childConstraints};
    });
  }
};

} // namespace swiftuireactnative
