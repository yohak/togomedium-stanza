import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { ScrollableTable } from "./components/ScrollableTable";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";
import { API_MEDIA_ALIMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../components/styles";
import { getData } from "../../utils/getData";

export type AppProps = {
  gm_ids: string[];
  stanzaElement?: Document;
};

const App = ({ gm_ids, stanzaElement }: AppProps) => {
  const [data, setData] = useState<MediaAlignmentTableResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatchLoadData = (detail: any) => {
    if (!stanzaElement) return;
    stanzaElement.dispatchEvent(
      new CustomEvent("STANZA_ON_LOAD_DATA", { bubbles: true, composed: true, detail })
    );
  };
  const dispatchOnQueryData = (detail: string[]) => {
    if (!stanzaElement) return;
    stanzaElement.dispatchEvent(
      new CustomEvent("STANZA_ON_QUERY_DATA", { bubbles: true, composed: true, detail })
    );
  };
  useEffect(() => {
    setData(undefined);
    setIsLoading(true);
    (async () => {
      dispatchOnQueryData(gm_ids);
      const response = await getData<MediaAlignmentTableResponse>(API_MEDIA_ALIMENT, { gm_ids });
      setIsLoading(false);
      setData(response.body);
      dispatchLoadData(response.body);
    })();
  }, [gm_ids]);
  return <div css={wrapper}>{data && <ScrollableTable data={data} />}</div>;
};

const wrapper = css`
  min-height: 100px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;
const loadingWrapper = css``;

export default App;
