import React from 'react';
import { View, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { UIColor } from '../../themes/colors';

type SwipeableItemProps = {};

export const SwipeableItem: React.FC<SwipeableItemProps> = ({ children }) => {
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={RightActions}
    >
      {children}
    </Swipeable>
  );
};

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: UIColor.systemGreen,
        justifyContent: 'center',
      }}
    >
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          transform: [{ scale }],
        }}
      >
        Left Action
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: UIColor.systemRed,
        justifyContent: 'center',
      }}
    >
      <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          transform: [{ scale }],
        }}
      >
        Left Action
      </Animated.Text>
    </View>
  );
};
