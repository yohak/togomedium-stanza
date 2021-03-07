import { getData } from "../../utils/get-data";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import { TemplateBase } from "../../utils/types";
import { importWebFontForTogoMedium } from "../../utils/stanza";

export default async function gmdbMediumByGmid(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  const apiName = "gmdb_medium_by_gmid";
  const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
    gm_id: params.gm_id,
  });
  const data = parseData(result);

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
  const id = body.gm.split("/").pop();
  const name = body.name;
  const src_label = getSrcLabel(body.src_url);
  const src_url = body.src_url;
  const components: TemplateComponent[] = body.components.map((item) => ({
    gmo_id: item.gmo_id,
    label_en: item.label_en,
    can_wrap: item.label_en.length >= 20,
    properties: item.properties?.map((prop) => ({
      short_label: getShortPropertyLabel(prop.label_en),
    })),
    roles: item.roles?.map((role) => ({
      label_en: role.label_en,
    })),
  }));
  return {
    id,
    name,
    src_label,
    src_url,
    components,
  };
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
  components: TemplateComponent[];
} & TemplateBase;

type TemplateComponent = {
  gmo_id: string;
  can_wrap: boolean;
  label_en: string;
  properties: {
    short_label: string;
  }[];
  roles: {
    label_en: string;
  }[];
};

interface ApiBody {
  gm: string;
  name: string;
  src_url: string;
  components: Component[];
}

interface Component {
  gmo_id: string;
  label_en: string;
  url: string;
  properties: ComponentProperty[];
  roles: ComponentRole[];
}

interface ComponentProperty {
  gmo_id: string;
  label_en: string;
  uri: string;
}

interface ComponentRole {
  gmo_id: string;
  label_en: string;
  uri: string;
}
