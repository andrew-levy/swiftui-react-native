import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeProgressProps, ProgressProps } from './types';

const NativeView: React.ComponentType<NativeProgressProps> =
  requireNativeViewManager('Progress');

export function ProgressView({
  total,
  style,
  value,
  ...modifiers
}: ProgressProps) {
  return (
    <NativeView
      modifiers={mapToNativeModifiers(modifiers)}
      value={value}
      total={total ?? 1}
      style={{
        width: 300,
        height: value == undefined ? 20 : 10,
        ...(style as any),
      }}
    />
  );
}
