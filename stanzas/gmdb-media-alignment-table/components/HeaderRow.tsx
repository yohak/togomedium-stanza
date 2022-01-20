import { css } from "@emotion/react";
import React, { FC } from "react";
import { HeaderCell } from "./HeaderCell";
import { COLOR_WHITE, SIZE1 } from "../../../components/styles";
import { Layout } from "../../../utils/types";
import { useIsMediaExpandedMutators, useIsMediaExpendedState } from "../states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "../states/isOrganismsExpanded";

type Props = {} & Layout;

export const HeaderRow: FC<Props> = ({ extraCSS }) => {
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
    <div css={[wrapper, extraCSS]}>
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
