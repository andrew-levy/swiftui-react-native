import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { DividerProps, NativeDividerProps } from './types';

const NativeDivider: React.ComponentType<NativeDividerProps> =
  requireNativeViewManager('Divider');

export function Divider({ style, ...modifiers }: DividerProps) {
  return (
    <NativeDivider modifiers={mapToNativeModifiers(modifiers)} style={style} />
  );
}

Divider.displayName = 'SwiftUIDivider';
