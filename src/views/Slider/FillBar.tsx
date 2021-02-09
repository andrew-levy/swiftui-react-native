import React from 'react';
import Animated from 'react-native-reanimated';
import { SLIDER_HEIGHT } from './Constants';

type FillBarProps = {
  fillWidth: Animated.Node<number>;
  color: string;
};

export const FillBar: React.FC<FillBarProps> = ({ fillWidth, color }) => {
  return (
    <Animated.View
      style={{
        backgroundColor: color,
        height: SLIDER_HEIGHT,
        width: fillWidth,
        borderRadius: 10,
      }}
    />
  );
};
