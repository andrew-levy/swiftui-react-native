import React from 'react';
import {
  NavigationViewManager,
  NavigationView,
  NavigationLink,
} from 'swiftui-react-native/navigation';
import { VStack, Text } from 'swiftui-react-native';

// This is the root of our app with navigation enabled
const App = () => {
  <NavigationViewManager>
    <NavigationViewManager>
      <NavigationView name='Home' component={Home} />
      <NavigationView name='Details' component={Details} />
    </NavigationViewManager>
  </NavigationViewManager>;
};

// The Details View we want to navigate to
const Details = ({ name }) => (
  <VStack>
    <Text>Details for {name}</Text>
  </VStack>
);

// The Home View we want to navigate from
// Be sure to accept navigation as a prop to this component and pass it down to the navigation link
const Home = ({ navigation }) => {
  return (
    <VStack>
      <NavigationLink
        destination='Details'
        destinationProps={{ name: 'Joe' }}
        navigation={navigation}
      >
        <Text>Details Page</Text>
      </NavigationLink>
    </VStack>
  );
};
