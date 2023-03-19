import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../shared/components/EmotionCacheProvider";
import { muiTheme } from "../../shared/components/muiTheme";
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
    const gmIds = stringToArray(this.params.gm_ids);
    const hideMedia = this.params.hide_media === "true";
    const stanzaElement = this.root;
    ReactDOM.render(
      <StrictMode>
        <RecoilRoot>
          <ThemeProvider theme={muiTheme}>
            <EmotionCacheProvider>
              <App {...{ hideMedia, gmIds, stanzaElement }} />
            </EmotionCacheProvider>
          </ThemeProvider>
        </RecoilRoot>
      </StrictMode>,
      main
    );
  }
}

type StanzaParameters = {
  gm_ids: string;
  hide_media?: "true" | "false";
};
