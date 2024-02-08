import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { ViewProps } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

export type NativeProgressProps = {
  value?: number;
  total?: number;
  modifiers?: NativeModifiersProp;
} & ViewProps;

export type ProgressProps = {
  value?: number;
  total?: number;
  modifiers?: ModifiersProp;
} & ViewProps;

const NativeView: React.ComponentType<NativeProgressProps> =
  requireNativeViewManager('Progress');

export function ProgressView({
  modifiers,
  total,
  style,
  ...restProps
}: ProgressProps) {
  return (
    <NativeView
      modifiers={mapToNativeModifiers(modifiers)}
      total={total ?? 1}
      style={{
        width: 300,
        height: 10,
        ...(style as any),
      }}
      {...restProps}
    />
  );
}
