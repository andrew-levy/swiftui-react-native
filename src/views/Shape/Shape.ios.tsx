import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeShapeProps, ShapeProps } from './types';

const NativeShape: React.ComponentType<NativeShapeProps> =
  requireNativeViewManager('Shape');

export function Rectangle({ style, ...modifiers }: ShapeProps) {
  return (
    <NativeShape
      type="Rectangle"
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function RoundedRectangle(props: ShapeProps & { cornerRadius: number }) {
  const { style, cornerRadius, ...modifiers } = props;
  return (
    <NativeShape
      type="RoundedRectangle"
      modifiers={mapToNativeModifiers(modifiers)}
      cornerRadius={cornerRadius}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function Circle(props: ShapeProps) {
  const { style, ...modifiers } = props;
  return (
    <NativeShape
      type="Circle"
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function Capsule(props: ShapeProps) {
  const { style, ...modifiers } = props;
  return (
    <NativeShape
      type="Capsule"
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function Ellipse(props: ShapeProps) {
  const { style, ...modifiers } = props;
  return (
    <NativeShape
      type="Ellipse"
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        width: 30,
        height: 30,
        ...(style as object),
      }}
    />
  );
}
