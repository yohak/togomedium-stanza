import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Nullable } from "yohak-tools";

export type TaxonInfo = {
  id: string;
  rank: string;
  label: string;
  children: string[] | "not-yet" | "loading";
};

const taxonList = atom<TaxonInfo[]>({ key: "taxonList", default: [] });

export const useTaxonListState = () => {
  return useRecoilValue(taxonList);
};

export const useTaxonListMutators = () => {
  const setTaxonList = useSetRecoilState(taxonList);
  const addTaxonToList = (taxon: TaxonInfo) => {
    if (taxon.id === "157124") {
      console.log(taxon);
    }
    setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
  };
  const setTaxonChildren = (id: string, children: string[]) => {
    setTaxonList((prev) => {
      const target = prev.find((item) => item.id === id);
      const filtered = prev.filter((item) => item.id !== id);
      if (!target) {
        console.warn("no target found", id);
        return prev;
      }
      return [...filtered, { ...target, children }];
    });
  };
  const setTaxonAsLoading = (id: string) => {
    setTaxonList((prev) => {
      const target = prev.find((item) => item.id === id);
      const filtered = prev.filter((item) => item.id !== id);
      if (!target) {
        console.warn("no target found", id);
        return prev;
      }
      return [...filtered, { ...target, children: "loading" }];
    });
  };
  return { addTaxonToList, setTaxonAsLoading, setTaxonChildren };
};
