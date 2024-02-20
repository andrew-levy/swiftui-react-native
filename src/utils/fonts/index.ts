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
export const getFont = (
  font?: keyof typeof Fonts | string,
  fontSize?: number,
  customFont?: string,
  italic?: boolean
) => {
  return {
    ...Fonts[font],
    ...(fontSize && { fontSize }),
    ...(customFont && { fontFamily: customFont }),
    ...(italic && { fontStyle: 'italic' }),
  };
};
