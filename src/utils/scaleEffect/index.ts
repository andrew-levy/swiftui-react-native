export const getScaleEffect = (scale: number) => {
  if (!scale) return null;
  return {
    transform: [{ scale }],
  };
};
