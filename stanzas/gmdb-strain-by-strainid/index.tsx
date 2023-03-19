import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const strain_id = this.params.strain_id;
    return <App stanzaElement={this.root} strain_id={strain_id} />;
  }
}

type StanzaParameters = {
  strain_id: string;
};
