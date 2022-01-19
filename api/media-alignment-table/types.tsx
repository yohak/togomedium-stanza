import { Nullable } from "yohak-tools";

export type MediaAlignmentTableResponse = {
  media: {
    gmid: string;
    name: string;
    components: string[];
    organisms: string[];
  }[];
  organisms: {
    taxid: string;
    name: string;
  }[];
  components: {
    gmoid: string;
    name: string;
    parent: Nullable<string>;
    function: Nullable<string>;
  }[];
};
