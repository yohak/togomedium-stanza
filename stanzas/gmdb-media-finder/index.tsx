import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../components/EmotionCacheProvider";

export default class HelloReact extends Stanza<StanzaParameters> {
  async render() {
    this._render();
  }

  handleAttributeChange() {
    this._render();
  }

  _render() {
    const main = this.root.querySelector("main");
    ReactDOM.render(
      <StrictMode>
        <RecoilRoot>
          <EmotionCacheProvider>
            <App />
          </EmotionCacheProvider>
        </RecoilRoot>
      </StrictMode>,
      main
    );
  }
}

type StanzaParameters = {};
