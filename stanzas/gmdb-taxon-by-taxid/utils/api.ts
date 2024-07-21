import { ComponentProps } from "react";
import { ApiLineage, parseLineage } from "../../../shared/components/info-detail/LineageList";
import { getData } from "../../../shared/utils/getData";
import { unescapeJsonString } from "../../../shared/utils/string";
import { URL_API } from "../../../shared/utils/variables";
import { StanzaView } from "../components/StanzaView";

export type ViewProps = ComponentProps<typeof StanzaView>;
export type ApiBody = {
  scientific_name: string;
  taxid: number | string;
  rank: string;
  authority_name: string;
  lineage: ApiLineage;
  type_material: { label: string; name?: string }[];
  other_type_material: { label: string; name: string }[];
};

type OtherMaterialParameter = {
  key: string;
  labels: string[];
};

export const parseData = (body: ApiBody): ViewProps => {
  const taxid = body.taxid.toString();
  const scientificName = body.scientific_name;
  const authorityName = unescapeJsonString(body.authority_name);
  const lineage = parseLineage(body.lineage);
  const typeMaterials = body.type_material.map((item) => item.label);
  const otherTypeMaterials = parseOtherTypeMaterial(body.other_type_material);
  return { taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials };
};

const parseOtherTypeMaterial = (data: ApiBody["other_type_material"]): OtherMaterialParameter[] => {
  return data
    .map((obj) => obj.name!)
    .reduce<string[]>((a: string[], b: string) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, [])!
    .map((key) => ({
      key,
      labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};

export const getTaxonData = async (tax_id: string) => {
  const apiName = "gmdb_organism_by_taxid";
  const result = await getData<ApiBody>(`${URL_API}${apiName}`, { tax_id });
  if (!result.body) {
    throw new Error("No data found");
  }
  return parseData(result.body);
};
