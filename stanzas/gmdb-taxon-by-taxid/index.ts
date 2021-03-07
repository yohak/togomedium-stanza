import { getData } from "../../utils/get-data";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import { importWebFontForTogoMedium } from "../../utils/stanza";
import {
  capitalizeFirstLetter,
  makeNcbiOrganismLink,
  makeTogoGenomeOrganismLink,
} from "../../utils/string";

export default async function gmdbTaxonByTaxid(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  const apiName = "gmdb_taxonomic_rank_by_taxid";
  const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
    tax_id: params.tax_id,
  });
  console.log(result.body);

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
  return {
    scientific_name: body.scientific_name,
    taxid: body.taxid,
    togoGenomeUrl: makeTogoGenomeOrganismLink(body.taxid),
    ncbiUrl: makeNcbiOrganismLink(body.taxid),
    rank: parseRank(body.rank),
    authority_name: body.authority_name,
    lineage: [
      ...body.lineage
        .filter((item) => item.taxid !== "NA")
        .map((item) => ({
          taxid: item.taxid,
          rank: capitalizeFirstLetter(item.rank),
          label: item.label,
          togoGenomeUrl: makeTogoGenomeOrganismLink(item.taxid),
          ncbiUrl: makeNcbiOrganismLink(item.taxid),
        })),
      {
        taxid: body.taxid,
        rank: parseRank(body.rank),
        label: body.scientific_name,
        togoGenomeUrl: makeTogoGenomeOrganismLink(body.taxid),
        ncbiUrl: makeNcbiOrganismLink(body.taxid),
      },
    ],
  };
};

export const parseRank = (str: string): string => str?.split("/").pop();

type StanzaParameters = {
  tax_id: string;
};

type TemplateParameters = {
  ncbiUrl: string;
  togoGenomeUrl: string;
  scientific_name: string;
  taxid: string;
  rank: string;
  authority_name: string;
  lineage: LineageParameter[];
};

type LineageParameter = {
  taxid: string;
  rank: string;
  label: string;
  ncbiUrl: string;
  togoGenomeUrl: string;
};

type ApiBody = {
  scientific_name: string;
  taxid: string;
  rank: string;
  authority_name: string;
  lineage: Lineage[];
};

type Lineage = {
  rank: string;
  label: string;
  uri: string;
  taxid: string;
};
