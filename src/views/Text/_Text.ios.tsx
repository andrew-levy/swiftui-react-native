import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  NativeSyntheticEvent,
  Text as RNText,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSizedToFit } from '../../hooks/useSizedToFit';
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
  const { size, onSized } = useSizedToFit();
  return (
    <RNText>
      <NativeText
        text={children}
        modifiers={mapToNativeModifiers(modifiers)}
        style={{
          width: size.width,
          height: size.height,
          borderWidth: 1,
          ...(style as object),
        }}
        onSized={onSized}
        {...restProps}
      />
    </RNText>
  );
}
