import { css } from "@emotion/react";
import React, { FC } from "react";
import { AttributesSection } from "./AttributesSection";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../../../components/styles";
import { AcceptsEmotion } from "../../../utils/types";

type Props = {} & AcceptsEmotion;

export const QueryPane: FC<Props> = ({ css, className }) => {
  return (
    <div css={[wrapper, css]} className={className}>
      <div css={contents}>
        <AttributesSection />
      </div>
    </div>
  );
};

const wrapper = css`
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;

const contents = css`
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;
