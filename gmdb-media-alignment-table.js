import { _ as __awaiter, d as defineStanzaElement } from './stanza-be82c2ee.js';
import { R as Recoil_index_6, f as Recoil_index_18, g as Recoil_index_22, d as COLOR_WHITE, S as SIZE1, B as SIZE4, z as SIZE3, j as jsx, a as jsxs, A as COLOR_GRAY700, C as COLOR_PRIMARY, M as COLOR_GRAY, N as FONT_EN, F as Fragment, x as COLOR_GRAY_LINE, T as TogoMediumReactStanza } from './StanzaReactProvider-13f58d86.js';
import { c as css, j as jsx$1, r as reactExports, g as getData } from './getData-e69d262f.js';
import { b as IconCompact, c as IconExpand, I as IconBlank } from './icons-af742fc0.js';
import { d as decodeHTMLEntities, s as stringToArray } from './string-878ee74c.js';
import { c as clone } from './clone-1fb93465.js';
import { e as PATH_COMPONENT, P as PATH_MEDIUM, b as PATH_TAXON } from './consts-c8281bfe.js';
import { n as Tooltip, K as API_MEDIA_ALIGNMENT } from './paths-ee59fa78.js';
import './emotion-styled.browser.esm-90764b6a.js';
import './variables-42acbc42.js';

const WIDTH_EXPANDED = "200px";
const WIDTH_COMPACT = "150px";
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
    const Icon = hasChildren ? (isOpen ? (jsx(IconCompact, { css: icon$1, onClick: () => onClickFooterItem(id) })) : (jsx(IconExpand, { css: icon$1, onClick: () => onClickFooterItem(id) }))) : (jsx(IconBlank, { css: icon$1 }));
    return (jsxs("div", { css: wrapper$a, children: [new Array(level).fill(null).map((r, index) => (jsx("span", { className: "spacer" }, index))), Icon, jsx("span", { className: "text", children: decodeHTMLEntities(label) })] }));
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
    return (jsxs("div", { css: wrapper$9, children: [jsx("div", { css: infoSpacer, className: isMediaExpanded ? "expand" : "compact" }), jsx("div", { css: infoSpacer, className: isOrganismsExpanded ? "expand" : "compact" }), components.map((component) => (jsx$1(FooterCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: componentSpacer })] }));
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
    return (jsxs("div", { css: wrapper$8, className: isExpanded ? "expanded" : "compact", children: [jsx("span", { children: label }), isExpanded ? (jsx(IconCompact, { css: icon, onClick: onClickIcon })) : (jsx(IconExpand, { css: icon, onClick: onClickIcon }))] }));
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
    return (jsxs("div", { css: [wrapper$7, css], className: className, children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }), jsx("div", { css: components, children: "Components" })] }));
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
    return (jsx("div", { css: wrapper$6, children: jsx(Tooltip, { title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true, children: jsx("a", { href: `${PATH_COMPONENT}${id}`, target: "_blank", className: `icon-${state} icon`, rel: "noreferrer", children: jsx("span", {}) }) }) }));
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

