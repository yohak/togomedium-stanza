import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { j as jsx, k as COLOR_PRIMARY_DARK, M as COLOR_GRAY_LINE, a as jsxs, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { c as css } from './getData-1a784a8c.js';
import { d as decodeHTMLEntities } from './string-4de5f4fa.js';
import { I as InfoId, a as InfoTitle, b as SubHeading } from './styles-d38511ab.js';
import { s as stanzaWrapper } from './common-6ed9df56.js';
import { g as getMedia } from './api-33f54179.js';
import './index-eb2c9901.js';
import './variables-58f3d1be.js';

const RecipeComment = ({ css, className, comment }) => {
    return (jsx("div", { css: [recipeComments, css], className: className, children: parseText(comment) }));
};
const recipeComments = css `
  margin: 4px 0;
`;
const parseText = (str) => {
    return decodeHTMLEntities(str.replace(/℃/g, "°C"));
};

const RecipeTable = ({ css, className, name, items, referenceId }) => {
    return (jsxs("div", { css: [recipeTable, css], className: className, children: [jsxs("div", { css: titleWrapper, children: [jsx("h4", { css: titleStyle, children: name }), referenceId && (jsxs("span", { children: ["(See also ", jsx("a", { href: `/medium/${referenceId}`, children: referenceId }), ")"] }))] }), jsxs("table", { css: tableStyle, children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", { className: "id", children: "GMO ID" }), jsx("th", { className: "name", children: "Component" }), jsx("th", { className: "name", children: "Original label" }), jsx("th", { className: "volume", children: "\u00A0" }), jsx("th", { className: "volume", children: "Amount" })] }) }), jsx("tbody", { children: items.map((item, index) => {
                            return (jsxs("tr", { children: [jsx("td", { className: "id", children: jsx("a", { href: `/component/${item.id}`, target: "_blank", rel: "noreferrer", children: item.id }) }), jsx("td", { className: "name", children: decodeHTMLEntities(item.componentLabel) }), jsx("td", { className: "name", children: jsx("span", { children: item.componentName.replace(/\(see.*\)/, "(see below)") }) }), jsxs("td", { className: "volume", children: [jsx("span", { children: item.concValue }), jsx("span", { children: item.concUnit })] }), jsxs("td", { className: "volume", children: [jsx("span", { children: item.volume }), jsx("span", { children: item.unit })] })] }, index));
                        }) })] })] }));
};
const recipeTable = css ``;
const titleWrapper = css `
  margin-top: 16px;
  display: flex;
  gap: 16px;
  span {
    padding-top: 2px;
  }
  a {
    color: ${COLOR_PRIMARY_DARK};
  }
`;
const titleStyle = css `
  font-size: 18px;
`;
const tableStyle = css `
  width: 100%;
  border-collapse: collapse;
  margin: 4px 0 16px;
  border: 1px solid ${COLOR_GRAY_LINE};
  a {
    color: ${COLOR_PRIMARY_DARK};
  }
  th,
  td {
    border: 1px solid ${COLOR_GRAY_LINE};
    padding: 8px;
    text-align: left;
  }
  tbody {
    tr:nth-of-type(odd) {
      background-color: #f2f2f2;
    }
  }
  .id {
    width: 10%;
    white-space: nowrap;
  }
  .name {
    width: 35%;
  }
  .volume {
    width: 10%;
    white-space: nowrap;
    span {
      display: inline-block;
      &:first-of-type {
        width: 60%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 4px;
      }
      &:last-of-type {
        width: 40%;
      }
    }
  }
`;

const StanzaView = ({ css, className, id, originalId, srcUrl, srcLabel, name, ph, components, extraComponents, }) => {
    return (jsxs("div", { css: [stanzaView, css, stanzaWrapper], className: className, children: [jsxs(InfoId, { children: [jsx("span", { children: "Growth Medium ID:\u00A0" }), jsx("span", { children: id })] }), srcUrl && (jsxs(InfoId, { children: [jsx("span", { children: "Information source:\u00A0" }), jsx("a", { href: srcUrl, target: "_blank", rel: "noreferrer", children: originalId || srcLabel || id })] })), jsxs(InfoTitle, { children: ["[", id, "] ", name && name !== "(Unnamed medium)" && decodeHTMLEntities(name), ph && jsxs("small", { children: ["(pH", ph, ")"] })] }), components.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Components" }), components.map((component, index) => {
                        if ("comment" in component) {
                            return jsx(RecipeComment, Object.assign({}, component), index);
                        }
                        else {
                            return jsx(RecipeTable, Object.assign({}, component), index);
                        }
                    })] })), extraComponents.map((item, i) => {
                return (jsx("div", { children: item.components.map((component, index) => {
                        if (!component)
                            return jsx(Fragment, {});
                        if ("comment" in component) {
                            return jsx(RecipeComment, Object.assign({}, component), index);
                        }
                        else {
                            return jsx(RecipeTable, Object.assign({}, component, { referenceId: item.id }), index);
                        }
                    }) }, i));
            })] }));
};
const stanzaView = css ``;

const useMediaDataQuery = (gm_id) => {
    const { data, isLoading } = useQuery({
        queryKey: [{ gm_id }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () { return getMedia(gm_id); }),
        staleTime: Infinity,
        enabled: gm_id !== undefined,
    });
    return { mediaData: data, isLoading };
};
const App = ({ gm_id }) => {
    const { mediaData, isLoading } = useMediaDataQuery(gm_id);
    if (isLoading || !mediaData)
        return jsx(Fragment, { children: "Loading..." });
    return jsx(StanzaView, Object.assign({}, mediaData));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gm_id = this.params.gm_id;
        return jsx(App, { gm_id: gm_id });
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
	"@id": "gmdb-medium-by-gmid",
	"stanza:label": "Gmdb Medium By Gmid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-05",
	"stanza:updated": "2021-03-05",
	"stanza:parameter": [
	{
		"stanza:key": "gm_id",
		"stanza:example": "NBRC_M249",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
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
]
};

var templates = [
  
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-medium-by-gmid.js.map
