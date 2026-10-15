export const toLabel = (value: string) => {
  const words = value.replaceAll('_', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};
