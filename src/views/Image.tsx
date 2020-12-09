import React from 'react';
import { Image as RNImage } from 'react-native';

type ImageProps = {
  name: string;
  width?: number;
  height?: number;
};

const images = {
  'right-arrow': require('../assets/right-arrow.png'),
};

export const Image: React.FC<ImageProps> = ({ name, width, height }) => {
  return (
    <RNImage
      source={images[name] || null}
      style={{ width: width, height: height }}
    />
  );
};

/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
