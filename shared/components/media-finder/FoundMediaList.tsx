import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { MediaListItemInfo, MediaListItem } from "./MediaListItem";
import { Pagination } from "./Pagination";
import { QueryInfo } from "./QueryInfo";
import { useFoundMediaState } from "../../state/media-finder/foundMedia";
import { useIsMediaLoading } from "../../state/media-finder/mediaLoadAbort";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "../../state/media-finder/selectedMedia";
import {
  COLOR_GRAY700,
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  SIZE05,
  SIZE3,
} from "../../styles/variables";
import { hasIdOfLabel, LabelInfo } from "../../utils/labelInfo";

type Props = {
  next: () => void;
  prev: () => void;
} & AcceptsEmotion;

export const FoundMediaList: FC<Props> = ({ next, prev, css, className }) => {
  const { data, toggleChecked, isLoading, response } = useFoundMedia();
  return (
    <div css={[wrapper, css]} className={className}>
      <QueryInfo />
      <p css={infoTextCSS}>{getInfoText(response.total, isLoading)}</p>
      <div css={listWrapper}>
        {isLoading && (
          <div css={loadingIndicator}>
            <CircularProgress color="inherit" size={40} />
          </div>
        )}
        <div>
          {data.map((item) => (
            <MediaListItem key={item.id} {...item} onClick={toggleChecked} />
          ))}
        </div>
        {!!response.total && !isLoading && (
          <Pagination
            total={response.total}
            current={response.offset}
            displayLength={response.limit}
            onClickNext={() => next()}
            onClickPrev={() => prev()}
          />
        )}
      </div>
    </div>
  );
};

const useFoundMedia = () => {
  const [data, setData] = useState<MediaListItemInfo[]>([]);
  const response = useFoundMediaState();
  const isLoading = useIsMediaLoading();
  const selectedMedia = useSelectedMediaState();
  const { toggleMediumSelection } = useSelectedMediaMutators();
  const toggleChecked = (info: LabelInfo) => {
    toggleMediumSelection(info);
  };

  useEffect(() => {
    const result: MediaListItemInfo[] = response.contents.map((medium) => {
      return {
        id: medium.gm_id,
        label: medium.name,
        isChecked: hasIdOfLabel(selectedMedia, medium.gm_id),
      };
    });
    setData(result);
  }, [response, selectedMedia]);

  return { data, toggleChecked, isLoading, response };
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const listWrapper = css`
  max-height: 100%;
  overflow-y: auto;
  position: relative;
`;

const infoTextCSS = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-top: ${SIZE3};
  margin-bottom: ${SIZE05};
`;

const loadingIndicator = css`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_GRAY700};
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
