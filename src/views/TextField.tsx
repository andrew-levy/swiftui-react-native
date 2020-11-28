import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';

type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
  width: number;
};

const StyledTextFieldDefault = styled.TextInput`
  border-bottom-color: ${Colors.background.systemGrey6};
  border-bottom-width: 1px;
  width: 80%;
  padding-bottom: 10px;
  font-size: 18px;
  padding-top: 10px;
`;

const StyledTextFieldBox = styled.TextInput`
  background-color: ${Colors.background.systemGrey6};
  border-radius: 6px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  color: ${Colors.foreground.black};
  width: ${({ width }) => width || '80%'};
`;

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
}) => {
  if (true) {
    <StyledTextFieldDefault
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
    />;
  }
  return (
    <StyledTextFieldBox
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
