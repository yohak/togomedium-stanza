import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";

export type LabelInfo = {
  label: string;
  id: string;
};

export type ComponentTree = ComponentBranch[];
export type ComponentBranch = {
  name: string;
  id: string;
  level: number;
  parent: string | null;
  children: ComponentBranch[];
  isOpen: boolean;
  func: string | null;
};
export type RawComponent = MediaAlignmentTableResponse["components"][0];
