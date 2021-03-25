import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';

type StepperProps = {
  onIncrement: () => void;
  onDecrement: () => void;
};

// TODO: use tap gesture handler to animate buttons
export const Stepper: React.FC<StepperProps> = ({
  onIncrement,
  onDecrement,
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: systemColor(UIColor.systemGray6, colorScheme) },
      ]}
    >
      <Animated.View style={styles.button}>
        <Button onPress={() => onDecrement} title='-' />
      </Animated.View>
      <View
        style={[
          styles.divider,
          { borderRightColor: systemColor(UIColor.systemGray4, colorScheme) },
        ]}
      />
      <Animated.View style={styles.button}>
        <Button onPress={() => onIncrement} title='+' />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
  button: {
    width: '50%',
  },
});
