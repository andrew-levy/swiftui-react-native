import React from 'react';
import { TouchableOpacity } from 'react-native';
import { WithChildren, Modifiers, TextModifiers } from '../../utils/modifiers';
import { Text } from '../Text';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

export type ButtonProps = Modifiers &
  TextModifiers &
  WithChildren & {
    action?: () => void;
    disabled?: boolean;
    label?: string;
  };

export const Button = ({
  label,
  action,
  alert,
  disabled,
  backgroundColor,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  padding,
  border,
  frame,
  shadow,
  opacity,
  zIndex,
  children,
  style,
  onAppear,
  onDisappear,
  ...textProps
}: ButtonProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={action}
      style={[
        {
          justifyContent: 'center',
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {label ? (
        <Text foregroundColor="systemBlue" {...textProps}>
          {label}
        </Text>
      ) : (
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            ...{ foregroundColor: 'systemBlue', textProps },
            ...child.props,
          })
        )
      )}
    </TouchableOpacity>
  );
};
