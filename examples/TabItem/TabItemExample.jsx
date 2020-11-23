import React from 'react';
import {
  NavigationView,
  TabView,
  TabItem,
  VStack,
  Text,
} from 'swiftui-react-native';

const Home = () => (
  <VStack>
    <Text>Home</Text>
  </VStack>
);
const Profile = () => (
  <VStack>
    <Text>Profile</Text>
  </VStack>
);

export const TabViewExample = () => {
  return (
    <NavigationView>
      <TabView>
        <TabItem name='Home' component={Home} />
        <TabItem name='Profile' component={Profile} />
      </TabView>
    </NavigationView>
  );
};
