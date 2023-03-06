import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { makeCellHeight } from "../functions/processMediaCell";
import { CellInfo } from "../functions/types";

type Props = {} & CellInfo & AcceptsEmotion;

export const useToolTipEnabled = () => {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [toolTipEnabled, setToolTipEnabled] = useState(false);
  useEffect(() => {
    const offsetWidth = labelRef.current?.offsetWidth;
    const scrollWidth = labelRef.current?.scrollWidth;
    setToolTipEnabled(!!scrollWidth && !!offsetWidth && scrollWidth > offsetWidth);
  }, [labelRef]);
  return { labelRef, toolTipEnabled };
};

export const MediaCell: FC<Props> = ({ label, id, size, css, className }) => {
  const { labelRef, toolTipEnabled } = useToolTipEnabled();
  return (
    <div
      css={[mediaCell, css]}
      className={className}
      style={{ height: `${makeCellHeight(size)}px` }}
    >
      <a href={`/medium/${id}`}>{id}</a>
      <div className={"label-wrapper"}>
        <Tooltip
          title={label}
          placement={"top"}
          PopperProps={{ disablePortal: true }}
          arrow
          disableHoverListener={!toolTipEnabled}
        >
          <span ref={labelRef} className={"label"}>
            {label}
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

const mediaCell = css`
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_WHITE};
  padding: 8px 8px 0;
  font-size: 14px;

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    width: fit-content;
  }
  .label-wrapper {
    position: relative;
  }
  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;
