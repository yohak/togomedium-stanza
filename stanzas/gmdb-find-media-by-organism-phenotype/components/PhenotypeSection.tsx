import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { PhenotypeSearchArea } from "./PhenotypeSearchArea";
import { COLOR_GRAY_LINE, COLOR_WHITE, SIZE2 } from "../../../shared/components/styles";

type Props = {} & AcceptsEmotion;

export const PhenotypeSection: FC<Props> = ({ css, className }) => {
  return (
    <div css={[phenotypeSection, css]} className={className}>
      <div css={phenotypes}>
        <PhenotypeSearchArea />
      </div>
    </div>
  );
};

const phenotypeSection = css`
  background-color: ${COLOR_WHITE};
  display: flex;
`;

const phenotypes = css`
  max-width: 50%;
  flex-grow: 1;
  border-right-color: ${COLOR_GRAY_LINE};
  border-right-style: dashed;
  border-right-width: 2px;
  padding: ${SIZE2};
`;
