import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedMedia = atom<string[]>({ key: "selectedMedia", default: [] });

export const useSelectedMediaState = () => {
  return useRecoilValue(selectedMedia);
};

export const useSelectedMediaMutators = () => {
  const setSelectedMedia = useSetRecoilState(selectedMedia);
  const toggleMediumSelection = (id: string) => {
    setSelectedMedia((prev) => {
      let result: string[];
      if (prev.includes(id)) {
        result = prev.filter((r) => r !== id);
      } else {
        result = [...prev, id];
      }
      return result;
    });
  };
  return { setSelectedMedia, toggleMediumSelection };
};
