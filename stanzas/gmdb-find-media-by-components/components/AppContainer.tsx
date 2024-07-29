import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { AttributesSection } from "./AttributesSection";
import {
  MediaByAttributesParams,
  MediaByAttributesResponse,
} from "../../../api/media_by_attributes/types";
import { API_MEDIA_BY_ATTRIBUTES } from "../../../api/paths";
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
import { useSelectedAttributesState } from "../states/selectedAttributes";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromComponents();
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <AttributesSection />
      </div>
      <div css={subPane}>
        <MediaPane dispatchEvent={dispatchEvent} />
      </div>
    </div>
  );
};

const SHOW_COUNT = 10;
const useMediaLoadFromComponents = () => {
  const page = useMediaPaginationState();
  const selectedAttributes = useSelectedAttributesState();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setQueryData } = useQueryDataMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  const query = useQuery({
    queryKey: [selectedAttributes, { page }],
    queryFn: async () => {
      const gmo_ids = selectedAttributes.gmo_ids;
      if (gmo_ids.length === 0) return nullResponse;
      //
      setQueryData({ gmo_ids });
      const response = await getData<MediaByAttributesResponse, MediaByAttributesParams>(
        API_MEDIA_BY_ATTRIBUTES,
        {
          gmo_ids,
          limit: SHOW_COUNT,
          offset: (page - 1) * SHOW_COUNT,
        }
      );
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
  }, [selectedAttributes]);
};
