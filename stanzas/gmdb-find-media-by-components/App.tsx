import React, { FC } from "react";
import { AppContainer } from "./components/AppContainer";

type Props = {
  stanzaElement?: ShadowRoot;
};

const App: FC<Props> = ({ stanzaElement }) => {
  const dispatchEvent = (gmIds: string[]) => {
    console.log(stanzaElement);
    if (!stanzaElement) return;
    //
    stanzaElement.dispatchEvent(
      new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds })
    );
    console.log("dispatch", { detail: gmIds });
  };

  return <AppContainer dispatchEvent={dispatchEvent} />;
};

export default App;
