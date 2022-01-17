import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { ComponentBranch, ComponentTree, RawComponent } from "../types";

export const makeComponentTree = (components: RawComponent[]): ComponentTree => {
  const items: ComponentTree = components.map((item) => ({
    name: item.name,
    id: item.gmoid,
    level: 0,
    parent: item.parent,
    children: [],
    isOpen: false,
    func: item.function,
  }));

  const result = items.filter((item) => !item.parent);
  items.forEach(
    (item) => (item.children = items.filter((filtering) => filtering.parent === item.id))
  );
  items.forEach((item) => (item.level = getItemLevel(item, items)));
  return result;
};

const getItemLevel = (item: ComponentBranch, items: ComponentBranch[]): number => {
  let parent: ComponentBranch | undefined = item;
  let level: number = -1;
  do {
    level++;
    parent = items.find((found) => found.id === parent!.parent);
  } while (parent);

  return level;
};
