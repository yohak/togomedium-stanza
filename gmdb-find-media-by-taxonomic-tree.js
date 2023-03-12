import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-311696ff.js';
import { f as COLOR_WHITE, r as COLOR_GRAY_LINE, C as COLOR_PRIMARY, a as COLOR_GRAY300, v as COLOR_GRAY700, K as COLOR_GRAY400, b as jsxs, j as jsx, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-53d8142c.js';
import { c as css, d as dist, r as reactExports } from './index-8d82cef7.js';
import { a as Recoil_index_6, b as Recoil_index_18, c as Recoil_index_22, R as Recoil_index_4 } from './recoil-14beaca9.js';
import { I as IconBlank, a as IconNoChildren, b as IconCompact, c as IconExpand } from './icons-8fd98eed.js';
import { T as Tooltip, d as API_TAXONOMY_CHILDREN, c as API_MEDIA_BY_TAXON } from './paths-2746fdb2.js';
import { d as Checkbox, a as useQueryDataMutators, u as useFoundMediaMutators, b as useMediaLoadAbortMutators, n as nullResponse, w as wrapper$1, q as queryPane, s as subPane, M as MediaPane, c as useFoundMediaState } from './MediaPane-6c3ef357.js';
import { g as getData } from './getData-9618d463.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-b3d5a276.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import './createSvgIcon-87040e42.js';
import './Grow-d939d7fb.js';
import './variables-0b8fac13.js';
import './useFormControl-91c26a87.js';
import './consts-234f4433.js';

const TreeBranchView = ({ label, linkString, linkURL, id, check, tag, hasChildren, isOpen, isLoading, onClickCheck, onToggleChildren, children, className, css, toolTipLabel = "", }) => {
    return (jsxs("li", Object.assign({ css: [wrapper, css], className: className }, { children: [jsxs("div", Object.assign({ css: inner }, { children: [jsxs("div", Object.assign({ css: left }, { children: [jsx("span", Object.assign({ onClick: () => onToggleChildren(id) }, { children: jsx(ToggleIcon, Object.assign({}, { hasChildren, isOpen, isLoading })) })), jsx(Tooltip, Object.assign({ title: toolTipLabel, PopperProps: { disablePortal: true }, arrow: true, placement: "top-start" }, { children: jsx("span", { children: label }) })), tag && jsx("span", Object.assign({ css: tagTip }, { children: tag })), linkString && linkURL && (jsxs("a", Object.assign({ href: linkURL, target: "_blank", rel: "noreferrer" }, { children: ["[", linkString, "]"] })))] })), jsx(Checkbox, { checked: check === "checked" || check === "grouped", indeterminate: check === "indeterminate", onClick: () => onClickCheck(id) })] })), isOpen && !!children && jsx("ul", Object.assign({ css: childrenWrapper }, { children: children }))] })));
};
const ToggleIcon = ({ hasChildren, isOpen, isLoading, }) => {
    if (isLoading)
        return jsx(IconBlank, { css: icon });
    if (!hasChildren)
        return jsx(IconNoChildren, { css: icon });
    if (isOpen)
        return jsx(IconCompact, { css: [icon, clickable] });
    return jsx(IconExpand, { css: [icon, clickable] });
};
const wrapper = css `
  margin-top: -1px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const inner = css `
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  background-color: ${COLOR_WHITE};
  padding: 0 8px;
  border: 1px solid ${COLOR_GRAY_LINE};
`;
const left = css `
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  line-height: 1;
  font-size: 16px;
  a {
    font-size: 14px;
    color: ${COLOR_PRIMARY};
  }
`;
const icon = css `
  display: block;
  color: ${COLOR_GRAY300};
  width: 24px;
  height: 24px;
`;
const clickable = css `
  cursor: pointer;
  color: ${COLOR_GRAY700};
`;
const childrenWrapper = css `
  padding-left: 32px;
`;
const tagTip = css `
  font-size: 12px;
  background-color: ${COLOR_GRAY400};
  color: ${COLOR_WHITE};
  padding: 4px 6px;
  border-radius: 5px;
`;

const retrieveTaxonInfo = (info, addTaxonToList, setTaxonChildren) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const params = {
            tax_id: info.id,
        };
        const response = yield getData(API_TAXONOMY_CHILDREN, params);
        setTaxonChildren(info.id, (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.map((item) => item.tax_id)) !== null && _b !== void 0 ? _b : []);
        (_c = response === null || response === void 0 ? void 0 : response.body) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
            addTaxonToList({
                id: item.tax_id,
                label: item.name,
                rank: item.rank,
                children: item.rank === "Species" ? [] : "not-yet",
            });
        });
    }))();
};
const findAscendants = (list, id) => {
    let iterationCount = 0;
    const result = [];
    let currentId = id;
    while (iterationCount < 255) {
        iterationCount++;
        const parent = findParent(list, currentId);
        if (parent) {
            result.unshift(parent.id);
            currentId = parent.id;
        }
        else {
            break;
        }
    }
    return result;
};
const findDescendants = (list, id) => {
    let result = [];
    const process = (currentId) => {
        const children = findChildren(list, currentId);
        if (children && dist.isArray(children)) {
            result = [...result, ...children];
            children.forEach((childId) => process(childId));
        }
    };
    process(id);
    return result;
};
const makeNewSelection = (list, id, selection) => {
    const isSelected = checkIsSelected(id, selection);
    let result = setSelection(selection, id, !isSelected);
    let currentId;
    const ascendants = findAscendants(list, id).reverse();
    const descendants = findDescendants(list, id);
    if (descendants) {
        result = setMultipleSelection(result, descendants, false);
    }
    const checkedAscendant = ascendants.find((ascendant) => result.includes(ascendant));
    if (checkedAscendant) {
        currentId = id;
        for (let i = 0; i < ascendants.length; i++) {
            const parent = ascendants[i];
            result = setSelection(result, parent, false);
            const siblings = findSiblings(list, currentId);
            result = setMultipleSelection(result, siblings, true);
            result = setSelection(result, currentId, false);
            if (checkedAscendant === parent) {
                break;
            }
            currentId = parent;
        }
    }
    currentId = id;
    for (let i = 0; i < ascendants.length; i++) {
        const parent = ascendants[i];
        const siblings = [...findSiblings(list, currentId), currentId];
        const checkedSiblings = siblings.filter((siblingId) => result.includes(siblingId));
        if (parent && checkedSiblings.length && checkedSiblings.length === siblings.length) {
            result = setMultipleSelection(result, checkedSiblings, false);
            result = setSelection(result, parent, true);
        }
        currentId = parent;
    }
    return result;
};
const checkIsSelected = (id, selection) => {
    return selection.includes(id);
};
const setSelection = (selection, id, value) => {
    const isSelected = checkIsSelected(id, selection);
    switch (true) {
        case isSelected && !value:
            return selection.filter((item) => item !== id);
        case !isSelected && value:
            return [...selection, id];
        default:
            return [...selection];
    }
};
const setMultipleSelection = (selection, ids, value) => {
    let result = [...selection];
    ids.forEach((id) => (result = setSelection(result, id, value)));
    return result;
};
const findChildren = (list, id) => { var _a; return (_a = list.find((info) => info.id === id)) === null || _a === void 0 ? void 0 : _a.children; };
const findParent = (list, id) => list.find((node) => { var _a; return (_a = node.children) === null || _a === void 0 ? void 0 : _a.includes(id); });
const findSiblings = (list, id) => {
    var _a;
    const children = (_a = findParent(list, id)) === null || _a === void 0 ? void 0 : _a.children;
    if (children && dist.isArray(children)) {
        return children.filter((myId) => myId !== id);
    }
    else {
        return [];
    }
};

const selectedTaxon = Recoil_index_6({ key: "selectedTaxon", default: [] });
const useSelectedTaxonState = () => {
    return Recoil_index_18(selectedTaxon);
};
const useSelectedTaxonMutators = () => {
    const setSelectedTaxon = Recoil_index_22(selectedTaxon);
    const clearTaxonSelect = () => {
        setSelectedTaxon([]);
    };
    const updateSelection = (list, id) => {
        setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
    };
    return {
        __setSelectedTaxon: setSelectedTaxon,
        clearTaxonSelect,
        updateSelection,
    };
};

const taxonList = Recoil_index_6({ key: "taxonList", default: [] });
const useTaxonListState = () => {
    return Recoil_index_18(taxonList);
};
const useTaxonListMutators = () => {
    const setTaxonList = Recoil_index_22(taxonList);
    const addTaxonToList = (taxon) => {
        setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
    };
    const setTaxonChildren = (id, children) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children })];
        });
    };
    const setTaxonAsLoading = (id) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children: "loading" })];
        });
    };
    return { addTaxonToList, setTaxonAsLoading, setTaxonChildren };
};

const TaxonomicTreeBranch = ({ id, css, className }) => {
    const taxonList = useTaxonListState();
    const myInfo = reactExports.useMemo(() => {
        return taxonList.find((item) => item.id === id);
    }, [taxonList, id]);
    const { branchChildren, isLoading } = useBranchChildren(myInfo);
    const { label, rank } = useTaxonInfo(id, myInfo);
    const { descendants, ascendants } = useLineages(id, taxonList);
    const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
    const { ascendantsLabel } = useAscendantsLabel(ascendants);
    const [linkString, linkURL] = useLinkString(id, rank);
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const onToggleChildren = () => {
        setIsOpen((prev) => !prev);
    };
    return (jsx(TreeBranchView, Object.assign({ css: css, className: className, label: label, id: id, tag: rank, linkString: linkString, linkURL: linkURL, toolTipLabel: ascendantsLabel, check: check, hasChildren: !!branchChildren.length, isOpen: isOpen, isLoading: isLoading, onClickCheck: () => onClickCheck(), onToggleChildren: onToggleChildren }, { children: isOpen &&
            branchChildren.length &&
            branchChildren.map((childId) => jsx(TaxonomicTreeBranch, { id: childId }, childId)) })));
};
const useLinkString = (id, rank) => {
    const [linkString, setLinkString] = reactExports.useState("");
    const [linkURL, setLinkURL] = reactExports.useState("");
    reactExports.useEffect(() => {
        setLinkString(`tax_id:${id}`);
        setLinkURL(`http://growthmedium.org/${rank === "Species" ? "organism" : "taxon"}/${id}`);
    }, [id, rank]);
    return [linkString, linkURL];
};
const useBranchChildren = (info) => {
    const [branchChildren, setBranchChildren] = reactExports.useState([]);
    const { setTaxonAsLoading, addTaxonToList, setTaxonChildren } = useTaxonListMutators();
    const [isLoading, setIsLoading] = reactExports.useState(false);
    reactExports.useEffect(() => {
        setIsLoading((info === null || info === void 0 ? void 0 : info.children) === "loading");
        if ((info === null || info === void 0 ? void 0 : info.children) === "not-yet") {
            setTaxonAsLoading(info.id);
            setIsLoading(true);
            retrieveTaxonInfo(info, addTaxonToList, setTaxonChildren);
        }
        if (info && dist.isArray(info.children)) {
            setBranchChildren(info.children);
        }
    }, [info]);
    return { branchChildren, isLoading };
};
const useTaxonInfo = (id, myInfo) => {
    const [rank, setRank] = reactExports.useState("");
    const [label, setLabel] = reactExports.useState("");
    reactExports.useEffect(() => {
        if (myInfo) {
            setRank(myInfo.rank);
            setLabel(myInfo.label);
        }
    }, [id, myInfo]);
    return { rank, label };
};
const useChecked = (id, taxonList, ascendants, descendants) => {
    const selectedTaxon = useSelectedTaxonState();
    const [check, setCheck] = reactExports.useState("none");
    const { updateSelection } = useSelectedTaxonMutators();
    const onClickCheck = () => {
        updateSelection(taxonList, id);
    };
    reactExports.useEffect(() => {
        const isChecked = !!selectedTaxon.find((taxId) => taxId === id);
        const isGrouped = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
        const isIndeterminate = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
        switch (true) {
            case isChecked:
                setCheck("checked");
                break;
            case isGrouped:
                setCheck("grouped");
                break;
            case isIndeterminate:
                setCheck("indeterminate");
                break;
            default:
                setCheck("none");
        }
    }, [selectedTaxon, descendants, ascendants, id]);
    return { check, onClickCheck };
};
const useLineages = (id, taxonList) => {
    const [ascendants, setAscendants] = reactExports.useState([]);
    const [descendants, setDescendants] = reactExports.useState([]);
    reactExports.useEffect(() => {
        setAscendants(findAscendants(taxonList, id));
        setDescendants(findDescendants(taxonList, id));
    }, [taxonList, id]);
    return { ascendants, descendants };
};
const useAscendantsLabel = (ascendants) => {
    const [label, setLabel] = reactExports.useState("");
    const taxonList = useTaxonListState();
    reactExports.useEffect(() => {
        setLabel(ascendants.map((id) => { var _a; return (_a = taxonList.find((taxon) => taxon.id === id)) === null || _a === void 0 ? void 0 : _a.label; }).join(" > "));
    }, [ascendants]);
    return { ascendantsLabel: label };
};
css ``;

