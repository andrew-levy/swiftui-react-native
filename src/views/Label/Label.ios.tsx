import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { View } from 'react-native';
import { mapToNativeModifiers } from '../../utils/modifiers';
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
    >
      <View style={{ flexDirection: 'row' }} {...modifiers}>
        <Image systemName={systemImage} />
        <Text>{title}</Text>
      </View>
    </NativeLabel>
  );
}

Label.displayName = 'SwiftUILabel';
