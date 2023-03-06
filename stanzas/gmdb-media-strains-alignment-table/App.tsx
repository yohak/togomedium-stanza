import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { AppContainer } from "./components/AppContainer";
import { MediaStrainsAlimentResponse } from "../../api/media_strains_alignment/types";
import { API_MEDIA_STRAINS_ALIGNMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../shared/styles/variables";
import { getData } from "../../shared/utils/getData";
export type AppProps = {
  gm_ids: string[];
  prioritizedOrganism?: string[];
  stanzaElement?: Document;
};

const App = ({ gm_ids, stanzaElement }: AppProps) => {
  const [data, setData] = useState<MediaStrainsAlimentResponse>();
  useEffect(() => {
    (async () => {
      const response = await getData<MediaStrainsAlimentResponse>(API_MEDIA_STRAINS_ALIGNMENT, {
        gm_ids: gm_ids.join(","),
      });
      setData(response.body);
    })();
  }, [gm_ids]);
  return <div css={wrapper}>{data && <AppContainer data={data}></AppContainer>}</div>;
};

const wrapper = css`
  min-height: 100px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;

export default App;