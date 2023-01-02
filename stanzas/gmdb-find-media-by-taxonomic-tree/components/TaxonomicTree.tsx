import React, { FC } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";

type Props = {};

export const TaxonomicTree: FC<Props> = () => {
  useInitTaxonTree();
  return (
    <div>
      <TaxonomicTreeBranch id="2157" />
      <TaxonomicTreeBranch id="2" />
      <TaxonomicTreeBranch id="2759" />
    </div>
  );
};
