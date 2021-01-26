/*
 * Thank you @William Candillon for this awesome example found here:
 * https://github.com/wcandillon/can-it-be-done-in-react-native/tree/31496696939aa94094e8ec499b113facc4e94e56/the-10-min/src/Picker
 */

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from 'react-native-reanimated';
import { useValue, translateZ } from 'react-native-redash/lib/module/v1';
import MaskedView from '@react-native-community/masked-view';

import GestureHandler from './WheelGestureHandler';
import {
  WHEEL_VISIBLE_ITEMS,
  WHEEL_ITEM_HEIGHT,
  WHEEL_PERSPECTIVE,
} from './Constants';
import { UIColor } from '../../themes/colors';
import { PickerProps } from '.';

const styles = StyleSheet.create({
  selected: {
    position: 'absolute',
    height: WHEEL_ITEM_HEIGHT,
    width: '90%',
    borderRadius: 6,
    backgroundColor: UIColor.systemGray6,
  },
  container: {
    width: '90%',
    overflow: 'hidden',
  },
  item: {
    height: WHEEL_ITEM_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 24,
    lineHeight: WHEEL_ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

const RADIUS_REL = WHEEL_VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * WHEEL_ITEM_HEIGHT;

const PickerWheel = ({ items, selection, onSelect }: PickerProps) => {
  const translateY = useValue(0);

  const maskElement = (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {items.map((v, i) => {
        const interpolationValue = divide(
          sub(translateY, WHEEL_ITEM_HEIGHT * 2),
          -WHEEL_ITEM_HEIGHT
        );
        const y = interpolate(interpolationValue, {
          inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
          outputRange: [-1, 0, 1],
          extrapolate: Extrapolate.CLAMP,
        });
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        const opacity = interpolate(interpolationValue, {
          inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
          outputRange: [0.3, 1, 0.3],
          extrapolate: Extrapolate.CLAMP,
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.item,
              {
                opacity,
                transform: [
                  { perspective: WHEEL_PERSPECTIVE },
                  { rotateX },
                  translateZ(WHEEL_PERSPECTIVE, z),
                ],
              },
            ]}
          >
            <Text style={styles.label}>{v}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
  return (
    <>
      <View style={styles.selected} />
      <View style={styles.container}>
        <MaskedView {...{ maskElement }}>
          <View
            style={{
              height: WHEEL_ITEM_HEIGHT * 2,
              backgroundColor: UIColor.systemGray3,
            }}
          />
          <View
            style={{
              height: WHEEL_ITEM_HEIGHT,
              backgroundColor: UIColor.black,
            }}
          />
          <View
            style={{
              height: WHEEL_ITEM_HEIGHT * 2,
              backgroundColor: UIColor.systemGray3,
            }}
          />
        </MaskedView>
        <View style={StyleSheet.absoluteFill}>
          <View
            style={{
              borderColor: UIColor.systemGray4,
              // borderTopWidth: 0.5,
              // borderBottomWidth: 0.5,
              // borderRightWidth: 0.5,
              // borderLeftWidth: 0.5,
              top: WHEEL_ITEM_HEIGHT * 2,
              height: WHEEL_ITEM_HEIGHT,
              borderRadius: 6,
            }}
          />
        </View>
        <GestureHandler
          max={items.length}
          value={translateY}
          onSelect={onSelect}
          selection={selection}
        />
      </View>
    </>
  );
};

export default PickerWheel;
