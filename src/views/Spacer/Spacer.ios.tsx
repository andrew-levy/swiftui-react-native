import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeSpacerProps, SpacerProps } from './types';

const NativeSpacer: React.ComponentType<NativeSpacerProps> =
  requireNativeViewManager('Spacer');

export function Spacer(props: SpacerProps) {
  const { style, ...modifiers } = props;

  return (
    <NativeSpacer
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
    />
  );
}

Spacer.displayName = 'SwiftUISpacer';
