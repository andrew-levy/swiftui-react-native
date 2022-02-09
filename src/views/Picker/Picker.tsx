import React, { Children, cloneElement, Fragment, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Binding } from '../../utils/binding';
import { Modifiers, WithChildren } from '../../utils/modifiers';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  clamp,
  GestureHandlerContext,
  positionToSelected,
  selectedToPosition,
} from './utils';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getShadow } from '../../utils/shadow';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { useLifecycle } from '../../hooks/useLifecycle';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Text } from '../Text';
import { getTransform } from '../../utils/transform';
import { getColor } from '../../utils/colors';

type PickerProps = Modifiers &
  WithChildren & {
    selection: Binding<number>;
    onChange?: (value: number) => void;
  };

export const Picker = ({
  children,
  selection,
  backgroundColor,
  opacity,
  frame,
  cornerRadius,
  scaleEffect,
  rotationEffect,
  padding,
  border,
  shadow,
  zIndex,
  style,
  onChange,
  onAppear,
  onDisappear,
}: PickerProps) => {
  useLifecycle(onAppear, onDisappear);
  const { colorScheme } = useColorScheme();
  const childCount = Children.count(children);
  const [optionDimensions, setOptionDimensions] = useState(null);
  const tempSelection = useSharedValue(selection.value);
  const width = optionDimensions ? optionDimensions.width : 0;
  const slidePosition = useSharedValue(
    selectedToPosition(selection.value, width, childCount)
  );

  const sliderHeight = optionDimensions ? optionDimensions.height - 5 : 0;
  const sliderWidth = optionDimensions
    ? optionDimensions.width / childCount
    : 0;

  const animatedSliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slidePosition.value }],
    };
  }, [slidePosition.value]);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = slidePosition.value;
    },
    onActive: (e, ctx) => {
      const currentXPos = e.translationX + ctx.offsetX;
      const optionWidth = width / childCount;
      const slideTo = clamp(
        Math.round((currentXPos - optionWidth / 2) / optionWidth) * optionWidth,
        0,
        (childCount - 1) * optionWidth
      );
      if (slideTo !== slidePosition.value) {
        slidePosition.value = withTiming(slideTo);
        tempSelection.value = positionToSelected(slideTo, width, childCount);
        console.log(tempSelection.value);
      }
    },
    onEnd: () => {
      const newValue = positionToSelected(
        slidePosition.value,
        width,
        childCount
      );

      runOnJS(selection.setValue)(newValue);
      if (onChange) {
        runOnJS(onChange)(newValue);
      }
    },
  });

  return (
    <Fragment>
      <View
        onLayout={(e) => setOptionDimensions(e.nativeEvent.layout)}
        style={[
          styles.container,
          {
            opacity,
            zIndex,
            backgroundColor: getColor(
              backgroundColor,
              colorScheme,
              'secondarySystemBackground'
            ),
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
        <View style={styles.options}>
          {React.Children.map(children, (child, i) => {
            const textChild =
              child.type === Text
                ? cloneElement(child, { fontSize: 12, ...child.props })
                : child;
            return (
              <Fragment key={i}>
                <TouchableOpacity
                  style={[styles.option, { flexBasis: `${100 / childCount}%` }]}
                  disabled={selection.value === i}
                  onPress={() => {
                    slidePosition.value = withTiming(
                      selectedToPosition(i, width, childCount)
                    );
                    tempSelection.value = i;
                    runOnJS(selection.setValue)(i);
                    if (onChange) {
                      runOnJS(onChange)(i);
                    }
                  }}
                >
                  {textChild}
                </TouchableOpacity>
                <Divider
                  color={getColor('systemGray4', colorScheme)}
                  index={i}
                  selection={tempSelection.value}
                  childCount={childCount}
                />
              </Fragment>
            );
          })}
        </View>
        <Animated.View
          style={[
            styles.slider,
            animatedSliderStyle,
            {
              width: sliderWidth,
              height: sliderHeight,
              backgroundColor:
                colorScheme === 'dark'
                  ? getColor('secondarySystemBackground', 'dark')
                  : getColor('systemBackground', 'light'),
            },
          ]}
        />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            styles.slider,
            animatedSliderStyle,
            {
              width: sliderWidth,
              height: sliderHeight,
              zIndex: 0,
              left: 10,
              top: 12,
            },
          ]}
        />
      </PanGestureHandler>
    </Fragment>
  );
};

const Divider = ({
  color,
  index,
  selection,
  childCount,
}: {
  color: string;
  index: number;
  selection: number;
  childCount: number;
}) => {
  const animatedDividerStyle = useAnimatedStyle(() => {
    return {
      opacity:
        index === selection ||
        index === selection - 1 ||
        index === childCount - 1
          ? withTiming(0)
          : withTiming(1),
    };
  }, [index, selection, childCount]);

  return (
    <Animated.View
      style={[
        styles.divider,
        animatedDividerStyle,
        {
          borderRightColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    flexDirection: 'row',
    padding: 3,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  option: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  divider: {
    top: 5,
    height: 15,
    borderRightWidth: 1,
    width: 0,
  },
  slider: {
    position: 'absolute',
    top: 2,
    zIndex: -1,
    borderRadius: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
