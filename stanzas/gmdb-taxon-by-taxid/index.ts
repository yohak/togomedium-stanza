import { getData } from "../../utils/get-data";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import { importWebFontForTogoMedium } from "../../utils/stanza";
import {
  capitalizeFirstLetter,
  makeNcbiOrganismLink,
  makeTogoGenomeOrganismLink,
  unescapeJsonString,
} from "../../utils/string";
import { getNextTaxon, TAXON_RANK } from "../../utils/taxon";

export default async function gmdbTaxonByTaxid(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  if (!params.tax_id) {
    return;
  }
  const apiName = "gmdb_taxonomic_rank_by_taxid";
  const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
    tax_id: params.tax_id,
  });
  // console.log(result.body);

  const data = parseData(result);
  const dataWithRankChildren = await addRankChildren(data);

  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters: dataWithRankChildren,
  });
  importWebFontForTogoMedium(stanza);
}

const addRankChildren = async (
  data: TemplateParameters
): Promise<TemplateParameters> => {
  if (!data.rank) {
    return data;
  }
  const rank: TAXON_RANK =
    data.rank === "Superkingdom"
      ? TAXON_RANK._0_KINGDOM
      : (data.rank as TAXON_RANK);
  const nextRank = getNextTaxon(rank);
  const response = await getData<SubRankApiBody>(
    `${API_GROWTH_MEDIUM}list_taxons_by_rank`,
    {
      tax_id: data.taxid,
      rank: nextRank,
    }
  );
  const getId = (str: string) => str.split("/").pop();

  const subClasses: LineageParameter[] = response.body.map((item) => ({
    label: item.name,
    link: makeLineageLink(getId(item.id), nextRank),
    rank: nextRank,
    togoGenomeUrl: makeTogoGenomeOrganismLink(getId(item.id)),
    ncbiUrl: makeNcbiOrganismLink(getId(item.id)),
  }));
  return { ...data, lineage: [...data.lineage, ...subClasses] };
};

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
    authority_name: unescapeJsonString(body.authority_name),
    lineage: [
      ...body.lineage
        .filter((item) => item.taxid !== "NA")
        .map((item) => ({
          link: makeLineageLink(item.taxid, item.rank as TAXON_RANK),
          rank: capitalizeFirstLetter(item.rank),
          label: item.label,
          togoGenomeUrl: makeTogoGenomeOrganismLink(item.taxid),
          ncbiUrl: makeNcbiOrganismLink(item.taxid),
        })),
      {
        link: makeLineageLink(body.taxid, body.rank as TAXON_RANK),
        rank: parseRank(body.rank),
        label: body.scientific_name,
        togoGenomeUrl: makeTogoGenomeOrganismLink(body.taxid),
        ncbiUrl: makeNcbiOrganismLink(body.taxid),
        current: true,
      },
    ],
  };
};

const parseRank = (str: string): string => str?.split("/").pop();

const makeLineageLink = (id: string, rank: TAXON_RANK): string =>
  rank === TAXON_RANK._9_SPECIES ? `/organism/${id}` : `/taxon/${id}`;

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
  link: string;
  rank: string;
  label: string;
  ncbiUrl: string;
  togoGenomeUrl: string;
  current?: boolean;
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

type SubRankApiBody = { id: string; name: string }[];
