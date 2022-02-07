import React from 'react';
import { TextInput } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Modifiers, TextModifiers } from '../../utils/modifiers';
import { getBorder } from '../../utils/border';
import { Font, FontWeight, getFont } from '../../utils/fonts';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { Binding } from '../../utils/binding';
import { useUIColor } from '../../hooks/useUIColor';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';

type TextFieldProps = Modifiers &
  TextModifiers & {
    placeholder?: string;
    text: Binding<string>;
    onChange?: () => void;
  };

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  text,
  onChange,
  fontSize,
  font = Font.body,
  customFont,
  foregroundColor,
  fontWeight = FontWeight.regular,
  cornerRadius,
  backgroundColor,
  rotationEffect,
  scaleEffect,
  padding,
  border,
  frame,
  shadow,
  opacity,
  zIndex,
  style,
  onAppear,
  onDisappear,
}) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  return (
    <TextInput
      style={[
        {
          backgroundColor,
          color: foregroundColor || UIColor.label,
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getFont(font, fontSize, fontWeight, customFont),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={UIColor.secondaryLabel}
      value={text.value}
      onChangeText={(newText) => {
        text.setValue(newText);
        if (onChange) {
          onChange();
        }
      }}
    />
  );
};
