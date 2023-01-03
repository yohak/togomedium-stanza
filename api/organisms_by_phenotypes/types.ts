import { MediaFinderListApiBody } from "../../shared/utils/types";

export type OrganismsByPhenotypesResponse = MediaFinderListApiBody<"tax_id" | "name">;
export type OrganismsByPhenotypeParams = {
  limit: number;
  offset: number;
  [key: string]: string | number;
};
