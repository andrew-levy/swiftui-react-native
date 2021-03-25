import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors';
import { getContainerStyles, getItemStyles } from './ListStyles';
import { SwipeableItem } from './SwipeableItem';

type ListProps = {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
  listStyle?: 'insetGrouped' | 'grouped';
  background?: string;
  onDelete?: (i: number) => void;
};

export const List = ({
  listStyle = 'insetGrouped',
  onDelete,
  background = UIColor.white,
  children,
}: ListProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View style={getContainerStyles(listStyle, { background })}>
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
                {
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  backgroundColor: systemColor(background, colorScheme),
                },
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
                  borderColor: systemColor(UIColor.systemGray3, colorScheme),
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
