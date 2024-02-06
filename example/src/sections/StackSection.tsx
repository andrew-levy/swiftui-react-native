import React from "react";
import {
  HStack,
  Image,
  List,
  Spacer,
  Text,
  VStack,
  ZStack,
} from "swiftui-react-native";

export const StackSection = () => {
  return (
    <List inset header="Stacks">
      <HStack>
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
        <Spacer />
        <Text>HStack</Text>
      </HStack>
      <VStack>
        <Text>VStack</Text>
        <Text>VStack</Text>
        <Text>VStack</Text>
      </VStack>
      <ZStack frame={{ width: 100, height: 100 }}>
        <Image systemName="circle.fill" fontSize={100} />
        <Image
          systemName="circle.fill"
          foregroundColor="systemTeal"
          fontSize={50}
        />
        <Text foregroundColor="white" bold>
          ZStack
        </Text>
      </ZStack>
    </List>
  );
};
