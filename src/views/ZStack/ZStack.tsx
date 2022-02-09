import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import {
  Alignments,
  HorizontalAlignment,
  VerticalAlignment,
} from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getColor } from '../../utils/colors';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getFrame } from '../../utils/frame';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getTransform } from '../../utils/transform';

type ZStackProps = Omit<Modifiers, 'alignment'> &
  WithChildren & {
    style?: StyleProp<ViewStyle>;
    alignment?: {
      vertical: VerticalAlignment;
      horizontal: HorizontalAlignment;
    };
  };

export const ZStack = ({
  alignment = { vertical: 'center', horizontal: 'center' },
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
}: ZStackProps) => {
  useLifecycle(onAppear, onDisappear);
  const { colorScheme } = useColorScheme();

  return (
    <View
      style={[
        {
          justifyContent: Alignments.vertical[alignment.vertical],
          alignItems: Alignments.horizontal[alignment.horizontal],
          backgroundColor: getColor(backgroundColor, colorScheme),
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
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          style: {
            zIndex: i,
            position:
              i === 1 || React.Children.count(children) === 1
                ? 'relative'
                : 'absolute',
          },
        })
      )}
    </View>
  );
};
