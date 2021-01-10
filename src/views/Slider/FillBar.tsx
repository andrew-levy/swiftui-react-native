import React from 'react';
import Animated from 'react-native-reanimated';
import { UIColor } from '../../themes/colors';
import { SLIDER_HEIGHT } from './Constants';

type FillBarProps = {
  fillWidth: Animated.Node<number>;
};

export const FillBar: React.FC<FillBarProps> = ({ fillWidth }) => {
  return (
    <Animated.View
      style={{
        backgroundColor: UIColor.systemBlue,
        height: SLIDER_HEIGHT,
        width: fillWidth,
        borderRadius: 10,
      }}
    />
  );
};
