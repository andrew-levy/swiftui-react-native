import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSyntheticEvent } from 'react-native';
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
        ...getSizeFromModifiers(modifiers, { width: 300, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange(e: NativeSyntheticEvent<{ value: string }>) {
            if (typeof selection === 'object' && 'setValue' in selection) {
              selection.setValue(e.nativeEvent.value as string);
            }
            onChange?.(e.nativeEvent.value as string);
          },
        });
      }}
    />
  );
}
