import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { TaxonInfo } from "./taxonList";
import { makeNewSelection } from "../functions/proessTaxonInfo";

const selectedTaxon = atom<string[]>({ key: "selectedTaxon", default: [] });

export const useSelectedTaxonState = () => {
  return useRecoilValue(selectedTaxon);
};

export const useSelectedTaxonMutators = () => {
  const setSelectedTaxon = useSetRecoilState(selectedTaxon);
  const clearTaxonSelect = () => setSelectedTaxon([]);
  const updateSelection = (list: TaxonInfo[], id: string) => {
    setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
  };
  return {
    __setSelectedTaxon: setSelectedTaxon,
    clearTaxonSelect,
    updateSelection,
  };
};
