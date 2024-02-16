import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
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
  const text = Array.isArray(children) ? children.join('') : children;
  return (
    <NativeText
      text={text}
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...calculateTextWidthAndHeight(text, mapToNativeModifiers(modifiers)),
        // borderWidth: 1,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}

function calculateTextWidthAndHeight(
  text,
  modifiers: [{ [key: string]: any }]
) {
  const fontSizeMap = {
    body: 16,
    heading: 24,
    caption: 12,
    caption2: 11,
    callout: 16,
    footnote: 13,
    headline: 17,
    subheadline: 15,
    largeTitle: 34,
    title: 28,
    title2: 22,
    title3: 20,
  };

  const multiplierWeights = {
    body: 0.63,
    caption: 0.55,
    caption2: 0.8,
    callout: 0.49,
    footnote: 0.6,
    headline: 0.55,
    subheadline: 0.55,
    largeTitle: 0.41,
    title: 0.4,
    title2: 0.35,
    title3: 0.35,
  };

  const font = modifiers.find((m) => m.font)?.font ?? 'body';
  const fontSize = fontSizeMap[font] ?? 16;
  const weight = multiplierWeights[font] ?? 0.5;

  let width = text.length * fontSize * weight;
  let height = fontSize * 1.3;

  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i];
    if (modifier.frame) {
      width = modifier.frame.width;
      height = modifier.frame.height;
    }

    if (modifier.padding) {
      width += modifier.padding * 2;
      height += modifier.padding * 2;
    }
  }

  return { width, height };
}
