import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { NativeSliderProps, SliderProps } from './types';

const NativeSlider: React.ComponentType<NativeSliderProps> =
  requireNativeViewManager('Slider');

export function Slider(props: SliderProps) {
  const {
    value,
    step = 1,
    range = [-100, 100],
    onChange,
    style,
    ...modifiers
  } = props;

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
      onValueChange={(e) => {
        if (typeof value === 'object' && 'setValue' in value) {
          value.setValue(e.nativeEvent.value);
        }
        onChange?.(e.nativeEvent.value);
      }}
    />
  );
}
