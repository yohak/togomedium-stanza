import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const organismTabNames = ["Found organisms", "Selected organisms"] as const;
export type OrganismTabName = typeof organismTabNames[number];
const organismTabFocus = atom<OrganismTabName>({
  key: "organismTabFocus",
  default: "Found organisms",
});

export const useOrganismTabFocusState = () => {
  return useRecoilValue(organismTabFocus);
};

export const useOrganismTabFocusMutators = () => {
  const setOrganismTabFocus = useSetRecoilState(organismTabFocus);
  return { setOrganismTabFocus };
};
