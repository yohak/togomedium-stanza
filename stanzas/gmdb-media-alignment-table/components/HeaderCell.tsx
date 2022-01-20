import { css } from "@emotion/react";
import React, { FC } from "react";
import { IconCompact, IconExpand } from "../../../components/icons";
import { COLOR_GRAY700, COLOR_WHITE, SIZE1 } from "../../../components/styles";
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
        <IconCompact css={icon} onClick={onClickIcon} />
      ) : (
        <IconExpand css={icon} onClick={onClickIcon} />
      )}
    </div>
  );
};

const wrapper = css`
  display: flex;
  background-color: ${COLOR_WHITE};
  align-items: center;
  justify-content: space-between;
  padding: ${SIZE1};
  box-sizing: border-box;

  &.expanded {
    width: ${WIDTH_EXPANDED};
  }

  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;

const icon = css`
  font-size: 24px;
  color: ${COLOR_GRAY700};
  cursor: pointer;
`;
