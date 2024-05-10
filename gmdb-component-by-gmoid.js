import { _ as __awaiter, d as defineStanzaElement } from './stanza-be82c2ee.js';
import { C as COLOR_PRIMARY, j as jsx, a as jsxs, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-87464745.js';
import { c as css, g as getData, r as reactExports } from './getData-e69d262f.js';
import { n as newStyled } from './emotion-styled.browser.esm-90764b6a.js';
import { I as InfoId, a as InfoTitle, S as StandardParagraph, b as SubHeading, T as TagList, C as ColorButton, c as ColWrapper } from './styles-5c02f157.js';
import { W as WikipediaView, f as fetchWikipediaData } from './WikipediaView-55ee1bbb.js';
import { s as stanzaWrapper } from './common-cd178d45.js';
import { d as decodeHTMLEntities } from './string-4de5f4fa.js';
import { U as URL_API } from './variables-58f3d1be.js';

const StanzaView = ({ css, className, prefLabel, gmoId, altLabels, properties, roles, superClasses, subClasses, links, wikipediaData, }) => {
    return (jsx("div", { css: [stanzaView, css, stanzaWrapper], className: className, children: jsxs(ColWrapper, { children: [jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "GMO ID: " }), jsx("span", { children: gmoId })] }), jsx(InfoTitle, { children: decodeHTMLEntities(prefLabel) }), !!altLabels.length && (jsxs(StandardParagraph, { children: [altLabels.length === 1 ? "Alternative label" : "Alternative labels", ":", jsx("br", {}), altLabels.map((str, i, arr) => (jsx("span", { children: `${decodeHTMLEntities(str)}${addLastComma(i, arr)}` }, str)))] })), jsxs("div", { children: [!!properties.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: properties.length === 1 ? "Component type" : "Component types" }), jsx(StandardParagraph, { children: properties.map((item, i, arr) => (jsx("span", { children: `${item.label_en}${addLastComma(i, arr)}` }, i))) })] })), !!roles.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: roles.length === 1 ? "Role" : "Roles" }), jsx("ul", { children: roles.map((item, i) => (jsx("li", { children: item.label_en }, i))) })] })), !!superClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: superClasses.length === 1 ? "Super class" : "Super classes" }), jsx(LinkList, { children: superClasses.map((item, i) => (jsxs("li", { children: [jsx("a", { href: `/component/${item.gmo_id}`, children: item.gmo_id }), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!subClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: subClasses.length === 1 ? "Sub class" : "Sub classes" }), jsx(LinkList, { children: subClasses.map((item, i) => (jsxs("li", { children: [jsx("a", { href: `/component/${item.gmo_id}`, children: item.gmo_id }), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!links.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: links.length === 1 ? "External link" : "External links" }), jsx(TagList, { children: links.map((item, i) => (jsx(ColorButton, { href: item.uri, target: "_blank", rel: "noreferrer", children: item.label }, i))) })] }))] })] }), wikipediaData && jsx(WikipediaView, Object.assign({}, wikipediaData))] }) }));
};
const addLastComma = (index, arr) => {
    return index === arr.length - 1 ? "" : ", ";
};
const LinkList = newStyled.ul `
  li {
    display: flex;
    gap: 8px;
  }

  a {
    color: ${COLOR_PRIMARY};
  }
`;
const stanzaView = css ``;

const getLinkLabel = (link) => {
    switch (true) {
        case /pccompound\/.+/.test(link):
            return "PubChem";
        case /wikipedia/.test(link):
            return "Wikipedia";
        case /CHEBI/.test(link):
            return "ChEBI";
        case /SNOMEDCT/.test(link):
            return "SNOMED-CT";
        default:
            return null;
    }
};
const parseData = (body) => {
    return {
        prefLabel: body.pref_label,
        gmoId: body.id,
        altLabels: body.alt_labels_en,
        properties: body.properties,
        roles: body.roles,
        superClasses: body.super_classes,
        subClasses: body.sub_classes,
        links: body.links
            .filter((str) => !!getLinkLabel(str))
            .map((str) => ({
            label: getLinkLabel(str),
            uri: str,
        })),
    };
};
const getComponentData = (gmo_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apiName = "gmdb_component_by_gmoid";
    const result = yield getData(`${URL_API}${apiName}`, { gmo_id });
    if ((_a = result.body) === null || _a === void 0 ? void 0 : _a.id) {
        return parseData(result.body);
    }
    else {
        return undefined;
    }
});

const App = ({ gmo_id }) => {
    const [props, setProps] = reactExports.useState(null);
    reactExports.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getComponentData(gmo_id);
            if (!result)
                return;
            setProps(result);
            const wikipediaLink = result.links.find((item) => item.label === "Wikipedia");
            if (wikipediaLink) {
                const wikipediaData = yield fetchWikipediaData(wikipediaLink.uri);
                setProps(Object.assign(Object.assign({}, result), { wikipediaData }));
            }
        }))();
    }, [gmo_id]);
    return props ? jsx(StanzaView, Object.assign({}, props)) : jsx(Fragment, { children: "Loading..." });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gmo_id = this.params.gmo_id;
        return jsx(App, { stanzaElement: this.root, gmo_id: gmo_id });
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
	"@id": "gmdb-component-by-gmoid",
	"stanza:label": "Gmdb component by gmoid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Text",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-07",
	"stanza:updated": "2021-03-07",
	"stanza:parameter": [
	{
		"stanza:key": "gmo_id",
		"stanza:example": "GMO_001005",
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
//# sourceMappingURL=gmdb-component-by-gmoid.js.map
