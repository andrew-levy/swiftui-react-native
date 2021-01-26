import React from 'react';
import { Image as RNImage } from 'react-native';
import { Frame } from '../types/stylePropTypes';

type ImageProps = {
  name?: string;
  source?: NodeRequire;
  systemName?: string;
  frame?: Frame;
  color?: string;
};

const images = {
  'right-arrow': require('../assets/right-arrow.png'),
  'check-mark': require('../assets/check-mark.png'),
};

const DEFAULT_IMAGE_SIZE = 15;

export const Image: React.FC<ImageProps> = ({
  name,
  source,
  systemName,
  frame,
}) => {
  if (systemName) {
    return null;
    // Need a way to customize scale
    // <SFSymbol name={systemName} />
  }
  return (
    <RNImage
      source={images[name] || source || null}
      style={{
        width: frame ? frame.width : DEFAULT_IMAGE_SIZE,
        height: frame ? frame.height : DEFAULT_IMAGE_SIZE,
      }}
    />
  );
};
