import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { useSheet } from '../../hooks/useSheet';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { SheetContent } from '../SheetContent/SheetContent.ios';
import { HStackProps, NativeHStackProps } from './types';

const NativeHStack: React.ComponentType<NativeHStackProps> =
  requireNativeViewManager('HStack');

export function HStack({
  style,
  spacing,
  alignment,
  children,
  ...modifiers
}: HStackProps) {
  const { isSheetPresented, onSheetDismissed } = useSheet(modifiers.sheet);
  return (
    <NativeHStack
      spacing={spacing}
      alignment={alignment}
      modifiers={mapToNativeModifiers(modifiers)}
      style={style}
      onAppear={modifiers.onAppear}
      onDisappear={modifiers.onDisappear}
      onSheetDismissed={onSheetDismissed}
      isSheetPresented={isSheetPresented}
    >
      {modifiers.sheet && (
        <SheetContent>{modifiers.sheet.content}</SheetContent>
      )}
      {React.Children.map(children, (child) => {
        return <View style={{ alignSelf: 'center' }}>{child}</View>;
      })}
    </NativeHStack>
  );
}

HStack.displayName = 'SwiftUIHStack';
