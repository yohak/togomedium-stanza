import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import React, { FC } from "react";
import { PATH_COMPONENT } from "../../../components/consts";
import { COLOR_GRAY, COLOR_PRIMARY, COLOR_WHITE, SIZE1 } from "../../../components/styles";

export type AlignmentCellState = "grouped" | "available" | "none";

type Props = {
  state: AlignmentCellState;
  label: string;
  id: string;
};

export const AlignmentCell: FC<Props> = ({ state, label, id }) => {
  return (
    <div css={wrapper}>
      <Tooltip title={label} placement={"top"} arrow>
        <a
          href={`${PATH_COMPONENT}${id}`}
          target="_blank"
          className={`icon-${state} icon`}
          rel="noreferrer"
        >
          <span />
        </a>
      </Tooltip>
    </div>
  );
};

const wrapper = css`
  box-sizing: border-box;
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1};
  display: flex;
  width: fit-content;
  align-items: center;
  flex-grow: 0;
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
