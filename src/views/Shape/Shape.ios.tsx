import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ModifiersProp,
  NativeModifiersProp,
  buildModifiers,
} from '../../utils/modifiers';

const NativeShape: React.ComponentType<NativeShapeProps> =
  requireNativeViewManager('Shape');

type NativeShapeProps = {
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  type: 'Circle' | 'Rectangle' | 'RoundedRectangle' | 'Capsule';
};

type ShapeProps = {
  style?: StyleProp<ViewStyle>;
  modifiers?: ModifiersProp;
};

export function Rectangle({ modifiers, style, ...restProps }: ShapeProps) {
  return (
    <NativeShape
      type="Rectangle"
      modifiers={buildModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}

export function RoundedRectangle(props: ShapeProps & { cornerRadius: number }) {
  const { modifiers, style, ...restProps } = props;
  return (
    <NativeShape
      type="RoundedRectangle"
      modifiers={buildModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}

export function Circle(props: ShapeProps) {
  const { modifiers, style, ...restProps } = props;
  return (
    <NativeShape
      type="Circle"
      modifiers={buildModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}

export function Capsule(props: ShapeProps) {
  const { modifiers, style, ...restProps } = props;
  return (
    <NativeShape
      type="Capsule"
      modifiers={buildModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
      {...restProps}
    />
  );
}
