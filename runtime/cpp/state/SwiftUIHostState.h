//
//  SwiftUIHostState.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#include <react/renderer/graphics/Float.h>
#include <react/renderer/graphics/Size.h>

#include "core/SwiftUIMath.h"

#include <vector>

namespace swiftuireactnative {

using facebook::react::Size;

struct SwiftUIHostStateData {
  Size idealSize{};

  bool flexibleWidth{false};
  bool flexibleHeight{false};

  Float fittedWidth{kUndefined};
  Float fittedHeight{0};

  Float childProposalWidth{kUndefined};

  std::vector<Float> childProposalWidths{};

  bool isMeasured{false};

  bool operator==(const SwiftUIHostStateData &rhs) const;
  bool operator!=(const SwiftUIHostStateData &rhs) const {
    return !(*this == rhs);
  }
};

} // namespace swiftuireactnative
