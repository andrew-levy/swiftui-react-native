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

type HStackProps = Modifiers &
  WithChildren & {
    spacing?: number;
    alignment?: HStackAlignment;
  };

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
  onAppear,
  onDisappear,
}: HStackProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme();

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
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      {spacing && spacing !== 0
        ? React.Children.map(children, (child) => (
            <>
              <View style={{ width: spacing }} />
              {child}
              <View style={{ width: spacing }} />
            </>
          ))
        : children}
    </View>
  );
};

const styles = StyleSheet.create({
  hStack: {
    flexDirection: 'row',
  },
});
