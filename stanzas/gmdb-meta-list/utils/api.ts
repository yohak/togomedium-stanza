import { makeFormBody } from "../../../shared/utils/getData";
import { ApiResponse, SimpleObject } from "../../../shared/utils/types";
import { ListApiBody } from "../types";

export const fetchData = async (
  url: string,
  offset: number,
  limit: number
): Promise<ApiResponse<ListApiBody>> => {
  // return fetchDummy(query, offset, limit);
  return fetchLive(url, offset, limit);
};

const fetchLive = async (
  url: string,
  offset: number,
  limit: number
): Promise<ApiResponse<ListApiBody>> => {
  const [uri, query]: [string, string] = separateURL(url);
  const response = await fetch(uri, makeOptions({ offset, limit }, query));
  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.statusText,
      body: undefined,
    };
  }
  const body: any = await response.json();
  return {
    status: 200,
    body,
  };
};
const separateURL = (url: string): [string, string] => {
  const separated = /(.*)\?(.*)/.exec(url);
  let uri, query;
  if (separated) {
    uri = separated[1];
    query = separated[2];
  } else {
    uri = url;
    query = "";
  }
  return [uri, query];
};

const makeOptions = (params: SimpleObject, query: string): RequestInit => {
  const body = `${filterQuery(query)}&${makeFormBody(params)}`;

  return {
    method: "POST",
    mode: "cors",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
};

const filterQuery = (query: string | null): string => {
  if (!query) {
    return "";
  }
  let isOmitted: boolean = false;
  const result: string = query
    .split("&")
    .filter((str) => {
      const reg = /(.*)=(.*)/.exec(str);
      const [key, value]: [string, string] = [reg![1], reg![2]];
      switch (key) {
        case "limit":
        case "offset":
          isOmitted = true;
          return false;
        default:
          return true;
      }
    })
    .join("&");
  if (isOmitted) {
    console.warn("limit and offset on API_URL have been omitted as they are set from the Stanza");
  }
  // console.log(result);
  return result;
};

export const __TEST__ = { separateURL, filterQuery };
