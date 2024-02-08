import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  ImageSourcePropType,
  Image as RNImage,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  buildModifiers,
} from '../../utils/modifiers';
import { SystemName } from './types';

const NativeImage: React.ComponentType<NativeImageProps> =
  requireNativeViewManager('Image');

type NativeImageProps = {
  systemName: SystemName;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type ImageProps = {
  systemName?: SystemName;
  style?: StyleProp<ViewStyle>;
  modifiers?: ModifiersProp;
  source?: ImageSourcePropType;
};

export function Image(props: ImageProps) {
  const { modifiers, style, systemName, source, ...restProps } = props;
  if (systemName) {
    return (
      <NativeImage
        systemName={systemName}
        modifiers={buildModifiers(modifiers)}
        style={{
          width: 30,
          height: 30,
          ...(style as object),
        }}
        {...restProps}
      />
    );
  } else {
    return (
      <RNImage
        source={source}
        style={{
          width: 30,
          height: 30,
          ...(style as object),
        }}
      />
    );
  }
}
