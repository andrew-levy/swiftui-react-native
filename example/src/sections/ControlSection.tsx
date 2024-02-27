import React from 'react';
import {
  HStack,
  Slider,
  Spacer,
  Stepper,
  Text,
  Toggle,
  VStack,
  useBinding,
} from 'swiftui-react-native';

export const ControlSection = () => {
  const sliderValue = useBinding(0);
  const stepperValue = useBinding(0);
  const toggleValue = useBinding(true);

  return (
    <VStack style={{ height: '100%' }}>
      <Spacer />
      <VStack>
        <HStack>
          <Text font="body">Slider</Text>
          <Spacer />
          <Text font="body" foregroundStyle="blue">
            {Math.round(sliderValue.value).toString()}
          </Text>
        </HStack>
        <Slider value={sliderValue} onChange={console.log} range={[0, 1000]} />
      </VStack>
      <Spacer />
      <VStack>
        <HStack>
          <Text font="body">Stepper</Text>
          <Spacer />
          <Text font="body" foregroundStyle="blue">
            {stepperValue.value.toString()}
          </Text>
        </HStack>
        <Stepper value={stepperValue} range={[0, 10]} onChange={console.log} />
      </VStack>
      <Spacer />
      <VStack>
        <HStack>
          <Text font="body">Toggle</Text>
          <Spacer />
          <Text foregroundStyle="blue" font="body">
            {toggleValue.value ? 'On' : 'Off'}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Toggle padding={40} isOn={toggleValue} />
        </VStack>
      </VStack>
      <Spacer />
    </VStack>
  );
};
