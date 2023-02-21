import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { makeCellHeight } from "../functions/processMediaCell";
import { CellInfo } from "../functions/types";

type Props = {} & CellInfo & AcceptsEmotion;

export const MediaCell: FC<Props> = ({ label, id, size, css, className }) => {
  return (
    <div
      css={[mediaCell, css]}
      className={className}
      style={{ height: `${makeCellHeight(size)}px` }}
    >
      <a href={`/media/${id}`}>{id}</a>
      <span>{label}</span>
    </div>
  );
};

const mediaCell = css`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_WHITE};
  padding: 8px 8px 0;
  font-size: 14px;

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    width: fit-content;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;
