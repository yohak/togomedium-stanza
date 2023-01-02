import { css } from "@emotion/react";
import { COLOR_GRAY_BG, COLOR_WHITE, ROUNDED_CORNER, SIZE1 } from "../styles";

export const wrapper = css`
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

export const queryPane = css`
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;

export const mediaPane = css`
  display: flex;
  flex-direction: column;
`;
