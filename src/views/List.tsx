import React from 'react';
import styled from 'styled-components';
import { UIColor } from '../themes/colors';

type ListProps = {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
  listStyle?: 'insetGrouped' | 'grouped';
};

const insetGroupedListStyleItem = ({ index, total }) => `
  background-color: white;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 20px;
  padding-right: 15px;
  border-top-right-radius: ${index === 0 ? '10px' : '0px'};
  border-bottom-right-radius: ${index === total ? '10px' : '0px'};
  border-bottom-color: ${UIColor.systemGray5};
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
  border-bottom-color: ${UIColor.systemGray5};
  margin-left: 20px;
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
`;

const StyledListWrapper = styled.View`
  ${({ listStyle }) =>
    listStyle === 'insetGrouped'
      ? insetGroupedListStyleWrapper
      : defaultListStyleWrapper}
`;

const Divider = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: ${UIColor.systemGray5};
  margin-left: 20px;
  margin-top: 1px;
  margin-bottom: 1px;
`;

export const List = ({ listStyle, children }: ListProps) => {
  return (
    <StyledListWrapper listStyle={listStyle}>
      {React.Children.map(children, (child, i) => {
        const totalChildren = React.Children.toArray(children).length - 1;
        return (
          <>
            <StyledListItem
              key={i}
              index={i}
              total={totalChildren}
              last={listStyle === 'insetGrouped' && i === totalChildren}
              listStyle={listStyle}
              aligment={child.props.aligment}
            >
              {React.cloneElement(child, {
                ...child.props,
                ...{ listItem: true },
              })}
            </StyledListItem>
            {i !== totalChildren && <Divider />}
          </>
        );
      })}
    </StyledListWrapper>
  );
};
