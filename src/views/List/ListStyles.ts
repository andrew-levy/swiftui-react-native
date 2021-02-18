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
      overflow: 'hidden',
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
      width: '100%',
    },
    insetGrouped: {
      backgroundColor: UIColor.white,
      width: '100%',
      borderTopRightRadius: index === 0 ? 10 : 0,
      borderBottomRightRadius: index === total ? 10 : 0,
      borderTopLeftRadius: index === 0 ? 10 : 0,
      borderBottomLeftRadius: index === total ? 10 : 0,
    },
  };
  return styles[listStyle];
};
