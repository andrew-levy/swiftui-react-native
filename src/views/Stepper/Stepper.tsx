import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { UIColor } from '../../themes/colors';

type StepperProps = {
  onIncrement: () => void;
  onDecrement: () => void;
};

// TODO: use tap gesture handler to animate buttons
export const Stepper: React.FC<StepperProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.button}>
        <Button onPress={() => onDecrement} title='-' />
      </Animated.View>
      <View style={styles.divider} />
      <Animated.View style={styles.button}>
        <Button onPress={() => onIncrement} title='+' />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColor.systemGray6,
    borderRadius: 6,
    flexDirection: 'row',
    padding: 3,
    width: 100,
  },
  divider: {
    top: 5,
    height: 15,
    borderRightWidth: 1,
    width: 0,
    borderRightColor: UIColor.systemGray4,
  },
  button: {
    width: '50%',
  },
});
