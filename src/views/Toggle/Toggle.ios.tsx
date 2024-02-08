import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BooleanBinding, getValueOrBinding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeToggle: React.ComponentType<NativeToggleProps> =
  requireNativeViewManager('Toggle');

type NativeToggleProps = {
  isOn: boolean;
  label?: string;
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: {
    nativeEvent: {
      value: boolean;
    };
  }) => void;
  style?: StyleProp<ViewStyle>;
};
type ToggleProps = {
  isOn: BooleanBinding | boolean;
  label?: string;
  modifiers?: ModifiersProp;
  onChange?: (value?: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export function Toggle({
  isOn,
  onChange,
  style,
  modifiers,
  ...restProps
}: ToggleProps) {
  return (
    <NativeToggle
      isOn={getValueOrBinding(isOn)}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 50,
        height: 30,
        ...(style as object),
      }}
      onValueChange={(e) => {
        if (typeof isOn === 'object' && 'setValue' in isOn) {
          isOn.setValue(e.nativeEvent.value);
        }
        onChange?.(e.nativeEvent.value);
      }}
      {...restProps}
    />
  );
}
