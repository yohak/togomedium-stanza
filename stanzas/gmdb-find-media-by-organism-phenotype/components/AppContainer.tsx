import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { OrganismPane } from "./OrganismPane";
import { PhenotypeSection } from "./PhenotypeSection";
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
import { extractLabelIds } from "../../../shared/utils/labelInfo";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
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
        <MediaPane dispatchEvent={dispatchEvent} />
      </div>
    </div>
  );
};

const SHOW_COUNT = 10;
const useMediaLoadFromOrganismSelection = () => {
  const page = useMediaPaginationState();
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  const query = useQuery({
    queryKey: [selectedOrganisms, { page }],
    queryFn: async () => {
      if (selectedOrganisms.length === 0) return nullResponse;
      //
      const tax_ids = extractLabelIds(selectedOrganisms);
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
  }, [query.data]);
  useEffect(() => {
    setIsMediaLoading(query.isLoading || query.isPlaceholderData);
  }, [query.isLoading, query.isPlaceholderData]);
  useEffect(() => {
    reset();
  }, [selectedOrganisms]);
};
