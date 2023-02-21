import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { FilterIcon } from "../../../shared/components/svg/FilterIcon";
import { COLOR_GRAY400, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { makeSpeciesName } from "../../../shared/utils/string";
import { makeCellHeight } from "../functions/processMediaCell";
import { CellInfo, LineageRank } from "../functions/types";
import { useFilterIdMutators, useFilterIdState } from "../states/filterId";

type Props = { rank: LineageRank } & CellInfo & AcceptsEmotion;

export const TaxonCell: FC<Props> = ({ label, id, size, rank, css, className }) => {
  const filterId = useFilterIdState();
  const { setFilterId } = useFilterIdMutators();
  const onClickFilter = () => {
    setFilterId(id);
  };
  return (
    <div
      css={[taxonCell, css]}
      className={className}
      style={{ height: `${makeCellHeight(size)}px` }}
    >
      {!!label && (
        <>
          <a href={`/taxon/${id}`}>{id}</a>
          <span>{makeLabel(label, rank)}</span>
          <span css={filterIcon} onClick={onClickFilter}>
            <FilterIcon css={[id === filterId ? filterIconColorActive : filterIconColorInactive]} />
          </span>
        </>
      )}
    </div>
  );
};

const makeLabel = (label: string, rank: LineageRank): string => {
  switch (rank) {
    case "species":
      return makeSpeciesName(label);
    default:
      return label;
  }
};

const taxonCell = css`
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_WHITE};
  padding: 8px 8px 0;
  font-size: 14px;

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    width: fit-content;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;

const filterIcon = css`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  svg {
    display: block;
    width: 16px;
    height: 16px;
  }
`;

const filterIconColorInactive = css`
  fill: ${COLOR_GRAY400};
`;
const filterIconColorActive = css`
  fill: ${COLOR_PRIMARY};
`;
