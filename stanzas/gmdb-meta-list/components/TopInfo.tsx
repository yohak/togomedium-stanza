import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";

type Props = {
  total: number;
  limit: number;
  setLimit: (val: number) => void;
  setOffset: (val: number) => void;
} & AcceptsEmotion;

export const TopInfo: FC<Props> = ({ css, className, total, limit, setLimit, setOffset }) => {
  const [tempLimit, setTempLimit] = useState(limit);
  const onCommitLimit = (val: number) => {
    let newLimit = val;
    if (val < 1 || isNaN(val)) {
      newLimit = 1;
    } else if (val >= 100) {
      newLimit = 100;
    } else if (val > total) {
      newLimit = total;
    }
    setLimit(newLimit);
    setTempLimit(newLimit);
    setOffset(0);
  };
  useEffect(() => {
    setTempLimit(limit);
  }, [limit]);

  return (
    <div css={[topInfo, css]} className={className}>
      <Total>Total: {total} items</Total>
      <span>/</span>
      <p>
        <span>Show</span>
        <NumInput
          type={"number"}
          value={tempLimit}
          onChange={(e) => {
            setTempLimit(parseInt(e.target.value));
          }}
          onBlur={() => {
            onCommitLimit(tempLimit);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onCommitLimit(tempLimit);
            }
          }}
        />
        <span>items per page</span>
      </p>
    </div>
  );
};

const topInfo = css`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  gap: 8px;
  padding-bottom: 4px;
  padding-right: 8px;
  align-items: baseline;
`;

const Total = styled.p`
  //margin-inline-end: 16px;
  display: flex;
  align-items: center;
`;
const NumInput = styled.input`
  width: 48px;
  display: inline-block;
  margin-inline: 8px;
  padding-inline: 4px;
`;
