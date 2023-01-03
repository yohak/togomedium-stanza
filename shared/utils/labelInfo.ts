export type LabelInfo = {
  label: string;
  id: string;
};
export const hasInfo = (arr: LabelInfo[], info: LabelInfo): boolean => {
  return !!arr.find((item) => item.id === info.id);
};
export const filterOutInfo = (arr: LabelInfo[], info: LabelInfo): LabelInfo[] => {
  return arr.filter((item) => item.id !== info.id);
};
export const extractLabelIds = (arr: LabelInfo[]): string[] => {
  return arr.map((item) => item.id);
};
export const hasIdOfLabel = (arr: LabelInfo[], id: string): boolean => {
  return !!arr.find((info) => info.id === id);
};
