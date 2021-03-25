import React from 'react';
import { NavigationViewProps } from '../NavigationView';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { NavigationBar } from '../../navigation';
import { systemColor } from '../../utils/colors';

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
    background,
    foregroundColor,
    hideShadow,
    presentation,
    colorScheme = 'light',
    ...rest
  }: NavigationBar = child.props.navigationBar;
  return (
    child.props.navigationBar &&
    ({
      ...(disabled && {
        headerShown: false,
      }),
      ...(leading && {
        headerLeft: leading,
      }),
      ...(trailing && {
        headerRight: trailing,
      }),
      ...(foregroundColor && {
        headerTintColor: systemColor(foregroundColor, colorScheme),
      }),
      ...(background && {
        headerStyle: { backgroundColor: systemColor(background, colorScheme) },
      }),
      ...(displayMode && {
        headerLargeTitle: displayMode === 'large',
      }),
      ...(hideShadow && displayMode === 'large'
        ? {
            headerLargeTitleHideShadow: hideShadow,
          }
        : { headerHideShadow: hideShadow }),
      ...(presentation && {
        stackPresentation: presentation,
      }),
      ...rest,
    } as NativeStackNavigationOptions)
  );
};
