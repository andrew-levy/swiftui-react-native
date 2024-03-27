import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativeToggleProps, ToggleProps } from './types';

const NativeToggle: React.ComponentType<NativeToggleProps> =
  requireNativeViewManager('Toggle');

export function Toggle({
  isOn,
  onChange,
  style,
  title,
  ...modifiers
}: ToggleProps) {
  return (
    <NativeToggle
      isOn={getValueOrBinding(isOn)}
      title={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 51, height: 31 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange: (e) => {
            if (typeof isOn === 'object' && 'setValue' in isOn) {
              isOn.setValue(e.nativeEvent.onValueChange);
            }
            onChange?.(e.nativeEvent.onValueChange);
          },
        });
      }}
    />
  );
}

Toggle.displayName = 'SwiftUIToggle';
