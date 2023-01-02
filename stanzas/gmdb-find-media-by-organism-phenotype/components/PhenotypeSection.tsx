import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismList } from "./OrganismList";
import { PhenotypeSearchArea } from "./PhenotypeSearchArea";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import {
  OrganismsByPhenotypeParams,
  OrganismsByPhenotypesResponse,
} from "../../../api/organisms_by_phenotypes/types";
import { API_MEDIA_BY_TAXON, API_ORGANISMS_BY_PHENOTYPES } from "../../../api/paths";
import { Pagination } from "../../../components/media-finder/Pagination";
import {
  COLOR_GRAY_LINE,
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  SIZE1,
  SIZE2,
} from "../../../components/styles";
import { nullResponse, useFoundMediaMutators } from "../../../shared/state/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/mediaLoadAbort";
import { useQueryDataMutators } from "../../../shared/state/queryData";
import { getData } from "../../../utils/getData";
import {
  FoundOrganisms,
  useFoundOrganismsMutators,
  useFoundOrganismsState,
} from "../states/foundOrganisms";
import { useIsOrganismLoading, useOrganismLoadAbortMutators } from "../states/organismLoadAbort";
import { usePhenotypeQueryState } from "../states/phenotypeQuery";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

export const PhenotypeSection: FC<Props> = ({ css, className }) => {
  const foundOrganisms = useFoundOrganismsState();
  const isLoading = useIsOrganismLoading();
  useMediaLoadFromOrganism();
  const paginationParams = usePagination(foundOrganisms);
  //
  return (
    <div css={[phenotypeSection, css]} className={className}>
      <div css={phenotypes}>
        <PhenotypeSearchArea />
      </div>
      <div css={organisms}>
        <p css={infoTextCSS}>{getInfoText(foundOrganisms.response.total, isLoading)}</p>
        <OrganismList />
        {!!paginationParams.total && !isLoading && <Pagination {...paginationParams} />}
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
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }
    (async () => {
      const params: MediaByTaxonParams = { tax_ids: selectedOrganisms, limit: 10, offset: 0 };
      setQueryData({ tax_ids: selectedOrganisms });
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
        API_MEDIA_BY_TAXON,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia(response.body);
      }
    })();
  }, [selectedOrganisms]);
};

const usePagination = (foundOrganisms: FoundOrganisms) => {
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [displayLength, setDisplayLength] = useState(0);
  const { setNextOrganismLoadAbort } = useOrganismLoadAbortMutators();
  const phenotypeQuery = usePhenotypeQueryState();
  const { setFoundOrganisms } = useFoundOrganismsMutators();
  const onClickNext = () => {
    setCurrent((prev) => prev + 10);
  };
  const onClickPrev = () => {
    setCurrent((prev) => prev - 10);
  };
  useEffect(() => {
    setTotal(foundOrganisms.response.total);
    setCurrent(foundOrganisms.response.offset);
    setDisplayLength(foundOrganisms.response.limit);
  }, [foundOrganisms]);
  useEffect(() => {
    (async () => {
      const abort: AbortController = new AbortController();
      setNextOrganismLoadAbort(abort);
      const response = await getData<OrganismsByPhenotypesResponse, OrganismsByPhenotypeParams>(
        API_ORGANISMS_BY_PHENOTYPES,
        { ...phenotypeQuery, limit: 10, offset: current },
        abort
      );
      setNextOrganismLoadAbort(null);
      if (response.body) {
        setFoundOrganisms({ response: response.body });
      }
    })();
  }, [current]);
  return { onClickPrev, onClickNext, total, current, displayLength };
};
