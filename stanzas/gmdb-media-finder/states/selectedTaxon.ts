import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { TaxonInfo } from "./taxonList";

const selectedTaxon = atom<string[]>({ key: "selectedTaxon", default: [] });

export const useSelectedTaxonState = () => {
  return useRecoilValue(selectedTaxon);
};

export const useSelectedTaxonMutators = () => {
  const setSelectedTaxon = useSetRecoilState(selectedTaxon);
  const toggleTaxonSelect = (id: string) =>
    setSelectedTaxon((prev) => {
      return prev.includes(id) ? prev.filter((item) => item !== id) : prev.concat(id);
    });
  const setTaxonSelect = (ids: string[], value: boolean) => {
    const makeResult = (prev: string[], id: string, value: boolean): string[] => {
      if (value) {
        if (prev.includes(id)) {
          return prev;
        } else {
          return prev.concat(id);
        }
      } else {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        } else {
          return prev;
        }
      }
    };

    setSelectedTaxon((prev) => {
      let result = [...prev];
      ids.forEach((taxid) => (result = makeResult(result, taxid, value)));
      //
      return result;
    });
  };
  const clearTaxonSelect = () => setSelectedTaxon([]);
  const updateSelection = (id: string, allTaxon: TaxonInfo[]) => {
    setSelectedTaxon((prev) => update(id, prev, allTaxon));
  };
  return {
    __setSelectedTaxon: setSelectedTaxon,
    toggleTaxonSelect,
    clearTaxonSelect,
    setTaxonSelect,
    updateSelection,
  };
};

const update = (id: string, selection: string[], all: TaxonInfo[]): string[] => {
  return [];
};
