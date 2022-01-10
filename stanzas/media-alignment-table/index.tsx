import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../components/EmotionCacheProvider";
import { stringToArray } from "../../utils/string";

export default class HelloReact extends Stanza<StanzaParameters> {
  async render() {
    this._render();
  }

  handleAttributeChange() {
    this._render();
  }

  _render() {
    const main = this.root.querySelector("main");
    const gmids = stringToArray(this.params.gm_ids);
    ReactDOM.render(
      <StrictMode>
        <EmotionCacheProvider>
          <App {...{ gmids }} />
        </EmotionCacheProvider>
      </StrictMode>,
      main
    );
  }
}

type StanzaParameters = {
  gm_ids: string;
};
