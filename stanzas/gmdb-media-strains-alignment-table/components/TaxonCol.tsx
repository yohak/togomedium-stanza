import { css } from "@emotion/react";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { AcceptsEmotion, Ease } from "yohak-tools";
import { TaxonCell } from "./TaxonCell";
import { COLOR_GRAY_LINE, COLOR_WHITE } from "../../../shared/styles/variables";
import { capitalizeFirstLetter } from "../../../shared/utils/string";
import { CellInfo, LineageRank } from "../functions/types";
import { useFilterRankMutators } from "../states/filterRank";

type Props = {
  rank: LineageRank;
  taxonList: CellInfo[][];
} & AcceptsEmotion;

export const TaxonCol: FC<Props> = ({ css, className, rank, taxonList }) => {
  const { changeFilterRank } = useFilterRankMutators();
  const [isFolded, setIsFolded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickRank = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFolded((prev) => {
      const result = !prev;
      changeFilterRank(rank, result);
      return result;
    });
  };
  useEffect(() => {
    const isFolded = rank === "superkingdom" || rank === "phylum" || rank === "class";
    if (isFolded) {
      setIsFolded(true);
      changeFilterRank(rank, true);
    }
  }, []);
  useEffect(() => {
    if (!wrapperRef.current) return;
    setTimeout(() => {
      wrapperRef.current!.style.display = !isFolded ? "flex" : "none";
    }, 16);
  }, [isFolded]);
  return (
    <div css={[taxonCol, isFolded ? foldedStyle : null, css]} className={className}>
      {!isFolded && (
        <div css={rankCell} onClick={onClickRank}>
          {capitalizeFirstLetter(rank)}
        </div>
      )}
      <div css={allTaxonWrapper} ref={wrapperRef}>
        {taxonList.map((list, index) => (
          <div key={index} css={mediumTaxonWrapper}>
            {list.map((info, index) => (
              <TaxonCell
                key={index}
                {...info}
                rank={rank}
                actualSize={isFolded ? 1 : info.size}
                isFolded={isFolded}
              />
            ))}
          </div>
        ))}
      </div>
      {isFolded && (
        <div css={foldedCover} onClick={onClickRank}>
          <span>{capitalizeFirstLetter(rank)}</span>
        </div>
      )}
    </div>
  );
};

const taxonCol = css`
  width: 200px;
  //background-color: ${COLOR_GRAY_LINE};
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  height: 100%;
  min-height: ${48 + 24}px;
  transition-duration: 0.4s;
  transition-timing-function: ${Ease._4_IN_OUT_QUART};
  overflow: hidden;
`;
const foldedStyle = css`
  width: 36px;
`;
const foldedCover = css`
  width: 100%;
  height: 100%;
  background-color: ${COLOR_WHITE};
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 8px;
  padding-right: 8px;
  cursor: pointer;

  span {
    display: block;
    transform-origin: left top;
    transform: translateX(24px) rotate(90deg);
    font-weight: 600;
  }
`;
const rankCell = css`
  cursor: pointer;
  background-color: ${COLOR_WHITE};
  height: 24px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-weight: 600;
`;
const allTaxonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
`;
const mediumTaxonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-shrink: 0;
`;
