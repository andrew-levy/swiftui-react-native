import { Padding } from '../types/stylePropTypes';

export const getPadding = (paddingProps: Padding) => {
  if (!paddingProps) return null;
  if (typeof paddingProps === 'number') {
    return {
      paddingTop: paddingProps,
      paddingBottom: paddingProps,
      paddingLeft: paddingProps,
      paddingRight: paddingProps,
    };
  }
  const {
    top,
    bottom,
    leading,
    trailing,
    vertical,
    horizontal,
    all,
  } = paddingProps;
  return {
    ...((top || vertical || all) && {
      paddingTop: all || vertical || top || null,
    }),
    ...((bottom || vertical || all) && {
      paddingBottom: all || vertical || bottom || null,
    }),
    ...((leading || horizontal || all) && {
      paddingLeft: all || horizontal || leading || null,
    }),
    ...((trailing || horizontal || all) && {
      paddingRight: all || horizontal || trailing || null,
    }),
  };
};
