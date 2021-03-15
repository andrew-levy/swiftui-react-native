import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '../../hooks/useColorScheme';
import { systemColor, UIColor } from '../../utils/colors/utils';

type ItemModifiers = {
  index?: number;
  total?: number;
  background?: string;
};

export const getContainerStyles: (
  listStyle: string,
  modifiers?: ItemModifiers
) => StyleProp<ViewStyle> = (listStyle, { background }) => {
  const { colorScheme } = useColorScheme();
  const styles = {
    grouped: {
      backgroundColor: systemColor(background, colorScheme),
      width: '100%',
      borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
      borderTopWidth: StyleSheet.hairlineWidth * 1.2,
      borderColor: systemColor(UIColor.systemGray3, colorScheme),
    },
    insetGrouped: {
      backgroundColor: systemColor(background, colorScheme),
      width: '90%',
      borderRadius: 10,
      overflow: 'hidden',
    },
  };
  return styles[listStyle];
};

export const getItemStyles: (
  listStyle: string,
  modifiers?: ItemModifiers
) => StyleProp<ViewStyle> = (listStyle, { index, total }) => {
  const styles = {
    grouped: {
      backgroundColor: systemColor(UIColor.transparent),
      width: '100%',
    },
    insetGrouped: {
      backgroundColor: systemColor(UIColor.transparent),
      width: '100%',
      borderTopRightRadius: index === 0 ? 10 : 0,
      borderBottomRightRadius: index === total ? 10 : 0,
      borderTopLeftRadius: index === 0 ? 10 : 0,
      borderBottomLeftRadius: index === total ? 10 : 0,
    },
  };
  return styles[listStyle];
};
