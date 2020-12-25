import React, { createContext, useState } from 'react';
import { NavigationViewProps } from './NavigationView';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated, Dimensions } from 'react-native';
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
  const wWidth = Dimensions.get('window').width;
  const [textWidth, setTextWidth] = useState(0);

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
  const animatedLargeStyle = {
    shadowOpacity: scrollValue.interpolate({
      inputRange: [40, 49.99, 50],
      outputRange: [0, 0.5, 1],
    }),
  };

  const AnimatedLarge = (title, child) => (
    <Animated.Text
      onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
      style={{
        // ...titleStyles,
        fontWeight: '600',
        fontSize: 16,
        transform: [
          {
            scale: scrollValue.interpolate({
              inputRange: [-10, 0, 50],
              outputRange: [1.65, 1.6, 1],
              extrapolate: 'clamp',
            }),
          },
          {
            translateX: scrollValue.interpolate({
              inputRange: [0, 50],
              outputRange: [
                title
                  ? -wWidth / 3 + textWidth / 2 + 20
                  : -wWidth / 3 + textWidth / 2 + 20,
                0,
              ],
              extrapolate: 'clamp',
            }),
          },
          {
            translateY: scrollValue.interpolate({
              inputRange: [0, 50],
              outputRange: [30, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      {title || child.props.name}
    </Animated.Text>
  );

  const Large = (title, child) => (
    <VStack background={UIColor.white} alignment='leading'>
      <Text alignment='leading' fontWeight='bold' fontSize={26}>
        {title || child.props.name}
      </Text>
    </VStack>
  );

  const AnimatedInline = (title, child) => (
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

  const Inline = (title, child) => (
    <Text fontWeight='bold'>{title || child.props.name}</Text>
  );

  const Default = (title, child) => <Text>{title || child.props.name}</Text>;

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
