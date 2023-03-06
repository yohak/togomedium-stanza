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

export default class HelloReact extends Stanza {
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
    ReactDOM.render(
      <StrictMode>
        <RecoilRoot>
          <ThemeProvider theme={muiTheme}>
            <EmotionCacheProvider>
              <App stanzaElement={this.root} gm_ids={gm_ids} />
            </EmotionCacheProvider>
          </ThemeProvider>
        </RecoilRoot>
      </StrictMode>,
      main
    );
  }
}
