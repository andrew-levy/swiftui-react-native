export const FontWeight = {
  regular: 'regular',
  bold: 'bold',
  heavy: 'heavy',
  medium: 'medium',
  light: 'light',
};

export const Font = {
  largeTitle: 'largeTitle',
  title: 'title',
  title2: 'title2',
  title3: 'title3',
  headline: 'headline',
  subheadline: 'subheadline',
  body: 'body',
  callout: 'callout',
  caption: 'caption',
  caption2: 'caption2',
  footnote: 'footnote',
};

export const FontStyles = {
  largeTitle: { fontSize: 34, fontWeight: 'normal' },
  title: { fontSize: 28, fontWeight: 'normal' },
  title2: { fontSize: 22, fontWeight: 'normal' },
  title3: { fontSize: 20, fontWeight: 'normal' },
  headline: { fontSize: 17, fontWeight: 'bold' },
  body: { fontSize: 17, fontWeight: 'normal' },
  callout: { fontSize: 16, fontWeight: 'normal' },
  subheadline: { fontSize: 15, fontWeight: 'normal' },
  footnote: { fontSize: 13, fontWeight: 'normal' },
  caption: { fontSize: 12, fontWeight: 'normal' },
  caption2: { fontSize: 11, fontWeight: 'normal' },
};

export const FontWeightValues = {
  regular: 'normal',
  bold: 'bold',
  heavy: '800',
  medium: '600',
  light: '500',
};

export const getFont = (
  font?: string,
  fontSize?: number,
  fontWeight?: string,
  customFont?: string
) => {
  return {
    ...FontStyles[font],
    ...(fontSize && { fontSize }),
    ...(fontWeight && { fontWeight: FontWeightValues[fontWeight] }),
    ...(customFont && { fontFamily: customFont }),
  };
};
