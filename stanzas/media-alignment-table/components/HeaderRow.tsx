import { css } from "@emotion/react";
import React, { FC } from "react";
import { HeaderCell } from "./HeaderCell";
import { COLOR_WHITE, FONT_DEFAULT, SIZE1 } from "../../../components/styles";
import { useIsMediaExpandedMutators, useIsMediaExpendedState } from "../states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "../states/isOrganismsExpanded";

type Props = {};

export const HeaderRow: FC<Props> = () => {
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();

  const onClickMediaExpand = () => {
    setIsMediaExpanded(!isMediaExpanded);
  };
  const onClickOrganismExpand = () => {
    setIsOrganismsExpanded(!isOrganismsExpanded);
  };

  return (
    <div css={wrapper}>
      <HeaderCell label={"Media"} isExpanded={isMediaExpanded} onClickIcon={onClickMediaExpand} />
      <HeaderCell
        label={"Organisms"}
        isExpanded={isOrganismsExpanded}
        onClickIcon={onClickOrganismExpand}
      />
      <div css={components}>Components</div>
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  width: 100%;
`;

const components = css`
  ${FONT_DEFAULT};
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  padding: ${SIZE1}px;
  flex-grow: 1;
`;
