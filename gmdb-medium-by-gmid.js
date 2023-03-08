import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-bd712360.js';
import { g as getData } from './getData-b32e78c1.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import { U as URL_API } from './variables-0b8fac13.js';
import './index-56cafe6b.js';

class GmdbMediumByGmid extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            if (!params.gm_id) {
                return;
            }
            const apiName = "gmdb_medium_by_gmid";
            const result = yield getData(`${URL_API}${apiName}`, {
                gm_id: params.gm_id,
            });
            const parameters = parseData(result, params);
            const template = "stanza.html.hbs";
            this.renderTemplate({ template, parameters });
            importWebFontForTogoMedium(this);
        });
    }
}
const parseData = (data, params) => {
    var _a;
    switch (true) {
        case data.status !== 200:
            return makeErrorData(`Error ${data.status}<br />${data.message}`);
        case !((_a = data === null || data === void 0 ? void 0 : data.body) === null || _a === void 0 ? void 0 : _a.meta):
            return makeErrorData(`No Medium Found with ${params.gm_id}`);
        default:
            return makeSuccessData(data.body);
    }
};
const makeErrorData = (msg) => {
    return {
        id: undefined,
        original_id: undefined,
        name: undefined,
        src_url: undefined,
        src_label: undefined,
        ph: undefined,
        components: [],
        error: true,
        statusText: msg,
    };
};
const makeSuccessData = (body) => {
    return {
        id: body.meta.gm.split("/").pop(),
        original_id: body.meta.original_media_id,
        name: body.meta.name,
        src_label: getSrcLabel(body.meta.src_url),
        src_url: body.meta.src_url,
        ph: body.meta.ph,
        components: [
            ...processComponentTables(body.components),
            ...processComponentComments(body.comments),
        ].sort((a, b) => a.paragraph_index - b.paragraph_index),
    };
};
const processComponentTables = (tables) => {
    return tables.map((table) => (Object.assign(Object.assign({}, table), { items: table.items.map((item) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, item), { can_wrap_label: ((_a = item.label) === null || _a === void 0 ? void 0 : _a.length) >= 20, can_wrap_name: ((_b = item.component_name) === null || _b === void 0 ? void 0 : _b.length) >= 20, properties: item.properties.map((property) => (Object.assign(Object.assign({}, property), { displayLabel: getShortPropertyLabel(property.label) }))) }));
        }) })));
};
const processComponentComments = (comments) => {
    return comments.map((item) => (Object.assign(Object.assign({}, item), { comment: item.comment ? item.comment : "&nbsp;" })));
};
function getShortPropertyLabel(str) {
    const dic = {
        "Simple component": "Simple",
        "Complex component": "Complex",
        "Defined component": "Defined",
        "Undefined component": "Undefined",
        "Inorganic compound": "Inorganic",
        "Organic compound": "Organic",
        Solution: "Solution",
    };
    if (!dic[str]) {
        console.warn("no short property label found:", str);
    }
    return dic[str] ? dic[str] : "ERR";
}
const getSrcLabel = (str) => {
    switch (true) {
        case str.match(/jcm.*riken/) !== null:
            return "JCM";
        case str.match(/nite.*nbrc/) !== null:
            return "NBRC";
        case str.match(/dsmz\.de/) !== null:
            return "DSMZ";
        case str.match(/atcc\.org/) !== null:
            return "ATCC";
        default:
            return "SRC";
    }
};
const __TEST__ = { getSrcLabel };

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbMediumByGmid,
  __TEST__: __TEST__
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
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <p class=\"error\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"statusText") || (depth0 != null ? lookupProperty(depth0,"statusText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"statusText","hash":{},"data":data,"loc":{"start":{"line":4,"column":19},"end":{"line":4,"column":35}}}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <p class=\"gm-id\">\n  <span class=\"key\">Growth Medium ID: </span>\n  <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":10,"column":22},"end":{"line":10,"column":28}}}) : helper)))
    + "</span>\n  </p>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"src_url") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":2},"end":{"line":22,"column":9}}})) != null ? stack1 : "")
    + "  <p class=\"title\">\n  <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":24,"column":22},"end":{"line":24,"column":30}}}) : helper)))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"ph") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":2},"end":{"line":27,"column":9}}})) != null ? stack1 : "")
    + "  </p>\n  <div class=\"recipe\">\n  <h3>Components</h3>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"components") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":2},"end":{"line":68,"column":11}}})) != null ? stack1 : "")
    + "  </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <p class=\"gm-id\">\n    <span class=\"key\">Information source:</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"original_id") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":4},"end":{"line":17,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"original_id") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":20,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <span><a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src_url") || (depth0 != null ? lookupProperty(depth0,"src_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src_url","hash":{},"data":data,"loc":{"start":{"line":16,"column":54},"end":{"line":16,"column":65}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"original_id") || (depth0 != null ? lookupProperty(depth0,"original_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"original_id","hash":{},"data":data,"loc":{"start":{"line":16,"column":67},"end":{"line":16,"column":82}}}) : helper)))
    + "</a></span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <span><a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"src_url") || (depth0 != null ? lookupProperty(depth0,"src_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src_url","hash":{},"data":data,"loc":{"start":{"line":19,"column":54},"end":{"line":19,"column":65}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"src_label") || (depth0 != null ? lookupProperty(depth0,"src_label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src_label","hash":{},"data":data,"loc":{"start":{"line":19,"column":67},"end":{"line":19,"column":80}}}) : helper)))
    + "</a></span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <span class=\"ph\"> (pH"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"ph") || (depth0 != null ? lookupProperty(depth0,"ph") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"ph","hash":{},"data":data,"loc":{"start":{"line":26,"column":25},"end":{"line":26,"column":31}}}) : helper)))
    + ")</span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":4},"end":{"line":64,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"comment") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":4},"end":{"line":67,"column":11}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":6},"end":{"line":35,"column":13}}})) != null ? stack1 : "")
    + "      <table class=\"component-table\">\n        <tr>\n          <th class=\"id\">GMO ID</th>\n          <th class=\"name\">GMO Label</th>\n          <th class=\"name\">Component</th>\n          <th class=\"volume\"></th>\n          <th class=\"volume\"></th>\n        </tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":8},"end":{"line":62,"column":17}}})) != null ? stack1 : "")
    + "      </table>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h4>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"subcomponent_name") || (depth0 != null ? lookupProperty(depth0,"subcomponent_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"subcomponent_name","hash":{},"data":data,"loc":{"start":{"line":34,"column":12},"end":{"line":34,"column":33}}}) : helper)))
    + "</h4>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n            <td class=\"id\">\n              <a href=\"/component/"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":47,"column":34},"end":{"line":47,"column":44}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"gmo_id") || (depth0 != null ? lookupProperty(depth0,"gmo_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gmo_id","hash":{},"data":data,"loc":{"start":{"line":47,"column":46},"end":{"line":47,"column":56}}}) : helper)))
    + "</a>\n            </td>\n            <td class=\"name\">\n              <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_label") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":27},"end":{"line":50,"column":64}}})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":50,"column":66},"end":{"line":50,"column":77}}}) : helper))) != null ? stack1 : "")
    + "</span>\n            </td>\n            <td class=\"name\">\n              <span class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_wrap_name") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":27},"end":{"line":53,"column":63}}})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"component_name") || (depth0 != null ? lookupProperty(depth0,"component_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"component_name","hash":{},"data":data,"loc":{"start":{"line":53,"column":65},"end":{"line":53,"column":85}}}) : helper))) != null ? stack1 : "")
    + "</span>\n            </td>\n            <td class=\"volume\">\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"conc_value") || (depth0 != null ? lookupProperty(depth0,"conc_value") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"conc_value","hash":{},"data":data,"loc":{"start":{"line":56,"column":20},"end":{"line":56,"column":34}}}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"conc_unit") || (depth0 != null ? lookupProperty(depth0,"conc_unit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"conc_unit","hash":{},"data":data,"loc":{"start":{"line":56,"column":47},"end":{"line":56,"column":60}}}) : helper)))
    + "</span>\n            </td>\n            <td class=\"volume\">\n              <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"volume") || (depth0 != null ? lookupProperty(depth0,"volume") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data,"loc":{"start":{"line":59,"column":20},"end":{"line":59,"column":30}}}) : helper)))
    + "</span><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"unit") || (depth0 != null ? lookupProperty(depth0,"unit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unit","hash":{},"data":data,"loc":{"start":{"line":59,"column":43},"end":{"line":59,"column":51}}}) : helper)))
    + "</span>\n            </td>\n          </tr>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "can-wrap";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <p>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"comment") || (depth0 != null ? lookupProperty(depth0,"comment") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comment","hash":{},"data":data,"loc":{"start":{"line":66,"column":9},"end":{"line":66,"column":22}}}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":70,"column":11}}})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-medium-by-gmid.js.map
