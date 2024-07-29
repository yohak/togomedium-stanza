import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const organismPagination = atom<number>({
  key: "organismPagination",
  default: 1,
});

export const useOrganismPaginationState = () => {
  return useRecoilValue(organismPagination);
};

export const useOrganismPaginationMutators = () => {
  const setOrganismPagination = useSetRecoilState(organismPagination);
  const next = () => setOrganismPagination((prev) => prev + 1);
  const prev = () => setOrganismPagination((prev) => prev - 1);
  const reset = () => setOrganismPagination(1);
  return { next, prev, reset };
};
