import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const mediaPagination = atom<number>({
  key: "mediaPagination",
  default: 1,
});

export const useMediaPaginationState = () => {
  return useRecoilValue(mediaPagination);
};

export const useMediaPaginationMutators = () => {
  const setMediaPagination = useSetRecoilState(mediaPagination);
  const next = () => setMediaPagination((prev) => prev + 1);
  const prev = () => setMediaPagination((prev) => prev - 1);
  const reset = () => setMediaPagination(1);
  return { next, prev, reset };
};
