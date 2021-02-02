import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UIColor } from '../../themes/colors';
import { Frame } from '../../types/stylePropTypes';

type RoundedRectangleProps = {
  fill: string;
  frame: Frame;
  cornerRadius?: number;
};

const DEFAULT_RECT_SIZE = 20;

export const RoundedRectangle: React.FC<RoundedRectangleProps> = ({
  fill = UIColor.white,
  frame = { width: DEFAULT_RECT_SIZE, height: DEFAULT_RECT_SIZE },
}) => {
  return (
    <View
      style={[
        styles.rect,
        {
          backgroundColor: fill,
          width: frame.width,
          height: frame.height,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  rect: { borderColor: UIColor.systemGray5, borderRadius: 3, borderWidth: 0.5 },
});
