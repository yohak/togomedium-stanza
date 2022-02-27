import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { g as getData } from './getData-d291c717.js';
import { i as importWebFontForTogoMedium } from './stanza-4b95c663.js';
import { u as unescapeJsonString, c as capitalizeFirstLetter } from './string-ad764b4c.js';
import { A as API_GROWTH_MEDIUM } from './variables-a0dc13d9.js';
import './index-6aec0cc7.js';

class GmdbOrganismByTaxid extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            if (!params.tax_id) {
                return;
            }
            const apiName = "gmdb_organism_by_taxid";
            const result = yield getData(`${API_GROWTH_MEDIUM}${apiName}`, {
                tax_id: params.tax_id,
            });
            const parameters = parseData(result);
            const template = "stanza.html.hbs";
            this.renderTemplate({ template, parameters });
            importWebFontForTogoMedium(this);
        });
    }
}
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => ({
    taxid: body.taxid,
    scientific_name: body.scientific_name,
    authority_name: unescapeJsonString(body.authority_name),
    lineage: parseLineage(body.lineage),
    type_material: body.type_material,
    other_type_material: parseOtherTypeMaterial(body.other_type_material),
});
const parseLineage = (lineages) => {
    return lineages.map((item) => (Object.assign(Object.assign({}, item), { rank: capitalizeFirstLetter(item.rank) })));
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
const __TEST__ = { parseOtherTypeMaterial };

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbOrganismByTaxid,
  __TEST__: __TEST__
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-organism-by-taxid",
	"stanza:label": "Gmdb organism by taxid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-06",
	"stanza:updated": "2021-03-06",
	"stanza:parameter": [
	{
		"stanza:key": "tax_id",
		"stanza:example": "315405",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:about-link-placement": "bottom-right",
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
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"msg") || (depth0 != null ? lookupProperty(depth0,"msg") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"msg","hash":{},"data":data,"loc":{"start":{"line":4,"column":7},"end":{"line":4,"column":14}}}) : helper)))
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"tax-id\">\n      <span class=\"key\">Taxonomy ID: </span>\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":10,"column":26},"end":{"line":10,"column":35}}}) : helper)))
    + "</span>\n      <span class=\"links\">\n        <a class=\"link-btn\" target=\"_blank\"\n           href=\"https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id="
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":13,"column":87},"end":{"line":13,"column":96}}}) : helper)))
    + "\">NCBI</a>\n        <a class=\"link-btn\" target=\"_blank\" href=\"http://togogenome.org/organism/"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":14,"column":81},"end":{"line":14,"column":90}}}) : helper)))
    + "\">TogoGenome</a>\n      </span>\n\n    </p>\n    <p class=\"name\">\n      <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"scientific_name") || (depth0 != null ? lookupProperty(depth0,"scientific_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scientific_name","hash":{},"data":data,"loc":{"start":{"line":19,"column":26},"end":{"line":19,"column":45}}}) : helper)))
    + "</span>\n    </p>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"authority_name") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":4},"end":{"line":24,"column":11}}})) != null ? stack1 : "")
    + "\n    <h3>Lineage</h3>\n    <ul class=\"lineage-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"lineage") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":6},"end":{"line":35,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"type_material") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":4},"end":{"line":45,"column":11}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"other_type_material") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":4},"end":{"line":59,"column":11}}})) != null ? stack1 : "")
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <p class=\"authority-name\">Authority name:<br>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"authority_name") || (depth0 != null ? lookupProperty(depth0,"authority_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"authority_name","hash":{},"data":data,"loc":{"start":{"line":23,"column":51},"end":{"line":23,"column":69}}}) : helper)))
    + "</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li class=\"list-group-item\">\n          <span class=\"rank\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"rank") || (depth0 != null ? lookupProperty(depth0,"rank") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data,"loc":{"start":{"line":30,"column":29},"end":{"line":30,"column":37}}}) : helper)))
    + "</span>\n          <span class=\"label\">\n            <a href=\"/taxon/"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":32,"column":28},"end":{"line":32,"column":37}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":32,"column":39},"end":{"line":32,"column":48}}}) : helper)))
    + "</a>\n          </span>\n        </li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <h3>Type strains</h3>\n      <ul class=\"capsule-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"type_material") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":8},"end":{"line":43,"column":17}}})) != null ? stack1 : "")
    + "      </ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":42,"column":14},"end":{"line":42,"column":23}}}) : helper)))
    + "</li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"other_type_material") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":6},"end":{"line":58,"column":15}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h3>Heterotypic synonyms: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (depth0 != null ? lookupProperty(depth0,"key") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":49,"column":34},"end":{"line":49,"column":41}}}) : helper)))
    + "</h3>\n        <div class=\"synonyms\">\n          <h4>Type strains</h4>\n          <ul class=\"capsule-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"labels") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":12},"end":{"line":55,"column":21}}})) != null ? stack1 : "")
    + "          </ul>\n        </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "              <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":5,"column":9}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":61,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-organism-by-taxid.js.map
