import { ComponentProps } from "react";
import { Nullable, Optional } from "yohak-tools";
import { getData } from "../../../shared/utils/getData";
import { URL_API } from "../../../shared/utils/variables";
import { StanzaView } from "../components/StanzaView";

export type ViewProps = ComponentProps<typeof StanzaView>;
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

type LinkLabel = "PubChem" | "Wikipedia" | "NCI Thesaurus" | "ChEBI" | "SNOMED-CT";
export type LinkInfo = {
  label: LinkLabel;
  uri: string;
};

export type ComponentClass = {
  gmo_id: string;
  uri: string;
  label_en: string;
};

const getLinkLabel = (link: string): Nullable<LinkLabel> => {
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
      return null;
  }
};

const parseData = (body: ApiBody): ViewProps => {
  return {
    prefLabel: body.pref_label,
    gmoId: body.id,
    altLabels: body.alt_labels_en,
    properties: body.properties,
    roles: body.roles,
    superClasses: body.super_classes,
    subClasses: body.sub_classes,
    links: body.links
      .filter((str) => !!getLinkLabel(str))
      .map((str) => ({
        label: getLinkLabel(str)!,
        uri: str,
      })),
  };
};

export const getComponentData = async (gmo_id: string): Promise<Optional<ViewProps>> => {
  const apiName = "gmdb_component_by_gmoid";
  const result = await getData<ApiBody>(`${URL_API}${apiName}`, { gmo_id });
  if (result.body) {
    return parseData(result.body);
  } else {
    return undefined;
  }
};
