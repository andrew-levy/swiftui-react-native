import React from 'react';
import {
  Button,
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
          <Text font="body" foregroundColor="systemBlue">
            {Math.round(sliderValue.value).toString()}
          </Text>
        </HStack>
        <Button
          title="Random"
          action={() => sliderValue.setValue(Math.random() * 20)}
        />
        <Slider
          value={sliderValue}
          onChange={console.log}
          range={[0, 20]}
          step={5}
        />
      </VStack>
      <Spacer />
      <VStack>
        <HStack>
          <Text font="body">Stepper</Text>
          <Spacer />
          <Text font="body" foregroundStyle="systemBlue">
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
          <Text foregroundStyle="systemBlue" font="body">
            {toggleValue.value ? 'On' : 'Off'}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Toggle isOn={toggleValue} tint="systemBlue" />
        </VStack>
      </VStack>
      <Spacer />
    </VStack>
  );
};
