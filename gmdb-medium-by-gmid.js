import { _ as __awaiter, f as __asyncValues, d as defineStanzaElement } from './stanza-33129828.js';
import { j as jsx, c as COLOR_PRIMARY_DARK, y as COLOR_GRAY_LINE, a as jsxs, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-5a1c35e0.js';
import { c as css, g as getData, r as reactExports } from './getData-0fc4e1b9.js';
import { d as decodeHTMLEntities } from './string-e923d624.js';
import { s as stanzaWrapper, I as InfoId, a as InfoTitle, b as SubHeading } from './common-ccbc87e2.js';
import { c as copy } from './index.es-918fddc1.js';
import { U as URL_API } from './variables-fde23d74.js';

const RecipeComment = ({ css, className, comment }) => {
    return (jsx("div", Object.assign({ css: [recipeComments, css], className: className }, { children: parseText(comment) })));
};
const recipeComments = css `
  margin: 4px 0;
`;
const parseText = (str) => {
    return decodeHTMLEntities(str.replace(/℃/g, "°C"));
};

const RecipeTable = ({ css, className, name, items, referenceId }) => {
    return (jsxs("div", Object.assign({ css: [recipeTable, css], className: className }, { children: [jsxs("div", Object.assign({ css: titleWrapper }, { children: [jsx("h4", Object.assign({ css: titleStyle }, { children: name })), referenceId && (jsxs("span", { children: ["(See also ", jsx("a", Object.assign({ href: `/media/${referenceId}` }, { children: referenceId })), ")"] }))] })), jsxs("table", Object.assign({ css: tableStyle }, { children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", Object.assign({ className: "id" }, { children: "GMO ID" })), jsx("th", Object.assign({ className: "name" }, { children: "Component" })), jsx("th", Object.assign({ className: "name" }, { children: "Original label" })), jsx("th", Object.assign({ className: "volume" }, { children: "\u00A0" })), jsx("th", Object.assign({ className: "volume" }, { children: "Amount" }))] }) }), jsx("tbody", { children: items.map((item, index) => {
                            return (jsxs("tr", { children: [jsx("td", Object.assign({ className: "id" }, { children: jsx("a", Object.assign({ href: `/component/${item.id}`, target: "_blank", rel: "noreferrer" }, { children: item.id })) })), jsx("td", Object.assign({ className: "name" }, { children: decodeHTMLEntities(item.componentLabel) })), jsx("td", Object.assign({ className: "name" }, { children: jsx("span", { children: item.componentName.replace(/\(see.*\)/, "(see below)") }) })), jsxs("td", Object.assign({ className: "volume" }, { children: [jsx("span", { children: item.concValue }), jsx("span", { children: item.concUnit })] })), jsxs("td", Object.assign({ className: "volume" }, { children: [jsx("span", { children: item.volume }), jsx("span", { children: item.unit })] }))] }, index));
                        }) })] }))] })));
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
    return (jsxs("div", Object.assign({ css: [stanzaView, css, stanzaWrapper], className: className }, { children: [jsxs(InfoId, { children: [jsx("span", { children: "Growth Medium ID:\u00A0" }), jsx("span", { children: id })] }), srcUrl && (jsxs(InfoId, { children: [jsx("span", { children: "Information source:\u00A0" }), jsx("a", Object.assign({ href: srcUrl, target: "_blank", rel: "noreferrer" }, { children: originalId || srcLabel || id }))] })), jsxs(InfoTitle, { children: [name && decodeHTMLEntities(name), ph && jsxs("small", { children: ["(pH", ph, ")"] })] }), components.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Components" }), components.map((component, index) => {
                        if ("comment" in component) {
                            return jsx(RecipeComment, Object.assign({}, component), index);
                        }
                        else {
                            return jsx(RecipeTable, Object.assign({}, component), index);
                        }
                    })] })), extraComponents.map((item, i) => {
                return (jsx("div", { children: item.components.map((component, index) => {
                        if ("comment" in component) {
                            return jsx(RecipeComment, Object.assign({}, component), index);
                        }
                        else {
                            return jsx(RecipeTable, Object.assign({}, component, { referenceId: item.id }), index);
                        }
                    }) }, i));
            })] })));
};
const stanzaView = css ``;

