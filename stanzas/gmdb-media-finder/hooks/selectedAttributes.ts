import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export type SelectedAttibutes = {
  gmo_ids: string[];
};
const selectedAttributes = atom<SelectedAttibutes>({
  key: "selectedAttributes",
  default: { gmo_ids: [] },
});

export const useSelectedAttributesState = () => {
  return useRecoilValue(selectedAttributes);
};

export const useSelectedAttributesMutators = () => {
  const setSelectedAttributes = useSetRecoilState(selectedAttributes);
  return { setSelectedAttributes };
};
