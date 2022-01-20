import React, { FC } from "react";
import { AttributesSection } from "./AttributesSection";
import { PhenotypeSection } from "./PhenotypeSection";
import { QueryMethodTab } from "./QueryMethodTab";
import { TaxonomicTreeSection } from "./TaxonomicTreeSection";
import { AcceptsEmotion } from "../../../utils/types";
import { useQueryMethodState } from "../states/queryMethod";

type Props = {} & AcceptsEmotion;

export const QueryPane: FC<Props> = ({ css, className }) => {
  const queryMethod = useQueryMethodState();
  return (
    <div css={[css]} className={className}>
      <QueryMethodTab />
      {queryMethod === "Taxonomic tree" && <TaxonomicTreeSection />}
      {queryMethod === "Organism phenotypes" && <PhenotypeSection />}
      {queryMethod === "Media attributes" && <AttributesSection />}
    </div>
  );
};
