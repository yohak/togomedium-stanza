import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const selectedOrganisms = atom<string[]>({ key: "selectedOrganisms", default: [] });

export const useSelectedOrganismsState = () => {
  return useRecoilValue(selectedOrganisms);
};

export const useSelectedOrganismsMutators = () => {
  const setSelectedOrganisms = useSetRecoilState(selectedOrganisms);
  const toggleOrganismSelection = (id: string) => {
    setSelectedOrganisms((prev) => {
      let result: string[];
      if (prev.includes(id)) {
        result = prev.filter((r) => r !== id);
      } else {
        result = [...prev, id];
      }
      return result;
    });
  };
  const clearSelectedOrganisms = () => {
    setSelectedOrganisms([]);
  };
  return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};
