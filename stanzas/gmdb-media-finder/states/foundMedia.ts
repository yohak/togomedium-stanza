import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { LabelInfo } from "../../../components/types";

const foundMedia = atom<LabelInfo[]>({ key: "foundMedia", default: [] });

export const useFoundMediaState = () => {
  return useRecoilValue(foundMedia);
};

export const useFoundMediaMutators = () => {
  const setFoundMedia = useSetRecoilState(foundMedia);
  return { setFoundMedia };
};
