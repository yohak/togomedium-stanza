import { getData } from "../../utils/get-data";
import { API_DBCLS } from "../../utils/variables";
import { importWebFontForTogoMedium } from "../../utils/stanza";
import { unescapeJsonString } from "../../utils/string";
import { TemplateBase } from "../../utils/types";

export default async function gmdbOrganismByTaxid(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  if (!params.tax_id) {
    return;
  }
  const apiName = "gmdb_organism_by_taxid";
  const result = await getData<ApiBody>(`${API_DBCLS}${apiName}`, {
    tax_id: params.tax_id,
  });
  // console.log(JSON.parse(JSON.stringify(result)));

  const data = parseData(result);
  // console.log(data);
  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters: data,
  });
  importWebFontForTogoMedium(stanza);
}

const parseData = (data: ApiResponse<ApiBody>): TemplateParameters => {
  return makeSuccessData(data.body);
};

const makeSuccessData = (body: ApiBody): TemplateParameters => ({
  taxid: body.taxid,
  scientific_name: body.scientific_name,
  authority_name: unescapeJsonString(body.authority_name),
  lineage: body.lineage,
  type_material: body.type_material,
  other_type_material: parseOtherTypeMaterial(body.other_type_material),
});

const parseOtherTypeMaterial = (
  data: TypeMaterial[]
): OtherMaterialParameter[] => {
  return data
    .map((obj) => obj.name)
    .reduce((a: string[], b: string) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, [])
    .map((key) => ({
      key,
      labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};

export const __TEST__ = { parseOtherTypeMaterial };

type StanzaParameters = {
  tax_id: string;
};

type TemplateParameters = {
  taxid: string;
  scientific_name: string;
  authority_name: string;
  lineage: Lineage[];
  type_material: TypeMaterial[];
  other_type_material: { key: string; labels: string[] }[];
} & TemplateBase;

type OtherMaterialParameter = {
  key: string;
  labels: string[];
};

type ApiBody = {
  scientific_name: string;
  taxid: string;
  authority_name: string;
  lineage: Lineage[];
  type_material: TypeMaterial[];
  other_type_material: TypeMaterial[];
};

type Lineage = {
  rank: string;
  label: string;
  uri: string;
  taxid: string;
};

type TypeMaterial = {
  label: string;
  name?: string;
};
