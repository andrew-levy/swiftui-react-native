import React from 'react';
import styled from 'styled-components';

type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
};

const StyledTextField = styled.TextInput``;

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
}) => {
  return (
    <StyledTextField
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
    />
  );
};
