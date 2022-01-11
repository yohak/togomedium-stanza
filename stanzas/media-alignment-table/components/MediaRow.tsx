import { css } from "@emotion/react";
import React, { FC } from "react";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../components/consts";
import { LabelInfo } from "../types";

type Props = {
  media: LabelInfo;
  organisms: LabelInfo[];
  components: {}[];
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
};

export const MediaRow: FC<Props> = ({ media, organisms, isMediaExpanded, isOrganismsExpanded }) => {
  return (
    <div css={wrapper}>
      <InfoCell info={[media]} expanded={isMediaExpanded} linkBase={PATH_MEDIUM} />
      <InfoCell info={organisms} expanded={isOrganismsExpanded} linkBase={PATH_ORGANISM} />
    </div>
  );
};

const wrapper = css`
  display: table-row;
  gap: 1px;
`;
