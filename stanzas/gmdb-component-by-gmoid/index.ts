import { getData } from "../../utils/get-data";
import { API_DBCLS, API_GROWTH_MEDIUM } from "../../utils/variables";
import { importWebFontForGrowthMedium } from "../../utils/stanza";

export default async function gmdbComponentByGmoid(
  stanza: StanzaInstance,
  params: StanzaParameter
) {
  const apiName = "gmdb_component_by_gmoid";
  const result = await getData<ApiBody>(`${API_DBCLS}${apiName}`, {
    gmo_id: params.gmo_id,
  });

  const data = parseData(result);

  stanza.render<TemplateParameter>({
    template: "stanza.html.hbs",
    parameters: data,
  });
  importWebFontForGrowthMedium(stanza);
}

const parseData = (data: ApiResponse<ApiBody>): TemplateParameter => {
  return makeSuccessData(data.body);
};

const makeSuccessData = (body: ApiBody): TemplateParameter => {
  return {
    pref_label: body.pref_label,
    gmo_id: body.id,
    alt_labels: body.alt_labels_en,
    properties: body.properties,
    roles: body.roles,
    super_classes: body.sub_classes,
    sub_classes: body.sub_classes,
    links: body.links
      .map((str) => ({
        label: getLinkLabel(str),
        uri: str,
      }))
      .filter((item) => !!item.label),
  };
};

const getLinkLabel = (link: string) => {
  switch (true) {
    case /pccompound/.test(link):
      return "PubChem";
    case /wikipedia/.test(link):
      return "Wikipedia";
    case /ncicb/.test(link):
      return "NCI Thesaurus";
    case /CHEBI/.test(link):
      return "ChEBI";
    case /SNOMEDCT/.test(link):
      return "SNOMED-CT";
    default:
      return "";
  }
};

type StanzaParameter = {
  gmo_id: string;
};

type TemplateParameter = {
  pref_label: string;
  gmo_id: string;
  alt_labels: string[];
  properties: ComponentClass[];
  roles: ComponentClass[];
  super_classes: ComponentClass[];
  sub_classes: ComponentClass[];
  links: LinkInfo[];
};

type LinkInfo = {
  label: string;
  uri: string;
};

type ApiBody = {
  pref_label: string;
  id: string;
  label_ja: string;
  alt_labels_en: string[];
  alt_labels_ja: string[];
  super_classes: ComponentClass[];
  sub_classes: ComponentClass[];
  properties: ComponentClass[];
  roles: ComponentClass[];
  links: string[];
};

type ComponentClass = {
  gmo_id: string;
  uri: string;
  label_en: string;
};
