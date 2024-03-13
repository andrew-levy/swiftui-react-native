import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSpacerProps, SpacerProps } from './types';

const NativeSpacer: React.ComponentType<NativeSpacerProps> =
  requireNativeViewManager('Spacer');

export function Spacer(props: SpacerProps) {
  const { style } = props;

  return <NativeSpacer style={style} />;
}

Spacer.displayName = 'SwiftUISpacer';
