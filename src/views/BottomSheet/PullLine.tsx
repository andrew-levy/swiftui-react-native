import React from 'react';
import { View } from 'react-native';
import { UIColor } from '../../themes/colors';
import { HEADER_HEIGHT, HEADER_WIDTH } from './Constants';

type PullLineProps = {
  width: number;
};

export const PullLine = ({ width }: PullLineProps) => {
  const left = width / 2 - HEADER_WIDTH / 2;
  return (
    <View
      style={{
        position: 'absolute',
        top: HEADER_HEIGHT,
        left,
        height: HEADER_HEIGHT,
        width: HEADER_WIDTH,
        backgroundColor: UIColor.systemGray3,
        borderRadius: 10,
      }}
    />
  );
};
