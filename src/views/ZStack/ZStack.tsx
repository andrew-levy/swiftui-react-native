import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useAlert } from '../../hooks/useAlert';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getAlignment, ZStackAlignment } from '../../utils/alignments';
import { getBorder } from '../../utils/border';
import { getColor } from '../../utils/colors';
import { getCornerRadius } from '../../utils/cornerRadius';
import { Frame, getFrame } from '../../utils/frame';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import { getPadding } from '../../utils/padding';
import { getShadow } from '../../utils/shadow';
import { getTransform } from '../../utils/transform';

type ZStackProps = WithChildren<
  Omit<Modifiers, 'alignment' | 'frame'> & {
    style?: StyleProp<ViewStyle>;
    alignment?: ZStackAlignment;
    frame: Frame;
  }
>;

export const ZStack = ({
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
  alert,
  preferredColorScheme,
  onAppear,
  onDisappear,
}: ZStackProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  return (
    <View
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getAlignment(alignment, 'zstack'),
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
      {React.Children.map(children as ReactElement<any>[], (child, i) =>
        child
          ? React.cloneElement(child, {
              ...child.props,
              style: {
                zIndex: i,
                position:
                  i === 1 || React.Children.count(children) === 1
                    ? 'relative'
                    : 'absolute',
              },
            })
          : null
      )}
    </View>
  );
};
