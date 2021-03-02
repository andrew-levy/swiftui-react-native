import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Alignments } from '../../themes/alignments';
import { UIColor } from '../../themes/colors';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Padding,
  Shadow,
} from '../../types/stylePropTypes';
import { Text } from '../Text';

export type ButtonProps = {
  action?: () => void;
  disabled?: boolean;
  text?: string;
  background?: string;
  padding?: Padding;
  cornerRadius?: number;
  shadow?: Shadow;
  border?: object;
  fontSize?: number;
  fontWeight?: number;
  foregroundColor?: string;
  children?: React.ReactElement<any>;
  alignment?: HorizontalAlignment | VerticalAlignment;
};

export const Button = ({
  action,
  text,
  background = UIColor.transparent,
  cornerRadius = 0,
  padding = 0,
  alignment,
  children,
  ...props
}: ButtonProps) => {
  return (
    <>
      <TouchableOpacity
        onPress={action}
        style={{
          backgroundColor: background,
          justifyContent: 'center',
          alignItems:
            Alignments.horizontal[alignment] || Alignments.horizontal.center,
          borderRadius: cornerRadius,
        }}
      >
        {text ? (
          // Send in props from button to text
          <Text buttonChild={true}>{text}</Text>
        ) : (
          React.Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              ...{ buttonChild: true },
            })
          )
        )}
      </TouchableOpacity>
    </>
  );
};
