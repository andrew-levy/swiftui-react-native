import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { useSheet } from '../../hooks/useSheet';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { HStackProps, NativeHStackProps } from './types';

const NativeHStack: React.ComponentType<NativeHStackProps> =
  requireNativeViewManager('HStack');

export function HStack({ style, children, sheet, ...modifiers }: HStackProps) {
  const { isSheetPresented, onSheetDismissed, sheetContent } = useSheet(sheet);
  return (
    <NativeHStack
      modifiers={mapToNativeModifiers(modifiers)}
      isSheetPresented={isSheetPresented}
      onSheetDismissed={onSheetDismissed}
      style={style}
    >
      {sheetContent}
      {React.Children.map(children, (child) => {
        return <View style={{ alignSelf: 'center' }}>{child}</View>;
      })}
    </NativeHStack>
  );
}
