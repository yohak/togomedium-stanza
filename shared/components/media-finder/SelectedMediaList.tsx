import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";

type Props = {} & AcceptsEmotion;

export const SelectedMediaList: FC<Props> = ({ css, className }) => {
  return <div css={[selectedMediaList, css]} className={className}></div>;
};

const selectedMediaList = css``;
