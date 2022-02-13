import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { TaxonomicTree } from "./TaxonomicTree";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";
import { useSelectedTaxonState } from "../states/selectedTaxon";

type Props = {};

export const TaxonomicTreeSection: FC<Props> = ({}) => {
  useInitTaxonTree();
  const selectedTaxon = useSelectedTaxonState();
  useEffect(() => {
    console.log(selectedTaxon);
  }, [selectedTaxon]);
  return (
    <div css={[taxonomicTreeSection]}>
      <div>
        <TaxonomicTreeBranch id="2157" />
        <TaxonomicTreeBranch id="2" />
        <TaxonomicTreeBranch id="2759" />
      </div>
    </div>
  );
};

const taxonomicTreeSection = css`
  //overflow: scroll;
`;
