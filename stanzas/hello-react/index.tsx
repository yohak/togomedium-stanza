import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Stanza from "togostanza/stanza";
import App from "./App";
import { EmotionCacheProvider } from "../../shared/components/EmotionCacheProvider";

export default class HelloReact extends Stanza {
  async render() {
    const main = this.root.querySelector("main");
    const props = this.params;
    ReactDOM.render(
      <StrictMode>
        <EmotionCacheProvider>
          <App {...(props as any)} />
        </EmotionCacheProvider>
      </StrictMode>,
      main
    );
  }

  handleAttributeChange() {
    const main = this.root.querySelector("main");
    const props = this.params;
    ReactDOM.render(
      <StrictMode>
        <EmotionCacheProvider>
          <App {...(props as any)} />
        </EmotionCacheProvider>
      </StrictMode>,
      main
    );
  }
}
