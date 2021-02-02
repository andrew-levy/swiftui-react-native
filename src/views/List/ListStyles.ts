import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { UIColor } from '../../themes/colors';

type ListStyles = {
  grouped: StyleProp<ViewStyle>;
  insetGrouped: StyleProp<ViewStyle>;
};

type ItemModifiers = {
  index: number;
  total: number;
};

export const getContainerStyles: () => ListStyles = () => ({
  grouped: {
    backgroundColor: UIColor.white,
    width: '100%',
  },
  insetGrouped: {
    backgroundColor: UIColor.white,
    width: '90%',
    borderRadius: 10,
  },
});

export const getItemStyles: (ItemModifiers) => ListStyles = ({
  index,
  total,
}) => ({
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
});
