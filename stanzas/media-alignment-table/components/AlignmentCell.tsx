import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import React, { FC } from "react";
import { COLOR_GRAY, COLOR_PRIMARY, COLOR_WHITE, SIZE1 } from "../../../components/styles";

export type AlignmentCellState = "grouped" | "available" | "none";

type Props = {
  state: AlignmentCellState;
  label: string;
  id: string;
};

export const AlignmentCell: FC<Props> = ({ state, label }) => {
  return (
    <div css={wrapper}>
      <Tooltip title={label} placement={"top"} arrow>
        <span className={`icon-${state} icon`}>
          <span />
        </span>
      </Tooltip>
    </div>
  );
};

const wrapper = css`
  box-sizing: border-box;
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1}px;
  display: table-cell;
  width: fit-content;
  vertical-align: middle;
  flex-grow: 1;
  .icon {
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }
  .icon-available > span {
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${COLOR_PRIMARY};
  }
  .icon-grouped > span {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 2px solid ${COLOR_PRIMARY};
  }

  .icon-none > span {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 4px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
  }
`;
