import { MediaFinderListApiBody } from "../../shared/utils/types";

export type MediaByAttributesResponse = MediaFinderListApiBody<"gm_id" | "name">;

export type MediaByAttributesParams = {
  gmo_ids: string[];
  limit: number;
  offset: number;
};
