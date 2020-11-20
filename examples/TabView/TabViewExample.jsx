import React from 'react';
import { NavigationView, TabView, VStack, Text } from 'react-native-swiftui';

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
      <TabView
        tabs={[
          { name: 'Home', component: Home },
          { name: 'Profile', component: Profile },
        ]}
      />
    </NavigationView>
  );
};
