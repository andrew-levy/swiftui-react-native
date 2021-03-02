import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UIColor } from '../../../themes/colors';

const height = 2.5;
const shortWidth = 8;
const longWidth = 16;
const borderRadius = 10;

export const CheckMark: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.arm, styles.short]} />
      <View style={[styles.arm, styles.long]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  arm: { height, backgroundColor: UIColor.systemBlue, borderRadius },
  short: {
    width: shortWidth,
    transform: [{ translateY: 5 }, { rotate: '45deg' }],
  },
  long: {
    width: longWidth,
    transform: [{ translateX: 3 }, { rotate: '-45deg' }],
  },
});
