import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Alignments } from '../../utils/alignments';
import { systemColor, UIColor } from '../../utils/colors/utils';
import {
  VerticalAlignment,
  HorizontalAlignment,
  Padding,
  Shadow,
} from '../../types/propTypes';
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
  foregroundColor = UIColor.systemBlue,
  cornerRadius = 0,
  padding = 0,
  alignment,
  children,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        backgroundColor: background,
        justifyContent: 'center',
        alignItems:
          Alignments.horizontal[alignment] || Alignments.horizontal.center,
        borderRadius: cornerRadius,
      }}
      {...props}
    >
      {text ? (
        // Send in props from button to text
        <Text buttonChild={!foregroundColor} foregroundColor={foregroundColor}>
          {text}
        </Text>
      ) : (
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            ...child.props,
            ...{ buttonChild: !foregroundColor },
          })
        )
      )}
    </TouchableOpacity>
  );
};
