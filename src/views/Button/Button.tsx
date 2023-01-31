import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modifiers, TextModifiers } from '../../utils/modifiers';
import { Text } from '../Text';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor, UIColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

export type RemoveField<Type, Field extends string> = {
  [Property in keyof Type as Exclude<Property, Field>]: Type[Property];
};

export type CommonButtonProps = Modifiers &
  TextModifiers & {
    action?: () => void;
    disabled?: boolean;
    buttonStyle?: 'bordered' | 'borderless' | 'borderedProminent' | 'plain';
  };

type TitleOrChildren =
  | {
      title?: string;
      children?: never;
    }
  | {
      children?: ReactElement;
      title?: never;
    };

export type ButtonProps = CommonButtonProps & TitleOrChildren;

export const Button = ({
  title,
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
  buttonStyle = 'borderless',
  children,
  style,
  preferredColorScheme,
  onAppear,
  onDisappear,
  ...textProps
}: ButtonProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  function getButtonTextColor(): UIColor {
    switch (buttonStyle) {
      case 'borderless':
      case 'bordered':
        return 'systemBlue';
      case 'plain':
        return 'label';
      case 'borderedProminent':
        return 'white';
    }
  }

  function getButtonBackgroundColor(): UIColor {
    switch (buttonStyle) {
      case 'borderless':
      case 'plain':
        return;
      case 'bordered':
        return 'systemGray5';
      case 'borderedProminent':
        return 'systemBlue';
    }
  }

  function getButtonPadding() {
    switch (buttonStyle) {
      case 'borderless':
      case 'plain':
        return;
      case 'bordered':
      case 'borderedProminent':
        return { horizontal: 12, vertical: 8 };
    }
  }

  function getButtonCornerRadius() {
    switch (buttonStyle) {
      case 'borderless':
      case 'plain':
        return;
      case 'bordered':
      case 'borderedProminent':
        return 8;
    }
  }

  function getChildren() {
    if (children) {
      return React.Children.map(children, (child) =>
        React.cloneElement(child, {
          ...{
            foregroundColor: getColor(getButtonTextColor(), colorScheme),
            ...textProps,
          },
          ...child.props,
        })
      );
    } else if (title) {
      return (
        <Text
          foregroundColor={getColor(getButtonTextColor(), colorScheme)}
          {...textProps}
        >
          {title}
        </Text>
      );
    }
    return null;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={action}
      style={[
        {
          justifyContent: 'center',
          opacity,
          zIndex,
          backgroundColor: getColor(
            backgroundColor || getButtonBackgroundColor(),
            colorScheme
          ),
          ...getCornerRadius(cornerRadius || getButtonCornerRadius()),
          ...getPadding(padding || getButtonPadding()),
          ...getFrame(frame),
          ...getBorder(border, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {getChildren()}
    </TouchableOpacity>
  );
};
