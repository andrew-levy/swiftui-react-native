import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { HStackProps, NativeHStackProps } from './types';

const NativeHStack: React.ComponentType<NativeHStackProps> =
  requireNativeViewManager('HStack');

export function HStack({ style, children, ...modifiers }: HStackProps) {
  return (
    <NativeHStack
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
    >
      {React.Children.map(children, (child) => {
        return <View style={{ alignSelf: 'center' }}>{child}</View>;
      })}
    </NativeHStack>
  );
}

// for lists, return as is child in hstack,
