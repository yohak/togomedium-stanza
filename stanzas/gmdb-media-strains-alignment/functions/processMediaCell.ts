import { Nullable } from "yohak-tools";
import { CellInfo, DisplayData, Lineage, LineageRank, lineageRanks, Strain, Taxon } from "./types";
import { MediaStrainsAlimentResponse } from "../../../api/media_strains_alignment/types";
const rfdc = require("rfdc")();
const uuid = require("uuid");

type TaxonNode = {
  id: string;
  label: string;
  rank: LineageRank;
  children: TaxonNode[];
};

export const makeCellHeight = (size: number): number => {
  return 48 * size + size - 1;
};

const processMediaCell = (data: MediaStrainsAlimentResponse, allSpecies: string[]): CellInfo[] => {
  return data.media.map((item) => {
    return {
      id: item.gm_id,
      label: item.label,
      size: item.strains.filter((id) => allSpecies.includes(id)).length,
    };
  });
};

const fillNullTaxon = (data: MediaStrainsAlimentResponse): MediaStrainsAlimentResponse => {
  const cloned: MediaStrainsAlimentResponse = rfdc(data);
  cloned.strains.forEach((strain) => {
    lineageRanks.forEach((rank) => {
      if (strain.lineage[rank] === null) {
        strain.lineage[rank] = {
          id: uuid(),
          label: "",
        };
      }
    });
  });

  return cloned;
};

const processTaxonCol = (data: MediaStrainsAlimentResponse, rank: LineageRank): CellInfo[][] => {
  return data.media.map((medium) => {
    const strains = getStrainsOfMedia(data, medium.gm_id);
    const tree = makeTaxonTree(strains);
    return getNodeListOfRankFromTree(tree, rank).map<CellInfo>((node) => ({
      id: node.id,
      label: node.label,
      size: getSizeOfCell(node),
    }));
  });
};

export const processDisplayData = (
  data: MediaStrainsAlimentResponse,
  filterId: string = ""
): DisplayData => {
  const cloned: MediaStrainsAlimentResponse = fillNullTaxon(data);
  cloned.strains = cloned.strains.filter((strain) => {
    if (filterId === "") return true;
    let result = false;
    lineageRanks.forEach((rank) => {
      if (strain.lineage[rank]?.id === filterId) {
        result = true;
      }
    });
    return result;
  });
  cloned.media = cloned.media.filter((medium) => {
    return cloned.strains.find((strain) => medium.strains.includes(strain.id));
  });
  const taxon: DisplayData["taxon"] = lineageRanks.reduce<any>((accum, rank) => {
    const result = { ...accum };
    result[rank] = processTaxonCol(cloned, rank);
    return result;
  }, {});
  const allSpeciesKey = taxon.species.flat().map((item) => item.id);
  const media: DisplayData["media"] = processMediaCell(cloned, allSpeciesKey);
  return { media, taxon };
};

const getSizeOfCell = (node: TaxonNode): number => {
  let total: number = 1;
  const process = (n: TaxonNode) => {
    if (n.children) {
      total += Math.max(n.children.length - 1, 0);
      n.children.forEach((c) => {
        process(c);
      });
    }
  };
  process(node);
  return total;
};

const getStrainsOfMedia = (data: MediaStrainsAlimentResponse, id: string): Strain[] => {
  const media = data.media.find((medium) => medium.gm_id === id);
  if (!media) return [];
  const strainIds = media.strains;
  return data.strains.filter((strain) => strainIds.includes(strain.id));
};

const makeTaxonTree = (strains: Strain[]): TaxonNode[] => {
  // strains.forEach(strain => strain.lineage.)
  const flatTaxonList: TaxonNode[] = strains
    .map<TaxonNode[]>((strain) => lineageToTaxonNode(strain.lineage))
    .flat()
    .reduce<TaxonNode[]>(reduceSingle, []);
  strains.forEach((strain) => {
    lineageRanks.forEach((rank, index) => {
      const targetTaxon = strain.lineage[rank];
      const targetNode = findNodeFromFlatList(flatTaxonList, targetTaxon?.id || "", rank);
      if (rank !== "superkingdom") {
        const parentRank = lineageRanks[index - 1]!;
        const parentTaxon = strain.lineage[parentRank];
        const parentNode = findNodeFromFlatList(flatTaxonList, parentTaxon?.id || "", parentRank);
        parentNode.children.push(targetNode);
      }
    });
  });
  flatTaxonList.forEach((node) => {
    node.children = node.children.reduce(reduceSingle, []).sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
  });
  return flatTaxonList.filter((node) => node.rank === "superkingdom");
};

const getNodeListOfRankFromTree = (tree: TaxonNode[], rank: LineageRank): TaxonNode[] => {
  const process = (nodes: TaxonNode[], currentRank: LineageRank): TaxonNode[] => {
    if (currentRank === rank) {
      return nodes;
    } else {
      const nextNodes: TaxonNode[] = nodes.map((node) => node.children).flat();
      const currentRankIndex = lineageRanks.indexOf(currentRank);
      const nextRank = lineageRanks[currentRankIndex + 1];
      return process(nextNodes, nextRank);
    }
  };

  return process(tree, "superkingdom");
};

const findNodeFromFlatList = (list: TaxonNode[], id: string, rank: string): TaxonNode =>
  list.find((node) => node.rank === rank && id === node.id)!;

const lineageToTaxonNode = (lineage: Lineage): TaxonNode[] =>
  lineageRanks.map((key) => makeTaxonNode(lineage[key], key));
const makeTaxonNode = (taxon: Nullable<Taxon>, rank: LineageRank): TaxonNode =>
  taxon
    ? {
        rank,
        id: taxon.id,
        label: taxon.label,
        children: [],
      }
    : {
        rank,
        id: uuid(),
        label: "",
        children: [],
      };

const reduceSingle = (accum: TaxonNode[], current: TaxonNode): TaxonNode[] => {
  return accum.find((item) => item.id === current.id && item.rank === current.rank)
    ? [...accum]
    : [...accum, current];
};

export const __TEST__ = {
  getNodeListOfRankFromTree,
  getStrainsOfMedia,
  makeTaxonTree,
  processMediaCell,
  getSizeOfCell,
  fillNullTaxon,
};

export const __SB_TEST__ = {
  processMediaCell,
  processTaxonCol,
};
