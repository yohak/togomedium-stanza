import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { IconCompact, IconExpand, IconNoChildren, IconBlank } from "../../../components/icons";
import {
  COLOR_GRAY300,
  COLOR_GRAY400,
  COLOR_GRAY700,
  COLOR_GRAY_LINE,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from "../../../components/styles";

export type CheckStatus = "none" | "checked" | "grouped" | "indeterminate";

type Props = {
  label: string;
  id: string;
  check: CheckStatus;
  hasChildren: boolean;
  isOpen: boolean;
  isLoading: boolean;
  toolTipLabel?: string;
  tag?: string;
  linkString?: string;
  linkURL?: string;
  onClickCheck: (id: string) => void;
  onToggleChildren: (id: string) => void;
} & AcceptsEmotion;

export const TreeBranchView: FC<Props> = ({
  label,
  linkString,
  linkURL,
  id,
  check,
  tag,
  hasChildren,
  isOpen,
  isLoading,
  onClickCheck,
  onToggleChildren,
  children,
  className,
  css,
  toolTipLabel = "",
}) => {
  return (
    <li css={[wrapper, css]} className={className}>
      <div css={inner}>
        <div css={left}>
          <span onClick={() => onToggleChildren(id)}>
            <ToggleIcon {...{ hasChildren, isOpen, isLoading }} />
          </span>
          <Tooltip
            title={toolTipLabel}
            PopperProps={{ disablePortal: true }}
            arrow
            placement={"top-start"}
          >
            <span>{label}</span>
          </Tooltip>
          {tag && <span css={tagTip}>{tag}</span>}
          {linkString && linkURL && (
            <a href={linkURL} target="_blank" rel="noreferrer">
              [{linkString}]
            </a>
          )}
        </div>
        <Checkbox
          checked={check === "checked" || check === "grouped"}
          indeterminate={check === "indeterminate"}
          onClick={() => onClickCheck(id)}
        />
      </div>
      {isOpen && !!children && <ul css={childrenWrapper}>{children}</ul>}
    </li>
  );
};

const ToggleIcon: FC<{ hasChildren: boolean; isOpen: boolean; isLoading: boolean }> = ({
  hasChildren,
  isOpen,
  isLoading,
}) => {
  if (isLoading) return <IconBlank css={icon} />;
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
  gap: 8px;
  line-height: 1;
  font-size: 16px;
  a {
    font-size: 14px;
    color: ${COLOR_PRIMARY};
  }
`;

const icon = css`
  display: block;
  color: ${COLOR_GRAY300};
  width: 24px;
  height: 24px;
`;

const clickable = css`
  cursor: pointer;
  color: ${COLOR_GRAY700};
`;

const childrenWrapper = css`
  padding-left: 32px;
`;
const tagTip = css`
  font-size: 12px;
  background-color: ${COLOR_GRAY400};
  color: ${COLOR_WHITE};
  padding: 4px 6px;
  border-radius: 5px;
`;
