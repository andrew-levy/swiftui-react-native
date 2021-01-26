import React from 'react';
import { Button, View } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { UIColor } from '../../themes/colors';

type StepperProps = {
  onIncrement: () => void;
  onDecrement: () => void;
};

const StepperWrapper = styled.View`
  background-color: ${UIColor.systemGray6};
  border-radius: 6px;
  flex-direction: row;
  padding: 3px;
  width: 100px;
`;

// TODO: use tap gesture handler to animate buttons
export const Stepper: React.FC<StepperProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <StepperWrapper>
      <Animated.View style={{ width: '50%' }}>
        <Button onPress={() => onDecrement} title='-' />
      </Animated.View>
      <View
        style={{
          top: 5,
          height: 15,
          borderRightWidth: 1,
          width: 0,
          borderRightColor: UIColor.systemGray4,
        }}
      />
      <Animated.View style={{ width: '50%' }}>
        <Button onPress={() => onIncrement} title='+' />
      </Animated.View>
    </StepperWrapper>
  );
};
