import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { StanzaView } from "./components/StanzaView";
import { getStrainData } from "./utils/api";

type Props = {
  stanzaElement?: ShadowRoot;
  strain_id: string;
};
const useStrainDataQuery = (strain_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["strain", strain_id],
    queryFn: async () => getStrainData(strain_id),
    staleTime: Infinity,
  });
  return { strainData: data, isLoading };
};

const App: FC<Props> = ({ strain_id }) => {
  const { strainData, isLoading } = useStrainDataQuery(strain_id);
  if (isLoading) return <>Loading...</>;
  if (!strainData) return <>No data found</>;
  return <StanzaView {...strainData} />;
};

export default App;
