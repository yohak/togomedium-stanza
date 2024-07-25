import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { ScrollableTable } from "./components/ScrollableTable";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";
import { API_MEDIA_ALIGNMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../shared/styles/variables";
import { getData } from "../../shared/utils/getData";

export type AppProps = {
  gm_ids: string[];
  prioritizedOrganism?: string[];
  stanzaElement?: ShadowRoot;
};

const useDataQuery = (
  gm_ids: string[],
  stanzaDispatch: (eventName: string, detail: any) => void
) => {
  return useQuery({
    queryKey: ["media-alignment", { gm_ids }],
    queryFn: async () => {
      stanzaDispatch("STANZA_ON_QUERY_DATA", gm_ids);
      const response = await getData<MediaAlignmentTableResponse>(API_MEDIA_ALIGNMENT, { gm_ids });
      if (!response.body) throw new Error("No data");
      stanzaDispatch("STANZA_ON_LOAD_DATA", response.body);
      return response.body;
    },
    enabled: gm_ids.length > 0,
    staleTime: Infinity,
  });
};

const App = ({ gm_ids, stanzaElement, prioritizedOrganism = [] }: AppProps) => {
  const dispatchStanzaEvent = useCallback(
    (eventName: string, detail: any) => {
      if (!stanzaElement) return;
      const e = new CustomEvent(eventName, { bubbles: true, composed: true, detail });
      stanzaElement.dispatchEvent(e);
    },
    [stanzaElement]
  );
  const dataQuery = useDataQuery(gm_ids, dispatchStanzaEvent);
  if (!dataQuery.data) return <div css={wrapper}>Loading...</div>;
  return (
    <div css={wrapper}>
      <ScrollableTable data={dataQuery.data} prioritizedOrganism={prioritizedOrganism} />
    </div>
  );
};

const wrapper = css`
  min-height: 100px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;

export default App;
