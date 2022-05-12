import { css } from "@emotion/react";
import React, { FC } from "react";
import { MediaList } from "./MediaList";
import { Pagination } from "./Pagination";
import { QueryInfo } from "./QueryInfo";
import {
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  ROUNDED_CORNER,
  SIZE05,
  SIZE2,
  SIZE3,
} from "../../../components/styles";
import { AcceptsEmotion } from "../../../utils/types";
import { useFoundMediaState } from "../states/foundMedia";
import { useIsMediaLoading } from "../states/mediaLoadAbort";

type Props = {} & AcceptsEmotion;

export const MediaSelectPane: FC<Props> = ({ css, className }) => {
  const foundMedia = useFoundMediaState();
  const isLoading = useIsMediaLoading();
  return (
    <div css={[wrapper, css]} className={className}>
      <QueryInfo />
      <p css={infoTextCSS}>{getInfoText(foundMedia.length, isLoading)}</p>
      <MediaList css={list} />
      <Pagination
        total={965}
        current={0}
        displayLength={10}
        onClickNext={() => {}}
        onClickPrev={() => {}}
      />
    </div>
  );
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
