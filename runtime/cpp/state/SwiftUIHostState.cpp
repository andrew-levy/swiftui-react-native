//
//  SwiftUIHostState.cpp
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#include "state/SwiftUIHostState.h"

namespace swiftuireactnative {

namespace {

bool childProposalWidthsEqual(const std::vector<Float> &lhs, const std::vector<Float> &rhs) {
  if (lhs.size() != rhs.size()) {
    return false;
  }
  for (size_t index = 0; index < lhs.size(); index++) {
    if (!nearlyEqual(lhs[index], rhs[index])) {
      return false;
    }
  }
  return true;
}

} // namespace

bool SwiftUIHostStateData::operator==(const SwiftUIHostStateData &rhs) const {
  return nearlyEqual(idealSize.width, rhs.idealSize.width) &&
      nearlyEqual(idealSize.height, rhs.idealSize.height) && flexibleWidth == rhs.flexibleWidth &&
      flexibleHeight == rhs.flexibleHeight && nearlyEqual(fittedWidth, rhs.fittedWidth) &&
      nearlyEqual(fittedHeight, rhs.fittedHeight) && nearlyEqual(childProposalWidth, rhs.childProposalWidth) &&
      isMeasured == rhs.isMeasured && childProposalWidthsEqual(childProposalWidths, rhs.childProposalWidths);
}

} // namespace swiftuireactnative
