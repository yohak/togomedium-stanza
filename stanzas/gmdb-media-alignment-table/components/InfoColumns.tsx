import { css } from "@emotion/react";
import React, { FC } from "react";
import { HeaderCell } from "./HeaderCell";
import { MediaRow } from "./MediaRow";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE, COLOR_WHITE } from "../../../components/styles";
import { AcceptsEmotion } from "../../../utils/types";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";
import { useIsMediaExpandedMutators, useIsMediaExpendedState } from "../states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "../states/isOrganismsExpanded";

type Props = { data: MediaAlignmentTableResponse } & AcceptsEmotion;

export const InfoColumns: FC<Props> = ({ data, css, className }) => {
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
      <div css={header}>
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
      </div>
      {data.media.map((m) => {
        const organisms = m.organisms.map((taxid) => {
          const organism = data.organisms.find((o) => o.tax_id === taxid);
          const id: string = organism ? organism.tax_id : "";
          const label: string = organism ? organism.name : "";
          return { id, label };
        });
        return (
          <MediaRow
            key={m.gm_id}
            medium={{ id: m.gm_id, label: m.name }}
            organisms={organisms}
            components={[]}
          />
        );
      })}
      <div css={spacerRow}>
        <span css={spacer} className={isMediaExpanded ? "expanded" : "compact"} />
        <span css={spacer} className={isOrganismsExpanded ? "expanded" : "compact"} />
      </div>
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
  height: 100%;
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
`;
const header = css`
  width: fit-content;
  display: flex;
  gap: 1px;
`;
const spacerRow = css`
  flex-grow: 1;
  gap: 1px;
  display: flex;
`;

const spacer = css`
  background-color: ${COLOR_WHITE};
  //flex-grow: 1;
  &.expanded {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;
