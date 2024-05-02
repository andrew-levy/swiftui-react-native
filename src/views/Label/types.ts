import { NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';
import { SystemName } from '../Image/types';

export type NativeLabelProps = {
  systemImage: SystemName;
  title: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
  onEvent?: (
    e: NativeSyntheticEvent<{
      [key: string]: any;
    }>
  ) => void;
};

export type LabelProps = {
  systemImage?: SystemName;
  title?: string;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
