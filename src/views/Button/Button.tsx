import React from 'react';
import { TouchableOpacity } from 'react-native';
import { WithChildren, Modifiers, TextModifiers } from '../../utils/modifiers';
import { Text } from '../Text';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { useLifecycle } from '../../hooks/useLifecycle';
import { useUIColor } from '../../hooks/useUIColor';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';

export type ButtonProps = Modifiers &
  TextModifiers &
  WithChildren & {
    action?: () => void;
    disabled?: boolean;
    text?: string;
  };

export const Button = ({
  text,
  action,
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
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={action}
      style={[
        {
          backgroundColor,
          justifyContent: 'center',
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
          ...getTransform(scaleEffect,rotationEffect),
        },
        style,
      ]}
    >
      {text ? (
        <Text foregroundColor={UIColor.systemBlue} {...textProps}>
          {text}
        </Text>
      ) : (
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            ...{ foregroundColor: UIColor.systemBlue, textProps },
            ...child.props,
          })
        )
      )}
    </TouchableOpacity>
  );
};
