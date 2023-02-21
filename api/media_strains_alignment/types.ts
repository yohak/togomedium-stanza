import { Medium, Strain } from "../../stanzas/gmdb-media-strains-alignment/functions/types";

export type MediaStrainsAlimentResponse = {
  media: Medium[];
  strains: Strain[];
};
