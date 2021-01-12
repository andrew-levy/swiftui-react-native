import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { UIColor } from '../../themes/colors';

type BackgroundShadowProps = {
  shadowOpacity: Animated.Node<number>;
};

export const BackgroundShadow: React.FC<BackgroundShadowProps> = ({
  shadowOpacity,
  children,
}) => {
  return (
    <Animated.View
      pointerEvents='none'
      style={[
        StyleSheet.absoluteFill,
        { opacity: shadowOpacity, backgroundColor: UIColor.black },
      ]}
    >
      {children}
    </Animated.View>
  );
};
