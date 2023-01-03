import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { MediaListItem } from "./MediaListItem";
import { Pagination } from "./Pagination";
import { useSelectedMediaMutators, useSelectedMediaState } from "../../state/selectedMedia";
import { LabelInfo } from "../../utils/labelInfo";

type Props = {} & AcceptsEmotion;

const SHOW_COUNT = 10;
export const SelectedMediaList: FC<Props> = ({ css, className }) => {
  const selectedMedia = useSelectedMediaState();
  const { toggleMediumSelection } = useSelectedMediaMutators();
  const [data, setData] = useState<LabelInfo[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const next = () => {
    setCurrent(current + SHOW_COUNT);
  };
  const prev = () => {
    setCurrent(current - SHOW_COUNT);
  };

  useEffect(() => {
    const filtered = selectedMedia
      .filter((item, i) => i >= current)
      .filter((item, i) => i < SHOW_COUNT);
    setData(filtered);
  }, [selectedMedia, current]);

  return (
    <div css={[selectedMediaList, css]} className={className}>
      <div>
        {data.map((item) => (
          <MediaListItem
            key={item.id}
            {...item}
            isChecked={true}
            onClick={() => {
              toggleMediumSelection(item);
            }}
          />
        ))}
      </div>
      {!!selectedMedia.length && (
        <Pagination
          total={selectedMedia.length}
          current={current}
          displayLength={SHOW_COUNT}
          onClickNext={next}
          onClickPrev={prev}
        />
      )}
    </div>
  );
};

const selectedMediaList = css``;
