import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';
import { HEADER_HEIGHT, HEADER_WIDTH } from './Constants';

type PullLineProps = {
  width: number;
};

export const PullLine = ({ width }: PullLineProps) => {
  const left = width / 2 - HEADER_WIDTH / 2;
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        position: 'absolute',
        top: HEADER_HEIGHT,
        left,
        height: HEADER_HEIGHT,
        width: HEADER_WIDTH,
        backgroundColor: systemColor(UIColor.systemGray3, colorScheme),
        borderRadius: 10,
      }}
    />
  );
};
