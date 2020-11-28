import React from 'react';
import {
  NavigationViewManager,
  NavigationView,
  NavigationLink,
  VStack,
  Text,
} from 'swiftui-react-native';

// This defines which views can navigate to which other views. All NavigationViews inside of a NavigationViewManager have the ability to navigate to eachother.
const Views = () => {
  <NavigationViewManager>
    <NavigationView name='Home' component={Home} />
    <NavigationView name='Details' component={Details} />
  </NavigationViewManager>;
};

// The Details View we want to navigate to
const Details = ({ name }) => (
  <VStack>
    <Text>Details for {name}</Text>
  </VStack>
);

// The Home View we want to navigate from
const Home = () => {
  return (
    <VStack>
      <NavigationLink destination='Details' destinationProps={{ name: 'Joe' }}>
        <Text>Details Page</Text>
      </NavigationLink>
    </VStack>
  );
};
