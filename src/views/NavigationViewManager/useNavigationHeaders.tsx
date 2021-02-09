import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import { VStack } from '../VStack';
import { Text } from '../Text';
import { UIColor } from '../../themes/colors';
import { Extrapolate } from 'react-native-reanimated';

export const useNavigationHeaders = (scrollValue: Animated.Value) => {
  const LARGE_LEADING_PADDING = 20;
  const wWidth = Dimensions.get('window').width;
  const [textWidth, setTextWidth] = useState(0);

  const inlineStyle = {
    // TODO
  };
  const animatedInlineStyle = {
    shadowOpacity: scrollValue.interpolate({
      inputRange: [40, 49.99, 50],
      outputRange: [0, 0.5, 1],
    }),
  };

  const largeStyle = {
    shadowColor: 'transparent',
  };
  const animatedLargeStyle = {
    shadowOpacity: scrollValue.interpolate({
      inputRange: [40, 49.99, 50],
      outputRange: [0, 0.5, 1],
    }),
  };

  const AnimatedLarge = (title, child) => (
    <Animated.Text
      onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
      style={{
        // ...titleStyles,
        fontWeight: '700',
        fontSize: 32,
        transform: [
          {
            scale: scrollValue.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
          {
            translateX: scrollValue.interpolate({
              inputRange: [0, 50],
              outputRange: [
                -wWidth / 2 + textWidth / 2 + LARGE_LEADING_PADDING,
                0,
              ],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
          {
            translateY: scrollValue.interpolate({
              inputRange: [0, 50],
              outputRange: [50, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
          },
        ],
      }}
    >
      {title || child.props.name}
    </Animated.Text>
  );

  const Large = (title, child) => (
    <VStack background={UIColor.transparent} alignment='leading'>
      <Animated.Text
        style={{
          fontWeight: '700',
          fontSize: 32,
          transform: [
            {
              translateY: 50,
            },
            {
              translateX: -wWidth / 2 + textWidth / 2 + LARGE_LEADING_PADDING,
            },
          ],
        }}
      >
        {title || child.props.name}
      </Animated.Text>
    </VStack>
  );

  const AnimatedInline = (title, child) => (
    <Animated.Text
      style={{
        // ...titleStyles,
        fontWeight: '600',
        fontSize: 16,
        opacity: scrollValue.interpolate({
          inputRange: [57, 59.99, 60],
          outputRange: [0, 0.5, 1],
        }),
      }}
    >
      {title || child.props.name}
    </Animated.Text>
  );

  const Inline = (title, child) => (
    <Text fontWeight='bold'>{title || child.props.name}</Text>
  );

  const Default = (title, child) => <Text>{title || child.props.name}</Text>;

  return {
    Inline,
    AnimatedInline,
    Large,
    AnimatedLarge,
    Default,
    animatedInlineStyle,
    inlineStyle,
    largeStyle,
    animatedLargeStyle,
  };
};
