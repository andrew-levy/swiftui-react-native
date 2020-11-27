import React, { createContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';

type ListProps = {
  children: React.ReactElement<any>;
  listStyle?: 'insetGrouped' | 'plain' | 'default' | 'inset' | 'grouped';
};

const insetGroupedListStyleItem = `
  background-color: white;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  border-bottom-color: ${Colors.foreground.systemGrey6};
`;

const insetGroupedListStyleWrapper = `
  background-color: white;
  width: 90%;
  border-radius: 10px;
`;

const defaultListStyleItem = `
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  border-bottom-color: ${Colors.foreground.systemGrey6};
  margin-left: 15px;
  padding-right: 15px;
  align-items: ${({ alignment }) => alignment || 'left'}
`;

const defaultListStyleWrapper = `
  background-color: white;
  width: 100%;
`;

const StyledListItem = styled.View`
  ${({ listStyle }) =>
    listStyle === 'insetGrouped'
      ? insetGroupedListStyleItem
      : defaultListStyleItem}
  border-bottom-width: ${({ last }) => (last ? '0' : '1')}px;
`;

const StyledListWrapper = styled.View`
  ${({ listStyle }) =>
    listStyle === 'insetGrouped'
      ? insetGroupedListStyleWrapper
      : defaultListStyleWrapper}
`;

export const ListItemContext = createContext(null);

export const List = ({ listStyle, children }: ListProps) => {
  return (
    <ListItemContext.Provider value={true}>
      <StyledListWrapper listStyle={listStyle}>
        {React.Children.map(children, (child, i) => {
          return (
            <StyledListItem
              last={i === React.Children.toArray(children).length - 1}
              listStyle={listStyle}
              aligment={child.props.aligment}
            >
              {child}
            </StyledListItem>
          );
        })}
      </StyledListWrapper>
    </ListItemContext.Provider>
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
