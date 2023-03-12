import { ComponentProps } from "react";
import { Optional } from "yohak-tools";
import { getData } from "../../../shared/utils/getData";
import { URL_API } from "../../../shared/utils/variables";
import { StanzaView } from "../components/StanzaView";

export type ViewProps = ComponentProps<typeof StanzaView>;
export type ApiBody = {
  strain: {
    strain_id: string;
    strain_name: string;
    other_strain_id_list: {
      other_strain_id: string;
      other_strain_link: string;
    }[];
  };
  taxonomy: {
    scientific_name: string;
    taxid: number;
    rank: string;
    authority_name: string;
    lineage: {
      uri: string;
      taxid: number;
      label: string;
      rank: string;
    }[];
  };
};

const parseData = (body: ApiBody): ViewProps => {
  const strainId = body.strain.strain_id;
  const strainName = body.strain.strain_name;
  const infoSources = body.strain.other_strain_id_list.map((item) => ({
    url: item.other_strain_link,
    label: item.other_strain_id,
  }));
  const taxonomy: ViewProps["taxonomy"] = body.taxonomy
    ? {
        name: body.taxonomy.scientific_name,
        taxId: body.taxonomy.taxid.toString(),
        rank: body.taxonomy.rank,
        authorityName: body.taxonomy.authority_name,
        lineage: body.taxonomy.lineage.reduce((accum, current) => {
          return {
            ...accum,
            [current.rank]: {
              taxid: current.taxid.toString(),
              label: current.label,
            },
          };
        }, {}),
      }
    : null;
  return {
    strainId,
    strainName,
    infoSources,
    taxonomy,
  };
};

export const getStrainData = async (strain_id: string): Promise<Optional<ViewProps>> => {
  const apiName = "gmdb_strain_by_strainid";
  const result = await getData<ApiBody>(`${URL_API}${apiName}`, { strain_id });
  if (result.body?.strain) {
    return parseData(result.body);
  } else {
    return undefined;
  }
};
