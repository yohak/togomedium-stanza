import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-bd712360.js';
import { n as newStyled, C as COLOR_PRIMARY, j as jsx, b as jsxs, F as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-3b758372.js';
import { c as css, r as reactExports } from './index-56cafe6b.js';
import { R as Recoil_index_4 } from './recoil-b0ceac4c.js';
import { L as LineageList, p as parseLineage } from './LineageList-66985c0f.js';
import { s as stanzaWrapper, c as ColWrapper, I as InfoId, C as ColorButton, a as InfoTitle, S as StandardParagraph, b as SubHeading } from './common-b9bd53c8.js';
import { g as getData } from './getData-b32e78c1.js';
import { u as unescapeJsonString } from './string-e923d624.js';
import { U as URL_API } from './variables-0b8fac13.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-c6ca75b5.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import './types-3f4e9278.js';

const CapsuleList = ({ labels }) => (jsx(CapsuleListWrapper, { children: labels.map((label, index) => (jsx("li", { children: label }, index))) }));
const CapsuleListWrapper = newStyled.ul `
  display: flex;
  margin-top: 8px;
  margin-bottom: -8px;
  flex-wrap: wrap;

  li {
    border: 1px solid ${COLOR_PRIMARY};
    padding: 5px 10px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

const linkNCBI = "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=";
const linkTogoGenome = "http://togogenome.org/organism/";
const StanzaView = ({ css, className, taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials, }) => {
    return (jsx("div", Object.assign({ css: [stanzaView, css, stanzaWrapper], className: className }, { children: jsx(ColWrapper, { children: jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "Taxonomy ID: " }), jsx("span", { children: taxid }), jsxs("div", Object.assign({ className: "tag-list" }, { children: [jsx(ColorButton, Object.assign({ target: "_blank", href: `${linkNCBI}${taxid}`, rel: "noreferrer" }, { children: "NCBI" })), jsx(ColorButton, Object.assign({ target: "_blank", href: `${linkTogoGenome}${taxid}`, rel: "noreferrer" }, { children: "TogoGenome" }))] }))] }), jsx(InfoTitle, { children: scientificName }), authorityName && (jsxs(StandardParagraph, { children: ["Authority name:", jsx("br", {}), authorityName] })), jsxs("div", { children: [jsx(SubHeading, { children: "Lineage" }), jsx(LineageList, { lineage: lineage })] }), !!typeMaterials.length && (jsxs("div", { children: [jsx(SubHeading, { children: "Type strains" }), jsx(CapsuleList, { labels: typeMaterials })] })), !!otherTypeMaterials.length && (jsx("div", { children: otherTypeMaterials.map((mat, index) => (jsxs("div", { children: [jsxs(SubHeading, { children: ["Heterotypic synonyms: ", mat.key, " "] }), jsx(CapsuleList, { labels: mat.labels })] }, index))) }))] }) }) })));
};
const stanzaView = css ``;

const parseData = (body) => {
    const taxid = body.taxid.toString();
    const scientificName = body.scientific_name;
    const authorityName = unescapeJsonString(body.authority_name);
    const lineage = parseLineage(body.lineage);
    const typeMaterials = body.type_material.map((item) => item.label);
    const otherTypeMaterials = parseOtherTypeMaterial(body.other_type_material);
    return { taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials };
};
const parseOtherTypeMaterial = (data) => {
    return data
        .map((obj) => obj.name)
        .reduce((a, b) => {
        if (a.indexOf(b) < 0) {
            a.push(b);
        }
        return a;
    }, [])
        .map((key) => ({
        key,
        labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};
const getTaxonData = (tax_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apiName = "gmdb_organism_by_taxid";
    const result = yield getData(`${URL_API}${apiName}`, { tax_id });
    if ((_a = result.body) === null || _a === void 0 ? void 0 : _a.taxid) {
        return parseData(result.body);
    }
    else {
        return undefined;
    }
});

const App = ({ tax_id }) => {
    const [props, setProps] = reactExports.useState(undefined);
    reactExports.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getTaxonData(tax_id);
            if (!result)
                return;
            setProps(result);
        }))();
    }, [tax_id]);
    return props ? jsx(StanzaView, Object.assign({}, props)) : jsx(Fragment, { children: "Loading..." });
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
        const tax_id = this.params.tax_id;
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root, tax_id: tax_id }) }) })) }) }), main);
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
	"@id": "gmdb-taxon-by-taxid",
	"stanza:label": "Gmdb taxon by taxid",
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
		"stanza:key": "tax_id",
		"stanza:example": "1301",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
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
//# sourceMappingURL=gmdb-taxon-by-taxid.js.map
