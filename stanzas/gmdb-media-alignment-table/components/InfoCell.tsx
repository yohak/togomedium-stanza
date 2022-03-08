import { css } from "@emotion/react";
import { Slider, Tooltip } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN, SIZE1 } from "../../../components/styles";
import { LabelInfo } from "../../../utils/types";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";

type Props = {
  info: LabelInfo[];
  linkBase: string;
  expanded: boolean;
};

export const InfoCell: FC<Props> = (props) => {
  return props.expanded ? <Expanded {...props} /> : <Compact {...props} />;
};

const Compact: FC<Props> = ({ info, linkBase }) => {
  const [item, setItem] = useState<LabelInfo>({ label: "", id: "" });
  const [restText, setRestText] = useState("");
  useEffect(() => {
    setItem(info[0]);
    if (info.length > 1) {
      const remain = info.length - 1;
      if (remain === 1) {
        setRestText(`, + ${remain} organism`);
      } else {
        setRestText(`, + ${remain} organisms`);
      }
    }
  }, [info]);
  return (
    <div css={wrapper} className="compact">
      <div className="inner">
        <div className="text">
          <Tooltip title={item.label} placement={"top"} PopperProps={{ disablePortal: true }} arrow>
            <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
              {item.id}
            </a>
          </Tooltip>
          {info.length > 1 && <>{restText}</>}
        </div>
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
  padding: ${SIZE1};
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
    width: ${WIDTH_COMPACT};
    //overflow: hidden;
    //text-overflow: ellipsis;
    .inner {
      display: flex;
      flex-wrap: wrap;
    }
    .text {
      margin-right: ${SIZE1};
    }
  }
  &.expanded {
    width: ${WIDTH_EXPANDED};
    .text {
      display: flex;
      flex-direction: column;
      + .text {
        margin-top: ${SIZE1};
      }
    }
  }
`;
