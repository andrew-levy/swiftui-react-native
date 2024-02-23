import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeVStackProps = {
  spacing?: number;
  alignment?: string;
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type VStackProps = {
  spacing?: number;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
