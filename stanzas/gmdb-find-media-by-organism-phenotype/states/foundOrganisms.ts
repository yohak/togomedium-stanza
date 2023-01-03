import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { OrganismsByPhenotypesResponse } from "../../../api/organisms_by_phenotypes/types";
import { LabelInfo } from "../../../shared/utils/labelInfo";

export const nullResponse: OrganismsByPhenotypesResponse = {
  total: 0,
  limit: 10,
  contents: [],
  offset: 0,
};
const foundOrganisms = atom<FoundOrganisms>({
  key: "foundOrganisms",
  default: nullResponse,
});

export type FoundOrganisms = OrganismsByPhenotypesResponse;

export const useFoundOrganismsState = () => {
  return useRecoilValue(foundOrganisms);
};

export const useFoundOrganismsMutators = () => {
  const setFoundOrganisms = useSetRecoilState(foundOrganisms);
  return { setFoundOrganisms };
};
