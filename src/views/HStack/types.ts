import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  Modifiers,
  ModifiersProp,
  NativeModifiersProp,
} from '../../utils/modifiers';

export type NativeHStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  spacing?: number;
  alignment?: string;
  onSheetDismissed?: () => void;
  isSheetPresented: boolean;
  style?: StyleProp<ViewStyle>;
};

export type HStackProps = {
  modifiers?: ModifiersProp;
  spacing?: number;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  children?: ReactElement | ReactElement[];
} & Modifiers;
