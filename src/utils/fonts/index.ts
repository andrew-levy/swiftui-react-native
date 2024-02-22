export const Fonts = {
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

export const FontWeights = {
  regular: 'normal',
  bold: 'bold',
  heavy: '800',
  medium: '600',
  light: '500',
  thin: '300',
  ultralight: '200',
  semibold: '700',
  black: '900',
};

export const getFont = (
  font?: keyof typeof Fonts | string,
  fontWeight?: keyof typeof FontWeights,
  italic?: boolean
) => {
  return {
    ...Fonts[font],
    ...(fontWeight && { fontWeight: FontWeights[fontWeight] }),
    ...(italic && { fontStyle: 'italic' }),
  };
};
