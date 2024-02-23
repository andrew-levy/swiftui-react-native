import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { NativeStepperProps, StepperProps } from './types';

const NativeStepper: React.ComponentType<NativeStepperProps> =
  requireNativeViewManager('Stepper');

export function Stepper(props: StepperProps) {
  const {
    value,
    step = 1,
    range = [-100, 100],
    onChange,
    style,
    ...modifiers
  } = props;
  return (
    <NativeStepper
      value={getValueOrBinding(value)}
      modifiers={mapToNativeModifiers(modifiers)}
      step={step}
      range={range}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 100, height: 30 }),
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

Stepper.displayName = 'SwiftUIStepper';
