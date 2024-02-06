export const toWords = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, s => {
    return s.toUpperCase();
  });
};
