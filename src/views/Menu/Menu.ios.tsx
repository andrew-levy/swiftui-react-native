import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { MenuProps, NativeMenuProps } from './types';

const NativeMenu: React.ComponentType<NativeMenuProps> =
  requireNativeViewManager('Menu');

export function Menu({
  style,
  title,
  action,
  children,
  ...modifiers
}: MenuProps) {
  return (
    <NativeMenu
      title={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, { onAction: action });
      }}
    >
      {children}
    </NativeMenu>
  );
}
