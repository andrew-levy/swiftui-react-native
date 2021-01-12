import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { HEADER_TOP, PEAKING_HEIGHT } from './Constants';

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
        { top: PEAKING_HEIGHT + HEADER_TOP, opacity: contentOpacity },
      ]}
    >
      {content}
    </Animated.View>
  );
};
