import React from 'react';
import { VStack, Text, BottomSheet } from 'swiftui-react-native';

export const BottomSheetExample = () => {
  const sheetContent = <Text>This is some content</Text>;
  return (
    <VStack frame={{ maxHeight: 'infinity' }}>
      <BottomSheet
        header='View More'
        content={sheetContent}
        snapPoints={['full', 'half']}
      />
    </VStack>
  );
};
