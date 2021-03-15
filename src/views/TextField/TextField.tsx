import React from 'react';
import { Frame } from '../../types/propTypes';
import { PlainTextField } from './PlainTextField';
import { RoundedBorderTextField } from './RoundedBorderTextField';
import { AnimatedTextField } from './AnimatedTextField';

export type TextFieldProps = {
  placeholder?: string;
  text: string;
  onChangeText: () => void;
  frame?: Frame;
  textFieldStyle?: 'animated' | 'plain' | 'rounded-border';
  background?: string;
  foregroundColor?: string;
};

export const TextField: React.FC<TextFieldProps> = (props) => {
  switch (props.textFieldStyle) {
    case 'animated':
      return <AnimatedTextField {...props} />;
    case 'plain':
      return <PlainTextField {...props} />;
    case 'rounded-border':
      return <RoundedBorderTextField {...props} />;
    default:
      return <PlainTextField {...props} />;
  }
};
