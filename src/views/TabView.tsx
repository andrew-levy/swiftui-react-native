import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

type Screen = {
  name: string;
  component: React.FC;
  options?: object | undefined;
};

type TabViewProps = {
  tabs: Array<Screen>;
  options?: object;
};

export const TabView: React.FC<TabViewProps> = ({ options, tabs }) => {
  return (
    <Tabs.Navigator screenOptions={options}>
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          component={tab.component}
          options={tab.options}
        />
      ))}
    </Tabs.Navigator>
  );
};
