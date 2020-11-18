import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

type ListProps = {
  children: React.ReactElement<any>;
  listStyle?: 'grouped' | 'plain' | 'default' | 'inset';
};

const StyledListItem = styled.View`
  background-color: white;
  padding-top: 10;
  padding-bottom: 10;
  text-align: left;
`;

const StyledListWrapper = styled.View`
  background-color: white;
  width: 100%;
`;

export const List = ({ listStyle, children }: ListProps) => {
  const listChildren = [];
  React.Children.forEach(children, (child) => {
    console.log(child);
    listChildren.push(child);
  });
  return (
    <StyledListWrapper>
      <FlatList
        data={listChildren}
        renderItem={({ item, index }) => (
          <StyledListItem>
            {React.cloneElement(item, item.props)}
            {/* divider line ? */}
            {index !== listChildren.length - 1 ? <View></View> : null}
          </StyledListItem>
        )}
      />
    </StyledListWrapper>
  );
};

/* PROPS:
 * list style : grouped, plain, default, inset
 * + any overrides:
 * background
 * padding
 * margin
 * border
 * zindex
 * hidden
 */
