export type Padding =
  | {
      leading?: number;
      top?: number;
      bottom?: number;
      trailing?: number;
      horizontal?: number;
      vertical?: number;
      all?: number;
    }
  | number;

export type Alignment = 'leading' | 'center' | 'trailing' | 'top' | 'bottom';

export type Shadow = {
  color: string;
  x: number;
  y: number;
  radius: number;
};

export type Frame = {
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
};
