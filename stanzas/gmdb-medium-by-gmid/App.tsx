import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { StanzaView } from "./components/StanzaView";
import { getMedia } from "./utils/api";

type Props = {
  gm_id: string;
};

const useMediaDataQuery = (gm_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [{ gm_id }],
    queryFn: async () => getMedia(gm_id),
    staleTime: Infinity,
    enabled: gm_id !== undefined,
  });
  return { mediaData: data, isLoading };
};

export const App: FC<Props> = ({ gm_id }) => {
  const { mediaData, isLoading } = useMediaDataQuery(gm_id);
  if (isLoading || !mediaData) return <>Loading...</>;
  return <StanzaView {...mediaData} />;
};
