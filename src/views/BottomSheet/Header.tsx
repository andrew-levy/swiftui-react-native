import React from 'react';
import Animated from 'react-native-reanimated';
import { UIColor } from '../../themes/colors';
import { Text } from '../Text';
import { PEAKING_HEIGHT } from './Constants';

type HeaderProps = {
  header: string;
  headerBorderOpacity: Animated.Node<number>;
};

export const Header: React.FC<HeaderProps> = ({
  header,
  headerBorderOpacity,
}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 15,
        borderBottomWidth: headerBorderOpacity,
        borderBottomColor: UIColor.systemGray5,
        width: '100%',
        height: PEAKING_HEIGHT,
      }}
    >
      <Text
        alignment='leading'
        fontWeight='bold'
        padding={{ leading: 15, bottom: 15 }}
      >
        {header}
      </Text>
    </Animated.View>
  );
};
