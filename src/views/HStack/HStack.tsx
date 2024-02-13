import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAlert } from '../../hooks/useAlert';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import { HStackAlignment, getAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getColor } from '../../utils/colors';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getFrame } from '../../utils/frame';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getTransform } from '../../utils/transform';

type HStackProps = WithChildren<
  Modifiers & {
    spacing?: number;
    alignment?: HStackAlignment;
  }
>;

export const HStack = ({
  spacing = 2,
  alignment = 'center',
  alert,
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
  style,
  preferredColorScheme,
  onAppear,
  onDisappear,
}: HStackProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  return (
    <View
      style={[
        styles.hStack,
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getAlignment(alignment, 'hstack'),
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
        ? React.Children.map(children, (child) =>
            child ? (
              <>
                <View style={{ width: spacing }} />
                {child}
                <View style={{ width: spacing }} />
              </>
            ) : null
          )
        : children}
    </View>
  );
};

const styles = StyleSheet.create({
  hStack: {
    flexDirection: 'row',
  },
});

HStack.displayName = 'SwiftUIHStack';
