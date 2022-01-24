import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { i as importWebFontForTogoMedium } from './stanza-4b95c663.js';

class GmdbPhenotypeInfo extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            if (!params.tax_id) {
                return;
            }
            const template = "stanza.html.hbs";
            this.renderTemplate({ template });
            importWebFontForTogoMedium(this);
        });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbPhenotypeInfo
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-phenotype-info",
	"stanza:label": "Gmdb phenotype info",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
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
		"stanza:example": "1254",
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
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<header>\n  <h2>Phenotype Information</h2>\n</header>\n<div class=\"wrapper\">\n\n  <table>\n    <tr>\n      <th>Cell shape</th>\n      <th>Temperature range</th>\n      <th>Motility</th>\n      <th>Staining</th>\n      <th>Energy source</th>\n    </tr>\n    <tr>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n      <td>N/A</td>\n    </tr>\n\n  </table>\n</div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-phenotype-info.js.map
