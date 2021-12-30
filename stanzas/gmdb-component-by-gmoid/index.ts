import { getData } from "../../utils/get-data";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import { ApiResponse } from "../../utils/types";
import Stanza from "togostanza/stanza";
import { importWebFontForTogoMedium } from "../../utils/stanza";

export default class GmdbComponentByGmoid extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    if (!params.gmo_id) {
      return;
    }
    const apiName = "gmdb_component_by_gmoid";
    const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
      gmo_id: params.gmo_id,
    });

    const parameters = parseData(result);
    const template = "stanza.html.hbs";
    this.renderTemplate<TemplateParameters>({ template, parameters });
    importWebFontForTogoMedium(this);
  }
}

const parseData = (data: ApiResponse<ApiBody>): TemplateParameters => {
  return makeSuccessData(data.body!);
};

const makeSuccessData = (body: ApiBody): TemplateParameters => {
  return {
    pref_label: body.pref_label,
    gmo_id: body.id,
    alt_labels: body.alt_labels_en,
    properties: body.properties,
    roles: body.roles,
    super_classes: body.super_classes,
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

type StanzaParameters = {
  gmo_id: string;
};

type TemplateParameters = {
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
