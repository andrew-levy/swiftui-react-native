import React from 'react';
import { View } from 'react-native';
import { Button, HStack, useBinding } from 'swiftui-react-native';

export const SheetSection = () => {
  const isSheetPresented = useBinding(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <HStack
      // sheet={{
      //   isPresented: isSheetPresented,
      //   content: (
      //     <VStack
      //       style={{
      //         padding: 40,
      //       }}
      //     >
      //       <Text font="largeTitle" bold>
      //         Pro Version
      //       </Text>
      //       <HStack>
      //         <Image systemName="1.circle" font="largeTitle" />
      //         <Text>
      //           Unlock all features. Lorem ipsum dolor sit amet, consectetur
      //           adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      //           dolore magna aliqua. Ut enim ad minim veniam,
      //         </Text>
      //       </HStack>
      //       <HStack>
      //         <Image systemName="2.circle" font="largeTitle" />
      //         <Text>
      //           Unlock all features. Lorem ipsum dolor sit amet, consectetur
      //           adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      //           dolore magna aliqua. Ut enim ad minim veniam,
      //         </Text>
      //       </HStack>
      //       <HStack>
      //         <Image systemName="3.circle" font="largeTitle" />
      //         <Text>
      //           Unlock all features. Lorem ipsum dolor sit amet, consectetur
      //           adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      //           dolore magna aliqua. Ut enim ad minim veniam,
      //         </Text>
      //       </HStack>
      //       <Button
      //         title="Close"
      //         buttonStyle="borderedProminent"
      //         action={() => isSheetPresented.setValue(false)}
      //         style={{ width: 100 }}
      //       />
      //     </VStack>
      //   ),
      // }}
      >
        <Button
          title="Show Sheet"
          action={() => isSheetPresented.setValue(true)}
        />
      </HStack>
    </View>
  );
};
