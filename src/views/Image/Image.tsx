import React from 'react';
import { Image as RNImage, ImageSourcePropType } from 'react-native';
import { Frame } from '../../types/propTypes';
// import {
//   SFSymbol,
//   SFSymbolWeight,
//   SFSymbolScale,
// } from 'react-native-sfsymbols';

type ImageProps = {
  source?: ImageSourcePropType;
  systemName?: string;
  frame?: Frame;
  foregroundColor?: string;
};

const DEFAULT_IMAGE_SIZE = 15;

export const Image: React.FC<ImageProps> = ({
  source,
  systemName,
  foregroundColor,
  frame = { width: DEFAULT_IMAGE_SIZE, height: DEFAULT_IMAGE_SIZE },
}) => {
  if (systemName) {
    return null;
    // <SFSymbol
    //   name={systemName}
    //   weight={SFSymbolWeight.SEMIBOLD}
    //   scale={SFSymbolScale.SMALL}
    //   color={foregroundColor}
    // />
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
