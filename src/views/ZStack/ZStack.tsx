import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import {
  Alignments,
  HorizontalAlignment,
  VerticalAlignment,
} from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getFrame } from '../../utils/frame';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getRotationEffect } from '../../utils/rotationEffect';
import { getScaleEffect } from '../../utils/scaleEffect';
import { getShadow } from '../../utils/shadow';

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
  return (
    <View
      style={[
        {
          justifyContent: Alignments.vertical[alignment.vertical],
          alignItems: Alignments.horizontal[alignment.horizontal],
          backgroundColor,
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getRotationEffect(rotationEffect),
          ...getScaleEffect(scaleEffect),
        },
        style,
      ]}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ...child.props,
          style: {
            zIndex: i,
            position: i === 1 ? 'relative' : 'absolute',
          },
        })
      )}
    </View>
  );
};
