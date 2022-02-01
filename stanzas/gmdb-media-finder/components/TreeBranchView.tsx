import { css } from "@emotion/react";
import Checkbox from "@mui/material/Checkbox";
import React, { FC } from "react";
import { IconCompact, IconExpand, IconNoChildren } from "../../../components/icons";
import {
  COLOR_GRAY700,
  COLOR_GRAY_LINE,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from "../../../components/styles";

export type CheckStatus = "none" | "checked" | "indeterminate";

type Props = {
  label: string;
  id: string;
  check: CheckStatus;
  hasChildren: boolean;
  isOpen: boolean;
  linkString?: string;
  linkURL?: string;
  onClickCheck: (id: string) => void;
  onToggleChildren: (id: string) => void;
};

export const TreeBranchView: FC<Props> = ({
  label,
  linkString,
  linkURL,
  id,
  check,
  hasChildren,
  isOpen,
  onClickCheck,
  onToggleChildren,
  children,
}) => {
  return (
    <li css={wrapper}>
      <div css={inner}>
        <div css={left}>
          <span onClick={() => onToggleChildren(id)}>
            <ToggleIcon {...{ hasChildren, isOpen }} />
          </span>
          <span>{label}</span>
          {linkString && linkURL && (
            <a href={linkURL} target="_blank" rel="noreferrer">
              [{linkString}]
            </a>
          )}
        </div>
        <Checkbox
          checked={check === "checked"}
          indeterminate={check === "indeterminate"}
          onClick={() => onClickCheck(id)}
        />
      </div>
      {isOpen && !!children && <ul css={childrenWrapper}>{children}</ul>}
    </li>
  );
};

const ToggleIcon: FC<{ hasChildren: boolean; isOpen: boolean }> = ({ hasChildren, isOpen }) => {
  if (!hasChildren) return <IconNoChildren css={icon} />;
  if (isOpen) return <IconCompact css={[icon, clickable]} />;
  return <IconExpand css={[icon, clickable]} />;
};

const wrapper = css`
  margin-top: -1px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const inner = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  background-color: ${COLOR_WHITE};
  padding: 0 8px;
  border: 1px solid ${COLOR_GRAY_LINE};
`;

const left = css`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 12px;
  line-height: 1;
  font-size: 16px;
  a {
    font-size: 14px;
    color: ${COLOR_PRIMARY};
  }
`;

const icon = css`
  display: block;
  color: ${COLOR_GRAY700};
  width: 24px;
  height: 24px;
`;

const clickable = css`
  cursor: pointer;
`;

const childrenWrapper = css`
  padding-left: 32px;
`;
