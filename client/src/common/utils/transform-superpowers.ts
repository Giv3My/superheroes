export const transformSuperpowers = (superpowers: string[]) => {
  return superpowers.map((item) => `${item[0].toUpperCase()}${item.slice(1)}`).join(', ');
};
