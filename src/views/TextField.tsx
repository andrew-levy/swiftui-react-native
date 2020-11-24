import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
};

const StyledTextField = styled.TextInput`
  border-bottom-color: ${Colors.background.systemGrey6};
  border-bottom-width: 1px;
  width: 80%;
  padding-bottom: 10px;
  font-size: 20px;
  padding-top: 10px;
`;

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

/* PROPS:
 * textfield styles: default, plain, underline
 * + overrides
 */
