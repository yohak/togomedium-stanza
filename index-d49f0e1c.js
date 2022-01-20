import { a as __assign, g as getAugmentedNamespace, c as commonjsGlobal } from './stanza-f44e302d.js';

var dist = {};

var circulate$1 = {};

Object.defineProperty(circulate$1, "__esModule", { value: true });
circulate$1.circulate = void 0;
const circulate = (target, value) => {
    const arr = [...target];
    if (value === 0)
        return arr;
    const startIndex = value > 0 ? 0 : value;
    const spliceCount = value > 0 ? value : value * -1;
    const spliced = arr.splice(startIndex, spliceCount);
    return value > 0 ? [...arr, ...spliced] : [...spliced, ...arr];
};
circulate$1.circulate = circulate;

var forceAsArray$1 = {};

Object.defineProperty(forceAsArray$1, "__esModule", { value: true });
forceAsArray$1.forceAsArray = void 0;
const forceAsArray = (target) => {
    return Array.isArray(target) ? target : [target];
};
forceAsArray$1.forceAsArray = forceAsArray;

var types$2 = {};

Object.defineProperty(types$2, "__esModule", { value: true });

var getComputedStyle = {};

/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}

function pascalCaseTransform(input, index) {
    var firstChar = input.charAt(0);
    var lowerChars = input.substr(1).toLowerCase();
    if (index > 0 && firstChar >= "0" && firstChar <= "9") {
        return "_" + firstChar + lowerChars;
    }
    return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCaseTransformMerge(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function pascalCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "", transform: pascalCaseTransform }, options));
}

function camelCaseTransform(input, index) {
    if (index === 0)
        return input.toLowerCase();
    return pascalCaseTransform(input, index);
}
function camelCaseTransformMerge(input, index) {
    if (index === 0)
        return input.toLowerCase();
    return pascalCaseTransformMerge(input);
}
function camelCase(input, options) {
    if (options === void 0) { options = {}; }
    return pascalCase(input, __assign({ transform: camelCaseTransform }, options));
}

/**
 * Upper case the first character of an input string.
 */
function upperCaseFirst(input) {
    return input.charAt(0).toUpperCase() + input.substr(1);
}

function capitalCaseTransform(input) {
    return upperCaseFirst(input.toLowerCase());
}
function capitalCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: " ", transform: capitalCaseTransform }, options));
}

/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
/**
 * Upper case as a function.
 */
function upperCase(str) {
    return str.toUpperCase();
}

function constantCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "_", transform: upperCase }, options));
}

function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: "." }, options));
}

function headerCase(input, options) {
    if (options === void 0) { options = {}; }
    return capitalCase(input, __assign({ delimiter: "-" }, options));
}

function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "-" }, options));
}

function pathCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "/" }, options));
}

function sentenceCaseTransform(input, index) {
    var result = input.toLowerCase();
    if (index === 0)
        return upperCaseFirst(result);
    return result;
}
function sentenceCase(input, options) {
    if (options === void 0) { options = {}; }
    return noCase(input, __assign({ delimiter: " ", transform: sentenceCaseTransform }, options));
}

function snakeCase(input, options) {
    if (options === void 0) { options = {}; }
    return dotCase(input, __assign({ delimiter: "_" }, options));
}

var dist_es2015 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    camelCaseTransform: camelCaseTransform,
    camelCaseTransformMerge: camelCaseTransformMerge,
    camelCase: camelCase,
    capitalCaseTransform: capitalCaseTransform,
    capitalCase: capitalCase,
    constantCase: constantCase,
    dotCase: dotCase,
    headerCase: headerCase,
    noCase: noCase,
    paramCase: paramCase,
    pascalCaseTransform: pascalCaseTransform,
    pascalCaseTransformMerge: pascalCaseTransformMerge,
    pascalCase: pascalCase,
    pathCase: pathCase,
    sentenceCaseTransform: sentenceCaseTransform,
    sentenceCase: sentenceCase,
    snakeCase: snakeCase
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(dist_es2015);

