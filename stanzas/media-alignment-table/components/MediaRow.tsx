import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AlignmentCell } from "./AlignmentCell";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../components/consts";
import { COLOR_WHITE } from "../../../components/styles";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";
import { LabelInfo } from "../types";

type Props = {
  medium: LabelInfo;
  organisms: LabelInfo[];
  components: ComponentProps<typeof AlignmentCell>[];
};

export const MediaRow: FC<Props> = ({ medium, organisms, components }) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <div css={wrapper}>
      <InfoCell info={[medium]} expanded={isMediaExpanded} linkBase={PATH_MEDIUM} />
      <InfoCell info={organisms} expanded={isOrganismsExpanded} linkBase={PATH_ORGANISM} />
      {components.map((component) => (
        <AlignmentCell {...component} key={component.id} />
      ))}
      <div css={spacer} />
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const spacer = css`
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;
