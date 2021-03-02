import React from 'react';
import { StyleSheet, View } from 'react-native';
import { UIColor } from '../../themes/colors';

const height = 2.5;
const width = 10;
const borderRadius = 10;

export const RightChevron: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.arm, styles.top]} />
      <View style={[styles.arm, styles.bottom]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  arm: { height, width, backgroundColor: UIColor.systemGray3, borderRadius },
  top: {
    transform: [{ translateY: -height }, { rotate: '45deg' }],
  },
  bottom: {
    transform: [{ rotate: '-45deg' }],
  },
});
