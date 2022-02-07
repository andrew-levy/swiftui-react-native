import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { Alignments, HorizontalAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getFrame } from '../../utils/frame';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';

type VStackProps = Modifiers &
  WithChildren & {
    spacing?: number;
    style?: StyleProp<ViewStyle>;
    alignment?: HorizontalAlignment;
  };

export const VStack = ({
  spacing,
  alignment = 'center',
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
  onAppear,
  onDisappear,
}: VStackProps) => {
  useLifecycle(onAppear, onDisappear);
  return (
    <View
      style={[
        styles.vStack,
        {
          alignItems: Alignments.horizontal[alignment],
          backgroundColor,
          opacity,
          zIndex,
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
