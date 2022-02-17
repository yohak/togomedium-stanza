export type MediaByTaxonResponse = {
  gm_id: string;
  name: string;
}[];

export type MediaByTaxonParams = {
  tax_ids: string[];
};
