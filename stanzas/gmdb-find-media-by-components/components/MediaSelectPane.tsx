import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { MediaList } from "./MediaList";
import {
  MediaByAttributesParams,
  MediaByAttributesResponse,
} from "../../../api/media_by_attributes/types";
import { API_MEDIA_BY_ATTRIBUTES } from "../../../api/paths";
import { Pagination } from "../../../shared/components/media-finder/Pagination";
import { QueryInfo } from "../../../shared/components/media-finder/QueryInfo";
import {
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  ROUNDED_CORNER,
  SIZE05,
  SIZE2,
  SIZE3,
} from "../../../shared/components/styles";
import {
  nullResponse,
  useFoundMediaMutators,
  useFoundMediaState,
} from "../../../shared/state/foundMedia";
import { useIsMediaLoading, useMediaLoadAbortMutators } from "../../../shared/state/mediaLoadAbort";
import { getData } from "../../../shared/utils/getData";
import { AcceptsEmotion } from "../../../shared/utils/types";
import { useSelectedAttributesState } from "../hooks/selectedAttributes";

type Props = {} & AcceptsEmotion;

export const MediaSelectPane: FC<Props> = ({ css, className }) => {
  const paginationParams = usePagination();
  const isLoading = useIsMediaLoading();
  return (
    <div css={[wrapper, css]} className={className}>
      <QueryInfo />
      <p css={infoTextCSS}>{getInfoText(paginationParams.total, isLoading)}</p>
      <MediaList css={list} />
      {!!paginationParams.total && !isLoading && <Pagination {...paginationParams} />}
    </div>
  );
};

const usePagination = () => {
  const response = useFoundMediaState();
  const { setFoundMedia } = useFoundMediaMutators();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [displayLength, setDisplayLength] = useState(0);
  const selectedAttributes = useSelectedAttributesState();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  const onClickNext = () => {
    setCurrent((prev) => prev + 10);
  };
  const onClickPrev = () => {
    setCurrent((prev) => prev - 10);
  };

  useEffect(() => {
    setTotal(response.total);
    setCurrent(response.offset);
    setDisplayLength(response.limit);
  }, [response]);
  useEffect(() => {
    if (selectedAttributes.gmo_ids.length === 0) {
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }

    (async () => {
      const params: MediaByAttributesParams = {
        gmo_ids: selectedAttributes.gmo_ids,
        limit: 10,
        offset: current,
      };
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByAttributesResponse, MediaByAttributesParams>(
        API_MEDIA_BY_ATTRIBUTES,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia(response.body);
      }
    })();
  }, [current]);

  return { onClickPrev, onClickNext, total, current, displayLength };
};

const wrapper = css`
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const infoTextCSS = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-top: ${SIZE3};
  margin-bottom: ${SIZE05};
`;

const list = css`
  flex-grow: 0;
`;

const getInfoText = (mediaLength: number, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (mediaLength === 0) {
    return "No media found";
  } else if (mediaLength === 1) {
    return "1 medium found";
  } else {
    return `${mediaLength} media found`;
  }
};