var stripUnit = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripPercent = exports.stripVh = exports.stripVw = exports.stripPx = exports.stripUnit = void 0;
const stripUnit = (value, unit) => {
    const pattern = `(.*)${unit}`;
    const reg = new RegExp(pattern).exec(value);
    const result = !!reg ? reg[1] : value;
    return isNaN(result) || !value ? undefined : parseInt(result);
};
exports.stripUnit = stripUnit;
const stripPx = (value) => exports.stripUnit(value, "px");
exports.stripPx = stripPx;
const stripVw = (value) => exports.stripUnit(value, "vw");
exports.stripVw = stripVw;
const stripVh = (value) => exports.stripUnit(value, "vh");
exports.stripVh = stripVh;
const stripPercent = (value) => exports.stripUnit(value, "%");
exports.stripPercent = stripPercent;

}(stripUnit));

var utils = {};

var types$1 = {};

Object.defineProperty(types$1, "__esModule", { value: true });
types$1.transformSingleProps = types$1.numberToPxProps = types$1.numberProps = void 0;
types$1.numberProps = ["opacity", "zIndex", "lineHeight"];
types$1.numberToPxProps = [
    "fontSize",
    "width",
    "height",
    "left",
    "right",
    "top",
    "bottom",
    "marginLeft",
    "marginRight",
    "marginBottom",
    "marginTop",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom",
    "borderRadius",
];
types$1.transformSingleProps = [
    "translateX",
    "translateY",
    "translateZ",
    "scaleX",
    "scaleY",
    "rotate",
    "skewX",
    "skewY",
];

