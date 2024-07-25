import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { StanzaView } from "./components/StanzaView";
import { getComponentData, ViewProps } from "./utils/api";
import { fetchWikipediaData } from "../../shared/components/info-detail/WikipediaView";

type Props = {
  stanzaElement?: ShadowRoot;
  gmo_id: string;
};
const useComponentDataQuery = (gmo_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [{ gmo_id }],
    queryFn: () => getComponentData(gmo_id),
    staleTime: Infinity,
  });
  return { componentData: data, isLoading };
};
const useWikipediaQuery = (component: ViewProps | undefined) => {
  const wikipediaLink = component?.links.find((item) => item.label === "Wikipedia");
  const { data } = useQuery({
    queryKey: [{ wikipedia: wikipediaLink?.uri }],
    queryFn: async () => await fetchWikipediaData(wikipediaLink?.uri ?? ""),
    staleTime: Infinity,
    enabled: wikipediaLink !== undefined,
  });
  return data;
};

const App: FC<Props> = ({ gmo_id }) => {
  const { componentData, isLoading } = useComponentDataQuery(gmo_id);
  const wikipediaData = useWikipediaQuery(componentData);
  if (isLoading || !componentData) return <>Loading...</>;
  return <StanzaView {...componentData} wikipediaData={wikipediaData} />;
};

export default App;
