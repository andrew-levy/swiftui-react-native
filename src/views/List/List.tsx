import React from 'react';
import { View } from 'react-native';
import { getContainerStyles, getItemStyles } from './ListStyles';

type ListProps = {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
  listStyle?: 'insetGrouped' | 'grouped';
};

export const List = ({ listStyle = 'insetGrouped', children }: ListProps) => {
  return (
    <View style={getContainerStyles(listStyle)}>
      {React.Children.map(children, (child, i) => {
        const totalChildren = React.Children.toArray(children).length - 1;
        return (
          <>
            <View
              style={getItemStyles(listStyle, {
                index: i,
                total: totalChildren,
              })}
              key={i}
            >
              {React.cloneElement(child, {
                ...child.props,
                ...{ listItem: true },
              })}
            </View>
          </>
        );
      })}
    </View>
  );
};
