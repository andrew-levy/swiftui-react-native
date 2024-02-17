import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

type NativeHStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type HStackProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const NativeHStack: React.ComponentType<NativeHStackProps> =
  requireNativeViewManager('HStack');

export function HStack({
  modifiers,
  style,
  children,
  ...restProps
}: HStackProps) {
  const mappedChildren = React.Children.map(children, (child) => {
    // return child;
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeHStack
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      children={mappedChildren}
      {...restProps}
    />
  );
}

// for lists, return as is child in hstack,
