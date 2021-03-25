import React from 'react';
import Animated from 'react-native-reanimated';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor } from '../../utils/colors';
import { SLIDER_HEIGHT } from './Constants';

type FillBarProps = {
  fillWidth: Animated.Node<number>;
  color: string;
};

export const FillBar: React.FC<FillBarProps> = ({ fillWidth, color }) => {
  const { colorScheme } = useColorScheme();
  return (
    <Animated.View
      style={{
        backgroundColor: systemColor(color, colorScheme),
        height: SLIDER_HEIGHT,
        width: fillWidth,
        borderRadius: 10,
      }}
    />
  );
};
