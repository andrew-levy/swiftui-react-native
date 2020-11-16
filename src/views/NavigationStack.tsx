import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

type Screen = {
	name: string;
	component: React.FC;
	options?: object | undefined;
};

type NavigationStackProps = {
	views: Array<Screen>;
};

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
export default NavigationStack;
