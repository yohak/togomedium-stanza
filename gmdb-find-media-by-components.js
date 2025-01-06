import { _ as __awaiter, d as defineStanzaElement } from './stanza-97f45b0e.js';
import { j as jsx, a as jsxs, F as Fragment, R as Recoil_index_8, o as Recoil_index_20, p as Recoil_index_24, T as TogoMediumReactStanza } from './StanzaReactProvider-d614d9ca.js';
import { u as useQuery } from './emotion-styled.browser.esm-981b7be3.js';
import { r as reactExports, j as jsx$1, g as getData } from './getData-8b0d864a.js';
import { A as API_COMPONENTS_WITH_COMPONENTS, a as API_MEDIA_BY_ATTRIBUTES } from './paths-9c191287.js';
import { d as decodeHTMLEntities } from './string-4de5f4fa.js';
import { T as TextField, C as Chip, A as Autocomplete } from './TextField-940e7bf7.js';
import { C as CircularProgress } from './CircularProgress-5e108e03.js';
import { w as wrapper, q as queryPane, s as subPane, M as MediaPane, u as useMediaPaginationState, a as useFoundMediaMutators, b as useQueryDataMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators } from './MediaPane-fa665b62.js';
import './DefaultPropsProvider-0ba0cf40.js';
import './variables-58f3d1be.js';
import './consts-c38322df.js';
import './isHostComponent-a8cd4d85.js';

const ComponentSelect = ({ onChangeSelection }) => {
    const [loading, setLoading] = reactExports.useState(false);
    const [components, setComponents] = reactExports.useState([]);
    const loadComponents = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (ids = []) {
        const response = yield getData(API_COMPONENTS_WITH_COMPONENTS, {
            gmo_ids: ids.join(","),
        });
        if (response.body) {
            setComponents(response.body
                .map((item) => ({
                id: item.gmo_id,
                label: item.name.includes(";") ? decodeHTMLEntities(item.name) : item.name,
                japaneseName: item.japanese_name,
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
    return (jsx(Autocomplete, { multiple: true, filterSelectedOptions: true, filterOptions: (options, params) => {
            return options.filter((option) => {
                const label = option.label.toLowerCase();
                const japaneseName = option.japaneseName.toLowerCase();
                const filter = params.inputValue.toLowerCase();
                return label.includes(filter) || japaneseName.includes(filter);
            });
        }, onChange: onChange, onOpen: onOpen, disablePortal: true, options: components, loading: loading, getOptionLabel: (option) => option.label, renderInput: (params) => (jsx(TextField, Object.assign({}, params, { label: "Components", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (jsxs(Fragment, { children: [loading ? jsx(CircularProgress, { color: "inherit", size: 20 }) : null, params.InputProps.endAdornment] })) }) }))), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined" }, getTagProps({ index }), { label: option.label, key: option.id })))) }));
};

const selectedAttributes = Recoil_index_8({
    key: "selectedAttributes",
    default: { gmo_ids: [] },
});
const useSelectedAttributesState = () => {
    return Recoil_index_20(selectedAttributes);
};
const useSelectedAttributesMutators = () => {
    const setSelectedAttributes = Recoil_index_24(selectedAttributes);
    return { setSelectedAttributes };
};

const AttributesSection = () => {
    const { setSelectedAttributes } = useSelectedAttributesMutators();
    const onChangeSelection = (ids) => {
        setSelectedAttributes({ gmo_ids: ids });
    };
    return (jsx("div", { children: jsx(ComponentSelect, { onChangeSelection: onChangeSelection }) }));
};

const AppContainer = ({ dispatchEvent }) => {
    useMediaLoadFromComponents();
    return (jsxs("div", { css: wrapper, children: [jsx("div", { css: queryPane, children: jsx(AttributesSection, {}) }), jsx("div", { css: subPane, children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};
const SHOW_COUNT = 10;
const useMediaLoadFromComponents = () => {
    const page = useMediaPaginationState();
    const selectedAttributes = useSelectedAttributesState();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setQueryData } = useQueryDataMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
    const query = useQuery({
        queryKey: [selectedAttributes, { page }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const gmo_ids = selectedAttributes.gmo_ids;
            if (gmo_ids.length === 0)
                return nullResponse;
            setQueryData({ gmo_ids });
            const response = yield getData(API_MEDIA_BY_ATTRIBUTES, {
                gmo_ids,
                limit: SHOW_COUNT,
                offset: (page - 1) * SHOW_COUNT,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        }),
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
    reactExports.useEffect(() => {
        query.data && setFoundMedia(query.data);
    }, [query.data]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData]);
    reactExports.useEffect(() => {
        reset();
    }, [selectedAttributes]);
};

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

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        return jsx(App, { stanzaElement: this.root });
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
