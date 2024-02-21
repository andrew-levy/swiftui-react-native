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
      <VStack style={{ height: 200 }}>
        <ColorPicker
          label="Select a color"
          selection={color}
          style={{
            width: 350,
          }}
        />
        <Spacer />
        <Group padding={10} tint={color.value}>
          <Toggle isOn />
          <Slider value={10} />
        </Group>
      </VStack>
    </View>
  );
};
