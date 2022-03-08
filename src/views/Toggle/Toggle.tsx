import React from 'react';
import { Switch } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { BooleanBinding } from '../../utils/binding';
import { Modifiers } from '../../utils/modifiers';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { UIColor, getColor } from '../../utils/colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAlert } from '../../hooks/useAlert';

type ToggleProps = Modifiers & {
  isOn: BooleanBinding;
  tint?: UIColor;
  onChange?: (value?: boolean) => void;
};

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  tint,
  padding,
  backgroundColor,
  shadow,
  frame,
  border,
  opacity,
  zIndex,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  style,
  alert,
  onAppear,
  onDisappear,
  onChange,
}) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme();

  return (
    <Switch
      style={[
        {
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
      value={isOn.value}
      onValueChange={() => {
        const newValue = !isOn.value;
        isOn.setValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }}
      trackColor={{ true: getColor(tint, colorScheme), false: null }}
    />
  );
};
