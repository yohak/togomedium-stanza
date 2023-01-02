import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { MediaListItem } from "./MediaListItem";
import { useFoundMediaState } from "../../state/foundMedia";
import { useIsMediaLoading } from "../../state/mediaLoadAbort";
import { useSelectedMediaMutators, useSelectedMediaState } from "../../state/selectedMedia";
import { AcceptsEmotion } from "../../utils/types";
import { COLOR_GRAY700 } from "../styles";

type Props = {} & AcceptsEmotion;

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const FoundMediaListOld: FC<Props> = ({ css, className }) => {
  const isMediaLoading = useIsMediaLoading();
  const { data, toggleChecked } = useFoundMediaList();

  return (
    <div css={[wrapper, css]} className={className}>
      {isMediaLoading && (
        <div css={loadingIndicator}>
          <CircularProgress color="inherit" size={40} />
        </div>
      )}
      <div css={inner}>
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

const useFoundMediaList = () => {
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
