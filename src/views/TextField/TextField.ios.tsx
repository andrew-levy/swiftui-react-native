import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import { NativeTextFieldProps, TextFieldProps } from './types';

const NativeTextField: React.ComponentType<NativeTextFieldProps> =
  requireNativeViewManager('TextField');

export function TextField({
  text,
  style,
  onChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="textfield"
      modifiers={mapToNativeModifiers(modifiers)}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange(e) {
            if (typeof text === 'object' && 'value' in text) {
              text.setValue(e.nativeEvent.onValueChange);
            }
            onChange?.(e.nativeEvent.onValueChange);
          },
        });
      }}
      style={{
        width: 100,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function SecureField({
  text,
  style,
  onChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="securefield"
      modifiers={mapToNativeModifiers(modifiers)}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange: (e) => {
            if (typeof text === 'object' && 'value' in text) {
              text.setValue(e.nativeEvent.onValueChange);
            }
            onChange?.(e.nativeEvent.onValueChange);
          },
        });
      }}
      style={{
        width: 100,
        height: 30,
        ...(style as object),
      }}
    />
  );
}

export function TextEditor({
  text,
  style,
  onChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="texteditor"
      modifiers={mapToNativeModifiers(modifiers)}
      onEvent={(e) => {
        onBaseEvent(e, modifiers, {
          onValueChange: (e) => {
            if (typeof text === 'object' && 'value' in text) {
              text.setValue(e.nativeEvent.onValueChange);
            }
            onChange?.(e.nativeEvent.onValueChange);
          },
        });
      }}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 100, height: 30 }),
        ...(style as object),
      }}
    />
  );
}
