import { css } from "@emotion/react";
import React, { FC } from "react";
import { QueryInfo } from "./QueryInfo";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE2 } from "../../../components/styles";

type Props = {};

export const MediaQueryPane: FC<Props> = () => {
  return (
    <div css={wrapper}>
      <QueryInfo />
    </div>
  );
};

const wrapper = css`
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
  flex-grow: 1;
`;
