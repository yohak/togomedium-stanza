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
    parent: string | null;
    function: string | null;
  }[];
};
