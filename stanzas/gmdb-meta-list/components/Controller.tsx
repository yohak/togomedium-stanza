import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { getPagination } from "../utils/getPagination";

type Props = {
  total: number;
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
} & AcceptsEmotion;

export const Controller: FC<Props> = ({
  css,
  className,
  total,
  offset,
  limit,
  setOffset,
  setLimit,
}) => {
  const pagination = getPagination({ total, offset, limit });
  return (
    <div css={[controller, css]} className={className}>
      <ul>
        {pagination.map((p) => (
          <li
            key={p}
            onClick={() => {
              setOffset(p - 1);
            }}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
};

const controller = css``;
