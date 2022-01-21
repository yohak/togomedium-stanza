import React, { useEffect, useState } from "react";
import { ScrollableTable } from "./components/ScrollableTable";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";
import { API_MEDIA_ALIMENT } from "../../api/paths";
import { getData } from "../../utils/getData";

export type AppProps = {
  gm_ids: string[];
};

const App = ({ gm_ids }: AppProps) => {
  const [data, setData] = useState<MediaAlignmentTableResponse>();
  useEffect(() => {
    (async () => {
      const response = await getData<MediaAlignmentTableResponse>(API_MEDIA_ALIMENT, {});
      setData(response.body);
    })();
  }, [gm_ids]);
  return <>{data && <ScrollableTable data={data} />}</>;
};

export default App;
