import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismList } from "./OrganismList";
import { PhenotypeSearchArea } from "./PhenotypeSearchArea";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import {
  COLOR_GRAY_LINE,
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  SIZE1,
  SIZE2,
} from "../../../components/styles";
import { getData } from "../../../utils/getData";
import { LabelInfo } from "../../../utils/types";
import { useFoundMediaMutators } from "../states/foundMedia";
import { useFoundOrganismsState } from "../states/foundOrganisms";
import { useMediaLoadAbortMutators } from "../states/mediaLoadAbort";
import { useIsOrganismLoading } from "../states/organismLoadAbort";
import { useQueryDataMutators } from "../states/queryData";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

export const PhenotypeSection: FC<Props> = ({ css, className }) => {
  const foundOrganism = useFoundOrganismsState();
  const isLoading = useIsOrganismLoading();
  useMediaLoadFromOrganism();
  //
  return (
    <div css={[phenotypeSection, css]} className={className}>
      <div css={phenotypes}>
        <PhenotypeSearchArea />
      </div>
      <div css={organisms}>
        <p css={infoTextCSS}>{getInfoText(foundOrganism.length, isLoading)}</p>
        <OrganismList />
      </div>
    </div>
  );
};

const phenotypeSection = css`
  background-color: ${COLOR_WHITE};
  display: flex;
`;

const phenotypes = css`
  max-width: 50%;
  flex-grow: 1;
  border-right-color: ${COLOR_GRAY_LINE};
  border-right-style: dashed;
  border-right-width: 2px;
  padding: ${SIZE2};
`;
const organisms = css`
  max-width: 50%;
  flex-grow: 1;
  padding: ${SIZE2};
`;

const infoTextCSS = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-bottom: ${SIZE1};
`;

const getInfoText = (organismLength: number, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (organismLength === 0) {
    return "No organisms found";
  } else if (organismLength === 1) {
    return "1 organism found";
  } else {
    return `${organismLength} organisms found`;
  }
};

const useMediaLoadFromOrganism = () => {
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  useEffect(() => {
    if (selectedOrganisms.length === 0) {
      setQueryData({});
      setFoundMedia([]);
      setNextMediaLoadAbort(null);
      return;
    }
    (async () => {
      const params: MediaByTaxonParams = { tax_ids: selectedOrganisms };
      setQueryData(params);
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
        API_MEDIA_BY_TAXON,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia(
          response.body.map<LabelInfo>((item) => ({
            id: item.gm_id,
            label: item.name,
          }))
        );
      }
    })();
  }, [selectedOrganisms]);
};
