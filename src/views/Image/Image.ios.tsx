import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { ImageProps, NativeImageProps } from './types';

const NativeImage: React.ComponentType<NativeImageProps> =
  requireNativeViewManager('SwiftUIImage');

export function Image({ style, systemName, ...modifiers }: ImageProps) {
  return (
    <NativeImage
      systemName={systemName}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    />
  );
}

Image.displayName = 'SwiftUIImage';
