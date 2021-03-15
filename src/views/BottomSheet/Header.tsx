import React from 'react';
import Animated from 'react-native-reanimated';
import { systemColor, UIColor } from '../../utils/colors/utils';
import { Text } from '../Text';
import { HEADER_TOP, PEAKING_HEIGHT } from './Constants';

type HeaderProps = {
  header: string;
};

export const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: HEADER_TOP,
        borderBottomColor: systemColor(UIColor.transparent),
        width: '100%',
        height: PEAKING_HEIGHT,
      }}
    >
      <Text
        alignment='leading'
        fontWeight='bold'
        padding={{ leading: HEADER_TOP, bottom: HEADER_TOP }}
      >
        {header}
      </Text>
    </Animated.View>
  );
};
