import React from 'react';
import { Frame } from '../../types/stylePropTypes';
import { TextFieldDefault } from './TextFieldDefault';
import { TextFieldRoundedBorder } from './TextFieldRoundedBorder';
import { TextFieldUnderline } from './TextFieldUnderline';

export type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
  frame?: Frame;
  textFieldStyle?: 'underline' | 'default' | 'rounded-border';
  // background?: string;
};

export const TextField: React.FC<TextFieldProps> = (props) => {
  switch (props.textFieldStyle) {
    case 'underline':
      return <TextFieldUnderline {...props} />;
    case 'default':
      return <TextFieldDefault {...props} />;
    case 'rounded-border':
      return <TextFieldRoundedBorder {...props} />;
    default:
      // return <TextFieldDefault {...props} />;
      // for now...
      return <TextFieldRoundedBorder {...props} />;
  }
};
