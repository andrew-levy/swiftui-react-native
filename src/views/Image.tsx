import React from 'react';
import { Image as RNImage } from 'react-native';

type ImageProps = {
  name?: string;
  source?: NodeRequire;
  systemName?: string;
  width?: number;
  height?: number;
  color?: string;
};

const images = {
  'right-arrow': require('../assets/right-arrow.png'),
  'check-mark': require('../assets/check-mark.png'),
};

export const Image: React.FC<ImageProps> = ({
  name,
  source,
  systemName,
  width,
  height,
}) => {
  // If system name use the SFSymbol Component
  // Else, use normal image
  return (
    <RNImage
      source={images[name] || source || null}
      style={{ width: width, height: height }}
    />
  );
};
