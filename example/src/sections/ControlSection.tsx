import React from 'react';
import {
  Button,
  HStack,
  List,
  Slider,
  Stepper,
  Text,
  Toggle,
  VStack,
  useBinding,
  useEnvironment,
} from 'swiftui-react-native';

export const ControlSection = () => {
  const { colorScheme, setValues } = useEnvironment();
  const sliderValue = useBinding(0);
  const stepperValue = useBinding(0);
  const toggleValue = useBinding(colorScheme === 'dark');
  return (
    <List style={{ flex: 1 }}>
      {/* <List.Section header="Controls"> */}
      <VStack>
        <HStack>
          <Text font="body">Slider</Text>
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
      <VStack>
        <HStack>
          <Text font="body">Stepper</Text>
          {/* <Spacer /> */}
          <Text font="body" foregroundColor="systemBlue">
            {stepperValue.value.toString()}
          </Text>
        </HStack>
        <Stepper value={stepperValue} range={[0, 10]} onChange={console.log} />
      </VStack>
      <VStack>
        <HStack>
          <Text font="body">Toggle</Text>
          {/* <Spacer /> */}
          <Text foregroundColor="systemBlue" font="body">
            {toggleValue.value ? 'On' : 'Off'}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Toggle
            isOn={toggleValue}
            modifiers={{
              tint: 'systemBlue',
            }}
            onChange={() =>
              setValues({ colorScheme: toggleValue.value ? 'light' : 'dark' })
            }
          />
        </VStack>
      </VStack>
      {/* </List.Section> */}
    </List>
  );
};
