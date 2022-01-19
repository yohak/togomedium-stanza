import { Nullable } from "yohak-tools";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";

export type ComponentTree = ComponentBranch[];
export type ComponentBranch = {
  name: string;
  id: string;
  level: number;
  parent: Nullable<string>;
  children: ComponentBranch[];
  isOpen: boolean;
  func: Nullable<string>;
};
export type RawComponent = MediaAlignmentTableResponse["components"][0];
export type RawMedium = MediaAlignmentTableResponse["media"][0];
export type RawOrganism = MediaAlignmentTableResponse["organisms"][0];
