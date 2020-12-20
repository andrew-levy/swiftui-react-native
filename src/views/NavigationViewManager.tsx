import React, { createContext } from 'react';
import { NavigationViewProps } from './NavigationView';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { VStack } from './VStack';
import { Text } from './Text';
import { UIColor } from '../themes/colors';

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

  const inlineStyle = {
    // TODO
  };
  const animatedInlineStyle = {
    shadowOpacity: scrollValue.interpolate({
      inputRange: [40, 49.99, 50],
      outputRange: [0, 0.5, 1],
    }),
  };
  const largeStyle = {
    shadowColor: 'transparent',
  };

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
                                return (
                                  <Text fontWeight='bold'>
                                    {title || child.props.name}
                                  </Text>
                                );
                              case 'animated-inline':
                                return (
                                  <Animated.Text
                                    style={{
                                      // ...titleStyles,
                                      fontWeight: '600',
                                      fontSize: 16,
                                      opacity: scrollValue.interpolate({
                                        inputRange: [57, 59.99, 60],
                                        outputRange: [0, 0.5, 1],
                                      }),
                                    }}
                                  >
                                    {title || child.props.name}
                                  </Animated.Text>
                                );
                              case 'large':
                                return (
                                  <VStack
                                    background={UIColor.white}
                                    alignment='leading'
                                  >
                                    <Text
                                      alignment='leading'
                                      fontWeight='bold'
                                      fontSize={26}
                                    >
                                      {title || child.props.name}
                                    </Text>
                                  </VStack>
                                );
                              default:
                                return <Text>{title}</Text>;
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

// const forHeaderAnimation: StackHeaderStyleInterpolator = (props) => {
// const backgrounColor = scrollValue.interpolate({
//   inputRange: [0, 10],
//   outputRange: ['transparent', UIColor.systemGray3],
// });

//   return {
//     leftButtonStyle: {},
//     rightButtonStyle: {},
//     titleStyle: {},
//     backgroundStyle: { backgrounColor },
//   };
// };

// useCode(() => {
//   return call([scrollValue], (scrollValue) => {
//     console.log(scrollValue);
//   });
// }, [scrollValue]);
