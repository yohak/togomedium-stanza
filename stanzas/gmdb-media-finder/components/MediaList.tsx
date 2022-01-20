import { css } from "@emotion/react";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { MediaListItem } from "./MediaListItem";
import { AcceptsEmotion } from "../../../utils/types";
import { useFoundMediaState } from "../states/foundMedia";
import { useSelectedMediaMutators, useSelectedMediaState } from "../states/selectedMedia";

type Props = {} & AcceptsEmotion;

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const MediaList: FC<Props> = ({ css, className }) => {
  const { data, toggleChecked } = useMediaList();
  return (
    <div css={[wrapper, css]} className={className}>
      {data.map((item) => (
        <MediaListItem key={item.id} {...item} onClick={toggleChecked} />
      ))}
    </div>
  );
};

const wrapper = css`
  overflow-y: auto;
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
