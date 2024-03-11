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
  const [data, setData] = useState<ListApiBody>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const handler = window.setTimeout(() => {
      fetchData(apiUrl, offset, limit).then((response) => {
        if (response.body) {
          setData(response.body);
        } else {
          if (response.message) {
            setErrorMessage(response.message);
          }
        }
        setIsLoading(false);
      });
    }, 100);
    return () => window.clearTimeout(handler);
  }, [apiUrl, limit, offset]);
  useEffect(() => {
    if (!data) return;
    if (data.total < limit) {
      setLimit(data.total);
    }
  }, [limit, setLimit, data]);
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
        limit,
        setLimit,
        isLoading,
        errorMessage,
      }}
    />
  );
};

export default App;
