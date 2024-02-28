import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { DatePickerProps, NativeDatePickerProps } from './types';

const NativeDatePicker: React.ComponentType<NativeDatePickerProps> =
  requireNativeViewManager('DatePicker');

export function DatePicker({
  selection,
  displayedComponents,
  style,
  onChange,
  title,
  ...modifiers
}: DatePickerProps) {
  return (
    <NativeDatePicker
      selection={getValueOrBinding(selection).toISOString()}
      modifiers={mapToNativeModifiers(modifiers)}
      title={title}
      displayedComponents={
        Array.isArray(displayedComponents)
          ? displayedComponents
          : [displayedComponents]
      }
      style={{
        ...getSizeFromModifiers(modifiers, { width: 300, height: 35 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange(e) {
            const newDate = new Date(e.nativeEvent.onValueChange);
            if (typeof selection === 'object' && 'setValue' in selection) {
              selection.setValue(newDate);
            }
            onChange?.(newDate);
          },
        });
      }}
    />
  );
}
