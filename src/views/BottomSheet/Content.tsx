import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PEAKING_HEIGHT } from './Constants';

type ContentProps = {
  contentOpacity: Animated.Node<number>;
  content: React.ReactNode;
};

export const Content: React.FC<ContentProps> = ({
  contentOpacity,
  content,
}) => {
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { top: PEAKING_HEIGHT + 15, opacity: contentOpacity },
      ]}
    >
      {content}
    </Animated.View>
  );
};
