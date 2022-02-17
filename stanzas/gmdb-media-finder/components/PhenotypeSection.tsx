import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { RangeSlider } from "./RangeSlider";
import { SelectBox } from "./SelectBox";
import { COLOR_WHITE } from "../../../components/styles";

type Props = {} & AcceptsEmotion;

export const PhenotypeSection: FC<Props> = ({ css, className }) => {
  return (
    <div css={[phenotypeSection, css]} className={className}>
      <div css={phenotypes}>
        <RangeSlider
          css={sliderStyle}
          min={0}
          max={110}
          label={"Growth Temperature"}
          marks={[
            { value: 0, label: "0°C" },
            { value: 37, label: "37°C" },
            { value: 110, label: "110°C" },
          ]}
        />
        <RangeSlider
          css={sliderStyle}
          min={0}
          max={14}
          label={"Growth pH"}
          marks={[
            { value: 0, label: "0" },
            { value: 14, label: "14" },
          ]}
        />
        <SelectBox
          label={"Oxygen requirement"}
          labelId={"MPO_10002"}
          items={[
            ["MPO_04002", "Aerobe"],
            ["MPO_04003", "Anaerobe"],
            ["MPO_04004", "Obligate aerobe"],
            ["MPO_04005", "Facultative aerobe"],
            ["MPO_04006", "Obligate anaerobe"],
            ["MPO_04007", "Facultative anaerobe"],
            ["MPO_04009", "Microaerophilic"],
          ]}
        />
        <SelectBox
          label={"Gram Strain"}
          labelId={"MPO_10002"}
          items={[
            ["MPO_07002", "Gram+"],
            ["MPO_07003", "Gram-"],
          ]}
        />
        <SelectBox
          label={"Motility"}
          labelId={"MPO_10002"}
          items={[
            ["MPO_02001", "Motile"],
            ["MPO_02002", "Nonmotile"],
            ["MPO_02007", "Chemotactic"],
          ]}
        />
        <SelectBox
          label={"Cell shape"}
          labelId={"MPO_10002"}
          items={[
            ["MPO_01015", "Rod-shaped"],
            ["MPO_01003", "Coccus-shaped"],
            ["MPO_01005", "Curved-shaped"],
            ["MPO_01014", "Pleomorphic-shaped"],
            ["MPO_01007", "Filament-shaped"],
            ["MPO_01003", "Sphere-shaped"],
            ["MPO_01022", "Vibrio-shaped"],
            ["MPO_01021", "Star-shaped"],
            ["MPO_01026", "Triangular"],
            ["MPO_01018", "Spiral-shaped"],
            ["MPO_01010", "Helical-shaped"],
            ["MPO_01003", "Coccoid"],
            ["MPO_01013", "Ovoid-shaped"],
            ["MPO_01012", "Oval-shaped"],
            ["MPO_01017", "Spindle-shaped"],
            ["MPO_01004", "Crescent-shaped"],
            ["MPO_01009", "Fusiform"],
            ["MPO_01020", "Square-shaped"],
            ["MPO_01019", "Spore-shaped"],
            ["MPO_01006", "Disc-shaped"],
            ["MPO_01008", "Flask-shaped"],
          ]}
        />
        <SelectBox
          label={"Salinity"}
          labelId={"MPO_10002"}
          items={[
            ["MPO_03007", "Halophile"],
            ["MPO_03008", "Halotolerant"],
          ]}
        />
      </div>
      <div></div>
    </div>
  );
};

const phenotypeSection = css`
  background-color: ${COLOR_WHITE};
  padding: 0 20px;
`;

const sliderStyle = css`
  & + & {
    margin-top: 10px;
  }
`;

const phenotypes = css`
  width: 50%;
`;
