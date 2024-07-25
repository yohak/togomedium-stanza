import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react";
import { StanzaView } from "./components/StanzaView";
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
  const { data, isLoading, error, isPlaceholderData } = useQuery({
    queryKey: [{ offset }, { limit }, { apiUrl }],
    queryFn: async () => {
      const response = await fetchData(apiUrl, offset, limit);
      return response.body;
    },
    placeholderData: (previousData) => previousData,
    staleTime: Infinity,
  });
  const errorMessage = error?.message || "";
  const updateLimit = () => {
    data && data.total < limit ? setLimit(data.total) : "";
  };
  useEffect(() => {
    updateLimit();
  }, [data]);
  const showLoading = isLoading || isPlaceholderData;
  return { offset, setOffset, limit, setLimit, showLoading, data, errorMessage };
};

const App: FC<Props> = ({ apiUrl, initialLimit, title, showColumnNames, columnSizes, webFont }) => {
  const { offset, setOffset, limit, setLimit, showLoading, data, errorMessage } = useTableData(
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
        showLoading,
        errorMessage,
      }}
    />
  );
};

export default App;
