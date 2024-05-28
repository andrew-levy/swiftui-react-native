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
  systemImage,
  primaryAction,
  children,
  ...modifiers
}: MenuProps) {
  return (
    <NativeMenu
      title={title}
      systemImage={systemImage}
      hasPrimaryAction={!!primaryAction}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, { height: 40, width: undefined }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, { onPrimaryAction: primaryAction });
      }}
    >
      {children}
    </NativeMenu>
  );
}
