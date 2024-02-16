import React from 'react';
import { View } from 'react-native';
import {
  ColorPicker,
  Group,
  Slider,
  Spacer,
  Toggle,
  VStack,
  useBinding,
} from 'swiftui-react-native';

export const GroupSection = () => {
  const color = useBinding('#000000');
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <VStack>
        <ColorPicker selection={color} />
        <Spacer />
        <Spacer />
        <Spacer />
        <Group
          modifiers={{
            padding: 10,
            border: { width: 1, color: 'systemGray4' },
            tint: color.value,
          }}
        >
          <Toggle isOn />
          <Slider value={10} />
        </Group>
      </VStack>
    </View>
  );
};
