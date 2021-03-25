export const Fonts = {
  fonts: { system: 'System' },
  weights: {
    normal: 'normal',
    bold: 'bold',
    heavy: '800',
    light: '500',
    medium: '600',
  },
};

export const FontStyles = {
  title: { fontSize: 20 },
  title2: { fontSize: 15 },
  title3: { fontSize: 12 },
  largeTitle: { fontSize: 30 },
  headline: { fontSize: 10, fontWeight: 'bold' },
  subHeadline: { fontSize: 10 },
  body: { fontSize: 12 },
  callout: { fontSize: 10 },
  caption: { fontSize: 10 },
  caption2: { fontSize: 10 },
  caption3: { fontSize: 10 },
  footnote: { fontSize: 10 },
};

export const getFont = (font: string) => {
  return FontStyles[font];
};
