import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { SIZE1, SIZE2 } from "../styles";

type Props = {
  total: number;
  current: number;
  displayLength: number;
  onClickNext: () => void;
  onClickPrev: () => void;
} & AcceptsEmotion;

export const Pagination: FC<Props> = ({
  css,
  className,
  total,
  current,
  displayLength,
  onClickNext,
  onClickPrev,
}) => {
  return (
    <div css={[pagination, css]} className={className}>
      <div>
        {current > 0 && <input type="button" value={"PREV"} onClick={onClickPrev} />}
        {current + displayLength < total && (
          <input type="button" value={"NEXT"} onClick={onClickNext} />
        )}
      </div>
      <div>{makeDisplayMessage(total, current, displayLength)}</div>
    </div>
  );
};

const makeDisplayMessage = (total: number, current: number, displayLength: number) => {
  switch (true) {
    case current + displayLength > total:
      return `Showing ${current + 1} to ${total} of total ${total} items`;
    default:
      return `Showing ${current + 1} to ${current + displayLength} of total ${total} items`;
  }
};

const pagination = css`
  display: flex;
  justify-content: space-between;
  margin-top: ${SIZE1};
  input[type="button"] {
    cursor: pointer;
    padding: 0 ${SIZE1};
    margin-right: ${SIZE1};
  }
`;
