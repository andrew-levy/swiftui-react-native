import React from 'react';
import { Image as RNImage, ImageSourcePropType } from 'react-native';
import { Frame } from '../../types/stylePropTypes';

type ImageProps = {
  name?: string;
  source?: ImageSourcePropType;
  systemName?: string;
  frame?: Frame;
  color?: string;
};

const DEFAULT_IMAGE_SIZE = 15;

export const Image: React.FC<ImageProps> = ({
  name,
  source,
  systemName,
  frame = { width: DEFAULT_IMAGE_SIZE, height: DEFAULT_IMAGE_SIZE },
}) => {
  if (systemName) {
    return null;
    // <SFSymbol name={systemName} />
  }
  return (
    <RNImage
      source={source}
      style={{
        width: frame.width,
        height: frame.height,
      }}
    />
  );
};
