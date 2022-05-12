import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { SIZE1, SIZE2 } from "../../../components/styles";

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
      <div>
        Showing {current + 1} to {current + displayLength} of total {total} items
      </div>
    </div>
  );
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
