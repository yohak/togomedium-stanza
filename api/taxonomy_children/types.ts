export type TempTaxonInfo = {
  id: string;
  name: string;
  rank: string;
  children?: TempTaxonInfo[];
};

export type TaxonomyChildrenResponse = { tax_id: string; name: string; rank: string }[];

export type TaxonomyChildrenParams = {
  tax_id: string;
};
