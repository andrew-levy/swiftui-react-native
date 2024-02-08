import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { NativeSyntheticEvent, ViewProps } from 'react-native';
import { Binding, getValueOrBinding } from '../../utils/binding';
import {
  InternalModifiersBuilder,
  ModifiersProp,
  NativeModifiersProp,
  buildModifiers,
} from '../../utils/modifiers';

type NativePickerProps = {
  selection: string;
  options: any[];
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  modifiers?: NativeModifiersProp;
  onValueChange?: (
    e: NativeSyntheticEvent<{
      value: string;
    }>
  ) => void;
} & ViewProps;

export type PickerProps = {
  selection: Binding<string> | string;
  options: any[];
  pickerStyle?: 'menu' | 'segmented' | 'wheel';
  modifiers?: ModifiersProp;
  onValueChange?: (newValue: string) => void;
} & ViewProps;

const NativeView: React.ComponentType<NativePickerProps> =
  requireNativeViewManager('Picker');

export function Picker({
  modifiers,
  selection,
  style,
  onValueChange,
  pickerStyle,
  ...restProps
}: PickerProps) {
  const pickerStyleModifiers = new InternalModifiersBuilder()
    .pickerStyle(pickerStyle)
    .build();
  return (
    <NativeView
      selection={getValueOrBinding(selection) as string}
      modifiers={[...buildModifiers(modifiers), ...pickerStyleModifiers]}
      style={{
        width: '100%',
        height: 100,
        ...(style as any),
      }}
      onValueChange={(e) => {
        if (typeof selection === 'object' && 'setValue' in selection) {
          selection.setValue(e.nativeEvent.value);
        }
        onValueChange?.(e.nativeEvent.value);
      }}
      {...restProps}
    />
  );
}
