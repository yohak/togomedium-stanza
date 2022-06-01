import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type QueryMethod = "Taxonomic tree" | "Organism phenotypes" | "Media attributes";

const queryMethod = atom<QueryMethod>({ key: "queryMethod", default: "Organism phenotypes" });

export const useQueryMethodState = () => {
  return useRecoilValue(queryMethod);
};

export const useQueryMethodMutators = () => {
  const setQueryMethod = useSetRecoilState(queryMethod);
  return { setQueryMethod };
};
