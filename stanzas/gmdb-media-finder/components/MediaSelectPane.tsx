import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { MediaList } from "./MediaList";
import { QueryInfo } from "./QueryInfo";
import {
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  ROUNDED_CORNER,
  SIZE1,
  SIZE2,
  SIZE4,
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
  margin-top: ${SIZE4};
  margin-bottom: ${SIZE1};
`;

const list = css`
  flex-grow: 1;
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
