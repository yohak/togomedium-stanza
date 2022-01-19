import { css, Global } from "@emotion/react";
import React, { FC } from "react";

type Props = {};

export const EmotionGlobalStyles: FC<Props> = () => {
  return <Global styles={styles} />;
};

const styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
