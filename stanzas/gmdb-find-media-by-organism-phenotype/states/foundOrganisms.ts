import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { OrganismsByPhenotypesResponse } from "../../../api/organisms_by_phenotypes/types";
import { LabelInfo } from "../../../shared/utils/labelInfo";
import { MediaFinderListApiBody } from "../../../shared/utils/types";

export type FoundOrganisms = MediaFinderListApiBody<"tax_id" | "name">;
export const nullResponse: FoundOrganisms = {
  total: 0,
  limit: 10,
  contents: [],
  offset: 0,
};
const foundOrganisms = atom<FoundOrganisms>({
  key: "foundOrganisms",
  default: nullResponse,
});

export const useFoundOrganismsState = () => {
  return useRecoilValue(foundOrganisms);
};

export const useFoundOrganismsMutators = () => {
  const setFoundOrganisms = useSetRecoilState(foundOrganisms);
  return { setFoundOrganisms };
};
