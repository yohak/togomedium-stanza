import React, { FC, useEffect, useState } from "react";
import { Optional } from "yohak-tools";
import { StanzaView } from "./components/StanzaView";

type Props = {
  stanzaElement?: Document;
  gmId: string;
};

const App: FC<Props> = ({ gmId }) => {
  return <StanzaView gmId={gmId} />;
};

export default App;
