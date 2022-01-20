import { css } from "@emotion/react";
import React, { FC } from "react";
import { IconBlank, IconCompact, IconExpand } from "../../../components/icons";
import { COLOR_WHITE, SIZE1, SIZE3, SIZE4 } from "../../../components/styles";
import { WIDTH_ALIGNMENT_CELL } from "../consts";
import { useComponentTreeMutators } from "../states/componentTree";

type Props = {
  label: string;
  level: number;
  hasChildren: boolean;
  isOpen: boolean;
  id: string;
};

export const FooterCell: FC<Props> = ({ label, level, hasChildren, isOpen, id }) => {
  const { toggleComponent } = useComponentTreeMutators();
  const onClickFooterItem = (id: string) => toggleComponent(id);

  const Icon = hasChildren ? (
    isOpen ? (
      <IconCompact css={icon} onClick={() => onClickFooterItem(id)} />
    ) : (
      <IconExpand css={icon} onClick={() => onClickFooterItem(id)} />
    )
  ) : (
    <IconBlank css={icon} />
  );

  return (
    <div css={wrapper}>
      {new Array(level).fill(null).map((r, index) => (
        <span key={index} className="spacer" />
      ))}
      {Icon}
      <span className={"text"}>{label}</span>
    </div>
  );
};

const wrapper = css`
  box-sizing: border-box;
  width: ${WIDTH_ALIGNMENT_CELL}px;
  background-color: ${COLOR_WHITE};
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SIZE1};
  padding-bottom: ${SIZE4};
  & > .text {
    writing-mode: vertical-rl;
  }
  & > .spacer {
    display: block;
    height: ${SIZE3};
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const iconBlank = css`
  margin-bottom: ${SIZE1};
`;
const icon = css`
  ${iconBlank};
  cursor: pointer;
`;