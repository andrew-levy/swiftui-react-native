import React from 'react';
import styled from 'styled-components';
import { Colors } from '../themes/colors';
import { Fonts } from '../themes/fonts';

type ListProps = {
  children: React.ReactElement<any>;
  listStyle?: 'grouped' | 'plain' | 'default' | 'inset';
};

const groupedListStyleItem = `
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  border-bottom-color: ${Colors.foreground.systemGrey6};
  margin-left: 15px;
  margin-right: 15px;
`;

const groupedListStyleWrapper = `
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
  margin-right: 15px;
  align-items: ${({ alignment }) => alignment || 'left'}
`;

const defaultListStyleWrapper = `
  background-color: white;
  width: 100%;
`;

const StyledListItem = styled.View`
  ${({ listStyle }) =>
    listStyle === 'grouped' ? groupedListStyleItem : defaultListStyleItem}
  border-bottom-width: ${({ last }) => (last ? '0' : '1')}px;
`;

const StyledListWrapper = styled.View`
  ${({ listStyle }) =>
    listStyle === 'grouped' ? groupedListStyleWrapper : defaultListStyleWrapper}
`;

export const List = ({ listStyle, children }: ListProps) => (
  <StyledListWrapper listStyle={listStyle}>
    {React.Children.map(children, (child, i) => (
      <StyledListItem
        last={i === React.Children.toArray(children).length - 1}
        listStyle={listStyle}
        aligment={child.props.aligment}
      >
        {child}
      </StyledListItem>
    ))}
  </StyledListWrapper>
);

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
