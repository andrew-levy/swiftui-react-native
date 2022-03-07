export type TextAlignment = 'leading' | 'center' | 'trailing';
export type VStackAlignment = 'leading' | 'center' | 'trailing';
export type HStackAlignment = 'top' | 'center' | 'bottom';
export type ZStackAlignment =
  | 'top'
  | 'center'
  | 'bottom'
  | 'leading'
  | 'trailing'
  | 'topLeading'
  | 'topTrailing'
  | 'bottomLeading'
  | 'bottomTrailing';

export const AlignmentMap = {
  vstack: {
    leading: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    trailing: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
  hstack: {
    top: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    bottom: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
  zstack: {
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    leading: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      alignSelf: 'center',
    },
    trailing: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignSelf: 'center',
    },
    top: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
    },
    bottom: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'center',
    },
    topLeading: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf: 'center',
    },
    topTrailing: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      alignSelf: 'center',
    },
    bottomLeading: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      alignSelf: 'center',
    },
    bottomTrailing: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignSelf: 'center',
    },
  },
};

export const getAlignment = (
  alignment: ZStackAlignment | VStackAlignment | HStackAlignment,
  stackType: 'hstack' | 'vstack' | 'zstack'
) => {
  return AlignmentMap[stackType][alignment];
};
