import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { TaxonomicTreeSection } from "./TaxonomicTreeSection";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { queryPane, subPane, wrapper } from "../../../shared/components/media-finder/appStyles";
import { MediaPane } from "../../../shared/components/media-finder/MediaPane";
import { useFoundMediaMutators } from "../../../shared/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "../../../shared/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "../../../shared/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "../../../shared/state/media-finder/queryData";
import { getData } from "../../../shared/utils/getData";
import { useSelectedTaxonState } from "../states/selectedTaxon";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromTaxon();
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <TaxonomicTreeSection />
      </div>
      <div css={subPane}>
        <MediaPane dispatchEvent={dispatchEvent} />
      </div>
    </div>
  );
};
const SHOW_COUNT = 10;
const useMediaLoadFromTaxon = () => {
  const page = useMediaPaginationState();
  const selectedTaxon = useSelectedTaxonState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  const query = useQuery({
    queryKey: [selectedTaxon, { page }],
    queryFn: async () => {
      const tax_ids = selectedTaxon;
      if (tax_ids.length === 0) return nullResponse;
      //
      setQueryData({ tax_ids });
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(API_MEDIA_BY_TAXON, {
        tax_ids,
        limit: SHOW_COUNT,
        offset: (page - 1) * SHOW_COUNT,
      });
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  });
  useEffect(() => {
    query.data && setFoundMedia(query.data);
  }, [query.data, setFoundMedia]);
  useEffect(() => {
    setIsMediaLoading(query.isLoading || query.isPlaceholderData);
  }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
  useEffect(() => {
    reset();
  }, [selectedTaxon, reset]);
};
