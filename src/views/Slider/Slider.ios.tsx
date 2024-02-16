import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Binding, getValueOrBinding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeSlider: React.ComponentType<NativeSliderProps> =
  requireNativeViewManager('Slider');

type NativeSliderProps = {
  step?: number;
  range?: [number, number];
  value: number;
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: {
    nativeEvent: {
      value: number;
    };
  }) => void;
  style?: StyleProp<ViewStyle>;
};
type SliderProps = {
  step?: number;
  range?: [number, number];
  value: Binding<number> | number;
  modifiers?: ModifiersProp;
  onChange?: (value?: number) => void;
  style?: StyleProp<ViewStyle>;
};

export function Slider(props: SliderProps) {
  const {
    value,
    step = 1,
    range = [-100, 100],
    onChange,
    style,
    modifiers,
  } = props;

  return (
    <NativeSlider
      value={getValueOrBinding(value)}
      modifiers={mapToNativeModifiers(modifiers)}
      step={step}
      range={range}
      style={{
        width: 300,
        height: 30,
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
