export type HorizontalAlignment = 'leading' | 'center' | 'trailing';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export const Alignments = {
  horizontal: {
    leading: 'flex-start',
    center: 'center',
    trailing: 'flex-end',
  },
  vertical: {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  },
} as const;

export const Alignment = {
  leading: 'leading',
  center: 'center',
  trailing: 'trailing',
  top: 'top',
  bottom: 'bottom',
} as const;