Object.defineProperty(utils, "__esModule", { value: true });
utils.isTransformProp = utils.isPxProp = utils.extractCurrentTransform = void 0;
const types_1 = types$1;
const extractCurrentTransform = (str) => {
    const result = {};
    const values = str.split(")").map((r) => r + ")");
    const translateStr = values.find((r) => r.match("translate3d"));
    if (translateStr) {
        const v = /(translate3d\()(.*)(\))/
            .exec(translateStr)[2]
            .split(",")
            .map((r) => r.trim());
        result.translateX = v[0];
        result.translateY = v[1];
        result.translateZ = v[2];
    }
    const rotateStr = values.find((r) => r.match(/rotate\(/));
    if (rotateStr) {
        const v = /(rotate\()(.*)(\))/
            .exec(rotateStr)[2]
            .split(",")
            .map((r) => r.trim());
        result.rotate = v[0];
    }
    const scaleStr = values.find((r) => r.match("scale"));
    if (scaleStr) {
        const v = /(scale\()(.*)(\))/
            .exec(scaleStr)[2]
            .split(",")
            .map((r) => r.trim());
        result.scaleX = v[0];
        result.scaleY = v[1];
    }
    const skewStr = values.find((r) => r.match(/skew\(/));
    if (skewStr) {
        const v = /(skew\()(.*)(\))/
            .exec(skewStr)[2]
            .split(",")
            .map((r) => r.trim());
        result.skewX = v[0];
        result.skewY = v[1];
    }
    return result;
};
utils.extractCurrentTransform = extractCurrentTransform;
const isPxProp = (key) => {
    return types_1.numberToPxProps.includes(key);
};
utils.isPxProp = isPxProp;
const isTransformProp = (key) => {
    return types_1.transformSingleProps.includes(key);
};
utils.isTransformProp = isTransformProp;

Object.defineProperty(getComputedStyle, "__esModule", { value: true });
getComputedStyle.getComputedStyleValue = void 0;
const change_case_1 = require$$0;
const strip_unit_1$2 = stripUnit;
const utils_1$2 = utils;
function getComputedStyleValue(elm, key) {
    const computed = window.getComputedStyle(elm);
    if (utils_1$2.isTransformProp(key)) {
        const str = computed.getPropertyValue("transform");
        const transform = utils_1$2.extractCurrentTransform(str);
        const result = transform[key];
        const stripped = strip_unit_1$2.stripPx(result);
        return stripped ? stripped : result;
    }
    else {
        const result = computed.getPropertyValue(change_case_1.paramCase(key));
        const stripped = strip_unit_1$2.stripPx(result);
        return stripped ? stripped : result;
    }
}
getComputedStyle.getComputedStyleValue = getComputedStyleValue;

var getStyle$1 = {};

Object.defineProperty(getStyle$1, "__esModule", { value: true });
getStyle$1.getStyle = void 0;
const strip_unit_1$1 = stripUnit;
const utils_1$1 = utils;
function getStyle(target, prop) {
    let result;
    if (utils_1$1.isTransformProp(prop)) {
        const transforms = utils_1$1.extractCurrentTransform(target.style.transform);
        result = String(transforms[prop]);
    }
    else {
        result = target.style[prop];
    }
    if (!result)
        return undefined;
    const stripped = strip_unit_1$1.stripPx(result);
    return stripped ? stripped : result;
}
getStyle$1.getStyle = getStyle;

var setStyle$1 = {};

Object.defineProperty(setStyle$1, "__esModule", { value: true });
setStyle$1.setStyle = void 0;
const utils_1 = utils;
const force_as_array_1$4 = forceAsArray$1;
const setStyle = (target, styles) => {
    force_as_array_1$4.forceAsArray(target).forEach((elm) => _setStyle(elm, styles));
};
setStyle$1.setStyle = setStyle;
const _setStyle = (target, styles) => {
    const transforms = {};
    try {
        Object.entries(styles).forEach(([key, value]) => {
            switch (true) {
                case utils_1.isPxProp(key):
                    setPxProp(target, key, value);
                    break;
                case utils_1.isTransformProp(key):
                    transforms[key] = value;
                    break;
                default:
                    setDefaultProp(target, key, String(value));
            }
        });
    }
    catch (e) {
        console.log(e);
    }
    setTransformProps(target, transforms);
};
const tryAddPx = (value) => {
    value = value === 0 ? "0" : value;
    return typeof value === "string" ? value : `${value}px`;
};
const tryAddDeg = (value) => {
    value = value === 0 ? "0" : value;
    return typeof value === "string" ? value : `${value}deg`;
};
const setDefaultProp = (target, key, value) => {
    target.style[key] = value;
};
const setPxProp = (target, key, value) => {
    target.style[key] = tryAddPx(value);
};
const setTransformProps = (target, next) => {
    const values = [];
    const current = utils_1.extractCurrentTransform(target.style.transform);
    if (hasTranslateValue(next) || hasTranslateValue(current)) {
        const x = tryAddPx(chooseValue(next.translateX, current.translateX));
        const y = tryAddPx(chooseValue(next.translateY, current.translateY));
        const z = tryAddPx(chooseValue(next.translateZ, current.translateZ));
        values.push(`translate3d(${x}, ${y}, ${z})`);
    }
    if (hasRotateValue(next) || hasRotateValue(current)) {
        const r = tryAddDeg(chooseValue(next.rotate, current.rotate));
        values.push(`rotate(${r})`);
    }
    if (hasScaleValue(next) || hasScaleValue(current)) {
        const x = chooseValue(next.scaleX, current.scaleX, "1");
        const y = chooseValue(next.scaleY, current.scaleY, "1");
        values.push(`scale(${x}, ${y})`);
    }
    if (hasSkewValue(next) || hasSkewValue(current)) {
        const x = tryAddDeg(chooseValue(next.skewX, current.skewX));
        const y = tryAddDeg(chooseValue(next.skewY, current.skewY));
        values.push(`skew(${x}, ${y})`);
    }
    target.style.transform = values.join(" ");
};
const chooseValue = (newValue, currentValue, defaultValue = "0") => {
    if (newValue !== undefined) {
        return newValue;
    }
    else if (!!currentValue) {
        return currentValue;
    }
    else {
        return defaultValue;
    }
};
const hasTranslateValue = (transforms) => {
    return (transforms.translateX !== undefined ||
        transforms.translateY !== undefined ||
        transforms.translateZ !== undefined);
};
const hasRotateValue = (transforms) => {
    return transforms.rotate !== undefined;
};
const hasScaleValue = (transforms) => {
    return transforms.scaleX !== undefined || transforms.scaleY !== undefined;
};
const hasSkewValue = (transforms) => {
    return transforms.skewX !== undefined || transforms.skewY !== undefined;
};

var convertUnit = {};

Object.defineProperty(convertUnit, "__esModule", { value: true });
convertUnit.vhToPx = convertUnit.vwToPx = convertUnit.pxToVh = convertUnit.pxToVw = void 0;
const strip_unit_1 = stripUnit;
function pxToVw(value, addUnit = false) {
    const px = typeof value === "string" ? strip_unit_1.stripPx(value) : value;
    if (px === undefined)
        return undefined;
    const vw = (px / window.innerWidth) * 100;
    return addUnit ? `${vw}vw` : vw;
}
convertUnit.pxToVw = pxToVw;
function pxToVh(value, addUnit = false) {
    const px = typeof value === "string" ? strip_unit_1.stripPx(value) : value;
    if (px === undefined)
        return undefined;
    const vh = (px / window.innerHeight) * 100;
    return addUnit ? `${vh}vh` : vh;
}
convertUnit.pxToVh = pxToVh;
function vwToPx(value, addUnit = false) {
    const vw = typeof value === "string" ? strip_unit_1.stripVw(value) : value;
    if (vw === undefined)
        return undefined;
    const px = (window.innerWidth * vw) / 100;
    return addUnit ? `${px}px` : px;
}
convertUnit.vwToPx = vwToPx;
function vhToPx(value, addUnit = false) {
    const vh = typeof value === "string" ? strip_unit_1.stripVw(value) : value;
    if (vh === undefined)
        return undefined;
    const px = (window.innerHeight * vh) / 100;
    return addUnit ? `${px}px` : px;
}
convertUnit.vhToPx = vhToPx;

var addClass$1 = {};

var nodeListToArray$1 = {};

Object.defineProperty(nodeListToArray$1, "__esModule", { value: true });
nodeListToArray$1.nodeListToArray = void 0;
const nodeListToArray = (items) => {
    const elms = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        elms.push(item);
    }
    return elms;
};
nodeListToArray$1.nodeListToArray = nodeListToArray;

Object.defineProperty(addClass$1, "__esModule", { value: true });
addClass$1.addClass = void 0;
const node_list_to_array_1$4 = nodeListToArray$1;
const force_as_array_1$3 = forceAsArray$1;
const addClass = (target, token) => {
    if (target instanceof NodeList) {
        target = node_list_to_array_1$4.nodeListToArray(target);
    }
    const targets = force_as_array_1$3.forceAsArray(target);
    const tokens = force_as_array_1$3.forceAsArray(token);
    targets.forEach((elm) => elm.classList.add(...tokens));
};
addClass$1.addClass = addClass;

var addClassIf$1 = {};

var removeClass$1 = {};

Object.defineProperty(removeClass$1, "__esModule", { value: true });
removeClass$1.removeClass = void 0;
const node_list_to_array_1$3 = nodeListToArray$1;
const force_as_array_1$2 = forceAsArray$1;
const removeClass = (target, token) => {
    if (target instanceof NodeList) {
        target = node_list_to_array_1$3.nodeListToArray(target);
    }
    const targets = force_as_array_1$2.forceAsArray(target);
    const tokens = force_as_array_1$2.forceAsArray(token);
    targets.forEach((elm) => elm.classList.remove(...tokens));
};
removeClass$1.removeClass = removeClass;

Object.defineProperty(addClassIf$1, "__esModule", { value: true });
addClassIf$1.addClassIf = void 0;
const add_class_1 = addClass$1;
const node_list_to_array_1$2 = nodeListToArray$1;
const remove_class_1 = removeClass$1;
const force_as_array_1$1 = forceAsArray$1;
const addClassIf = (target, condition, token, alt = "", remove = true) => {
    if (target instanceof NodeList) {
        target = node_list_to_array_1$2.nodeListToArray(target);
    }
    const targets = force_as_array_1$1.forceAsArray(target);
    targets.forEach((elm) => process(elm, condition, token, remove, alt));
};
addClassIf$1.addClassIf = addClassIf;
const process = (target, condition, token, remove = true, alt = "") => {
    const c = typeof condition === "function" ? condition(target) : condition;
    if (c) {
        add_class_1.addClass(target, token);
        remove && alt ? remove_class_1.removeClass(target, alt) : "";
    }
    else {
        alt ? add_class_1.addClass(target, alt) : "";
        remove ? remove_class_1.removeClass(target, token) : "";
    }
};

var hasClass$1 = {};

Object.defineProperty(hasClass$1, "__esModule", { value: true });
hasClass$1.hasClass = void 0;
const hasClass = (target, token) => target.classList.contains(token);
hasClass$1.hasClass = hasClass;

var qs$1 = {};

Object.defineProperty(qs$1, "__esModule", { value: true });
qs$1.qs = void 0;
const qs = (query, queryRoot = document) => {
    const item = queryRoot.querySelector(query);
    return item;
};
qs$1.qs = qs;

var qsa$1 = {};

Object.defineProperty(qsa$1, "__esModule", { value: true });
qsa$1.qsa = void 0;
const node_list_to_array_1$1 = nodeListToArray$1;
const qsa = (query, queryRoot = document) => {
    const items = queryRoot.querySelectorAll(query);
    return node_list_to_array_1$1.nodeListToArray(items);
};
qsa$1.qsa = qsa;

var toggleClass$1 = {};

Object.defineProperty(toggleClass$1, "__esModule", { value: true });
toggleClass$1.toggleClass = void 0;
const node_list_to_array_1 = nodeListToArray$1;
const force_as_array_1 = forceAsArray$1;
const toggleClass = (target, token, alt) => {
    if (target instanceof NodeList) {
        target = node_list_to_array_1.nodeListToArray(target);
    }
    const targets = force_as_array_1.forceAsArray(target);
    targets.forEach((elm) => {
        const classList = elm.classList;
        const r = classList.toggle(token);
        if (alt !== undefined) {
            r ? classList.remove(alt) : classList.add(alt);
        }
    });
};
toggleClass$1.toggleClass = toggleClass;

var rangeMap$1 = {};

Object.defineProperty(rangeMap$1, "__esModule", { value: true });
rangeMap$1.rangeMap = void 0;
const rangeMap = ([a1, a2], [b1, b2], value) => {
    if (a1 > a2)
        [a1, a2] = [a2, a1];
    if (b1 > b2)
        [b1, b2] = [b2, b1];
    const ratio = (value - a1) / (a2 - a1);
    return (b2 - b1) * ratio + b1;
};
rangeMap$1.rangeMap = rangeMap;

var types = {};

Object.defineProperty(types, "__esModule", { value: true });

var getDocumentScroll = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentScrollY = exports.getDocumentScrollX = exports.getDocumentScroll = void 0;
const getDocumentScroll = () => {
    const x = exports.getDocumentScrollX();
    const y = exports.getDocumentScrollY();
    return { x, y };
};
exports.getDocumentScroll = getDocumentScroll;
const getDocumentScrollX = () => Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
exports.getDocumentScrollX = getDocumentScrollX;
const getDocumentScrollY = () => Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
exports.getDocumentScrollY = getDocumentScrollY;

}(getDocumentScroll));

