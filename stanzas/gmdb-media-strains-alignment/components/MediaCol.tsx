import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { MediaCell } from "./MediaCell";
import { COLOR_WHITE } from "../../../shared/styles/variables";
import { CellInfo } from "../functions/types";

type Props = { mediaList: CellInfo[] } & AcceptsEmotion;

export const MediaCol: FC<Props> = ({ mediaList, css, className }) => {
  return (
    <div css={[mediaCol, css]} className={className}>
      <div css={emptyCell}></div>
      {mediaList.map((info, index) => (
        <MediaCell key={index} {...info} />
      ))}
    </div>
  );
};

const mediaCol = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 200px;
`;
const emptyCell = css`
  height: 24px;
  background-color: ${COLOR_WHITE};
`;
