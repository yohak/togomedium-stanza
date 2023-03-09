import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-bd712360.js';
import { C as COLOR_WHITE, a as COLOR_TEXT, n as newStyled, b as COLOR_PRIMARY, c as COLOR_GRAY300, j as jsx, d as jsxs, F as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-d698af90.js';
import { c as css, r as reactExports } from './index-56cafe6b.js';
import { R as Recoil_index_4 } from './recoil-5e1988ac.js';
import { d as decodeHTMLEntities } from './string-a3c2e0f8.js';
import { g as getData } from './getData-b32e78c1.js';
import { U as URL_API } from './variables-0b8fac13.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-ace01225.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';

const stanzaWrapper = css `
  position: relative;
  font-size: 16px;
  //font-family: $web-font, sans-serif;
  padding: 16px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${COLOR_TEXT};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const StanzaView = ({ css, className, prefLabel, gmoId, altLabels, properties, roles, superClasses, subClasses, links, wikipediaData, }) => {
    return (jsx("div", Object.assign({ css: [stanzaView, css, stanzaWrapper], className: className }, { children: jsxs(ColWrapper, { children: [jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "GMO ID: " }), jsx("span", { children: gmoId })] }), jsx(InfoTitle, { children: decodeHTMLEntities(prefLabel) }), !!altLabels.length && (jsxs(StandardParagraph, { children: ["Alternative labels:", jsx("br", {}), altLabels.map((str, i, arr) => (jsx("span", { children: `${decodeHTMLEntities(str)}${addLastComma(i, arr)}` }, str)))] })), jsxs("div", { children: [!!properties.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Component types" }), jsx(StandardParagraph, { children: properties.map((item, i, arr) => (jsx("span", { children: `${item.label_en}${addLastComma(i, arr)}` }, i))) })] })), !!roles.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Roles" }), jsx("ul", { children: roles.map((item, i) => (jsx("li", { children: item.label_en }, i))) })] })), !!superClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Super classes" }), jsx(LinkList, { children: superClasses.map((item, i) => (jsxs("li", { children: [jsx("a", Object.assign({ href: `/component/${item.gmo_id}` }, { children: item.gmo_id })), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!subClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Sub classes" }), jsx(LinkList, { children: subClasses.map((item, i) => (jsxs("li", { children: [jsx("a", Object.assign({ href: `/component/${item.gmo_id}` }, { children: item.gmo_id })), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!links.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Cross references" }), jsx(TagList, { children: links.map((item, i) => (jsx(ColorButton, Object.assign({ href: item.uri, target: "_blank", rel: "noreferrer" }, { children: item.label }), i))) })] }))] })] }), wikipediaData && (jsxs(WikipediaInfo, { children: [jsxs("p", { children: [wikipediaData.thumb && jsx("img", { src: wikipediaData.thumb }), wikipediaData.description] }), jsx("cite", { children: jsx("a", Object.assign({ href: wikipediaData.link, target: "_blank", rel: "noreferrer" }, { children: "From Wikipedia" })) })] }))] }) })));
};
const addLastComma = (index, arr) => {
    return index === arr.length - 1 ? "" : ", ";
};
const ColWrapper = newStyled.div `
  display: flex;
  justify-content: space-between;
`;
const InfoId = newStyled.p `
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;
const InfoTitle = newStyled.h1 `
  font-size: 40px;
  margin: 24px 0 16px;
  font-weight: 300;
  line-height: 0.9;
`;
const SubHeading = newStyled.h3 `
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 20px;
`;
const StandardParagraph = newStyled.p `
  font-size: 16px;
  font-weight: 300;
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;
const ColorButton = newStyled.a `
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 4px 8px 2px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;
const LinkList = newStyled.ul `
  li {
    display: flex;
    gap: 8px;
  }

  a {
    color: ${COLOR_PRIMARY};
  }
`;
const TagList = newStyled.div `
  display: flex;
  gap: 8px;
`;
const WikipediaInfo = newStyled.div `
  margin-top: 32px;
  width: 336px;
  border: 1px ${COLOR_GRAY300} dashed;
  padding: 8px;
  border-radius: 5px;
  height: fit-content;
  cite {
    display: block;
    text-align: right;
    margin-top: 8px;
    a {
      color: ${COLOR_PRIMARY};
    }
  }
`;
const stanzaView = css ``;

const getLinkLabel = (link) => {
    switch (true) {
        case /pccompound/.test(link):
            return "PubChem";
        case /wikipedia/.test(link):
            return "Wikipedia";
        case /ncicb/.test(link):
            return "NCI Thesaurus";
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
    const [props, setProps] = reactExports.useState(makeEmptyProps());
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
    return jsx(StanzaView, Object.assign({}, props));
};
const makeEmptyProps = () => ({
    prefLabel: "",
    gmoId: "",
    altLabels: [],
    properties: [],
    roles: [],
    superClasses: [],
    subClasses: [],
    links: [],
});
const fetchWikipediaData = (link) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const key = link.split("/").pop();
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
    const res = yield fetch(url);
    const data = yield res.json();
    if (!data)
        return { link };
    return { thumb: (_a = data.thumbnail) === null || _a === void 0 ? void 0 : _a.source, description: data.extract, link };
});

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
        const gmo_id = this.params.gmo_id;
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root, gmo_id: gmo_id }) }) })) }) }), main);
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
