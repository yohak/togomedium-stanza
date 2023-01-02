import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../shared/components/EmotionCacheProvider";
import { importWebFontForTogoMedium } from "../../shared/utils/stanza";
import { stringToArray } from "../../shared/utils/string";

export default class HelloReact extends Stanza<StanzaParameters> {
  async render() {
    this._render();
    importWebFontForTogoMedium(this);
  }

  handleAttributeChange() {
    this._render();
  }

  _render() {
    const main = this.root.querySelector("main");
    const gm_ids = stringToArray(this.params.gm_ids);
    const prioritizedOrganism = this.params.prioritized_tax_ids
      ? stringToArray(this.params.prioritized_tax_ids)
      : [];
    ReactDOM.render(
      <StrictMode>
        <RecoilRoot>
          <EmotionCacheProvider>
            <App {...{ gm_ids, stanzaElement: this.root, prioritizedOrganism }} />
          </EmotionCacheProvider>
        </RecoilRoot>
      </StrictMode>,
      main
    );
  }
}

type StanzaParameters = {
  gm_ids: string;
  prioritized_tax_ids?: string;
};
