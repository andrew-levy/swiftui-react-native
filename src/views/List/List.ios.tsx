import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

type NativeListProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type ListProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const NativeList: React.ComponentType<NativeListProps> =
  requireNativeViewManager('List');

export function List({ modifiers, style, children, ...restProps }: ListProps) {
  const mappedChildren = React.Children.map(children, (child: ReactElement) => {
    // if (child.type === HStack) {
    //   return child;
    // }
    return <View style={{ alignSelf: 'center' }}>{child}</View>;
  });
  return (
    <NativeList
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: '100%',
        height: 500,
        ...(style as object),
      }}
      children={mappedChildren}
      {...restProps}
    />
  );
}
