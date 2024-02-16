import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeSpacer: React.ComponentType<NativeSpacerProps> =
  requireNativeViewManager('Spacer');

type NativeSpacerProps = {
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};
type SpacerProps = {
  modifiers?: ModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export function Spacer(props: SpacerProps) {
  const { style, modifiers } = props;

  return (
    <NativeSpacer
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
    />
  );
}
