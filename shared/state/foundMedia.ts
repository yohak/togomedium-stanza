import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type FoundMedia = {
  total: number;
  limit: number;
  contents: { gm_id: string; name: string }[];
  offset: number;
};
export const nullResponse: FoundMedia = {
  total: 0,
  limit: 0,
  contents: [],
  offset: 0,
};

const foundMedia = atom<FoundMedia>({
  key: "foundMedia",
  default: nullResponse,
});

export const useFoundMediaState = () => {
  return useRecoilValue(foundMedia);
};

export const useFoundMediaMutators = () => {
  const setFoundMedia = useSetRecoilState(foundMedia);
  return { setFoundMedia };
};
