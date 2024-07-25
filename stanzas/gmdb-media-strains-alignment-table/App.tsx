import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AppContainer } from "./components/AppContainer";
import { MediaStrainsAlimentResponse } from "../../api/media_strains_alignment/types";
import { API_MEDIA_STRAINS_ALIGNMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../shared/styles/variables";
import { getData } from "../../shared/utils/getData";

export type AppProps = {
  gmIds: string[];
  hideMedia?: boolean;
  prioritizedOrganism?: string[];
  stanzaElement?: ShadowRoot;
};

const useData = (gmIds: string[]) => {
  const { data, isLoading } = useQuery({
    queryKey: [...gmIds],
    queryFn: async () => {
      const result = await getData<MediaStrainsAlimentResponse>(API_MEDIA_STRAINS_ALIGNMENT, {
        gm_ids: gmIds.join(","),
      });
      if (!result.body) throw new Error("No data");
      return result.body;
    },
  });
  return { data, isLoading };
};

const App = ({ gmIds, hideMedia = false }: AppProps) => {
  const { data, isLoading } = useData(gmIds);
  if (isLoading) return <>Loading...</>;
  return <div css={wrapper}>{data && <AppContainer {...{ data, hideMedia }} />}</div>;
};

const wrapper = css`
  min-height: 100px;
  width: fit-content;
  min-width: 100%;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;

export default App;
