import React, { FC, useEffect, useState } from "react";
import { Optional } from "yohak-tools";
import { StanzaView, WikipediaData } from "./components/StanzaView";
import { getTaxonData, ViewProps } from "./utils/api";

type Props = {
  stanzaElement?: Document;
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
    })();
  }, [tax_id]);
  return props ? <StanzaView {...props} /> : <>Loading...</>;
};

export default App;

const fetchWikipediaData = async (link: string): Promise<WikipediaData> => {
  const key = link.split("/").pop();
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data) return { link };
  return { thumb: data.thumbnail?.source, description: data.extract, link };
};
