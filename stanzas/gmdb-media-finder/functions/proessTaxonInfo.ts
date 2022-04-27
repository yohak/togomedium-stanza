import { isArray } from "yohak-tools/";
import { API_TAXONOMY_CHILDREN } from "../../../api/paths";
import {
  TaxonomyChildrenParams,
  TaxonomyChildrenResponse,
} from "../../../api/taxonomy_children/types";
import { getData } from "../../../utils/getData";
import { TaxonInfo } from "../states/taxonList";

export const retrieveTaxonInfo = (
  info: TaxonInfo,
  addTaxonToList: (info: TaxonInfo) => void,
  setTaxonChildren: (id: string, children: string[]) => void
) => {
  (async () => {
    const params: TaxonomyChildrenParams = {
      tax_id: info.id,
    };
    // console.log(info.id);
    const response = await getData<TaxonomyChildrenResponse, TaxonomyChildrenParams>(
      API_TAXONOMY_CHILDREN,
      params
    );

    setTaxonChildren(info.id, response?.body?.map((item) => item.tax_id) ?? []);
    response?.body?.forEach((item) => {
      addTaxonToList({
        id: item.tax_id,
        label: item.name,
        rank: item.rank,
        children: item.rank === "Species" ? [] : "not-yet",
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
    const parent = findParent(list, currentId);
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
  const process = (currentId: string) => {
    const children = findChildren(list, currentId);
    if (children && isArray(children)) {
      result = [...result, ...children];
      children.forEach((childId) => process(childId));
    }
  };
  process(id);
  return result;
};

export const makeNewSelection = (list: Node[], id: string, selection: string[]): string[] => {
  const isSelected: boolean = checkIsSelected(id, selection);
  let result = setSelection(selection, id, !isSelected);
  let currentId: string;
  const ascendants = findAscendants(list, id).reverse();
  const descendants = findDescendants(list, id);
  if (descendants) {
    result = setMultipleSelection(result, descendants, false);
  }

  //
  const checkedAscendant = ascendants.find((ascendant) => result.includes(ascendant));
  if (checkedAscendant) {
    currentId = id;
    for (let i = 0; i < ascendants.length; i++) {
      const parent = ascendants[i];
      result = setSelection(result, parent, false);
      const siblings = findSiblings(list, currentId);
      result = setMultipleSelection(result, siblings, true);
      result = setSelection(result, currentId, false);
      if (checkedAscendant === parent) {
        break;
      }
      currentId = parent;
    }
  }

  currentId = id;
  for (let i = 0; i < ascendants.length; i++) {
    const parent = ascendants[i];
    const siblings = [...findSiblings(list, currentId), currentId];
    const checkedSiblings = siblings.filter((siblingId) => result.includes(siblingId));
    if (parent && checkedSiblings.length && checkedSiblings.length === siblings.length) {
      result = setMultipleSelection(result, checkedSiblings, false);
      result = setSelection(result, parent, true);
    }
    currentId = parent;
  }

  return result;
};

const checkIsSelected = (id: string, selection: string[]): boolean => {
  return selection.includes(id);
};

const setSelection = (selection: string[], id: string, value: boolean): string[] => {
  const isSelected: boolean = checkIsSelected(id, selection);
  switch (true) {
    case isSelected && !value:
      return selection.filter((item) => item !== id);
    case !isSelected && value:
      return [...selection, id];
    default:
      return [...selection];
  }
};

const setMultipleSelection = (selection: string[], ids: string[], value: boolean): string[] => {
  let result = [...selection];
  ids.forEach((id) => (result = setSelection(result, id, value)));
  return result;
};

const findChildren = (list: Node[], id: string) => list.find((info) => info.id === id)?.children;
const findParent = (list: Node[], id: string) => list.find((node) => node.children?.includes(id));
const findSiblings = (list: Node[], id: string): string[] => {
  const children = findParent(list, id)?.children;
  if (children && isArray(children)) {
    return children.filter((myId) => myId !== id);
  } else {
    return [];
  }
};
