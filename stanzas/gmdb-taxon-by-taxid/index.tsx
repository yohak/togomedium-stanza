import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

type StanzaParameters = {
  tax_id: string;
};
export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const tax_id = this.params.tax_id;
    return <App stanzaElement={this.root} tax_id={tax_id} />;
  }
}
