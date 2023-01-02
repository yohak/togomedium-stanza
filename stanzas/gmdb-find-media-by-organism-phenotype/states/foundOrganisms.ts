import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { OrganismsByPhenotypesResponse } from "../../../api/organisms_by_phenotypes/types";
import { LabelInfo } from "../../../shared/utils/types";

export const nullResponse: FoundOrganisms = {
  response: { total: 0, limit: 10, contents: [], offset: 0 },
};
const foundOrganisms = atom<FoundOrganisms>({
  key: "foundOrganisms",
  default: nullResponse,
});

export type FoundOrganisms = {
  response: OrganismsByPhenotypesResponse;
};

export const useFoundOrganismsState = () => {
  return useRecoilValue(foundOrganisms);
};

export const useFoundOrganismsMutators = () => {
  const setFoundOrganisms = useSetRecoilState(foundOrganisms);
  return { setFoundOrganisms };
};
