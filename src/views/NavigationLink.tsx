import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from './Button';
import { Text } from './Text';
import { Image } from './Image';
import styled from 'styled-components';

type NavigationLinkProps = {
  navigation: StackNavigationProp<any, any>;
  destination: string;
  distinationProps?: object;
  text?: string;
  listItem?: boolean;
  children?: React.ReactElement<any>;
};

const StyledListItemNavLink = styled.TouchableOpacity`
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

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
      <StyledListItemNavLink
        onPress={() => navigation.navigate(destination, distinationProps)}
      >
        {text ? <Text>{text}</Text> : children}
        <Image name='' />
      </StyledListItemNavLink>
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

/* PROPS:
 * extends button props
 */
