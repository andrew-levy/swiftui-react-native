import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandlerGestureEvent,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { Binding } from '../../utils/binding';
import { Modifiers } from '../../utils/modifiers';
import { useUIColor } from '../../hooks/useUIColor';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getPadding } from '../../utils/padding';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import {
  CIRCLE_WIDTH,
  getSliderWidth,
  position2Value,
  value2Position,
} from './utils';
import { getScaleEffect } from '../../utils/scaleEffect';
import { getRotationEffect } from '../../utils/rotationEffect';

type SliderProps = Modifiers & {
  accentColor?: string;
  step?: number;
  range?: [number, number];
  value: Binding<number>;
  updateOnSlide?: boolean;
  onChange?: (value?: number) => void;
};

type GestureHandlerContext = {
  offsetX: number;
};

export const Slider: React.FC<SliderProps> = ({
  accentColor,
  range = [0, 10],
  step = 1,
  value,
  updateOnSlide = true,
  frame,
  backgroundColor,
  style,
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  border,
  opacity,
  zIndex,
  onAppear,
  onDisappear,
  onChange,
}) => {
  useLifecycle(onAppear, onDisappear);
  const UIColor = useUIColor();
  const [sliderWidth, sliderHeight] = getSliderWidth(frame);
  const [from, through] = range;
  const midPoint = (through + from) / 2;
  const slope = (midPoint - from) / (sliderWidth / 2);

  const translateX = useSharedValue(
    value2Position(value.value, midPoint, slope)
  );

  useEffect(() => {
    const newPos = value2Position(value.value, midPoint, slope);
    translateX.value = withTiming(newPos);
  }, [value.value]);

  const animatedCursorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + sliderWidth / 2,
    };
  });

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (e, ctx) => {
      const prevPos = translateX.value;
      const newPos = e.translationX + ctx.offsetX;
      if (newPos < sliderWidth / 2 && newPos > -sliderWidth / 2) {
        translateX.value = newPos;
        const prevVal = position2Value(prevPos, midPoint, slope, step);
        const newVal = position2Value(newPos, midPoint, slope, step);
        if (updateOnSlide && prevVal !== newVal) {
          runOnJS(value.setValue)(newVal);
          if (onChange) runOnJS(onChange)(newVal);
        }
      }
    },
    onEnd: () => {
      if (!updateOnSlide) {
        const newVal = position2Value(translateX.value, midPoint, slope, step);
        runOnJS(value.setValue)(newVal);
        if (onChange) runOnJS(onChange)(newVal);
      }
    },
  });

  return (
    <View
      style={[
        styles.slider,
        {
          width: sliderWidth,
          height: sliderHeight,
          marginTop: CIRCLE_WIDTH / 2,
          marginBottom: CIRCLE_WIDTH / 2,
          backgroundColor: backgroundColor || UIColor.systemGray4,
          opacity,
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getBorder(border),
          ...getShadow(shadow),
          ...getScaleEffect(scaleEffect),
        },
        getRotationEffect(rotationEffect),
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            height: sliderHeight,
            borderRadius: 10,
            backgroundColor: accentColor || UIColor.systemBlue,
          },
          animatedFillStyle,
        ]}
      />
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.cursor,
            {
              left: sliderWidth / 2 - CIRCLE_WIDTH / 2,
              top: -CIRCLE_WIDTH / 2,
              height: CIRCLE_WIDTH,
              width: CIRCLE_WIDTH,
            },
            animatedCursorStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    borderRadius: 10,
  },
  cursor: {
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
