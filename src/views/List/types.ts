import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeListProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  header?: string;
  footer?: string;
  style?: StyleProp<ViewStyle>;
};

export type ListProps<T> = {
  style?: StyleProp<ViewStyle>;
  children?:
    | React.ReactNode
    | ReactElement[]
    | ((item: T, index: number) => ReactElement);
  data?: T[];
  header?: string;
  footer?: string;
} & Modifiers;
