/*
 * Originally, this was supposed to act like the SwiftUI Image view, but images work differently in RN. I wanted to be
 * able to input a local image as well as something like an SF Symbol. Not sure how I am going to do this, but for now
 * I can just use these local pngs. This looks promisng for SFSymbols: https://github.com/birkir/react-native-sfsymbols.
 */

import React from 'react';
import { Image as RNImage } from 'react-native';

type ImageProps = {
  name: string;
  width?: number;
  height?: number;
  color?: string;
};

const images = {
  'right-arrow': require('../assets/right-arrow.png'),
  'check-mark': require('../assets/check-mark.png'),
};

export const Image: React.FC<ImageProps> = ({ name, width, height }) => {
  return (
    <RNImage
      source={images[name] || null}
      style={{ width: width, height: height }}
    />
  );
};
