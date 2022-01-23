export type Padding =
  | boolean
  | number
  | {
      leading?: number;
      top?: number;
      bottom?: number;
      trailing?: number;
      horizontal?: number;
      vertical?: number;
      all?: number;
    };

export const SYSTEM_PADDING = 20;

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
  if (typeof paddingProps === 'boolean' && paddingProps === true) {
    return {
      paddingTop: SYSTEM_PADDING,
      paddingBottom: SYSTEM_PADDING,
      paddingLeft: SYSTEM_PADDING,
      paddingRight: SYSTEM_PADDING,
    };
  }
  const { top, bottom, leading, trailing, vertical, horizontal, all } =
    paddingProps;
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
