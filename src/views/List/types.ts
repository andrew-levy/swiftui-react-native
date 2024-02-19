import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeListProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type ListProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode | ReactElement[];
} & _Modifiers;
