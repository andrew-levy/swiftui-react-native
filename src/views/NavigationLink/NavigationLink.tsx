import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../Button';
import { Text } from '../Text';
import { TouchableOpacity } from 'react-native';
import { RightChevron } from './RightChevron';

type NavigationLinkProps = {
  navigation: StackNavigationProp<any, any>;
  destination: string;
  distinationProps?: object;
  text?: string;
  listItem?: boolean;
  children?: React.ReactElement<any>;
};

export const NavigationLink = ({
  navigation,
  destination,
  distinationProps,
  children,
  text,
  listItem,
}: NavigationLinkProps) => {
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
        {text ? <Text>{text}</Text> : children}
        <RightChevron />
      </TouchableOpacity>
    );
  }
  return (
    <Button
      text={text}
      action={() => navigation.navigate(destination, distinationProps)}
    >
      {children}
    </Button>
  );
};
