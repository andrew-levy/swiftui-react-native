import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeHStackProps = {
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  spacing?: number;
  alignment?: string;
  onAppear?: () => void;
  onDisappear?: () => void;
  onSheetDismissed?: () => void;
  isSheetPresented: boolean;
  style?: StyleProp<ViewStyle>;
};

export type HStackProps = {
  spacing?: number;
  alignment?: 'leading' | 'center' | 'trailing';
  style?: StyleProp<ViewStyle>;
  children?: ReactElement | ReactElement[];
} & Modifiers;
