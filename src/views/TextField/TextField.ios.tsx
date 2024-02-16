import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Binding, getValueOrBinding } from '../../utils/binding';
import {
  ModifiersProp,
  NativeModifiersProp,
  mapToNativeModifiers,
} from '../../utils/modifiers';

const NativeTextField: React.ComponentType<NativeTextFieldProps> =
  requireNativeViewManager('TextField');

type NativeTextFieldProps = {
  text: string;
  placeholder?: string;
  type: 'textfield' | 'securefield' | 'texteditor';
  modifiers?: NativeModifiersProp;
  onValueChange?: (e: { nativeEvent: { value: string } }) => void;
  style?: StyleProp<ViewStyle>;
};

type TextFieldProps = {
  style?: StyleProp<ViewStyle>;
  text: string | Binding<string>;
  placeholder?: string;
  modifiers?: ModifiersProp;
  onValueChange?: (value: string) => void;
  children?: string;
};

export function TextField(props: TextFieldProps) {
  const { text, modifiers, style, onValueChange, ...restProps } = props;
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
      {...restProps}
    />
  );
}

export function SecureField(props: TextFieldProps) {
  const { text, modifiers, onValueChange, style, ...restProps } = props;
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
      {...restProps}
    />
  );
}

export function TextEditor(props: TextFieldProps) {
  const { text, modifiers, onValueChange, style, ...restProps } = props;
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
      {...restProps}
    />
  );
}
