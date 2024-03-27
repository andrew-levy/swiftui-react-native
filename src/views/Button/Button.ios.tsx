import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
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
      title={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, { onAction: action });
      }}
    >
      <Text {...modifiers}>{title}</Text>
    </NativeButton>
  );
}
