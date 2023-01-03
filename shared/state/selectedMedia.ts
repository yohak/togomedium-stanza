import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { filterOutInfo, hasInfo, LabelInfo } from "../utils/labelInfo";

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
