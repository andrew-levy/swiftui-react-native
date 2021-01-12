import React from 'react';
import { View } from 'react-native';
import { UIColor } from '../../themes/colors';

type PullLineProps = {
  width: number;
};

const lineWidth = 38;
const lineHeight = 6;

export const PullLine = ({ width }: PullLineProps) => {
  const left = width / 2 - lineWidth / 2;
  return (
    <View
      style={{
        position: 'absolute',
        top: lineHeight,
        left,
        height: lineHeight,
        width: lineWidth,
        backgroundColor: UIColor.systemGray3,
        borderRadius: 10,
      }}
    />
  );
};
