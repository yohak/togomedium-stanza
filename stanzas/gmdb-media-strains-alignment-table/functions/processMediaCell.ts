import { copy } from "copy-anything";
import { nanoid } from "nanoid";
import { CellInfo, DisplayData, Lineage, LineageRank, lineageRanks, Taxon } from "./types";
import { MediaStrainsAlimentResponse } from "../../../api/media_strains_alignment/types";

type TaxonNode = {
  id: string;
  gmId: string;
  label: string;
  rank: LineageRank;
  children: TaxonNode[];
};

export const makeCellHeight = (size: number): number => {
  return 48 * size + size - 1;
};

export const processDisplayData = (
  data: MediaStrainsAlimentResponse,
  filterTaxon: string = "",
  filterRank: LineageRank = "strain"
): DisplayData => {
  // console.log("process", data.length, data[0].organisms.length, filterTaxon, filterRank);
  const nullFilled = fillNullTaxon(data);
  const filtered: MediaStrainsAlimentResponse = filterData(nullFilled, filterTaxon);
  const taxon = processTaxonColList(filtered, filterRank);
  const media = processMediaCell(filtered, taxon, filterRank);
  return { media, taxon };
};

const processMediaCell = (
  data: MediaStrainsAlimentResponse,
  taxon: DisplayData["taxon"],
  filterRank: LineageRank
): CellInfo[] => {
  return data.map((item, i) => {
    return {
      id: item.gm_id,
      label: item.label,
      size: taxon[filterRank][i].length,
    };
  });
};

const fillNullTaxon = (data: MediaStrainsAlimentResponse): MediaStrainsAlimentResponse => {
  const cloned: MediaStrainsAlimentResponse = copy(data);
  const nullCells: { id: string; parentId: string; gmId: string }[] = [];
  const findNullId = (gmId: string, parentId: string): string | undefined => {
    return nullCells.find((cell) => parentId === cell.parentId && cell.gmId === gmId)?.id;
  };
  cloned.forEach((media) => {
    media.organisms.forEach((organism) => {
      const gmId = media.gm_id;
      lineageRanks.forEach((rank, lineageIndex) => {
        if (organism[rank] !== null) return;
        //
        const parentRank = lineageRanks[lineageIndex - 1];
        const parent = organism[parentRank]!;
        const parentId = parent.id;
        const foundId = findNullId(gmId, parentId);
        const id = foundId || nanoid();
        //
        organism[rank] = { id, label: "" };
        if (!foundId) {
          nullCells.push({ id, parentId, gmId });
        }
      });
    });
  });
  return cloned;
};

const processTaxonCol = (
  trees: TaxonNode[][],
  rank: LineageRank,
  filterRank: LineageRank
): CellInfo[][] => {
  return trees.map((tree) =>
    getNodeListOfRankFromTree(tree, rank).map<CellInfo>((node) => ({
      id: node.id,
      label: node.label,
      size: getSizeOfCell(node, filterRank),
    }))
  );
};

const processTaxonColList = (
  data: MediaStrainsAlimentResponse,
  filterRank: LineageRank
): DisplayData["taxon"] => {
  const trees = makeTaxonTreesFromData(data);
  return lineageRanks.reduce<any>((accum, rank) => {
    const result = { ...accum };
    result[rank] = processTaxonCol(trees, rank, filterRank);
    return result;
  }, {});
};

const filterData = (
  data: MediaStrainsAlimentResponse,
  taxId: string = ""
): MediaStrainsAlimentResponse => {
  if (taxId === "") return data;
  const cloned = copy(data);
  cloned.forEach((media) => {
    media.organisms = media.organisms.filter((organism) => {
      const organismIds = Object.values(organism).map((item) => item!.id);
      return organismIds.includes(taxId);
    });
  });
  return cloned.filter((medium) => medium.organisms.length > 0);
};

const getSizeOfCell = (node: TaxonNode, filterRank: LineageRank): number => {
  let total: number = 1;
  const process = (n: TaxonNode) => {
    if (n.rank !== filterRank) {
      total += Math.max(n.children.length - 1, 0);
      n.children.forEach((c) => {
        process(c);
      });
    }
  };
  process(node);
  return total;
};

const makeTaxonTreesFromData = (data: MediaStrainsAlimentResponse): TaxonNode[][] => {
  return data.map((medium) => makeTaxonTree(medium.organisms, medium.gm_id));
};

const makeTaxonTree = (organisms: Lineage[], gmId: string): TaxonNode[] => {
  const flatTaxonList = organisms
    .map((organism) => lineageToTaxonNode(organism, gmId))
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

const lineageToTaxonNode = (lineage: Lineage, gmId: string): TaxonNode[] =>
  lineageRanks.map((key) => makeTaxonNode(lineage[key]!, key, gmId));

const makeTaxonNode = (taxon: Taxon, rank: LineageRank, gmId: string): TaxonNode => {
  if (!taxon) {
    throw Error("taxon should not be null");
  }
  return {
    rank,
    id: taxon.id,
    label: taxon.label,
    gmId,
    children: [],
  };
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
  processTaxonCol,
};

export const __SB_TEST__ = {
  processMediaCell,
  processTaxonCol,
  makeTaxonTreesFromData,
};
