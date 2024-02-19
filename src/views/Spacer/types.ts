import { StyleProp, ViewStyle } from 'react-native';
import { NativeModifiersProp, _Modifiers } from '../../utils/modifiers';

export type NativeSpacerProps = {
  modifiers?: NativeModifiersProp;
  style?: StyleProp<ViewStyle>;
};
export type SpacerProps = {
  style?: StyleProp<ViewStyle>;
} & _Modifiers;
