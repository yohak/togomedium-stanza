import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import React, { FC, useEffect, useMemo } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { useToolTipEnabled } from "./MediaCell";
import { FilterIcon } from "../../../shared/components/svg/FilterIcon";
import { COLOR_GRAY400, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { makeSpeciesName } from "../../../shared/utils/string";
import { makeCellHeight } from "../functions/processMediaCell";
import { CellInfo, LineageRank } from "../functions/types";
import { useFilterTaxonMutators, useFilterTaxonState } from "../states/filterTaxon";

type Props = { rank: LineageRank; isFolded: boolean } & CellInfo & AcceptsEmotion;
type ToMemoizeProps = Props & { wrapperRef: React.RefObject<HTMLDivElement> };

export const TaxonCell: FC<Props> = (props) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    const size = props.isFolded ? 1 : props.size;
    wrapperRef.current.style.height = makeCellHeight(size) + "px";
    // console.log("set height", size, props.id, props.isFolded);
  }, [props.size, props.isFolded]);
  return useMemo(() => <ToMemoize {...props} wrapperRef={wrapperRef} />, []);
};

const ToMemoize: FC<ToMemoizeProps> = ({ wrapperRef, label, id, rank, css, className }) => {
  const filterId = useFilterTaxonState();
  const pathRoot = rank === "strain" ? "/strain/" : "/taxon/";
  const { setFilterTaxon } = useFilterTaxonMutators();
  const onClickFilter = () => {
    setFilterTaxon(id);
  };
  const { labelRef, toolTipEnabled } = useToolTipEnabled();
  // console.log("render TaxonCell", rank, size);
  return (
    <div css={[taxonCell, css]} className={className} ref={wrapperRef}>
      {!!label && (
        <>
          <a href={`${pathRoot}${id}`}>{id}</a>
          <div className={"label-wrapper"}>
            <Tooltip
              title={makeLabel(label, rank)}
              placement={"top"}
              PopperProps={{ disablePortal: true }}
              arrow
              disableHoverListener={!toolTipEnabled}
            >
              <span className={"label"} ref={labelRef}>
                {makeLabel(label, rank)}
              </span>
            </Tooltip>
          </div>
          <span css={filterIcon} onClick={onClickFilter}>
            <FilterIcon css={[id === filterId ? filterIconColorActive : filterIconColorInactive]} />
          </span>
        </>
      )}
      {!label && <>{""}</>}
    </div>
  );
};

const makeLabel = (label: string, rank: LineageRank): string => {
  switch (rank) {
    case "strain":
      return makeSpeciesName(label);
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

  .label-wrapper {
    position: relative;
  }
  .label {
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
