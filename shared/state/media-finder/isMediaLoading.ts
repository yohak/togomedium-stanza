import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isMediaLoading = atom<boolean>({
  key: "isMediaLoading",
  default: false,
});

export const useIsMediaLoadingState = () => {
  return useRecoilValue(isMediaLoading);
};

export const useIsMediaLoadingMutators = () => {
  const setIsMediaLoading = useSetRecoilState(isMediaLoading);
  return { setIsMediaLoading };
};
