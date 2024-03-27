import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeZStackProps = {
  alignment?: string;
  children?: React.ReactNode;
  modifiers?: NativeModifiersProp;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
  style?: StyleProp<ViewStyle>;
};

export type ZStackProps = {
  alignment?:
    | 'topLeading'
    | 'top'
    | 'topTrailing'
    | 'leading'
    | 'center'
    | 'trailing'
    | 'bottomLeading'
    | 'bottom'
    | 'bottomTrailing';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Modifiers;
