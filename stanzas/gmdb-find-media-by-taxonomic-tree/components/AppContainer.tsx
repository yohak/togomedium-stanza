import { css } from "@emotion/react";
import React, { FC } from "react";
import { ActionPane } from "./ActionPane";
import { MediaSelectPane } from "./MediaSelectPane";
import { QueryPane } from "./QueryPane";
import { COLOR_GRAY, COLOR_GRAY_BG, COLOR_WHITE, SIZE1 } from "../../../components/styles";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  return (
    <div css={wrapper}>
      <div>
        <QueryPane css={queryPane} />
      </div>
      <div>
        <MediaSelectPane css={mediaQueryPane} />
        {/*<ActionPane actionLabel={"Compare"} dispatchEvent={dispatchEvent} />*/}
      </div>
    </div>
  );
};

const wrapper = css`
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  min-height: 640px;
  height: 1px;
  display: flex;
  gap: ${SIZE1};
  & > * {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${SIZE1};
    &:nth-of-type(2) {
      max-width: 360px;
      min-width: 360px;
    }
  }
`;

const queryPane = css`
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
`;

const mediaQueryPane = css`
  flex-grow: 1;
`;
