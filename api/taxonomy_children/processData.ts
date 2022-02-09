import { Nullable } from "yohak-tools";
import { fullData } from "./data";
import { TempTaxonInfo, TaxonomyChildrenResponse } from "./types";

export const processData = (id: string): TaxonomyChildrenResponse => {
  const foundInfo = search([fullData], id);
  if (!foundInfo || !foundInfo.children) return [];
  return foundInfo.children.map((item) => ({
    tax_id: item.id,
    name: item.name,
    rank: item.rank,
  }));
};

const search = (tree: TempTaxonInfo[], id: string): Nullable<TempTaxonInfo> => {
  if (tree.length < 0) return null;
  const stack = [tree[0]];
  while (stack.length) {
    const node = stack.shift();
    if (!node) return null;
    if (node.id === id) return node;
    node.children && stack.push(...node.children);
  }
  return null;
};
