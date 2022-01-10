import { css } from "@emotion/react";
import { Slider } from "@mui/material";
import React, { FC } from "react";

export type MediaCellProps = {
  media: { id: string; label: string }[];
  expanded: boolean;
};

export const MediaCell: FC<MediaCellProps> = (props) => {
  return props.expanded ? <Expanded {...props} /> : <Compact {...props} />;
};

const Compact: FC<MediaCellProps> = ({ media }) => {
  return (
    <div css={wrapper}>
      {media.map((r) => (
        <div key={r.id}>
          <a href="">{r.id}</a>
        </div>
      ))}
    </div>
  );
};

const Expanded: FC<MediaCellProps> = ({ media }) => {
  return (
    <div css={wrapper}>
      {media.map((r) => (
        <div key={r.id}>
          <a href="">{r.id}</a>
          <span>{r.label}</span>
        </div>
      ))}
    </div>
  );
};

const wrapper = css`
  background-color: red;
  color: blue;
  font-family: "Fira Sans", sans-serif;
`;
