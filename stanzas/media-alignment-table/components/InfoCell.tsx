import { css } from "@emotion/react";
import { Slider, Tooltip } from "@mui/material";
import React, { FC } from "react";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN, SIZE1 } from "../../../components/styles";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";

type Props = {
  info: { id: string; label: string }[];
  linkBase: string;
  expanded: boolean;
};

export const InfoCell: FC<Props> = (props) => {
  return props.expanded ? <Expanded {...props} /> : <Compact {...props} />;
};

const Compact: FC<Props> = ({ info, linkBase }) => {
  return (
    <div css={wrapper} className="compact">
      <div className="inner">
        {info.map((item, index) => (
          <div key={item.id} className="text">
            <Tooltip title={item.label} placement={"top"} arrow>
              <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
                {item.id}
              </a>
            </Tooltip>
            {index < info.length - 1 && ","}
          </div>
        ))}
      </div>
    </div>
  );
};

const Expanded: FC<Props> = ({ info, linkBase }) => {
  return (
    <div css={wrapper} className="expanded">
      <div className="inner">
        {info.map((item) => (
          <div key={item.id} className="text">
            <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
              {item.id}
            </a>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const wrapper = css`
  font-family: ${FONT_EN};
  font-size: 14px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: ${SIZE1}px;
  display: block;
  min-height: 40px;
  .inner {
    padding-top: 4px;
  }
  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
  }
  &.compact {
    width: ${WIDTH_COMPACT}px;
    .inner {
      display: flex;
    }
    .text {
      margin-right: ${SIZE1}px;
    }
  }
  &.expanded {
    width: ${WIDTH_EXPANDED}px;
    .text {
      display: flex;
      flex-direction: column;
      + .text {
        margin-top: ${SIZE1}px;
      }
    }
  }
`;
