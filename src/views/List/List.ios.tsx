import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ListProps, NativeListProps } from './types';

const NativeList: React.ComponentType<NativeListProps> =
  requireNativeViewManager('List');

export function List({ modifiers, style, children, ...restProps }: ListProps) {
  const mappedChildren = React.Children.map(children, (child: ReactElement) => {
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
