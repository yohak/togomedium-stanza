import { findBranchFromTree } from "./findBranchFromTree";
import { ComponentTree } from "../types";
const clone = require("rfdc")();
export const toggleFooterComponent = (
  id: string,
  data: ComponentTree
): ComponentTree | undefined => {
  const cloned = clone(data);
  const branch = findBranchFromTree(id, cloned);
  if (branch) {
    branch.isOpen = !branch.isOpen;
    return cloned;
  } else {
    return undefined;
  }
};
