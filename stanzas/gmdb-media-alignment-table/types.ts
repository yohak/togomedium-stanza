import { Nullable } from "yohak-tools";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";
import { TreeBranch } from "../../utils/types";

export type ComponentTrunk = ComponentBranch[];
export type ComponentBranch = {
  parent: Nullable<string>;
  isOpen: boolean;
  func: Nullable<string>;
} & TreeBranch;
export type RawComponent = MediaAlignmentTableResponse["components"][0];
export type RawMedium = MediaAlignmentTableResponse["media"][0];
export type RawOrganism = MediaAlignmentTableResponse["organisms"][0];
