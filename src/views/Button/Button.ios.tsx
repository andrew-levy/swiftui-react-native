import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { Text } from '../Text';

const NativeButton: React.ComponentType<NativeButtonProps> =
  requireNativeViewManager('Button');

type NativeButtonProps = {
  text: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
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
  const { modifiers, style, title, action, children, ...restProps } = props;
  const child = <Text>{title}</Text>;
  return (
    <NativeButton
      text={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      onAction={action}
      children={child}
      {...restProps}
    />
  );
}