const getMedia = (gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    const apiName = "gmdb_medium_by_gmid";
    const result = yield getData(`${URL_API}${apiName}`, { gm_id });
    if (result.body) {
        const extra = yield getExternalReferences(result.body, gm_id);
        return processData(result.body, extra);
    }
    else {
        return undefined;
    }
});
const getExternalReferences = (body, gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    const externalReferences = copy(body)
        .components.map((component) => component.items.filter((item) => !!item.reference_media_id && item.reference_media_id !== gm_id))
        .filter((item) => item.length > 0)
        .flat()
        .map((item) => ({
        id: item.reference_media_id,
        name: item.component_name.replace(/ \(.*\)/, "").replace(/\*/g, ""),
    }));
    const extraData = [];
    try {
        for (var _e = true, externalReferences_1 = __asyncValues(externalReferences), externalReferences_1_1; externalReferences_1_1 = yield externalReferences_1.next(), _a = externalReferences_1_1.done, !_a;) {
            _c = externalReferences_1_1.value;
            _e = false;
            try {
                const ref = _c;
                const apiName = "gmdb_medium_by_gmid";
                const result = yield getData(`${URL_API}${apiName}`, { gm_id: ref.id });
                if (result.body) {
                    const data = processData(result.body);
                    const components = data.components;
                    const target = components.find((item) => item.name === ref.name);
                    const arr = [target];
                    if (target) {
                        const targetIndex = components.indexOf(target);
                        let i = 1;
                        while ((_d = components[targetIndex + i]) === null || _d === void 0 ? void 0 : _d.comment) {
                            const comment = components[targetIndex + i];
                            arr.push(comment);
                            i++;
                            if (i > 100)
                                break;
                        }
                    }
                    extraData.push({ components: arr, id: ref.id });
                }
            }
            finally {
                _e = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = externalReferences_1.return)) yield _b.call(externalReferences_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return extraData;
});
const processData = (body, extraComponents = []) => {
    const id = body.meta.gm.split("/").pop();
    return {
        id,
        originalId: body.meta.original_media_id,
        name: body.meta.name,
        srcLabel: getSrcLabel(body.meta.src_url),
        srcUrl: body.meta.src_url,
        ph: body.meta.ph,
        components: processComponents(id, body.components, body.comments),
        extraComponents,
    };
};
const processComponents = (myId, tables, comments) => {
    return [...processComponentTables(tables, myId), ...processComponentComments(comments)].sort((a, b) => a.index - b.index);
};
const processComponentTables = (tables, gmID) => {
    return tables.map((table) => ({
        index: table.paragraph_index,
        name: table.subcomponent_name,
        items: table.items.map((item) => {
            var _a, _b;
            return ({
                id: item.gmo_id || "",
                componentName: item.component_name,
                componentLabel: item.label || "",
                concValue: ((_a = item.conc_value) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                concUnit: item.conc_unit || "",
                volume: ((_b = item.volume) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                unit: item.unit || "",
                referenceMediaId: !item.reference_media_id || item.reference_media_id === gmID ? "" : item.reference_media_id,
            });
        }),
    }));
};
const processComponentComments = (comments) => {
    return comments.map((item) => ({
        index: item.paragraph_index,
        comment: item.comment ? item.comment : "&nbsp;",
    }));
};
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

const App = ({ gm_id }) => {
    const [props, setProps] = reactExports.useState(null);
    reactExports.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            setProps(null);
            const result = yield getMedia(gm_id);
            if (!result)
                return;
            setProps(result);
        }))();
    }, [gm_id]);
    return props ? jsx(StanzaView, Object.assign({}, props)) : jsx(Fragment, { children: "Loading..." });
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