const useInitTaxonTree = () => {
    const { addTaxonToList } = useTaxonListMutators();
    const process = () => {
        superkingdoms.forEach((info) => {
            addTaxonToList(info);
        });
    };
    reactExports.useEffect(() => {
        process();
    }, []);
};
const superkingdoms = [
    {
        id: "2157",
        label: "Archaea",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2",
        label: "Bacteria",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2759",
        label: "Eukaryota",
        rank: "Superkingdom",
        children: "not-yet",
    },
];

const TaxonomicTreeSection = () => {
    useInitTaxonTree();
    useMediaLoadFromTaxon();
    return (jsx("div", Object.assign({ css: [taxonomicTreeSection] }, { children: jsxs("div", { children: [jsx(TaxonomicTreeBranch, { id: "2157" }), jsx(TaxonomicTreeBranch, { id: "2" }), jsx(TaxonomicTreeBranch, { id: "2759" })] }) })));
};
const taxonomicTreeSection = css `
  //overflow: scroll;
`;
const useMediaLoadFromTaxon = () => {
    const selectedTaxon = useSelectedTaxonState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    reactExports.useEffect(() => {
        if (selectedTaxon.length === 0) {
            setQueryData({});
            setFoundMedia(nullResponse);
            setNextMediaLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const params = { tax_ids: selectedTaxon, limit: 10, offset: 0 };
            setQueryData({ tax_ids: selectedTaxon });
            const abort = new AbortController();
            setNextMediaLoadAbort(abort);
            const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
            setNextMediaLoadAbort(null);
            if (response.body) {
                setFoundMedia(Object.assign({}, response.body));
            }
        }))();
    }, [selectedTaxon]);
};

