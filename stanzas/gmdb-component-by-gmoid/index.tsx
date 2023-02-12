import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../shared/components/EmotionCacheProvider";
import { muiTheme } from "../../shared/components/muiTheme";
import { importWebFontForTogoMedium } from "../../shared/utils/stanza";

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
    const gmo_id = this.params.gmo_id;
    ReactDOM.render(
      <StrictMode>
        <RecoilRoot>
          <ThemeProvider theme={muiTheme}>
            <EmotionCacheProvider>
              <App stanzaElement={this.root} gmo_id={gmo_id} />
            </EmotionCacheProvider>
          </ThemeProvider>
        </RecoilRoot>
      </StrictMode>,
      main
    );
  }
}

type StanzaParameters = {
  gmo_id: string;
};
