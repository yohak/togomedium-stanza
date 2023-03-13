import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-bd712360.js';
import { j as jsx, b as jsxs, F as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-3b758372.js';
import { r as reactExports, j as jsx$1 } from './index-56cafe6b.js';
import { a as Recoil_index_6, b as Recoil_index_18, c as Recoil_index_22, R as Recoil_index_4 } from './recoil-b0ceac4c.js';
import { A as API_COMPONENTS_WITH_COMPONENTS, a as API_MEDIA_BY_ATTRIBUTES } from './paths-66dbaf1f.js';
import { g as getData } from './getData-b32e78c1.js';
import { d as decodeHTMLEntities } from './string-e923d624.js';
import { T as TextField, C as Chip, A as Autocomplete } from './TextField-b194da9b.js';
import { C as CircularProgress, u as useFoundMediaMutators, a as useQueryDataMutators, b as useMediaLoadAbortMutators, n as nullResponse, w as wrapper, q as queryPane, s as subPane, M as MediaPane, c as useFoundMediaState } from './MediaPane-8a75fa29.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-c6ca75b5.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import './Grow-1eacc08f.js';
import './variables-0b8fac13.js';
import './createSvgIcon-74eb21f1.js';
import './useFormControl-a1db82cb.js';
import './consts-234f4433.js';

const ComponentSelect = ({ onChangeSelection }) => {
    const [loading, setLoading] = reactExports.useState(false);
    const [components, setComponents] = reactExports.useState([]);
    const loadComponents = (ids = []) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield getData(API_COMPONENTS_WITH_COMPONENTS, {
            gmo_ids: ids.join(","),
        });
        if (response.body) {
            setComponents(response.body
                .map((item) => ({
                id: item.gmo_id,
                label: item.name.includes(";") ? decodeHTMLEntities(item.name) : item.name,
            }))
                .filter((item) => !ids.includes(item.id)));
        }
        setLoading(false);
    });
    const onOpen = () => {
        if (components.length)
            return;
        loadComponents();
    };
    const onChange = (e, value) => {
        const ids = value.map((v) => v.id);
        onChangeSelection(ids);
        loadComponents(ids);
    };
    return (jsx(Autocomplete, { multiple: true, filterSelectedOptions: true, onChange: onChange, onOpen: onOpen, disablePortal: true, options: components, loading: loading, getOptionLabel: (option) => option.label, renderInput: (params) => (jsx(TextField, Object.assign({}, params, { label: "Components", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (jsxs(Fragment, { children: [loading ? jsx(CircularProgress, { color: "inherit", size: 20 }) : null, params.InputProps.endAdornment] })) }) }))), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined" }, getTagProps({ index }), { label: option.label, key: option.id })))) }));
};

const selectedAttributes = Recoil_index_6({
    key: "selectedAttributes",
    default: { gmo_ids: [] },
});
const useSelectedAttributesState = () => {
    return Recoil_index_18(selectedAttributes);
};
const useSelectedAttributesMutators = () => {
    const setSelectedAttributes = Recoil_index_22(selectedAttributes);
    return { setSelectedAttributes };
};

const AttributesSection = () => {
    const selectedAttributes = useSelectedAttributesState();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setQueryData } = useQueryDataMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const { setSelectedAttributes } = useSelectedAttributesMutators();
    const onChangeSelection = (ids) => {
        setSelectedAttributes({ gmo_ids: ids });
    };
    reactExports.useEffect(() => {
        const gmo_ids = selectedAttributes.gmo_ids;
        if (gmo_ids.length === 0) {
            setQueryData({});
            setFoundMedia(nullResponse);
            setNextMediaLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const params = { gmo_ids, limit: 10, offset: 0 };
            setQueryData({ gmo_ids });
            const abort = new AbortController();
            setNextMediaLoadAbort(abort);
            const response = yield getData(API_MEDIA_BY_ATTRIBUTES, params, abort);
            setNextMediaLoadAbort(null);
            if (response.body) {
                setFoundMedia(response.body);
            }
        }))();
    }, [selectedAttributes]);
    return (jsx("div", { children: jsx(ComponentSelect, { onChangeSelection: onChangeSelection }) }));
};

const AppContainer = ({ dispatchEvent }) => {
    const { next, prev } = useMediaPagination();
    return (jsxs("div", Object.assign({ css: wrapper }, { children: [jsx("div", Object.assign({ css: queryPane }, { children: jsx(AttributesSection, {}) })), jsx("div", Object.assign({ css: subPane }, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent, next: next, prev: prev }) }))] })));
};
const useMediaPagination = () => {
    const selectedAttributes = useSelectedAttributesState();
    const response = useFoundMediaState();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const next = () => {
        paginate({
            offset: response.offset + 10,
            gmo_ids: selectedAttributes.gmo_ids,
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    const prev = () => {
        paginate({
            offset: response.offset - 10,
            gmo_ids: selectedAttributes.gmo_ids,
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    return { next, prev };
};
const paginate = ({ offset, abortLoader, gmo_ids, setFoundMedia }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { gmo_ids, offset, limit: 10 };
    const abort = new AbortController();
    abortLoader(abort);
    const response = yield getData(API_MEDIA_BY_ATTRIBUTES, params, abort);
    abortLoader(null);
    if (response.body) {
        setFoundMedia(response.body);
    }
});

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        console.log(stanzaElement);
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
        console.log("dispatch", { detail: gmIds });
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
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
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root }) }) })) }) }), main);
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
	"@id": "gmdb-find-media-by-components",
	"stanza:label": "Find Media by Components",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
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
//# sourceMappingURL=gmdb-find-media-by-components.js.map
