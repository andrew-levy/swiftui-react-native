import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { WithChildren, Modifiers } from '../../utils/modifiers';
import { getAlignment, HStackAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

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
