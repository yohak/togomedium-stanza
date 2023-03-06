import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const filterId = atom<string>({ key: "filterId", default: "" });

export const useFilterIdState = () => {
  return useRecoilValue(filterId);
};

export const useFilterIdMutators = () => {
  const setter = useSetRecoilState(filterId);
  const setFilterId = (id: string) => setter((prev) => (id === prev ? "" : id));
  return { setFilterId };
};
