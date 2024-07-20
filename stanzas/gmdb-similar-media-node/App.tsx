import React, { FC } from "react";
import { StanzaView } from "./components/StanzaView";

type Props = {
  stanzaElement?: ShadowRoot;
  gmId: string;
};

const App: FC<Props> = ({ gmId }) => {
  return <StanzaView gmId={gmId} />;
};

export default App;
