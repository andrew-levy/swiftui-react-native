export const getCornerRadius = (
  cornerRadius: number,
  overflowNeeded: boolean = false
) => {
  if (!cornerRadius) return null;
  if (overflowNeeded)
    return { borderRadius: cornerRadius, overflow: 'hidden' as const };
  return { borderRadius: cornerRadius };
};
