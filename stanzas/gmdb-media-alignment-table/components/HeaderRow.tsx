import { css } from "@emotion/react";
import React, { FC } from "react";
import { HeaderCell } from "./HeaderCell";
import { COLOR_WHITE, SIZE1 } from "../../../shared/components/styles";
import { AcceptsEmotion } from "../../../shared/utils/types";
import { useIsMediaExpandedMutators, useIsMediaExpendedState } from "../states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "../states/isOrganismsExpanded";

type Props = {} & AcceptsEmotion;

export const HeaderRow: FC<Props> = ({ css, className }) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();

  const onClickMediaExpandIcon = () => {
    setIsMediaExpanded(!isMediaExpanded);
  };
  const onClickOrganismExpandIcon = () => {
    setIsOrganismsExpanded(!isOrganismsExpanded);
  };

  return (
    <div css={[wrapper, css]} className={className}>
      <HeaderCell
        label={"Media"}
        isExpanded={isMediaExpanded}
        onClickIcon={onClickMediaExpandIcon}
      />
      <HeaderCell
        label={"Organisms"}
        isExpanded={isOrganismsExpanded}
        onClickIcon={onClickOrganismExpandIcon}
      />
      <div css={components}>Components</div>
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

const components = css`
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  padding: ${SIZE1};
  flex-grow: 1 !important;
`;
