import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, RefObject, useEffect, useRef, useState } from "react";
import { MediaListItem } from "./MediaListItem";
import { COLOR_GRAY700 } from "../../../components/styles";
import { deepEqual } from "../../../utils/deepEqual";
import { AcceptsEmotion } from "../../../utils/types";
import { useResetScroll } from "../hooks/useResetScroll";
import { useFoundMediaState } from "../states/foundMedia";
import { useIsMediaLoading } from "../states/mediaLoadAbort";
import { useSelectedMediaMutators, useSelectedMediaState } from "../states/selectedMedia";

type Props = {} & AcceptsEmotion;

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const MediaList: FC<Props> = ({ css, className }) => {
  const isMediaLoading = useIsMediaLoading();
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const { data, toggleChecked } = useMediaList();
  useResetScroll(scrollInnerRef, data);

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
  const { toggleMediumSelection, setSelectedMedia } = useSelectedMediaMutators();
  const toggleChecked = (id: string) => {
    toggleMediumSelection(id);
  };
  useEffect(() => {
    const result: MediaListInfo[] = foundMedia.map<MediaListInfo>((medium) => {
      return {
        id: medium.id,
        label: medium.label,
        isChecked: selectedMedia.includes(medium.id),
      };
    });
    setData(result);
    const updatedSelection = selectedMedia.filter((id) => result.find((info) => info.id === id));
    if (!deepEqual(updatedSelection, selectedMedia)) {
      setSelectedMedia(updatedSelection);
    }
  }, [foundMedia, selectedMedia]);

  return { data, toggleChecked };
};
