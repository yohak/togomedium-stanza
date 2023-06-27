import React, { FC, useEffect, useState } from "react";
import { StanzaView } from "./components/StanzaView";
import { getComponentData, ViewProps } from "./utils/api";
import { fetchWikipediaData } from "../../shared/components/info-detail/WikipediaView";

type Props = {
  stanzaElement?: ShadowRoot;
  gmo_id: string;
};

const App: FC<Props> = ({ gmo_id }) => {
  const [props, setProps] = useState<ViewProps | null>(null);
  useEffect(() => {
    (async () => {
      const result = await getComponentData(gmo_id);
      if (!result) return;
      setProps(result);
      const wikipediaLink = result.links.find((item) => item.label === "Wikipedia");
      if (wikipediaLink) {
        const wikipediaData = await fetchWikipediaData(wikipediaLink.uri);
        setProps({ ...result, wikipediaData });
      }
    })();
  }, [gmo_id]);
  return props ? <StanzaView {...props} /> : <>Loading...</>;
};

export default App;
