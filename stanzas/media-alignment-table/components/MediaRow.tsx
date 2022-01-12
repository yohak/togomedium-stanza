import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AlignmentCell } from "./AlignmentCell";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../components/consts";
import { COLOR_WHITE } from "../../../components/styles";
import { LabelInfo } from "../types";

type Props = {
  media: LabelInfo;
  organisms: LabelInfo[];
  components: ComponentProps<typeof AlignmentCell>[];
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
};

export const MediaRow: FC<Props> = ({
  media,
  organisms,
  components,
  isMediaExpanded,
  isOrganismsExpanded,
}) => {
  return (
    <div css={wrapper}>
      <InfoCell info={[media]} expanded={isMediaExpanded} linkBase={PATH_MEDIUM} />
      <InfoCell info={organisms} expanded={isOrganismsExpanded} linkBase={PATH_ORGANISM} />
      {components.map((component) => (
        <AlignmentCell {...component} key={component.id} />
      ))}
      <div css={spacer} />
    </div>
  );
};

const wrapper = css`
  display: table-row;
  gap: 1px;
`;

const spacer = css`
  display: table-cell;
  background-color: ${COLOR_WHITE};
  width: 100%;
`;
