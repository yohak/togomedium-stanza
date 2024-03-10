import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

export type StanzaParameters = {
  api_url: string;
  limit?: string;
  title?: string;
  column_names?: string;
  column_sizes?: string;
  web_font?: string;
};
export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const params = this.params as StanzaParameters;
    const apiUrl = params.api_url;
    const limit = parseInt(params.limit ?? "20");
    const title = params.title ?? "";
    const columNames = params.column_names === "true";
    const columnSizes = (params.column_sizes ?? "").split(",").map((s) => parseInt(s));
    const webFont = params.web_font ?? "Fira Sans Condensed";
    return (
      <App
        stanzaElement={this.root}
        apiUrl={apiUrl}
        initialLimit={limit}
        title={title}
        showColumnNames={columNames}
        columnSizes={columnSizes}
        webFont={webFont}
      />
    );
  }
}
