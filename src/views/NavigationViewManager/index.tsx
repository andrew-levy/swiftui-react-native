import React, { createContext } from 'react';
import { NavigationViewProps } from '../NavigationView';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { useNavigationHeaders } from './useNavigationHeaders';

const Stack = createStackNavigator();
export const HeaderScrollContext = createContext(null);

type NavigationViewManagerProps = {
  children:
    | React.ReactElement<NavigationViewProps>
    | Array<React.ReactElement<NavigationViewProps>>;
};

export const NavigationViewManager = ({
  children,
}: NavigationViewManagerProps) => {
  const scrollValue = new Animated.Value(0);

  const {
    Inline,
    AnimatedInline,
    Large,
    AnimatedLarge,
    Default,
    animatedInlineStyle,
    inlineStyle,
    largeStyle,
    animatedLargeStyle,
  } = useNavigationHeaders(scrollValue);

  return (
    <HeaderScrollContext.Provider value={scrollValue}>
      <Stack.Navigator>
        {React.Children.map(children, (child) => {
          return (
            <Stack.Screen
              name={child.props.name}
              component={child.props.view}
              options={() => {
                if (!child.props.navigationBar) return null;
                const {
                  displayMode,
                  disabled,
                  title,
                  trailing,
                  leading,
                  backgroundStyle,
                  foregroundColor,
                  // titleStyle,
                } = child.props.navigationBar;
                return (
                  child.props.navigationBar && {
                    ...(disabled && {
                      header: () => null,
                    }),
                    ...(foregroundColor && {
                      headerTintColor: foregroundColor,
                    }),
                    ...{
                      headerTitle: !displayMode
                        ? title || child.props.name
                        : () => {
                            switch (displayMode) {
                              case 'inline':
                                return Inline(title, child);
                              case 'animated-inline':
                                return AnimatedInline(title, child);
                              case 'large':
                                return Large(title, child);
                              case 'animated-large':
                                return AnimatedLarge(title, child);
                              default:
                                return Default(title, child);
                            }
                          },
                    },
                    ...(leading && {
                      headerLeft: leading,
                    }),
                    ...(trailing && {
                      headerRight: trailing,
                    }),

                    headerStyle:
                      {
                        ...backgroundStyle,
                        ...(displayMode === 'inline' && inlineStyle),
                        ...(displayMode === 'animated-inline' &&
                          animatedInlineStyle),
                        ...(displayMode === 'large' && largeStyle),
                        ...(displayMode === 'animated-large' &&
                          animatedLargeStyle),
                      } || null,
                  }
                );
              }}
            />
          );
        })}
      </Stack.Navigator>
    </HeaderScrollContext.Provider>
  );
};
