export type LabelInfo = {
  label: string;
  id: string;
};

export type ComponentTree = ComponentBranch[];
export type ComponentBranch = {
  name: string;
  id: string;
  level: number;
  children: ComponentBranch[];
};
