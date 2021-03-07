export const unescapeJsonString = (str: string): string => {
  return str?.replace(/\\/g, "");
};
