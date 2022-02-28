import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { ScrollableTable } from "./components/ScrollableTable";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";
import { API_MEDIA_ALIMENT } from "../../api/paths";
import { COLOR_WHITE, SIZE1 } from "../../components/styles";
import { getData } from "../../utils/getData";

export type AppProps = {
  gm_ids: string[];
};

const App = ({ gm_ids }: AppProps) => {
  const [data, setData] = useState<MediaAlignmentTableResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setData(undefined);
    setIsLoading(true);
    (async () => {
      const response = await getData<MediaAlignmentTableResponse>(API_MEDIA_ALIMENT, { gm_ids });
      setIsLoading(false);
      setData(response.body);
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
