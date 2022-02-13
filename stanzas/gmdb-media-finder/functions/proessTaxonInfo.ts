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

type Node = Pick<TaxonInfo, "id" | "children">;
export const findAscendants = (list: Node[], id: string): string[] => {
  let iterationCount = 0;
  const result = [];
  let currentId = id;
  while (iterationCount < 255) {
    iterationCount++;
    const parent = list.find((node) => node.children?.includes(currentId));
    if (parent) {
      result.unshift(parent.id);
      currentId = parent.id;
    } else {
      break;
    }
  }
  return result;
};

export const findDescendants = (list: Node[], id: string): string[] => {
  let result: string[] = [];
  const findChildren = (targetId: string) => list.find((info) => info.id === targetId)?.children;
  const process = (currentId: string) => {
    const children = findChildren(currentId);
    if (children) {
      result = [...result, ...children];
      children.forEach((childId) => process(childId));
    }
  };
  process(id);
  return result;
};

export const findSiblings = (list: Node[], id: string): string[] => {
  const children = list.find((node) => node.children?.includes(id))?.children;
  if (children) {
    return children.filter((myId) => myId !== id);
  } else {
    return [];
  }
};
