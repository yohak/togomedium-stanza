import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { Optional } from "yohak-tools";
import { StanzaView } from "./components/StanzaView";
import { getTaxonData } from "./utils/api";
import { fetchWikipediaData } from "../../shared/components/info-detail/WikipediaView";

type Props = {
  stanzaElement?: ShadowRoot;
  tax_id: string;
};

const useTaxonDataQuery = (tax_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [{ tax_id }],
    queryFn: async () => getTaxonData(tax_id),
    staleTime: Infinity,
  });
  return { taxonData: data, isLoading };
};
const useWikipediaQuery = (scientificName: Optional<string>) => {
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientificName}`;
  const { data } = useQuery({
    queryKey: ["wikipedia", scientificName],
    queryFn: async () => await fetchWikipediaData(wikipediaLink),
    staleTime: Infinity,
    enabled: scientificName !== undefined,
  });
  return data;
};

const App: FC<Props> = ({ tax_id }) => {
  const { taxonData, isLoading } = useTaxonDataQuery(tax_id);
  const wikipediaData = useWikipediaQuery(taxonData?.scientificName);
  if (isLoading || !taxonData) return <>Loading...</>;
  return <StanzaView {...taxonData} wikipediaData={wikipediaData} />;
};

export default App;
