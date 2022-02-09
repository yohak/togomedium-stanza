import { API_TAXONOMY_CHILDREN } from "../../../api/paths";
import {
  TaxonomyChildrenParams,
  TaxonomyChildrenResponse,
} from "../../../api/taxonomy_children/types";
import { getData } from "../../../utils/getData";
import { TaxonInfo } from "../states/taxonList";

export const retrieveTaxonInfo = (info: TaxonInfo, addTaxonToList: (info: TaxonInfo) => void) => {
  (async () => {
    const params: TaxonomyChildrenParams = {
      tax_id: info.id,
    };
    const response = await getData<TaxonomyChildrenResponse, TaxonomyChildrenParams>(
      API_TAXONOMY_CHILDREN,
      params
    );
    addTaxonToList({ ...info, children: response?.body?.map((item) => item.tax_id) ?? [] });
    response?.body?.forEach((item) => {
      addTaxonToList({
        id: item.tax_id,
        label: item.name,
        rank: item.rank,
        children: item.rank === "Species" ? [] : null,
      });
    });
  })();
};
