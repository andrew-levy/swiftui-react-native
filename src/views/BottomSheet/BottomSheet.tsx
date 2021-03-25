import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { interpolate, useValue } from 'react-native-reanimated';
import {
  withSpring,
  onGestureEvent,
  clamp,
} from 'react-native-redash/lib/module/v1';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';
import { BackgroundShadow } from './BackgroundShadow';
import { PEAKING_HEIGHT, CONFIG } from './Constants';
import { Content } from './Content';
import { Header } from './Header';
import { PullLine } from './PullLine';

type BottomSheetProps = {
  background?: string;
  opacity?: number;
  header?: string;
  snapPoints?: string[];
  // isPresented?: boolean;
};

const { width, height } = Dimensions.get('screen');
const SNAP_THREE_QUARTER = height / 4;
const SNAP_HALF = height / 2 + PEAKING_HEIGHT;
const SNAP_QUARTER = (3 * height) / 4;
const SNAP_BOTTOM = height - PEAKING_HEIGHT;

const snapMap = {
  bottom: SNAP_BOTTOM,
  quarter: SNAP_QUARTER,
  half: SNAP_HALF,
  'three-quarter': SNAP_THREE_QUARTER,
  full: PEAKING_HEIGHT,
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  background = UIColor.white,
  opacity,
  header,
  snapPoints,
  // isPresented = false,
  children,
}) => {
  const translationY = useValue(0);
  const velocityY = useValue(0);
  const state = useValue(State.UNDETERMINED);
  const offset = useValue(SNAP_BOTTOM);

  const { colorScheme } = useColorScheme();

  // Defaults to bottom and three-quarters
  const snaps = snapPoints
    ? [...snapPoints.map((s) => snapMap[s]), snapMap.bottom]
    : [snapMap.bottom, snapMap['three-quarter']];

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY,
  });

  const translateY = clamp(
    withSpring({
      value: translationY,
      velocity: velocityY,
      offset,
      state,
      snapPoints: snaps,
      config: CONFIG,
    }),
    Math.min(...snaps) - PEAKING_HEIGHT,
    SNAP_BOTTOM
  );

  const shadowOpacity = interpolate(translateY, {
    inputRange: [PEAKING_HEIGHT, SNAP_BOTTOM],
    outputRange: [0.5, 0],
  });

  const contentOpacity = interpolate(translateY, {
    inputRange: [SNAP_QUARTER, SNAP_BOTTOM],
    outputRange: [1, 0],
  });

  return (
    <>
      <BackgroundShadow shadowOpacity={shadowOpacity} />
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              bottom: PEAKING_HEIGHT,
              height: height,
              width: width,
              backgroundColor: systemColor(background, colorScheme),
              opacity: opacity || 1,
              transform: [{ translateY }],
            },
          ]}
        >
          <PullLine width={width} />
          {header && <Header header={header} />}
          <Content content={children} contentOpacity={contentOpacity} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    shadowColor: systemColor(UIColor.black),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
