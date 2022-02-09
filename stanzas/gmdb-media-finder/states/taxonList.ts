import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Nullable } from "yohak-tools";

export type TaxonInfo = {
  id: string;
  rank: string;
  label: string;
  children: Nullable<string[]>;
};

const taxonList = atom<TaxonInfo[]>({ key: "taxonList", default: [] });

export const useTaxonListState = () => {
  return useRecoilValue(taxonList);
};

export const useTaxonListMutators = () => {
  const setTaxonList = useSetRecoilState(taxonList);
  const addTaxonToList = (taxon: TaxonInfo) =>
    setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
  return { addTaxonToList };
};
