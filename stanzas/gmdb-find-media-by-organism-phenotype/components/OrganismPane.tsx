import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { FoundOrganismsList } from "./FoundOrganismsList";
import { OrganismTab } from "./OrganismTab";
import { SelectedOrganismsList } from "./SelectedOrganismsList";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../../../shared/styles/variables";
import { useFoundOrganismsState } from "../states/foundOrganisms";
import { useOrganismTabFocusMutators, useOrganismTabFocusState } from "../states/organismTabFocus";

type Props = {} & AcceptsEmotion;

export const OrganismPane: FC<Props> = ({ css, className }) => {
  const tabFocus = useOrganismTabFocusState();
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

const useTabFocus = () => {
  const tabFocus = useOrganismTabFocusState();
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const foundOrganisms = useFoundOrganismsState();
  useEffect(() => {
    setOrganismTabFocus("Found organisms");
  }, [foundOrganisms]);

  return { tabFocus };
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
