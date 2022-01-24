import { Optional } from "yohak-tools";
import { findBranchFromTree } from "./findBranchFromTree";
import { clone } from "../../../utils/clone";
import { ComponentTree } from "../types";

export const toggleFooterComponent = (id: string, data: ComponentTree): Optional<ComponentTree> => {
  const cloned = clone(data);
  const branch = findBranchFromTree(id, cloned);
  if (branch) {
    branch.isOpen = !branch.isOpen;
    return cloned;
  } else {
    return undefined;
  }
};
