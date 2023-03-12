import React, { FC, useEffect, useState } from "react";
import { Optional } from "yohak-tools";
import { StanzaView } from "./components/StanzaView";
import { getStrainData, ViewProps } from "./utils/api";

type Props = {
  stanzaElement?: Document;
  strain_id: string;
};

const App: FC<Props> = ({ strain_id }) => {
  const [props, setProps] = useState<Optional<ViewProps>>(undefined);
  useEffect(() => {
    (async () => {
      const result = await getStrainData(strain_id);
      if (!result) return;
      setProps(result);
    })();
  }, [strain_id]);
  return props ? <StanzaView {...props} /> : <></>;
};

export default App;
