import React, { FC } from "react";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../components/consts";
import { LabelInfo } from "../types";

type Props = {
  media: LabelInfo;
  organisms: LabelInfo[];
  components: {}[];
};

export const MediaRow: FC<Props> = ({ media, organisms }) => {
  return (
    <div>
      <InfoCell info={[media]} expanded={false} linkBase={PATH_MEDIUM} />
      <InfoCell info={organisms} expanded={false} linkBase={PATH_ORGANISM} />
    </div>
  );
};
