export type OrganismsByPhenotypesResponse = {
  total: number;
  offset: number;
  limit: number;
  contents: {
    tax_id: string;
    name: string;
  }[];
};
export type OrganismsByPhenotypeParams = {
  limit: number;
  offset: number;
  [key: string]: string | number;
};
