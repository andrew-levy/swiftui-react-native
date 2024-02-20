import React from 'react';
import { View } from 'react-native';
import { Button, HStack, Text, VStack, useBinding } from 'swiftui-react-native';

export const SheetSection = () => {
  const isSheetPresented = useBinding(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <HStack
        sheet={{
          isPresented: isSheetPresented,
          content: (
            <VStack
              presentationDetents={['medium', 'large', { fraction: 0.12 }]}
              presentationCornerRadius={40}
            >
              <Text>Sheet Content</Text>
              <Button
                title="Close"
                action={() => isSheetPresented.setValue(false)}
              />
            </VStack>
          ),
        }}
      >
        <Button
          title="Show Sheet"
          action={() => isSheetPresented.setValue(true)}
        />
      </HStack>
    </View>
  );
};
