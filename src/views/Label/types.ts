import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';
import { SystemName } from '../Image/types';

export type NativeLabelProps = {
  systemImage: SystemName;
  title: string;
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};

export type LabelProps = {
  systemImage?: SystemName;
  title?: string;
  style?: StyleProp<ViewStyle>;
} & Modifiers;
