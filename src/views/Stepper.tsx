import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';

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

const StepperButton = styled.Button`
  color: ${UIColor.black};
  justify-content: center;
`;

// TODO: use tap gesture handler to animate buttons
export const Stepper: React.FC<StepperProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <StepperWrapper>
      <StepperButton onPress={() => onIncrement} title='+' />
      <View
        style={{
          top: 5,
          height: 15,
          borderRightWidth: 1,
          width: 0,
          borderRightColor: UIColor.systemGray4,
        }}
      />
      <StepperButton onPress={() => onDecrement} title='-' />
    </StepperWrapper>
  );
};
