export type Padding =
  | number
  | [string, number]
  | [Array<string>, Array<number>]
  | [Array<string>, number];

export type Alignment = 'leading' | 'center' | 'trailing' | 'top' | 'bottom';

export type Shadow = {
  color: string;
  x: number;
  y: number;
  radius: number;
};
