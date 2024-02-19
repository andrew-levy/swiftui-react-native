import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ImageProps, NativeImageProps } from './types';

const NativeImage: React.ComponentType<NativeImageProps> =
  requireNativeViewManager('Image');

export function Image({ style, systemName, ...modifiers }: ImageProps) {
  return (
    <NativeImage
      systemName={systemName}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

Image.displayName = 'SwiftUIImage';
