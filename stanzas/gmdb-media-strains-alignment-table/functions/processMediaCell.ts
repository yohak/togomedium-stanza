import { copy } from "copy-anything";
import { nanoid } from "nanoid";
import { Nullable } from "yohak-tools";
import { CellInfo, DisplayData, Lineage, LineageRank, lineageRanks, Taxon } from "./types";
import { MediaStrainsAlimentResponse } from "../../../api/media_strains_alignment/types";

type TaxonNode = {
  id: string;
  label: string;
  rank: LineageRank;
  children: TaxonNode[];
};

export const makeCellHeight = (size: number): number => {
  return 48 * size + size - 1;
};

const processMediaCell = (data: MediaStrainsAlimentResponse): CellInfo[] => {
  return data.map((item) => {
    return {
      id: item.gm_id,
      label: item.label,
      size: item.organisms.length,
    };
  });
};

const fillNullTaxon = (data: MediaStrainsAlimentResponse): MediaStrainsAlimentResponse => {
  const cloned: MediaStrainsAlimentResponse = copy(data);
  cloned.forEach((media) => {
    media.organisms.forEach((organism) => {
      lineageRanks.forEach((rank) => {
        if (organism[rank] === null) {
          organism[rank] = {
            id: nanoid(),
            label: "",
          };
        }
      });
    });
  });
  return cloned;
};

const processTaxonCol = (data: MediaStrainsAlimentResponse, rank: LineageRank): CellInfo[][] => {
  return data.map((medium) => {
    const tree = makeTaxonTree(medium.organisms);
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
  const cloned: MediaStrainsAlimentResponse = filterData(fillNullTaxon(data), filterId);
  const taxon: DisplayData["taxon"] = lineageRanks.reduce<any>((accum, rank) => {
    const result = { ...accum };
    result[rank] = processTaxonCol(cloned, rank);
    return result;
  }, {});
  const media: DisplayData["media"] = processMediaCell(cloned);
  return { media, taxon };
};

const filterData = (
  data: MediaStrainsAlimentResponse,
  filterId: string = ""
): MediaStrainsAlimentResponse => {
  if (filterId === "") return data;
  data.forEach((media) => {
    media.organisms = media.organisms.filter((organism) => {
      const organismIds = Object.values(organism).map((item) => item!.id);
      return organismIds.includes(filterId);
    });
  });
  return data.filter((medium) => medium.organisms.length > 0);
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

// const getStrainsOfMedia = (data: MediaStrainsAlimentResponse, id: string): Strain[] => {
//   const media = data.media.find((medium) => medium.gm_id === id);
//   if (!media) return [];
//   const strainIds = media.organisms;
//   return data.strains.filter((strain) => strainIds.includes(strain.id));
// };

const makeTaxonTree = (organisms: Lineage[]): TaxonNode[] => {
  const flatTaxonList = organisms
    .map((organism) => lineageToTaxonNode(organism))
    .flat()
    .reduce<TaxonNode[]>(reduceSingle, []);

  organisms.forEach((organism) => {
    lineageRanks.forEach((rank, index) => {
      const targetTaxon = organism[rank];
      const targetNode = findNodeFromFlatList(flatTaxonList, targetTaxon?.id || "", rank);
      if (rank !== "superkingdom") {
        const parentRank = lineageRanks[index - 1]!;
        const parentTaxon = organism[parentRank];
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
        id: nanoid(),
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
  // getStrainsOfMedia,
  makeTaxonTree,
  processMediaCell,
  getSizeOfCell,
  fillNullTaxon,
};

export const __SB_TEST__ = {
  processMediaCell,
  processTaxonCol,
};
