//
//  SUIEventDispatch.h
//  Pods
//
//  Created by rit3zh CX on 11/5/26.
//

#pragma once

#import <Foundation/Foundation.h>

#include <react/renderer/core/EventEmitter.h>

#include <memory>
#include <string>

namespace swiftuireactnative {

template <typename EventEmitterT, typename SourceEventEmitterT>
void dispatchEvent(const std::shared_ptr<SourceEventEmitterT> &eventEmitter, NSString *payload)
{
  if (auto emitter = std::static_pointer_cast<const EventEmitterT>(eventEmitter)) {
    emitter->onEvent(typename EventEmitterT::OnEvent{.payload = std::string(payload.UTF8String ?: "")});
  }
}

} // namespace swiftuireactnative
