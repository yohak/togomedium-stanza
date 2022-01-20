import React, { ComponentProps, FC, useEffect, useState } from "react";
import { MediaListItem } from "./MediaListItem";
import { useFoundMediaState } from "../states/foundMedia";
import { useSelectedMediaMutators, useSelectedMediaState } from "../states/selectedMedia";

type Props = {};

type MediaListInfo = Omit<ComponentProps<typeof MediaListItem>, "onClick">;

export const MediaList: FC<Props> = () => {
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

  return (
    <div>
      {data.map((item) => (
        <MediaListItem key={item.id} {...item} onClick={toggleChecked} />
      ))}
    </div>
  );
};
