import React, { FC } from "react";
import { AttributesSection } from "./AttributesSection";
import {
  MediaByAttributesParams,
  MediaByAttributesResponse,
} from "../../../api/media_by_attributes/types";
import { API_MEDIA_BY_ATTRIBUTES } from "../../../api/paths";
import { subPane, queryPane, wrapper } from "../../../shared/components/media-finder/appStyles";
import { MediaPane } from "../../../shared/components/media-finder/MediaPane";
import {
  FoundMedia,
  useFoundMediaMutators,
  useFoundMediaState,
} from "../../../shared/state/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/mediaLoadAbort";
import { getData } from "../../../shared/utils/getData";
import { useSelectedAttributesState } from "../hooks/selectedAttributes";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  const { next, prev } = useMediaPagination();
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <AttributesSection />
      </div>
      <div css={subPane}>
        <MediaPane dispatchEvent={dispatchEvent} next={next} prev={prev} />
      </div>
    </div>
  );
};

const useMediaPagination = () => {
  const selectedAttributes = useSelectedAttributesState();
  const response = useFoundMediaState();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const next = () => {
    paginate({
      offset: response.offset + 10,
      gmo_ids: selectedAttributes.gmo_ids,
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };
  const prev = () => {
    paginate({
      offset: response.offset - 10,
      gmo_ids: selectedAttributes.gmo_ids,
      abortLoader: setNextMediaLoadAbort,
      setFoundMedia,
    });
  };

  return { next, prev };
};

type PaginateParams = {
  offset: number;
  abortLoader: (abort: AbortController | null) => void;
  gmo_ids: string[];
  setFoundMedia: (media: FoundMedia) => void;
};
const paginate = async ({ offset, abortLoader, gmo_ids, setFoundMedia }: PaginateParams) => {
  const params: MediaByAttributesParams = { gmo_ids, offset, limit: 10 };
  const abort: AbortController = new AbortController();
  abortLoader(abort);
  const response = await getData<MediaByAttributesResponse, MediaByAttributesParams>(
    API_MEDIA_BY_ATTRIBUTES,
    params,
    abort
  );
  abortLoader(null);
  if (response.body) {
    setFoundMedia(response.body);
  }
};
