import { requireNativeViewManager } from 'expo-modules-core';
import React from 'react';
import {
  getSizeFromModifiers,
  mapToNativeModifiers,
} from '../../utils/modifiers';
import { onBaseEvent } from '../../utils/onBaseEvent';
import {
  ColorProps,
  ColorSubComponentProps,
  ColorView,
  NativeColorProps,
} from './types';

const NativeColor: React.ComponentType<NativeColorProps> =
  requireNativeViewManager('Color');

const ColorSubComponent = ({ color, ...props }: ColorSubComponentProps) => {
  return <Color color={color} {...props} />;
};

export const Color: ColorView = ({
  color,
  style,
  ...modifiers
}: ColorProps) => {
  return (
    <NativeColor
      modifiers={mapToNativeModifiers(modifiers)}
      style={{
        ...getSizeFromModifiers(modifiers, { width: 30, height: 30 }),
        ...(style as object),
      }}
      onEvent={(e) => {
        onBaseEvent(e, modifiers);
      }}
      color={color}
    />
  );
};

Color.black = (props) => <ColorSubComponent color="black" {...props} />;
Color.blue = (props) => <ColorSubComponent color="blue" {...props} />;
Color.brown = (props) => <ColorSubComponent color="brown" {...props} />;
Color.clear = (props) => <ColorSubComponent color="clear" {...props} />;
Color.cyan = (props) => <ColorSubComponent color="cyan" {...props} />;
Color.gray = (props) => <ColorSubComponent color="gray" {...props} />;
Color.green = (props) => <ColorSubComponent color="green" {...props} />;
Color.indigo = (props) => <ColorSubComponent color="indigo" {...props} />;
Color.mint = (props) => <ColorSubComponent color="mint" {...props} />;
Color.orange = (props) => <ColorSubComponent color="orange" {...props} />;
Color.pink = (props) => <ColorSubComponent color="pink" {...props} />;
Color.purple = (props) => <ColorSubComponent color="purple" {...props} />;
Color.red = (props) => <ColorSubComponent color="red" {...props} />;
Color.teal = (props) => <ColorSubComponent color="teal" {...props} />;
Color.white = (props) => <ColorSubComponent color="white" {...props} />;
Color.yellow = (props) => <ColorSubComponent color="yellow" {...props} />;
Color.accentColor = (props) => (
  <ColorSubComponent color="accentColor" {...props} />
);
Color.primary = (props) => <ColorSubComponent color="primary" {...props} />;
Color.secondary = (props) => <ColorSubComponent color="secondary" {...props} />;
