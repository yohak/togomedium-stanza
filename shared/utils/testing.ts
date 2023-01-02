import { RawComponent } from "../../stanzas/gmdb-media-alignment-table/types";

export const makeRawComponent = (id: string, parent: string | null = null): RawComponent => {
  return {
    gmo_id: id,
    name: id,
    parent,
    function: null,
  };
};
