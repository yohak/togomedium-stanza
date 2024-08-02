import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { l as COLOR_WHITE, C as COLOR_PRIMARY, a as jsxs, j as jsx, R as Recoil_index_8, o as Recoil_index_20, p as Recoil_index_24, ac as COLOR_GRAY400, F as Fragment, af as Recoil_index_9, M as COLOR_GRAY_LINE, H as SIZE1, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { c as css, r as reactExports, R as React, l as dist, g as getData } from './getData-1a784a8c.js';
import { u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { c as copy } from './index-eb2c9901.js';
import { n as nanoid } from './index.browser-4ca8a21b.js';
import { l as lineageRanks } from './types-8994330c.js';
import { b as Tooltip, l as API_MEDIA_STRAINS_ALIGNMENT } from './paths-0bbd78cc.js';
import { m as makeSpeciesName, c as capitalizeFirstLetter, s as stringToArray } from './string-4de5f4fa.js';
import './DefaultPropsProvider-4e645303.js';
import './variables-58f3d1be.js';

const makeCellHeight = (size) => {
    return 48 * size + size - 1;
};
const processDisplayData = (data, filterTaxon = "", filterRank = "strain") => {
    const nullFilled = fillNullTaxon(data);
    const filtered = filterData(nullFilled, filterTaxon);
    const taxon = processTaxonColList(filtered, filterRank);
    const media = processMediaCell(filtered, taxon, filterRank);
    return { media, taxon };
};
const processMediaCell = (data, taxon, filterRank) => {
    return data.map((item, i) => {
        return {
            id: item.gm_id,
            label: item.label,
            size: taxon[filterRank][i].length,
        };
    });
};
const fillNullTaxon = (data) => {
    const cloned = copy(data);
    const nullCells = [];
    const findNullId = (gmId, parentId) => {
        var _a;
        return (_a = nullCells.find((cell) => parentId === cell.parentId && cell.gmId === gmId)) === null || _a === void 0 ? void 0 : _a.id;
    };
    cloned.forEach((media) => {
        media.organisms.forEach((organism) => {
            const gmId = media.gm_id;
            lineageRanks.forEach((rank, lineageIndex) => {
                if (organism[rank] !== null)
                    return;
                const parentRank = lineageRanks[lineageIndex - 1];
                const parent = organism[parentRank];
                const parentId = parent.id;
                const foundId = findNullId(gmId, parentId);
                const id = foundId || nanoid();
                organism[rank] = { id, label: "" };
                if (!foundId) {
                    nullCells.push({ id, parentId, gmId });
                }
            });
        });
    });
    return cloned;
};
const processTaxonCol = (trees, rank, filterRank) => {
    return trees.map((tree) => getNodeListOfRankFromTree(tree, rank).map((node) => ({
        id: node.id,
        label: node.label,
        size: getSizeOfCell(node, filterRank),
    })));
};
const processTaxonColList = (data, filterRank) => {
    const trees = makeTaxonTreesFromData(data);
    return lineageRanks.reduce((accum, rank) => {
        const result = Object.assign({}, accum);
        result[rank] = processTaxonCol(trees, rank, filterRank);
        return result;
    }, {});
};
const filterData = (data, taxId = "") => {
    if (taxId === "")
        return data;
    const cloned = copy(data);
    cloned.forEach((media) => {
        media.organisms = media.organisms.filter((organism) => {
            const organismIds = Object.values(organism).map((item) => item.id);
            return organismIds.includes(taxId);
        });
    });
    return cloned.filter((medium) => medium.organisms.length > 0);
};
const getSizeOfCell = (node, filterRank) => {
    let total = 1;
    const process = (n) => {
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
const makeTaxonTreesFromData = (data) => {
    return data.map((medium) => makeTaxonTree(medium.organisms, medium.gm_id));
};
const makeTaxonTree = (organisms, gmId) => {
    const flatTaxonList = organisms
        .map((organism) => lineageToTaxonNode(organism, gmId))
        .flat()
        .reduce(reduceSingle, []);
    organisms.forEach((organism) => {
        lineageRanks.forEach((rank, index) => {
            const targetTaxon = organism[rank];
            const targetNode = findNodeFromFlatList(flatTaxonList, (targetTaxon === null || targetTaxon === void 0 ? void 0 : targetTaxon.id) || "", rank);
            if (rank !== "superkingdom") {
                const parentRank = lineageRanks[index - 1];
                const parentTaxon = organism[parentRank];
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
const lineageToTaxonNode = (lineage, gmId) => lineageRanks.map((key) => makeTaxonNode(lineage[key], key, gmId));
const makeTaxonNode = (taxon, rank, gmId) => {
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
const reduceSingle = (accum, current) => {
    return accum.find((item) => item.id === current.id && item.rank === current.rank)
        ? [...accum]
        : [...accum, current];
};

const useToolTipEnabled = () => {
    const labelRef = reactExports.useRef(null);
    const [toolTipEnabled, setToolTipEnabled] = reactExports.useState(false);
    reactExports.useEffect(() => {
        var _a, _b;
        const offsetWidth = (_a = labelRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
        const scrollWidth = (_b = labelRef.current) === null || _b === void 0 ? void 0 : _b.scrollWidth;
        setToolTipEnabled(!!scrollWidth && !!offsetWidth && scrollWidth > offsetWidth);
    }, [labelRef]);
    return { labelRef, toolTipEnabled };
};
const MediaCell = ({ label, id, size, css, className }) => {
    const { labelRef, toolTipEnabled } = useToolTipEnabled();
    return (jsxs("div", { css: [mediaCell, css], className: className, style: { height: `${makeCellHeight(size)}px` }, children: [jsx("a", { href: `/medium/${id}`, children: id }), jsx("div", { className: "label-wrapper", children: jsx(Tooltip, { title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true, disableHoverListener: !toolTipEnabled, children: jsx("span", { ref: labelRef, className: "label", children: label }) }) })] }));
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
  .label-wrapper {
    position: relative;
  }
  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    height: 16px;
    flex-shrink: 0;
  }
`;

const MediaCol = ({ mediaList, css, className }) => {
    return (jsxs("div", { css: [mediaCol, css], className: className, children: [jsx("div", { css: emptyCell }), mediaList.map((info, index) => (jsx(MediaCell, Object.assign({}, info), index)))] }));
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
    return (jsx("svg", { css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", children: jsx("path", { d: "M324.4 64C339.6 64 352 76.37 352 91.63C352 98.32 349.6 104.8 345.2 109.8L240 230V423.6C240 437.1 229.1 448 215.6 448C210.3 448 205.2 446.3 200.9 443.1L124.7 385.6C116.7 379.5 112 370.1 112 360V230L6.836 109.8C2.429 104.8 0 98.32 0 91.63C0 76.37 12.37 64 27.63 64H324.4zM144 224V360L208 408.3V223.1C208 220.1 209.4 216.4 211.1 213.5L314.7 95.1H37.26L140 213.5C142.6 216.4 143.1 220.1 143.1 223.1L144 224zM496 400C504.8 400 512 407.2 512 416C512 424.8 504.8 432 496 432H336C327.2 432 320 424.8 320 416C320 407.2 327.2 400 336 400H496zM320 256C320 247.2 327.2 240 336 240H496C504.8 240 512 247.2 512 256C512 264.8 504.8 272 496 272H336C327.2 272 320 264.8 320 256zM496 80C504.8 80 512 87.16 512 96C512 104.8 504.8 112 496 112H400C391.2 112 384 104.8 384 96C384 87.16 391.2 80 400 80H496z" }) }));
};

const filterTaxon = Recoil_index_8({ key: "filterId", default: "" });
const useFilterTaxonState = () => {
    return Recoil_index_20(filterTaxon);
};
const useFilterTaxonMutators = () => {
    const setter = Recoil_index_24(filterTaxon);
    const setFilterTaxon = (id) => setter((prev) => (id === prev ? "" : id));
    return { setFilterTaxon };
};

const TaxonCell = (props) => {
    const wrapperRef = React.useRef(null);
    reactExports.useEffect(() => {
        if (!wrapperRef.current)
            return;
        const size = props.isFolded ? 1 : props.size;
        wrapperRef.current.style.height = makeCellHeight(size) + "px";
    }, [props.size, props.isFolded]);
    return reactExports.useMemo(() => jsx(ToMemoize, Object.assign({}, props, { wrapperRef: wrapperRef })), [props.id]);
};
const ToMemoize = ({ wrapperRef, label, id, rank, css, className }) => {
    const filterId = useFilterTaxonState();
    const pathRoot = rank === "strain" ? "/strain/" : "/taxon/";
    const { setFilterTaxon } = useFilterTaxonMutators();
    const onClickFilter = () => {
        setFilterTaxon(id);
    };
    const { labelRef, toolTipEnabled } = useToolTipEnabled();
    return (jsxs("div", { css: [taxonCell, css], className: className, ref: wrapperRef, children: [!!label && (jsxs(Fragment, { children: [jsx("a", { href: `${pathRoot}${id}`, children: id }), jsx("div", { className: "label-wrapper", children: jsx(Tooltip, { title: makeLabel(label, rank), placement: "top", PopperProps: { disablePortal: true }, arrow: true, disableHoverListener: !toolTipEnabled, children: jsx("span", { className: "label", ref: labelRef, children: makeLabel(label, rank) }) }) }), jsx("span", { css: filterIcon, onClick: onClickFilter, children: jsx(FilterIcon, { css: [id === filterId ? filterIconColorActive : filterIconColorInactive] }) })] })), !label && jsx(Fragment, { children: "" })] }));
};
const makeLabel = (label, rank) => {
    switch (rank) {
        case "strain":
            return makeSpeciesName(label);
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

  .label-wrapper {
    position: relative;
  }
  .label {
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

const makeDefaultStatus = () => lineageRanks.reduce((accum, current) => {
    return Object.assign(Object.assign({}, accum), { [current]: false });
}, {});
const filterStatus = Recoil_index_8({
    key: "filterStatus",
    default: makeDefaultStatus(),
});
const filterRank = Recoil_index_9({
    key: "filterRank",
    get: ({ get }) => {
        const status = get(filterStatus);
        return findCurrentFilterRank(status);
    },
});
const useFilterRankState = () => {
    return Recoil_index_20(filterRank);
};
const useFilterRankMutators = () => {
    const setFilterRankStatus = Recoil_index_24(filterStatus);
    const changeFilterRank = (rank, val) => {
        setFilterRankStatus((prev) => {
            return Object.assign(Object.assign({}, prev), { [rank]: val });
        });
    };
    return { changeFilterRank };
};
const findCurrentFilterRank = (status) => {
    let found = undefined;
    const arr = lineageRanks.concat().reverse();
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const val = status[key];
        if (val) {
            found = key;
        }
        else {
            break;
        }
    }
    if (found === "superkingdom") {
        return "superkingdom";
    }
    const result = lineageRanks[lineageRanks.indexOf(found) - 1];
    return result || "strain";
};

const TaxonCol = ({ css, className, rank, taxonList }) => {
    const { changeFilterRank } = useFilterRankMutators();
    const [isFolded, setIsFolded] = reactExports.useState(false);
    const wrapperRef = reactExports.useRef(null);
    const onClickRank = (e) => {
        e.preventDefault();
        setIsFolded((prev) => {
            const result = !prev;
            changeFilterRank(rank, result);
            return result;
        });
    };
    reactExports.useEffect(() => {
        const isFolded = rank === "superkingdom" || rank === "phylum" || rank === "class";
        if (isFolded) {
            setIsFolded(true);
            changeFilterRank(rank, true);
        }
    }, []);
    reactExports.useEffect(() => {
        if (!wrapperRef.current)
            return;
        setTimeout(() => {
            wrapperRef.current.style.display = !isFolded ? "flex" : "none";
        }, 16);
    }, [isFolded]);
    return (jsxs("div", { css: [taxonCol, isFolded ? foldedStyle : null, css], className: className, children: [!isFolded && (jsx("div", { css: rankCell, onClick: onClickRank, children: capitalizeFirstLetter(rank) })), jsx("div", { css: allTaxonWrapper, ref: wrapperRef, children: taxonList.map((list, index) => (jsx("div", { css: mediumTaxonWrapper, children: list.map((info, index) => (jsx(TaxonCell, Object.assign({}, info, { rank: rank, isFolded: isFolded }), index))) }, index))) }), isFolded && (jsx("div", { css: foldedCover, onClick: onClickRank, children: jsx("span", { children: capitalizeFirstLetter(rank) }) }))] }));
};
const taxonCol = css `
  width: 200px;
  //background-color: ${COLOR_GRAY_LINE};
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: relative;
  height: 100%;
  min-height: ${48 + 24}px;
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

const AppContainer = ({ data, hideMedia = false }) => {
    const filterTaxon = useFilterTaxonState();
    const filterRank = useFilterRankState();
    const displayData = reactExports.useMemo(() => processDisplayData(data, filterTaxon, filterRank), [data, filterTaxon, filterRank]);
    return displayData.media.length ? (jsxs("div", { css: appContainer, children: [!hideMedia && jsx(MediaCol, { mediaList: displayData.media }), jsx("div", { css: taxonContainer, children: lineageRanks
                    .concat()
                    .reverse()
                    .map((rank, index) => (jsx(TaxonCol, { rank: rank, taxonList: displayData.taxon[rank] }, index))) })] })) : (jsx("p", { children: "NO RESULT FOUND" }));
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

const useData = (gmIds) => {
    const { data, isLoading } = useQuery({
        queryKey: [...gmIds],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getData(API_MEDIA_STRAINS_ALIGNMENT, {
                gm_ids: gmIds.join(","),
            });
            if (!result.body)
                throw new Error("No data");
            return result.body;
        }),
    });
    return { data, isLoading };
};
const App = ({ gmIds, hideMedia = false }) => {
    const { data, isLoading } = useData(gmIds);
    if (isLoading)
        return jsx(Fragment, { children: "Loading..." });
    return jsx("div", { css: wrapper, children: data && jsx(AppContainer, { data, hideMedia }) });
};
const wrapper = css `
  min-height: 100px;
  width: fit-content;
  min-width: 100%;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gmIds = stringToArray(this.params.gm_ids);
        const hideMedia = this.params.hide_media === "true";
        return jsx(App, { hideMedia, gmIds, stanzaElement: this.root });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-media-strains-alignment-table",
	"stanza:label": "Media Strains Alignment Table",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
	{
		"stanza:key": "gm_ids",
		"stanza:type": "string",
		"stanza:example": "HM_D00001a,HM_D00065",
		"stanza:description": "",
		"stanza:required": true
	},
	{
		"stanza:key": "hide_media",
		"stanza:type": "string",
		"stanza:example": "false",
		"stanza:description": "",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
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
//# sourceMappingURL=gmdb-media-strains-alignment-table.js.map
