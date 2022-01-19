import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedMedia = atom<string[]>({ key: "selectedMedia", default: [] });

export const useSelectedMediaState = () => {
  return useRecoilValue(selectedMedia);
};

export const useSelectedMediaMutators = () => {
  const setSelectedMedia = useSetRecoilState(selectedMedia);
  return { setSelectedMedia };
};
