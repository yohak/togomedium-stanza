import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react";
import { StanzaView } from "./components/StanzaView";
import { ListApiBody } from "./types";
import { fetchData } from "./utils/api";

type Props = {
  stanzaElement?: ShadowRoot;
  apiUrl: string;
  initialLimit: number;
  title: string;
  showColumnNames: boolean;
  columnSizes: number[];
  webFont: string;
};

const useTableData = (apiUrl: string, initialLimit: number = 100) => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [data, setData] = useState<ListApiBody | null>(null);
  const {
    data: result,
    isLoading,
    error,
  } = useQuery({
    queryKey: [{ offset }, { limit }],
    queryFn: async () => {
      const response = await fetchData(apiUrl, offset, limit);
      return response.body;
    },
    staleTime: Infinity,
  });
  useEffect(() => {
    if (result) {
      setData(result);
    }
  }, [result]);
  const errorMessage = error?.message || "";

  useEffect(() => {
    if (!data) return;
    if (data.total < limit) {
      setLimit(data.total);
    }
  }, [limit, data]);
  return { offset, setOffset, limit, setLimit, isLoading, data, errorMessage };
};

const App: FC<Props> = ({ apiUrl, initialLimit, title, showColumnNames, columnSizes, webFont }) => {
  const { offset, setOffset, limit, setLimit, isLoading, data, errorMessage } = useTableData(
    apiUrl,
    initialLimit
  );
  if (!data) {
    return <>{errorMessage}</>;
  }
  return (
    <StanzaView
      {...{
        data,
        title,
        showColumnNames,
        columnSizes,
        offset,
        setOffset,
        limit: !isNaN(limit) ? limit : data.total,
        setLimit,
        isLoading,
        errorMessage,
      }}
    />
  );
};

export default App;
