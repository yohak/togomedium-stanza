import { css } from "@emotion/react";
import { Slider, Tooltip } from "@mui/material";
import React, { FC } from "react";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN, SIZE1 } from "../../../components/styles";

type Props = {
  info: { id: string; label: string }[];
  linkBase: string;
  expanded: boolean;
};

export const InfoCell: FC<Props> = (props) => {
  return props.expanded ? <Expanded {...props} /> : <Compact {...props} />;
};

const Compact: FC<Props> = ({ info }) => {
  return (
    <div css={[wrapper, { width: 120 }]}>
      {info.map((r) => (
        <div key={r.id}>
          <Tooltip title={r.label} placement={"top"} arrow>
            <a href="">{r.id}</a>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

const Expanded: FC<Props> = ({ info }) => {
  return (
    <div css={[wrapper, { width: 240 }]}>
      {info.map((r) => (
        <div key={r.id}>
          <a href="">{r.id}</a>
          <span>{r.label}</span>
        </div>
      ))}
    </div>
  );
};

const wrapper = css`
  font-family: ${FONT_EN};
  font-size: 14px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: ${SIZE1}px;
  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
  }
  & > div {
    display: flex;
    flex-direction: column;
    + div {
      margin-top: ${SIZE1}px;
    }
  }
`;
