import React from 'react';
import { NavigationViewManager, NavigationView } from 'swiftui-react-native';
import Home from './Home';
import Details from './Details';

const App = () => {
  <NavigationViewManager>
    <NavigationViewManager>
      <NavigationView name='Home' component={Home} />
      <NavigationView name='Details' component={Details} />
    </NavigationViewManager>
  </NavigationViewManager>;
};
