import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

type Screen = {
  name: string;
  component: React.FC;
  options?: object;
};

type NavigationStackProps = {
  views: Array<Screen>;
};

// Add stack item component
export const NavigationStack: React.FC<NavigationStackProps> = ({ views }) => {
  return (
    <Stack.Navigator>
      {views.map((view) => (
        <Stack.Screen
          name={view.name}
          component={view.component}
          options={view.options}
        />
      ))}
    </Stack.Navigator>
  );
};
