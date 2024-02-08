import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Binding, getValueOrBinding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  buildModifiers,
} from '../../utils/modifiers';

const NativeColorPicker: React.ComponentType<NativeColorPickerProps> =
  requireNativeViewManager('ColorPicker');

type NativeColorPickerProps = {
  selection: string;
  onValueChange?: (e: {
    nativeEvent: {
      value: string;
    };
  }) => void;
  modifiers?: NativeModifiersProp;
  label?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
};

type ColorPickerProps = {
  selection: string | Binding<string>;
  onChange?: (color: string) => void;
  modifiers?: ModifiersProp;
  label?: string;
  supportsOpacity?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ColorPicker({
  modifiers,
  selection,
  style,
  supportsOpacity = true,
  onChange,
  ...restProps
}: ColorPickerProps) {
  return (
    <NativeColorPicker
      supportsOpacity={supportsOpacity}
      selection={getValueOrBinding(selection) as string}
      modifiers={buildModifiers(modifiers)}
      onValueChange={(e) => {
        if (typeof selection === 'object' && 'setValue' in selection) {
          selection.setValue(e.nativeEvent.value);
        }
        onChange?.(e.nativeEvent.value);
      }}
      style={{
        width: '100%',
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
