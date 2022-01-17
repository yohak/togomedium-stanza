import { ComponentBranch, ComponentTree } from "../types";

export const findBranchFromTree = (
  id: string,
  tree: ComponentTree
): ComponentBranch | undefined => {
  return tree.map((branch) => findNode(id, branch)).find((r) => !!r);
};

type Node = { id: string | number; children: Node[] };
// https://stackoverflow.com/a/22222867/2207021
function findNode<T extends Node>(id: string, currentNode: T): T | undefined {
  let i, currentChild, result;
  if (id == currentNode.id) {
    return currentNode;
  } else {
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i];
      result = findNode(id, currentChild);
      if (result !== undefined) {
        return result as T;
      }
    }
    return undefined;
  }
}
