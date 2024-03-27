import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativePickerProps, PickerProps } from './types';

const NativeView: React.ComponentType<NativePickerProps> =
  requireNativeViewManager('Picker');

export function Picker({
  selection,
  style,
  onChange,
  children,
  ...modifiers
}: PickerProps) {
  const options = React.Children.map(children, (child) => {
    return child.props.children;
  });

  const defaultSize = {
    wheel: { width: 300, height: 100 },
    menu: { width: 100, height: 35 },
    segmented: { width: 300, height: 35 },
  };

  return (
    <NativeView
      options={options}
      selection={getValueOrBinding(selection)}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, defaultSize[modifiers.pickerStyle]),
        ...(style as any),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange: (e) => {
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
