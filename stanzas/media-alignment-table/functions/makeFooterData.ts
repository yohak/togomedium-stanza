import { ComponentProps } from "react";
import { FooterCell } from "../components/FooterCell";
import { ComponentBranch, ComponentTree } from "../types";

type Props = ComponentProps<typeof FooterCell>;

export const makeFooterData = (data: ComponentTree): Props[] => {
  const result: Props[] = [];
  data.forEach((item) => {
    addToCollection(item, result);
  });
  return result;
};

const addToCollection = (data: ComponentBranch, collection: Props[]) => {
  collection.push({
    label: data.name,
    level: data.level,
    hasChildren: data.children.length > 0,
    isOpen: data.isOpen,
    id: data.id,
  });
  if (data.isOpen) {
    data.children.forEach((item) => {
      addToCollection(item, collection);
    });
  }
};
