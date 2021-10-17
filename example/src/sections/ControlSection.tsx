import React, { useEffect } from 'react';
import {
  VStack,
  HStack,
  List,
  ListRow,
  Slider,
  Spacer,
  Stepper,
  Text,
  Toggle,
  useBinding,
  useUIColor,
  useColorScheme,
} from 'swiftui-react-native';

export const ControlSection = () => {
  const UIColor = useUIColor();
  const { colorScheme, setColorScheme } = useColorScheme();
  const sliderValue = useBinding(0);
  const stepperValue = useBinding(0);
  const toggleValue = useBinding(colorScheme === 'dark');
  useEffect(() => {
    setColorScheme(toggleValue.value ? 'dark' : 'light');
  }, [toggleValue, setColorScheme]);

  return (
    <List inset header='Controls'>
      <ListRow>
        <HStack>
          <Text font='body'>Slider</Text>
          <Spacer />
          <Text font='body' foregroundColor={UIColor.systemBlue}>
            {sliderValue.value}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Slider
            accentColor={UIColor.systemBlue}
            value={sliderValue}
            step={2}
            updateOnSlide={true}
          />
        </VStack>
      </ListRow>
      <ListRow>
        <HStack>
          <Text font='body'>Stepper</Text>
          <Spacer />
          <Text font='body' foregroundColor={UIColor.systemBlue}>
            {stepperValue.value}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Stepper
            value={stepperValue}
            range={[0, 10]}
            backgroundColor={UIColor.systemGray5}
            onChange={console.log}
          />
        </VStack>
      </ListRow>
      <ListRow>
        <HStack>
          <Text font='body'>Toggle</Text>
          <Spacer />
          <Text foregroundColor={UIColor.systemBlue} font='body'>
            {toggleValue.value ? 'On' : 'Off'}
          </Text>
        </HStack>
        <VStack padding={10}>
          <Toggle isOn={toggleValue} />
        </VStack>
      </ListRow>
    </List>
  );
};
