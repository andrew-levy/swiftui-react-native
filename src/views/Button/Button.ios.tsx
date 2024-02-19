import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { Text } from '../Text';
import { ButtonProps, NativeButtonProps } from './types';

const NativeButton: React.ComponentType<NativeButtonProps> =
  requireNativeViewManager('Button');

export function Button({
  style,
  title,
  action,
  children,
  ...modifiers
}: ButtonProps) {
  return (
    <NativeButton
      text={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...(style as object),
      }}
      onAction={action}
    >
      <Text {...modifiers}>{title}</Text>
    </NativeButton>
  );
}
