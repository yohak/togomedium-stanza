import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { MediaCol } from "./MediaCol";
import { TaxonCol } from "./TaxonCol";
import { MediaStrainsAlimentResponse } from "../../../api/media_strains_alignment/types";
import { COLOR_GRAY_LINE } from "../../../shared/styles/variables";
import { processDisplayData } from "../functions/processMediaCell";
import { DisplayData, lineageRanks } from "../functions/types";
import { useFilterRankState } from "../states/filterRank";
import { useFilterTaxonState } from "../states/filterTaxon";

type Props = { data?: MediaStrainsAlimentResponse } & AcceptsEmotion;

export const AppContainer: FC<Props> = ({ data }) => {
  const [displayData, setDisplayData] = useState<Optional<DisplayData>>(undefined);
  const filterTaxon = useFilterTaxonState();
  const filterRank = useFilterRankState();
  useEffect(() => {
    if (data) {
      setDisplayData(processDisplayData(data, filterTaxon, filterRank));
    }
  }, [data, filterTaxon, filterRank]);
  useEffect(() => {}, [displayData]);
  return displayData ? (
    <div css={appContainer}>
      <MediaCol mediaList={displayData.media} />
      <div css={taxonContainer}>
        {lineageRanks
          .concat()
          .reverse()
          .map((rank, index) => (
            <TaxonCol rank={rank} taxonList={displayData.taxon[rank]} key={index} />
          ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

const appContainer = css`
  display: flex;
  gap: 2px;
  padding: 1px;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
`;
const taxonContainer = css`
  display: flex;
  gap: 1px;
`;
