import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-f44e302d.js';
import { C as COLOR_WHITE, S as SIZE1, a as SIZE4, b as SIZE3, j as jsx, c as jsxs, d as COLOR_GRAY700, e as COLOR_PRIMARY, f as COLOR_GRAY, F as FONT_EN, g as COLOR_GRAY_LINE, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-07efdcf7.js';
import { c as css, j as jsx$1, r as react } from './index-6aec0cc7.js';
import { c as clone, R as Recoil_index_6, a as Recoil_index_18, b as Recoil_index_22, I as IconCompact, d as IconExpand, e as IconBlank, T as Tooltip, P as PATH_COMPONENT, f as PATH_MEDIUM, g as PATH_ORGANISM, A as API_MEDIA_ALIMENT, h as Recoil_index_4 } from './paths-a146f7de.js';
import { g as getData } from './getData-d291c717.js';
import { i as importWebFontForTogoMedium } from './stanza-4b95c663.js';
import { s as stringToArray } from './string-ad764b4c.js';

const WIDTH_EXPANDED = "200px";
const WIDTH_COMPACT = "130px";
const WIDTH_ALIGNMENT_CELL = 40;
const ROOT_COMPONENT = "GMO_000002";

const findBranchFromTrunk = (id, tree) => {
    return tree.map((branch) => findNode(id, branch)).find((r) => !!r);
};
function findNode(id, currentNode) {
    let i, currentChild, result;
    if (id == currentNode.id) {
        return currentNode;
    }
    else {
        for (i = 0; i < currentNode.children.length; i += 1) {
            currentChild = currentNode.children[i];
            result = findNode(id, currentChild);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
}

const toggleFooterComponent = (id, data) => {
    const cloned = clone(data);
    const branch = findBranchFromTrunk(id, cloned);
    if (branch) {
        branch.isOpen = !branch.isOpen;
        return cloned;
    }
    else {
        return undefined;
    }
};

const componentTree = Recoil_index_6({ key: "componentTree", default: [] });
const useComponentTreeState = () => {
    return Recoil_index_18(componentTree);
};
const useComponentTreeMutators = () => {
    const setComponentTree = Recoil_index_22(componentTree);
    const toggleComponent = (id) => {
        setComponentTree((prev) => {
            const result = toggleFooterComponent(id, prev);
            if (result) {
                return result;
            }
            else {
                return [];
            }
        });
    };
    return { toggleComponent, setComponentTree };
};

const FooterCell = ({ label, level, hasChildren, isOpen, id }) => {
    const { toggleComponent } = useComponentTreeMutators();
    const onClickFooterItem = (id) => toggleComponent(id);
    const Icon = hasChildren ? (isOpen ? (jsx(IconCompact, { css: icon$1, onClick: () => onClickFooterItem(id) }, void 0)) : (jsx(IconExpand, { css: icon$1, onClick: () => onClickFooterItem(id) }, void 0))) : (jsx(IconBlank, { css: icon$1 }, void 0));
    return (jsxs("div", Object.assign({ css: wrapper$a }, { children: [new Array(level).fill(null).map((r, index) => (jsx("span", { className: "spacer" }, index))), Icon, jsx("span", Object.assign({ className: "text" }, { children: label }), void 0)] }), void 0));
};
const wrapper$a = css `
  box-sizing: border-box;
  width: ${WIDTH_ALIGNMENT_CELL}px;
  background-color: ${COLOR_WHITE};
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SIZE1};
  padding-bottom: ${SIZE4};
  & > .text {
    writing-mode: vertical-rl;
    transform: translateX(-1px);
  }
  & > .spacer {
    display: block;
    height: ${SIZE3};
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const iconBlank = css `
  margin-bottom: ${SIZE1};
`;
const icon$1 = css `
  ${iconBlank};
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const isMediaExpanded = Recoil_index_6({ key: "isMediaExpanded", default: false });
const useIsMediaExpendedState = () => {
    return Recoil_index_18(isMediaExpanded);
};
const useIsMediaExpandedMutators = () => {
    const setIsMediaExpanded = Recoil_index_22(isMediaExpanded);
    return { setIsMediaExpanded };
};

const isOrganismsExpanded = Recoil_index_6({ key: "isOrganismsExpanded", default: false });
const useIsOrganismsExpendedState = () => {
    return Recoil_index_18(isOrganismsExpanded);
};
const useIsOrganismsExpandedMutators = () => {
    const setIsOrganismsExpanded = Recoil_index_22(isOrganismsExpanded);
    return { setIsOrganismsExpanded };
};

const FooterRow = ({ components }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs("div", Object.assign({ css: wrapper$9 }, { children: [jsx("div", { css: infoSpacer, className: isMediaExpanded ? "expand" : "compact" }, void 0), jsx("div", { css: infoSpacer, className: isOrganismsExpanded ? "expand" : "compact" }, void 0), components.map((component) => (jsx$1(FooterCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: componentSpacer }, void 0)] }), void 0));
};
const wrapper$9 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const infoSpacer = css `
  background-color: ${COLOR_WHITE};
  &.expand {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;
const componentSpacer = css `
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;

const HeaderCell = ({ label, onClickIcon, isExpanded }) => {
    return (jsxs("div", Object.assign({ css: wrapper$8, className: isExpanded ? "expanded" : "compact" }, { children: [jsx("span", { children: label }, void 0), isExpanded ? (jsx(IconCompact, { css: icon, onClick: onClickIcon }, void 0)) : (jsx(IconExpand, { css: icon, onClick: onClickIcon }, void 0))] }), void 0));
};
const wrapper$8 = css `
  display: flex;
  background-color: ${COLOR_WHITE};
  align-items: center;
  justify-content: space-between;
  padding: ${SIZE1};
  box-sizing: border-box;

  &.expanded {
    width: ${WIDTH_EXPANDED};
  }

  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;
const icon = css `
  font-size: 24px;
  color: ${COLOR_GRAY700};
  cursor: pointer;
`;

const HeaderRow = ({ css, className }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    return (jsxs("div", Object.assign({ css: [wrapper$7, css], className: className }, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }, void 0), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }, void 0), jsx("div", Object.assign({ css: components }, { children: "Components" }), void 0)] }), void 0));
};
const wrapper$7 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const components = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  padding: ${SIZE1};
  flex-grow: 1 !important;
`;

const AlignmentCell = ({ state, label, id }) => {
    return (jsx("div", Object.assign({ css: wrapper$6 }, { children: jsx(Tooltip, Object.assign({ title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true }, { children: jsx("a", Object.assign({ href: `${PATH_COMPONENT}${id}`, target: "_blank", className: `icon-${state} icon`, rel: "noreferrer" }, { children: jsx("span", {}, void 0) }), void 0) }), void 0) }), void 0));
};
const wrapper$6 = css `
  box-sizing: border-box;
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1};
  display: flex;
  width: fit-content;
  align-items: center;
  flex-grow: 0;
  .icon {
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }
  .icon-available > span {
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${COLOR_PRIMARY};
  }
  .icon-grouped > span {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 2px solid ${COLOR_PRIMARY};
  }

  .icon-none > span {
    display: none;
    box-sizing: border-box;
    width: 100%;
    height: 4px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
  }
`;

const InfoCell = (props) => {
    return props.expanded ? jsx(Expanded, Object.assign({}, props), void 0) : jsx(Compact, Object.assign({}, props), void 0);
};
const Compact = ({ info, linkBase }) => {
    return (jsx("div", Object.assign({ css: wrapper$5, className: "compact" }, { children: jsx("div", Object.assign({ className: "inner" }, { children: info.map((item, index) => (jsxs("div", Object.assign({ className: "text" }, { children: [jsx(Tooltip, Object.assign({ title: item.label, placement: "top", PopperProps: { disablePortal: true }, arrow: true }, { children: jsx("a", Object.assign({ href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer" }, { children: item.id }), void 0) }), void 0), index < info.length - 1 && ","] }), item.id))) }), void 0) }), void 0));
};
const Expanded = ({ info, linkBase }) => {
    return (jsx("div", Object.assign({ css: wrapper$5, className: "expanded" }, { children: jsx("div", Object.assign({ className: "inner" }, { children: info.map((item) => (jsxs("div", Object.assign({ className: "text" }, { children: [jsx("a", Object.assign({ href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer" }, { children: item.id }), void 0), jsx("span", { children: item.label }, void 0)] }), item.id))) }), void 0) }), void 0));
};
const wrapper$5 = css `
  font-family: ${FONT_EN};
  font-size: 14px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: ${SIZE1};
  display: block;
  min-height: 40px;
  .inner {
    padding-top: 4px;
  }
  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
  }
  &.compact {
    width: ${WIDTH_COMPACT};
    //overflow: hidden;
    //text-overflow: ellipsis;
    .inner {
      display: flex;
      flex-wrap: wrap;
    }
    .text {
      margin-right: ${SIZE1};
    }
  }
  &.expanded {
    width: ${WIDTH_EXPANDED};
    .text {
      display: flex;
      flex-direction: column;
      + .text {
        margin-top: ${SIZE1};
      }
    }
  }
`;

const MediaRow = ({ medium, organisms, components }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs("div", Object.assign({ css: wrapper$4 }, { children: [jsx(InfoCell, { info: [medium], expanded: isMediaExpanded, linkBase: PATH_MEDIUM }, void 0), jsx(InfoCell, { info: organisms, expanded: isOrganismsExpanded, linkBase: PATH_ORGANISM }, void 0), components.map((component) => (jsx$1(AlignmentCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: spacer$1 }, void 0)] }), void 0));
};
const wrapper$4 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const spacer$1 = css `
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;

const makeAlignmentData = (data, footerComponents) => {
    return data.media.map((medium) => makeMediaRowProp(medium, data.organisms, data.components, footerComponents));
};
const makeMediaRowProp = (mediumData, organismsData, componentsData, footerList) => {
    const medium = {
        id: mediumData.gm_id,
        label: mediumData.name,
    };
    const organisms = mediumData.organisms.map((taxid) => organismsData
        .filter((organism) => organism.tax_id === taxid)
        .map((organism) => ({ id: organism.tax_id, label: organism.name }))[0]);
    const components = footerList.map((data) => {
        return {
            id: data.id,
            label: data.label,
            state: findComponentState(data.id, mediumData.components, componentsData, footerList),
        };
    });
    return {
        medium,
        organisms,
        components,
    };
};
const findComponentState = (id, mediumComponents, allComponents, footerList) => {
    var _a;
    if (mediumComponents.find((candidate) => candidate === id)) {
        return "available";
    }
    const groupedId = listChildComponents(id, allComponents).find((child) => mediumComponents.find((candidate) => candidate === child));
    if (groupedId) {
        const isOpen = ((_a = footerList.find((item) => item.id === id)) === null || _a === void 0 ? void 0 : _a.isOpen) === true;
        return isOpen ? "grouped" : "available";
    }
    return "none";
};
const listChildComponents = (id, components) => {
    const result = [];
    const addItem = (parentId) => {
        const children = components.filter((c) => c.parent === parentId).map((c) => c.gmo_id);
        result.push(...children);
        children.forEach((c) => addItem(c));
    };
    addItem(id);
    return result;
};

const makeComponentTree = (components) => {
    const items = components.map((item) => ({
        name: item.name,
        id: item.gmo_id,
        level: 0,
        parent: item.parent,
        children: [],
        isOpen: false,
        func: item.function,
    }));
    const result = items.filter((item) => !item.parent || item.parent === ROOT_COMPONENT);
    items.forEach((item) => (item.children = items.filter((filtering) => filtering.parent === item.id)));
    items.forEach((item) => (item.level = getItemLevel(item, items)));
    return result;
};
const getItemLevel = (item, items) => {
    let parent = item;
    let level = -1;
    do {
        level++;
        parent = items.find((found) => found.id === parent.parent);
    } while (parent);
    return level;
};

const makeFooterComponents = (data) => {
    const result = [];
    data.forEach((item) => {
        addToCollection(item, result);
    });
    return result;
};
const addToCollection = (data, collection) => {
    collection.push({
        label: data.name,
        level: data.level,
        hasChildren: data.children.length > 0,
        isOpen: data.isOpen,
        id: data.id,
    });
    if (data.isOpen) {
        data.children.forEach((item) => {
            addToCollection(item, collection);
        });
    }
};

const AlignmentTable = ({ data }) => {
    const [rowProps, setRowProps] = react.exports.useState([]);
    const componentTree = useComponentTreeState();
    const { setComponentTree } = useComponentTreeMutators();
    const [footerProps, setFooterProps] = react.exports.useState({ components: [] });
    react.exports.useEffect(() => {
        setComponentTree(makeComponentTree(data.components));
    }, [data]);
    react.exports.useEffect(() => {
        const components = makeFooterComponents(componentTree);
        setFooterProps({ components });
        setRowProps(makeAlignmentData(data, components));
    }, [componentTree]);
    return (jsxs("div", Object.assign({ css: wrapper$3 }, { children: [jsx(HeaderRow, {}, void 0), rowProps.map((props) => (jsx$1(MediaRow, Object.assign({}, props, { key: props.medium.id })))), jsx(FooterRow, Object.assign({}, footerProps), void 0)] }), void 0));
};
const wrapper$3 = css `
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  padding: 1px;
`;

const InfoColumns = ({ data, css, className }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    return (jsxs("div", Object.assign({ css: [wrapper$2, css], className: className }, { children: [jsxs("div", Object.assign({ css: header$1 }, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }, void 0), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }, void 0)] }), void 0), data.media.map((m) => {
                const organisms = m.organisms.map((taxid) => {
                    const organism = data.organisms.find((o) => o.tax_id === taxid);
                    const id = organism ? organism.tax_id : "";
                    const label = organism ? organism.name : "";
                    return { id, label };
                });
                return (jsx(MediaRow, { medium: { id: m.gm_id, label: m.name }, organisms: organisms, components: [] }, m.gm_id));
            }), jsxs("div", Object.assign({ css: spacerRow }, { children: [jsx("span", { css: spacer, className: isMediaExpanded ? "expanded" : "compact" }, void 0), jsx("span", { css: spacer, className: isOrganismsExpanded ? "expanded" : "compact" }, void 0)] }), void 0)] }), void 0));
};
const wrapper$2 = css `
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
  height: 100%;
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
`;
const header$1 = css `
  width: fit-content;
  display: flex;
  gap: 1px;
`;
const spacerRow = css `
  flex-grow: 1;
  gap: 1px;
  display: flex;
`;
const spacer = css `
  background-color: ${COLOR_WHITE};
  //flex-grow: 1;
  &.expanded {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;

const ScrollableTable = ({ data }) => {
    return (jsxs("div", Object.assign({ css: wrapper$1 }, { children: [jsx(HeaderRow, { css: header }, void 0), jsx(InfoColumns, { data: data, css: infoColumns }, void 0), jsx("div", Object.assign({ className: "inner" }, { children: jsx(AlignmentTable, { data: data }, void 0) }), void 0)] }), void 0));
};
const wrapper$1 = css `
  position: relative;
  overflow: hidden;
  background-color: ${COLOR_GRAY_LINE};
  & > .inner {
    overflow-x: auto;
  }
`;
const header = css `
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${COLOR_GRAY_LINE};
  background-color: ${COLOR_GRAY_LINE};
`;
const infoColumns = css `
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

const App = ({ gm_ids }) => {
    const [data, setData] = react.exports.useState();
    const [isLoading, setIsLoading] = react.exports.useState(true);
    react.exports.useEffect(() => {
        setData(undefined);
        setIsLoading(true);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield getData(API_MEDIA_ALIMENT, { gm_ids });
            setIsLoading(false);
            setData(response.body);
        }))();
    }, [gm_ids]);
    return jsx("div", Object.assign({ css: wrapper }, { children: data && jsx(ScrollableTable, { data: data }, void 0) }), void 0);
};
const wrapper = css `
  min-height: 100px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;
css ``;

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
        const gm_ids = stringToArray(this.params.gm_ids);
        ReactDOM.render(jsx(react.exports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, { gm_ids }), void 0) }, void 0) }, void 0) }, void 0), main);
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
	"@id": "gmdb-media-alignment-table",
	"stanza:label": "Media Alignment Table",
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
//# sourceMappingURL=gmdb-media-alignment-table.js.map
