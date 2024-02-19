import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeVStackProps, VStackProps } from './types';

const NativeVStack: React.ComponentType<NativeVStackProps> =
  requireNativeViewManager('VStack');

export function VStack({ style, children, ...modifiers }: VStackProps) {
  //wrap each child in a vstack
  const mappedChildren = React.Children.map(children, (child) => {
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeVStack
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      children={mappedChildren}
    />
  );
}
