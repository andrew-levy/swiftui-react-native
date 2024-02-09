import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { SystemName } from '../Image/types';

const NativeLabel: React.ComponentType<NativeLabelProps> =
  requireNativeViewManager('Label');

type NativeLabelProps = {
  systemImage: SystemName;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

type LabelProps = {
  systemImage?: SystemName;
  style?: StyleProp<ViewStyle>;
  modifiers?: ModifiersProp;
};

export function Label(props: LabelProps) {
  const { modifiers, style, systemImage, ...restProps } = props;
  return (
    <NativeLabel
      systemImage={systemImage}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 100,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
