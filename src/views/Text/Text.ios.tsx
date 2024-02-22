import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ShadowText } from './ShadowText';
import { NativeTextProps, TextProps } from './types';

const NativeText: React.ComponentType<NativeTextProps> =
  requireNativeViewManager('Text');

export function Text({ style, children, ...modifiers }: TextProps) {
  const text = Array.isArray(children) ? children.join('') : children;
  return (
    <NativeText
      text={text as string}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        alignSelf: 'center',
        ...(style as object),
      }}
    >
      <ShadowText {...modifiers}>{text}</ShadowText>
    </NativeText>
  );
}

Text.displayName = 'SwiftUIText';
