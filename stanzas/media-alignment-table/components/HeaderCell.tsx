import { css } from "@emotion/react";
import { AddBoxOutlined, IndeterminateCheckBoxOutlined } from "@mui/icons-material";
import React, { FC } from "react";
import {
  COLOR_GRAY700,
  COLOR_WHITE,
  FONT_DEFAULT,
  FONT_EN,
  SIZE1,
} from "../../../components/styles";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";

type Props = {
  label: string;
  onClickIcon: () => void;
  isExpanded: boolean;
};

export const HeaderCell: FC<Props> = ({ label, onClickIcon, isExpanded }) => {
  return (
    <div css={wrapper} className={isExpanded ? "expanded" : "compact"}>
      <span>{label}</span>
      {isExpanded ? (
        <IndeterminateCheckBoxOutlined css={icon} onClick={onClickIcon} />
      ) : (
        <AddBoxOutlined css={icon} onClick={onClickIcon} />
      )}
    </div>
  );
};

const wrapper = css`
  ${FONT_DEFAULT};
  display: flex;
  background-color: ${COLOR_WHITE};
  align-items: center;
  justify-content: space-between;
  padding: ${SIZE1}px;
  &.expanded {
    width: ${WIDTH_EXPANDED}px;
  }
  &.compact {
    width: ${WIDTH_COMPACT}px;
  }
`;

const icon = css`
  font-size: 24px;
  color: ${COLOR_GRAY700};
  cursor: pointer;
`;
