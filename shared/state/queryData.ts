import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type QueryData = { [key: string]: string | string[] | null };
const queryData = atom<QueryData>({ key: "queryData", default: {} });

export const useQueryDataState = () => {
  return useRecoilValue(queryData);
};

export const useQueryDataMutators = () => {
  const setQueryData = useSetRecoilState(queryData);
  return { setQueryData };
};
