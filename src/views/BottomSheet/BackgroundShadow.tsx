import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { systemColor, UIColor } from '../../utils/colors';

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
        {
          opacity: shadowOpacity,
          backgroundColor: systemColor(UIColor.black),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
