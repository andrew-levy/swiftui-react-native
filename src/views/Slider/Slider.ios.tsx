import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativeSliderProps, SliderProps } from './types';

const NativeSlider: React.ComponentType<NativeSliderProps> =
  requireNativeViewManager('Slider');

export function Slider({
  value,
  step = 1,
  range = [-100, 100],
  onChange,
  style,
  ...modifiers
}: SliderProps) {
  return (
    <NativeSlider
      value={getValueOrBinding(value)}
      modifiers={mapToNativeModifiers(modifiers)}
      step={step}
      range={range}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 300, height: 35 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange: (e) => {
            const newValue = e.nativeEvent.onValueChange;
            if (typeof value === 'object' && 'setValue' in value) {
              value.setValue(newValue);
            }
            onChange?.(newValue);
          },
        });
      }}
    />
  );
}
