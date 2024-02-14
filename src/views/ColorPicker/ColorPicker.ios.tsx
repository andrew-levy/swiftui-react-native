import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ColorPickerProps, NativeColorPickerProps } from './types';

const NativeColorPicker: React.ComponentType<NativeColorPickerProps> =
  requireNativeViewManager('ColorPicker');

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
      selection={getValueOrBinding(selection)}
      modifiers={mapToNativeModifiers(modifiers)}
      onValueChange={(e) => {
        if (typeof selection === 'object' && 'setValue' in selection) {
          selection.setValue(e.nativeEvent.value);
        }
        onChange?.(e.nativeEvent.value);
      }}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
