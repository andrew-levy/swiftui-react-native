import React from 'react';
import { NavigationViewProps } from './NavigationView';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

type NavigationViewManagerProps = {
  children:
    | React.ReactElement<NavigationViewProps>
    | Array<React.ReactElement<NavigationViewProps>>;
};

export const NavigationViewManager = ({
  children,
}: NavigationViewManagerProps) => {
  return (
    <Stack.Navigator>
      {React.Children.map(children, (child) => (
        <Stack.Screen
          name={child.props.name}
          component={child.props.view}
          options={child.props.options}
        />
      ))}
    </Stack.Navigator>
  );
};
