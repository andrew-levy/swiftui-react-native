import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UIColor } from '../../themes/colors';
import { getContainerStyles, getItemStyles } from './ListStyles';
import { SwipeableItem } from './SwipeableItem';

type ListProps = {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
  listStyle?: 'insetGrouped' | 'grouped';
  onDelete?: (i: number) => void;
};

export const List = ({
  listStyle = 'insetGrouped',
  onDelete,
  children,
}: ListProps) => {
  return (
    <View style={getContainerStyles(listStyle)}>
      {React.Children.map(children, (child, i) => {
        const totalChildren = React.Children.toArray(children).length - 1;
        const listItem = (
          <React.Fragment key={i}>
            <View
              style={[
                getItemStyles(listStyle, {
                  index: i,
                  total: totalChildren,
                }),
                { paddingVertical: 12, paddingHorizontal: 20 },
              ]}
              key={i}
            >
              {React.cloneElement(child, {
                ...child.props,
                ...{ listItem: true },
              })}
            </View>
            {i !== totalChildren && (
              <View
                style={{
                  borderColor: UIColor.systemGray3,
                  borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
                  marginLeft: 20,
                }}
              />
            )}
          </React.Fragment>
        );
        return onDelete ? (
          <SwipeableItem onDelete={onDelete} index={i}>
            {listItem}
          </SwipeableItem>
        ) : (
          listItem
        );
      })}
    </View>
  );
};
