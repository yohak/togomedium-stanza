import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Optional } from "yohak-tools";
import { AppContainer } from "./components/AppContainer";
import { MediaStrainsAlimentResponse } from "../../api/media_strains_alignment/types";
import { API_MEDIA_STRAINS_ALIGNMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../shared/styles/variables";
import { getData } from "../../shared/utils/getData";
export type AppProps = {
  gmIds: string[];
  hideMedia?: boolean;
  prioritizedOrganism?: string[];
  stanzaElement?: Document;
};

const App = ({ gmIds, stanzaElement, hideMedia = false }: AppProps) => {
  const [data, setData] = useState<Optional<MediaStrainsAlimentResponse>>(undefined);
  useEffect(() => {
    if (gmIds.length === 0) return;
    (async () => {
      const response = await getData<MediaStrainsAlimentResponse>(API_MEDIA_STRAINS_ALIGNMENT, {
        gm_ids: gmIds.join(","),
      });
      setData(response.body);
    })();
  }, [gmIds]);
  return data ? (
    <div css={wrapper}>{data && <AppContainer {...{ data, hideMedia }} />}</div>
  ) : (
    <>Loading...</>
  );
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
