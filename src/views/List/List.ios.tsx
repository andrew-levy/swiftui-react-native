import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactElement } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { ListProps, NativeListProps } from './types';

const NativeList: React.ComponentType<NativeListProps> =
  requireNativeViewManager('List');

export function List({ style, children, ...modifiers }: ListProps) {
  const { width, height } = useWindowDimensions();
  let rowWidth = width;
  switch (modifiers.listStyle) {
    case 'insetGrouped':
      rowWidth = width - 80;
      break;
    case 'inset':
    case 'grouped':
    case 'plain':
      rowWidth = width - 40;
      break;
  }

  return (
    <NativeList
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: '100%',
        height: 500,
        ...(style as object),
      }}
    >
      {React.Children.map(children, (child: ReactElement) => {
        return (
          <View
            style={{
              width: rowWidth,
            }}
          >
            {child}
          </View>
        );
      })}
    </NativeList>
  );
}
