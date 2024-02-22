export type Color =
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'primary'
  | 'secondary'
  | 'accentColor'
  | 'black'
  | 'white'
  | 'gray'
  | 'clear'
  | 'mint'
  | 'brown'
  | 'teal'
  | 'cyan'
  | 'indigo'
  | `#${string}`
  | `rgb${string}`
  | (string & {});