var getOffsetFromDocument$1 = {};

Object.defineProperty(getOffsetFromDocument$1, "__esModule", { value: true });
getOffsetFromDocument$1.getOffsetYFromDocument = getOffsetFromDocument$1.getOffsetXFromDocument = getOffsetFromDocument$1.getOffsetFromDocument = void 0;
const get_document_scroll_1$1 = getDocumentScroll;
const getOffsetFromDocument = (target) => {
    const rect = target.getBoundingClientRect();
    const bodyScroll = get_document_scroll_1$1.getDocumentScroll();
    const x = rect.left + bodyScroll.x;
    const y = rect.top + bodyScroll.y;
    return { x, y };
};
getOffsetFromDocument$1.getOffsetFromDocument = getOffsetFromDocument;
const getOffsetXFromDocument = (target) => {
    const rect = target.getBoundingClientRect();
    const bodyScrollX = get_document_scroll_1$1.getDocumentScrollX();
    return rect.left + bodyScrollX;
};
getOffsetFromDocument$1.getOffsetXFromDocument = getOffsetXFromDocument;
const getOffsetYFromDocument = (target) => {
    const rect = target.getBoundingClientRect();
    const bodyScrollY = get_document_scroll_1$1.getDocumentScrollY();
    return rect.top + bodyScrollY;
};
getOffsetFromDocument$1.getOffsetYFromDocument = getOffsetYFromDocument;

