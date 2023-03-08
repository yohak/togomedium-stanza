import Stanza from "togostanza/stanza";
import { getData } from "../../shared/utils/getData";
import { importWebFontForTogoMedium } from "../../shared/utils/stanza";
import { ApiResponse, TemplateBase } from "../../shared/utils/types";
import { URL_API } from "../../shared/utils/variables";

export default class GmdbMediumByGmid extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    if (!params.gm_id) {
      return;
    }
    const apiName = "gmdb_medium_by_gmid";
    const result = await getData<ApiBody>(`${URL_API}${apiName}`, {
      gm_id: params.gm_id,
    });
    const parameters = parseData(result, params);
    const template = "stanza.html.hbs";
    this.renderTemplate<TemplateParameters>({ template, parameters });
    importWebFontForTogoMedium(this);
  }
}

const parseData = (data: ApiResponse<ApiBody>, params: StanzaParameters): TemplateParameters => {
  switch (true) {
    case data.status !== 200:
      return makeErrorData(`Error ${data.status}<br />${data.message}`);
    case !data?.body?.meta:
      return makeErrorData(`No Medium Found with ${params.gm_id}`);
    default:
      return makeSuccessData(data.body!);
  }
};

const makeErrorData = (msg: string): TemplateParameters => {
  return {
    id: undefined,
    original_id: undefined,
    name: undefined,
    src_url: undefined,
    src_label: undefined,
    ph: undefined,
    components: [],
    error: true,
    statusText: msg,
  };
};

const makeSuccessData = (body: ApiBody): TemplateParameters => {
  return {
    id: body.meta.gm.split("/").pop(),
    original_id: body.meta.original_media_id,
    name: body.meta.name,
    src_label: getSrcLabel(body.meta.src_url),
    src_url: body.meta.src_url,
    ph: body.meta.ph,
    components: [
      ...processComponentTables(body.components),
      ...processComponentComments(body.comments),
    ].sort((a, b) => a.paragraph_index - b.paragraph_index),
  };
};

const processComponentTables = (tables: ComponentTable[]): ComponentTable[] => {
  return tables.map((table) => ({
    ...table,
    items: table.items.map((item) => ({
      ...item,
      // component_name: "MgCl<sup>2</sup>&middot;6H<sub>2</sub>O",
      can_wrap_label: item.label?.length >= 20,
      can_wrap_name: item.component_name?.length >= 20,
      properties: item.properties.map((property) => ({
        ...property,
        displayLabel: getShortPropertyLabel(property.label),
      })),
    })),
  }));
};
const processComponentComments = (comments: ComponentComment[]): ComponentComment[] => {
  return comments.map((item) => ({
    ...item,
    comment: item.comment ? item.comment : "&nbsp;",
  }));
};

function getShortPropertyLabel(str: string): string {
  const dic: { [key: string]: string } = {
    "Simple component": "Simple",
    "Complex component": "Complex",
    "Defined component": "Defined",
    "Undefined component": "Undefined",
    "Inorganic compound": "Inorganic",
    "Organic compound": "Organic",
    Solution: "Solution",
  };
  if (!dic[str]) {
    console.warn("no short property label found:", str);
  }
  return dic[str] ? dic[str] : "ERR";
}

const getSrcLabel = (str: string): string => {
  switch (true) {
    case str.match(/jcm.*riken/) !== null:
      return "JCM";
    case str.match(/nite.*nbrc/) !== null:
      return "NBRC";
    case str.match(/dsmz\.de/) !== null:
      return "DSMZ";
    case str.match(/atcc\.org/) !== null:
      return "ATCC";
    default:
      return "SRC";
  }
};

export const __TEST__ = { getSrcLabel };

type StanzaParameters = {
  gm_id: string;
};
type TemplateParameters = {
  id: string | undefined;
  original_id: string | undefined;
  src_url: string | undefined;
  src_label: string | undefined;
  name: string | undefined;
  ph: number | undefined;
  components: RecipeItem[];
} & TemplateBase;

type ApiBody = {
  meta: Meta;
  components: ComponentTable[];
  comments: ComponentComment[];
};
type Meta = {
  gm: string;
  name: string;
  src_url: string;
  ph: number;
  original_media_id?: string;
};
type ComponentTable = {
  subcomponent_name: string;
  items: Component[];
} & RecipeItem;

type Component = {
  component_name: string;
  volume: number;
  unit: string;
  gmo: string;
  gmo_id: string;
  label: string;
  conc_value?: number;
  conc_unit?: string;
  properties: Property[];
  roles: Role[];
  can_wrap_name?: boolean;
  can_wrap_label?: boolean;
};

type Property = {} & ComponentFunction;

type Role = {} & ComponentFunction;

type ComponentFunction = {
  label: string;
  uri: string;
  id: string;
  displayLabel?: string;
};

type ComponentComment = {
  comment: string;
} & RecipeItem;

type RecipeItem = {
  paragraph_index: number;
};
