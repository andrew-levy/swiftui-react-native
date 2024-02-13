import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { DatePickerProps, NativeDatePickerProps } from './types';

const NativeDatePicker: React.ComponentType<NativeDatePickerProps> =
  requireNativeViewManager('DatePicker');

export function DatePicker({
  modifiers,
  selection,
  displayedComponents,
  style,
  onChange,
  ...restProps
}: DatePickerProps) {
  return (
    <NativeDatePicker
      selection={getValueOrBinding(selection).toISOString()}
      modifiers={mapToNativeModifiers(modifiers)}
      displayedComponents={
        Array.isArray(displayedComponents)
          ? displayedComponents
          : [displayedComponents]
      }
      onValueChange={(e) => {
        const newDate = new Date(e.nativeEvent.value);
        if (typeof selection === 'object' && 'setValue' in selection) {
          selection.setValue(newDate);
        }
        onChange?.(newDate);
      }}
      style={{
        width: '100%',
        height: 35,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
