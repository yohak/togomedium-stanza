import React, { FC, useEffect, useState } from "react";
import { StanzaView } from "./components/StanzaView";
import { ListApiBody } from "./types";
import { fetchData } from "./utils/api";
import { ApiResponse } from "../../shared/utils/types";

type Props = {
  stanzaElement?: ShadowRoot;
  apiUrl: string;
  initialLimit: number;
  title: string;
  showColumnNames: boolean;
  columnSizes: number[];
  webFont: string;
};

const useTableData = (apiUrl: string, initialLimit: number) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(initialLimit);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiResponse<ListApiBody>>();

  useEffect(() => {
    setIsLoading(true);
    fetchData(apiUrl, offset, limit).then((response) => {
      setData(response);
      console.log(response?.body);
      setIsLoading(false);
    });
  }, [apiUrl, limit, offset]);
  return { offset, setOffset, limit, setLimit, isLoading, data };
};

const App: FC<Props> = ({ apiUrl, initialLimit, title, showColumnNames, columnSizes, webFont }) => {
  const { offset, setOffset, limit, setLimit, isLoading, data } = useTableData(
    apiUrl,
    initialLimit
  );
  if (!data) {
    return <></>;
  }
  if (data.status !== 200 || !data.body) {
    return <div>Error: {data.message}</div>;
  }
  return (
    <StanzaView
      {...{
        data: data.body,
        title,
        showColumnNames,
        columnSizes,
        offset,
        setOffset,
        limit,
        setLimit,
        isLoading,
      }}
    />
  );
};

export default App;
