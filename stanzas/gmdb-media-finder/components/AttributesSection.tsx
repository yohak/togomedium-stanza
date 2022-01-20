import React, { FC } from "react";
import { ComponentSelect } from "./ComponentSelect";

type Props = {};

export const AttributesSection: FC<Props> = () => {
  const onChangeSelection = (ids: string[]) => {
    console.log(ids);
  };
  return (
    <div>
      <ComponentSelect onChangeSelection={onChangeSelection} />
    </div>
  );
};
