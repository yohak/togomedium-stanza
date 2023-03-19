import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

type StanzaParameters = {};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    return <App stanzaElement={this.root} />;
  }
}
