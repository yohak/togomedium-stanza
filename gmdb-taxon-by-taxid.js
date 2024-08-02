import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { C as COLOR_PRIMARY, j as jsx, a as jsxs, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { n as newStyled, u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { c as css, g as getData } from './getData-1a784a8c.js';
import { L as LineageList, p as parseLineage } from './LineageList-fbb41795.js';
import { I as InfoId, C as ColorButton, a as InfoTitle, S as StandardParagraph, b as SubHeading, c as ColWrapper } from './styles-d38511ab.js';
import { W as WikipediaView, f as fetchWikipediaData } from './WikipediaView-44529b85.js';
import { s as stanzaWrapper } from './common-6ed9df56.js';
import { u as unescapeJsonString } from './string-4de5f4fa.js';
import { U as URL_API } from './variables-58f3d1be.js';
import './types-8994330c.js';

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
const StanzaView = ({ css, className, taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials, wikipediaData, }) => {
    return (jsx("div", { css: [stanzaView, css, stanzaWrapper], className: className, children: jsxs(ColWrapper, { children: [jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "Taxonomy ID: " }), jsx("span", { children: taxid }), jsxs("div", { className: "tag-list", children: [jsx(ColorButton, { target: "_blank", href: `${linkNCBI}${taxid}`, rel: "noreferrer", children: "NCBI" }), jsx(ColorButton, { target: "_blank", href: `${linkTogoGenome}${taxid}`, rel: "noreferrer", children: "TogoGenome" })] })] }), jsx(InfoTitle, { children: scientificName }), authorityName && (jsxs(StandardParagraph, { children: ["Authority name:", jsx("br", {}), authorityName] })), jsxs("div", { children: [jsx(SubHeading, { children: "Lineage" }), jsx(LineageList, { lineage: lineage })] }), !!typeMaterials.length && (jsxs("div", { children: [jsx(SubHeading, { children: "Type strains" }), jsx(CapsuleList, { labels: typeMaterials })] })), !!otherTypeMaterials.length && (jsx("div", { children: otherTypeMaterials.map((mat, index) => (jsxs("div", { children: [jsxs(SubHeading, { children: ["Heterotypic synonyms: ", mat.key, " "] }), jsx(CapsuleList, { labels: mat.labels })] }, index))) }))] }), (wikipediaData === null || wikipediaData === void 0 ? void 0 : wikipediaData.description) && !lineage.species && jsx(WikipediaView, Object.assign({}, wikipediaData))] }) }));
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
    const apiName = "gmdb_organism_by_taxid";
    const result = yield getData(`${URL_API}${apiName}`, { tax_id });
    if (!result.body) {
        throw new Error("No data found");
    }
    return parseData(result.body);
});

const useTaxonDataQuery = (tax_id) => {
    const { data, isLoading } = useQuery({
        queryKey: [{ tax_id }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () { return getTaxonData(tax_id); }),
        staleTime: Infinity,
    });
    return { taxonData: data, isLoading };
};
const useWikipediaQuery = (scientificName) => {
    const wikipediaLink = `https://en.wikipedia.org/wiki/${scientificName}`;
    const { data } = useQuery({
        queryKey: ["wikipedia", scientificName],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () { return yield fetchWikipediaData(wikipediaLink); }),
        staleTime: Infinity,
        enabled: scientificName !== undefined,
    });
    return data;
};
const App = ({ tax_id }) => {
    const { taxonData, isLoading } = useTaxonDataQuery(tax_id);
    const wikipediaData = useWikipediaQuery(taxonData === null || taxonData === void 0 ? void 0 : taxonData.scientificName);
    if (isLoading || !taxonData)
        return jsx(Fragment, { children: "Loading..." });
    return jsx(StanzaView, Object.assign({}, taxonData, { wikipediaData: wikipediaData }));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const tax_id = this.params.tax_id;
        return jsx(App, { stanzaElement: this.root, tax_id: tax_id });
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
