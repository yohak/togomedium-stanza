import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { NodeCanvas } from "./NodeCanvas";
import { stanzaWrapper } from "../../../shared/styles/common";
import { useGraphData } from "../utils/useGraphData";

type Props = {
  gmId: string;
} & AcceptsEmotion;

export const StanzaView: FC<Props> = ({ css, className, gmId }) => {
  const { graphData } = useGraphData(gmId);
  useEffect(() => {
    console.log(graphData);
  }, [graphData]);
  return (
    <div css={[stanzaView, css, stanzaWrapper]} className={className}>
      <NodeCanvas data={graphData} />
    </div>
  );
};
const stanzaView = css``;
