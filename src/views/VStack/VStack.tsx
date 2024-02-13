import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useAlert } from '../../hooks/useAlert';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import { VStackAlignment, getAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getColor } from '../../utils/colors';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getFrame } from '../../utils/frame';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getTransform } from '../../utils/transform';

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

VStack.displayName = 'SwiftUIVStack';