var getOffsetFromViewport$1 = {};

Object.defineProperty(getOffsetFromViewport$1, "__esModule", { value: true });
getOffsetFromViewport$1.getOffsetYFromViewport = getOffsetFromViewport$1.getOffsetXFromViewport = getOffsetFromViewport$1.getOffsetFromViewport = void 0;
const get_document_scroll_1 = getDocumentScroll;
const getOffsetFromViewport = (target) => {
    const offset = { x: 0, y: 0 };
    while (target) {
        offset.x += target.offsetLeft;
        offset.y += target.offsetTop;
        target = target.offsetParent;
    }
    const documentScroll = get_document_scroll_1.getDocumentScroll();
    offset.x -= documentScroll.x;
    offset.y -= documentScroll.y;
    return offset;
};
getOffsetFromViewport$1.getOffsetFromViewport = getOffsetFromViewport;
const getOffsetXFromViewport = (target) => {
    let result = 0;
    while (target) {
        result += target.offsetLeft;
        target = target.offsetParent;
    }
    result -= get_document_scroll_1.getDocumentScrollX();
    return result;
};
getOffsetFromViewport$1.getOffsetXFromViewport = getOffsetXFromViewport;
const getOffsetYFromViewport = (target) => {
    let result = 0;
    while (target) {
        result += target.offsetTop;
        target = target.offsetParent;
    }
    result -= get_document_scroll_1.getDocumentScrollY();
    return result;
};
getOffsetFromViewport$1.getOffsetYFromViewport = getOffsetYFromViewport;

