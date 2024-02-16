import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

type NativeZStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type ZStackProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const NativeZStack: React.ComponentType<NativeZStackProps> =
  requireNativeViewManager('ZStack');

export function ZStack({
  modifiers,
  style,
  children,
  ...restProps
}: ZStackProps) {
  const mappedChildren = React.Children.map(children, (child) => {
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeZStack
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      children={mappedChildren}
      {...restProps}
    />
  );
}
