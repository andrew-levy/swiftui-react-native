import { requireNativeViewManager } from 'expo-modules-core';
import React, { ReactElement } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { ForEach } from '../../utils/ForEach';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { ListProps, NativeListProps } from './types';

const NativeList: React.ComponentType<NativeListProps> =
  requireNativeViewManager('List');

export function List<T>({
  style,
  children,
  data,
  header,
  footer,
  ...modifiers
}: ListProps<T>) {
  const { width } = useWindowDimensions();
  let rowWidth = width;
  switch (modifiers.listStyle || 'insetGrouped') {
    default:
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
      header={header}
      footer={footer}
      style={{
        ...getSizeFromModifiers(modifiers, {
          width: '100%' as any,
          height: 500,
        }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    >
      {data && typeof children === 'function'
        ? ForEach(data, (item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: rowWidth,
                }}
              >
                {children(item, index)}
              </View>
            );
          })
        : React.Children.map(children, (child: ReactElement) => {
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