var is = {};

(function (exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isFunction = exports.isBoolean = exports.isString = exports.isValidNumber = exports.isNumber = void 0;
const isNumber = (value) => {
    return typeof value === "number";
};
exports.isNumber = isNumber;
const isValidNumber = (value) => {
    return exports.isNumber(value) && !isNaN(value);
};
exports.isValidNumber = isValidNumber;
const isString = (value) => {
    return typeof value === "string";
};
exports.isString = isString;
const isBoolean = (value) => {
    return typeof value === "boolean";
};
exports.isBoolean = isBoolean;
const isFunction = (value) => {
    return typeof value === "function";
};
exports.isFunction = isFunction;
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;

}(is));

(function (exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(circulate$1, exports);
__exportStar(forceAsArray$1, exports);
__exportStar(types$2, exports);
__exportStar(getComputedStyle, exports);
__exportStar(getStyle$1, exports);
__exportStar(setStyle$1, exports);
__exportStar(stripUnit, exports);
__exportStar(types$1, exports);
__exportStar(convertUnit, exports);
__exportStar(addClass$1, exports);
__exportStar(addClassIf$1, exports);
__exportStar(hasClass$1, exports);
__exportStar(qs$1, exports);
__exportStar(qsa$1, exports);
__exportStar(removeClass$1, exports);
__exportStar(toggleClass$1, exports);
__exportStar(rangeMap$1, exports);
__exportStar(types, exports);
__exportStar(getDocumentScroll, exports);
__exportStar(getOffsetFromDocument$1, exports);
__exportStar(getOffsetFromViewport$1, exports);
__exportStar(is, exports);

}(dist));

export { dist as d };
//# sourceMappingURL=index-d49f0e1c.js.map
