import { Nullable } from "yohak-tools";
import { isArray } from "yohak-tools/";
import { ApiResponse, SimpleObject } from "./types";

export const getData = async <ResponseBody, Params extends SimpleObject = SimpleObject>(
  url: string,
  params: Params,
  abortController?: AbortController
): Promise<ApiResponse<ResponseBody>> => {
  const response = await fetch(
    url,
    makeOptions(params, abortController ? abortController.signal : null)
  );

  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.statusText,
      body: undefined,
    };
  }
  const body: ResponseBody = await response.json();
  return {
    status: 200,
    body,
  };
};

export const makeFormBody = (params: SimpleObject) => {
  const formBody = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(isArray(value) ? value.join(",") : value)}`
  );
  return formBody.join("&");
};

const makeOptions = (params: SimpleObject, signal: Nullable<AbortSignal> = null): RequestInit => {
  const body = makeFormBody(params);
  return {
    method: "POST",
    mode: "cors",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    signal,
  };
};
