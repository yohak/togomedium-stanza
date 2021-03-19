import { makeFormBody } from "../../utils/get-data";
import { TemplateBase } from "../../utils/types";
import { importWebFontForTogoMedium } from "../../utils/stanza";

export default async function metaList(
  stanza: StanzaInstance,
  stanzaParams: StanzaParameters
) {
  if (!stanzaParams.api_url) {
    return;
  }
  const offset: number = 0;
  const data = await fetchData(
    stanzaParams.api_url,
    offset,
    parseInt(stanzaParams.limit, 10)
  );
  const templateParams: TemplateParameters = processData(
    data,
    offset,
    stanzaParams
  );
  render(stanza, templateParams, stanzaParams);
}

const render = (
  stanza: StanzaInstance,
  parameters: TemplateParameters,
  stanzaParams: StanzaParameters
) => {
  const limit: number = parseInt(stanzaParams.limit, 10);
  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters,
  });
  importWebFontForTogoMedium(stanza, stanzaParams.web_font);
  stanza.root.querySelector("#btnPrev")?.addEventListener("click", async () => {
    await movePage(stanza, parameters, stanzaParams, limit, DIRECTION.PREV);
  });
  stanza.root.querySelector("#btnNext")?.addEventListener("click", async () => {
    await movePage(stanza, parameters, stanzaParams, limit, DIRECTION.NEXT);
  });
};

const movePage = async (
  stanza: StanzaInstance,
  templateParams: TemplateParameters,
  stanzaParams: StanzaParameters,
  limit: number,
  direction: DIRECTION
) => {
  render(stanza, { ...templateParams, isLoading: true }, stanzaParams);
  const offset = templateParams.offset + limit * direction;
  const data = await fetchData(stanzaParams.api_url, offset, limit);
  const params: TemplateParameters = processData(data, offset, stanzaParams);
  render(stanza, params, stanzaParams);
};

const processData = (
  response: ApiResponse<ApiBody>,
  offset: number,
  stanzaParams: StanzaParameters
): TemplateParameters => {
  switch (response.status) {
    case 200:
      return makeSuccessData(response, offset, stanzaParams);
    default:
      return makeFailParams(response, stanzaParams);
  }
};

const makeSuccessData = (
  response: ApiResponse<ApiBody>,
  offset: number,
  stanzaParams: StanzaParameters
): TemplateParameters => {
  if (response.body.contents.length === 0) {
    return makeNotFoundParams(stanzaParams);
  }
  const columns: {
    label: string;
    size: number;
  }[] = response.body.columns.map((item) => ({
    label: item.label,
    size: item.size,
  }));
  const keys: string[] = response.body.columns.map((item) => item.key);
  const noWraps: { [key: string]: boolean } = {};
  response.body.columns.forEach((item) => (noWraps[item.key] = item.nowrap));
  const data: Item[][] = response.body.contents.map((item) => {
    const result: Item[] = [];
    keys.forEach((key) => {
      let value: StringItem;
      if (typeof item[key] === "string") {
        value = { label: item[key] as string };
      } else {
        value = item[key] as LinkItem;
      }
      if (noWraps[key]) {
        value.nowrap = true;
      }
      result.push(value);
    });
    return result;
  });
  const total: number = response.body.total;
  const _end: number = parseInt(stanzaParams.limit, 10) + offset;
  const end: number = _end <= total ? _end : total;
  const hasPrev: boolean = offset !== 0;
  const hasNext: boolean = end < total;
  const title: string = stanzaParams.title;
  const info: string =
    hasNext || hasPrev
      ? `showing ${offset + 1} to ${end} of total ${total} items`
      : `total ${total} items`;
  const _columns: string = stanzaParams.column_names;
  const showColumnNames: boolean =
    _columns.toLocaleLowerCase() === "false"
      ? false
      : Boolean(stanzaParams.column_names);
  const isFixedTable: boolean = !!columns.find((item) => !!item.size);

  return {
    title,
    offset,
    columns,
    data,
    hasNext,
    hasPrev,
    info,
    showColumnNames,
    isFixedTable,
    status: 200,
    statusText: "",
  };
};

const makeNotFoundParams = (
  stanzaParams: StanzaParameters
): TemplateParameters => {
  return {
    title: stanzaParams.title,
    offset: 0,
    columns: null,
    data: null,
    hasNext: false,
    hasPrev: false,
    info: null,
    showColumnNames: false,
    isFixedTable: false,
    status: null,
    statusText: "NO RESULT FOUND",
  };
};

const makeFailParams = (
  response: ApiResponse<ApiBody>,
  stanzaParams: StanzaParameters
): TemplateParameters => {
  return {
    title: stanzaParams.title,
    offset: 0,
    columns: null,
    data: null,
    hasNext: false,
    hasPrev: false,
    info: null,
    showColumnNames: false,
    isFixedTable: false,
    status: response.status,
    statusText: response.status ? response.message : "UNKNOWN ERROR",
  };
};

const fetchData = async (
  url: string,
  offset: number,
  limit: number
): Promise<ApiResponse<ApiBody>> => {
  // return fetchDummy(query, offset, limit);
  return fetchLive(url, offset, limit);
};

const fetchLive = async (
  url: string,
  offset: number,
  limit: number
): Promise<ApiResponse<ApiBody>> => {
  const [uri, query]: [string, string] = separateURL(url);
  const response = await fetch(uri, makeOptions({ offset, limit }, query));
  if (response.status !== 200) {
    return {
      status: response.status,
      message: response.statusText,
      body: null,
    };
  }
  const body: any = await response.json();
  return {
    status: 200,
    body,
  };
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

const filterQuery = (query: string): string => {
  if (!query) {
    return "";
  }
  let isOmitted: boolean = false;
  const result: string = query
    .split("&")
    .filter((str) => {
      const reg = /(.*)=(.*)/.exec(str);
      const [key, value]: [string, string] = [reg[1], reg[2]];
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
    console.warn(
      "limit and offset on API_URL have been omitted as they are set from the Stanza"
    );
  }
  // console.log(result);
  return result;
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

export const __TEST__ = { separateURL, filterQuery, makeFormBody };

enum DIRECTION {
  NEXT = 1,
  PREV = -1,
}

type Item = StringItem | LinkItem;

type StanzaParameters = {
  api_url: string;
  limit: string;
  title: string;
  column_names: string;
  web_font?: string;
};

type TemplateParameters = {
  columns: { label: string; size: number }[];
  data: Item[][];
  offset: number;
  title: string;
  hasNext: boolean;
  hasPrev: boolean;
  info: string;
  showColumnNames: boolean;
  isFixedTable: boolean;
} & TemplateBase;

type ApiBody = {
  total: number;
  offset: number;
  limit: number;
  contents: Content[];
  columns: Column[];
};

type Content = {
  [key: string]: LinkItem | string;
};

type LinkItem = {
  href: string;
  label: string;
  nowrap?: boolean;
};
type StringItem = {
  label: string;
  nowrap?: boolean;
};

type Column = {
  key: string;
  label: string;
  nowrap?: boolean;
  size?: number;
};

export type ListApiBody = ApiBody;
export type ListContent = Content;
export type ListColumn = Column;
