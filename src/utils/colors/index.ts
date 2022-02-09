import { ColorSchemeOptions } from '../../views/ColorSchemeProvider/ColorSchemeProvider';

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

export const UIColor = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
};

export type Color =
  | keyof typeof LIGHT_COLORS
  | `#${string}`
  | `rgb${string}`
  | BuiltInColors;

export const getColor = (
  color: Color,
  colorScheme: 'dark' | 'light',
  defaultColor?: Color
) => {
  const colorValue = color || defaultColor;
  const palette = UIColor[colorScheme];
  if (colorValue in palette) return palette[colorValue];
  return colorValue;
};

type BuiltInColors =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen';
