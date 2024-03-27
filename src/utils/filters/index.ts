export type BlendMode =
  | 'color'
  | 'colorBurn'
  | 'colorDodge'
  | 'darken'
  | 'difference'
  | 'exclusion'
  | 'hardLight'
  | 'hue'
  | 'lighten'
  | 'luminosity'
  | 'multiply'
  | 'overlay'
  | 'saturation'
  | 'screen'
  | 'softLight'
  | 'sourceAtop'
  | 'destinationOver'
  | 'destinationOut'
  | 'plusDarker'
  | 'plusLighter'
  | 'normal';

export type ClipShape =
  | 'circle'
  | 'roundedRectangle'
  | 'capsule'
  | 'rectangle'
  | 'ellipse'
  | {
      shape: 'roundedRectangle';
      cornerRadius: number;
    };
