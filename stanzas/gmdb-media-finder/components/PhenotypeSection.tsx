import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismList } from "./OrganismList";
import { PhenotypeSearchArea } from "./PhenotypeSearchArea";
import {
  COLOR_GRAY_LINE,
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  SIZE1,
  SIZE2,
  SIZE4,
} from "../../../components/styles";
import { useFoundOrganismsState } from "../states/foundOrganisms";
import { useIsOrganismLoading } from "../states/organismLoadAbort";

type Props = {} & AcceptsEmotion;

export const PhenotypeSection: FC<Props> = ({ css, className }) => {
  const foundOrganism = useFoundOrganismsState();
  const isLoading = useIsOrganismLoading();
  return (
    <div css={[phenotypeSection, css]} className={className}>
      <div css={phenotypes}>
        <PhenotypeSearchArea />
      </div>
      <div css={organisms}>
        <p css={infoTextCSS}>{getInfoText(foundOrganism.length, isLoading)}</p>
        <OrganismList />
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
const organisms = css`
  max-width: 50%;
  flex-grow: 1;
  padding: ${SIZE2};
`;

const infoTextCSS = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-bottom: ${SIZE1};
`;

const getInfoText = (organismLength: number, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (organismLength === 0) {
    return "No organisms found";
  } else if (organismLength === 1) {
    return "1 organism found";
  } else {
    return `${organismLength} organisms found`;
  }
};
