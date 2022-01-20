import { css, Global } from "@emotion/react";
import React, { FC } from "react";
import { FONT_DEFAULT } from "./styles";

type Props = {};

export const EmotionGlobalStyles: FC<Props> = () => {
  return <Global styles={styles} />;
};

const styles = css`
  * {
    ${FONT_DEFAULT};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
