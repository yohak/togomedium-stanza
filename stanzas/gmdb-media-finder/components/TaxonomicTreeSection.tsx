import React, { FC } from "react";
import { TaxonomicTree } from "./TaxonomicTree";

type Props = {};

export const TaxonomicTreeSection: FC<Props> = ({}) => {
  return (
    <div>
      <div>
        <TaxonomicTree />
      </div>
    </div>
  );
};
