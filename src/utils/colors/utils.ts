import { ColorScheme } from '../../views/ColorSchemeManager';

type UIColorNames = keyof typeof COLOR_VALUES;

const COLOR_VALUES = {
  black: { light: '#000', dark: '#fff' },
  white: { light: '#fff', dark: '#000' },
  transparent: { light: 'transparent', dark: 'transparent' },
  systemBackground: { light: '#fff', dark: '#000' },
  systemRed: { light: '#ff3b30', dark: '#ff3b30' },
  systemBlue: { light: '#007bff', dark: '#0a84ff' },
  systemGreen: { light: '#34c759', dark: '#30d158' },
  systemIndigo: { light: '#5856d6', dark: '#5e5ce6' },
  systemTeal: { light: '#5ac7fa', dark: '#64d2ff' },
  systemPink: { light: '#ff2d54', dark: '#ff375f' },
  systemPurple: { light: '#af52de', dark: '#bf5af2' },
  systemOrange: { light: '#ff9500', dark: '#ff9f0a' },
  systemYellow: { light: '#ffcc00', dark: '#ffd60a' },
  systemGray: { light: '#8e8e93', dark: '#8e8e93' },
  systemGray2: { light: '#aeaeb2', dark: '#636366' },
  systemGray3: { light: '#c7c7cc', dark: '#48484a' },
  systemGray4: { light: '#d1d1d6', dark: '#3a3a3c' },
  systemGray5: { light: '#e5e5ea', dark: '#2c2c2e' },
  systemGray6: { light: '#f2f2f7', dark: '#1c1c1e' },
};

/**
 * A map of all UIColors
 */
export const UIColor: { [key in UIColorNames]: string } = {
  black: 'black',
  white: 'white',
  transparent: 'transparent',
  systemBackground: 'systemBackground',
  systemRed: 'systemRed',
  systemBlue: 'systemBlue',
  systemGreen: 'systemGreen',
  systemIndigo: 'systemIndigo',
  systemTeal: 'systemTeal',
  systemPink: 'systemPink',
  systemPurple: 'systemPurple',
  systemOrange: 'systemOrange',
  systemYellow: 'systemYellow',
  systemGray: 'systemGray',
  systemGray2: 'systemGray2',
  systemGray3: 'systemGray3',
  systemGray4: 'systemGray4',
  systemGray5: 'systemGray5',
  systemGray6: 'systemGray6',
};

/**
 * Gets the color hex value for a given color.
 * If a color scheme is provided, the appropriate color will be chosen.
 * Defaults to light mode.
 */
export const systemColor = (
  color: string,
  colorScheme?: ColorScheme
): string => {
  const colorValues = COLOR_VALUES[color];
  if (colorValues) {
    return colorScheme ? colorValues[colorScheme] : colorValues.light;
  }
  return color;
};

// UNIMPLEMENTED COLORS
// link: 'link',
// label: 'label',
// secondaryLabel: 'secondaryLabel',
// tertiaryLabel: 'tertiaryLabel',
// quaternaryLabel: 'quaternaryLabel',
// systemFill: 'systemFill',
// secondarySystemFill: 'secondarySystemFill',
// tertiarySystemFill: 'tertiarySystemFill',
// quaternarySystemFill: 'quaternarySystemFill',
// secondarySystemBackground: 'secondarySystemBackground',
// tertiarySystemBackground: 'tertiarySystemBackground',
