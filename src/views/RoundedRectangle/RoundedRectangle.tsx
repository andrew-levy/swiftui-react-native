import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors/utils';
import { Frame } from '../../types/propTypes';

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
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={[
        styles.rect,
        {
          backgroundColor: systemColor(fill, colorScheme),
          borderColor: systemColor(UIColor.systemGray5, colorScheme),
          width: frame.width,
          height: frame.height,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  rect: {
    borderRadius: 3,
    borderWidth: 0.5,
  },
});
