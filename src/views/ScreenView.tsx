import React from 'react';
import { ScreenProps } from './Screen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

type NavigationStackProps = {
  children:
    | React.ReactElement<ScreenProps>
    | Array<React.ReactElement<ScreenProps>>;
};

export const ScreenView = ({ children }: NavigationStackProps) => {
  return (
    <Stack.Navigator>
      {React.Children.map(children, (child) => (
        <Stack.Screen
          name={child.props.name}
          component={child.props.component}
          options={child.props.options}
        />
      ))}
    </Stack.Navigator>
  );
};
