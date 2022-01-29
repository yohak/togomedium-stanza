import { TreeBranch } from "./types";

export const findBranchFromTrunk = <Branch extends TreeBranch>(
  id: string,
  tree: Branch[]
): Branch | undefined => {
  return tree.map((branch) => findNode(id, branch)).find((r) => !!r);
};

// https://stackoverflow.com/a/22222867/2207021
function findNode<Branch extends TreeBranch>(id: string, currentNode: Branch): Branch | undefined {
  let i, currentChild, result;
  if (id == currentNode.id) {
    return currentNode;
  } else {
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i];
      result = findNode(id, currentChild);
      if (result !== undefined) {
        return result as Branch;
      }
    }
    return undefined;
  }
}
