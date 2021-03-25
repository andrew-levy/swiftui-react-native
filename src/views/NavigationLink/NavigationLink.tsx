import React from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { TouchableOpacity, Text, Button } from 'react-native';
import { RightChevron } from './RightChevron';
import { systemColor, UIColor } from '../../utils/colors';

type NavigationLinkProps = {
  navigation: NativeStackNavigationProp<any, any>;
  destination: string;
  distinationProps?: object;
  text?: string;
  listItem?: boolean;
  foregroundColor?: string;
  children?: React.ReactElement<any>;
};

export const NavigationLink = ({
  navigation,
  destination,
  distinationProps,
  children,
  text,
  foregroundColor,
  listItem,
}: NavigationLinkProps) => {
  const defaultForegroundColor = listItem
    ? systemColor(UIColor.black, 'light')
    : systemColor(UIColor.systemBlue, 'light');
  if (listItem) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(destination, distinationProps)}
        style={{
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {text ? (
          <Text
            style={{
              color: foregroundColor || defaultForegroundColor,
              fontSize: 18,
            }}
          >
            {text || destination}
          </Text>
        ) : (
          children
        )}
        <RightChevron />
      </TouchableOpacity>
    );
  }
  return (
    <Button
      title={text || destination}
      onPress={() => navigation.navigate(destination, distinationProps)}
      color={foregroundColor || defaultForegroundColor}
    >
      {children}
    </Button>
  );
};
