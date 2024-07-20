import { ThemeProvider } from "@mui/material/styles";
import React, { StrictMode, FC, ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import Stanza from "togostanza/stanza";
import { EmotionCacheProvider } from "./components/EmotionCacheProvider";
import { muiTheme } from "./components/muiTheme";

const StanzaReactProvider: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={muiTheme}>
          <EmotionCacheProvider>{children}</EmotionCacheProvider>
        </ThemeProvider>
      </RecoilRoot>
    </StrictMode>
  );
};
const importWebFontForTogoMedium = (stanza: Stanza, name: string = "Fira Sans Condensed") => {
  name = name.replace(/ /gi, "+");
  stanza.importWebFontCSS(`https://fonts.googleapis.com/css2?family=${name}:wght@400;500;700`);
};

export abstract class TogoMediumReactStanza<T> extends Stanza {
  abstract makeApp(): React.ReactElement;
  async render() {
    this._render();
    importWebFontForTogoMedium(this);
  }

  handleAttributeChange() {
    this._render();
  }
  _render() {
    const main = this.root.querySelector("main");
    const children = this.makeApp();
    const root = createRoot(main as HTMLElement);
    root.render(<StanzaReactProvider>{children}</StanzaReactProvider>);
  }
}
