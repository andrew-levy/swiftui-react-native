import { StyleProp, ViewStyle } from 'react-native';
import { Modifiers, NativeModifiersProp } from '../../utils/modifiers';

export type NativeSpacerProps = {
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};
export type SpacerProps = {
  style?: StyleProp<ViewStyle>;
} & Modifiers;
