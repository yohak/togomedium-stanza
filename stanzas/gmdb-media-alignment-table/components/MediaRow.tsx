import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AlignmentCell } from "./AlignmentCell";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../shared/components/consts";
import { COLOR_WHITE } from "../../../shared/styles/variables";
import { LabelInfo } from "../../../shared/utils/labelInfo";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";

type Props = {
  medium: LabelInfo;
  organisms: LabelInfo[];
  components: ComponentProps<typeof AlignmentCell>[];
  prioritizedOrganism?: string[];
};

export const MediaRow: FC<Props> = ({
  medium,
  organisms,
  components,
  prioritizedOrganism = [],
}) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <div css={wrapper}>
      <InfoCell info={[medium]} expanded={isMediaExpanded} linkBase={PATH_MEDIUM} />
      <InfoCell
        info={organisms.length ? organisms : [{ id: "", label: "No organisms found" }]}
        expanded={isOrganismsExpanded}
        linkBase={PATH_ORGANISM}
        priority={prioritizedOrganism}
      />
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
