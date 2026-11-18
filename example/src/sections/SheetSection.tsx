import React from 'react';
import { View } from 'react-native';
import { Button, HStack, useBinding } from 'swiftui-react-native';

export const SheetSection = () => {
  const isSheetPresented = useBinding(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <HStack
      >
        <Button
          title="Show Sheet"
          action={() => isSheetPresented.setValue(true)}
        />
      </HStack>
    </View>
  );
};
