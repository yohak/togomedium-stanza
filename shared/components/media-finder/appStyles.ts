import { css } from "@emotion/react";
import { COLOR_GRAY_BG, COLOR_WHITE, ROUNDED_CORNER, SIZE1 } from "../../styles/variables";

export const wrapper = css`
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  gap: ${SIZE1};
`;

export const queryPane = css`
  flex-grow: 1;
  overflow-y: auto;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;

export const subPane = css`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  min-width: 380px;
`;
