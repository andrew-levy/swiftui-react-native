import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { ColorPickerProps, NativeColorPickerProps } from './types';

const NativeColorPicker: React.ComponentType<NativeColorPickerProps> =
  requireNativeViewManager('ColorPicker');

export function ColorPicker({
  selection,
  style,
  supportsOpacity = true,
  title,
  onChange,
  ...modifiers
}: ColorPickerProps) {
  return (
    <NativeColorPicker
      supportsOpacity={supportsOpacity}
      title={title}
      selection={getValueOrBinding(selection)}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, {
          width: title ? 300 : 30,
          height: 30,
        }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange(e) {
            if (typeof selection === 'object' && 'setValue' in selection) {
              selection.setValue(e.nativeEvent.onValueChange);
            }
            onChange?.(e.nativeEvent.onValueChange);
          },
        });
      }}
    />
  );
}
