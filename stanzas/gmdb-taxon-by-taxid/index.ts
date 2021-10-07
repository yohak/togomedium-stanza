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
import pluralize = require("pluralize");
import Stanza from "togostanza/stanza";
import { ApiResponse } from "../../utils/types";

export default class gmdbTaxonByTaxid extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    if (!params.tax_id) {
      return;
    }
    const apiName = "gmdb_taxonomic_rank_by_taxid";
    const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
      tax_id: params.tax_id,
    });
    // console.log(result.body);

    const data = parseData(result);
    const parameters = await addRankChildren(data);
    const template = "stanza.html.hbs";
    this.renderTemplate<TemplateParameters>({ template, parameters });
    importWebFontForTogoMedium(this);
  }
}

const addRankChildren = async (data: TemplateParameters): Promise<TemplateParameters> => {
  if (!data.rank) {
    return data;
  }
  const rank: TAXON_RANK =
    data.rank === "Superkingdom" ? TAXON_RANK._0_KINGDOM : (data.rank as TAXON_RANK);
  const nextRank = getNextTaxon(rank);
  const response = await getData<SubRankApiBody>(`${API_GROWTH_MEDIUM}list_taxons_by_rank`, {
    tax_id: data.taxid,
    rank: nextRank,
  });
  const getId = (str: string) => str.split("/").pop();

  const subClasses: LineageParameter[] = response.body
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .map((item) => ({
      label: item.name,
      link: makeLineageLink(getId(item.id), nextRank),
      rank: nextRank,
    }));
  return {
    ...data,
    subClass: {
      label: pluralize(nextRank),
      items: subClasses.map((item) => ({
        label: item.label,
        link: item.link,
      })),
    },
  };
};

const parseData = (data: ApiResponse<ApiBody>): TemplateParameters => {
  return makeSuccessData(data.body);
};
const makeSuccessData = (body: ApiBody): TemplateParameters => {
  return {
    subClass: null,
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
  subClass: {
    label: string;
    items: {
      label: string;
      link: string;
    }[];
  };
};

type LineageParameter = {
  link: string;
  rank: string;
  label: string;
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
