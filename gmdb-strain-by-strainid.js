import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-311696ff.js';
import { j as jsx, b as jsxs, F as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-53d8142c.js';
import { c as css, r as reactExports } from './index-8d82cef7.js';
import { R as Recoil_index_4 } from './recoil-14beaca9.js';
import { L as LineageList } from './LineageList-430b69cd.js';
import { s as stanzaWrapper, c as ColWrapper, I as InfoId, a as InfoTitle, b as SubHeading, T as TagList, C as ColorButton } from './common-413406e9.js';
import { g as getData } from './getData-9618d463.js';
import { U as URL_API } from './variables-0b8fac13.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-b3d5a276.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import './types-3f4e9278.js';
import './string-77fa4d93.js';

const StanzaView = ({ css, className, strainId, strainName, infoSources, taxonomy, }) => {
    return (jsx("div", Object.assign({ css: [stanzaView, css, stanzaWrapper], className: className }, { children: jsx(ColWrapper, { children: jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "Strain Id: " }), jsx("span", { children: strainId })] }), jsx(InfoTitle, { children: strainName }), jsx(SubHeading, { children: "Source strains" }), jsx(TagList, { children: infoSources.map((source, index) => (jsx(ColorButton, Object.assign({ href: source.url, target: "_blank", rel: "noreferrer" }, { children: source.label }), index))) }), taxonomy && (jsxs("div", { children: [jsx(SubHeading, { children: "Taxonomic Lineage" }), jsx(LineageList, { lineage: taxonomy.lineage })] }))] }) }) })));
};
const stanzaView = css ``;

const parseData = (body) => {
    const strainId = body.strain.strain_id;
    const strainName = body.strain.strain_name;
    const infoSources = body.strain.other_strain_id_list.map((item) => ({
        url: item.other_strain_link,
        label: item.other_strain_id,
    }));
    const taxonomy = body.taxonomy
        ? {
            name: body.taxonomy.scientific_name,
            taxId: body.taxonomy.taxid.toString(),
            rank: body.taxonomy.rank,
            authorityName: body.taxonomy.authority_name,
            lineage: body.taxonomy.lineage.reduce((accum, current) => {
                return Object.assign(Object.assign({}, accum), { [current.rank]: {
                        taxid: current.taxid.toString(),
                        label: current.label,
                    } });
            }, {}),
        }
        : null;
    return {
        strainId,
        strainName,
        infoSources,
        taxonomy,
    };
};
const getStrainData = (strain_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apiName = "gmdb_strain_by_strainid";
    const result = yield getData(`${URL_API}${apiName}`, { strain_id });
    if ((_a = result.body) === null || _a === void 0 ? void 0 : _a.strain) {
        return parseData(result.body);
    }
    else {
        return undefined;
    }
});

const App = ({ strain_id }) => {
    const [props, setProps] = reactExports.useState(undefined);
    reactExports.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield getStrainData(strain_id);
            if (!result)
                return;
            setProps(result);
        }))();
    }, [strain_id]);
    return props ? jsx(StanzaView, Object.assign({}, props)) : jsx(Fragment, {});
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
        const strain_id = this.params.strain_id;
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root, strain_id: strain_id }) }) })) }) }), main);
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
	"@id": "gmdb-strain-by-strainid",
	"stanza:label": "Gmdb strain by strainid",
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
		"stanza:key": "strain_id",
		"stanza:example": "S6357",
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
//# sourceMappingURL=gmdb-strain-by-strainid.js.map
