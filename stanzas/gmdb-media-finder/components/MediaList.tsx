import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { MediaListItem } from "./MediaListItem";
import { COLOR_GRAY700, COLOR_GRAY_BG } from "../../../components/styles";
import { AcceptsEmotion } from "../../../utils/types";
import { useFoundMediaState } from "../states/foundMedia";
import { useIsMediaLoading } from "../states/mediaLoadAbort";
import { useSelectedMediaMutators, useSelectedMediaState } from "../states/selectedMedia";

type Props = {} & AcceptsEmotion;

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const MediaList: FC<Props> = ({ css, className }) => {
  const { data, toggleChecked } = useMediaList();
  const isMediaLoading = useIsMediaLoading();
  return (
    <div css={[wrapper, css]} className={className}>
      {isMediaLoading && (
        <div css={loadingIndicator}>
          <CircularProgress color="inherit" size={40} />
        </div>
      )}
      {data.map((item) => (
        <MediaListItem key={item.id} {...item} onClick={toggleChecked} />
      ))}
    </div>
  );
};

const wrapper = css`
  overflow-y: auto;
  position: relative;
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
    const result: MediaListInfo[] = foundMedia.map<MediaListInfo>((medium) => {
      return {
        id: medium.id,
        label: medium.label,
        isChecked: selectedMedia.includes(medium.id),
      };
    });
    setData(result);
  }, [foundMedia, selectedMedia]);

  return { data, toggleChecked };
};
