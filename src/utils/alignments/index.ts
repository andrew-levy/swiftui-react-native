export type HorizontalAlignment = 'leading' | 'center' | 'trailing';
export type VerticalAlignment = 'top' | 'center' | 'bottom';

export const AlignmentMap = {
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
};

export const getAlignment = (
  alignment: HorizontalAlignment | VerticalAlignment,
  direction: 'horizontal' | 'vertical'
) => {
  return AlignmentMap[direction][alignment || 'center'];
};
