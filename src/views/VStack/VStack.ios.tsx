import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativeVStackProps, VStackProps } from './types';

const NativeVStack: React.ComponentType<NativeVStackProps> =
  requireNativeViewManager('VStack');

export function VStack({
  style,
  alignment,
  spacing,
  children,
  ...modifiers
}: VStackProps) {
  //wrap each child in a vstack
  const mappedChildren = React.Children.map(children, (child) => {
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeVStack
      alignment={alignment}
      spacing={spacing}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
      children={mappedChildren}
    />
  );
}

VStack.displayName = 'SwiftUIVStack';
