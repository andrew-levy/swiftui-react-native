import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeVStackProps = {
  spacing?: number;
  alignment?: string;
  children?: React.ReactNode;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type VStackProps = {
  spacing?: number;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
