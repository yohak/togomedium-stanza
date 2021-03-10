import { getData } from "../../utils/get-data";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import { TemplateBase } from "../../utils/types";
import { importWebFontForTogoMedium } from "../../utils/stanza";

export default async function gmdbMediumByGmid(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  if (!params.gm_id) {
    return;
  }
  const apiName = "gmdb_medium_by_gmid";
  const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
    gm_id: params.gm_id,
  });
  const data = parseData(result);
  console.log(data);

  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters: data,
  });
  importWebFontForTogoMedium(stanza);
}

const parseData = (data: ApiResponse<ApiBody>): TemplateParameters => {
  return makeSuccessData(data.body);
};

const makeSuccessData = (body: ApiBody): TemplateParameters => {
  const id = body.meta.gm.split("/").pop();
  const name = body.meta.name;
  const src_label = getSrcLabel(body.meta.src_url);
  const src_url = body.meta.src_url;
  const components: RecipeItem[] = [
    ...processComponentTables(body.components),
    ...processComponentComments(body.comments),
  ].sort((a, b) => a.paragraph_index - b.paragraph_index);
  return {
    id,
    name,
    src_label,
    src_url,
    components,
  };
};

const processComponentTables = (tables: ComponentTable[]): ComponentTable[] => {
  return tables.map((table) => ({
    ...table,
    items: table.items.map((item) => ({
      ...item,
      can_wrap_label: item.label?.length >= 20,
      can_wrap_name: item.component_name?.length >= 20,
      properties: item.properties.map((property) => ({
        ...property,
        displayLabel: getShortPropertyLabel(property.label),
      })),
    })),
  }));
};
const processComponentComments = (
  comments: ComponentComment[]
): ComponentComment[] => {
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
    case str.match(/jcm\.riken/) !== null:
      return "JCM";
    case str.match(/nbrc\.nite/) !== null:
      return "NBRC";
    case str.match(/dsmz\.de/) !== null:
      return "DSMZ";
    case str.match(/atcc\.org/) !== null:
      return "ATCC";
    default:
      return "SRC";
  }
};

type StanzaParameters = {
  gm_id: string;
};
type TemplateParameters = {
  id: string;
  src_url: string;
  src_label: string;
  name: string;
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
