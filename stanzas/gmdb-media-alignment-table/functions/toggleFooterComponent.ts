import { Optional } from "yohak-tools";
import { clone } from "../../../shared/utils/clone";
import { findBranchFromTrunk } from "../../../shared/utils/findBranchFromTrunk";
import { ComponentTrunk } from "../types";

export const toggleFooterComponent = (
  id: string,
  data: ComponentTrunk
): Optional<ComponentTrunk> => {
  const cloned = clone(data);
  const branch = findBranchFromTrunk(id, cloned);
  if (branch) {
    branch.isOpen = !branch.isOpen;
    return cloned;
  } else {
    return undefined;
  }
};
