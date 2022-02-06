import React from 'react';
import { Switch } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Binding } from '../../utils/binding';
import { Modifiers } from '../../utils/modifiers';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';

type ToggleProps = Modifiers & {
  isOn: Binding<boolean>;
  tintColor?: string;
  onChange?: (value?: boolean) => void;
};

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  tintColor,
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
  onAppear,
  onDisappear,
  onChange,
}) => {
  useLifecycle(onAppear, onDisappear);
  return (
    <Switch
      style={[
        {
          backgroundColor,
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
      value={isOn.value}
      onValueChange={() => {
        const newValue = !isOn.value;
        isOn.setValue(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }}
      trackColor={{ true: tintColor, false: null }}
    />
  );
};
