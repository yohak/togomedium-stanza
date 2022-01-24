import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { m as makeFormBody } from './getData-f9032f11.js';
import { i as importWebFontForTogoMedium } from './stanza-4b95c663.js';
import './index-d49f0e1c.js';

class GmdbMetaList extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            if (!params.api_url) {
                return;
            }
            const offset = 0;
            const data = yield fetchData(params.api_url, offset, parseInt(params.limit, 10));
            const templateParams = processData(data, offset, params);
            render(this, templateParams, params);
        });
    }
}
const render = (stanza, parameters, stanzaParams) => {
    var _a, _b;
    const limit = parseInt(stanzaParams.limit, 10);
    stanza.renderTemplate({
        template: "stanza.html.hbs",
        parameters,
    });
    importWebFontForTogoMedium(stanza, stanzaParams.web_font);
    (_a = stanza.root.querySelector("#btnPrev")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield movePage(stanza, parameters, stanzaParams, limit, DIRECTION.PREV);
    }));
    (_b = stanza.root.querySelector("#btnNext")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield movePage(stanza, parameters, stanzaParams, limit, DIRECTION.NEXT);
    }));
};
const movePage = (stanza, templateParams, stanzaParams, limit, direction) => __awaiter(void 0, void 0, void 0, function* () {
    render(stanza, Object.assign(Object.assign({}, templateParams), { isLoading: true }), stanzaParams);
    const offset = templateParams.offset + limit * direction;
    const data = yield fetchData(stanzaParams.api_url, offset, limit);
    const params = processData(data, offset, stanzaParams);
    render(stanza, params, stanzaParams);
});
const processData = (response, offset, stanzaParams) => {
    switch (response.status) {
        case 200:
            return makeSuccessData(response, offset, stanzaParams);
        default:
            return makeFailParams(response, stanzaParams);
    }
};
const makeSuccessData = (response, offset, stanzaParams) => {
    var _a;
    if (response.body.contents.length === 0) {
        return makeNotFoundParams(stanzaParams);
    }
    const column_sizes = (_a = stanzaParams.column_sizes) === null || _a === void 0 ? void 0 : _a.split(",").map((str) => parseInt(str));
    const columns = response.body.columns.map((item, i) => ({
        label: item.label,
        size: column_sizes ? column_sizes[i] : undefined,
    }));
    const keys = response.body.columns.map((item) => item.key);
    const noWraps = {};
    response.body.columns.forEach((item) => (noWraps[item.key] = item.nowrap));
    const data = response.body.contents.map((item) => {
        const result = [];
        keys.forEach((key) => {
            let value;
            if (typeof item[key] === "string") {
                value = { label: item[key] };
            }
            else {
                value = item[key];
            }
            if (noWraps[key]) {
                value.nowrap = true;
            }
            result.push(value);
        });
        return result;
    });
    const total = response.body.total;
    const _end = parseInt(stanzaParams.limit, 10) + offset;
    const end = _end <= total ? _end : total;
    const hasPrev = offset !== 0;
    const hasNext = end < total;
    const title = stanzaParams.title;
    const info = hasNext || hasPrev
        ? `showing ${offset + 1} to ${end} of total ${total} items`
        : `total ${total} items`;
    const _columns = stanzaParams.column_names;
    const showColumnNames = _columns.toLocaleLowerCase() === "false" ? false : Boolean(stanzaParams.column_names);
    const isFixedTable = !!columns.find((item) => !!item.size);
    return {
        title,
        offset,
        columns,
        data,
        hasNext,
        hasPrev,
        info,
        showColumnNames,
        isFixedTable,
        status: 200,
        statusText: "",
    };
};
const makeNotFoundParams = (stanzaParams) => {
    return {
        title: stanzaParams.title,
        offset: 0,
        columns: undefined,
        data: undefined,
        hasNext: false,
        hasPrev: false,
        info: undefined,
        showColumnNames: false,
        isFixedTable: false,
        status: undefined,
        statusText: "NO RESULT FOUND",
    };
};
const makeFailParams = (response, stanzaParams) => {
    return {
        title: stanzaParams.title,
        offset: 0,
        columns: undefined,
        data: undefined,
        hasNext: false,
        hasPrev: false,
        info: undefined,
        showColumnNames: false,
        isFixedTable: false,
        status: response.status,
        statusText: response.status ? response.message : "UNKNOWN ERROR",
    };
};
const fetchData = (url, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return fetchLive(url, offset, limit);
});
const fetchLive = (url, offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [uri, query] = separateURL(url);
    const response = yield fetch(uri, makeOptions({ offset, limit }, query));
    if (response.status !== 200) {
        return {
            status: response.status,
            message: response.statusText,
            body: undefined,
        };
    }
    const body = yield response.json();
    return {
        status: 200,
        body,
    };
});
const makeOptions = (params, query) => {
    const body = `${filterQuery(query)}&${makeFormBody(params)}`;
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
};
const filterQuery = (query) => {
    if (!query) {
        return "";
    }
    let isOmitted = false;
    const result = query
        .split("&")
        .filter((str) => {
        const reg = /(.*)=(.*)/.exec(str);
        const [key, value] = [reg[1], reg[2]];
        switch (key) {
            case "limit":
            case "offset":
                isOmitted = true;
                return false;
            default:
                return true;
        }
    })
        .join("&");
    if (isOmitted) {
        console.warn("limit and offset on API_URL have been omitted as they are set from the Stanza");
    }
    return result;
};
const separateURL = (url) => {
    const separated = /(.*)\?(.*)/.exec(url);
    let uri, query;
    if (separated) {
        uri = separated[1];
        query = separated[2];
    }
    else {
        uri = url;
        query = "";
    }
    return [uri, query];
};
const __TEST__ = { separateURL, filterQuery, makeFormBody };
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["NEXT"] = 1] = "NEXT";
    DIRECTION[DIRECTION["PREV"] = -1] = "PREV";
})(DIRECTION || (DIRECTION = {}));

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbMetaList,
  __TEST__: __TEST__
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-meta-list",
	"stanza:label": "GMDB meta list",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-19",
	"stanza:updated": "2021-02-19",
	"stanza:parameter": [
	{
		"stanza:key": "api_url",
		"stanza:example": "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword?keyword=MEDIUM",
		"stanza:description": "URL of the SPARQList API with queries",
		"stanza:required": true
	},
	{
		"stanza:key": "limit",
		"stanza:example": "10",
		"stanza:description": "limit",
		"stanza:required": true
	},
	{
		"stanza:key": "title",
		"stanza:example": "Media of Glucose",
		"stanza:description": "title",
		"stanza:required": false
	},
	{
		"stanza:key": "column_names",
		"stanza:example": "true",
		"stanza:description": "whether display column names",
		"stanza:required": true
	},
	{
		"stanza:key": "column_sizes",
		"stanza:example": "30,70",
		"stanza:description": "column sizes from left. should be separated with comma",
		"stanza:required": false
	},
	{
		"stanza:key": "web_font",
		"stanza:example": "Fira Sans Condensed",
		"stanza:description": "google font name",
		"stanza:required": false
	}
],
	"stanza:about-link-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--link-color",
		"stanza:type": "color",
		"stanza:default": "#6FA80C",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--web-font",
		"stanza:type": "string",
		"stanza:default": "Fira Sans Condensed",
		"stanza:description": "google font name"
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

  return "  <header>\n    <h2>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":17}}}) : helper)))
    + "</h2>\n  </header>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"wrapper\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isLoading") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":23},"end":{"line":7,"column":63}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":48,"column":11}}})) != null ? stack1 : "")
    + "  </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " data-is-loading";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <table "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isFixedTable") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":13},"end":{"line":9,"column":70}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showColumnNames") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":16,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":35,"column":17}}})) != null ? stack1 : "")
    + "      </table>\n      <footer>\n        <div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasPrev") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":10},"end":{"line":41,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasNext") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":10},"end":{"line":44,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n        <p class=\"info\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"info") || (depth0 != null ? lookupProperty(depth0,"info") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"info","hash":{},"data":data,"loc":{"start":{"line":46,"column":24},"end":{"line":46,"column":32}}}) : helper)))
    + "</p>\n      </footer>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " style=\"table-layout: fixed;\" ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"columns") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":14,"column":21}}})) != null ? stack1 : "")
    + "          </tr>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <th "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"size") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":18},"end":{"line":13,"column":62}}})) != null ? stack1 : "")
    + " >"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":13,"column":64},"end":{"line":13,"column":73}}}) : helper)))
    + "</th>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " style=\"width:"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"size") || (depth0 != null ? lookupProperty(depth0,"size") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"size","hash":{},"data":data,"loc":{"start":{"line":13,"column":44},"end":{"line":13,"column":52}}}) : helper)))
    + "%\" ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":33,"column":21}}})) != null ? stack1 : "")
    + "          </tr>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"nowrap") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":14},"end":{"line":22,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"nowrap") : depth0),{"name":"unless","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":14},"end":{"line":25,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":14},"end":{"line":28,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"unless","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":14},"end":{"line":31,"column":25}}})) != null ? stack1 : "")
    + "            </td>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "              <td class=\"no-wrap\">\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "              <td>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "</a>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "            <button id=\"btnPrev\">PREV</button>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "            <button id=\"btnNext\">NEXT</button>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"error\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"status") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
    + "    "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"statusText") || (depth0 != null ? lookupProperty(depth0,"statusText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"statusText","hash":{},"data":data,"loc":{"start":{"line":56,"column":4},"end":{"line":56,"column":18}}}) : helper)))
    + "\n  </div>\n";
},"28":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      ERROR "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"status") || (depth0 != null ? lookupProperty(depth0,"status") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"status","hash":{},"data":data,"loc":{"start":{"line":54,"column":12},"end":{"line":54,"column":22}}}) : helper)))
    + "<br>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"info") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":50,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"info") : depth0),{"name":"unless","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":0},"end":{"line":58,"column":11}}})) != null ? stack1 : "");
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-meta-list.js.map
