import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { UIColor } from '../../themes/colors';

type ItemModifiers = {
  index: number;
  total: number;
};

export const getContainerStyles: (listStyle: string) => StyleProp<ViewStyle> = (
  listStyle
) => {
  const styles = {
    grouped: {
      backgroundColor: UIColor.white,
      width: '100%',
      borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
      borderTopWidth: StyleSheet.hairlineWidth * 1.2,
      borderColor: UIColor.systemGray3,
    },
    insetGrouped: {
      backgroundColor: UIColor.white,
      width: '90%',
      borderRadius: 10,
    },
  };
  return styles[listStyle];
};

export const getItemStyles: (
  listStyle: string,
  modifiers: ItemModifiers
) => StyleProp<ViewStyle> = (listStyle, { index, total }) => {
  const styles = {
    grouped: {
      backgroundColor: UIColor.white,
      paddingBottom: 12,
      marginTop: 12,
      paddingRight: 15,
      marginLeft: 20,
      borderBottomColor: UIColor.systemGray5,
      ...(index !== total && {
        borderBottomColor: UIColor.systemGray3,
        borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
      }),
    },
    insetGrouped: {
      backgroundColor: UIColor.white,
      marginLeft: 20,
      paddingBottom: 12,
      marginTop: 12,
      paddingRight: 15,
      borderTopRightRadius: index === 0 ? 10 : 0,
      borderBottomRightRadius: index === total ? 10 : 0,
      ...(index !== total && {
        borderBottomColor: UIColor.systemGray3,
        borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
      }),
    },
  };
  return styles[listStyle];
};
