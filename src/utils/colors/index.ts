const LIGHT_COLORS = {
  label: '#000000FF',
  secondaryLabel: '#3C3C4399',
  tertiaryLabel: '#3C3C434D',
  quaternaryLabel: '#3C3C432E',
  placeholderText: '#3C3C434D',
  systemBackground: '#FFFFFFFF',
  secondarySystemBackground: '#F2F2F7FF',
  tertiarySystemBackground: '#FFFFFFFF',
  separator: '#3C3C434A',
  opaqueSeparator: '#C6C6C8FF',
  systemRed: '#FF3B30FF',
  systemBlue: '#007AFFFF',
  systemGreen: '#34C759FF',
  systemIndigo: '#5856D6FF',
  systemTeal: '#5AC8FAFF',
  systemPink: '#FF2D55FF',
  systemPurple: '#AF52DEFF',
  systemOrange: '#FF9500FF',
  systemYellow: '#FFCC00FF',
  systemGray: '#8E8E93FF',
  systemGray2: '#AEAEB2FF',
  systemGray3: '#C7C7CCFF',
  systemGray4: '#D1D1D6FF',
  systemGray5: '#E5E5EAFF',
  systemGray6: '#F2F2F7FF',
};

const DARK_COLORS = {
  label: '#FFFFFFFF',
  secondaryLabel: '#EBEBF599',
  tertiaryLabel: '#EBEBF54D',
  quaternaryLabel: '#EBEBF52E',
  placeholderText: '#EBEBF54D',
  systemBackground: '#000000FF',
  secondarySystemBackground: '#1C1C1EFF',
  tertiarySystemBackground: '#2C2C2EFF',
  separator: '#54545899',
  opaqueSeparator: '#38383AFF',
  systemRed: '#ff3b30',
  systemBlue: '#0a84ff',
  systemGreen: '#30d158',
  systemIndigo: '#5e5ce6',
  systemTeal: '#64d2ff',
  systemPink: '#ff375f',
  systemPurple: '#bf5af2',
  systemOrange: '#ff9f0a',
  systemYellow: '#ffd60a',
  systemGray: '#8e8e93',
  systemGray2: '#636366',
  systemGray3: '#48484a',
  systemGray4: '#3a3a3c',
  systemGray5: '#2c2c2e',
  systemGray6: '#1c1c1e',
};

const FIXED_COLORS = {
  clear: 'rgba(0,0,0,0)',
  black: '#000000',
  white: '#FFFFFF',
  brown: '#a2835e',
  cyan: '#31ade6',
  primary: '#000000',
  secondary: '#3b3b43',
  gray: '#8e8e93',
  green: '#33c758',
  teal: '#2fb0c7',
  orange: '#fe9500',
  purple: '#af52de',
  red: '#fe3a2f',
  yellow: '#fecc00',
  blue: '#007afe',
  pink: '#fe2c54',
  accentColor: '#007afe',
  indigo: '#5755d6',
  mint: '#00c7be',
};

export const UIColor = {
  light: { ...LIGHT_COLORS, ...FIXED_COLORS },
  dark: { ...DARK_COLORS, ...FIXED_COLORS },
};

export type UIColor =
  | keyof typeof UIColor.light
  | `#${string}`
  | `rgb${string}`
  | (string & {});

export const getColor = (
  color: UIColor,
  colorScheme: 'dark' | 'light',
  defaultColor?: UIColor
) => {
  const colorValue = color || defaultColor;
  const palette = UIColor[colorScheme];
  if (colorValue in palette) return palette[colorValue];
  return colorValue;
};
