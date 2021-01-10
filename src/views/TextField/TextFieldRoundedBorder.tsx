import React from 'react';
import styled from 'styled-components';
import { getFrameFromProps } from '../../styleProps/frame';
import { UIColor } from '../../themes/colors';
import { TextFieldProps } from './TextField';

const StyledTextField = styled.TextInput`
  background-color: ${UIColor.systemGray6};
  border-radius: 6px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  color: ${UIColor.black};
  ${({ frame }) => getFrameFromProps(frame)}
`;

export const TextFieldRoundedBorder: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChangeText,
  frame,
}) => {
  return (
    <StyledTextField
      placeholder={placeholder}
      value={text}
      onChangeText={onChangeText}
      frame={frame}
    />
  );
};
