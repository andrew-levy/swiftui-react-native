import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { HStack } from '../HStack';
import { Image } from '../Image';
import { Text } from '../Text';
import { LabelProps, NativeLabelProps } from './types';

const NativeLabel: React.ComponentType<NativeLabelProps> =
  requireNativeViewManager('Label');

export function Label({ style, systemImage, title, ...modifiers }: LabelProps) {
  return (
    <NativeLabel
      systemImage={systemImage}
      title={title}
      modifiers={mapToNativeModifiers(modifiers)}
      style={style}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    >
      <HStack {...modifiers}>
        <Image systemName={systemImage} />
        <Text>{title}</Text>
      </HStack>
    </NativeLabel>
  );
}

Label.displayName = 'SwiftUILabel';
