import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ColorPickerProps, NativeColorPickerProps } from './types';

const NativeColorPicker: React.ComponentType<NativeColorPickerProps> =
  requireNativeViewManager('ColorPicker');

export function ColorPicker({
  selection,
  style,
  supportsOpacity = true,
  label,
  onChange,
  ...modifiers
}: ColorPickerProps) {
  return (
    <NativeColorPicker
      supportsOpacity={supportsOpacity}
      label={label}
      selection={getValueOrBinding(selection)}
      modifiers={mapToNativeModifiers(modifiers)}
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
    />
  );
}
