import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";
import { stringToArray } from "../../shared/utils/string";

type StanzaParameters = {
  gm_ids: string;
  prioritized_tax_ids?: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gm_ids = stringToArray(this.params.gm_ids);
    const prioritizedOrganism = this.params.prioritized_tax_ids
      ? stringToArray(this.params.prioritized_tax_ids)
      : [];
    return <App {...{ gm_ids, stanzaElement: this.root, prioritizedOrganism }} />;
  }
}
