import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

type NativeVStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type VStackProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const NativeVStack: React.ComponentType<NativeVStackProps> =
  requireNativeViewManager('VStack');

export function VStack({
  modifiers,
  style,
  children,
  ...restProps
}: VStackProps) {
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
      {...restProps}
    />
  );
}
