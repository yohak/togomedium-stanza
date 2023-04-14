import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { decodeHTMLEntities } from "../../../shared/utils/string";

type Props = {
  index: number;
  comment: string;
} & AcceptsEmotion;

export const RecipeComment: FC<Props> = ({ css, className, comment }) => {
  return (
    <div css={[recipeComments, css]} className={className}>
      {parseText(comment)}
    </div>
  );
};

const recipeComments = css`
  margin: 4px 0;
`;

const parseText = (str: string) => {
  return decodeHTMLEntities(str.replace(/℃/g, "°C"));
};
