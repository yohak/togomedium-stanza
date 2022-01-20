import { css } from "@emotion/react";
import React, { FC } from "react";
import { COLOR_GRAY_LINE, ROUNDED_CORNER, SIZE05, SIZE1 } from "../../../components/styles";
import { queryDataToInfoText } from "../functions/queryDataToInfoText";
import { useQueryDataState } from "../states/queryData";

type Props = {};

export const QueryInfo: FC<Props> = () => {
  const queryData = useQueryDataState();

  return (
    <div css={wrapper}>
      <p>Queried with:</p>
      <p>{queryDataToInfoText(queryData)}</p>
    </div>
  );
};

const wrapper = css`
  ${ROUNDED_CORNER};
  border-color: ${COLOR_GRAY_LINE};
  border-style: dashed;
  border-width: 2px;
  padding: ${SIZE1};
  & > p:first-of-type {
    font-weight: 700;
    margin-bottom: ${SIZE05};
  }
`;
