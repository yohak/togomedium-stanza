import { css } from "@emotion/react";
import React, { FC, useEffect, useRef } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_WHITE } from "../../../shared/styles/variables";
import { drawGraph } from "../utils/drawGraph";
import { GraphData } from "../utils/useGraphData";

type Props = { data: GraphData } & AcceptsEmotion;

export const NodeCanvas: FC<Props> = ({ css, className, data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    drawGraph(ref.current, data);
  }, [ref, data]);
  return <div css={[nodeCanvas, css]} className={className} ref={ref}></div>;
};

// const Wrapper = React.memo(() =>);

const nodeCanvas = css`
  background-color: ${COLOR_WHITE};
  min-height: 600px;
`;

const svgCanvas = css`
  display: block;
  width: 100%;
  height: 100%;
`;
