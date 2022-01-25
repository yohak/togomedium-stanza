export type TaxonInfo = {
  id: string;
  name: string;
  rank?: string;
  children?: TaxonInfo[];
};

export type TaxonomyChildrenResponse = {
  tax_id: string;
  name: string;
}[];

export type TaxonomyChildrenParams = {
  tax_id: string;
};
