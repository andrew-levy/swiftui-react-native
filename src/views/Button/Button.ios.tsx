import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeButton: React.ComponentType<NativeButtonProps> =
  requireNativeViewManager('Button');

type NativeButtonProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onAction?: (
    e: NativeSyntheticEvent<{
      value: boolean;
    }>
  ) => void;
  onSized?: (
    e: NativeSyntheticEvent<{
      value: { width: number; height: number };
    }>
  ) => void;
};

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  action: () => void;
  modifiers?: ModifiersProp;
  children?: string;
};

export function Button(props: ButtonProps) {
  const { modifiers, style, title, action, ...restProps } = props;
  return (
    <NativeButton
      text={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 100,
        height: 30,
        ...(style as object),
      }}
      onAction={action}
      {...restProps}
    />
  );
}
