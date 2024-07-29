import React, { FC } from "react";
import { ComponentSelect } from "./ComponentSelect";
import { useSelectedAttributesMutators } from "../states/selectedAttributes";

type Props = {};

export const AttributesSection: FC<Props> = () => {
  const { setSelectedAttributes } = useSelectedAttributesMutators();
  const onChangeSelection = (ids: string[]) => {
    setSelectedAttributes({ gmo_ids: ids });
  };

  return (
    <div>
      <ComponentSelect onChangeSelection={onChangeSelection} />
    </div>
  );
};
