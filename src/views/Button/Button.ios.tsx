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
  systemImage,
  role,
  children,
  ...modifiers
}: ButtonProps) {
  return (
    <NativeButton
      title={title}
      role={role}
      systemImage={systemImage}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, { onAction: action });
      }}
    >
      {children ? children : <Text {...modifiers}>{title}</Text>}
    </NativeButton>
  );
}
