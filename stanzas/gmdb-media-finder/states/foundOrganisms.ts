import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { LabelInfo } from "../../../utils/types";

const foundOrganisms = atom<LabelInfo[]>({ key: "foundOrganisms", default: [] });

export const useFoundOrganismsState = () => {
  return useRecoilValue(foundOrganisms);
};

export const useFoundOrganismsMutators = () => {
  const setFoundOrganisms = useSetRecoilState(foundOrganisms);
  return { setFoundOrganisms };
};
