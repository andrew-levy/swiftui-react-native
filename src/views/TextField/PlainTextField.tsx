import React from 'react';
import { TextInput } from 'react-native';
import { TextFieldProps } from './TextField';

export const PlainTextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  frame = { width: null, height: null },
}) => {
  return (
    <TextInput
      style={{
        width: frame.width,
        height: frame.height,
      }}
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
    />
  );
};
