import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { filterOutInfo, hasInfo, LabelInfo } from "../../../shared/utils/labelInfo";

const selectedOrganisms = atom<LabelInfo[]>({ key: "selectedOrganisms", default: [] });

export const useSelectedOrganismsState = () => {
  return useRecoilValue(selectedOrganisms);
};

export const useSelectedOrganismsMutators = () => {
  const setSelectedOrganisms = useSetRecoilState(selectedOrganisms);
  const toggleOrganismSelection = (info: LabelInfo) => {
    setSelectedOrganisms((prev: LabelInfo[]) => {
      return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
    });
  };
  const clearSelectedOrganisms = () => {
    setSelectedOrganisms([]);
  };
  return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};
