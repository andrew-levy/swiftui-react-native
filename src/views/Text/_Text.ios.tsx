import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeText: React.ComponentType<NativeTextProps> =
  requireNativeViewManager('Text');

type NativeTextProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onSized?: (
    e: NativeSyntheticEvent<{
      value: { width: number; height: number };
    }>
  ) => void;
};

type TextProps = {
  style?: StyleProp<ViewStyle>;
  modifiers?: ModifiersProp;
  children?: string;
};

export function Text(props: TextProps) {
  const { modifiers, style, children, ...restProps } = props;

  return (
    <NativeText
      text={children}
      modifiers={mapToNativeModifiers(modifiers)}
      // onSized={onSized}
      style={{
        // take up all space it needs
        width: 100,
        height: 30,
        borderWidth: 1,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
