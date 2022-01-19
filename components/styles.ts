import { css } from "@emotion/react";
import { ExpandOutlined } from "@mui/icons-material";

export const FONT_EN = "'Fira Sans', sans-serif";
export const COLOR_WHITE = "#FFFFFF";
export const COLOR_PRIMARY = "#8FC31F";
export const COLOR_GRAY = "#CCCCCC";
export const COLOR_GRAY_BG = "#F0F0F0";
export const COLOR_GRAY700 = "#374151";
export const COLOR_GRAY_LINE = "#E5E7EB";
export const SIZE_BASE = 8;
export const SIZE05 = `${SIZE_BASE / 2}px`;
export const SIZE1 = `${SIZE_BASE}px`;
export const SIZE2 = `${SIZE_BASE * 2}px`;
export const SIZE3 = `${SIZE_BASE * 3}px`;
export const SIZE4 = `${SIZE_BASE * 4}px`;
export const SIZE5 = `${SIZE_BASE * 5}px`;

export const FONT_DEFAULT = css`
  font-family: ${FONT_EN};
  font-size: 14px;
`;

export const ROUNDED_CORNER = css`
  border-radius: 5px;
`;
