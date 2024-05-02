import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  getExperimentalPrivateModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { ShadowText } from './ShadowText';
import { NativeTextProps, TextProps } from './types';

const NativeText: React.ComponentType<NativeTextProps> =
  requireNativeViewManager('Text');

export function Text({ style, children, ...modifiers }: TextProps) {
  const text = Array.isArray(children) ? children.join('') : children;

  modifiers = getExperimentalPrivateModifiers(modifiers);

  return (
    <NativeText
      text={text as string}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        alignSelf: 'center',
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    >
      <ShadowText {...modifiers}>{text}</ShadowText>
    </NativeText>
  );
}

Text.displayName = 'SwiftUIText';
