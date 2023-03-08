import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const filterTaxon = atom<string>({ key: "filterId", default: "" });

export const useFilterTaxonState = () => {
  return useRecoilValue(filterTaxon);
};

export const useFilterTaxonMutators = () => {
  const setter = useSetRecoilState(filterTaxon);
  const setFilterTaxon = (id: string) => setter((prev) => (id === prev ? "" : id));
  return { setFilterTaxon };
};
