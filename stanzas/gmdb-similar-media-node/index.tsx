import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmId = this.params.gm_id;
    return <App stanzaElement={this.root} gmId={gmId} />;
  }
}

type StanzaParameters = {
  gm_id: string;
};
