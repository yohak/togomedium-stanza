import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { MediaByAttributesResponse } from "../../../api/media_by_attributes/types";
import { MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { LabelInfo } from "../../../utils/types";

export const nullResponse: FoundMedia = {
  queryType: "",
  response: { total: 0, limit: 10, contents: [], offset: 0 },
};

export type FoundMedia = {
  queryType: "taxon" | "attribute" | "";
  response: MediaByAttributesResponse & MediaByTaxonResponse;
};

const foundMedia = atom<FoundMedia>({
  key: "foundMedia",
  default: nullResponse,
});

export const useFoundMediaState = () => {
  return useRecoilValue(foundMedia);
};

export const useFoundMediaMutators = () => {
  const setFoundMedia = useSetRecoilState(foundMedia);
  return { setFoundMedia };
};
