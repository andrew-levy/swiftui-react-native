import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getAlignment, VStackAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

type VStackProps = WithChildren<
  Modifiers & {
    spacing?: number;
    style?: StyleProp<ViewStyle>;
    alignment?: VStackAlignment;
  }
>;

export const VStack = ({
  spacing = 2,
  alignment = 'center',
  alert,
  style,
  children,
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  backgroundColor,
  border,
  opacity,
  frame,
  zIndex,
  preferredColorScheme,
  onAppear,
  onDisappear,
}: VStackProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  return (
    <View
      style={[
        styles.vStack,
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getAlignment(alignment, 'vstack'),
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow, colorScheme),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {spacing && spacing !== 0
        ? React.Children.map(children, (child) => (
            <>
              <View style={{ height: spacing }} />
              {child}
              <View style={{ height: spacing }} />
            </>
          ))
        : children}
    </View>
  );
};

const styles = StyleSheet.create({
  vStack: {
    flexDirection: 'column',
  },
});
