import React, { FC, useEffect, useState } from "react";
import { StanzaView, WikipediaData } from "./components/StanzaView";
import { getComponentData, ViewProps } from "./utils/api";

type Props = {
  stanzaElement?: Document;
  gmo_id: string;
};

const App: FC<Props> = ({ gmo_id }) => {
  const [props, setProps] = useState<ViewProps>(makeEmptyProps());
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
  return <StanzaView {...props} />;
};

export default App;

const makeEmptyProps = (): ViewProps => ({
  prefLabel: "",
  gmoId: "",
  altLabels: [],
  properties: [],
  roles: [],
  superClasses: [],
  subClasses: [],
  links: [],
});

const fetchWikipediaData = async (link: string): Promise<WikipediaData> => {
  const key = link.split("/").pop();
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data) return { link };
  return { thumb: data.thumbnail?.source, description: data.extract, link };
};
