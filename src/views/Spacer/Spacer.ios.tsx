import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
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
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    />
  );
}

Spacer.displayName = 'SwiftUISpacer';
