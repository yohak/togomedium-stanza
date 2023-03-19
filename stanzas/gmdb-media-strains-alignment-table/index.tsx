import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";
import { stringToArray } from "../../shared/utils/string";

type StanzaParameters = {
  gm_ids: string;
  hide_media?: "true" | "false";
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmIds = stringToArray(this.params.gm_ids);
    const hideMedia = this.params.hide_media === "true";
    return <App {...{ hideMedia, gmIds, stanzaElement: this.root }} />;
  }
}
