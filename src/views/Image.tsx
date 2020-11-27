import React from 'react';
import { Image as RNImage } from 'react-native';

type ImageProps = {
  name: string;
};

export const Image: React.FC<ImageProps> = ({ name }) => {
  return <RNImage soruce={null} />;
};

/* PROPS:
 * clipShape
 * image
 * margin
 * border
 * hidden
 * shaddow radius
 */
