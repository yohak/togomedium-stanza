import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { FoundOrganismsList } from "./FoundOrganismsList";
import { OrganismTab } from "./OrganismTab";
import { SelectedOrganismsList } from "./SelectedOrganismsList";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../../../shared/styles/variables";
import { useOrganismPaginationMutators } from "../states/organismPagination";
import { useOrganismTabFocusMutators, useOrganismTabFocusState } from "../states/organismTabFocus";
import { usePhenotypeQueryState } from "../states/phenotypeQuery";

type Props = {} & AcceptsEmotion;

export const OrganismPane: FC<Props> = ({ css, className }) => {
  const tabFocus = useOrganismTabFocusState();
  const { reset } = useOrganismPaginationMutators();
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const phenotypeQueryParams = usePhenotypeQueryState();
  useEffect(() => {
    reset();
    setOrganismTabFocus("Found organisms");
  }, [phenotypeQueryParams]);
  return (
    <div css={[wrapper, css]} className={className}>
      <OrganismTab />
      <div css={contents}>
        {tabFocus === "Found organisms" && <FoundOrganismsList />}
        {tabFocus === "Selected organisms" && <SelectedOrganismsList />}
      </div>
    </div>
  );
};

const wrapper = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
`;

const contents = css`
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;
