import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeVStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type VStackProps = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
