import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Modifiers } from '../../utils/modifiers';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getPadding } from '../../utils/padding';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getTransform } from '../../utils/transform';
import { useColorScheme } from '../../hooks/useColorScheme';
import { UIColor, getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';
import { Frame } from '../../utils/frame';

type LinearProps = Modifiers & {
  value: number;
  total?: number;
  tint?: UIColor;
};

export const Linear = ({
  value,
  total = 100,
  backgroundColor,
  opacity,
  frame,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  padding,
  border,
  shadow,
  zIndex,
  style,
  tint,
  alert,
  preferredColorScheme,
  onAppear,
  onDisappear,
}: LinearProps) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);
  const [sliderWidth, sliderHeight] = getSliderWidth(frame);
  const midPoint = total / 2;
  const slope = midPoint / (sliderWidth / 2);
  const progress = useRef(
    new Animated.Value(value2Position(value, midPoint, slope))
  ).current;

  useEffect(() => {
    if (value > total) {
      Animated.timing(progress, {
        toValue: value2Position(total, midPoint, slope) + sliderWidth / 2,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else if (value < 0) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: value2Position(value, midPoint, slope) + sliderWidth / 2,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [value, total]);

  return (
    <View
      style={[
        {
          opacity,
          zIndex,
          backgroundColor: getColor(backgroundColor, colorScheme),
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getBorder(border, colorScheme),
          ...getShadow(shadow, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      <View
        style={[
          styles.progressBar,
          {
            width: sliderWidth,
            height: sliderHeight,
            backgroundColor: getColor('systemGray5', colorScheme),
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: progress,
              height: sliderHeight,
              borderRadius: 10,
              backgroundColor: getColor(tint, colorScheme, 'systemBlue'),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    borderRadius: 10,
  },
});

export const getSliderWidth = (frame: Frame) => {
  const dimensions = Dimensions.get('window');
  let dims = [300, 3];
  if (!frame) return dims;
  if (frame.width) {
    if (typeof frame.width === 'string' && frame.width.endsWith('%')) {
      const percent = parseInt(frame.width.replace('%', '')) / 100;
      dims[0] = percent * dimensions.width;
    } else {
      dims[0] = frame.width as number;
    }
  }
  if (frame.height) {
    if (typeof frame.height === 'number') dims[1] = frame.height;
  }
  return dims;
};

export const value2Position = (
  value: number,
  midPoint: number,
  slope: number
) => {
  return (value - midPoint) / slope;
};
