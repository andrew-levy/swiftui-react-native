import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getSizeFromModifiers, mapToNativeModifiers } from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativeShapeProps, ShapeProps } from './types';

const NativeShape: React.ComponentType<NativeShapeProps> =
  requireNativeViewManager('Shape');

export function Rectangle({ style, ...modifiers }: ShapeProps) {
  return (
    <NativeShape
      type="Rectangle"
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
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
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    />
  );
}

export function UnevenRoundedRectangle(
  props: ShapeProps & {
    cornerRadii: {
      topLeading: number;
      topTrailing: number;
      bottomLeading: number;
      bottomTrailing: number;
    };
  }
) {
  const { style, cornerRadii, ...modifiers } = props;
  return (
    <NativeShape
      type="UnevenRoundedRectangle"
      modifiers={mapToNativeModifiers(modifiers)}
      cornerRadii={cornerRadii}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
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
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
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
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
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
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
    />
  );
}
