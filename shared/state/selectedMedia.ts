import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { LabelInfo } from "../utils/types";

const selectedMedia = atom<LabelInfo[]>({ key: "selectedMedia", default: [] });

export const useSelectedMediaState = () => {
  return useRecoilValue(selectedMedia);
};

export const useSelectedMediaMutators = () => {
  const setSelectedMedia = useSetRecoilState(selectedMedia);
  const toggleMediumSelection = (info: LabelInfo) => {
    setSelectedMedia((prev: LabelInfo[]) => {
      return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
    });
  };
  const clearSelectedMedia = () => {
    setSelectedMedia([]);
  };
  return { setSelectedMedia, toggleMediumSelection, clearSelectedMedia };
};

const hasInfo = (arr: LabelInfo[], info: LabelInfo) => {
  return arr.find((item) => item.id === info.id);
};
const filterOutInfo = (arr: LabelInfo[], info: LabelInfo) => {
  return arr.filter((item) => item.id !== info.id);
};
