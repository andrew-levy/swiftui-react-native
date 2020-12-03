import React from 'react';
import { Image as RNImage } from 'react-native';

type ImageProps = {
  name: string;
};

const images = {
  'right-arrow': require('../assets/right-arrow.png'),
};

export const Image: React.FC<ImageProps> = ({ name }) => {
  return <RNImage source={images[name] || null} />;
};

/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
