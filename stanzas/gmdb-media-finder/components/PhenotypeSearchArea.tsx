import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { RangeSlider } from "./RangeSlider";
import { SelectBox } from "./SelectBox";
import {
  OrganismsByPhenotypeParams,
  OrganismsByPhenotypesResponse,
} from "../../../api/organisms_by_phenotypes/types";
import { API_ORGANISMS_BY_PHENOTYPES } from "../../../api/paths";
import { COLOR_WHITE } from "../../../components/styles";
import { getData } from "../../../utils/getData";
import { LabelInfo } from "../../../utils/types";
import { useFoundOrganismsMutators } from "../states/foundOrganisms";
import { useOrganismLoadAbortMutators } from "../states/organismLoadAbort";
import { usePhenotypeQueryMutators, usePhenotypeQueryState } from "../states/phenotypeQuery";

type Props = {} & AcceptsEmotion;

export const PhenotypeSearchArea: FC<Props> = ({ css, className }) => {
  const { handleEnabledChange, handleValueChange } = usePhenotypeQuery();

  return (
    <div css={[phenotypeSearchArea, css]} className={className}>
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
        queryKey={"growth_temp"}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
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
        queryKey={"growth_ph"}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
      <SelectBox
        label={"Oxygen requirement"}
        items={[
          ["MPO_04002", "Aerobe"],
          ["MPO_04003", "Anaerobe"],
          ["MPO_04004", "Obligate aerobe"],
          ["MPO_04005", "Facultative aerobe"],
          ["MPO_04006", "Obligate anaerobe"],
          ["MPO_04007", "Facultative anaerobe"],
          ["MPO_04009", "Microaerophilic"],
        ]}
        queryKey={"MPO_10002"}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
      <SelectBox
        label={"Gram Strain"}
        queryKey={"MPO_10002"}
        items={[
          ["MPO_07002", "Gram+"],
          ["MPO_07003", "Gram-"],
        ]}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
      <SelectBox
        label={"Motility"}
        queryKey={"MPO_10002"}
        items={[
          ["MPO_02001", "Motile"],
          ["MPO_02002", "Nonmotile"],
          ["MPO_02007", "Chemotactic"],
        ]}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
      <SelectBox
        label={"Cell shape"}
        queryKey={"MPO_10002"}
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
          // ["MPO_01003", "Coccoid"],
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
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
      <SelectBox
        label={"Salinity"}
        queryKey={"MPO_10002"}
        items={[
          ["MPO_03007", "Halophile"],
          ["MPO_03008", "Halotolerant"],
        ]}
        handleEnabledChange={handleEnabledChange}
        handleValueChange={handleValueChange}
      />
    </div>
  );
};

const phenotypeSearchArea = css`
  background-color: ${COLOR_WHITE};
  padding: 0 20px;
`;

const sliderStyle = css`
  & + & {
    margin-top: 10px;
  }
`;

const usePhenotypeQuery = () => {
  const phenotypeQuery = usePhenotypeQueryState();
  const { setFoundOrganisms } = useFoundOrganismsMutators();
  const { setNextOrganismLoadAbort } = useOrganismLoadAbortMutators();
  const { updatePhenotypeQuery, removePhenotypeQuery } = usePhenotypeQueryMutators();
  const handleEnabledChange = (key: string, enabled: boolean) => {
    if (!enabled) {
      removePhenotypeQuery(key);
    }
  };
  const handleValueChange = (key: string, value: string) => {
    updatePhenotypeQuery(key, value);
  };
  useEffect(() => {
    if (Object.entries(phenotypeQuery).length === 0) {
      setFoundOrganisms([]);
      setNextOrganismLoadAbort(null);
      return;
    }
    (async () => {
      const abort: AbortController = new AbortController();
      setNextOrganismLoadAbort(abort);
      const response = await getData<OrganismsByPhenotypesResponse, OrganismsByPhenotypeParams>(
        API_ORGANISMS_BY_PHENOTYPES,
        phenotypeQuery,
        abort
      );
      setNextOrganismLoadAbort(null);
      if (response.body) {
        setFoundOrganisms(
          response.body.map<LabelInfo>((item) => ({ id: item.tax_id, label: item.name }))
        );
      }
    })();
  }, [phenotypeQuery]);

  return { handleEnabledChange, handleValueChange };
};
