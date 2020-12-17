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

// TODO: Change this to a styled component for width and height
/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
