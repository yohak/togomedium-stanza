import React, { ComponentProps, FC, useEffect, useState } from "react";
import { Nullable } from "yohak-tools";
import { TreeBranchView } from "./TreeBranchView";

type Props = {};

type NodeProps = Omit<ComponentProps<typeof TreeBranchView>, "onToggleChildren" | "onClickCheck">;

type TreeData = {
  id: string;
  label: string;
  children: Nullable<TreeData[]>;
};

export const TaxonomicTree: FC<Props> = () => {
  const [data, setData] = useState<NodeProps[]>([]);
  const onClickCheck = (id: string) => {};
  const onToggleChildren = (id: string) => {};

  useEffect(() => {});

  return (
    <div>
      {data.map((item) => (
        <TreeBranchView key={item.id} {...{ ...item, onClickCheck, onToggleChildren }} />
      ))}
    </div>
  );
};
