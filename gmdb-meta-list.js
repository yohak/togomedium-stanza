import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { j as jsx, ag as COLOR_GRAY500, C as COLOR_PRIMARY, l as COLOR_WHITE, a as jsxs, k as COLOR_PRIMARY_DARK, F as Fragment, m as COLOR_TEXT, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { n as newStyled, u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { c as css, r as reactExports, n as makeFormBody } from './getData-1a784a8c.js';
import { S as Slider } from './Slider-169f4ed4.js';
import { n as nanoid } from './index.browser-4ca8a21b.js';
import { d as decodeHTMLEntities } from './string-4de5f4fa.js';
import { C as CircularProgress } from './CircularProgress-0433714e.js';
import './DefaultPropsProvider-4e645303.js';

const AngleLeftIcon = ({ css, className }) => {
    return (jsx("svg", { css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: jsx("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }) }));
};

const AngleRightIcon = ({ css, className }) => {
    return (jsx("svg", { css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", children: jsx("path", { d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" }) }));
};

const DoubleAngleLeftIcon = ({ css, className }) => {
    return (jsx("svg", { css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", children: jsx("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }) }));
};

const DoubleAngleRightIcon = ({ css, className }) => {
    return (jsx("svg", { css: css, className: className, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", children: jsx("path", { d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }) }));
};

const getPagination = (props) => {
    const { totalPages, currentPage } = props;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(start + 4, totalPages);
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    let startNum = result[0] - 1;
    while (result.length < 5 && startNum > 1) {
        result.unshift(startNum);
        startNum -= 1;
    }
    return result;
};

const BottomController = ({ css, className, total, offset, limit, setOffset, }) => {
    const totalPages = reactExports.useMemo(() => Math.ceil(total / limit), [total, limit]);
    const currentPage = reactExports.useMemo(() => Math.ceil(offset / limit) + 1, [offset, limit]);
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;
    const [pagination, setPagination] = reactExports.useState([]);
    const [tempCurrentPage, setTempCurrentPage] = reactExports.useState(currentPage);
    const changePage = (page) => {
        setOffset((page - 1) * limit);
    };
    const commitPageInput = (val) => {
        if (val <= 0 || isNaN(val)) {
            changePage(1);
        }
        else if (val >= totalPages) {
            changePage(totalPages);
        }
        else {
            changePage(val);
        }
    };
    reactExports.useEffect(() => {
        setPagination(getPagination({ totalPages, currentPage: tempCurrentPage }));
    }, [totalPages, tempCurrentPage]);
    reactExports.useEffect(() => {
        setPagination(getPagination({ totalPages, currentPage }));
    }, [totalPages, currentPage]);
    reactExports.useEffect(() => {
        setTempCurrentPage(currentPage);
    }, [currentPage]);
    if (totalPages <= 1)
        return null;
    return (jsxs("div", { css: [controller, css], className: className, children: [jsxs(Pagination, { children: [!isFirst ? (jsx(IconWrapper, { onClick: () => changePage(1), children: jsx(DoubleAngleLeftIcon, {}) })) : (jsx(IconDummy, {})), !isFirst ? (jsx(IconWrapper, { onClick: () => changePage(currentPage - 1), children: jsx(AngleLeftIcon, {}) })) : (jsx(IconDummy, {})), jsx(PageNums, { children: pagination.map((p) => (jsx("li", { onClick: () => {
                                changePage(p);
                            }, className: p === tempCurrentPage ? "active" : "", children: p }, p))) }), !isLast ? (jsx(IconWrapper, { onClick: () => changePage(currentPage + 1), children: jsx(AngleRightIcon, {}) })) : (jsx(IconDummy, {})), !isLast ? (jsx(IconWrapper, { onClick: () => changePage(totalPages), children: jsx(DoubleAngleRightIcon, {}) })) : (jsx(IconDummy, {}))] }), jsxs(Right, { children: [totalPages > 5 && (jsx(SliderWrapper, { children: jsx(Slider, { value: tempCurrentPage, min: 1, max: totalPages, "aria-label": "Default", valueLabelDisplay: "auto", onChange: (e, v) => {
                                setTempCurrentPage(v);
                            }, onChangeCommitted: (e, v) => {
                                changePage(v);
                            } }) })), jsxs(Info, { children: [jsx("span", { children: "Page" }), jsx(CurrentPageInput, { type: "number", value: tempCurrentPage, onChange: (e) => {
                                    setTempCurrentPage(parseInt(e.target.value));
                                }, onBlur: () => {
                                    commitPageInput(tempCurrentPage);
                                }, onKeyUp: (e) => {
                                    if (e.key === "Enter") {
                                        commitPageInput(tempCurrentPage);
                                    }
                                } }), jsxs("span", { children: ["of ", totalPages] })] })] })] }));
};
const controller = css `
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;
const CurrentPageInput = newStyled.input `
  width: 64px;
  display: inline-block;
  margin-inline: 8px;
  padding-inline: 4px;
`;
const Right = newStyled.div `
  display: flex;
  gap: 20px;
`;
const Info = newStyled.div `
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SliderWrapper = newStyled.div `
  width: 240px;
`;
const Pagination = newStyled.div `
  display: flex;
  height: 26px;
`;
const IconWrapper = newStyled.div `
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${COLOR_GRAY500};
    height: 18px;
    width: auto;
  }
`;
const IconDummy = newStyled.div `
  height: 24px;
  width: 24px;
`;
const PageNums = newStyled.ul `
  background-color: ${COLOR_PRIMARY};
  width: fit-content;
  display: flex;
  padding: 1px;
  gap: 1px;
  li {
    background-color: ${COLOR_WHITE};
    font-size: 14px;
    min-width: 28px;
    height: 24px;
    padding-inline: 2px;
    box-sizing: border-box;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    &.active {
      background-color: ${COLOR_PRIMARY};
      color: ${COLOR_WHITE};
      font-weight: bold;
    }
  }
`;

const ListTable = ({ css, className, data, columnSizes, showColumnNames, limit, }) => {
    const extraRows = Array(Math.max(0, limit - data.contents.length))
        .fill(null)
        .map(() => nanoid());
    return (jsxs("table", { css: [listTable, css], className: className, children: [showColumnNames && (jsx("thead", { children: jsx("tr", { children: data.columns.map((column, index) => {
                        const size = columnSizes[index];
                        const isSizeEnabled = !!size && data.columns.length === columnSizes.length;
                        return (jsx("th", { style: isSizeEnabled ? { width: `${size}%` } : {}, children: column.label }, column.key));
                    }) }) })), jsxs("tbody", { children: [data.contents.map((row, i) => (jsx("tr", { children: data.columns.map((column) => {
                            const key = column.key;
                            const item = row[key];
                            const noWrap = !!column.nowrap;
                            return (jsx("td", { style: noWrap ? { whiteSpace: "nowrap" } : {}, children: jsx(CellContent, { item: item }) }, key));
                        }) }, i))), extraRows.map((rowId) => (jsx("tr", { children: data.columns.map((column) => {
                            const key = column.key;
                            return jsx("td", { children: "-" }, key);
                        }) }, rowId)))] })] }));
};
const CellContent = ({ item }) => {
    if (typeof item === "string") {
        return jsx(Fragment, { children: decodeHTMLEntities(item) });
    }
    if (typeof item === "number") {
        return jsx(Fragment, { children: item });
    }
    return (jsx("a", { href: item.href, target: "_blank", rel: "noreferrer", children: decodeHTMLEntities(item.label) }));
};
const listTable = css `
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  border-collapse: collapse;

  td,
  th {
    padding: 6px 8px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    line-height: 1.2;
  }

  tr:nth-of-type(2n) {
    background-color: #f6f6f6;
  }

  a {
    color: ${COLOR_PRIMARY_DARK};
    text-decoration: none;
  }
`;

const LoadingCover = ({ css, className, showLoading, errorMessage }) => {
    const isShow = showLoading || errorMessage !== "";
    return (jsxs(Wrapper, { css: [css], className: `${className} ${isShow && "active"}`, children: [showLoading && jsx(CircularProgress, {}), !!errorMessage && errorMessage] }));
};
const Wrapper = newStyled.div `
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_WHITE};
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  pointer-events: none;
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: linear;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;

const TopInfo = ({ css, className, total, limit, setLimit, setOffset }) => {
    const [tempLimit, setTempLimit] = reactExports.useState(limit);
    const onCommitLimit = (val) => {
        let newLimit = val;
        if (val < 1 || isNaN(val)) {
            newLimit = 1;
        }
        else if (val >= 100) {
            newLimit = 100;
        }
        else if (val > total) {
            newLimit = total;
        }
        setLimit(newLimit);
        setTempLimit(newLimit);
        setOffset(0);
    };
    reactExports.useEffect(() => {
        setTempLimit(limit);
    }, [limit]);
    return (jsxs("div", { css: [topInfo, css], className: className, children: [jsxs(Total, { children: ["Total: ", total, " items"] }), jsx("span", { children: "/" }), jsxs("p", { children: [jsx("span", { children: "Show" }), jsx(NumInput, { type: "number", value: tempLimit, onChange: (e) => {
                            setTempLimit(parseInt(e.target.value));
                        }, onBlur: () => {
                            onCommitLimit(tempLimit);
                        }, onKeyUp: (e) => {
                            if (e.key === "Enter") {
                                onCommitLimit(tempLimit);
                            }
                        } }), jsx("span", { children: "items per page" })] })] }));
};
const topInfo = css `
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  gap: 8px;
  padding-bottom: 4px;
  padding-right: 8px;
  align-items: baseline;
`;
const Total = newStyled.p `
  //margin-inline-end: 16px;
  display: flex;
  align-items: center;
`;
const NumInput = newStyled.input `
  width: 48px;
  display: inline-block;
  margin-inline: 8px;
  padding-inline: 4px;
`;

const StanzaWrapper = newStyled.div `
  position: relative;
  font-size: 16px;
  //font-family: $web-font, sans-serif;
  padding: 16px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${COLOR_TEXT};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const StanzaView = ({ css, className, data, title, showColumnNames, columnSizes, offset, setOffset, limit, setLimit, showLoading, errorMessage, }) => {
    return (jsxs("div", { css: [stanzaView, css], className: className, children: [title && (jsx(Header, { children: jsx("h2", { children: title }) })), jsxs(StanzaWrapper, { children: [jsx(TopInfo, { total: data.total, limit, setLimit, setOffset }), jsxs("div", { style: { position: "relative" }, children: [jsx(ListTable, { data, showColumnNames, columnSizes, limit }), jsx(LoadingCover, { showLoading, errorMessage })] }), jsx(BottomController, { total: data.total, offset, limit, setOffset })] })] }));
};
const stanzaView = css ``;
const Header = newStyled.header `
  h2 {
    -webkit-font-smoothing: antialiased;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 8px;
  }
`;

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

const useTableData = (apiUrl, initialLimit = 100) => {
    const [offset, setOffset] = reactExports.useState(0);
    const [limit, setLimit] = reactExports.useState(initialLimit);
    const { data, isLoading, error, isPlaceholderData } = useQuery({
        queryKey: [{ offset }, { limit }, { apiUrl }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield fetchData(apiUrl, offset, limit);
            return response.body;
        }),
        placeholderData: (previousData) => previousData,
        staleTime: Infinity,
    });
    const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "";
    const updateLimit = () => {
        data && data.total < limit ? setLimit(data.total) : "";
    };
    reactExports.useEffect(() => {
        updateLimit();
    }, [data]);
    const showLoading = isLoading || isPlaceholderData;
    return { offset, setOffset, limit, setLimit, showLoading, data, errorMessage };
};
const App = ({ apiUrl, initialLimit, title, showColumnNames, columnSizes, webFont }) => {
    const { offset, setOffset, limit, setLimit, showLoading, data, errorMessage } = useTableData(apiUrl, initialLimit);
    if (!data) {
        return jsx(Fragment, { children: errorMessage });
    }
    return (jsx(StanzaView, { data,
        title,
        showColumnNames,
        columnSizes,
        offset,
        setOffset,
        limit: !isNaN(limit) ? limit : data.total,
        setLimit,
        showLoading,
        errorMessage }));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        var _a, _b, _c, _d;
        const params = this.params;
        const apiUrl = params.api_url;
        const limit = parseInt((_a = params.limit) !== null && _a !== void 0 ? _a : "20");
        const title = (_b = params.title) !== null && _b !== void 0 ? _b : "";
        const columNames = params.column_names === "true";
        const columnSizes = ((_c = params.column_sizes) !== null && _c !== void 0 ? _c : "").split(",").map((s) => parseInt(s));
        const webFont = (_d = params.web_font) !== null && _d !== void 0 ? _d : "Fira Sans Condensed";
        return (jsx(App, { stanzaElement: this.root, apiUrl: apiUrl, initialLimit: limit, title: title, showColumnNames: columNames, columnSizes: columnSizes, webFont: webFont }));
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
	"stanza:updated": "2024-03-09",
	"stanza:parameter": [
	{
		"stanza:key": "api_url",
		"stanza:example": "https://togomedium.org/sparqlist/api/list_media",
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
		"stanza:example": "15,15,70",
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
	"stanza:menu-placement": "none",
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
//# sourceMappingURL=gmdb-meta-list.js.map
