import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { getValueOrBinding } from '../../utils/binding';
import {
  InternalModifiersBuilder,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { NativePickerProps, PickerProps } from './types';

const NativeView: React.ComponentType<NativePickerProps> =
  requireNativeViewManager('Picker');

export function Picker({
  selection,
  style,
  onValueChange,
  options,
  pickerStyle,
  ...modifiers
}: PickerProps) {
  const pickerStyleModifiers = new InternalModifiersBuilder()
    .pickerStyle(pickerStyle)
    .build();
  return (
    <NativeView
      options={options}
      selection={getValueOrBinding(selection) as string}
      modifiers={[...mapToNativeModifiers(modifiers), ...pickerStyleModifiers]}
      style={{
        width: '100%',
        height: pickerStyle === 'wheel' ? 100 : 35,
        ...(style as any),
      }}
      onValueChange={(e) => {
        if (typeof selection === 'object' && 'setValue' in selection) {
          selection.setValue(e.nativeEvent.value);
        }
        onValueChange?.(e.nativeEvent.value);
      }}
    />
  );
}
