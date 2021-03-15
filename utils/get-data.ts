export const getData = async <T>(
  url: string,
  params: SimpleObject
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, makeOptions(params));

  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.statusText,
      body: null,
    };
  }
  const body: T = await response.json();
  return {
    status: 200,
    body,
  };
};

export const makeFormBody = (params: SimpleObject) => {
  const formBody = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(value)}`
  );
  return formBody.join("&");
};

const makeOptions = (params: SimpleObject): RequestInit => {
  const body = makeFormBody(params);
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
