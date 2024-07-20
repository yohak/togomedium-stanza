import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isMediaExpanded = atom<boolean>({ key: "isMediaExpanded", default: false });

export const useIsMediaExpendedState = () => {
  return useRecoilValue(isMediaExpanded);
};

export const useIsMediaExpandedMutators = () => {
  const setIsMediaExpanded = useSetRecoilState(isMediaExpanded);
  return { setIsMediaExpanded };
};
