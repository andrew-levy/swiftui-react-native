import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { getValueOrBinding } from '../../utils/binding';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativePickerProps, PickerProps } from './types';

const NativeView: React.ComponentType<NativePickerProps> =
  requireNativeViewManager('Picker');

export function Picker({
  selection,
  style,
  onValueChange,
  options,
  ...modifiers
}: PickerProps) {
  return (
    <NativeView
      options={options}
      selection={getValueOrBinding(selection)}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: '100%',
        height: modifiers.pickerStyle === 'wheel' ? 100 : 35,
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
