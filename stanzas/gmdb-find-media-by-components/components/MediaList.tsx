import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { MediaListItem } from "../../../shared/components/media-finder/MediaListItem";
import { COLOR_GRAY700 } from "../../../shared/components/styles";
import { useFoundMediaState } from "../../../shared/state/foundMedia";
import { useIsMediaLoading } from "../../../shared/state/mediaLoadAbort";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "../../../shared/state/selectedMedia";
import { AcceptsEmotion } from "../../../shared/utils/types";

type Props = {} & AcceptsEmotion;

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const MediaList: FC<Props> = ({ css, className }) => {
  const isMediaLoading = useIsMediaLoading();
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const { data, toggleChecked } = useMediaList();

  return (
    <div css={[wrapper, css]} className={className}>
      {isMediaLoading && (
        <div css={loadingIndicator}>
          <CircularProgress color="inherit" size={40} />
        </div>
      )}
      <div css={inner} ref={scrollInnerRef}>
        {data.map((item) => (
          <MediaListItem key={item.id} {...item} onClick={toggleChecked} />
        ))}
      </div>
    </div>
  );
};

const wrapper = css`
  overflow: hidden;
  position: relative;
`;

const inner = css`
  max-height: 100%;
  overflow-y: auto;
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

const useMediaList = () => {
  const [data, setData] = useState<MediaListInfo[]>([]);
  const foundMedia = useFoundMediaState();
  const selectedMedia = useSelectedMediaState();
  const { toggleMediumSelection } = useSelectedMediaMutators();
  const toggleChecked = (id: string) => {
    toggleMediumSelection(id);
  };

  useEffect(() => {
    const result: MediaListInfo[] = foundMedia.contents.map((medium) => {
      return {
        id: medium.gm_id,
        label: medium.name,
        isChecked: selectedMedia.includes(medium.gm_id),
      };
    });
    setData(result);
  }, [foundMedia, selectedMedia]);

  return { data, toggleChecked };
};
