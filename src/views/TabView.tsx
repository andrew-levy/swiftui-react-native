import React from 'react';
import { TabItemProps } from './TabItem';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

type TabViewProps = {
  options?: object;
  children:
    | React.ReactElement<TabItemProps>
    | Array<React.ReactElement<TabItemProps>>;
};

export const TabView = ({ options, children }: TabViewProps) => {
  return (
    <Tabs.Navigator screenOptions={options}>
      {React.Children.map(children, (child) => (
        <Tabs.Screen
          name={child.props.name}
          component={child.props.component}
          options={child.props.options}
        />
      ))}
    </Tabs.Navigator>
  );
};

{
  /* <Tabs.Navigator screenOptions={options}>
{tabs.map((tab) => (
	<Tabs.Screen
		name={tab.name}
		component={tab.component}
		options={tab.options}
	/>
))}
</Tabs.Navigator> */
}
