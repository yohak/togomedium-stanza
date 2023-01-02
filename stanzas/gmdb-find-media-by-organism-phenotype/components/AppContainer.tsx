import { css } from "@emotion/react";
import React, { FC } from "react";
import { MediaSelectPane } from "./MediaSelectPane";
import { PhenotypeSection } from "./PhenotypeSection";
import {
  COLOR_GRAY_BG,
  COLOR_WHITE,
  ROUNDED_CORNER,
  SIZE1,
} from "../../../shared/components/styles";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  return (
    <div css={wrapper}>
      <div css={queryPane}>
        <PhenotypeSection />
      </div>
      <div>
        <MediaSelectPane css={mediaQueryPane} />
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
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;

const mediaQueryPane = css`
  flex-grow: 1;
`;
