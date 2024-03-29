import React, { FC, useEffect, useState } from "react";
import { Optional } from "yohak-tools";
import { StanzaView } from "./components/StanzaView";
import { getTaxonData, ViewProps } from "./utils/api";
import { fetchWikipediaData } from "../../shared/components/info-detail/WikipediaView";

type Props = {
  stanzaElement?: ShadowRoot;
  tax_id: string;
};

const App: FC<Props> = ({ tax_id }) => {
  const [props, setProps] = useState<Optional<ViewProps>>(undefined);
  useEffect(() => {
    (async () => {
      const result = await getTaxonData(tax_id);
      // console.log(result);
      if (!result) return;
      setProps(result);
      //
      const wikipediaLink = `https://en.wikipedia.org/wiki/${result.scientificName}`;
      const wikipediaData = await fetchWikipediaData(wikipediaLink);
      setProps({ ...result, wikipediaData });
    })();
  }, [tax_id]);
  return props ? <StanzaView {...props} /> : <>Loading...</>;
};

export default App;
