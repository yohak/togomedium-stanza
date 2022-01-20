import { css } from "@emotion/react";
import React, { FC } from "react";
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
import { Layout } from "../../../utils/types";
import { useFoundMediaState } from "../states/foundMedia";

type Props = {} & Layout;

export const MediaSelectPane: FC<Props> = ({ extraCSS }) => {
  const foundMedia = useFoundMediaState();
  return (
    <div css={[wrapper, extraCSS]}>
      <QueryInfo />
      <p css={infoText}>{getInfoText(foundMedia.length)}</p>
      <MediaList extraCSS={list} />
    </div>
  );
};

const wrapper = css`
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
  display: flex;
  flex-direction: column;
`;

const infoText = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-top: ${SIZE4};
  margin-bottom: ${SIZE1};
`;

const list = css`
  flex-grow: 1;
`;

const getInfoText = (mediaLength: number): string => {
  if (mediaLength === 0) {
    return "No media found";
  } else if (mediaLength === 1) {
    return "1 medium found";
  } else {
    return `${mediaLength} media found`;
  }
};
