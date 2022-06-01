export type MediaByAttributesResponse = {
  total: number;
  offset: number;
  limit: number;
  contents: {
    gm_id: string;
    name: string;
  }[];
};

export type MediaByAttributesParams = {
  gmo_ids: string[];
  limit: number;
  offset: number;
};
