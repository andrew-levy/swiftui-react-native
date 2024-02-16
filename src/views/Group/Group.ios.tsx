import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

type NativeGroupProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type GroupProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const NativeGroup: React.ComponentType<NativeGroupProps> =
  requireNativeViewManager('Group');

export function Group({
  modifiers,
  style,
  children,
  ...restProps
}: GroupProps) {
  //wrap each child in a vstack
  const mappedChildren = React.Children.map(children, (child) => {
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeGroup
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      children={mappedChildren}
      {...restProps}
    />
  );
}
