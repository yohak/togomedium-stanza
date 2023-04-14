import { css } from "@emotion/react";

export const FONT_EN = "'Fira Sans Condensed', sans-serif";
export const COLOR_WHITE = "#FFFFFF";
export const COLOR_PRIMARY = "#8FC31F";
export const COLOR_PRIMARY_DARK = "#6FA80C";
export const COLOR_GRAY = "#CCCCCC";
export const COLOR_GRAY_BG = "#f4f3f2";
export const COLOR_GRAY700 = "#374151";
export const COLOR_GRAY500 = "#6B7280";
export const COLOR_GRAY400 = "#9ca3af";
export const COLOR_GRAY300 = "#d1d5db";
export const COLOR_GRAY_LINE = "#E5E7EB";
export const COLOR_TEXT = "#333333";
export const SIZE_BASE = 8;
export const SIZE05 = `${SIZE_BASE / 2}px`;
export const SIZE1 = `${SIZE_BASE}px`;
export const SIZE2 = `${SIZE_BASE * 2}px`;
export const SIZE3 = `${SIZE_BASE * 3}px`;
export const SIZE4 = `${SIZE_BASE * 4}px`;
export const SIZE5 = `${SIZE_BASE * 5}px`;

export const FONT_DEFAULT = css`
  font-family: ${FONT_EN};
  //font-size: 14px;
`;

export const FONT_WEIGHT_BOLD = css`
  font-weight: 700;
`;
export const FONT_WEIGHT_MEDIUM = css`
  font-weight: 500;
`;

export const FONT_WEIGHT_REGULAR = css`
  font-weight: 400;
`;

export const ROUNDED_CORNER = css`
  border-radius: 5px;
`;
