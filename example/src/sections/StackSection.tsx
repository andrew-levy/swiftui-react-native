import React from 'react';
import { View } from 'react-native';
import {
  Button,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  ZStack,
  useBinding,
} from 'swiftui-react-native';

export const StackSection = () => {
  const isSheetPresented = useBinding(false);
  return (
    <View style={{ flex: 1 }}>
      <HStack
        sheet={{
          isPresented: isSheetPresented,
          content: (
            <VStack>
              <Text>Sheet Content</Text>
              <Button
                title="Close"
                action={() => isSheetPresented.setValue(false)}
              />
            </VStack>
          ),
        }}
      >
        <Text>HStack</Text>
        <Spacer />
        <Button
          title="Show Sheet"
          action={() => isSheetPresented.setValue(true)}
        />
        <Spacer />
        <Text>HStack</Text>
      </HStack>
      <VStack
        style={{
          marginTop: 100,
          height: 200,
        }}
        padding={10}
        border={{ width: 1, color: 'systemGray4' }}
      >
        <Text>VStack</Text>
        <Spacer />
        <Text>VStack</Text>
        <Text>VStack</Text>
      </VStack>
      <ZStack
        style={{ marginTop: 100 }}
        padding={10}
        border={{ width: 1, color: 'systemGray4' }}
        scaleEffect={2}
      >
        <Image
          systemName="circle.fill"
          imageScale="large"
          foregroundStyle="systemPurple"
        />
        <Text>ZStack</Text>
      </ZStack>
    </View>
  );
};
