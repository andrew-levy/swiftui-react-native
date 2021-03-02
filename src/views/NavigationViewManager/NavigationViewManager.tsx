import React from 'react';
import { NavigationViewProps } from '../NavigationView';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { NavigationBar } from '../../navigation';

enableScreens();
const Stack = createNativeStackNavigator();

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
      {React.Children.map(children, (child) => {
        return (
          <Stack.Screen
            name={child.props.name}
            component={child.props.view}
            options={getHeaderOptions(child)}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const getHeaderOptions = (child: React.ReactElement<NavigationViewProps>) => {
  if (!child.props.navigationBar) return null;
  const {
    displayMode,
    disabled,
    title,
    trailing,
    leading,
    backgroundColor,
    foregroundColor,
    hideShadow,
    ...rest
  }: NavigationBar = child.props.navigationBar;
  return (
    child.props.navigationBar &&
    ({
      ...(disabled && {
        headerShown: false,
      }),
      ...(foregroundColor && {
        headerTintColor: foregroundColor,
      }),
      ...(leading && {
        headerLeft: leading,
      }),
      ...(trailing && {
        headerRight: trailing,
      }),
      ...(displayMode && {
        headerLargeTitle: displayMode === 'large',
      }),
      ...(backgroundColor && {
        headerStyle: { backgroundColor: 'white' },
      }),
      ...(hideShadow && {
        headerLargeTitleHideShadow: true,
      }),
      ...rest,
    } as NativeStackNavigationOptions)
  );
};
