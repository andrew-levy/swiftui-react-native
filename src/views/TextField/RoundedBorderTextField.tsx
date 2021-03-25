import React from 'react';
import { systemColor, UIColor } from '../../utils/colors';
import { TextFieldProps } from './TextField';
import { StyleSheet, TextInput } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';

export const RoundedBorderTextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  frame = { width: null, height: null },
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <TextInput
      style={[
        styles.input,
        {
          width: frame.width,
          height: frame.height,
          backgroundColor: systemColor(UIColor.systemGray6, colorScheme),
          color: systemColor(UIColor.black, colorScheme),
        },
      ]}
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
});
