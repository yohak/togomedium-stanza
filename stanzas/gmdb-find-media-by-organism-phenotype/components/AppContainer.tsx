import React, { FC, useEffect } from "react";
import { OrganismPane } from "./OrganismPane";
import { PhenotypeSection } from "./PhenotypeSection";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { subPane, queryPane, wrapper } from "../../../shared/components/media-finder/appStyles";
import { MediaPane } from "../../../shared/components/media-finder/MediaPane";
import {
  FoundMedia,
  nullResponse,
  useFoundMediaMutators,
  useFoundMediaState,
} from "../../../shared/state/media-finder/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/media-finder/mediaLoadAbort";
import { useQueryDataMutators } from "../../../shared/state/media-finder/queryData";
import { getData } from "../../../shared/utils/getData";
import { extractLabelIds } from "../../../shared/utils/labelInfo";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  const { next, prev } = useMediaPagination();
  useMediaLoadFromOrganismSelection();
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <PhenotypeSection />
      </div>
      <div css={subPane}>
        <OrganismPane />
      </div>
      <div css={subPane}>
        <MediaPane dispatchEvent={dispatchEvent} next={next} prev={prev} />
      </div>
    </div>
  );
};

const useMediaLoadFromOrganismSelection = () => {
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  //
  const exec = async () => {
    const tax_ids = extractLabelIds(selectedOrganisms);
    const params: MediaByTaxonParams = { tax_ids, limit: 10, offset: 0 };
    setQueryData({ tax_ids });
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
  };
  useEffect(() => {
    if (selectedOrganisms.length === 0) {
      setQueryData({});
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }
    exec();
  }, [selectedOrganisms]);
};

const useMediaPagination = () => {
  const selectedOrganisms = useSelectedOrganismsState();
  const response = useFoundMediaState();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const next = () => {
    paginate({
      offset: response.offset + 10,
      tax_ids: extractLabelIds(selectedOrganisms),
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };
  const prev = () => {
    paginate({
      offset: response.offset - 10,
      tax_ids: extractLabelIds(selectedOrganisms),
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };

  return { next, prev };
};

type PaginateParams = {
  offset: number;
  abortLoader: (abort: AbortController | null) => void;
  tax_ids: string[];
  setFoundMedia: (media: FoundMedia) => void;
};
const paginate = async ({ offset, abortLoader, tax_ids, setFoundMedia }: PaginateParams) => {
  const params: MediaByTaxonParams = { tax_ids, offset, limit: 10 };
  const abort: AbortController = new AbortController();
  abortLoader(abort);
  const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
    API_MEDIA_BY_TAXON,
    params,
    abort
  );
  abortLoader(null);
  if (response.body) {
    setFoundMedia(response.body);
  }
};
