import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const isOrganismsExpanded = atom<boolean>({ key: "isOrganismsExpanded", default: false });

export const useIsOrganismsExpendedState = () => {
  return useRecoilValue(isOrganismsExpanded);
};

export const useIsOrganismsExpandedMutators = () => {
  const setIsOrganismsExpanded = useSetRecoilState(isOrganismsExpanded);
  return { setIsOrganismsExpanded };
};
