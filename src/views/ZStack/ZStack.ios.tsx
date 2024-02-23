import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeZStackProps, ZStackProps } from './types';

const NativeZStack: React.ComponentType<NativeZStackProps> =
  requireNativeViewManager('ZStack');

export function ZStack({
  style,
  alignment,
  children,
  ...modifiers
}: ZStackProps) {
  const mappedChildren = React.Children.map(children, (child) => {
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeZStack
      alignment={alignment}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      children={mappedChildren}
    />
  );
}
