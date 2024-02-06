import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Binding, getValueOrBinding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  buildModifiers,
} from '../../utils/modifiers';

const NativeStepper: React.ComponentType<NativeStepperProps> =
  requireNativeViewManager('Stepper');

type NativeStepperProps = {
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
type StepperProps = {
  step?: number;
  range?: [number, number];
  value: Binding<number>;
  modifiers?: ModifiersProp;
  onChange?: (value?: number) => void;
  style?: StyleProp<ViewStyle>;
};

export function Stepper(props: StepperProps) {
  const {
    value,
    step = 1,
    range = [-100, 100],
    onChange,
    style,
    modifiers,
  } = props;
  return (
    <NativeStepper
      value={getValueOrBinding(value) as number}
      modifiers={buildModifiers(modifiers)}
      step={step}
      range={range}
      style={{
        width: '100%',
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
