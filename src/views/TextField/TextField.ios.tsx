import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { getValueOrBinding } from '../../utils/binding';
import { mapToNativeModifiers } from '../../utils/modifiers';
import { NativeTextFieldProps, TextFieldProps } from './types';

const NativeTextField: React.ComponentType<NativeTextFieldProps> =
  requireNativeViewManager('TextField');

export function TextField({
  text,
  style,
  onValueChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="textfield"
      modifiers={mapToNativeModifiers(modifiers)}
      onValueChange={(e) => {
        if (typeof text === 'object' && 'value' in text) {
          text.setValue(e.nativeEvent.value);
        }
        onValueChange?.(e.nativeEvent.value);
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
  onValueChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="securefield"
      modifiers={mapToNativeModifiers(modifiers)}
      onValueChange={(e) => {
        if (typeof text === 'object' && 'value' in text) {
          text.setValue(e.nativeEvent.value);
        }
        onValueChange?.(e.nativeEvent.value);
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
  onValueChange,
  placeholder,
  ...modifiers
}: TextFieldProps) {
  return (
    <NativeTextField
      text={getValueOrBinding(text)}
      type="texteditor"
      modifiers={mapToNativeModifiers(modifiers)}
      onValueChange={(e) => {
        if (typeof text === 'object' && 'value' in text) {
          text.setValue(e.nativeEvent.value);
        }
        onValueChange?.(e.nativeEvent.value);
      }}
      style={{
        width: 100,
        height: 30,
        ...(style as object),
      }}
    />
  );
}