const InfoCell = ({ info, linkBase, expanded, priority = [] }) => {
    return expanded ? (jsx(Expanded, { info: sortInfo(info, priority), linkBase, priority })) : (jsx(Compact, { info: sortInfo(info, priority), linkBase, priority }));
};
const sortInfo = (info, priority) => {
    return [
        ...priority.map((id) => info.find((item) => item.id === id)).filter((item) => !!item),
        ...info.filter((item) => !priority.includes(item.id)),
    ];
};
const Compact = ({ info, linkBase, priority = [] }) => {
    const [items, setItems] = reactExports.useState([]);
    const [restText, setRestText] = reactExports.useState("");
    reactExports.useEffect(() => {
        const myPriorityItems = info
            .map((item) => item.id)
            .filter((str) => priority.includes(str));
        setItems(myPriorityItems.length ? info.filter((item) => priority.includes(item.id)) : [info[0]]);
        const remain = myPriorityItems.length ? info.length - myPriorityItems.length : info.length - 1;
        switch (remain) {
            case 0:
                break;
            case 1:
                setRestText(` + ${remain} organism`);
                break;
            default:
                setRestText(` + ${remain} organisms`);
        }
    }, [info]);
    return (jsx("div", { css: wrapper$5, className: "compact", children: jsx("div", { className: "inner", children: jsxs("div", { className: "text", children: [items.map((item, index) => (jsxs("span", { children: [item.id ? (jsx(Tooltip, { title: item.label, placement: "top", PopperProps: { disablePortal: true }, arrow: true, children: jsx("a", { href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer", children: item.id }) })) : (jsx(Fragment, { children: item.label })), index < items.length - 1 ? ", " : ""] }, index))), jsx("span", { style: { whiteSpace: "nowrap" }, children: restText })] }) }) }));
};
const Expanded = ({ info, linkBase, priority = [] }) => {
    return (jsx("div", { css: wrapper$5, className: "expanded", children: jsx("div", { className: "inner", children: [
                ...info.filter((item) => priority.includes(item.id)),
                ...info.filter((item) => !priority.includes(item.id)),
            ].map((item) => (jsxs("div", { className: "text", children: [jsx("a", { href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer", children: item.id }), jsx("span", { children: item.label })] }, item.id))) }) }));
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

const MediaRow = ({ medium, organisms, components, prioritizedOrganism = [], }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs("div", { css: wrapper$4, children: [jsx(InfoCell, { info: [medium], expanded: isMediaExpanded, linkBase: PATH_MEDIUM }), jsx(InfoCell, { info: organisms.length ? organisms : [{ id: "", label: "No organisms found" }], expanded: isOrganismsExpanded, linkBase: PATH_TAXON, priority: prioritizedOrganism }), components.map((component) => (jsx$1(AlignmentCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: spacer$1 })] }));
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

const AlignmentTable = ({ data, prioritizedOrganism }) => {
    const [rowProps, setRowProps] = reactExports.useState([]);
    const componentTree = useComponentTreeState();
    const { setComponentTree } = useComponentTreeMutators();
    const [footerProps, setFooterProps] = reactExports.useState({ components: [] });
    reactExports.useEffect(() => {
        setComponentTree(makeComponentTree(data.components));
    }, [data]);
    reactExports.useEffect(() => {
        const components = makeFooterComponents(componentTree);
        setFooterProps({ components });
        setRowProps(makeAlignmentData(data, components));
    }, [componentTree]);
    return (jsxs("div", { css: wrapper$3, children: [jsx(HeaderRow, {}), rowProps.map((props) => (jsx$1(MediaRow, Object.assign({}, props, { key: props.medium.id, prioritizedOrganism: prioritizedOrganism })))), jsx(FooterRow, Object.assign({}, footerProps))] }));
};
const wrapper$3 = css `
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  padding: 1px;
`;

const InfoColumns = ({ data, css, className, prioritizedOrganism = [] }) => {
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
    return (jsxs("div", { css: [wrapper$2, css], className: className, children: [jsxs("div", { css: header$1, children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon })] }), data.media.map((m) => {
                const organisms = m.organisms.map((taxid) => {
                    const organism = data.organisms.find((o) => o.tax_id === taxid);
                    const id = organism ? organism.tax_id : "";
                    const label = organism ? organism.name : "";
                    return { id, label };
                });
                return (jsx(MediaRow, { medium: { id: m.gm_id, label: m.name }, organisms: organisms, components: [], prioritizedOrganism: prioritizedOrganism }, m.gm_id));
            }), jsxs("div", { css: spacerRow, children: [jsx("span", { css: spacer, className: isMediaExpanded ? "expanded" : "compact" }), jsx("span", { css: spacer, className: isOrganismsExpanded ? "expanded" : "compact" })] })] }));
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

const ScrollableTable = ({ data, prioritizedOrganism = [] }) => {
    return (jsxs("div", { css: wrapper$1, children: [jsx(HeaderRow, { css: header }), jsx(InfoColumns, { data: data, prioritizedOrganism: prioritizedOrganism, css: infoColumns }), jsx("div", { className: "inner", children: jsx(AlignmentTable, { data: data, prioritizedOrganism: prioritizedOrganism }) })] }));
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

const App = ({ gm_ids, stanzaElement, prioritizedOrganism = [] }) => {
    const [data, setData] = reactExports.useState();
    const [isLoading, setIsLoading] = reactExports.useState(true);
    const dispatchLoadData = (detail) => {
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_ON_LOAD_DATA", { bubbles: true, composed: true, detail }));
    };
    const dispatchOnQueryData = (detail) => {
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_ON_QUERY_DATA", { bubbles: true, composed: true, detail }));
    };
    reactExports.useEffect(() => {
        setData(undefined);
        setIsLoading(true);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            dispatchOnQueryData(gm_ids);
            const response = yield getData(API_MEDIA_ALIGNMENT, { gm_ids });
            setIsLoading(false);
            setData(response.body);
            dispatchLoadData(response.body);
        }))();
    }, [gm_ids]);
    return (jsx("div", { css: wrapper, children: data && jsx(ScrollableTable, { data: data, prioritizedOrganism: prioritizedOrganism }) }));
};
const wrapper = css `
  min-height: 100px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  padding: ${SIZE1};
`;

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gm_ids = stringToArray(this.params.gm_ids);
        const prioritizedOrganism = this.params.prioritized_tax_ids
            ? stringToArray(this.params.prioritized_tax_ids)
            : [];
        return jsx(App, { gm_ids, stanzaElement: this.root, prioritizedOrganism });
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
	},
	{
		"stanza:key": "prioritized_tax_ids",
		"stanza:type": "string",
		"stanza:example": "123456,12345",
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
//# sourceMappingURL=gmdb-media-alignment-table.js.map
