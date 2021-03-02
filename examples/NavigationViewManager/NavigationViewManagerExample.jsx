import React from 'react';
import {
  NavigationViewManager,
  NavigationView,
} from 'swiftui-react-native/navigation';
import { VStack, Text } from 'swiftui-react-native';
import { isLoggedIn } from 'somewhere';

// ROOT:

// Depending on the state of your application, like if a user is logged in, you can dynamically show the user different NavigationViewManagers.
// In this example, if the user is logged in, we will show the Home View Manager, which manages all of the views associated with being authenticated.
const App = () => {
  <NavigationViewManager>
    {isLoggedIn ? <HomeViewManager /> : <AuthViewManager />}
  </NavigationViewManager>;
};

// MANAGERS:

// Manages all of the views associated with not being authenticated.
const AuthViewManager = () => {
  return (
    <NavigationViewManager>
      <NavigationView name='Home' component={Home} />
      <NavigationView name='Details' component={Details} />
    </NavigationViewManager>
  );
};

// Manages all of the views associated with being authenticated.
const HomeViewManager = () => {
  return (
    <NavigationViewManager>
      <NavigationView name='Login' component={Login} />
    </NavigationViewManager>
  );
};

// VIEWS/SCREENS:

// Home View
const Home = () => (
  <VStack>
    <Text>Welcome!</Text>
  </VStack>
);

// Details View
const Details = () => (
  <VStack>
    <Text>Some Details!</Text>
  </VStack>
);

// Login View
const Login = () => (
  <VStack>
    <Text>Login!</Text>
  </VStack>
);
