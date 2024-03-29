import React from 'react';
import {
  Image as RNImage,
  ImageSourcePropType,
  ImageStyle,
  Platform,
} from 'react-native';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getShadow } from '../../utils/shadow';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { Modifiers, TextModifiers } from '../../utils/modifiers';
import { Fonts } from '../../utils/fonts';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { getColor } from '../../utils/colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { SystemName } from './types';
import { useAlert } from '../../hooks/useAlert';

const { SFSymbol, SFSymbolWeight, SFSymbolScale } =
  Platform.select({
    ios: () => require('react-native-sfsymbols'),
    default: () => null,
  })() || {};

type ImageProps = Omit<Modifiers, 'style'> &
  TextModifiers & {
    systemName?: SystemName;
    source?: ImageSourcePropType;
    style?: ImageStyle;
  };

const DEFAULT_IMAGE_SIZE = 15;

export const Image: React.FC<ImageProps> = ({
  source,
  systemName,
  alert,
  frame,
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  backgroundColor,
  border,
  opacity,
  zIndex,
  style,
  onAppear,
  onDisappear,
  font,
  fontSize,
  fontWeight,
  bold,
  foregroundColor,
  preferredColorScheme,
}) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme(preferredColorScheme);

  if (systemName) {
    if (!SFSymbol) return null;
    let size = DEFAULT_IMAGE_SIZE;
    if (fontSize) {
      size = fontSize;
    } else if (font) {
      size = Fonts[font].fontSize;
    }
    return (
      <SFSymbol
        name={systemName}
        weight={bold ? 'bold' : fontWeight || SFSymbolWeight.REGULAR}
        scale={SFSymbolScale.MEDIUM}
        size={size}
        color={getColor(foregroundColor, colorScheme)}
        style={[
          {
            opacity,
            zIndex,
            width: fontSize,
            height: fontSize,
            backgroundColor: getColor(backgroundColor, colorScheme),
            ...getCornerRadius(cornerRadius),
            ...getShadow(shadow, colorScheme),
            ...getPadding(padding),
            ...getFrame(frame || { width: size, height: size }),
            ...getBorder(border, colorScheme),
            ...getTransform(scaleEffect, rotationEffect),
          },
          style,
        ]}
      />
    );
  }
  return (
    <RNImage
      source={source}
      style={[
        {
          opacity,
          backgroundColor: getColor(backgroundColor, colorScheme),
          zIndex,
          ...getCornerRadius(cornerRadius),
          ...getShadow(shadow, colorScheme),
          ...getPadding(padding),
          ...getFrame(
            frame || { width: DEFAULT_IMAGE_SIZE, height: DEFAULT_IMAGE_SIZE }
          ),
          ...getBorder(border, colorScheme),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    />
  );
};
