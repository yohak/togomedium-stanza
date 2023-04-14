import React, { FC, useEffect, useState } from "react";
import { StanzaView } from "./components/StanzaView";
import { getMedia, ViewProps } from "./utils/api";
type Props = {
  gm_id: string;
};

export const App: FC<Props> = ({ gm_id }) => {
  const [props, setProps] = useState<ViewProps | null>(null);
  useEffect(() => {
    (async () => {
      setProps(null);
      const result = await getMedia(gm_id);
      if (!result) return;
      setProps(result);
    })();
  }, [gm_id]);
  return props ? <StanzaView {...props} /> : <>Loading...</>;
};
