import React, { createContext } from 'react';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';

type ListProps = {
  children: React.ReactElement<any>;
  listStyle?: 'insetGrouped' | 'grouped';
};

const insetGroupedListStyleItem = ({ index, total }) => `
  background-color: white;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 15px;
  padding-right: 15px;
  border-top-right-radius: ${index === 0 ? '10px' : '0px'};
  border-bottom-right-radius: ${index === total ? '10px' : '0px'};
  border-bottom-color: ${UIColor.systemGray6};
`;

const insetGroupedListStyleWrapper = `
  background-color: white;
  width: 90%;
  border-radius: 10px;
`;

const defaultListStyleItem = (props) => `
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  border-bottom-color: ${UIColor.systemGray6};
  margin-left: 15px;
  padding-right: 15px;
`;

const defaultListStyleWrapper = `
  background-color: white;
  width: 100%;
`;

const StyledListItem = styled.View`
  ${(props) =>
    props.listStyle === 'insetGrouped'
      ? insetGroupedListStyleItem(props)
      : defaultListStyleItem(props)}
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
    <StyledListWrapper listStyle={listStyle}>
      {React.Children.map(children, (child, i) => {
        return (
          <StyledListItem
            key={i}
            index={i}
            total={React.Children.toArray(children).length - 1}
            last={
              listStyle === 'insetGrouped' &&
              i === React.Children.toArray(children).length - 1
            }
            listStyle={listStyle}
            aligment={child.props.aligment}
          >
            {React.cloneElement(child, {
              ...child.props,
              listItem: true,
            })}
          </StyledListItem>
        );
      })}
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
