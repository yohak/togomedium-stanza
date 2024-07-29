import { css } from "@emotion/react";
import React, { FC } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";

type Props = {};

export const TaxonomicTreeSection: FC<Props> = () => {
  useInitTaxonTree();

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