const AppContainer = ({ dispatchEvent }) => {
    const { next, prev } = useMediaPagination();
    return (jsxs("div", Object.assign({ css: wrapper$1 }, { children: [jsx("div", Object.assign({ css: queryPane }, { children: jsx(TaxonomicTreeSection, {}) })), jsx("div", Object.assign({ css: subPane }, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent, next: next, prev: prev }) }))] })));
};
const useMediaPagination = () => {
    const selectedTaxon = useSelectedTaxonState();
    const response = useFoundMediaState();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const next = () => {
        paginate({
            offset: response.offset + 10,
            tax_ids: selectedTaxon,
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    const prev = () => {
        paginate({
            offset: response.offset - 10,
            tax_ids: selectedTaxon,
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    return { next, prev };
};
const paginate = ({ offset, abortLoader, tax_ids, setFoundMedia }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { tax_ids, offset, limit: 10 };
    const abort = new AbortController();
    abortLoader(abort);
    const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
    abortLoader(null);
    if (response.body) {
        setFoundMedia(response.body);
    }
});

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
        console.log("dispatch", { detail: gmIds });
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
};

class HelloReact extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this._render();
            importWebFontForTogoMedium(this);
        });
    }
    handleAttributeChange() {
        this._render();
    }
    _render() {
        const main = this.root.querySelector("main");
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root }) }) })) }) }), main);
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
	"@id": "gmdb-find-media-by-taxonomic-tree",
	"stanza:label": "Find Media by Taxonomic Tree",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
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
//# sourceMappingURL=gmdb-find-media-by-taxonomic-tree.js.map
