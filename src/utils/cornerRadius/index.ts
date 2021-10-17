export const getCornerRadius = (cornerRadius: number) => {
  if (!cornerRadius) return null;
  return { borderRadius: cornerRadius };
};
