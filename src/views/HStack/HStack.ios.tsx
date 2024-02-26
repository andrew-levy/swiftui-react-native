import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
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
  return (
    <NativeHStack
      spacing={spacing}
      alignment={alignment}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        // ...getSizeFromModifiers(modifiers),
        flexDirection: 'row',
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    >
      {/* {modifiers.sheet && (
        <SheetContent>{modifiers.sheet.content}</SheetContent>
      )} */}
      {React.Children.map(children, (child) => {
        return <View style={{ alignSelf: 'center' }}>{child}</View>;
      })}
    </NativeHStack>
  );
}

HStack.displayName = 'SwiftUIHStack';
