import { css } from "@emotion/react";
import { Tooltip } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { COLOR_PRIMARY, COLOR_WHITE, FONT_EN, SIZE1 } from "../../../shared/components/styles";
import { LabelInfo } from "../../../shared/utils/types";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";

type Props = {
  info: LabelInfo[];
  linkBase: string;
  expanded: boolean;
  priority?: string[];
};

export const InfoCell: FC<Props> = ({ info, linkBase, expanded, priority = [] }) => {
  return expanded ? (
    <Expanded {...{ info: sortInfo(info, priority), linkBase, priority }} />
  ) : (
    <Compact {...{ info: sortInfo(info, priority), linkBase, priority }} />
  );
};

const sortInfo = (info: LabelInfo[], priority: string[]): LabelInfo[] => {
  return [
    ...priority.map((id) => info.find((item) => item.id === id)!).filter((item) => !!item),
    ...info.filter((item) => !priority.includes(item.id)),
  ];
};

const Compact: FC<Omit<Props, "expanded">> = ({ info, linkBase, priority = [] }) => {
  const [items, setItems] = useState<LabelInfo[]>([]);
  const [restText, setRestText] = useState("");
  useEffect(() => {
    const myPriorityItems: string[] = info
      .map((item) => item.id)
      .filter((str) => priority.includes(str));
    setItems(
      myPriorityItems.length ? info.filter((item) => priority.includes(item.id)) : [info[0]]
    );
    const remain = myPriorityItems.length ? info.length - myPriorityItems.length : info.length - 1;
    switch (remain) {
      case 0:
        break;
      case 1:
        setRestText(` + ${remain} organism`);
        break;
      default:
        setRestText(` + ${remain} organisms`);
    }
  }, [info]);
  return (
    <div css={wrapper} className="compact">
      <div className="inner">
        <div className="text">
          {items.map((item, index) => (
            <span key={index}>
              <Tooltip
                title={item.label}
                placement={"top"}
                PopperProps={{ disablePortal: true }}
                arrow
              >
                <a href={`${linkBase}${item.id}`} target="_blank" rel="noreferrer">
                  {item.id}
                </a>
              </Tooltip>
              {index < items.length - 1 ? ", " : ""}
            </span>
          ))}
          <span style={{ whiteSpace: "nowrap" }}>{restText}</span>
        </div>
      </div>
    </div>
  );
};

const Expanded: FC<Omit<Props, "expanded">> = ({ info, linkBase, priority = [] }) => {
  return (
    <div css={wrapper} className="expanded">
      <div className="inner">
        {[
          ...info.filter((item) => priority.includes(item.id)),
          ...info.filter((item) => !priority.includes(item.id)),
        ].map((item) => (
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
