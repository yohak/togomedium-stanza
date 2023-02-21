import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-bd712360.js';
import { C as COLOR_WHITE, b as COLOR_PRIMARY, d as jsxs, j as jsx, s as COLOR_GRAY400, F as Fragment, m as COLOR_GRAY_LINE, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-4e306bf1.js';
import { c as css, e as dist, r as reactExports } from './index-c7537c15.js';
import { m as makeSpeciesName, c as capitalizeFirstLetter } from './string-b0eb559d.js';
import { a as Recoil_index_6, b as Recoil_index_18, c as Recoil_index_22 } from './recoil-b4c2016b.js';

const lineageRanks = [
    "superkingdom",
    "phylum",
    "class",
    "order",
    "family",
    "genus",
    "species",
];

const rfdc = require("rfdc")();
const uuid = require("uuid");
const makeCellHeight = (size) => {
    return 48 * size + size - 1;
};
const processMediaCell = (data, allSpecies) => {
    return data.media.map((item) => {
        return {
            id: item.gm_id,
            label: item.label,
            size: item.strains.filter((id) => allSpecies.includes(id)).length,
        };
    });
};
const fillNullTaxon = (data) => {
    const cloned = rfdc(data);
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
const processTaxonCol = (data, rank) => {
    return data.media.map((medium) => {
        const strains = getStrainsOfMedia(data, medium.gm_id);
        const tree = makeTaxonTree(strains);
        return getNodeListOfRankFromTree(tree, rank).map((node) => ({
            id: node.id,
            label: node.label,
            size: getSizeOfCell(node),
        }));
    });
};
const processDisplayData = (data, filterId = "") => {
    const cloned = fillNullTaxon(data);
    cloned.strains = cloned.strains.filter((strain) => {
        if (filterId === "")
            return true;
        let result = false;
        lineageRanks.forEach((rank) => {
            var _a;
            if (((_a = strain.lineage[rank]) === null || _a === void 0 ? void 0 : _a.id) === filterId) {
                result = true;
            }
        });
        return result;
    });
    cloned.media = cloned.media.filter((medium) => {
        return cloned.strains.find((strain) => medium.strains.includes(strain.id));
    });
    const taxon = lineageRanks.reduce((accum, rank) => {
        const result = Object.assign({}, accum);
        result[rank] = processTaxonCol(cloned, rank);
        return result;
    }, {});
    const allSpeciesKey = taxon.species.flat().map((item) => item.id);
    const media = processMediaCell(cloned, allSpeciesKey);
    return { media, taxon };
};
const getSizeOfCell = (node) => {
    let total = 1;
    const process = (n) => {
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
const getStrainsOfMedia = (data, id) => {
    const media = data.media.find((medium) => medium.gm_id === id);
    if (!media)
        return [];
    const strainIds = media.strains;
    return data.strains.filter((strain) => strainIds.includes(strain.id));
};
const makeTaxonTree = (strains) => {
    const flatTaxonList = strains
        .map((strain) => lineageToTaxonNode(strain.lineage))
        .flat()
        .reduce(reduceSingle, []);
    strains.forEach((strain) => {
        lineageRanks.forEach((rank, index) => {
            const targetTaxon = strain.lineage[rank];
            const targetNode = findNodeFromFlatList(flatTaxonList, (targetTaxon === null || targetTaxon === void 0 ? void 0 : targetTaxon.id) || "", rank);
            if (rank !== "superkingdom") {
                const parentRank = lineageRanks[index - 1];
                const parentTaxon = strain.lineage[parentRank];
                const parentNode = findNodeFromFlatList(flatTaxonList, (parentTaxon === null || parentTaxon === void 0 ? void 0 : parentTaxon.id) || "", parentRank);
                parentNode.children.push(targetNode);
            }
        });
    });
    flatTaxonList.forEach((node) => {
        node.children = node.children.reduce(reduceSingle, []).sort((a, b) => {
            if (a.label < b.label)
                return -1;
            if (a.label > b.label)
                return 1;
            return 0;
        });
    });
    return flatTaxonList.filter((node) => node.rank === "superkingdom");
};
const getNodeListOfRankFromTree = (tree, rank) => {
    const process = (nodes, currentRank) => {
        if (currentRank === rank) {
            return nodes;
        }
        else {
            const nextNodes = nodes.map((node) => node.children).flat();
            const currentRankIndex = lineageRanks.indexOf(currentRank);
            const nextRank = lineageRanks[currentRankIndex + 1];
            return process(nextNodes, nextRank);
        }
    };
    return process(tree, "superkingdom");
};
const findNodeFromFlatList = (list, id, rank) => list.find((node) => node.rank === rank && id === node.id);
const lineageToTaxonNode = (lineage) => lineageRanks.map((key) => makeTaxonNode(lineage[key], key));
const makeTaxonNode = (taxon, rank) => taxon
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
const reduceSingle = (accum, current) => {
    return accum.find((item) => item.id === current.id && item.rank === current.rank)
        ? [...accum]
        : [...accum, current];
};

const MediaCell = ({ label, id, size, css, className }) => {
    return (jsxs("div", Object.assign({ css: [mediaCell, css], className: className, style: { height: `${makeCellHeight(size)}px` } }, { children: [jsx("a", Object.assign({ href: `/media/${id}` }, { children: id })), jsx("span", { children: label })] })));
};
const mediaCell = css `
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_WHITE};
  padding: 8px 8px 0;
  font-size: 14px;

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    width: fit-content;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;

const MediaCol = ({ mediaList, css, className }) => {
    return (jsxs("div", Object.assign({ css: [mediaCol, css], className: className }, { children: [jsx("div", { css: emptyCell }), mediaList.map((info, index) => (jsx(MediaCell, Object.assign({}, info), index)))] })));
};
const mediaCol = css `
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 200px;
`;
const emptyCell = css `
  height: 24px;
  background-color: ${COLOR_WHITE};
`;

const FilterIcon = ({ css, className }) => {
    return (jsx("svg", Object.assign({ css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" }, { children: jsx("path", { d: "M324.4 64C339.6 64 352 76.37 352 91.63C352 98.32 349.6 104.8 345.2 109.8L240 230V423.6C240 437.1 229.1 448 215.6 448C210.3 448 205.2 446.3 200.9 443.1L124.7 385.6C116.7 379.5 112 370.1 112 360V230L6.836 109.8C2.429 104.8 0 98.32 0 91.63C0 76.37 12.37 64 27.63 64H324.4zM144 224V360L208 408.3V223.1C208 220.1 209.4 216.4 211.1 213.5L314.7 95.1H37.26L140 213.5C142.6 216.4 143.1 220.1 143.1 223.1L144 224zM496 400C504.8 400 512 407.2 512 416C512 424.8 504.8 432 496 432H336C327.2 432 320 424.8 320 416C320 407.2 327.2 400 336 400H496zM320 256C320 247.2 327.2 240 336 240H496C504.8 240 512 247.2 512 256C512 264.8 504.8 272 496 272H336C327.2 272 320 264.8 320 256zM496 80C504.8 80 512 87.16 512 96C512 104.8 504.8 112 496 112H400C391.2 112 384 104.8 384 96C384 87.16 391.2 80 400 80H496z" }) })));
};

const filterId = Recoil_index_6({ key: "filterId", default: "" });
const useFilterIdState = () => {
    return Recoil_index_18(filterId);
};
const useFilterIdMutators = () => {
    const setter = Recoil_index_22(filterId);
    const setFilterId = (id) => setter((prev) => (id === prev ? "" : id));
    return { setFilterId };
};

const TaxonCell = ({ label, id, size, rank, css, className }) => {
    const filterId = useFilterIdState();
    const { setFilterId } = useFilterIdMutators();
    const onClickFilter = () => {
        setFilterId(id);
    };
    return (jsx("div", Object.assign({ css: [taxonCell, css], className: className, style: { height: `${makeCellHeight(size)}px` } }, { children: !!label && (jsxs(Fragment, { children: [jsx("a", Object.assign({ href: `/taxon/${id}` }, { children: id })), jsx("span", { children: makeLabel(label, rank) }), jsx("span", Object.assign({ css: filterIcon, onClick: onClickFilter }, { children: jsx(FilterIcon, { css: [id === filterId ? filterIconColorActive : filterIconColorInactive] }) }))] })) })));
};
const makeLabel = (label, rank) => {
    switch (rank) {
        case "species":
            return makeSpeciesName(label);
        default:
            return label;
    }
};
const taxonCell = css `
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_WHITE};
  padding: 8px 8px 0;
  font-size: 14px;

  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
    width: fit-content;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;
const filterIcon = css `
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  svg {
    display: block;
    width: 16px;
    height: 16px;
  }
`;
const filterIconColorInactive = css `
  fill: ${COLOR_GRAY400};
`;
const filterIconColorActive = css `
  fill: ${COLOR_PRIMARY};
`;

const TaxonCol = ({ css, className, rank, taxonList }) => {
    const [isFolded, setIsFolded] = reactExports.useState(rank === "superkingdom" || rank === "phylum" || rank === "class");
    const onClickRank = () => {
        setIsFolded((prev) => !prev);
    };
    return (jsxs("div", Object.assign({ css: [taxonCol, isFolded ? foldedStyle : null, css], className: className }, { children: [jsx("div", Object.assign({ css: rankCell, onClick: onClickRank }, { children: capitalizeFirstLetter(rank) })), jsx("div", Object.assign({ css: allTaxonWrapper }, { children: taxonList.map((list, index) => (jsx("div", Object.assign({ css: mediumTaxonWrapper }, { children: list.map((info, index) => (jsx(TaxonCell, Object.assign({}, info, { rank: rank }), index))) }), index))) })), isFolded && (jsx("div", Object.assign({ css: foldedCover, onClick: onClickRank }, { children: jsx("span", { children: capitalizeFirstLetter(rank) }) })))] })));
};
const taxonCol = css `
  width: 200px;
  //background-color: ${COLOR_GRAY_LINE};
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  transition-duration: 0.4s;
  transition-timing-function: ${dist.Ease._4_IN_OUT_QUART};
  overflow: hidden;
`;
const foldedStyle = css `
  width: 36px;
`;
const foldedCover = css `
  width: 100%;
  height: 100%;
  background-color: ${COLOR_WHITE};
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 8px;
  padding-right: 8px;
  cursor: pointer;
  span {
    display: block;
    transform-origin: left top;
    transform: translateX(24px) rotate(90deg);
    font-weight: 600;
  }
`;
const rankCell = css `
  cursor: pointer;
  background-color: ${COLOR_WHITE};
  height: 24px;
  display: flex;
  align-items: center;
  padding-left: 8px;
  font-weight: 600;
`;
const allTaxonWrapper = css `
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
`;
const mediumTaxonWrapper = css `
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-shrink: 0;
`;

const AppContainer = ({ data }) => {
    const [displayData, setDisplayData] = reactExports.useState(processDisplayData(data));
    const filterId = useFilterIdState();
    reactExports.useEffect(() => {
        setDisplayData(processDisplayData(data, filterId));
    }, [data, filterId]);
    reactExports.useEffect(() => { }, [displayData]);
    return (jsxs("div", Object.assign({ css: appContainer }, { children: [jsx(MediaCol, { mediaList: displayData.media }), jsx("div", Object.assign({ css: taxonContainer }, { children: lineageRanks
                    .concat()
                    .reverse()
                    .map((rank, index) => (jsx(TaxonCol, { rank: rank, taxonList: displayData.taxon[rank] }, index))) }))] })));
};
const appContainer = css `
  display: flex;
  gap: 2px;
  padding: 1px;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
`;
const taxonContainer = css `
  display: flex;
  gap: 1px;
`;

const data1 = {
    media: [
        {
            label: "NUTRIENT AGAR",
            gm_id: "HM_D00001",
            strains: [
                "1076550",
                "1247726",
                "400667",
                "47883",
                "491915",
                "595494",
                "630626",
                "692420",
                "745277",
            ],
        },
        {
            label: "POTATO-CARROT AGAR",
            gm_id: "JCM_M54",
            strains: ["113562", "1952", "46175", "67581", "68225", "68233"],
        },
        {
            label: "1/10 POTATO-CARROT AGAR",
            gm_id: "JCM_M55",
            strains: ["1869", "1999", "28887", "47479", "58117"],
        },
    ],
    strains: [
        {
            id: "47479",
            label: "Streptosporangium album",
            lineage: {
                species: { id: "47479", label: "Streptosporangium album" },
                genus: { id: "2000", label: "Streptosporangium" },
                family: { id: "2004", label: "Streptosporangiaceae" },
                order: { id: "85012", label: "Streptosporangiales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "630626",
            label: "Shimwellia blattae DSM 4481 = NBRC 105725",
            lineage: {
                species: { id: "630626", label: "Shimwellia blattae DSM 4481 = NBRC 105725" },
                genus: { id: "1335483", label: "Shimwellia" },
                family: { id: "543", label: "Enterobacteriaceae" },
                order: { id: "91347", label: "Enterobacterales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "491915",
            label: "Anoxybacillus flavithermus WK1",
            lineage: {
                species: { id: "491915", label: "Anoxybacillus flavithermus WK1" },
                genus: { id: "150247", label: "Anoxybacillus" },
                family: { id: "186817", label: "Bacillaceae" },
                order: { id: "1385", label: "Bacillales" },
                class: { id: "91061", label: "Bacilli" },
                phylum: { id: "1239", label: "Firmicutes" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "46175",
            label: "Microtetraspora niveoalba",
            lineage: {
                species: { id: "46175", label: "Microtetraspora niveoalba" },
                genus: { id: "1995", label: "Microtetraspora" },
                family: { id: "2004", label: "Streptosporangiaceae" },
                order: { id: "85012", label: "Streptosporangiales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "1999",
            label: "Planomonospora venezuelensis",
            lineage: {
                species: { id: "1999", label: "Planomonospora venezuelensis" },
                genus: { id: "1998", label: "Planomonospora" },
                family: { id: "2004", label: "Streptosporangiaceae" },
                order: { id: "85012", label: "Streptosporangiales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "400667",
            label: "Acinetobacter baumannii ATCC 17978",
            lineage: {
                species: { id: "400667", label: "Acinetobacter baumannii ATCC 17978" },
                genus: { id: "469", label: "Acinetobacter" },
                family: { id: "468", label: "Moraxellaceae" },
                order: { id: "72274", label: "Pseudomonadales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "113562",
            label: "Actinoplanes derwentensis",
            lineage: {
                species: { id: "113562", label: "Actinoplanes derwentensis" },
                genus: { id: "1865", label: "Actinoplanes" },
                family: { id: "28056", label: "Micromonosporaceae" },
                order: { id: "85008", label: "Micromonosporales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "595494",
            label: "Tolumonas auensis DSM 9187",
            lineage: {
                species: { id: "595494", label: "Tolumonas auensis DSM 9187" },
                genus: { id: "43947", label: "Tolumonas" },
                family: { id: "84642", label: "Aeromonadaceae" },
                order: { id: "135624", label: "Aeromonadales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "67581",
            label: "Streptomyces viridosporus",
            lineage: {
                species: { id: "67581", label: "Streptomyces viridosporus" },
                genus: { id: "1883", label: "Streptomyces" },
                family: { id: "2062", label: "Streptomycetaceae" },
                order: { id: "85011", label: "Streptomycetales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "68233",
            label: "Streptomyces luteogriseus",
            lineage: {
                species: { id: "68233", label: "Streptomyces luteogriseus" },
                genus: { id: "1883", label: "Streptomyces" },
                family: { id: "2062", label: "Streptomycetaceae" },
                order: { id: "85011", label: "Streptomycetales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "745277",
            label: "Rahnella aquatilis CIP 78.65 = ATCC 33071",
            lineage: {
                species: { id: "745277", label: "Rahnella aquatilis CIP 78.65 = ATCC 33071" },
                genus: { id: "34037", label: "Rahnella" },
                family: { id: "1903411", label: "Yersiniaceae" },
                order: { id: "91347", label: "Enterobacterales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "1076550",
            label: "Pantoea rwandensis",
            lineage: {
                species: { id: "1076550", label: "Pantoea rwandensis" },
                genus: { id: "53335", label: "Pantoea" },
                family: { id: "1903409", label: "Erwiniaceae" },
                order: { id: "91347", label: "Enterobacterales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "68225",
            label: "Streptomyces kunmingensis",
            lineage: {
                species: { id: "68225", label: "Streptomyces kunmingensis" },
                genus: { id: "1883", label: "Streptomyces" },
                family: { id: "2062", label: "Streptomycetaceae" },
                order: { id: "85011", label: "Streptomycetales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "47883",
            label: "Pseudomonas synxantha",
            lineage: {
                species: { id: "47883", label: "Pseudomonas synxantha" },
                genus: { id: "286", label: "Pseudomonas" },
                family: { id: "135621", label: "Pseudomonadaceae" },
                order: { id: "72274", label: "Pseudomonadales" },
                class: { id: "1236", label: "Gammaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "1952",
            label: "Streptomyces thermoviolaceus",
            lineage: {
                species: { id: "1952", label: "Streptomyces thermoviolaceus" },
                genus: { id: "1883", label: "Streptomyces" },
                family: { id: "2062", label: "Streptomycetaceae" },
                order: { id: "85011", label: "Streptomycetales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "58117",
            label: "Microbispora rosea",
            lineage: {
                species: { id: "58117", label: "Microbispora rosea" },
                genus: { id: "2005", label: "Microbispora" },
                family: { id: "2004", label: "Streptosporangiaceae" },
                order: { id: "85012", label: "Streptosporangiales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "1247726",
            label: "Advenella mimigardefordensis DPN7",
            lineage: {
                species: { id: "1247726", label: "Advenella mimigardefordensis DPN7" },
                genus: { id: "290425", label: "Advenella" },
                family: { id: "506", label: "Alcaligenaceae" },
                order: { id: "80840", label: "Burkholderiales" },
                class: { id: "28216", label: "Betaproteobacteria" },
                phylum: { id: "1224", label: "Proteobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "692420",
            label: "Bacillus amyloliquefaciens DSM 7 = ATCC 23350",
            lineage: {
                species: { id: "692420", label: "Bacillus amyloliquefaciens DSM 7 = ATCC 23350" },
                genus: { id: "1386", label: "Bacillus" },
                family: { id: "186817", label: "Bacillaceae" },
                order: { id: "1385", label: "Bacillales" },
                class: { id: "91061", label: "Bacilli" },
                phylum: { id: "1239", label: "Firmicutes" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "1869",
            label: "Actinoplanes utahensis",
            lineage: {
                species: { id: "1869", label: "Actinoplanes utahensis" },
                genus: { id: "1865", label: "Actinoplanes" },
                family: { id: "28056", label: "Micromonosporaceae" },
                order: { id: "85008", label: "Micromonosporales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
        {
            id: "28887",
            label: "Planobispora longispora",
            lineage: {
                species: { id: "28887", label: "Planobispora longispora" },
                genus: { id: "29298", label: "Planobispora" },
                family: { id: "2004", label: "Streptosporangiaceae" },
                order: { id: "85012", label: "Streptosporangiales" },
                class: { id: "1760", label: "Actinobacteria" },
                phylum: { id: "201174", label: "Actinobacteria" },
                superkingdom: { id: "2", label: "Bacteria" },
            },
        },
    ],
};

const App = () => {
    return jsx(AppContainer, { data: data1 });
};

class HelloReact extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const main = this.root.querySelector("main");
            const props = this.params;
            ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, props)) }) }), main);
        });
    }
    handleAttributeChange() {
        const main = this.root.querySelector("main");
        const props = this.params;
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, props)) }) }), main);
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': HelloReact
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "hello-react",
	"stanza:label": "Hello react",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Yoji Shidara",
	"stanza:contributor": [
],
	"stanza:created": "2021-10-11",
	"stanza:updated": "2021-10-11",
	"stanza:parameter": [
	{
		"stanza:key": "say-to",
		"stanza:type": "string",
		"stanza:example": "world",
		"stanza:description": "who to say hello to",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":32}}}) : helper)))
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-media-strains-alignment.js.map
