// In the absence of a WeakSet or WeakMap implementation, don't break, but don't cache either.
function noop$1() {
}
function createWeakMap() {
    if (typeof WeakMap !== "undefined") {
        return new WeakMap();
    }
    else {
        return fakeSetOrMap();
    }
}
/**
 * Creates and returns a no-op implementation of a WeakMap / WeakSet that never stores anything.
 */
function fakeSetOrMap() {
    return {
        add: noop$1,
        delete: noop$1,
        get: noop$1,
        set: noop$1,
        has: function (k) {
            return false;
        },
    };
}
// Safe hasOwnProperty
var hop = Object.prototype.hasOwnProperty;
var has = function (obj, prop) {
    return hop.call(obj, prop);
};
// Copy all own enumerable properties from source to target
function extend$1(target, source) {
    for (var prop in source) {
        if (has(source, prop)) {
            target[prop] = source[prop];
        }
    }
    return target;
}
var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
    // If first interpolated value is a reference to outdent,
    // determine indentation level from the indentation of the interpolated value.
    var indentationLevel = 0;
    var match = strings[0].match(reDetectIndentation);
    if (match) {
        indentationLevel = match[1].length;
    }
    var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
    var reMatchIndent = new RegExp(reSource, "g");
    if (firstInterpolatedValueSetsIndentationLevel) {
        strings = strings.slice(1);
    }
    var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
    var normalizeNewlines = typeof newline === "string";
    var l = strings.length;
    var outdentedStrings = strings.map(function (v, i) {
        // Remove leading indentation from all lines
        v = v.replace(reMatchIndent, "$1");
        // Trim a leading newline from the first string
        if (i === 0 && trimLeadingNewline) {
            v = v.replace(reLeadingNewline, "");
        }
        // Trim a trailing newline from the last string
        if (i === l - 1 && trimTrailingNewline) {
            v = v.replace(reTrailingNewline, "");
        }
        // Normalize newlines
        if (normalizeNewlines) {
            v = v.replace(/\r\n|\n|\r/g, function (_) { return newline; });
        }
        return v;
    });
    return outdentedStrings;
}
function concatStringsAndValues(strings, values) {
    var ret = "";
    for (var i = 0, l = strings.length; i < l; i++) {
        ret += strings[i];
        if (i < l - 1) {
            ret += values[i];
        }
    }
    return ret;
}
function isTemplateStringsArray(v) {
    return has(v, "raw") && has(v, "length");
}
/**
 * It is assumed that opts will not change.  If this is a problem, clone your options object and pass the clone to
 * makeInstance
 * @param options
 * @return {outdent}
 */
function createInstance(options) {
    /** Cache of pre-processed template literal arrays */
    var arrayAutoIndentCache = createWeakMap();
    /**
       * Cache of pre-processed template literal arrays, where first interpolated value is a reference to outdent,
       * before interpolated values are injected.
       */
    var arrayFirstInterpSetsIndentCache = createWeakMap();
    function outdent(stringsOrOptions) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        /* tslint:enable:no-shadowed-variable */
        if (isTemplateStringsArray(stringsOrOptions)) {
            var strings = stringsOrOptions;
            // Is first interpolated value a reference to outdent, alone on its own line, without any preceding non-whitespace?
            var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) &&
                reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) &&
                reStartsWithNewlineOrIsEmpty.test(strings[1]);
            // Perform outdentation
            var cache = firstInterpolatedValueSetsIndentationLevel
                ? arrayFirstInterpSetsIndentCache
                : arrayAutoIndentCache;
            var renderedArray = cache.get(strings);
            if (!renderedArray) {
                renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
                cache.set(strings, renderedArray);
            }
            /** If no interpolated values, skip concatenation step */
            if (values.length === 0) {
                return renderedArray[0];
            }
            /** Concatenate string literals with interpolated values */
            var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
            return rendered;
        }
        else {
            // Create and return a new instance of outdent with the given options
            return createInstance(extend$1(extend$1({}, options), stringsOrOptions || {}));
        }
    }
    var fullOutdent = extend$1(outdent, {
        string: function (str) {
            return _outdentArray([str], false, options)[0];
        },
    });
    return fullOutdent;
}
var defaultOutdent = createInstance({
    trimLeadingNewline: true,
    trimTrailingNewline: true,
});
if (typeof module !== "undefined") {
    // In webpack harmony-modules environments, module.exports is read-only,
    // so we fail gracefully.
    try {
        module.exports = defaultOutdent;
        Object.defineProperty(defaultOutdent, "__esModule", { value: true });
        defaultOutdent.default = defaultOutdent;
        defaultOutdent.outdent = defaultOutdent;
    }
    catch (e) { }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
				var args = [null];
				args.push.apply(args, arguments);
				var Ctor = Function.bind.apply(f, args);
				return new Ctor();
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var accessibility = {
	name: "accessibility",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.923 5.302c.063.063.122.129.178.198H14A.75.75 0 0114 7h-3.3l.578 5.163.362 2.997a.75.75 0 01-1.49.18L9.868 13H6.132l-.282 2.34a.75.75 0 01-1.49-.18l.362-2.997L5.3 7H2a.75.75 0 010-1.5h3.9a2.54 2.54 0 01.176-.198 3 3 0 113.847 0zM9.2 7.073h-.001a1.206 1.206 0 00-2.398 0L6.305 11.5h3.39zM9.5 3a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.923 5.302c.063.063.122.129.178.198H14A.75.75 0 0114 7h-3.3l.578 5.163.362 2.997a.75.75 0 01-1.49.18L9.868 13H6.132l-.282 2.34a.75.75 0 01-1.49-.18l.362-2.997L5.3 7H2a.75.75 0 010-1.5h3.9a2.54 2.54 0 01.176-.198 3 3 0 113.847 0zM9.2 7.073h-.001a1.206 1.206 0 00-2.398 0L6.305 11.5h3.39zM9.5 3a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 3z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var alert = {
	name: "alert",
	keywords: [
		"warning",
		"triangle",
		"exclamation",
		"point"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575zm1.763.707a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368zm.53 3.996v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 011.5 0zM9 11a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575zm1.763.707a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368zm.53 3.996v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 011.5 0zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13 17.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z\"></path><path d=\"M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752zm3.03.751a1.002 1.002 0 00-1.732 0L2.168 19.499A1.002 1.002 0 003.034 21h17.932a1.002 1.002 0 00.866-1.5L12.866 3.994z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13 17.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752zm3.03.751a1.002 1.002 0 00-1.732 0L2.168 19.499A1.002 1.002 0 003.034 21h17.932a1.002 1.002 0 00.866-1.5L12.866 3.994z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var apps = {
	name: "apps",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 015.75 7.5h-2.5A1.75 1.75 0 011.5 5.75zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 018.5 5.75zm-7 7c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75zM3.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5A.25.25 0 006 5.75v-2.5A.25.25 0 005.75 3zm7 0a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm-7 7a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm7 0a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 3.25c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5A1.75 1.75 0 015.75 7.5h-2.5A1.75 1.75 0 011.5 5.75zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5A1.75 1.75 0 018.5 5.75zm-7 7c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75zm7 0c0-.966.784-1.75 1.75-1.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a1.75 1.75 0 01-1.75 1.75h-2.5a1.75 1.75 0 01-1.75-1.75zM3.25 3a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5A.25.25 0 006 5.75v-2.5A.25.25 0 005.75 3zm7 0a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm-7 7a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm7 0a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var archive = {
	name: "archive",
	keywords: [
		"box",
		"catalog"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0114.25 6H1.75A1.75 1.75 0 010 4.25zM1.75 7a.75.75 0 01.75.75v5.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-5.5a.75.75 0 011.5 0v5.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25v-5.5A.75.75 0 011.75 7zm0-4.5a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25zM6.25 8h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0114.25 6H1.75A1.75 1.75 0 010 4.25zM1.75 7a.75.75 0 01.75.75v5.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-5.5a.75.75 0 011.5 0v5.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25v-5.5A.75.75 0 011.75 7zm0-4.5a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25zM6.25 8h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.75 2h18.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0121.25 9H2.75A1.75 1.75 0 011 7.25v-3.5C1 2.784 1.784 2 2.75 2zm18.5 1.5H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25zM2.75 10a.75.75 0 01.75.75v9.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-9.5a.75.75 0 011.5 0v9.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-9.5a.75.75 0 01.75-.75z\"></path><path d=\"M9.75 11.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 2h18.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0121.25 9H2.75A1.75 1.75 0 011 7.25v-3.5C1 2.784 1.784 2 2.75 2zm18.5 1.5H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25zM2.75 10a.75.75 0 01.75.75v9.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-9.5a.75.75 0 011.5 0v9.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-9.5a.75.75 0 01.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.75 11.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var beaker = {
	name: "beaker",
	keywords: [
		"experiment",
		"labs",
		"experimental",
		"feature",
		"test",
		"science",
		"education",
		"study",
		"development",
		"testing"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5 5.782V2.5h-.25a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5H11v3.282l3.666 5.76C15.619 13.04 14.543 15 12.767 15H3.233c-1.776 0-2.852-1.96-1.899-3.458zm-2.4 6.565a.75.75 0 00.633 1.153h9.534a.75.75 0 00.633-1.153L12.225 10.5h-8.45zM9.5 2.5h-3V6c0 .143-.04.283-.117.403L4.73 9h6.54L9.617 6.403A.746.746 0 019.5 6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 5.782V2.5h-.25a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5H11v3.282l3.666 5.76C15.619 13.04 14.543 15 12.767 15H3.233c-1.776 0-2.852-1.96-1.899-3.458zm-2.4 6.565a.75.75 0 00.633 1.153h9.534a.75.75 0 00.633-1.153L12.225 10.5h-8.45zM9.5 2.5h-3V6c0 .143-.04.283-.117.403L4.73 9h6.54L9.617 6.403A.746.746 0 019.5 6z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8 8.807V3.5h-.563a.75.75 0 010-1.5h9.125a.75.75 0 010 1.5H16v5.307l5.125 9.301c.964 1.75-.302 3.892-2.299 3.892H5.174c-1.998 0-3.263-2.142-2.3-3.892zM4.189 18.832a1.123 1.123 0 00.985 1.668h13.652a1.123 1.123 0 00.985-1.668L17.7 15H6.3zM14.5 3.5h-5V9a.75.75 0 01-.093.362L7.127 13.5h9.746l-2.28-4.138A.75.75 0 0114.5 9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 8.807V3.5h-.563a.75.75 0 010-1.5h9.125a.75.75 0 010 1.5H16v5.307l5.125 9.301c.964 1.75-.302 3.892-2.299 3.892H5.174c-1.998 0-3.263-2.142-2.3-3.892zM4.189 18.832a1.123 1.123 0 00.985 1.668h13.652a1.123 1.123 0 00.985-1.668L17.7 15H6.3zM14.5 3.5h-5V9a.75.75 0 01-.093.362L7.127 13.5h9.746l-2.28-4.138A.75.75 0 0114.5 9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var bell = {
	name: "bell",
	keywords: [
		"notification"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0113.482 13H2.518a1.516 1.516 0 01-1.263-2.36l1.703-2.554A.255.255 0 003 7.947zm5-3.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 00-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.745 1.745 0 01-.294-.97V5A3.5 3.5 0 008 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0113.482 13H2.518a1.516 1.516 0 01-1.263-2.36l1.703-2.554A.255.255 0 003 7.947zm5-3.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 00-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.745 1.745 0 01-.294-.97V5A3.5 3.5 0 008 1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1c3.681 0 7 2.565 7 6v4.539c0 .642.189 1.269.545 1.803l2.2 3.298A1.517 1.517 0 0120.482 19H15.5a3.5 3.5 0 11-7 0H3.519a1.518 1.518 0 01-1.265-2.359l2.2-3.299A3.25 3.25 0 005 11.539V7c0-3.435 3.318-6 7-6zM6.5 7v4.539a4.75 4.75 0 01-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001h16.964l.007-.001.006-.004.004-.006.001-.006a.017.017 0 00-.003-.01l-2.199-3.299a4.753 4.753 0 01-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5S6.5 4.636 6.5 7zM14 19h-4a2 2 0 104 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c3.681 0 7 2.565 7 6v4.539c0 .642.189 1.269.545 1.803l2.2 3.298A1.517 1.517 0 0120.482 19H15.5a3.5 3.5 0 11-7 0H3.519a1.518 1.518 0 01-1.265-2.359l2.2-3.299A3.25 3.25 0 005 11.539V7c0-3.435 3.318-6 7-6zM6.5 7v4.539a4.75 4.75 0 01-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001h16.964l.007-.001.006-.004.004-.006.001-.006a.017.017 0 00-.003-.01l-2.199-3.299a4.753 4.753 0 01-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5S6.5 4.636 6.5 7zM14 19h-4a2 2 0 104 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var blocked = {
	name: "blocked",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.467.22a.749.749 0 01.53-.22h6.006c.199 0 .389.079.53.22l4.247 4.247c.141.14.22.331.22.53v6.006a.749.749 0 01-.22.53l-4.247 4.247a.749.749 0 01-.53.22H4.997a.749.749 0 01-.53-.22L.22 11.533a.749.749 0 01-.22-.53V4.997c0-.199.079-.389.22-.53zm.84 1.28L1.5 5.308v5.384L5.308 14.5h5.384l3.808-3.808V5.308L10.692 1.5zM4 7.75A.75.75 0 014.75 7h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 014 7.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.467.22a.749.749 0 01.53-.22h6.006c.199 0 .389.079.53.22l4.247 4.247c.141.14.22.331.22.53v6.006a.749.749 0 01-.22.53l-4.247 4.247a.749.749 0 01-.53.22H4.997a.749.749 0 01-.53-.22L.22 11.533a.749.749 0 01-.22-.53V4.997c0-.199.079-.389.22-.53zm.84 1.28L1.5 5.308v5.384L5.308 14.5h5.384l3.808-3.808V5.308L10.692 1.5zM4 7.75A.75.75 0 014.75 7h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 014 7.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.638 2.22a.749.749 0 01.53-.22h7.664c.199 0 .389.079.53.22l5.418 5.418c.141.14.22.332.22.53v7.664a.749.749 0 01-.22.53l-5.418 5.418a.749.749 0 01-.53.22H8.168a.749.749 0 01-.53-.22l-5.42-5.418a.752.752 0 01-.219-.53V8.168c0-.199.079-.389.22-.53l5.418-5.42zM8.48 3.5L3.5 8.48v7.04l4.98 4.98h7.04l4.98-4.98V8.48L15.52 3.5zM7 11.75a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.638 2.22a.749.749 0 01.53-.22h7.664c.199 0 .389.079.53.22l5.418 5.418c.141.14.22.332.22.53v7.664a.749.749 0 01-.22.53l-5.418 5.418a.749.749 0 01-.53.22H8.168a.749.749 0 01-.53-.22l-5.42-5.418a.752.752 0 01-.219-.53V8.168c0-.199.079-.389.22-.53l5.418-5.42zM8.48 3.5L3.5 8.48v7.04l4.98 4.98h7.04l4.98-4.98V8.48L15.52 3.5zM7 11.75a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var bold = {
	name: "bold",
	keywords: [
		"markdown",
		"bold",
		"text"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 2h4.5a3.501 3.501 0 012.852 5.53A3.499 3.499 0 019.5 14H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 7v3h4.5a1.5 1.5 0 000-3zm3.5-2a1.5 1.5 0 000-3H5v3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 2h4.5a3.501 3.501 0 012.852 5.53A3.499 3.499 0 019.5 14H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 7v3h4.5a1.5 1.5 0 000-3zm3.5-2a1.5 1.5 0 000-3H5v3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.752 4.752 0 013.888 7.479A5 5 0 0114 20.5H7.25c-.69 0-1.25-.56-1.25-1.25zM8.5 13v5H14a2.5 2.5 0 100-5zm0-2.5h3.751A2.25 2.25 0 0012.25 6H8.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 4.75c0-.69.56-1.25 1.25-1.25h5a4.752 4.752 0 013.888 7.479A5 5 0 0114 20.5H7.25c-.69 0-1.25-.56-1.25-1.25zM8.5 13v5H14a2.5 2.5 0 100-5zm0-2.5h3.751A2.25 2.25 0 0012.25 6H8.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var book = {
	name: "book",
	keywords: [
		"book",
		"journal",
		"wiki",
		"readme"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75zm7.251 10.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574zM8.755 4.75l-.004 7.322a3.752 3.752 0 011.992-.572H14.5v-9h-3.495a2.25 2.25 0 00-2.25 2.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75zm7.251 10.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574zM8.755 4.75l-.004 7.322a3.752 3.752 0 011.992-.572H14.5v-9h-3.495a2.25 2.25 0 00-2.25 2.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.495 4.495 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.752.752 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a2.996 2.996 0 00-2.121-.879H.75a.75.75 0 01-.75-.75zm12.75 15.232a4.503 4.503 0 012.823-.971l6.927.047V4.5h-6.75a3 3 0 00-3 3zM11.247 7.497a3 3 0 00-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 3.75A.75.75 0 01.75 3h7.497c1.566 0 2.945.8 3.751 2.014A4.495 4.495 0 0115.75 3h7.5a.75.75 0 01.75.75v15.063a.752.752 0 01-.755.75l-7.682-.052a3 3 0 00-2.142.878l-.89.891a.75.75 0 01-1.061 0l-.902-.901a2.996 2.996 0 00-2.121-.879H.75a.75.75 0 01-.75-.75zm12.75 15.232a4.503 4.503 0 012.823-.971l6.927.047V4.5h-6.75a3 3 0 00-3 3zM11.247 7.497a3 3 0 00-3-2.997H1.5V18h6.947c1.018 0 2.006.346 2.803.98z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var bookmark = {
	name: "bookmark",
	keywords: [
		"tab",
		"star"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 01-1.227.579L8 11.722l-3.773 3.107A.751.751 0 013 14.25zm1.75-.25a.25.25 0 00-.25.25v9.91l3.023-2.489a.75.75 0 01.954 0l3.023 2.49V2.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 2.75C3 1.784 3.784 1 4.75 1h6.5c.966 0 1.75.784 1.75 1.75v11.5a.75.75 0 01-1.227.579L8 11.722l-3.773 3.107A.751.751 0 013 14.25zm1.75-.25a.25.25 0 00-.25.25v9.91l3.023-2.489a.75.75 0 01.954 0l3.023 2.49V2.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.586L12 17.21l-5.781 4.625A.75.75 0 015 21.25zm1.75-.25a.25.25 0 00-.25.25v15.94l5.031-4.026a.749.749 0 01.938 0L17.5 19.69V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.586L12 17.21l-5.781 4.625A.75.75 0 015 21.25zm1.75-.25a.25.25 0 00-.25.25v15.94l5.031-4.026a.749.749 0 01.938 0L17.5 19.69V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var briefcase = {
	name: "briefcase",
	keywords: [
		"suitcase",
		"business"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.75 0h2.5C10.216 0 11 .784 11 1.75V3h3.25c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-8.5C0 3.784.784 3 1.75 3H5V1.75C5 .784 5.784 0 6.75 0zM3.5 9.5a3.49 3.49 0 01-2-.627v4.377c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V8.873a3.49 3.49 0 01-2 .627zm-1.75-5a.25.25 0 00-.25.25V6a2 2 0 002 2h9a2 2 0 002-2V4.75a.25.25 0 00-.25-.25H1.75zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.75 0h2.5C10.216 0 11 .784 11 1.75V3h3.25c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-8.5C0 3.784.784 3 1.75 3H5V1.75C5 .784 5.784 0 6.75 0zM3.5 9.5a3.49 3.49 0 01-2-.627v4.377c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V8.873a3.49 3.49 0 01-2 .627zm-1.75-5a.25.25 0 00-.25.25V6a2 2 0 002 2h9a2 2 0 002-2V4.75a.25.25 0 00-.25-.25H1.75zM9.5 3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25V3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-8.26A4.235 4.235 0 0118.75 13H5.25a4.235 4.235 0 01-2.75-1.01zm19-3.24v-3a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v3a2.75 2.75 0 002.75 2.75h13.5a2.75 2.75 0 002.75-2.75zm-6.5-7a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25V4h6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25v-8.26A4.235 4.235 0 0118.75 13H5.25a4.235 4.235 0 01-2.75-1.01zm19-3.24v-3a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v3a2.75 2.75 0 002.75 2.75h13.5a2.75 2.75 0 002.75-2.75zm-6.5-7a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25V4h6z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var broadcast = {
	name: "broadcast",
	keywords: [
		"rss",
		"radio",
		"signal"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.75 8.582v5.668a.75.75 0 01-1.5 0V8.582a1.75 1.75 0 111.5 0zm3.983-7.125a.75.75 0 011.06.026A7.976 7.976 0 0116 7c0 2.139-.84 4.083-2.207 5.517a.75.75 0 11-1.086-1.034A6.474 6.474 0 0014.5 7a6.474 6.474 0 00-1.793-4.483.75.75 0 01.026-1.06zm-9.466 0c.3.286.312.76.026 1.06A6.474 6.474 0 001.5 7a6.47 6.47 0 001.793 4.483.75.75 0 01-1.086 1.034A7.973 7.973 0 010 7c0-2.139.84-4.083 2.207-5.517a.75.75 0 011.06-.026zm8.556 2.321A4.988 4.988 0 0113 7a4.988 4.988 0 01-1.177 3.222.75.75 0 11-1.146-.967A3.487 3.487 0 0011.5 7c0-.86-.309-1.645-.823-2.255a.75.75 0 011.146-.967zm-6.492.958A3.48 3.48 0 004.5 7a3.48 3.48 0 00.823 2.255.75.75 0 01-1.146.967A4.981 4.981 0 013 7a4.982 4.982 0 011.188-3.236.75.75 0 111.143.972z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 8.582v5.668a.75.75 0 01-1.5 0V8.582a1.75 1.75 0 111.5 0zm3.983-7.125a.75.75 0 011.06.026A7.976 7.976 0 0116 7c0 2.139-.84 4.083-2.207 5.517a.75.75 0 11-1.086-1.034A6.474 6.474 0 0014.5 7a6.474 6.474 0 00-1.793-4.483.75.75 0 01.026-1.06zm-9.466 0c.3.286.312.76.026 1.06A6.474 6.474 0 001.5 7a6.47 6.47 0 001.793 4.483.75.75 0 01-1.086 1.034A7.973 7.973 0 010 7c0-2.139.84-4.083 2.207-5.517a.75.75 0 011.06-.026zm8.556 2.321A4.988 4.988 0 0113 7a4.988 4.988 0 01-1.177 3.222.75.75 0 11-1.146-.967A3.487 3.487 0 0011.5 7c0-.86-.309-1.645-.823-2.255a.75.75 0 011.146-.967zm-6.492.958A3.48 3.48 0 004.5 7a3.48 3.48 0 00.823 2.255.75.75 0 01-1.146.967A4.981 4.981 0 013 7a4.982 4.982 0 011.188-3.236.75.75 0 111.143.972z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20.485 2.515a.75.75 0 00-1.06 1.06A10.465 10.465 0 0122.5 11c0 2.9-1.174 5.523-3.075 7.424a.75.75 0 001.06 1.061A11.965 11.965 0 0024 11c0-3.314-1.344-6.315-3.515-8.485zm-15.91 1.06a.75.75 0 00-1.06-1.06A11.965 11.965 0 000 11c0 3.313 1.344 6.314 3.515 8.485a.75.75 0 001.06-1.06A10.465 10.465 0 011.5 11c0-2.9 1.174-5.524 3.075-7.425zM8.11 7.11a.75.75 0 00-1.06-1.06A6.98 6.98 0 005 11a6.98 6.98 0 002.05 4.95.75.75 0 001.06-1.061 5.48 5.48 0 01-1.61-3.89 5.48 5.48 0 011.61-3.888zm8.84-1.06a.75.75 0 10-1.06 1.06A5.48 5.48 0 0117.5 11a5.48 5.48 0 01-1.61 3.889.75.75 0 101.06 1.06A6.98 6.98 0 0019 11a6.98 6.98 0 00-2.05-4.949zM14 11a2 2 0 01-1.25 1.855v8.395a.75.75 0 01-1.5 0v-8.395A2 2 0 1114 11z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20.485 2.515a.75.75 0 00-1.06 1.06A10.465 10.465 0 0122.5 11c0 2.9-1.174 5.523-3.075 7.424a.75.75 0 001.06 1.061A11.965 11.965 0 0024 11c0-3.314-1.344-6.315-3.515-8.485zm-15.91 1.06a.75.75 0 00-1.06-1.06A11.965 11.965 0 000 11c0 3.313 1.344 6.314 3.515 8.485a.75.75 0 001.06-1.06A10.465 10.465 0 011.5 11c0-2.9 1.174-5.524 3.075-7.425zM8.11 7.11a.75.75 0 00-1.06-1.06A6.98 6.98 0 005 11a6.98 6.98 0 002.05 4.95.75.75 0 001.06-1.061 5.48 5.48 0 01-1.61-3.89 5.48 5.48 0 011.61-3.888zm8.84-1.06a.75.75 0 10-1.06 1.06A5.48 5.48 0 0117.5 11a5.48 5.48 0 01-1.61 3.889.75.75 0 101.06 1.06A6.98 6.98 0 0019 11a6.98 6.98 0 00-2.05-4.949zM14 11a2 2 0 01-1.25 1.855v8.395a.75.75 0 01-1.5 0v-8.395A2 2 0 1114 11z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var browser = {
	name: "browser",
	keywords: [
		"window",
		"web"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zM14.5 6h-13v7.25c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25zm-6-3.5v2h6V2.75a.25.25 0 00-.25-.25zM5 2.5v2h2v-2zm-3.25 0a.25.25 0 00-.25.25V4.5h2v-2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zM14.5 6h-13v7.25c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25zm-6-3.5v2h6V2.75a.25.25 0 00-.25-.25zM5 2.5v2h2v-2zm-3.25 0a.25.25 0 00-.25.25V4.5h2v-2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M0 3.75C0 2.784.784 2 1.75 2h20.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0122.25 22H1.75A1.75 1.75 0 010 20.25zM22.5 7h-21v13.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25zm-10-3.5v2h10V3.75a.25.25 0 00-.25-.25zM7 3.5v2h4v-2zm-5.25 0a.25.25 0 00-.25.25V5.5h4v-2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 3.75C0 2.784.784 2 1.75 2h20.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0122.25 22H1.75A1.75 1.75 0 010 20.25zM22.5 7h-21v13.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25zm-10-3.5v2h10V3.75a.25.25 0 00-.25-.25zM7 3.5v2h4v-2zm-5.25 0a.25.25 0 00-.25.25V5.5h4v-2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var bug = {
	name: "bug",
	keywords: [
		"insect",
		"issue"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.72.22a.75.75 0 011.06 0l1 .999a3.488 3.488 0 012.441 0l.999-1a.748.748 0 011.265.332.75.75 0 01-.205.729l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 01.556 1.392L13 7.258V9h2.25a.75.75 0 010 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 01-.557 1.392l-2.184-.873A4.997 4.997 0 018 16a4.997 4.997 0 01-4.288-2.427l-2.183.873a.75.75 0 01-.558-1.392l2.17-.868A5.036 5.036 0 013 11v-.5H.75a.75.75 0 010-1.5H3V7.258L.971 6.446a.75.75 0 01.558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.677 1.677 0 01-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 010-1.06zm.53 6.28a.75.75 0 00-.75.75V11a3.5 3.5 0 107 0V7.25a.75.75 0 00-.75-.75zM6.173 5h3.654A.172.172 0 0010 4.827V4.5a2 2 0 10-4 0v.327c0 .096.077.173.173.173z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.72.22a.75.75 0 011.06 0l1 .999a3.488 3.488 0 012.441 0l.999-1a.748.748 0 011.265.332.75.75 0 01-.205.729l-.775.776c.616.63.995 1.493.995 2.444v.327c0 .1-.009.197-.025.292.408.14.764.392 1.029.722l1.968-.787a.75.75 0 01.556 1.392L13 7.258V9h2.25a.75.75 0 010 1.5H13v.5c0 .409-.049.806-.141 1.186l2.17.868a.75.75 0 01-.557 1.392l-2.184-.873A4.997 4.997 0 018 16a4.997 4.997 0 01-4.288-2.427l-2.183.873a.75.75 0 01-.558-1.392l2.17-.868A5.036 5.036 0 013 11v-.5H.75a.75.75 0 010-1.5H3V7.258L.971 6.446a.75.75 0 01.558-1.392l1.967.787c.265-.33.62-.583 1.03-.722a1.677 1.677 0 01-.026-.292V4.5c0-.951.38-1.814.995-2.444L4.72 1.28a.75.75 0 010-1.06zm.53 6.28a.75.75 0 00-.75.75V11a3.5 3.5 0 107 0V7.25a.75.75 0 00-.75-.75zM6.173 5h3.654A.172.172 0 0010 4.827V4.5a2 2 0 10-4 0v.327c0 .096.077.173.173.173z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.72.22a.75.75 0 011.06 0l1.204 1.203A4.98 4.98 0 0112 1c.717 0 1.4.151 2.016.423L15.22.22a.751.751 0 011.042.018.751.751 0 01.018 1.042l-.971.972A4.991 4.991 0 0117 6v1.104a2.755 2.755 0 011.917 1.974l1.998-.999a.75.75 0 01.67 1.342L19 10.714V13.5l3.25.003a.75.75 0 010 1.5L19 15.001V16c0 .568-.068 1.134-.204 1.686l.04.018 2.75 1.375a.75.75 0 11-.671 1.342l-2.638-1.319A6.998 6.998 0 0112 23a6.998 6.998 0 01-6.197-3.742l-2.758 1.181a.752.752 0 01-1.064-.776.752.752 0 01.474-.602l2.795-1.199A6.976 6.976 0 015 16v-.996H1.75a.75.75 0 010-1.5H5v-2.79L2.415 9.42a.75.75 0 01.67-1.342l1.998.999A2.756 2.756 0 017 7.104V6a4.99 4.99 0 011.69-3.748l-.97-.972a.75.75 0 010-1.06zM6.5 9.75V16a5.5 5.5 0 1011 0V9.75c0-.69-.56-1.25-1.25-1.25h-8.5c-.69 0-1.25.56-1.25 1.25zM8.5 7h7V6a3.5 3.5 0 10-7 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.72.22a.75.75 0 011.06 0l1.204 1.203A4.98 4.98 0 0112 1c.717 0 1.4.151 2.016.423L15.22.22a.751.751 0 011.042.018.751.751 0 01.018 1.042l-.971.972A4.991 4.991 0 0117 6v1.104a2.755 2.755 0 011.917 1.974l1.998-.999a.75.75 0 01.67 1.342L19 10.714V13.5l3.25.003a.75.75 0 010 1.5L19 15.001V16c0 .568-.068 1.134-.204 1.686l.04.018 2.75 1.375a.75.75 0 11-.671 1.342l-2.638-1.319A6.998 6.998 0 0112 23a6.998 6.998 0 01-6.197-3.742l-2.758 1.181a.752.752 0 01-1.064-.776.752.752 0 01.474-.602l2.795-1.199A6.976 6.976 0 015 16v-.996H1.75a.75.75 0 010-1.5H5v-2.79L2.415 9.42a.75.75 0 01.67-1.342l1.998.999A2.756 2.756 0 017 7.104V6a4.99 4.99 0 011.69-3.748l-.97-.972a.75.75 0 010-1.06zM6.5 9.75V16a5.5 5.5 0 1011 0V9.75c0-.69-.56-1.25-1.25-1.25h-8.5c-.69 0-1.25.56-1.25 1.25zM8.5 7h7V6a3.5 3.5 0 10-7 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var cache = {
	name: "cache",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.5 5.724V8c0 .248.238.7 1.169 1.159.874.43 2.144.745 3.62.822a.75.75 0 11-.078 1.498c-1.622-.085-3.102-.432-4.204-.975a5.565 5.565 0 01-.507-.28V12.5c0 .133.058.318.282.551.227.237.591.483 1.101.707 1.015.447 2.47.742 4.117.742.406 0 .802-.018 1.183-.052a.751.751 0 11.134 1.494C8.89 15.98 8.45 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.619-1.579-1.041-.408-.425-.7-.964-.7-1.59v-9c0-.626.292-1.165.7-1.591.406-.42.956-.766 1.579-1.04C4.525.32 6.195 0 8 0c1.806 0 3.476.32 4.721.869.623.274 1.173.619 1.579 1.041.408.425.7.964.7 1.59 0 .626-.292 1.165-.7 1.591-.406.42-.956.766-1.578 1.04C11.475 6.68 9.805 7 8 7c-1.805 0-3.475-.32-4.721-.869a6.15 6.15 0 01-.779-.407zm0-2.224c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.471-1.1.708-.224.232-.282.417-.282.55z\"></path><path d=\"M14.49 7.582a.375.375 0 00-.66-.313l-3.625 4.625a.375.375 0 00.295.606h2.127l-.619 2.922a.375.375 0 00.666.304l3.125-4.125A.375.375 0 0015.5 11h-1.778l.769-3.418z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 5.724V8c0 .248.238.7 1.169 1.159.874.43 2.144.745 3.62.822a.75.75 0 11-.078 1.498c-1.622-.085-3.102-.432-4.204-.975a5.565 5.565 0 01-.507-.28V12.5c0 .133.058.318.282.551.227.237.591.483 1.101.707 1.015.447 2.47.742 4.117.742.406 0 .802-.018 1.183-.052a.751.751 0 11.134 1.494C8.89 15.98 8.45 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.619-1.579-1.041-.408-.425-.7-.964-.7-1.59v-9c0-.626.292-1.165.7-1.591.406-.42.956-.766 1.579-1.04C4.525.32 6.195 0 8 0c1.806 0 3.476.32 4.721.869.623.274 1.173.619 1.579 1.041.408.425.7.964.7 1.59 0 .626-.292 1.165-.7 1.591-.406.42-.956.766-1.578 1.04C11.475 6.68 9.805 7 8 7c-1.805 0-3.475-.32-4.721-.869a6.15 6.15 0 01-.779-.407zm0-2.224c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.471-1.1.708-.224.232-.282.417-.282.55z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.49 7.582a.375.375 0 00-.66-.313l-3.625 4.625a.375.375 0 00.295.606h2.127l-.619 2.922a.375.375 0 00.666.304l3.125-4.125A.375.375 0 0015.5 11h-1.778l.769-3.418z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var calendar = {
	name: "calendar",
	keywords: [
		"time",
		"day",
		"month",
		"year",
		"date",
		"appointment"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zM2.5 7.5v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5zm10.75-4H2.75a.25.25 0 00-.25.25V6h11V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zM2.5 7.5v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5zm10.75-4H2.75a.25.25 0 00-.25.25V6h11V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6.75 0a.75.75 0 01.75.75V3h9V.75a.75.75 0 011.5 0V3h2.75c.966 0 1.75.784 1.75 1.75v16a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75v-16C1.5 3.784 2.284 3 3.25 3H6V.75A.75.75 0 016.75 0zM21 9.5H3v11.25c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25zm-17.75-5a.25.25 0 00-.25.25V8h18V4.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.75 0a.75.75 0 01.75.75V3h9V.75a.75.75 0 011.5 0V3h2.75c.966 0 1.75.784 1.75 1.75v16a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75v-16C1.5 3.784 2.284 3 3.25 3H6V.75A.75.75 0 016.75 0zM21 9.5H3v11.25c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25zm-17.75-5a.25.25 0 00-.25.25V8h18V4.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var check = {
	name: "check",
	keywords: [
		"mark",
		"yes",
		"confirm",
		"accept",
		"ok",
		"success"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L6 10.94l6.72-6.72a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M21.03 5.72a.75.75 0 010 1.06l-11.5 11.5a.747.747 0 01-1.072-.012l-5.5-5.75a.75.75 0 111.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M21.03 5.72a.75.75 0 010 1.06l-11.5 11.5a.747.747 0 01-1.072-.012l-5.5-5.75a.75.75 0 111.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var checkbox = {
	name: "checkbox",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.5 2.75v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25zm9.28 3.53l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.5 2.75v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25zm9.28 3.53l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z\"></path><path d=\"M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H3.75a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H3.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var checklist = {
	name: "checklist",
	keywords: [
		"todo",
		"tasks"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 010 1.5H2.75A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 01-1.5 0V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zm13.274 9.537v-.001l-4.557 4.45a.75.75 0 01-1.055-.008l-1.943-1.95a.75.75 0 011.062-1.058l1.419 1.425 4.026-3.932a.75.75 0 111.048 1.074zM4.75 4h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM4 7.75A.75.75 0 014.75 7h2a.75.75 0 010 1.5h-2A.75.75 0 014 7.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 010 1.5H2.75A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 01-1.5 0V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zm13.274 9.537v-.001l-4.557 4.45a.75.75 0 01-1.055-.008l-1.943-1.95a.75.75 0 011.062-1.058l1.419 1.425 4.026-3.932a.75.75 0 111.048 1.074zM4.75 4h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM4 7.75A.75.75 0 014.75 7h2a.75.75 0 010 1.5h-2A.75.75 0 014 7.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z\"></path><path d=\"M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var circle = {
	name: "circle",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5A9.5 9.5 0 002.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5A9.5 9.5 0 002.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var clock = {
	name: "clock",
	keywords: [
		"time",
		"hour",
		"minute",
		"second",
		"watch"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm7-3.25v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.751.751 0 017 8.25v-3.5a.75.75 0 011.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm7-3.25v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.751.751 0 017 8.25v-3.5a.75.75 0 011.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var cloud = {
	name: "cloud",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 7.25A5.225 5.225 0 017.25 2a5.222 5.222 0 014.767 3.029A4.472 4.472 0 0116 9.5c0 2.505-1.995 4.5-4.5 4.5h-8A3.474 3.474 0 010 10.5c0-1.41.809-2.614 2.001-3.17zm1.54.482a.75.75 0 01-.556.832c-.86.22-1.484.987-1.484 1.936 0 1.124.876 2 2 2h8c1.676 0 3-1.324 3-3s-1.324-3-3-3a.75.75 0 01-.709-.504A3.72 3.72 0 007.25 3.5C5.16 3.5 3.5 5.16 3.5 7.25c.002.146.014.292.035.436l.004.036.001.008z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 7.25A5.225 5.225 0 017.25 2a5.222 5.222 0 014.767 3.029A4.472 4.472 0 0116 9.5c0 2.505-1.995 4.5-4.5 4.5h-8A3.474 3.474 0 010 10.5c0-1.41.809-2.614 2.001-3.17zm1.54.482a.75.75 0 01-.556.832c-.86.22-1.484.987-1.484 1.936 0 1.124.876 2 2 2h8c1.676 0 3-1.324 3-3s-1.324-3-3-3a.75.75 0 01-.709-.504A3.72 3.72 0 007.25 3.5C5.16 3.5 3.5 5.16 3.5 7.25c.002.146.014.292.035.436l.004.036.001.008z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.103 10.107c0-4.244 3.445-7.607 7.733-7.607 3.19 0 5.912 1.858 7.099 4.563l.01.022.001.006C21.348 7.345 24 10.095 24 13.536 24 17.148 21.076 20 17.431 20H5.017C2.23 20 0 17.83 0 15.06a4.899 4.899 0 013.112-4.581 7.696 7.696 0 01-.009-.372zM10.836 4c-3.485 0-6.233 2.717-6.233 6.107 0 .284.022.602.052.756a.75.75 0 01-.552.869c-1.52.385-2.603 1.712-2.603 3.328 0 1.917 1.532 3.44 3.517 3.44h12.414c2.843 0 5.069-2.206 5.069-4.964 0-2.759-2.226-4.965-5.069-4.965a.75.75 0 01-.696-.47l-.179-.446C15.606 5.5 13.424 4 10.836 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.103 10.107c0-4.244 3.445-7.607 7.733-7.607 3.19 0 5.912 1.858 7.099 4.563l.01.022.001.006C21.348 7.345 24 10.095 24 13.536 24 17.148 21.076 20 17.431 20H5.017C2.23 20 0 17.83 0 15.06a4.899 4.899 0 013.112-4.581 7.696 7.696 0 01-.009-.372zM10.836 4c-3.485 0-6.233 2.717-6.233 6.107 0 .284.022.602.052.756a.75.75 0 01-.552.869c-1.52.385-2.603 1.712-2.603 3.328 0 1.917 1.532 3.44 3.517 3.44h12.414c2.843 0 5.069-2.206 5.069-4.964 0-2.759-2.226-4.965-5.069-4.965a.75.75 0 01-.696-.47l-.179-.446C15.606 5.5 13.424 4 10.836 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var code = {
	name: "code",
	keywords: [
		"brackets"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.28 3.22l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L13.94 8l-3.72-3.72a.749.749 0 01.326-1.275.749.749 0 01.734.215zm-6.56 0a.751.751 0 011.042.018.751.751 0 01.018 1.042L2.06 8l3.72 3.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L.47 8.53a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.28 3.22l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L13.94 8l-3.72-3.72a.749.749 0 01.326-1.275.749.749 0 01.734.215zm-6.56 0a.751.751 0 011.042.018.751.751 0 01.018 1.042L2.06 8l3.72 3.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L.47 8.53a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.22 4.97a.75.75 0 011.06 0l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L21.19 12l-5.97-5.97a.75.75 0 010-1.06zm-6.44 0a.75.75 0 010 1.06L2.81 12l5.97 5.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-6.5-6.5a.75.75 0 010-1.06l6.5-6.5a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.22 4.97a.75.75 0 011.06 0l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L21.19 12l-5.97-5.97a.75.75 0 010-1.06zm-6.44 0a.75.75 0 010 1.06L2.81 12l5.97 5.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-6.5-6.5a.75.75 0 010-1.06l6.5-6.5a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var codescan = {
	name: "codescan",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.47 4.97a.75.75 0 000 1.06L9.94 7.5 8.47 8.97a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.53 6.03a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.06 7.5l1.47-1.47z\"></path><path d=\"M12.246 13.307a7.501 7.501 0 111.06-1.06l2.474 2.473a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215zM1.5 7.5a6.002 6.002 0 003.608 5.504 6.002 6.002 0 006.486-1.117.748.748 0 01.292-.293A6 6 0 101.5 7.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.47 4.97a.75.75 0 000 1.06L9.94 7.5 8.47 8.97a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.53 6.03a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.06 7.5l1.47-1.47z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.246 13.307a7.501 7.501 0 111.06-1.06l2.474 2.473a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215zM1.5 7.5a6.002 6.002 0 003.608 5.504 6.002 6.002 0 006.486-1.117.748.748 0 01.292-.293A6 6 0 101.5 7.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.97 6.97a.75.75 0 000 1.06l2.47 2.47-2.47 2.47a.75.75 0 101.06 1.06l3-3a.75.75 0 000-1.06l-3-3a.75.75 0 00-1.06 0zM9.03 8.03a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3a.75.75 0 001.06-1.06L6.56 10.5l2.47-2.47z\"></path><path d=\"M10.5 0C16.299 0 21 4.701 21 10.5a10.457 10.457 0 01-2.564 6.875l4.344 4.345a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-4.345-4.344A10.459 10.459 0 0110.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0zm-9 10.5a9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9 9 9 0 00-9 9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.97 6.97a.75.75 0 000 1.06l2.47 2.47-2.47 2.47a.75.75 0 101.06 1.06l3-3a.75.75 0 000-1.06l-3-3a.75.75 0 00-1.06 0zM9.03 8.03a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3a.75.75 0 001.06-1.06L6.56 10.5l2.47-2.47z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.5 0C16.299 0 21 4.701 21 10.5a10.457 10.457 0 01-2.564 6.875l4.344 4.345a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-4.345-4.344A10.459 10.459 0 0110.5 21C4.701 21 0 16.299 0 10.5S4.701 0 10.5 0zm-9 10.5a9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9 9 9 0 00-9 9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var codespaces = {
	name: "codespaces",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 11.25c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v3A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm2-9.5C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v5a1.75 1.75 0 01-1.75 1.75h-8.5A1.75 1.75 0 012 6.75zm1.75-.25a.25.25 0 00-.25.25v5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-5a.25.25 0 00-.25-.25zm-2 9.5a.25.25 0 00-.25.25v3c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-3a.25.25 0 00-.25-.25z\"></path><path d=\"M7 12.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm-4 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 11.25c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v3A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm2-9.5C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v5a1.75 1.75 0 01-1.75 1.75h-8.5A1.75 1.75 0 012 6.75zm1.75-.25a.25.25 0 00-.25.25v5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-5a.25.25 0 00-.25-.25zm-2 9.5a.25.25 0 00-.25.25v3c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-3a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7 12.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm-4 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.5 3.75C3.5 2.784 4.284 2 5.25 2h13.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0118.75 13H5.25a1.75 1.75 0 01-1.75-1.75zm-2 12c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v4a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75zM5.25 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h13.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25zm-2 12a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25z\"></path><path d=\"M10 17.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm-4 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.5 3.75C3.5 2.784 4.284 2 5.25 2h13.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0118.75 13H5.25a1.75 1.75 0 01-1.75-1.75zm-2 12c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v4a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75zM5.25 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h13.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25zm-2 12a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10 17.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm-4 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var columns = {
	name: "columns",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 0h2.5C6.216 0 7 .784 7 1.75v12.5A1.75 1.75 0 015.25 16h-2.5A1.75 1.75 0 011 14.25V1.75C1 .784 1.784 0 2.75 0zm8 0h2.5C14.216 0 15 .784 15 1.75v12.5A1.75 1.75 0 0113.25 16h-2.5A1.75 1.75 0 019 14.25V1.75C9 .784 9.784 0 10.75 0zM2.5 1.75v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25zm8 0v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 0h2.5C6.216 0 7 .784 7 1.75v12.5A1.75 1.75 0 015.25 16h-2.5A1.75 1.75 0 011 14.25V1.75C1 .784 1.784 0 2.75 0zm8 0h2.5C14.216 0 15 .784 15 1.75v12.5A1.75 1.75 0 0113.25 16h-2.5A1.75 1.75 0 019 14.25V1.75C9 .784 9.784 0 10.75 0zM2.5 1.75v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25zm8 0v12.5c0 .138.112.25.25.25h2.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.75 2h5.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 019.25 22h-5.5A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zm11 0h5.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22h-5.5A1.75 1.75 0 0113 20.25V3.75c0-.966.784-1.75 1.75-1.75zM3.5 3.75v16.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25zm11 0v16.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h5.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 019.25 22h-5.5A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zm11 0h5.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22h-5.5A1.75 1.75 0 0113 20.25V3.75c0-.966.784-1.75 1.75-1.75zM3.5 3.75v16.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25zm11 0v16.5c0 .138.112.25.25.25h5.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var comment = {
	name: "comment",
	keywords: [
		"speak",
		"bubble"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.458 1.458 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.458 1.458 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.749.749 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.749.749 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var commit = {
	name: "commit",
	keywords: [
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M0 11.75A.75.75 0 01.75 11h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm17.5 0a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75z\"></path><path d=\"M12 17.75a6 6 0 110-12 6 6 0 010 12zm0-1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 11.75A.75.75 0 01.75 11h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm17.5 0a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 17.75a6 6 0 110-12 6 6 0 010 12zm0-1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var container = {
	name: "container",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.41.24l4.711 2.774c.544.316.878.897.879 1.526v5.01a1.77 1.77 0 01-.88 1.53l-7.753 4.521-.002.001a1.769 1.769 0 01-1.774 0H5.59L.873 12.85A1.761 1.761 0 010 11.327V6.292c0-.304.078-.598.22-.855l.004-.005.01-.019c.15-.262.369-.486.64-.643L8.641.239a1.752 1.752 0 011.765 0l.002.001zM9.397 1.534l-7.17 4.182 4.116 2.388a.27.27 0 00.269 0l7.152-4.148-4.115-2.422a.252.252 0 00-.252 0zm-7.768 10.02l4.1 2.393V9.474a1.807 1.807 0 01-.138-.072L1.5 7.029v4.298c0 .095.05.181.129.227zm8.6.642l1.521-.887v-4.45l-1.521.882zM7.365 9.402h.001c-.044.026-.09.049-.136.071v4.472l1.5-.875V8.61zm5.885 1.032l1.115-.65h.002a.267.267 0 00.133-.232V5.264l-1.25.725z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.41.24l4.711 2.774c.544.316.878.897.879 1.526v5.01a1.77 1.77 0 01-.88 1.53l-7.753 4.521-.002.001a1.769 1.769 0 01-1.774 0H5.59L.873 12.85A1.761 1.761 0 010 11.327V6.292c0-.304.078-.598.22-.855l.004-.005.01-.019c.15-.262.369-.486.64-.643L8.641.239a1.752 1.752 0 011.765 0l.002.001zM9.397 1.534l-7.17 4.182 4.116 2.388a.27.27 0 00.269 0l7.152-4.148-4.115-2.422a.252.252 0 00-.252 0zm-7.768 10.02l4.1 2.393V9.474a1.807 1.807 0 01-.138-.072L1.5 7.029v4.298c0 .095.05.181.129.227zm8.6.642l1.521-.887v-4.45l-1.521.882zM7.365 9.402h.001c-.044.026-.09.049-.136.071v4.472l1.5-.875V8.61zm5.885 1.032l1.115-.65h.002a.267.267 0 00.133-.232V5.264l-1.25.725z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13.152.682a2.251 2.251 0 012.269 0l.007.004 6.957 4.276a2.277 2.277 0 011.126 1.964v7.516c0 .81-.432 1.56-1.133 1.968l-.002.001-11.964 7.037-.004.003c-.706.41-1.578.41-2.284 0l-.026-.015-6.503-4.502a2.268 2.268 0 01-1.096-1.943V9.438c0-.392.1-.77.284-1.1l.003-.006.014-.026c.197-.342.48-.627.82-.827h.002L13.152.681zm.757 1.295h-.001L2.648 8.616l6.248 4.247a.775.775 0 00.758-.01h.001l11.633-6.804-6.629-4.074a.75.75 0 00-.75.003zM8.517 14.33a2.286 2.286 0 01-.393-.18l-.023-.014-6.102-4.147v7.003c0 .275.145.528.379.664l.025.014 6.114 4.232V14.33zM18 9.709l-3.25 1.9v7.548L18 17.245zm-7.59 4.438l-.002.002a2.296 2.296 0 01-.391.18v7.612l3.233-1.902v-7.552zm9.09-5.316v7.532l2.124-1.25a.776.776 0 00.387-.671V7.363z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.152.682a2.251 2.251 0 012.269 0l.007.004 6.957 4.276a2.277 2.277 0 011.126 1.964v7.516c0 .81-.432 1.56-1.133 1.968l-.002.001-11.964 7.037-.004.003c-.706.41-1.578.41-2.284 0l-.026-.015-6.503-4.502a2.268 2.268 0 01-1.096-1.943V9.438c0-.392.1-.77.284-1.1l.003-.006.014-.026c.197-.342.48-.627.82-.827h.002L13.152.681zm.757 1.295h-.001L2.648 8.616l6.248 4.247a.775.775 0 00.758-.01h.001l11.633-6.804-6.629-4.074a.75.75 0 00-.75.003zM8.517 14.33a2.286 2.286 0 01-.393-.18l-.023-.014-6.102-4.147v7.003c0 .275.145.528.379.664l.025.014 6.114 4.232V14.33zM18 9.709l-3.25 1.9v7.548L18 17.245zm-7.59 4.438l-.002.002a2.296 2.296 0 01-.391.18v7.612l3.233-1.902v-7.552zm9.09-5.316v7.532l2.124-1.25a.776.776 0 00.387-.671V7.363z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var copilot = {
	name: "copilot",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.25 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.25 9zm4.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z\"></path><path d=\"M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0116 9.736V11c0 .24-.086.438-.156.567-.073.131-.16.253-.259.366-.18.21-.404.413-.605.58a10.19 10.19 0 01-.792.597l-.015.01-.006.004-.028.018a8.849 8.849 0 01-.456.281c-.307.177-.749.41-1.296.642C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.472-4.387-.935a12.28 12.28 0 01-1.296-.641 8.849 8.849 0 01-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 01-.792-.596 5.264 5.264 0 01-.605-.58 2.133 2.133 0 01-.259-.367A1.189 1.189 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765zM3 7.824v4.261c.02.013.043.025.065.038.264.152.65.356 1.134.562.972.412 2.307.815 3.801.815 1.494 0 2.83-.403 3.8-.815.412-.174.813-.375 1.2-.6v-4.26l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.06-.328-2.71-.991A3.233 3.233 0 018 6.266c-.144.269-.321.52-.54.743C6.81 7.672 5.896 8 4.75 8c-.652 0-1.236-.082-1.726-.291L3 7.824zm6.237-5.031c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298zm-2.472 0c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.25 9a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.25 9zm4.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0116 9.736V11c0 .24-.086.438-.156.567-.073.131-.16.253-.259.366-.18.21-.404.413-.605.58a10.19 10.19 0 01-.792.597l-.015.01-.006.004-.028.018a8.849 8.849 0 01-.456.281c-.307.177-.749.41-1.296.642C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.472-4.387-.935a12.28 12.28 0 01-1.296-.641 8.849 8.849 0 01-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 01-.792-.596 5.264 5.264 0 01-.605-.58 2.133 2.133 0 01-.259-.367A1.189 1.189 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765zM3 7.824v4.261c.02.013.043.025.065.038.264.152.65.356 1.134.562.972.412 2.307.815 3.801.815 1.494 0 2.83-.403 3.8-.815.412-.174.813-.375 1.2-.6v-4.26l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.06-.328-2.71-.991A3.233 3.233 0 018 6.266c-.144.269-.321.52-.54.743C6.81 7.672 5.896 8 4.75 8c-.652 0-1.236-.082-1.726-.291L3 7.824zm6.237-5.031c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298zm-2.472 0c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.75 14a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z\"></path><path d=\"M12 2c2.214 0 4.248.657 5.747 1.756.136.099.268.204.397.312.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086l.633 1.478.043.022A4.75 4.75 0 0124 15.222v1.028c0 .529-.309.987-.565 1.293-.28.336-.636.653-.966.918a13.84 13.84 0 01-1.299.911l-.024.015-.006.004-.039.025c-.223.135-.45.264-.68.386-.46.245-1.122.571-1.941.895C16.845 21.344 14.561 22 12 22c-2.561 0-4.845-.656-6.479-1.303a19.046 19.046 0 01-1.942-.894 14.081 14.081 0 01-.535-.3l-.144-.087-.04-.025-.006-.004-.024-.015a13.16 13.16 0 01-1.299-.911 6.913 6.913 0 01-.967-.918C.31 17.237 0 16.779 0 16.25v-1.028a4.75 4.75 0 012.626-4.248l.043-.022.633-1.478a10.195 10.195 0 01-.052-1.086c0-1.331.282-2.498 1.132-3.368.397-.406.89-.717 1.474-.952.129-.108.261-.213.397-.312C7.752 2.657 9.786 2 12 2zm-8 9.654v6.669a17.59 17.59 0 002.073.98C7.595 19.906 9.686 20.5 12 20.5c2.314 0 4.405-.594 5.927-1.197a17.59 17.59 0 002.073-.98v-6.669l-.038-.09c-.046.061-.095.12-.145.177-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.544-3.508-1.492a4.323 4.323 0 01-.355-.508h-.344a4.323 4.323 0 01-.355.508C10.704 12.456 9.555 13 7.965 13c-1.725 0-2.989-.359-3.782-1.259a3.026 3.026 0 01-.145-.177zm6.309-1.092c.445-.547.708-1.334.851-2.301.057-.357.087-.718.09-1.079v-.031c-.001-.762-.166-1.26-.43-1.568l-.008-.01c-.341-.391-1.046-.689-2.533-.529-1.505.163-2.347.537-2.824 1.024-.462.473-.705 1.18-.705 2.32 0 .605.044 1.087.135 1.472.092.384.231.672.423.89.365.413 1.084.75 2.657.75.91 0 1.527-.223 1.964-.564.14-.11.268-.235.38-.374zm2.504-2.497c.136 1.057.403 1.913.878 2.497.442.545 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.151.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.318-.862-2.824-1.025-1.487-.161-2.192.139-2.533.529-.268.308-.437.808-.438 1.578v.02c.002.299.023.598.063.894z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.75 14a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 2c2.214 0 4.248.657 5.747 1.756.136.099.268.204.397.312.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086l.633 1.478.043.022A4.75 4.75 0 0124 15.222v1.028c0 .529-.309.987-.565 1.293-.28.336-.636.653-.966.918a13.84 13.84 0 01-1.299.911l-.024.015-.006.004-.039.025c-.223.135-.45.264-.68.386-.46.245-1.122.571-1.941.895C16.845 21.344 14.561 22 12 22c-2.561 0-4.845-.656-6.479-1.303a19.046 19.046 0 01-1.942-.894 14.081 14.081 0 01-.535-.3l-.144-.087-.04-.025-.006-.004-.024-.015a13.16 13.16 0 01-1.299-.911 6.913 6.913 0 01-.967-.918C.31 17.237 0 16.779 0 16.25v-1.028a4.75 4.75 0 012.626-4.248l.043-.022.633-1.478a10.195 10.195 0 01-.052-1.086c0-1.331.282-2.498 1.132-3.368.397-.406.89-.717 1.474-.952.129-.108.261-.213.397-.312C7.752 2.657 9.786 2 12 2zm-8 9.654v6.669a17.59 17.59 0 002.073.98C7.595 19.906 9.686 20.5 12 20.5c2.314 0 4.405-.594 5.927-1.197a17.59 17.59 0 002.073-.98v-6.669l-.038-.09c-.046.061-.095.12-.145.177-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.544-3.508-1.492a4.323 4.323 0 01-.355-.508h-.344a4.323 4.323 0 01-.355.508C10.704 12.456 9.555 13 7.965 13c-1.725 0-2.989-.359-3.782-1.259a3.026 3.026 0 01-.145-.177zm6.309-1.092c.445-.547.708-1.334.851-2.301.057-.357.087-.718.09-1.079v-.031c-.001-.762-.166-1.26-.43-1.568l-.008-.01c-.341-.391-1.046-.689-2.533-.529-1.505.163-2.347.537-2.824 1.024-.462.473-.705 1.18-.705 2.32 0 .605.044 1.087.135 1.472.092.384.231.672.423.89.365.413 1.084.75 2.657.75.91 0 1.527-.223 1.964-.564.14-.11.268-.235.38-.374zm2.504-2.497c.136 1.057.403 1.913.878 2.497.442.545 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.151.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.318-.862-2.824-1.025-1.487-.161-2.192.139-2.533.529-.268.308-.437.808-.438 1.578v.02c.002.299.023.598.063.894z"
						},
						children: [
						]
					}
				]
			}
		},
		"48": {
			width: 48,
			path: "<path d=\"M21 29.5a1.5 1.5 0 00-3 0v4a1.5 1.5 0 003 0v-4zm9 0a1.5 1.5 0 00-3 0v4a1.5 1.5 0 003 0v-4z\"></path><path d=\"M34.895 8.939c1.89.602 3.378 1.472 4.41 2.73 1.397 1.703 1.736 3.837 1.55 6.19l.016.032 1.684 3.79.964.193a3.5 3.5 0 012.161 1.398l1.668 2.335c.424.593.652 1.304.652 2.033v4.86c0 1.058-.619 1.973-1.129 2.585-.56.673-1.273 1.308-1.934 1.836a26.616 26.616 0 01-2.597 1.824l-.048.029h-.001l-.012.008-.021.014-.058.035c-.445.27-.898.528-1.358.773a37.655 37.655 0 01-3.883 1.79C33.69 42.69 29.123 44 24 44c-5.123 0-9.69-1.311-12.959-2.605a38.197 38.197 0 01-3.884-1.79c-.46-.245-.912-.503-1.357-.773l-.08-.05-.011-.007-.001-.001-.048-.03c-.041-.025-.1-.06-.173-.107a26.449 26.449 0 01-2.424-1.716c-.66-.528-1.373-1.163-1.934-1.836C.619 34.473 0 33.558 0 32.5v-4.86c0-.729.228-1.44.652-2.033l1.668-2.335a3.5 3.5 0 012.161-1.398l.964-.193 1.684-3.79.015-.032c-.185-2.353.154-4.487 1.55-6.19 1.033-1.258 2.52-2.128 4.411-2.73C15.84 6.82 19.71 5.5 24 5.5c4.29 0 8.16 1.321 10.895 3.439zM23.643 20.5v-.001a8.385 8.385 0 01-.946 1.894c-1.263 1.866-3.286 3.044-6.18 3.297-3.115.273-5.498-.171-7.111-1.707a5.848 5.848 0 01-1.077-1.405l-.329.74v13.328c.163.092.353.197.569.312a35.355 35.355 0 003.577 1.647C15.19 39.811 19.373 41 24 41c4.627 0 8.809-1.189 11.854-2.394a35.238 35.238 0 003.576-1.647c.217-.115.407-.22.57-.312V23.32l-.329-.74a5.842 5.842 0 01-1.078 1.404c-1.612 1.536-3.995 1.98-7.11 1.707-2.894-.253-4.917-1.431-6.18-3.297a8.427 8.427 0 01-.946-1.894h-.714zm-12.514.907c.107.152.222.286.346.404.675.643 1.966 1.138 4.78.892 2.139-.187 3.277-.985 3.958-1.99.067-.1.131-.203.192-.31.607-1.067.897-2.504.968-4.242.095-2.367-.35-3.664-1.021-4.309-.623-.599-1.877-1.034-4.506-.514-2.668.527-4.082 1.322-4.832 2.235-.721.88-1.047 2.144-.869 4.174.157 1.796.474 2.934.984 3.66zm26.679-3.183c.017-.154.033-.313.047-.478.178-2.03-.148-3.294-.869-4.174-.75-.913-2.164-1.708-4.832-2.235-2.629-.52-3.883-.085-4.506.514-.671.645-1.116 1.942-1.021 4.31.071 1.737.361 3.174.968 4.24a4.7 4.7 0 00.192.31c.638.943 1.679 1.703 3.568 1.948.129.017.259.031.389.043 2.111.184 3.365-.047 4.145-.447.26-.133.467-.285.636-.445.662-.63 1.073-1.711 1.283-3.586zM22.5 17a1 1 0 001 1h1a1 1 0 000-2h-1a1 1 0 00-1 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "48",
					height: "48",
					viewBox: "0 0 48 48"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M21 29.5a1.5 1.5 0 00-3 0v4a1.5 1.5 0 003 0v-4zm9 0a1.5 1.5 0 00-3 0v4a1.5 1.5 0 003 0v-4z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M34.895 8.939c1.89.602 3.378 1.472 4.41 2.73 1.397 1.703 1.736 3.837 1.55 6.19l.016.032 1.684 3.79.964.193a3.5 3.5 0 012.161 1.398l1.668 2.335c.424.593.652 1.304.652 2.033v4.86c0 1.058-.619 1.973-1.129 2.585-.56.673-1.273 1.308-1.934 1.836a26.616 26.616 0 01-2.597 1.824l-.048.029h-.001l-.012.008-.021.014-.058.035c-.445.27-.898.528-1.358.773a37.655 37.655 0 01-3.883 1.79C33.69 42.69 29.123 44 24 44c-5.123 0-9.69-1.311-12.959-2.605a38.197 38.197 0 01-3.884-1.79c-.46-.245-.912-.503-1.357-.773l-.08-.05-.011-.007-.001-.001-.048-.03c-.041-.025-.1-.06-.173-.107a26.449 26.449 0 01-2.424-1.716c-.66-.528-1.373-1.163-1.934-1.836C.619 34.473 0 33.558 0 32.5v-4.86c0-.729.228-1.44.652-2.033l1.668-2.335a3.5 3.5 0 012.161-1.398l.964-.193 1.684-3.79.015-.032c-.185-2.353.154-4.487 1.55-6.19 1.033-1.258 2.52-2.128 4.411-2.73C15.84 6.82 19.71 5.5 24 5.5c4.29 0 8.16 1.321 10.895 3.439zM23.643 20.5v-.001a8.385 8.385 0 01-.946 1.894c-1.263 1.866-3.286 3.044-6.18 3.297-3.115.273-5.498-.171-7.111-1.707a5.848 5.848 0 01-1.077-1.405l-.329.74v13.328c.163.092.353.197.569.312a35.355 35.355 0 003.577 1.647C15.19 39.811 19.373 41 24 41c4.627 0 8.809-1.189 11.854-2.394a35.238 35.238 0 003.576-1.647c.217-.115.407-.22.57-.312V23.32l-.329-.74a5.842 5.842 0 01-1.078 1.404c-1.612 1.536-3.995 1.98-7.11 1.707-2.894-.253-4.917-1.431-6.18-3.297a8.427 8.427 0 01-.946-1.894h-.714zm-12.514.907c.107.152.222.286.346.404.675.643 1.966 1.138 4.78.892 2.139-.187 3.277-.985 3.958-1.99.067-.1.131-.203.192-.31.607-1.067.897-2.504.968-4.242.095-2.367-.35-3.664-1.021-4.309-.623-.599-1.877-1.034-4.506-.514-2.668.527-4.082 1.322-4.832 2.235-.721.88-1.047 2.144-.869 4.174.157 1.796.474 2.934.984 3.66zm26.679-3.183c.017-.154.033-.313.047-.478.178-2.03-.148-3.294-.869-4.174-.75-.913-2.164-1.708-4.832-2.235-2.629-.52-3.883-.085-4.506.514-.671.645-1.116 1.942-1.021 4.31.071 1.737.361 3.174.968 4.24a4.7 4.7 0 00.192.31c.638.943 1.679 1.703 3.568 1.948.129.017.259.031.389.043 2.111.184 3.365-.047 4.145-.447.26-.133.467-.285.636-.445.662-.63 1.073-1.711 1.283-3.586zM22.5 17a1 1 0 001 1h1a1 1 0 000-2h-1a1 1 0 00-1 1z"
						},
						children: [
						]
					}
				]
			}
		},
		"96": {
			width: 96,
			path: "<path d=\"M38 54a4 4 0 014 4v8a4 4 0 01-8 0v-8a4 4 0 014-4zm24 4a4 4 0 00-8 0v8a4 4 0 108 0v-8z\"></path><path d=\"M25.013 15.024C31.008 10.628 39.145 8 48 8c8.855 0 16.992 2.628 22.987 7.024 3.64 2.67 6.553 6.05 8.278 9.92 1.615 2.744 2.114 5.94 1.968 9.397l3.898 9.026.355.07a10.996 10.996 0 016.794 4.394l2.416 3.382A7 7 0 0196 55.282V65c0 2.116-1.238 3.947-2.258 5.17-1.122 1.347-2.547 2.616-3.868 3.673a52.899 52.899 0 01-3.647 2.653c-.51.34-1.025.671-1.546.993l-.061.037-.036.022-.002.001-.024.015-.158.099c-.134.083-.327.201-.576.348-.704.415-1.417.815-2.139 1.199a76.495 76.495 0 01-7.768 3.58C67.381 85.377 58.245 88 48 88c-10.245 0-19.381-2.622-25.917-5.21a76.495 76.495 0 01-7.768-3.58 55.966 55.966 0 01-2.14-1.199 34.102 34.102 0 01-.733-.447l-.024-.015-.002-.001-.038-.023-.059-.036-.345-.215a54.57 54.57 0 01-1.2-.778 52.918 52.918 0 01-3.648-2.653c-1.321-1.057-2.746-2.326-3.868-3.672C1.238 68.946 0 67.116 0 65v-9.718a7 7 0 011.304-4.069l2.416-3.382a10.998 10.998 0 016.794-4.393l.355-.071 3.898-9.026c-.146-3.457.353-6.654 1.968-9.398 1.725-3.87 4.637-7.249 8.278-9.919zM16 46.62v26.671c.326.184.706.394 1.138.624a70.399 70.399 0 007.154 3.295C30.381 79.622 38.745 82 48 82c9.255 0 17.618-2.378 23.708-4.789a70.406 70.406 0 007.154-3.296c.432-.23.812-.44 1.138-.624V46.62l-.983-2.275a11.56 11.56 0 01-2.281 3.065c-3.167 3.016-7.836 3.88-13.914 3.348-5.658-.495-9.622-2.8-12.098-6.457a13.9 13.9 0 01-.213-.324c-1.674.031-3.348.031-5.022 0-.07.109-.141.217-.213.324-2.476 3.657-6.44 5.962-12.098 6.457-6.077.532-10.747-.332-13.914-3.348a11.586 11.586 0 01-2.282-3.065zm24.307-5.683c1.427-2.108 2.097-5.107 2.247-8.826.185-4.606-.683-7.105-1.965-8.337-1.187-1.139-3.597-1.991-8.71-.981-5.191 1.025-7.925 2.568-9.368 4.328-1.388 1.692-2.022 4.13-1.677 8.076.199 2.276.53 4.003 1.007 5.316.358.985.799 1.738 1.328 2.315.075.082.153.161.233.237 1.21 1.153 3.471 2.073 8.261 1.789.32-.019.65-.043.992-.073 1.952-.171 3.472-.603 4.67-1.216a7.8 7.8 0 002.982-2.628zm15.386 0a7.8 7.8 0 002.982 2.628c1.198.613 2.718 1.045 4.67 1.216 5.475.479 7.962-.486 9.253-1.716.634-.604 1.151-1.425 1.56-2.551.478-1.314.808-3.04 1.008-5.317.345-3.946-.289-6.384-1.677-8.076-1.443-1.76-4.177-3.303-9.368-4.328-5.113-1.01-7.523-.158-8.71.981-1.282 1.232-2.15 3.731-1.965 8.337.15 3.719.82 6.718 2.247 8.826zm-9.27-5.997a6.498 6.498 0 013.154 0l.06.015a1.498 1.498 0 001.463-.399 1.498 1.498 0 00-.736-2.511l-.06-.015a9.504 9.504 0 00-4.608 0l-.06.015a1.498 1.498 0 00-.73 2.508 1.5 1.5 0 001.458.402l.06-.015z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "96",
					height: "96",
					viewBox: "0 0 96 96"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M38 54a4 4 0 014 4v8a4 4 0 01-8 0v-8a4 4 0 014-4zm24 4a4 4 0 00-8 0v8a4 4 0 108 0v-8z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M25.013 15.024C31.008 10.628 39.145 8 48 8c8.855 0 16.992 2.628 22.987 7.024 3.64 2.67 6.553 6.05 8.278 9.92 1.615 2.744 2.114 5.94 1.968 9.397l3.898 9.026.355.07a10.996 10.996 0 016.794 4.394l2.416 3.382A7 7 0 0196 55.282V65c0 2.116-1.238 3.947-2.258 5.17-1.122 1.347-2.547 2.616-3.868 3.673a52.899 52.899 0 01-3.647 2.653c-.51.34-1.025.671-1.546.993l-.061.037-.036.022-.002.001-.024.015-.158.099c-.134.083-.327.201-.576.348-.704.415-1.417.815-2.139 1.199a76.495 76.495 0 01-7.768 3.58C67.381 85.377 58.245 88 48 88c-10.245 0-19.381-2.622-25.917-5.21a76.495 76.495 0 01-7.768-3.58 55.966 55.966 0 01-2.14-1.199 34.102 34.102 0 01-.733-.447l-.024-.015-.002-.001-.038-.023-.059-.036-.345-.215a54.57 54.57 0 01-1.2-.778 52.918 52.918 0 01-3.648-2.653c-1.321-1.057-2.746-2.326-3.868-3.672C1.238 68.946 0 67.116 0 65v-9.718a7 7 0 011.304-4.069l2.416-3.382a10.998 10.998 0 016.794-4.393l.355-.071 3.898-9.026c-.146-3.457.353-6.654 1.968-9.398 1.725-3.87 4.637-7.249 8.278-9.919zM16 46.62v26.671c.326.184.706.394 1.138.624a70.399 70.399 0 007.154 3.295C30.381 79.622 38.745 82 48 82c9.255 0 17.618-2.378 23.708-4.789a70.406 70.406 0 007.154-3.296c.432-.23.812-.44 1.138-.624V46.62l-.983-2.275a11.56 11.56 0 01-2.281 3.065c-3.167 3.016-7.836 3.88-13.914 3.348-5.658-.495-9.622-2.8-12.098-6.457a13.9 13.9 0 01-.213-.324c-1.674.031-3.348.031-5.022 0-.07.109-.141.217-.213.324-2.476 3.657-6.44 5.962-12.098 6.457-6.077.532-10.747-.332-13.914-3.348a11.586 11.586 0 01-2.282-3.065zm24.307-5.683c1.427-2.108 2.097-5.107 2.247-8.826.185-4.606-.683-7.105-1.965-8.337-1.187-1.139-3.597-1.991-8.71-.981-5.191 1.025-7.925 2.568-9.368 4.328-1.388 1.692-2.022 4.13-1.677 8.076.199 2.276.53 4.003 1.007 5.316.358.985.799 1.738 1.328 2.315.075.082.153.161.233.237 1.21 1.153 3.471 2.073 8.261 1.789.32-.019.65-.043.992-.073 1.952-.171 3.472-.603 4.67-1.216a7.8 7.8 0 002.982-2.628zm15.386 0a7.8 7.8 0 002.982 2.628c1.198.613 2.718 1.045 4.67 1.216 5.475.479 7.962-.486 9.253-1.716.634-.604 1.151-1.425 1.56-2.551.478-1.314.808-3.04 1.008-5.317.345-3.946-.289-6.384-1.677-8.076-1.443-1.76-4.177-3.303-9.368-4.328-5.113-1.01-7.523-.158-8.71.981-1.282 1.232-2.15 3.731-1.965 8.337.15 3.719.82 6.718 2.247 8.826zm-9.27-5.997a6.498 6.498 0 013.154 0l.06.015a1.498 1.498 0 001.463-.399 1.498 1.498 0 00-.736-2.511l-.06-.015a9.504 9.504 0 00-4.608 0l-.06.015a1.498 1.498 0 00-.73 2.508 1.5 1.5 0 001.458.402l.06-.015z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var copy = {
	name: "copy",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25z\"></path><path d=\"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 01-1.75 1.75H8.774a1.75 1.75 0 01-1.75-1.75zm1.75-.25a.25.25 0 00-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path><path d=\"M1.995 10.749a1.75 1.75 0 011.75-1.751H5.25a.75.75 0 110 1.5H3.745a.25.25 0 00-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 00.25-.25v-1.51a.75.75 0 111.5 0v1.51A1.75 1.75 0 0113.25 22h-9.5A1.75 1.75 0 012 20.25l-.005-9.501z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 01-1.75 1.75H8.774a1.75 1.75 0 01-1.75-1.75zm1.75-.25a.25.25 0 00-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.995 10.749a1.75 1.75 0 011.75-1.751H5.25a.75.75 0 110 1.5H3.745a.25.25 0 00-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 00.25-.25v-1.51a.75.75 0 111.5 0v1.51A1.75 1.75 0 0113.25 22h-9.5A1.75 1.75 0 012 20.25l-.005-9.501z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var cpu = {
	name: "cpu",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.5.75V2h3V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75V5h1.25a.75.75 0 010 1.5H14v3h1.25a.75.75 0 010 1.5H14v1.25A1.75 1.75 0 0112.25 14H11v1.25a.75.75 0 01-1.5 0V14h-3v1.25a.75.75 0 01-1.5 0V14H3.75A1.75 1.75 0 012 12.25V11H.75a.75.75 0 010-1.5H2v-3H.75a.75.75 0 010-1.5H2V3.75C2 2.784 2.784 2 3.75 2H5V.75a.75.75 0 011.5 0zm5.75 11.75a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25zM5.75 5h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5A.75.75 0 015.75 5zm.75 4.5h3v-3h-3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.5.75V2h3V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75V5h1.25a.75.75 0 010 1.5H14v3h1.25a.75.75 0 010 1.5H14v1.25A1.75 1.75 0 0112.25 14H11v1.25a.75.75 0 01-1.5 0V14h-3v1.25a.75.75 0 01-1.5 0V14H3.75A1.75 1.75 0 012 12.25V11H.75a.75.75 0 010-1.5H2v-3H.75a.75.75 0 010-1.5H2V3.75C2 2.784 2.784 2 3.75 2H5V.75a.75.75 0 011.5 0zm5.75 11.75a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25zM5.75 5h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5A.75.75 0 015.75 5zm.75 4.5h3v-3h-3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 8h6.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75h-6.5a.75.75 0 01-.75-.75v-6.5A.75.75 0 018.75 8zm.75 6.5h5v-5h-5z\"></path><path d=\"M15.25 1a.75.75 0 01.75.75V4h2.25c.966 0 1.75.784 1.75 1.75V8h2.25a.75.75 0 010 1.5H20v5h2.25a.75.75 0 010 1.5H20v2.25A1.75 1.75 0 0118.25 20H16v2.25a.75.75 0 01-1.5 0V20h-5v2.25a.75.75 0 01-1.5 0V20H5.75A1.75 1.75 0 014 18.25V16H1.75a.75.75 0 010-1.5H4v-5H1.75a.75.75 0 010-1.5H4V5.75C4 4.784 4.784 4 5.75 4H8V1.75a.75.75 0 011.5 0V4h5V1.75a.75.75 0 01.75-.75zm3 17.5a.25.25 0 00.25-.25V5.75a.25.25 0 00-.25-.25H5.75a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 8h6.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75h-6.5a.75.75 0 01-.75-.75v-6.5A.75.75 0 018.75 8zm.75 6.5h5v-5h-5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.25 1a.75.75 0 01.75.75V4h2.25c.966 0 1.75.784 1.75 1.75V8h2.25a.75.75 0 010 1.5H20v5h2.25a.75.75 0 010 1.5H20v2.25A1.75 1.75 0 0118.25 20H16v2.25a.75.75 0 01-1.5 0V20h-5v2.25a.75.75 0 01-1.5 0V20H5.75A1.75 1.75 0 014 18.25V16H1.75a.75.75 0 010-1.5H4v-5H1.75a.75.75 0 010-1.5H4V5.75C4 4.784 4.784 4 5.75 4H8V1.75a.75.75 0 011.5 0V4h5V1.75a.75.75 0 01.75-.75zm3 17.5a.25.25 0 00.25-.25V5.75a.25.25 0 00-.25-.25H5.75a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var dash = {
	name: "dash",
	keywords: [
		"hyphen",
		"range"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 7.75A.75.75 0 012.75 7h10a.75.75 0 010 1.5h-10A.75.75 0 012 7.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 7.75A.75.75 0 012.75 7h10a.75.75 0 010 1.5h-10A.75.75 0 012 7.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.5 12.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.5 12.75a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H5.25a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var database = {
	name: "database",
	keywords: [
		"disks",
		"data"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 3.5c0-.626.292-1.165.7-1.59.406-.422.956-.767 1.579-1.041C4.525.32 6.195 0 8 0c1.805 0 3.475.32 4.722.869.622.274 1.172.62 1.578 1.04.408.426.7.965.7 1.591v9c0 .626-.292 1.165-.7 1.59-.406.422-.956.767-1.579 1.041C11.476 15.68 9.806 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.62-1.579-1.04-.408-.426-.7-.965-.7-1.591zm1.5 0c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.471-1.1.708-.224.232-.282.417-.282.55zm0 4.5c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 9.705 6.353 10 8 10c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55V5.724c-.241.15-.503.286-.778.407C11.475 6.68 9.805 7 8 7c-1.805 0-3.475-.32-4.721-.869a6.15 6.15 0 01-.779-.407zm0 2.225V12.5c0 .133.058.318.282.55.227.237.592.484 1.1.708 1.016.447 2.471.742 4.118.742 1.647 0 3.102-.295 4.117-.742.51-.224.874-.47 1.101-.707.224-.233.282-.418.282-.551v-2.275c-.241.15-.503.285-.778.406-1.247.549-2.917.869-4.722.869-1.805 0-3.475-.32-4.721-.869a6.327 6.327 0 01-.779-.406z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 3.5c0-.626.292-1.165.7-1.59.406-.422.956-.767 1.579-1.041C4.525.32 6.195 0 8 0c1.805 0 3.475.32 4.722.869.622.274 1.172.62 1.578 1.04.408.426.7.965.7 1.591v9c0 .626-.292 1.165-.7 1.59-.406.422-.956.767-1.579 1.041C11.476 15.68 9.806 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.62-1.579-1.04-.408-.426-.7-.965-.7-1.591zm1.5 0c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.471-1.1.708-.224.232-.282.417-.282.55zm0 4.5c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 9.705 6.353 10 8 10c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55V5.724c-.241.15-.503.286-.778.407C11.475 6.68 9.805 7 8 7c-1.805 0-3.475-.32-4.721-.869a6.15 6.15 0 01-.779-.407zm0 2.225V12.5c0 .133.058.318.282.55.227.237.592.484 1.1.708 1.016.447 2.471.742 4.118.742 1.647 0 3.102-.295 4.117-.742.51-.224.874-.47 1.101-.707.224-.233.282-.418.282-.551v-2.275c-.241.15-.503.285-.778.406-1.247.549-2.917.869-4.722.869-1.805 0-3.475-.32-4.721-.869a6.327 6.327 0 01-.779-.406z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1.25c2.487 0 4.773.402 6.466 1.079.844.337 1.577.758 2.112 1.264.536.507.922 1.151.922 1.907v12.987l-.026.013h.026c0 .756-.386 1.4-.922 1.907-.535.506-1.268.927-2.112 1.264-1.693.677-3.979 1.079-6.466 1.079s-4.774-.402-6.466-1.079c-.844-.337-1.577-.758-2.112-1.264C2.886 19.9 2.5 19.256 2.5 18.5h.026l-.026-.013V5.5c0-.756.386-1.4.922-1.907.535-.506 1.268-.927 2.112-1.264C7.226 1.652 9.513 1.25 12 1.25zM4 14.371v4.116l-.013.013H4c0 .211.103.487.453.817.351.332.898.666 1.638.962 1.475.589 3.564.971 5.909.971 2.345 0 4.434-.381 5.909-.971.739-.296 1.288-.63 1.638-.962.349-.33.453-.607.453-.817h.013L20 18.487v-4.116a7.85 7.85 0 01-1.534.8c-1.693.677-3.979 1.079-6.466 1.079s-4.774-.402-6.466-1.079a7.843 7.843 0 01-1.534-.8zM20 12V7.871a7.85 7.85 0 01-1.534.8C16.773 9.348 14.487 9.75 12 9.75s-4.774-.402-6.466-1.079A7.85 7.85 0 014 7.871V12c0 .21.104.487.453.817.35.332.899.666 1.638.961 1.475.59 3.564.972 5.909.972 2.345 0 4.434-.382 5.909-.972.74-.295 1.287-.629 1.638-.96.35-.33.453-.607.453-.818zM4 5.5c0 .211.103.487.453.817.351.332.898.666 1.638.962 1.475.589 3.564.971 5.909.971 2.345 0 4.434-.381 5.909-.971.739-.296 1.288-.63 1.638-.962.349-.33.453-.607.453-.817 0-.211-.103-.487-.453-.817-.351-.332-.898-.666-1.638-.962-1.475-.589-3.564-.971-5.909-.971-2.345 0-4.434.381-5.909.971-.739.296-1.288.63-1.638.962C4.104 5.013 4 5.29 4 5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1.25c2.487 0 4.773.402 6.466 1.079.844.337 1.577.758 2.112 1.264.536.507.922 1.151.922 1.907v12.987l-.026.013h.026c0 .756-.386 1.4-.922 1.907-.535.506-1.268.927-2.112 1.264-1.693.677-3.979 1.079-6.466 1.079s-4.774-.402-6.466-1.079c-.844-.337-1.577-.758-2.112-1.264C2.886 19.9 2.5 19.256 2.5 18.5h.026l-.026-.013V5.5c0-.756.386-1.4.922-1.907.535-.506 1.268-.927 2.112-1.264C7.226 1.652 9.513 1.25 12 1.25zM4 14.371v4.116l-.013.013H4c0 .211.103.487.453.817.351.332.898.666 1.638.962 1.475.589 3.564.971 5.909.971 2.345 0 4.434-.381 5.909-.971.739-.296 1.288-.63 1.638-.962.349-.33.453-.607.453-.817h.013L20 18.487v-4.116a7.85 7.85 0 01-1.534.8c-1.693.677-3.979 1.079-6.466 1.079s-4.774-.402-6.466-1.079a7.843 7.843 0 01-1.534-.8zM20 12V7.871a7.85 7.85 0 01-1.534.8C16.773 9.348 14.487 9.75 12 9.75s-4.774-.402-6.466-1.079A7.85 7.85 0 014 7.871V12c0 .21.104.487.453.817.35.332.899.666 1.638.961 1.475.59 3.564.972 5.909.972 2.345 0 4.434-.382 5.909-.972.74-.295 1.287-.629 1.638-.96.35-.33.453-.607.453-.818zM4 5.5c0 .211.103.487.453.817.351.332.898.666 1.638.962 1.475.589 3.564.971 5.909.971 2.345 0 4.434-.381 5.909-.971.739-.296 1.288-.63 1.638-.962.349-.33.453-.607.453-.817 0-.211-.103-.487-.453-.817-.351-.332-.898-.666-1.638-.962-1.475-.589-3.564-.971-5.909-.971-2.345 0-4.434.381-5.909.971-.739.296-1.288.63-1.638.962C4.104 5.013 4 5.29 4 5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var dependabot = {
	name: "dependabot",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.75 7.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm5.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z\"></path><path d=\"M6.25 0h2A.75.75 0 019 .75V3.5h3.25a2.25 2.25 0 012.25 2.25V8h.75a.75.75 0 010 1.5h-.75v2.75a2.25 2.25 0 01-2.25 2.25h-8.5a2.25 2.25 0 01-2.25-2.25V9.5H.75a.75.75 0 010-1.5h.75V5.75A2.25 2.25 0 013.75 3.5H7.5v-2H6.25a.75.75 0 010-1.5zM3 5.75v6.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-6.5a.75.75 0 00-.75-.75h-8.5a.75.75 0 00-.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 7.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm5.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.25 0h2A.75.75 0 019 .75V3.5h3.25a2.25 2.25 0 012.25 2.25V8h.75a.75.75 0 010 1.5h-.75v2.75a2.25 2.25 0 01-2.25 2.25h-8.5a2.25 2.25 0 01-2.25-2.25V9.5H.75a.75.75 0 010-1.5h.75V5.75A2.25 2.25 0 013.75 3.5H7.5v-2H6.25a.75.75 0 010-1.5zM3 5.75v6.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-6.5a.75.75 0 00-.75-.75h-8.5a.75.75 0 00-.75.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zm7.25.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z\"></path><path d=\"M9.813 1h2.437a.75.75 0 01.75.75V5h6.75A2.25 2.25 0 0122 7.25v5.25h1.25a.75.75 0 010 1.5H22v5.75A2.25 2.25 0 0119.75 22H4.25A2.25 2.25 0 012 19.75V14H.75a.75.75 0 010-1.5H2V7.25A2.25 2.25 0 014.25 5h7.25V2.5H9.813A.75.75 0 019.812 1zM3.5 7.25v12.5c0 .414.336.75.75.75h15.5a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75H4.25a.75.75 0 00-.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 11a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5a.75.75 0 01.75-.75zm7.25.75a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.813 1h2.437a.75.75 0 01.75.75V5h6.75A2.25 2.25 0 0122 7.25v5.25h1.25a.75.75 0 010 1.5H22v5.75A2.25 2.25 0 0119.75 22H4.25A2.25 2.25 0 012 19.75V14H.75a.75.75 0 010-1.5H2V7.25A2.25 2.25 0 014.25 5h7.25V2.5H9.813A.75.75 0 019.812 1zM3.5 7.25v12.5c0 .414.336.75.75.75h15.5a.75.75 0 00.75-.75V7.25a.75.75 0 00-.75-.75H4.25a.75.75 0 00-.75.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var diamond = {
	name: "diamond",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.527 9.237a1.75 1.75 0 010-2.474L6.777.512a1.75 1.75 0 012.475 0l6.251 6.25a1.75 1.75 0 010 2.475l-6.25 6.251a1.75 1.75 0 01-2.475 0L.527 9.238zm1.06-1.414a.25.25 0 000 .354l6.251 6.25a.25.25 0 00.354 0l6.25-6.25a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.354 0l-6.25 6.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.527 9.237a1.75 1.75 0 010-2.474L6.777.512a1.75 1.75 0 012.475 0l6.251 6.25a1.75 1.75 0 010 2.475l-6.25 6.251a1.75 1.75 0 01-2.475 0L.527 9.238zm1.06-1.414a.25.25 0 000 .354l6.251 6.25a.25.25 0 00.354 0l6.25-6.25a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.354 0l-6.25 6.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.527 13.237a1.75 1.75 0 010-2.474l9.272-9.273a1.75 1.75 0 012.475 0l9.272 9.273a1.75 1.75 0 010 2.474l-9.272 9.272a1.75 1.75 0 01-2.475 0zm1.06-1.414a.25.25 0 000 .354l9.273 9.272a.25.25 0 00.353 0l9.272-9.272a.25.25 0 000-.354l-9.272-9.272a.25.25 0 00-.353 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.527 13.237a1.75 1.75 0 010-2.474l9.272-9.273a1.75 1.75 0 012.475 0l9.272 9.273a1.75 1.75 0 010 2.474l-9.272 9.272a1.75 1.75 0 01-2.475 0zm1.06-1.414a.25.25 0 000 .354l9.273 9.272a.25.25 0 00.353 0l9.272-9.272a.25.25 0 000-.354l-9.272-9.272a.25.25 0 00-.353 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var diff = {
	name: "diff",
	keywords: [
		"difference",
		"changes",
		"compare"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.75 1.75V5H12a.75.75 0 010 1.5H8.75v3.25a.75.75 0 01-1.5 0V6.5H4A.75.75 0 014 5h3.25V1.75a.75.75 0 011.5 0zM4 13h8a.75.75 0 010 1.5H4A.75.75 0 014 13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 1.75V5H12a.75.75 0 010 1.5H8.75v3.25a.75.75 0 01-1.5 0V6.5H4A.75.75 0 014 5h3.25V1.75a.75.75 0 011.5 0zM4 13h8a.75.75 0 010 1.5H4A.75.75 0 014 13z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.25 3.5a.75.75 0 01.75.75V8.5h4.25a.75.75 0 010 1.5H13v4.25a.75.75 0 01-1.5 0V10H7.25a.75.75 0 010-1.5h4.25V4.25a.75.75 0 01.75-.75zM6.562 19.25a.75.75 0 01.75-.75h9.938a.75.75 0 010 1.5H7.312a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.25 3.5a.75.75 0 01.75.75V8.5h4.25a.75.75 0 010 1.5H13v4.25a.75.75 0 01-1.5 0V10H7.25a.75.75 0 010-1.5h4.25V4.25a.75.75 0 01.75-.75zM6.562 19.25a.75.75 0 01.75-.75h9.938a.75.75 0 010 1.5H7.312a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var dot = {
	name: "dot",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 8a4 4 0 118 0 4 4 0 01-8 0zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 8a4 4 0 118 0 4 4 0 01-8 0zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 18a6 6 0 110-12 6 6 0 010 12zm0-1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 18a6 6 0 110-12 6 6 0 010 12zm0-1.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var download = {
	name: "download",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.47 10.78L3.72 7.03a.751.751 0 01.018-1.042.751.751 0 011.042-.018l2.47 2.47V1.75a.75.75 0 011.5 0v6.69l2.47-2.47a.751.751 0 011.042.018.751.751 0 01.018 1.042l-3.75 3.75a.75.75 0 01-1.06 0zM3.75 13h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.47 10.78L3.72 7.03a.751.751 0 01.018-1.042.751.751 0 011.042-.018l2.47 2.47V1.75a.75.75 0 011.5 0v6.69l2.47-2.47a.751.751 0 011.042.018.751.751 0 01.018 1.042l-3.75 3.75a.75.75 0 01-1.06 0zM3.75 13h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.97 11.03a.75.75 0 111.06-1.06L11 14.94V2.75a.75.75 0 011.5 0v12.19l4.97-4.97a.75.75 0 111.06 1.06l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25zm-.22 9.47a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H4.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.97 11.03a.75.75 0 111.06-1.06L11 14.94V2.75a.75.75 0 011.5 0v12.19l4.97-4.97a.75.75 0 111.06 1.06l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25zm-.22 9.47a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H4.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var duplicate = {
	name: "duplicate",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.5 3a.75.75 0 01.75.75v1h1a.75.75 0 010 1.5h-1v1a.75.75 0 01-1.5 0v-1h-1a.75.75 0 010-1.5h1v-1A.75.75 0 0110.5 3z\"></path><path d=\"M6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5C5 .784 5.784 0 6.75 0zM6.5 1.75v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25z\"></path><path d=\"M1.75 5A1.75 1.75 0 000 6.75v7.5C0 15.216.784 16 1.75 16h7.5A1.75 1.75 0 0011 14.25v-1.5a.75.75 0 00-1.5 0v1.5a.25.25 0 01-.25.25h-7.5a.25.25 0 01-.25-.25v-7.5a.25.25 0 01.25-.25h1.5a.75.75 0 000-1.5h-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.5 3a.75.75 0 01.75.75v1h1a.75.75 0 010 1.5h-1v1a.75.75 0 01-1.5 0v-1h-1a.75.75 0 010-1.5h1v-1A.75.75 0 0110.5 3z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5C5 .784 5.784 0 6.75 0zM6.5 1.75v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 5A1.75 1.75 0 000 6.75v7.5C0 15.216.784 16 1.75 16h7.5A1.75 1.75 0 0011 14.25v-1.5a.75.75 0 00-1.5 0v1.5a.25.25 0 01-.25.25h-7.5a.25.25 0 01-.25-.25v-7.5a.25.25 0 01.25-.25h1.5a.75.75 0 000-1.5h-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M14.513 6a.75.75 0 01.75.75v2h1.987a.75.75 0 010 1.5h-1.987v2a.75.75 0 11-1.5 0v-2H11.75a.75.75 0 010-1.5h2.013v-2a.75.75 0 01.75-.75z\"></path><path d=\"M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 01-1.75 1.75H8.774a1.75 1.75 0 01-1.75-1.75zm1.75-.25a.25.25 0 00-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path><path d=\"M1.995 10.749a1.75 1.75 0 011.75-1.751H5.25a.75.75 0 110 1.5H3.745a.25.25 0 00-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 00.25-.25v-1.51a.75.75 0 111.5 0v1.51A1.75 1.75 0 0113.25 22h-9.5A1.75 1.75 0 012 20.25l-.005-9.501z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.513 6a.75.75 0 01.75.75v2h1.987a.75.75 0 010 1.5h-1.987v2a.75.75 0 11-1.5 0v-2H11.75a.75.75 0 010-1.5h2.013v-2a.75.75 0 01.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.024 3.75c0-.966.784-1.75 1.75-1.75H20.25c.966 0 1.75.784 1.75 1.75v11.498a1.75 1.75 0 01-1.75 1.75H8.774a1.75 1.75 0 01-1.75-1.75zm1.75-.25a.25.25 0 00-.25.25v11.498c0 .139.112.25.25.25H20.25a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.995 10.749a1.75 1.75 0 011.75-1.751H5.25a.75.75 0 110 1.5H3.745a.25.25 0 00-.25.25L3.5 20.25c0 .138.111.25.25.25h9.5a.25.25 0 00.25-.25v-1.51a.75.75 0 111.5 0v1.51A1.75 1.75 0 0113.25 22h-9.5A1.75 1.75 0 012 20.25l-.005-9.501z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var ellipsis = {
	name: "ellipsis",
	keywords: [
		"dot",
		"read",
		"more",
		"hidden",
		"expand"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 5.75C0 4.784.784 4 1.75 4h12.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0114.25 12H1.75A1.75 1.75 0 010 10.25zM12 7a1 1 0 100 2 1 1 0 000-2zM7 8a1 1 0 102 0 1 1 0 00-2 0zM4 7a1 1 0 100 2 1 1 0 000-2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 5.75C0 4.784.784 4 1.75 4h12.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0114.25 12H1.75A1.75 1.75 0 010 10.25zM12 7a1 1 0 100 2 1 1 0 000-2zM7 8a1 1 0 102 0 1 1 0 00-2 0zM4 7a1 1 0 100 2 1 1 0 000-2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var eye = {
	name: "eye",
	keywords: [
		"look",
		"watch",
		"see"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 010 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 010-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2zM1.679 7.932a.12.12 0 000 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 000-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717zM8 10a2 2 0 11-.001-3.999A2 2 0 018 10z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 010 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 010-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2zM1.679 7.932a.12.12 0 000 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 000-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717zM8 10a2 2 0 11-.001-3.999A2 2 0 018 10z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z\"></path><path d=\"M12 3.5c3.432 0 6.124 1.534 8.054 3.241 1.926 1.703 3.132 3.61 3.616 4.46a1.6 1.6 0 010 1.598c-.484.85-1.69 2.757-3.616 4.461-1.929 1.706-4.622 3.24-8.054 3.24-3.432 0-6.124-1.534-8.054-3.24C2.02 15.558.814 13.65.33 12.8a1.6 1.6 0 010-1.598c.484-.85 1.69-2.757 3.616-4.462C5.875 5.034 8.568 3.5 12 3.5zM1.633 11.945a.115.115 0 00-.017.055c.001.02.006.039.017.056.441.774 1.551 2.527 3.307 4.08C6.691 17.685 9.045 19 12 19c2.955 0 5.31-1.315 7.06-2.864 1.756-1.553 2.866-3.306 3.307-4.08a.111.111 0 00.017-.056.111.111 0 00-.017-.056c-.441-.773-1.551-2.527-3.307-4.08C17.309 6.315 14.955 5 12 5 9.045 5 6.69 6.314 4.94 7.865c-1.756 1.552-2.866 3.306-3.307 4.08z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 3.5c3.432 0 6.124 1.534 8.054 3.241 1.926 1.703 3.132 3.61 3.616 4.46a1.6 1.6 0 010 1.598c-.484.85-1.69 2.757-3.616 4.461-1.929 1.706-4.622 3.24-8.054 3.24-3.432 0-6.124-1.534-8.054-3.24C2.02 15.558.814 13.65.33 12.8a1.6 1.6 0 010-1.598c.484-.85 1.69-2.757 3.616-4.462C5.875 5.034 8.568 3.5 12 3.5zM1.633 11.945a.115.115 0 00-.017.055c.001.02.006.039.017.056.441.774 1.551 2.527 3.307 4.08C6.691 17.685 9.045 19 12 19c2.955 0 5.31-1.315 7.06-2.864 1.756-1.553 2.866-3.306 3.307-4.08a.111.111 0 00.017-.056.111.111 0 00-.017-.056c-.441-.773-1.551-2.527-3.307-4.08C17.309 6.315 14.955 5 12 5 9.045 5 6.69 6.314 4.94 7.865c-1.756 1.552-2.866 3.306-3.307 4.08z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var file = {
	name: "file",
	keywords: [
		"file",
		"text",
		"words"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H5a2 2 0 01-2-2zm2-.5a.5.5 0 00-.5.5v18a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4zm10 0v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H5a2 2 0 01-2-2zm2-.5a.5.5 0 00-.5.5v18a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4zm10 0v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var filter = {
	name: "filter",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.75 3h14.5a.75.75 0 010 1.5H.75a.75.75 0 010-1.5zM3 7.75A.75.75 0 013.75 7h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 7.75zm3 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.75 3h14.5a.75.75 0 010 1.5H.75a.75.75 0 010-1.5zM3 7.75A.75.75 0 013.75 7h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 7.75zm3 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.75 6a.75.75 0 000 1.5h18.5a.75.75 0 000-1.5H2.75zM6 11.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zm4 4.938a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 6a.75.75 0 000 1.5h18.5a.75.75 0 000-1.5H2.75zM6 11.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zm4 4.938a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var flame = {
	name: "flame",
	keywords: [
		"fire",
		"hot",
		"burn",
		"trending"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.533.753V.752c.217 2.385 1.463 3.626 2.653 4.81C13.37 6.74 14.498 7.863 14.498 10c0 3.5-3 6-6.5 6S1.5 13.512 1.5 10c0-1.298.536-2.56 1.425-3.286.376-.308.862 0 1.035.454C4.46 8.487 5.581 8.419 6 8c.282-.282.341-.811-.003-1.5C4.34 3.187 7.035.75 8.77.146c.39-.137.726.194.763.607zM7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 01-1.436-.874A3.198 3.198 0 003 10c0 2.53 2.164 4.5 4.998 4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.533.753V.752c.217 2.385 1.463 3.626 2.653 4.81C13.37 6.74 14.498 7.863 14.498 10c0 3.5-3 6-6.5 6S1.5 13.512 1.5 10c0-1.298.536-2.56 1.425-3.286.376-.308.862 0 1.035.454C4.46 8.487 5.581 8.419 6 8c.282-.282.341-.811-.003-1.5C4.34 3.187 7.035.75 8.77.146c.39-.137.726.194.763.607zM7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 01-1.436-.874A3.198 3.198 0 003 10c0 2.53 2.164 4.5 4.998 4.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M14.265 1.627c0 3.545 1.869 5.327 3.479 7.021 1.54 1.62 3.006 3.163 3.006 6.102 0 4.812-3.753 8.25-8.565 8.25-4.813 0-8.935-3.421-8.935-8.25 0-2.039.962-4.011 2.509-4.899.305-.175.672.007.803.334C7.563 12.684 8.797 12.64 9.437 12c.388-.387.47-1.116-.004-2.062-2.405-4.812 1.863-8.279 4.2-8.854.336-.082.615.198.632.543zM12.185 21.5c4.059 0 7.065-2.84 7.065-6.75 0-2.337-1.093-3.489-2.678-5.158l-.021-.023c-1.44-1.517-3.139-3.351-3.649-6.557a6.148 6.148 0 00-1.911 1.76c-.787 1.144-1.147 2.633-.216 4.495.603 1.205.777 2.74-.277 3.794-.657.657-1.762 1.1-2.956.586-.752-.324-1.353-.955-1.838-1.79-.567.706-.954 1.74-.954 2.893 0 3.847 3.288 6.75 7.435 6.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.265 1.627c0 3.545 1.869 5.327 3.479 7.021 1.54 1.62 3.006 3.163 3.006 6.102 0 4.812-3.753 8.25-8.565 8.25-4.813 0-8.935-3.421-8.935-8.25 0-2.039.962-4.011 2.509-4.899.305-.175.672.007.803.334C7.563 12.684 8.797 12.64 9.437 12c.388-.387.47-1.116-.004-2.062-2.405-4.812 1.863-8.279 4.2-8.854.336-.082.615.198.632.543zM12.185 21.5c4.059 0 7.065-2.84 7.065-6.75 0-2.337-1.093-3.489-2.678-5.158l-.021-.023c-1.44-1.517-3.139-3.351-3.649-6.557a6.148 6.148 0 00-1.911 1.76c-.787 1.144-1.147 2.633-.216 4.495.603 1.205.777 2.74-.277 3.794-.657.657-1.762 1.1-2.956.586-.752-.324-1.353-.955-1.838-1.79-.567.706-.954 1.74-.954 2.893 0 3.847 3.288 6.75 7.435 6.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var fold = {
	name: "fold",
	keywords: [
		"unfold",
		"hide",
		"collapse"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.896 2H8.75V.75a.75.75 0 00-1.5 0V2H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 2zM8.75 15.25a.75.75 0 01-1.5 0V14H5.104a.25.25 0 01-.177-.427l2.896-2.896a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25zm-6.5-6.5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.896 2H8.75V.75a.75.75 0 00-1.5 0V2H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 2zM8.75 15.25a.75.75 0 01-1.5 0V14H5.104a.25.25 0 01-.177-.427l2.896-2.896a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25zm-6.5-6.5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 15c.199 0 .389.079.53.22l3.25 3.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12 16.81l-2.72 2.72a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25A.749.749 0 0112 15z\"></path><path d=\"M12.53 8.78a.75.75 0 01-1.06 0L8.22 5.53a.751.751 0 01.018-1.042.751.751 0 011.042-.018L12 7.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734zM12 15.75a.75.75 0 01.75.75v5.75a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75z\"></path><path d=\"M12 8.5a.75.75 0 01-.75-.75v-6a.75.75 0 011.5 0v6a.75.75 0 01-.75.75zM2.75 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 15c.199 0 .389.079.53.22l3.25 3.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12 16.81l-2.72 2.72a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25A.749.749 0 0112 15z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.53 8.78a.75.75 0 01-1.06 0L8.22 5.53a.751.751 0 01.018-1.042.751.751 0 011.042-.018L12 7.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734zM12 15.75a.75.75 0 01.75.75v5.75a.75.75 0 01-1.5 0V16.5a.75.75 0 01.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 8.5a.75.75 0 01-.75-.75v-6a.75.75 0 011.5 0v6a.75.75 0 01-.75.75zM2.75 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var gear = {
	name: "gear",
	keywords: [
		"settings"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8.2 8.2 0 01.701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 01-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 01-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 01-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 01-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 01-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 010-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 01.704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 000 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 001.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 000-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 00-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 00-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 00-1.142 0zM11 8a3 3 0 11-6 0 3 3 0 016 0zM9.5 8a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8.2 8.2 0 01.701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 01-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 01-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 01-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 01-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 01-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 010-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 01.704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 000 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 001.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 000-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 00-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 00-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 00-1.142 0zM11 8a3 3 0 11-6 0 3 3 0 016 0zM9.5 8a1.5 1.5 0 10-3.001.001A1.5 1.5 0 009.5 8z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z\"></path><path d=\"M12 1c.266 0 .532.009.797.028.763.055 1.345.617 1.512 1.304l.352 1.45c.019.078.09.171.225.221.247.089.49.19.728.302.13.061.246.044.315.002l1.275-.776c.603-.368 1.411-.353 1.99.147.402.349.78.726 1.128 1.129.501.578.515 1.386.147 1.99l-.776 1.274c-.042.069-.058.185.002.315.112.238.213.481.303.728.048.135.142.205.22.225l1.45.352c.687.167 1.249.749 1.303 1.512.038.531.038 1.063 0 1.594-.054.763-.616 1.345-1.303 1.512l-1.45.352c-.078.019-.171.09-.221.225-.089.248-.19.491-.302.728-.061.13-.044.246-.002.315l.776 1.275c.368.603.353 1.411-.147 1.99-.349.402-.726.78-1.129 1.128-.578.501-1.386.515-1.99.147l-1.274-.776c-.069-.042-.185-.058-.314.002a8.606 8.606 0 01-.729.303c-.135.048-.205.142-.225.22l-.352 1.45c-.167.687-.749 1.249-1.512 1.303-.531.038-1.063.038-1.594 0-.763-.054-1.345-.616-1.512-1.303l-.352-1.45c-.019-.078-.09-.171-.225-.221a8.138 8.138 0 01-.728-.302c-.13-.061-.246-.044-.315-.002l-1.275.776c-.603.368-1.411.353-1.99-.147-.402-.349-.78-.726-1.128-1.129-.501-.578-.515-1.386-.147-1.99l.776-1.274c.042-.069.058-.185-.002-.314a8.606 8.606 0 01-.303-.729c-.048-.135-.142-.205-.22-.225l-1.45-.352c-.687-.167-1.249-.749-1.304-1.512a11.158 11.158 0 010-1.594c.055-.763.617-1.345 1.304-1.512l1.45-.352c.078-.019.171-.09.221-.225.089-.248.19-.491.302-.728.061-.13.044-.246.002-.315l-.776-1.275c-.368-.603-.353-1.411.147-1.99.349-.402.726-.78 1.129-1.128.578-.501 1.386-.515 1.99-.147l1.274.776c.069.042.185.058.315-.002.238-.112.481-.213.728-.303.135-.048.205-.142.225-.22l.352-1.45c.167-.687.749-1.249 1.512-1.304C11.466 1.01 11.732 1 12 1zm-.69 1.525c-.055.004-.135.05-.161.161l-.353 1.45a1.832 1.832 0 01-1.172 1.277 7.147 7.147 0 00-.6.249 1.833 1.833 0 01-1.734-.074l-1.274-.776c-.098-.06-.186-.036-.228 0a9.774 9.774 0 00-.976.976c-.036.042-.06.131 0 .228l.776 1.274c.314.529.342 1.18.074 1.734a7.147 7.147 0 00-.249.6 1.831 1.831 0 01-1.278 1.173l-1.45.351c-.11.027-.156.107-.16.162a9.63 9.63 0 000 1.38c.004.055.05.135.161.161l1.45.353a1.832 1.832 0 011.277 1.172c.074.204.157.404.249.6.268.553.24 1.204-.074 1.733l-.776 1.275c-.06.098-.036.186 0 .228.301.348.628.675.976.976.042.036.131.06.228 0l1.274-.776a1.83 1.83 0 011.734-.075c.196.093.396.176.6.25a1.831 1.831 0 011.173 1.278l.351 1.45c.027.11.107.156.162.16a9.63 9.63 0 001.38 0c.055-.004.135-.05.161-.161l.353-1.45a1.834 1.834 0 011.172-1.278 6.82 6.82 0 00.6-.248 1.831 1.831 0 011.733.074l1.275.776c.098.06.186.036.228 0 .348-.301.675-.628.976-.976.036-.042.06-.131 0-.228l-.776-1.275a1.834 1.834 0 01-.075-1.733c.093-.196.176-.396.25-.6a1.831 1.831 0 011.278-1.173l1.45-.351c.11-.027.156-.107.16-.162a9.63 9.63 0 000-1.38c-.004-.055-.05-.135-.161-.161l-1.45-.353c-.626-.152-1.08-.625-1.278-1.172a6.576 6.576 0 00-.248-.6 1.833 1.833 0 01.074-1.734l.776-1.274c.06-.098.036-.186 0-.228a9.774 9.774 0 00-.976-.976c-.042-.036-.131-.06-.228 0l-1.275.776a1.831 1.831 0 01-1.733.074 6.88 6.88 0 00-.6-.249 1.835 1.835 0 01-1.173-1.278l-.351-1.45c-.027-.11-.107-.156-.162-.16a9.63 9.63 0 00-1.38 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c.266 0 .532.009.797.028.763.055 1.345.617 1.512 1.304l.352 1.45c.019.078.09.171.225.221.247.089.49.19.728.302.13.061.246.044.315.002l1.275-.776c.603-.368 1.411-.353 1.99.147.402.349.78.726 1.128 1.129.501.578.515 1.386.147 1.99l-.776 1.274c-.042.069-.058.185.002.315.112.238.213.481.303.728.048.135.142.205.22.225l1.45.352c.687.167 1.249.749 1.303 1.512.038.531.038 1.063 0 1.594-.054.763-.616 1.345-1.303 1.512l-1.45.352c-.078.019-.171.09-.221.225-.089.248-.19.491-.302.728-.061.13-.044.246-.002.315l.776 1.275c.368.603.353 1.411-.147 1.99-.349.402-.726.78-1.129 1.128-.578.501-1.386.515-1.99.147l-1.274-.776c-.069-.042-.185-.058-.314.002a8.606 8.606 0 01-.729.303c-.135.048-.205.142-.225.22l-.352 1.45c-.167.687-.749 1.249-1.512 1.303-.531.038-1.063.038-1.594 0-.763-.054-1.345-.616-1.512-1.303l-.352-1.45c-.019-.078-.09-.171-.225-.221a8.138 8.138 0 01-.728-.302c-.13-.061-.246-.044-.315-.002l-1.275.776c-.603.368-1.411.353-1.99-.147-.402-.349-.78-.726-1.128-1.129-.501-.578-.515-1.386-.147-1.99l.776-1.274c.042-.069.058-.185-.002-.314a8.606 8.606 0 01-.303-.729c-.048-.135-.142-.205-.22-.225l-1.45-.352c-.687-.167-1.249-.749-1.304-1.512a11.158 11.158 0 010-1.594c.055-.763.617-1.345 1.304-1.512l1.45-.352c.078-.019.171-.09.221-.225.089-.248.19-.491.302-.728.061-.13.044-.246.002-.315l-.776-1.275c-.368-.603-.353-1.411.147-1.99.349-.402.726-.78 1.129-1.128.578-.501 1.386-.515 1.99-.147l1.274.776c.069.042.185.058.315-.002.238-.112.481-.213.728-.303.135-.048.205-.142.225-.22l.352-1.45c.167-.687.749-1.249 1.512-1.304C11.466 1.01 11.732 1 12 1zm-.69 1.525c-.055.004-.135.05-.161.161l-.353 1.45a1.832 1.832 0 01-1.172 1.277 7.147 7.147 0 00-.6.249 1.833 1.833 0 01-1.734-.074l-1.274-.776c-.098-.06-.186-.036-.228 0a9.774 9.774 0 00-.976.976c-.036.042-.06.131 0 .228l.776 1.274c.314.529.342 1.18.074 1.734a7.147 7.147 0 00-.249.6 1.831 1.831 0 01-1.278 1.173l-1.45.351c-.11.027-.156.107-.16.162a9.63 9.63 0 000 1.38c.004.055.05.135.161.161l1.45.353a1.832 1.832 0 011.277 1.172c.074.204.157.404.249.6.268.553.24 1.204-.074 1.733l-.776 1.275c-.06.098-.036.186 0 .228.301.348.628.675.976.976.042.036.131.06.228 0l1.274-.776a1.83 1.83 0 011.734-.075c.196.093.396.176.6.25a1.831 1.831 0 011.173 1.278l.351 1.45c.027.11.107.156.162.16a9.63 9.63 0 001.38 0c.055-.004.135-.05.161-.161l.353-1.45a1.834 1.834 0 011.172-1.278 6.82 6.82 0 00.6-.248 1.831 1.831 0 011.733.074l1.275.776c.098.06.186.036.228 0 .348-.301.675-.628.976-.976.036-.042.06-.131 0-.228l-.776-1.275a1.834 1.834 0 01-.075-1.733c.093-.196.176-.396.25-.6a1.831 1.831 0 011.278-1.173l1.45-.351c.11-.027.156-.107.16-.162a9.63 9.63 0 000-1.38c-.004-.055-.05-.135-.161-.161l-1.45-.353c-.626-.152-1.08-.625-1.278-1.172a6.576 6.576 0 00-.248-.6 1.833 1.833 0 01.074-1.734l.776-1.274c.06-.098.036-.186 0-.228a9.774 9.774 0 00-.976-.976c-.042-.036-.131-.06-.228 0l-1.275.776a1.831 1.831 0 01-1.733.074 6.88 6.88 0 00-.6-.249 1.835 1.835 0 01-1.173-1.278l-.351-1.45c-.027-.11-.107-.156-.162-.16a9.63 9.63 0 00-1.38 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var gift = {
	name: "gift",
	keywords: [
		"package",
		"present",
		"skill",
		"craft",
		"freebie"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 2.75A2.75 2.75 0 014.75 0c.983 0 1.873.42 2.57 1.232.268.318.497.668.68 1.042.183-.375.411-.725.68-1.044C9.376.42 10.266 0 11.25 0a2.75 2.75 0 012.45 4h.55c.966 0 1.75.784 1.75 1.75v2c0 .698-.409 1.301-1 1.582v4.918A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V9.332C.409 9.05 0 8.448 0 7.75v-2C0 4.784.784 4 1.75 4h.55c-.192-.375-.3-.8-.3-1.25zM7.25 9.5H2.5v4.75c0 .138.112.25.25.25h4.5zm1.5 0v5h4.5a.25.25 0 00.25-.25V9.5zm0-4V8h5.5a.25.25 0 00.25-.25v-2a.25.25 0 00-.25-.25zm-7 0a.25.25 0 00-.25.25v2c0 .138.112.25.25.25h5.5V5.5h-5.5zm3-4a1.25 1.25 0 000 2.5h2.309c-.233-.818-.542-1.401-.878-1.793-.43-.502-.915-.707-1.431-.707zM8.941 4h2.309a1.25 1.25 0 000-2.5c-.516 0-1 .205-1.43.707-.337.392-.646.975-.879 1.793z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2.75A2.75 2.75 0 014.75 0c.983 0 1.873.42 2.57 1.232.268.318.497.668.68 1.042.183-.375.411-.725.68-1.044C9.376.42 10.266 0 11.25 0a2.75 2.75 0 012.45 4h.55c.966 0 1.75.784 1.75 1.75v2c0 .698-.409 1.301-1 1.582v4.918A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V9.332C.409 9.05 0 8.448 0 7.75v-2C0 4.784.784 4 1.75 4h.55c-.192-.375-.3-.8-.3-1.25zM7.25 9.5H2.5v4.75c0 .138.112.25.25.25h4.5zm1.5 0v5h4.5a.25.25 0 00.25-.25V9.5zm0-4V8h5.5a.25.25 0 00.25-.25v-2a.25.25 0 00-.25-.25zm-7 0a.25.25 0 00-.25.25v2c0 .138.112.25.25.25h5.5V5.5h-5.5zm3-4a1.25 1.25 0 000 2.5h2.309c-.233-.818-.542-1.401-.878-1.793-.43-.502-.915-.707-1.431-.707zM8.941 4h2.309a1.25 1.25 0 000-2.5c-.516 0-1 .205-1.43.707-.337.392-.646.975-.879 1.793z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.75 3.75A3.75 3.75 0 017.5 0c1.455 0 3.436.901 4.5 3.11C13.064.901 15.044 0 16.5 0a3.75 3.75 0 013 6h1.75c.966 0 1.75.784 1.75 1.75v2.5c0 .698-.409 1.301-1 1.582v8.418A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-8.418c-.591-.282-1-.884-1-1.582v-2.5C1 6.784 1.784 6 2.75 6H4.5a3.733 3.733 0 01-.75-2.25zM20.5 12h-7.75v8.5h7.5a.25.25 0 00.25-.25zm-9.25 8.5V12H3.5v8.25c0 .138.112.25.25.25zm10-10a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-8.5v3zm-18.5 0h8.5v-3h-8.5a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25zm16-6.75A2.25 2.25 0 0016.5 1.5c-1.15 0-3.433 1.007-3.72 4.5h3.72a2.25 2.25 0 002.25-2.25zM11.22 6c-.287-3.493-2.57-4.5-3.72-4.5a2.25 2.25 0 100 4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 3.75A3.75 3.75 0 017.5 0c1.455 0 3.436.901 4.5 3.11C13.064.901 15.044 0 16.5 0a3.75 3.75 0 013 6h1.75c.966 0 1.75.784 1.75 1.75v2.5c0 .698-.409 1.301-1 1.582v8.418A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-8.418c-.591-.282-1-.884-1-1.582v-2.5C1 6.784 1.784 6 2.75 6H4.5a3.733 3.733 0 01-.75-2.25zM20.5 12h-7.75v8.5h7.5a.25.25 0 00.25-.25zm-9.25 8.5V12H3.5v8.25c0 .138.112.25.25.25zm10-10a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25h-8.5v3zm-18.5 0h8.5v-3h-8.5a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25zm16-6.75A2.25 2.25 0 0016.5 1.5c-1.15 0-3.433 1.007-3.72 4.5h3.72a2.25 2.25 0 002.25-2.25zM11.22 6c-.287-3.493-2.57-4.5-3.72-4.5a2.25 2.25 0 100 4.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var globe = {
	name: "globe",
	keywords: [
		"world",
		"earth",
		"planet",
		"enterprise"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM5.78 8.75a9.64 9.64 0 001.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0010.22 8.75zm4.44-1.5a9.64 9.64 0 00-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 00-.857 1.215A9.64 9.64 0 005.78 7.25zm-5.944 1.5H1.543a6.507 6.507 0 004.666 5.5c-.123-.181-.24-.365-.352-.552-.715-1.192-1.437-2.874-1.581-4.948zm-2.733-1.5h2.733c.144-2.074.866-3.756 1.58-4.948.12-.197.237-.381.353-.552a6.507 6.507 0 00-4.666 5.5zm10.181 1.5c-.144 2.074-.866 3.756-1.58 4.948-.12.197-.237.381-.353.552a6.507 6.507 0 004.666-5.5zm2.733-1.5a6.507 6.507 0 00-4.666-5.5c.123.181.24.365.353.552.714 1.192 1.436 2.874 1.58 4.948z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM5.78 8.75a9.64 9.64 0 001.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0010.22 8.75zm4.44-1.5a9.64 9.64 0 00-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 00-.857 1.215A9.64 9.64 0 005.78 7.25zm-5.944 1.5H1.543a6.507 6.507 0 004.666 5.5c-.123-.181-.24-.365-.352-.552-.715-1.192-1.437-2.874-1.581-4.948zm-2.733-1.5h2.733c.144-2.074.866-3.756 1.58-4.948.12-.197.237-.381.353-.552a6.507 6.507 0 00-4.666 5.5zm10.181 1.5c-.144 2.074-.866 3.756-1.58 4.948-.12.197-.237.381-.353.552a6.507 6.507 0 004.666-5.5zm2.733-1.5a6.507 6.507 0 00-4.666-5.5c.123.181.24.365.353.552.714 1.192 1.436 2.874 1.58 4.948z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm3.241 10.5v-.001c-.1-2.708-.992-4.904-1.89-6.452a13.919 13.919 0 00-1.304-1.88L12 3.11l-.047.059c-.354.425-.828 1.06-1.304 1.88-.898 1.547-1.79 3.743-1.89 6.451zm-12.728 0h4.745c.1-3.037 1.1-5.49 2.093-7.204.39-.672.78-1.233 1.119-1.673C6.11 3.329 2.746 7 2.513 11.5zm18.974 0C21.254 7 17.89 3.329 13.53 2.623c.339.44.729 1.001 1.119 1.673.993 1.714 1.993 4.167 2.093 7.204zM8.787 13c.182 2.478 1.02 4.5 1.862 5.953.382.661.818 1.29 1.304 1.88l.047.057.047-.059c.354-.425.828-1.06 1.304-1.88.842-1.451 1.679-3.471 1.862-5.951zm-1.504 0H2.552a9.505 9.505 0 007.918 8.377 15.773 15.773 0 01-1.119-1.673C8.413 18.085 7.47 15.807 7.283 13zm9.434 0c-.186 2.807-1.13 5.085-2.068 6.704-.39.672-.78 1.233-1.118 1.673A9.506 9.506 0 0021.447 13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm3.241 10.5v-.001c-.1-2.708-.992-4.904-1.89-6.452a13.919 13.919 0 00-1.304-1.88L12 3.11l-.047.059c-.354.425-.828 1.06-1.304 1.88-.898 1.547-1.79 3.743-1.89 6.451zm-12.728 0h4.745c.1-3.037 1.1-5.49 2.093-7.204.39-.672.78-1.233 1.119-1.673C6.11 3.329 2.746 7 2.513 11.5zm18.974 0C21.254 7 17.89 3.329 13.53 2.623c.339.44.729 1.001 1.119 1.673.993 1.714 1.993 4.167 2.093 7.204zM8.787 13c.182 2.478 1.02 4.5 1.862 5.953.382.661.818 1.29 1.304 1.88l.047.057.047-.059c.354-.425.828-1.06 1.304-1.88.842-1.451 1.679-3.471 1.862-5.951zm-1.504 0H2.552a9.505 9.505 0 007.918 8.377 15.773 15.773 0 01-1.119-1.673C8.413 18.085 7.47 15.807 7.283 13zm9.434 0c-.186 2.807-1.13 5.085-2.068 6.704-.39.672-.78 1.233-1.118 1.673A9.506 9.506 0 0021.447 13z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var goal = {
	name: "goal",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.637 2.363h-.001l1.676.335c.09.018.164.084.19.173a.25.25 0 01-.062.249l-1.373 1.374a.876.876 0 01-.619.256H12.31L9.45 7.611A1.5 1.5 0 116.5 8a1.501 1.501 0 011.889-1.449l2.861-2.862V2.552c0-.232.092-.455.256-.619L12.88.559a.25.25 0 01.249-.062c.089.026.155.1.173.19z\"></path><path d=\"M2 8a6 6 0 1011.769-1.656.751.751 0 111.442-.413 7.502 7.502 0 01-12.513 7.371A7.501 7.501 0 0110.069.789a.75.75 0 01-.413 1.442A6.001 6.001 0 002 8z\"></path><path d=\"M5 8a3.002 3.002 0 004.699 2.476 3 3 0 001.28-2.827.748.748 0 011.045-.782.75.75 0 01.445.61A4.5 4.5 0 118.516 3.53a.75.75 0 11-.17 1.49A3 3 0 005 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.637 2.363h-.001l1.676.335c.09.018.164.084.19.173a.25.25 0 01-.062.249l-1.373 1.374a.876.876 0 01-.619.256H12.31L9.45 7.611A1.5 1.5 0 116.5 8a1.501 1.501 0 011.889-1.449l2.861-2.862V2.552c0-.232.092-.455.256-.619L12.88.559a.25.25 0 01.249-.062c.089.026.155.1.173.19z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 8a6 6 0 1011.769-1.656.751.751 0 111.442-.413 7.502 7.502 0 01-12.513 7.371A7.501 7.501 0 0110.069.789a.75.75 0 01-.413 1.442A6.001 6.001 0 002 8z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 8a3.002 3.002 0 004.699 2.476 3 3 0 001.28-2.827.748.748 0 011.045-.782.75.75 0 01.445.61A4.5 4.5 0 118.516 3.53a.75.75 0 11-.17 1.49A3 3 0 005 8z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20.172 6.75h-1.861l-4.566 4.564a1.874 1.874 0 11-1.06-1.06l4.565-4.565V3.828a.94.94 0 01.275-.664l1.73-1.73a.249.249 0 01.25-.063c.089.026.155.1.173.191l.46 2.301 2.3.46c.09.018.164.084.19.173a.25.25 0 01-.062.249l-1.731 1.73a.937.937 0 01-.663.275z\"></path><path d=\"M2.625 12A9.375 9.375 0 0012 21.375 9.375 9.375 0 0021.375 12c0-.898-.126-1.766-.361-2.587A.75.75 0 0122.455 9c.274.954.42 1.96.42 3 0 6.006-4.869 10.875-10.875 10.875S1.125 18.006 1.125 12 5.994 1.125 12 1.125c1.015-.001 2.024.14 3 .419a.75.75 0 11-.413 1.442A9.39 9.39 0 0012 2.625 9.375 9.375 0 002.625 12z\"></path><path d=\"M7.125 12a4.874 4.874 0 109.717-.569.748.748 0 011.047-.798c.251.112.42.351.442.625a6.373 6.373 0 01-10.836 5.253 6.376 6.376 0 015.236-10.844.75.75 0 11-.17 1.49A4.876 4.876 0 007.125 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20.172 6.75h-1.861l-4.566 4.564a1.874 1.874 0 11-1.06-1.06l4.565-4.565V3.828a.94.94 0 01.275-.664l1.73-1.73a.249.249 0 01.25-.063c.089.026.155.1.173.191l.46 2.301 2.3.46c.09.018.164.084.19.173a.25.25 0 01-.062.249l-1.731 1.73a.937.937 0 01-.663.275z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.625 12A9.375 9.375 0 0012 21.375 9.375 9.375 0 0021.375 12c0-.898-.126-1.766-.361-2.587A.75.75 0 0122.455 9c.274.954.42 1.96.42 3 0 6.006-4.869 10.875-10.875 10.875S1.125 18.006 1.125 12 5.994 1.125 12 1.125c1.015-.001 2.024.14 3 .419a.75.75 0 11-.413 1.442A9.39 9.39 0 0012 2.625 9.375 9.375 0 002.625 12z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.125 12a4.874 4.874 0 109.717-.569.748.748 0 011.047-.798c.251.112.42.351.442.625a6.373 6.373 0 01-10.836 5.253 6.376 6.376 0 015.236-10.844.75.75 0 11-.17 1.49A4.876 4.876 0 007.125 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var grabber = {
	name: "grabber",
	keywords: [
		"mover",
		"drag",
		"drop",
		"sort"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10 13a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2zm-4 4a1 1 0 110-2 1 1 0 010 2zm5-9a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10 13a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2zm-4 4a1 1 0 110-2 1 1 0 010 2zm5-9a1 1 0 11-2 0 1 1 0 012 0zM7 8a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9 13a1 1 0 110-2 1 1 0 010 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM9 8a1 1 0 110-2 1 1 0 010 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM9 18a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9 13a1 1 0 110-2 1 1 0 010 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM9 8a1 1 0 110-2 1 1 0 010 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM9 18a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var graph = {
	name: "graph",
	keywords: [
		"trend",
		"stats",
		"statistics"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.5 1.75V13.5h13.75a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75V1.75a.75.75 0 011.5 0zm14.28 2.53l-5.25 5.25a.75.75 0 01-1.06 0L7 7.06 4.28 9.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25a.75.75 0 011.06 0L10 7.94l4.72-4.72a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 1.75V13.5h13.75a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75V1.75a.75.75 0 011.5 0zm14.28 2.53l-5.25 5.25a.75.75 0 01-1.06 0L7 7.06 4.28 9.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25a.75.75 0 011.06 0L10 7.94l4.72-4.72a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.5 2.75a.75.75 0 00-1.5 0v18.5c0 .414.336.75.75.75H20a.75.75 0 000-1.5H2.5V2.75z\"></path><path d=\"M22.28 7.78a.75.75 0 00-1.06-1.06l-5.72 5.72-3.72-3.72a.75.75 0 00-1.06 0l-6 6a.75.75 0 101.06 1.06l5.47-5.47 3.72 3.72a.75.75 0 001.06 0l6.25-6.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 2.75a.75.75 0 00-1.5 0v18.5c0 .414.336.75.75.75H20a.75.75 0 000-1.5H2.5V2.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22.28 7.78a.75.75 0 00-1.06-1.06l-5.72 5.72-3.72-3.72a.75.75 0 00-1.06 0l-6 6a.75.75 0 101.06 1.06l5.47-5.47 3.72 3.72a.75.75 0 001.06 0l6.25-6.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var hash$2 = {
	name: "hash",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.368 1.01a.75.75 0 01.623.859L6.57 4.5h3.98l.46-2.868a.75.75 0 011.48.237L12.07 4.5h2.18a.75.75 0 010 1.5h-2.42l-.64 4h2.56a.75.75 0 010 1.5h-2.8l-.46 2.869a.75.75 0 01-1.48-.237l.42-2.632H5.45l-.46 2.869a.75.75 0 01-1.48-.237l.42-2.632H1.75a.75.75 0 010-1.5h2.42l.64-4H2.25a.75.75 0 010-1.5h2.8l.46-2.868a.75.75 0 01.858-.622zM9.67 10l.64-4H6.33l-.64 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.368 1.01a.75.75 0 01.623.859L6.57 4.5h3.98l.46-2.868a.75.75 0 011.48.237L12.07 4.5h2.18a.75.75 0 010 1.5h-2.42l-.64 4h2.56a.75.75 0 010 1.5h-2.8l-.46 2.869a.75.75 0 01-1.48-.237l.42-2.632H5.45l-.46 2.869a.75.75 0 01-1.48-.237l.42-2.632H1.75a.75.75 0 010-1.5h2.42l.64-4H2.25a.75.75 0 010-1.5h2.8l.46-2.868a.75.75 0 01.858-.622zM9.67 10l.64-4H6.33l-.64 4z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.618 1.76a.75.75 0 01.623.859L9.46 7.5h6.48l.82-5.118a.75.75 0 011.48.237L17.46 7.5h3.79a.75.75 0 010 1.5h-4.03l-.96 6h3.99a.75.75 0 010 1.5h-4.23l-.78 4.869a.75.75 0 01-1.48-.237l.74-4.632H8.02l-.78 4.869a.75.75 0 01-1.48-.237L6.5 16.5H2.745a.75.75 0 010-1.5H6.74l.96-6H3.75a.75.75 0 010-1.5h4.19l.82-5.118a.75.75 0 01.858-.622zM14.741 15l.96-6H9.22l-.96 6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.618 1.76a.75.75 0 01.623.859L9.46 7.5h6.48l.82-5.118a.75.75 0 011.48.237L17.46 7.5h3.79a.75.75 0 010 1.5h-4.03l-.96 6h3.99a.75.75 0 010 1.5h-4.23l-.78 4.869a.75.75 0 01-1.48-.237l.74-4.632H8.02l-.78 4.869a.75.75 0 01-1.48-.237L6.5 16.5H2.745a.75.75 0 010-1.5H6.74l.96-6H3.75a.75.75 0 010-1.5h4.19l.82-5.118a.75.75 0 01.858-.622zM14.741 15l.96-6H9.22l-.96 6z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var heading = {
	name: "heading",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.75 2a.75.75 0 01.75.75V7h7V2.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V8.5h-7v4.75a.75.75 0 01-1.5 0V2.75A.75.75 0 013.75 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2a.75.75 0 01.75.75V7h7V2.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V8.5h-7v4.75a.75.75 0 01-1.5 0V2.75A.75.75 0 013.75 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6.25 4a.75.75 0 01.75.75V11h10V4.75a.75.75 0 011.5 0v14.5a.75.75 0 01-1.5 0V12.5H7v6.75a.75.75 0 01-1.5 0V4.75A.75.75 0 016.25 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.25 4a.75.75 0 01.75.75V11h10V4.75a.75.75 0 011.5 0v14.5a.75.75 0 01-1.5 0V12.5H7v6.75a.75.75 0 01-1.5 0V4.75A.75.75 0 016.25 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var heart = {
	name: "heart",
	keywords: [
		"love",
		"beat"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 14.25l.345.666a.75.75 0 01-.69 0l-.008-.004-.018-.01a7.152 7.152 0 01-.31-.17 22.055 22.055 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 01-3.744 2.584l-.018.01-.006.003h-.002zM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 008 13.393a20.58 20.58 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 14.25l.345.666a.75.75 0 01-.69 0l-.008-.004-.018-.01a7.152 7.152 0 01-.31-.17 22.055 22.055 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 01-3.744 2.584l-.018.01-.006.003h-.002zM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 008 13.393a20.58 20.58 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 20.703l.343.667a.748.748 0 01-.686 0l-.003-.002-.007-.003-.025-.013a31.138 31.138 0 01-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.148 31.148 0 01-5.233 3.576l-.025.013-.007.003-.002.001zM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.655 29.655 0 004.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 01-1.422 0C10.537 5.389 8.841 4 6.736 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 20.703l.343.667a.748.748 0 01-.686 0l-.003-.002-.007-.003-.025-.013a31.138 31.138 0 01-5.233-3.576C3.8 15.573 1 12.332 1 8.514v-.001C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.148 31.148 0 01-5.233 3.576l-.025.013-.007.003-.002.001zM6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.655 29.655 0 004.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.751.751 0 01-1.422 0C10.537 5.389 8.841 4 6.736 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var history = {
	name: "history",
	keywords: [
		"time",
		"past",
		"revert",
		"back"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.427 1.927l1.215 1.215a8.002 8.002 0 11-1.6 5.685.75.75 0 111.493-.154 6.5 6.5 0 101.18-4.458l1.358 1.358A.25.25 0 013.896 6H.25A.25.25 0 010 5.75V2.104a.25.25 0 01.427-.177zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.751.751 0 017 8.25v-3.5A.75.75 0 017.75 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.427 1.927l1.215 1.215a8.002 8.002 0 11-1.6 5.685.75.75 0 111.493-.154 6.5 6.5 0 101.18-4.458l1.358 1.358A.25.25 0 013.896 6H.25A.25.25 0 010 5.75V2.104a.25.25 0 01.427-.177zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.751.751 0 017 8.25v-3.5A.75.75 0 017.75 4z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.998 2.5A9.503 9.503 0 003.378 8H5.75a.75.75 0 010 1.5H2a1 1 0 01-1-1V4.75a.75.75 0 011.5 0v1.697A10.997 10.997 0 0111.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 011.5-.037 9.5 9.5 0 009.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5z\"></path><path d=\"M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.998 2.5A9.503 9.503 0 003.378 8H5.75a.75.75 0 010 1.5H2a1 1 0 01-1-1V4.75a.75.75 0 011.5 0v1.697A10.997 10.997 0 0111.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 011.5-.037 9.5 9.5 0 009.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.5 7.25a.75.75 0 00-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 00.744-1.302L12.5 12.315V7.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var home = {
	name: "home",
	keywords: [
		"welcome",
		"index",
		"house",
		"building"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.906.664a1.749 1.749 0 012.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0113.25 15h-3.5a.75.75 0 01-.75-.75V9H7v5.25a.75.75 0 01-.75.75h-3.5A1.75 1.75 0 011 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2zm1.25 1.171a.25.25 0 00-.312 0l-5.25 4.2a.25.25 0 00-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v5.25h2.75a.25.25 0 00.25-.25V6.23a.25.25 0 00-.094-.195z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.906.664a1.749 1.749 0 012.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0113.25 15h-3.5a.75.75 0 01-.75-.75V9H7v5.25a.75.75 0 01-.75.75h-3.5A1.75 1.75 0 011 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2zm1.25 1.171a.25.25 0 00-.312 0l-5.25 4.2a.25.25 0 00-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v5.25h2.75a.25.25 0 00.25-.25V6.23a.25.25 0 00-.094-.195z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.03 2.59a1.501 1.501 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.03 2.59a1.501 1.501 0 011.94 0l7.5 6.363a1.5 1.5 0 01.53 1.144V19.5a1.5 1.5 0 01-1.5 1.5h-5.75a.75.75 0 01-.75-.75V14h-2v6.25a.75.75 0 01-.75.75H4.5A1.5 1.5 0 013 19.5v-9.403c0-.44.194-.859.53-1.144zM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v6.25h5v-9.403z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var hourglass = {
	name: "hourglass",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 1h10.5a.75.75 0 010 1.5h-.75v1.25a4.75 4.75 0 01-1.9 3.8l-.333.25a.25.25 0 000 .4l.333.25a4.75 4.75 0 011.9 3.8v1.25h.75a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h.75v-1.25a4.75 4.75 0 011.9-3.8l.333-.25a.25.25 0 000-.4L5.4 7.55a4.75 4.75 0 01-1.9-3.8V2.5h-.75a.75.75 0 010-1.5zM11 2.5H5v1.25c0 1.023.482 1.986 1.3 2.6l.333.25c.934.7.934 2.1 0 2.8l-.333.25a3.251 3.251 0 00-1.3 2.6v1.25h6v-1.25a3.251 3.251 0 00-1.3-2.6l-.333-.25a1.748 1.748 0 010-2.8l.333-.25a3.251 3.251 0 001.3-2.6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 1h10.5a.75.75 0 010 1.5h-.75v1.25a4.75 4.75 0 01-1.9 3.8l-.333.25a.25.25 0 000 .4l.333.25a4.75 4.75 0 011.9 3.8v1.25h.75a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h.75v-1.25a4.75 4.75 0 011.9-3.8l.333-.25a.25.25 0 000-.4L5.4 7.55a4.75 4.75 0 01-1.9-3.8V2.5h-.75a.75.75 0 010-1.5zM11 2.5H5v1.25c0 1.023.482 1.986 1.3 2.6l.333.25c.934.7.934 2.1 0 2.8l-.333.25a3.251 3.251 0 00-1.3 2.6v1.25h6v-1.25a3.251 3.251 0 00-1.3-2.6l-.333-.25a1.748 1.748 0 010-2.8l.333-.25a3.251 3.251 0 001.3-2.6z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.75 2h14.5a.75.75 0 010 1.5h-.75v2.982a4.75 4.75 0 01-2.215 4.017l-2.044 1.29a.25.25 0 000 .422l2.044 1.29a4.75 4.75 0 012.215 4.017V20.5h.75a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5h.75v-2.982a4.75 4.75 0 012.215-4.017l2.044-1.29a.25.25 0 000-.422l-2.044-1.29A4.75 4.75 0 015.5 6.482V3.5h-.75a.75.75 0 010-1.5zM17 3.5H7v2.982A3.25 3.25 0 008.516 9.23l2.044 1.29a1.75 1.75 0 010 2.96l-2.044 1.29A3.25 3.25 0 007 17.518V20.5h10v-2.982a3.25 3.25 0 00-1.516-2.748l-2.044-1.29a1.75 1.75 0 010-2.96l2.044-1.29A3.25 3.25 0 0017 6.482z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 2h14.5a.75.75 0 010 1.5h-.75v2.982a4.75 4.75 0 01-2.215 4.017l-2.044 1.29a.25.25 0 000 .422l2.044 1.29a4.75 4.75 0 012.215 4.017V20.5h.75a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5h.75v-2.982a4.75 4.75 0 012.215-4.017l2.044-1.29a.25.25 0 000-.422l-2.044-1.29A4.75 4.75 0 015.5 6.482V3.5h-.75a.75.75 0 010-1.5zM17 3.5H7v2.982A3.25 3.25 0 008.516 9.23l2.044 1.29a1.75 1.75 0 010 2.96l-2.044 1.29A3.25 3.25 0 007 17.518V20.5h10v-2.982a3.25 3.25 0 00-1.516-2.748l-2.044-1.29a1.75 1.75 0 010-2.96l2.044-1.29A3.25 3.25 0 0017 6.482z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var hubot = {
	name: "hubot",
	keywords: [
		"robot",
		"bot"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 0116 0v5.25a.75.75 0 01-1.5 0V8a6.5 6.5 0 10-13 0v5.25a.75.75 0 01-1.5 0zm3-1.25C3 5.784 3.784 5 4.75 5h6.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0111.25 10h-6.5A1.75 1.75 0 013 8.25zm1.47-.53a.75.75 0 000 1.06l1.5 1.5a.75.75 0 001.06 0L8 7.81l.97.97a.75.75 0 001.06 0l1.5-1.5a.749.749 0 00-.326-1.275.749.749 0 00-.734.215l-.97.97-.97-.97a.75.75 0 00-1.06 0l-.97.97-.97-.97a.75.75 0 00-1.06 0zm1.03 6.03a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 0116 0v5.25a.75.75 0 01-1.5 0V8a6.5 6.5 0 10-13 0v5.25a.75.75 0 01-1.5 0zm3-1.25C3 5.784 3.784 5 4.75 5h6.5c.966 0 1.75.784 1.75 1.75v1.5A1.75 1.75 0 0111.25 10h-6.5A1.75 1.75 0 013 8.25zm1.47-.53a.75.75 0 000 1.06l1.5 1.5a.75.75 0 001.06 0L8 7.81l.97.97a.75.75 0 001.06 0l1.5-1.5a.749.749 0 00-.326-1.275.749.749 0 00-.734.215l-.97.97-.97-.97a.75.75 0 00-1.06 0l-.97.97-.97-.97a.75.75 0 00-1.06 0zm1.03 6.03a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 01-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 01-1.5 0V13z\"></path><path d=\"M8 19.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 01-1.75 1.75H5.25a1.75 1.75 0 01-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75zm.22 1.47a.75.75 0 000 1.06l3 3a.75.75 0 001.06 0L12 12.56l2.47 2.47a.75.75 0 001.06 0l3-3a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L15 13.44l-2.47-2.47a.75.75 0 00-1.06 0L9 13.44l-2.47-2.47a.75.75 0 00-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 01-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 01-1.5 0V13z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 19.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM5.25 9.5h13.5c.966 0 1.75.784 1.75 1.75v3.5a1.75 1.75 0 01-1.75 1.75H5.25a1.75 1.75 0 01-1.75-1.75v-3.5c0-.966.784-1.75 1.75-1.75zm.22 1.47a.75.75 0 000 1.06l3 3a.75.75 0 001.06 0L12 12.56l2.47 2.47a.75.75 0 001.06 0l3-3a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L15 13.44l-2.47-2.47a.75.75 0 00-1.06 0L9 13.44l-2.47-2.47a.75.75 0 00-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var image = {
	name: "image",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M16 13.25A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75zM1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h.94l.03-.03 6.077-6.078a1.75 1.75 0 012.412-.06L14.5 10.31V2.75a.25.25 0 00-.25-.25zm12.5 11a.25.25 0 00.25-.25v-.917l-4.298-3.889a.25.25 0 00-.344.009L4.81 13.5zM7 6a2 2 0 11-3.999.001A2 2 0 017 6zM5.5 6a.5.5 0 10-1 0 .5.5 0 001 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 13.25A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75zM1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h.94l.03-.03 6.077-6.078a1.75 1.75 0 012.412-.06L14.5 10.31V2.75a.25.25 0 00-.25-.25zm12.5 11a.25.25 0 00.25-.25v-.917l-4.298-3.889a.25.25 0 00-.344.009L4.81 13.5zM7 6a2 2 0 11-3.999.001A2 2 0 017 6zM5.5 6a.5.5 0 10-1 0 .5.5 0 001 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.75 3h14.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0119.25 21H4.75A1.75 1.75 0 013 19.25V4.75C3 3.784 3.784 3 4.75 3zm14.5 1.5H4.75a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h.19l9.823-9.823a1.75 1.75 0 012.475 0l2.262 2.262V4.75a.25.25 0 00-.25-.25zm.25 9.56l-3.323-3.323a.25.25 0 00-.354 0L7.061 19.5H19.25a.25.25 0 00.25-.25zM8.5 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-1.5a1 1 0 100-2 1 1 0 000 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 3h14.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0119.25 21H4.75A1.75 1.75 0 013 19.25V4.75C3 3.784 3.784 3 4.75 3zm14.5 1.5H4.75a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h.19l9.823-9.823a1.75 1.75 0 012.475 0l2.262 2.262V4.75a.25.25 0 00-.25-.25zm.25 9.56l-3.323-3.323a.25.25 0 00-.354 0L7.061 19.5H19.25a.25.25 0 00.25-.25zM8.5 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-1.5a1 1 0 100-2 1 1 0 000 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var inbox = {
	name: "inbox",
	keywords: [
		"mail",
		"todo",
		"new",
		"messages"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.8 2.06A1.75 1.75 0 014.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-4.5c0-.101.02-.202.06-.295zm1.61.44a.25.25 0 00-.23.152L1.887 8H4.75a.75.75 0 01.6.3L6.625 10h2.75l1.275-1.7a.75.75 0 01.6-.3h2.863L11.82 2.652a.25.25 0 00-.23-.152zm10.09 7h-2.875l-1.275 1.7a.75.75 0 01-.6.3h-3.5a.75.75 0 01-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.8 2.06A1.75 1.75 0 014.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-4.5c0-.101.02-.202.06-.295zm1.61.44a.25.25 0 00-.23.152L1.887 8H4.75a.75.75 0 01.6.3L6.625 10h2.75l1.275-1.7a.75.75 0 01.6-.3h2.863L11.82 2.652a.25.25 0 00-.23-.152zm10.09 7h-2.875l-1.275 1.7a.75.75 0 01-.6.3h-3.5a.75.75 0 01-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.801 3.57A1.75 1.75 0 016.414 2.5h11.174c.702 0 1.337.42 1.611 1.067l3.741 8.828c.04.092.06.192.06.293v7.562A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25v-7.5c0-.1.02-.199.059-.291L4.8 3.571zM6.414 4a.25.25 0 00-.23.153L2.88 12H8a.75.75 0 01.648.372L10.18 15h3.638l1.533-2.628a.75.75 0 01.64-.372l5.13-.051-3.304-7.797a.25.25 0 00-.23-.152zM21.5 13.445l-5.067.05-1.535 2.633a.75.75 0 01-.648.372h-4.5a.75.75 0 01-.648-.372L7.57 13.5H2.5v6.75c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.801 3.57A1.75 1.75 0 016.414 2.5h11.174c.702 0 1.337.42 1.611 1.067l3.741 8.828c.04.092.06.192.06.293v7.562A1.75 1.75 0 0121.25 22H2.75A1.75 1.75 0 011 20.25v-7.5c0-.1.02-.199.059-.291L4.8 3.571zM6.414 4a.25.25 0 00-.23.153L2.88 12H8a.75.75 0 01.648.372L10.18 15h3.638l1.533-2.628a.75.75 0 01.64-.372l5.13-.051-3.304-7.797a.25.25 0 00-.23-.152zM21.5 13.445l-5.067.05-1.535 2.633a.75.75 0 01-.648.372h-4.5a.75.75 0 01-.648-.372L7.57 13.5H2.5v6.75c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var infinity = {
	name: "infinity",
	keywords: [
		"unlimited",
		"infinite"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 6.984c.59-.533 1.204-1.066 1.825-1.493.797-.548 1.7-.991 2.675-.991C14.414 4.5 16 6.086 16 8s-1.586 3.5-3.5 3.5c-.975 0-1.878-.444-2.675-.991-.621-.427-1.235-.96-1.825-1.493-.59.533-1.204 1.066-1.825 1.493-.797.547-1.7.991-2.675.991C1.586 11.5 0 9.914 0 8s1.586-3.5 3.5-3.5c.975 0 1.878.443 2.675.991.621.427 1.235.96 1.825 1.493zM9.114 8c.536.483 1.052.922 1.56 1.273.704.483 1.3.727 1.826.727 1.086 0 2-.914 2-2 0-1.086-.914-2-2-2-.525 0-1.122.244-1.825.727-.51.35-1.025.79-1.561 1.273zM3.5 6c-1.086 0-2 .914-2 2 0 1.086.914 2 2 2 .525 0 1.122-.244 1.825-.727.51-.35 1.025-.79 1.561-1.273-.536-.483-1.052-.922-1.56-1.273C4.621 6.244 4.025 6 3.5 6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 6.984c.59-.533 1.204-1.066 1.825-1.493.797-.548 1.7-.991 2.675-.991C14.414 4.5 16 6.086 16 8s-1.586 3.5-3.5 3.5c-.975 0-1.878-.444-2.675-.991-.621-.427-1.235-.96-1.825-1.493-.59.533-1.204 1.066-1.825 1.493-.797.547-1.7.991-2.675.991C1.586 11.5 0 9.914 0 8s1.586-3.5 3.5-3.5c.975 0 1.878.443 2.675.991.621.427 1.235.96 1.825 1.493zM9.114 8c.536.483 1.052.922 1.56 1.273.704.483 1.3.727 1.826.727 1.086 0 2-.914 2-2 0-1.086-.914-2-2-2-.525 0-1.122.244-1.825.727-.51.35-1.025.79-1.561 1.273zM3.5 6c-1.086 0-2 .914-2 2 0 1.086.914 2 2 2 .525 0 1.122-.244 1.825-.727.51-.35 1.025-.79 1.561-1.273-.536-.483-1.052-.922-1.56-1.273C4.621 6.244 4.025 6 3.5 6z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 11.16c.887-.933 1.813-1.865 2.78-2.6C15.952 7.668 17.267 7 18.75 7 21.657 7 24 9.615 24 12.25s-2.343 5.25-5.25 5.25c-1.483 0-2.798-.668-3.97-1.56-.967-.735-1.893-1.667-2.78-2.6-.887.933-1.813 1.865-2.78 2.6-1.172.892-2.487 1.56-3.97 1.56C2.343 17.5 0 14.885 0 12.25S2.343 7 5.25 7c1.483 0 2.798.667 3.97 1.56.967.735 1.893 1.667 2.78 2.6zM5.25 8.5c-2.032 0-3.75 1.895-3.75 3.75S3.218 16 5.25 16c1.017 0 2.014-.457 3.062-1.253.89-.678 1.758-1.554 2.655-2.497-.897-.943-1.765-1.82-2.655-2.497C7.264 8.957 6.267 8.5 5.25 8.5zm7.783 3.75c.897.943 1.765 1.82 2.655 2.497C16.736 15.543 17.733 16 18.75 16c2.032 0 3.75-1.895 3.75-3.75S20.782 8.5 18.75 8.5c-1.017 0-2.014.457-3.062 1.253-.89.678-1.758 1.554-2.655 2.497z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 11.16c.887-.933 1.813-1.865 2.78-2.6C15.952 7.668 17.267 7 18.75 7 21.657 7 24 9.615 24 12.25s-2.343 5.25-5.25 5.25c-1.483 0-2.798-.668-3.97-1.56-.967-.735-1.893-1.667-2.78-2.6-.887.933-1.813 1.865-2.78 2.6-1.172.892-2.487 1.56-3.97 1.56C2.343 17.5 0 14.885 0 12.25S2.343 7 5.25 7c1.483 0 2.798.667 3.97 1.56.967.735 1.893 1.667 2.78 2.6zM5.25 8.5c-2.032 0-3.75 1.895-3.75 3.75S3.218 16 5.25 16c1.017 0 2.014-.457 3.062-1.253.89-.678 1.758-1.554 2.655-2.497-.897-.943-1.765-1.82-2.655-2.497C7.264 8.957 6.267 8.5 5.25 8.5zm7.783 3.75c.897.943 1.765 1.82 2.655 2.497C16.736 15.543 17.733 16 18.75 16c2.032 0 3.75-1.895 3.75-3.75S20.782 8.5 18.75 8.5c-1.017 0-2.014.457-3.062 1.253-.89.678-1.758 1.554-2.655 2.497z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var info = {
	name: "info",
	keywords: [
		"help"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.5 7.75A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.5 7.75A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var italic = {
	name: "italic",
	keywords: [
		"font",
		"italic",
		"style"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10 4.75a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-3.514l-5.828 13h3.342a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5h3.514l5.828-13H10.75a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10 4.75a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-3.514l-5.828 13h3.342a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5h3.514l5.828-13H10.75a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var iterations = {
	name: "iterations",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.5 7.25a4.75 4.75 0 019.5 0 .75.75 0 001.5 0 6.25 6.25 0 10-6.25 6.25H12v2.146c0 .223.27.335.427.177l2.896-2.896a.25.25 0 000-.354l-2.896-2.896a.25.25 0 00-.427.177V12H7.25A4.75 4.75 0 012.5 7.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 7.25a4.75 4.75 0 019.5 0 .75.75 0 001.5 0 6.25 6.25 0 10-6.25 6.25H12v2.146c0 .223.27.335.427.177l2.896-2.896a.25.25 0 000-.354l-2.896-2.896a.25.25 0 00-.427.177V12H7.25A4.75 4.75 0 012.5 7.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.5 10.5a8 8 0 1116 0 .75.75 0 001.5 0 9.5 9.5 0 10-9.5 9.5h10.94l-2.72 2.72a.75.75 0 101.06 1.06l3.735-3.735c.44-.439.44-1.151 0-1.59L19.78 14.72a.75.75 0 00-1.06 1.06l2.72 2.72H10.5a8 8 0 01-8-8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 10.5a8 8 0 1116 0 .75.75 0 001.5 0 9.5 9.5 0 10-9.5 9.5h10.94l-2.72 2.72a.75.75 0 101.06 1.06l3.735-3.735c.44-.439.44-1.151 0-1.59L19.78 14.72a.75.75 0 00-1.06 1.06l2.72 2.72H10.5a8 8 0 01-8-8z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var key = {
	name: "key",
	keywords: [
		"key",
		"lock",
		"secure",
		"safe"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.5 0a5.499 5.499 0 11-1.288 10.848l-.932.932a.749.749 0 01-.53.22H7v.75a.749.749 0 01-.22.53l-.5.5a.749.749 0 01-.53.22H5v.75a.749.749 0 01-.22.53l-.5.5a.749.749 0 01-.53.22h-2A1.75 1.75 0 010 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0110.5 0zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 01-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 01.75-.75h1.19l.06-.06v-1.19a.75.75 0 01.75-.75h1.19l1.023-1.025a.75.75 0 01.768-.18A4 4 0 106.5 5.5zM11 6a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.5 0a5.499 5.499 0 11-1.288 10.848l-.932.932a.749.749 0 01-.53.22H7v.75a.749.749 0 01-.22.53l-.5.5a.749.749 0 01-.53.22H5v.75a.749.749 0 01-.22.53l-.5.5a.749.749 0 01-.53.22h-2A1.75 1.75 0 010 14.25v-2c0-.199.079-.389.22-.53l4.932-4.932A5.5 5.5 0 0110.5 0zm-4 5.5c-.001.431.069.86.205 1.269a.75.75 0 01-.181.768L1.5 12.56v1.69c0 .138.112.25.25.25h1.69l.06-.06v-1.19a.75.75 0 01.75-.75h1.19l.06-.06v-1.19a.75.75 0 01.75-.75h1.19l1.023-1.025a.75.75 0 01.768-.18A4 4 0 106.5 5.5zM11 6a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.75 8.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z\"></path><path d=\"M15.75 0a8.25 8.25 0 11-2.541 16.101l-1.636 1.636a1.744 1.744 0 01-1.237.513H9.25a.25.25 0 00-.25.25v1.448a.876.876 0 01-.256.619l-.214.213a.75.75 0 01-.545.22H5.25a.25.25 0 00-.25.25v1A1.75 1.75 0 013.25 24h-1.5A1.75 1.75 0 010 22.25v-2.836c0-.464.185-.908.513-1.236l7.386-7.388A8.249 8.249 0 0115.75 0zM9 8.25a6.733 6.733 0 00.463 2.462.75.75 0 01-.168.804l-7.722 7.721a.25.25 0 00-.073.177v2.836c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-1c0-.966.784-1.75 1.75-1.75H7.5v-1c0-.966.784-1.75 1.75-1.75h1.086a.25.25 0 00.177-.073l1.971-1.972a.75.75 0 01.804-.168A6.75 6.75 0 109 8.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.75 8.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.75 0a8.25 8.25 0 11-2.541 16.101l-1.636 1.636a1.744 1.744 0 01-1.237.513H9.25a.25.25 0 00-.25.25v1.448a.876.876 0 01-.256.619l-.214.213a.75.75 0 01-.545.22H5.25a.25.25 0 00-.25.25v1A1.75 1.75 0 013.25 24h-1.5A1.75 1.75 0 010 22.25v-2.836c0-.464.185-.908.513-1.236l7.386-7.388A8.249 8.249 0 0115.75 0zM9 8.25a6.733 6.733 0 00.463 2.462.75.75 0 01-.168.804l-7.722 7.721a.25.25 0 00-.073.177v2.836c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-1c0-.966.784-1.75 1.75-1.75H7.5v-1c0-.966.784-1.75 1.75-1.75h1.086a.25.25 0 00.177-.073l1.971-1.972a.75.75 0 01.804-.168A6.75 6.75 0 109 8.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var law = {
	name: "law",
	keywords: [
		"legal",
		"bill"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 010 1.5h-.427l2.111 4.692a.75.75 0 01-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 01-2.023-.454 3.544 3.544 0 01-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 01-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 00-.124-.033H8.75V13h2.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.5V3.5h-.984a.245.245 0 00-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 01-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 01-2.023-.454 3.544 3.544 0 01-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 01-.154-.838L2.178 4.5H1.75a.75.75 0 010-1.5h2.234a.249.249 0 00.125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 011.5 0zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 010 1.5h-.427l2.111 4.692a.75.75 0 01-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 01-2.023-.454 3.544 3.544 0 01-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 01-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 00-.124-.033H8.75V13h2.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.5V3.5h-.984a.245.245 0 00-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 01-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 01-2.023-.454 3.544 3.544 0 01-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 01-.154-.838L2.178 4.5H1.75a.75.75 0 010-1.5h2.234a.249.249 0 00.125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 011.5 0zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 010 1.5H20.07l3.366 7.68a.749.749 0 01-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 01-.79.399 7.349 7.349 0 01-2.856.569 7.343 7.343 0 01-2.855-.568 6.205 6.205 0 01-.79-.4 3.205 3.205 0 01-.307-.202l-.005-.004a.749.749 0 01-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 00-.14-.043H12.75v14.5h4.487a.75.75 0 010 1.5H6.763a.75.75 0 010-1.5h4.487V6H9.275a.249.249 0 00-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 01-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 01-.792.433 6.924 6.924 0 01-2.876.62 6.913 6.913 0 01-2.876-.62 6.077 6.077 0 01-.792-.433 3.483 3.483 0 01-.309-.221.762.762 0 01-.21-.88L3.93 7.5H2.353a.75.75 0 010-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 011.5 0zM2.193 15.198a5.414 5.414 0 002.557.635 5.414 5.414 0 002.557-.635L4.75 9.368zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 002.547-.576L19.25 9.367z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.75 2.75V4.5h1.975c.351 0 .694.106.984.303l1.697 1.154c.041.028.09.043.14.043h4.102a.75.75 0 010 1.5H20.07l3.366 7.68a.749.749 0 01-.23.896c-.1.074-.203.143-.31.206a6.296 6.296 0 01-.79.399 7.349 7.349 0 01-2.856.569 7.343 7.343 0 01-2.855-.568 6.205 6.205 0 01-.79-.4 3.205 3.205 0 01-.307-.202l-.005-.004a.749.749 0 01-.23-.896l3.368-7.68h-.886c-.351 0-.694-.106-.984-.303l-1.697-1.154a.246.246 0 00-.14-.043H12.75v14.5h4.487a.75.75 0 010 1.5H6.763a.75.75 0 010-1.5h4.487V6H9.275a.249.249 0 00-.14.043L7.439 7.197c-.29.197-.633.303-.984.303h-.886l3.368 7.68a.75.75 0 01-.209.878c-.08.065-.16.126-.31.223a6.077 6.077 0 01-.792.433 6.924 6.924 0 01-2.876.62 6.913 6.913 0 01-2.876-.62 6.077 6.077 0 01-.792-.433 3.483 3.483 0 01-.309-.221.762.762 0 01-.21-.88L3.93 7.5H2.353a.75.75 0 010-1.5h4.102c.05 0 .099-.015.141-.043l1.695-1.154c.29-.198.634-.303.985-.303h1.974V2.75a.75.75 0 011.5 0zM2.193 15.198a5.414 5.414 0 002.557.635 5.414 5.414 0 002.557-.635L4.75 9.368zm14.51-.024c.082.04.174.083.275.126.53.223 1.305.45 2.272.45a5.847 5.847 0 002.547-.576L19.25 9.367z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var link = {
	name: "link",
	keywords: [
		"connect",
		"hyperlink"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.775 3.275l1.25-1.25a3.5 3.5 0 114.95 4.95l-2.5 2.5a3.5 3.5 0 01-4.95 0 .751.751 0 01.018-1.042.751.751 0 011.042-.018 1.998 1.998 0 002.83 0l2.5-2.5a2.002 2.002 0 00-2.83-2.83l-1.25 1.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zm-4.69 9.64a1.998 1.998 0 002.83 0l1.25-1.25a.751.751 0 011.042.018.751.751 0 01.018 1.042l-1.25 1.25a3.5 3.5 0 11-4.95-4.95l2.5-2.5a3.5 3.5 0 014.95 0 .751.751 0 01-.018 1.042.751.751 0 01-1.042.018 1.998 1.998 0 00-2.83 0l-2.5 2.5a1.998 1.998 0 000 2.83z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.775 3.275l1.25-1.25a3.5 3.5 0 114.95 4.95l-2.5 2.5a3.5 3.5 0 01-4.95 0 .751.751 0 01.018-1.042.751.751 0 011.042-.018 1.998 1.998 0 002.83 0l2.5-2.5a2.002 2.002 0 00-2.83-2.83l-1.25 1.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zm-4.69 9.64a1.998 1.998 0 002.83 0l1.25-1.25a.751.751 0 011.042.018.751.751 0 01.018 1.042l-1.25 1.25a3.5 3.5 0 11-4.95-4.95l2.5-2.5a3.5 3.5 0 014.95 0 .751.751 0 01-.018 1.042.751.751 0 01-1.042.018 1.998 1.998 0 00-2.83 0l-2.5 2.5a1.998 1.998 0 000 2.83z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M14.78 3.653a3.936 3.936 0 115.567 5.567l-3.627 3.627a3.936 3.936 0 01-5.88-.353.75.75 0 00-1.18.928 5.436 5.436 0 008.12.486l3.628-3.628a5.436 5.436 0 10-7.688-7.688l-3 3a.75.75 0 001.06 1.061l3-3z\"></path><path d=\"M7.28 11.153a3.936 3.936 0 015.88.353.75.75 0 001.18-.928 5.436 5.436 0 00-8.12-.486L2.592 13.72a5.436 5.436 0 107.688 7.688l3-3a.75.75 0 10-1.06-1.06l-3 3a3.936 3.936 0 01-5.567-5.568l3.627-3.627z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.78 3.653a3.936 3.936 0 115.567 5.567l-3.627 3.627a3.936 3.936 0 01-5.88-.353.75.75 0 00-1.18.928 5.436 5.436 0 008.12.486l3.628-3.628a5.436 5.436 0 10-7.688-7.688l-3 3a.75.75 0 001.06 1.061l3-3z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.28 11.153a3.936 3.936 0 015.88.353.75.75 0 001.18-.928 5.436 5.436 0 00-8.12-.486L2.592 13.72a5.436 5.436 0 107.688 7.688l3-3a.75.75 0 10-1.06-1.06l-3 3a3.936 3.936 0 01-5.567-5.568l3.627-3.627z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var location = {
	name: "location",
	keywords: [
		"here",
		"marker"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M12.596 11.596l-3.535 3.536a1.5 1.5 0 01-2.122 0l-3.535-3.536a6.5 6.5 0 119.192-9.193 6.5 6.5 0 010 9.193zm-1.06-8.132v-.001a5 5 0 10-7.072 7.072L8 14.07l3.536-3.534a5 5 0 000-7.072zM8 9a2 2 0 11-.001-3.999A2 2 0 018 9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.596 11.596l-3.535 3.536a1.5 1.5 0 01-2.122 0l-3.535-3.536a6.5 6.5 0 119.192-9.193 6.5 6.5 0 010 9.193zm-1.06-8.132v-.001a5 5 0 10-7.072 7.072L8 14.07l3.536-3.534a5 5 0 000-7.072zM8 9a2 2 0 11-.001-3.999A2 2 0 018 9z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z\"></path><path d=\"M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 01-3.336 0l-5.375-5.375-.028-.028c-3.905-3.905-3.905-10.237 0-14.142 3.904-3.905 10.236-3.905 14.141 0zM5.99 4.489v.001a8.5 8.5 0 000 12.02l.023.024.002.002 5.378 5.378a.859.859 0 001.214 0l5.403-5.404a8.5 8.5 0 00-.043-11.977A8.5 8.5 0 005.99 4.489z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M19.071 3.429h.001c3.905 3.905 3.905 10.237 0 14.142l-5.403 5.403a2.36 2.36 0 01-3.336 0l-5.375-5.375-.028-.028c-3.905-3.905-3.905-10.237 0-14.142 3.904-3.905 10.236-3.905 14.141 0zM5.99 4.489v.001a8.5 8.5 0 000 12.02l.023.024.002.002 5.378 5.378a.859.859 0 001.214 0l5.403-5.404a8.5 8.5 0 00-.043-11.977A8.5 8.5 0 005.99 4.489z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var lock = {
	name: "lock",
	keywords: [
		"secure",
		"safe",
		"protected"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 4a4 4 0 018 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-5.5C2 6.784 2.784 6 3.75 6H4zm8.25 3.5h-8.5a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25zM10.5 6V4a2.5 2.5 0 10-5 0v2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 4a4 4 0 018 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-5.5C2 6.784 2.784 6 3.75 6H4zm8.25 3.5h-8.5a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25zM10.5 6V4a2.5 2.5 0 10-5 0v2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9zm-1.5 2.5v8a1 1 0 001 1h13a1 1 0 001-1v-8a1 1 0 00-1-1h-13a1 1 0 00-1 1zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9zm-1.5 2.5v8a1 1 0 001 1h13a1 1 0 001-1v-8a1 1 0 00-1-1h-13a1 1 0 00-1 1zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var log$2 = {
	name: "log",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5 8.25a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-4A.75.75 0 015 8.25zM4 10.5A.75.75 0 004 12h4a.75.75 0 000-1.5H4z\"></path><path d=\"M13-.005c1.654 0 3 1.328 3 3 0 .982-.338 1.933-.783 2.818-.443.879-1.028 1.758-1.582 2.588l-.011.017c-.568.853-1.104 1.659-1.501 2.446-.398.789-.623 1.494-.623 2.136a1.5 1.5 0 102.333-1.248.75.75 0 01.834-1.246A3 3 0 0113 16H3a3 3 0 01-3-3c0-1.582.891-3.135 1.777-4.506.209-.322.418-.637.623-.946.473-.709.923-1.386 1.287-2.048H2.51c-.576 0-1.381-.133-1.907-.783A2.68 2.68 0 010 2.995a3 3 0 013-3zm0 1.5a1.5 1.5 0 00-1.5 1.5c0 .476.223.834.667 1.132A.75.75 0 0111.75 5.5H5.368c-.467 1.003-1.141 2.015-1.773 2.963-.192.289-.381.571-.558.845C2.13 10.711 1.5 11.916 1.5 13A1.5 1.5 0 003 14.5h7.401A2.989 2.989 0 0110 13c0-.979.338-1.928.784-2.812.441-.874 1.023-1.748 1.575-2.576l.017-.026c.568-.853 1.103-1.658 1.501-2.448.398-.79.623-1.497.623-2.143 0-.838-.669-1.5-1.5-1.5zm-10 0a1.5 1.5 0 00-1.5 1.5c0 .321.1.569.27.778.097.12.325.227.74.227h7.674A2.737 2.737 0 0110 2.995c0-.546.146-1.059.401-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 8.25a.75.75 0 01.75-.75h4a.75.75 0 010 1.5h-4A.75.75 0 015 8.25zM4 10.5A.75.75 0 004 12h4a.75.75 0 000-1.5H4z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13-.005c1.654 0 3 1.328 3 3 0 .982-.338 1.933-.783 2.818-.443.879-1.028 1.758-1.582 2.588l-.011.017c-.568.853-1.104 1.659-1.501 2.446-.398.789-.623 1.494-.623 2.136a1.5 1.5 0 102.333-1.248.75.75 0 01.834-1.246A3 3 0 0113 16H3a3 3 0 01-3-3c0-1.582.891-3.135 1.777-4.506.209-.322.418-.637.623-.946.473-.709.923-1.386 1.287-2.048H2.51c-.576 0-1.381-.133-1.907-.783A2.68 2.68 0 010 2.995a3 3 0 013-3zm0 1.5a1.5 1.5 0 00-1.5 1.5c0 .476.223.834.667 1.132A.75.75 0 0111.75 5.5H5.368c-.467 1.003-1.141 2.015-1.773 2.963-.192.289-.381.571-.558.845C2.13 10.711 1.5 11.916 1.5 13A1.5 1.5 0 003 14.5h7.401A2.989 2.989 0 0110 13c0-.979.338-1.928.784-2.812.441-.874 1.023-1.748 1.575-2.576l.017-.026c.568-.853 1.103-1.658 1.501-2.448.398-.79.623-1.497.623-2.143 0-.838-.669-1.5-1.5-1.5zm-10 0a1.5 1.5 0 00-1.5 1.5c0 .321.1.569.27.778.097.12.325.227.74.227h7.674A2.737 2.737 0 0110 2.995c0-.546.146-1.059.401-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.197 10a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm-2.382 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm-1.581 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z\"></path><path d=\"M4.125 0h15.75a4.11 4.11 0 012.92 1.205A4.11 4.11 0 0124 4.125c0 1.384-.476 2.794-1.128 4.16-.652 1.365-1.515 2.757-2.352 4.104l-.008.013c-.849 1.368-1.669 2.691-2.28 3.97-.614 1.283-.982 2.45-.982 3.503a2.625 2.625 0 104.083-2.183.75.75 0 11.834-1.247A4.126 4.126 0 0119.875 24H4.5a4.125 4.125 0 01-4.125-4.125c0-2.234 1.258-4.656 2.59-6.902.348-.586.702-1.162 1.05-1.728.8-1.304 1.567-2.553 2.144-3.738H3.39c-.823 0-1.886-.193-2.567-1.035A3.647 3.647 0 010 4.125 4.125 4.125 0 014.125 0zM15.75 19.875c0-1.38.476-2.786 1.128-4.15.649-1.358 1.509-2.743 2.343-4.086l.017-.028c.849-1.367 1.669-2.692 2.28-3.972.614-1.285.982-2.457.982-3.514A2.615 2.615 0 0019.875 1.5a2.625 2.625 0 00-2.625 2.625c0 .865.421 1.509 1.167 2.009A.75.75 0 0118 7.507H7.812c-.65 1.483-1.624 3.069-2.577 4.619-.334.544-.666 1.083-.98 1.612-1.355 2.287-2.38 4.371-2.38 6.137A2.625 2.625 0 004.5 22.5h12.193a4.108 4.108 0 01-.943-2.625zM1.5 4.125c-.01.511.163 1.008.487 1.403.254.313.74.479 1.402.479h12.86a3.648 3.648 0 01-.499-1.882 4.11 4.11 0 01.943-2.625H4.125A2.625 2.625 0 001.5 4.125z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.197 10a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm-2.382 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm-1.581 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.125 0h15.75a4.11 4.11 0 012.92 1.205A4.11 4.11 0 0124 4.125c0 1.384-.476 2.794-1.128 4.16-.652 1.365-1.515 2.757-2.352 4.104l-.008.013c-.849 1.368-1.669 2.691-2.28 3.97-.614 1.283-.982 2.45-.982 3.503a2.625 2.625 0 104.083-2.183.75.75 0 11.834-1.247A4.126 4.126 0 0119.875 24H4.5a4.125 4.125 0 01-4.125-4.125c0-2.234 1.258-4.656 2.59-6.902.348-.586.702-1.162 1.05-1.728.8-1.304 1.567-2.553 2.144-3.738H3.39c-.823 0-1.886-.193-2.567-1.035A3.647 3.647 0 010 4.125 4.125 4.125 0 014.125 0zM15.75 19.875c0-1.38.476-2.786 1.128-4.15.649-1.358 1.509-2.743 2.343-4.086l.017-.028c.849-1.367 1.669-2.692 2.28-3.972.614-1.285.982-2.457.982-3.514A2.615 2.615 0 0019.875 1.5a2.625 2.625 0 00-2.625 2.625c0 .865.421 1.509 1.167 2.009A.75.75 0 0118 7.507H7.812c-.65 1.483-1.624 3.069-2.577 4.619-.334.544-.666 1.083-.98 1.612-1.355 2.287-2.38 4.371-2.38 6.137A2.625 2.625 0 004.5 22.5h12.193a4.108 4.108 0 01-.943-2.625zM1.5 4.125c-.01.511.163 1.008.487 1.403.254.313.74.479 1.402.479h12.86a3.648 3.648 0 01-.499-1.882 4.11 4.11 0 01.943-2.625H4.125A2.625 2.625 0 001.5 4.125z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var mail = {
	name: "mail",
	keywords: [
		"email",
		"unread"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809v6.442zm13-8.181v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V5.809L8.38 9.397a.75.75 0 01-.76 0L1.5 5.809v6.442zm13-8.181v-.32a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25v.32L8 7.88z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 18.75v-14C0 3.784.784 3 1.75 3zM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0zm0-2.662v.852l10.36 7a.25.25 0 00.28 0l10.36-7V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 18.75v-14C0 3.784.784 3 1.75 3zM1.5 7.412V18.75c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V7.412l-9.52 6.433c-.592.4-1.368.4-1.96 0zm0-2.662v.852l10.36 7a.25.25 0 00.28 0l10.36-7V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var markdown = {
	name: "markdown",
	keywords: [
		"markup",
		"style"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3zM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3zm2.99.5L14.5 8H13V5h-2v3H9.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3zM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3zm2.99.5L14.5 8H13V5h-2v3H9.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var megaphone = {
	name: "megaphone",
	keywords: [
		"bullhorn",
		"loud",
		"shout",
		"broadcast"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.25 9a.75.75 0 01.75.75c0 2.142.456 3.828.733 4.653a.122.122 0 00.05.064.212.212 0 00.117.033h1.31c.085 0 .18-.042.258-.152a.45.45 0 00.075-.366A16.743 16.743 0 016 9.75a.75.75 0 011.5 0c0 1.588.25 2.926.494 3.85.293 1.113-.504 2.4-1.783 2.4H4.9c-.686 0-1.35-.41-1.589-1.12A16.4 16.4 0 012.5 9.75.75.75 0 013.25 9z\"></path><path d=\"M0 6a4 4 0 014-4h2.75a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H4a4 4 0 01-4-4zm4-2.5a2.5 2.5 0 100 5h2v-5z\"></path><path d=\"M15.59.082A.75.75 0 0116 .75v10.5a.75.75 0 01-1.189.608l-.002-.001h.001l-.014-.01a5.775 5.775 0 00-.422-.25 10.63 10.63 0 00-1.469-.64C11.576 10.484 9.536 10 6.75 10a.75.75 0 010-1.5c2.964 0 5.174.516 6.658 1.043.423.151.787.302 1.092.443V2.014c-.305.14-.669.292-1.092.443C11.924 2.984 9.713 3.5 6.75 3.5a.75.75 0 010-1.5c2.786 0 4.826-.484 6.155-.957.665-.236 1.154-.47 1.47-.64.144-.077.284-.161.421-.25l.014-.01a.75.75 0 01.78-.061z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 9a.75.75 0 01.75.75c0 2.142.456 3.828.733 4.653a.122.122 0 00.05.064.212.212 0 00.117.033h1.31c.085 0 .18-.042.258-.152a.45.45 0 00.075-.366A16.743 16.743 0 016 9.75a.75.75 0 011.5 0c0 1.588.25 2.926.494 3.85.293 1.113-.504 2.4-1.783 2.4H4.9c-.686 0-1.35-.41-1.589-1.12A16.4 16.4 0 012.5 9.75.75.75 0 013.25 9z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 6a4 4 0 014-4h2.75a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H4a4 4 0 01-4-4zm4-2.5a2.5 2.5 0 100 5h2v-5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.59.082A.75.75 0 0116 .75v10.5a.75.75 0 01-1.189.608l-.002-.001h.001l-.014-.01a5.775 5.775 0 00-.422-.25 10.63 10.63 0 00-1.469-.64C11.576 10.484 9.536 10 6.75 10a.75.75 0 010-1.5c2.964 0 5.174.516 6.658 1.043.423.151.787.302 1.092.443V2.014c-.305.14-.669.292-1.092.443C11.924 2.984 9.713 3.5 6.75 3.5a.75.75 0 010-1.5c2.786 0 4.826-.484 6.155-.957.665-.236 1.154-.47 1.47-.64.144-.077.284-.161.421-.25l.014-.01a.75.75 0 01.78-.061z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M22 1.75v14.5a.75.75 0 01-.399.662c-.384.204-.783-.035-1.139-.248l-.003-.002c-.09-.054-.177-.107-.261-.15a15.53 15.53 0 00-2-.849c-1.738-.607-4.321-1.223-7.703-1.251a.833.833 0 01.005.088c0 2.279.494 4.279.906 5.547.368 1.131-.438 2.453-1.732 2.453H7.661c-.696 0-1.36-.42-1.6-1.129C5.684 20.255 5 17.811 5 14.75v-.457A5.5 5.5 0 016.5 3.5h3.75c3.505 0 6.175-.61 7.955-1.21a15.88 15.88 0 002.002-.82 9.21 9.21 0 00.49-.262c.048-.028.095-.055.142-.085A.751.751 0 0122 1.75zM10.5 12.912c3.564.029 6.313.678 8.193 1.335.737.258 1.34.517 1.807.74V2.993c-.467.216-1.073.467-1.815.718-1.878.634-4.624 1.26-8.185 1.288zM6.5 5a4 4 0 000 8H9V5zm0 9.75c0 2.847.638 5.123.982 6.141.018.051.074.109.179.109h2.013c.087 0 .179-.043.249-.147a.396.396 0 00.057-.343C9.537 19.148 9 16.986 9 14.5H6.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22 1.75v14.5a.75.75 0 01-.399.662c-.384.204-.783-.035-1.139-.248l-.003-.002c-.09-.054-.177-.107-.261-.15a15.53 15.53 0 00-2-.849c-1.738-.607-4.321-1.223-7.703-1.251a.833.833 0 01.005.088c0 2.279.494 4.279.906 5.547.368 1.131-.438 2.453-1.732 2.453H7.661c-.696 0-1.36-.42-1.6-1.129C5.684 20.255 5 17.811 5 14.75v-.457A5.5 5.5 0 016.5 3.5h3.75c3.505 0 6.175-.61 7.955-1.21a15.88 15.88 0 002.002-.82 9.21 9.21 0 00.49-.262c.048-.028.095-.055.142-.085A.751.751 0 0122 1.75zM10.5 12.912c3.564.029 6.313.678 8.193 1.335.737.258 1.34.517 1.807.74V2.993c-.467.216-1.073.467-1.815.718-1.878.634-4.624 1.26-8.185 1.288zM6.5 5a4 4 0 000 8H9V5zm0 9.75c0 2.847.638 5.123.982 6.141.018.051.074.109.179.109h2.013c.087 0 .179-.043.249-.147a.396.396 0 00.057-.343C9.537 19.148 9 16.986 9 14.5H6.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var mention = {
	name: "mention",
	keywords: [
		"at",
		"ping"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.75 2.37a6.501 6.501 0 006.5 11.26.75.75 0 01.75 1.298A7.999 7.999 0 01.989 4.148 8 8 0 0116 7.75v1.5a2.75 2.75 0 01-5.072 1.475 3.999 3.999 0 01-6.65-4.19A4 4 0 0112 8v1.25a1.25 1.25 0 002.5 0V7.867a6.5 6.5 0 00-9.75-5.496zM10.5 8a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 2.37a6.501 6.501 0 006.5 11.26.75.75 0 01.75 1.298A7.999 7.999 0 01.989 4.148 8 8 0 0116 7.75v1.5a2.75 2.75 0 01-5.072 1.475 3.999 3.999 0 01-6.65-4.19A4 4 0 0112 8v1.25a1.25 1.25 0 002.5 0V7.867a6.5 6.5 0 00-9.75-5.496zM10.5 8a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20.226 7.25c-2.623-4.542-8.432-6.098-12.974-3.475-4.543 2.622-6.099 8.431-3.477 12.974 2.623 4.542 8.431 6.099 12.974 3.477a.75.75 0 01.75 1.299c-5.26 3.037-11.987 1.235-15.024-4.026C-.562 12.24 1.24 5.512 6.501 2.475 11.76-.562 18.488 1.24 21.525 6.501a10.959 10.959 0 011.455 4.826c.013.056.02.113.02.173v2.25a3.5 3.5 0 01-6.623 1.581 5.5 5.5 0 111.112-3.682.802.802 0 01.011.129v1.972a2 2 0 104 0v-1.766a9.456 9.456 0 00-1.274-4.733zM16 12a4 4 0 10-8 0 4 4 0 008 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20.226 7.25c-2.623-4.542-8.432-6.098-12.974-3.475-4.543 2.622-6.099 8.431-3.477 12.974 2.623 4.542 8.431 6.099 12.974 3.477a.75.75 0 01.75 1.299c-5.26 3.037-11.987 1.235-15.024-4.026C-.562 12.24 1.24 5.512 6.501 2.475 11.76-.562 18.488 1.24 21.525 6.501a10.959 10.959 0 011.455 4.826c.013.056.02.113.02.173v2.25a3.5 3.5 0 01-6.623 1.581 5.5 5.5 0 111.112-3.682.802.802 0 01.011.129v1.972a2 2 0 104 0v-1.766a9.456 9.456 0 00-1.274-4.733zM16 12a4 4 0 10-8 0 4 4 0 008 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var meter = {
	name: "meter",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 1.5a6.5 6.5 0 106.016 4.035.75.75 0 011.388-.57 8 8 0 11-4.37-4.37.75.75 0 11-.569 1.389A6.473 6.473 0 008 1.5zm6.28.22a.75.75 0 010 1.06l-4.063 4.064a2.5 2.5 0 11-1.06-1.06L13.22 1.72a.75.75 0 011.06 0zM7 8a1 1 0 102 0 1 1 0 00-2 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 1.5a6.5 6.5 0 106.016 4.035.75.75 0 011.388-.57 8 8 0 11-4.37-4.37.75.75 0 11-.569 1.389A6.473 6.473 0 008 1.5zm6.28.22a.75.75 0 010 1.06l-4.063 4.064a2.5 2.5 0 11-1.06-1.06L13.22 1.72a.75.75 0 011.06 0zM7 8a1 1 0 102 0 1 1 0 00-2 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var milestone = {
	name: "milestone",
	keywords: [
		"marker"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 01-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm4.384 8.5a.25.25 0 00.161-.06l2.07-1.75a.248.248 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h9.384z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 01-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm4.384 8.5a.25.25 0 00.161-.06l2.07-1.75a.248.248 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h9.384z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.75 1a.75.75 0 01.75.75V4h6.532c.42 0 .826.15 1.143.425l3.187 2.75a1.75 1.75 0 010 2.65l-3.187 2.75a1.75 1.75 0 01-1.143.425H12.5v9.25a.75.75 0 01-1.5 0V13H3.75A1.75 1.75 0 012 11.25v-5.5C2 4.783 2.784 4 3.75 4H11V1.75a.75.75 0 01.75-.75zm7.282 4.5H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h15.282c.06 0 .118-.021.163-.06l3.188-2.75a.248.248 0 000-.38l-3.188-2.75a.249.249 0 00-.163-.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.75 1a.75.75 0 01.75.75V4h6.532c.42 0 .826.15 1.143.425l3.187 2.75a1.75 1.75 0 010 2.65l-3.187 2.75a1.75 1.75 0 01-1.143.425H12.5v9.25a.75.75 0 01-1.5 0V13H3.75A1.75 1.75 0 012 11.25v-5.5C2 4.783 2.784 4 3.75 4H11V1.75a.75.75 0 01.75-.75zm7.282 4.5H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h15.282c.06 0 .118-.021.163-.06l3.188-2.75a.248.248 0 000-.38l-3.188-2.75a.249.249 0 00-.163-.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var mirror = {
	name: "mirror",
	keywords: [
		"reflect"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M15.547 3.061A.75.75 0 0116 3.75v8.5a.751.751 0 01-1.265.545l-4.5-4.25a.75.75 0 010-1.09l4.5-4.25a.75.75 0 01.812-.144zM0 12.25v-8.5a.751.751 0 011.265-.545l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25A.75.75 0 010 12.25zm1.5-6.76v5.02L4.158 8zM11.842 8l2.658 2.51V5.49zM8 4a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 4zm.75-2.25v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 011.5 0zm0 6v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 011.5 0zM8 10a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 10zm0 3a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.547 3.061A.75.75 0 0116 3.75v8.5a.751.751 0 01-1.265.545l-4.5-4.25a.75.75 0 010-1.09l4.5-4.25a.75.75 0 01.812-.144zM0 12.25v-8.5a.751.751 0 011.265-.545l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25A.75.75 0 010 12.25zm1.5-6.76v5.02L4.158 8zM11.842 8l2.658 2.51V5.49zM8 4a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 4zm.75-2.25v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 011.5 0zm0 6v.5a.75.75 0 01-1.5 0v-.5a.75.75 0 011.5 0zM8 10a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 10zm0 3a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 13z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M21.553 6.064A.75.75 0 0122 6.75v10.5a.75.75 0 01-1.256.554l-5.75-5.25a.748.748 0 010-1.108l5.75-5.25a.75.75 0 01.809-.132zM2.447 17.936A.75.75 0 012 17.25V6.75a.75.75 0 011.256-.554l5.75 5.25a.748.748 0 010 1.108l-5.75 5.25a.75.75 0 01-.809.132zM7.387 12L3.5 8.45v7.1L7.388 12zm9.226 0l3.887 3.55v-7.1L16.612 12zM12 2.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 4a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 8a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 4a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0-8a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M21.553 6.064A.75.75 0 0122 6.75v10.5a.75.75 0 01-1.256.554l-5.75-5.25a.748.748 0 010-1.108l5.75-5.25a.75.75 0 01.809-.132zM2.447 17.936A.75.75 0 012 17.25V6.75a.75.75 0 011.256-.554l5.75 5.25a.748.748 0 010 1.108l-5.75 5.25a.75.75 0 01-.809.132zM7.387 12L3.5 8.45v7.1L7.388 12zm9.226 0l3.887 3.55v-7.1L16.612 12zM12 2.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 4a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 8a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 4a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0-8a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var moon = {
	name: "moon",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.598 1.591a.749.749 0 01.785-.175 7.001 7.001 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.499 5.499 0 107.678-7.678z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.598 1.591a.749.749 0 01.785-.175 7.001 7.001 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.499 5.499 0 107.678-7.678z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M14.768 3.96v.001l-.002-.005a9.08 9.08 0 00-.218-.779c-.13-.394.21-.8.602-.67.29.096.575.205.855.328l.01.005A10.002 10.002 0 0112 22a10.002 10.002 0 01-9.162-5.985l-.004-.01a9.722 9.722 0 01-.329-.855c-.13-.392.277-.732.67-.602.257.084.517.157.78.218l.004.002A9 9 0 0014.999 6a9.09 9.09 0 00-.231-2.04zM16.5 6c0 5.799-4.701 10.5-10.5 10.5-.426 0-.847-.026-1.26-.075A8.5 8.5 0 1016.425 4.74c.05.413.075.833.075 1.259z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.768 3.96v.001l-.002-.005a9.08 9.08 0 00-.218-.779c-.13-.394.21-.8.602-.67.29.096.575.205.855.328l.01.005A10.002 10.002 0 0112 22a10.002 10.002 0 01-9.162-5.985l-.004-.01a9.722 9.722 0 01-.329-.855c-.13-.392.277-.732.67-.602.257.084.517.157.78.218l.004.002A9 9 0 0014.999 6a9.09 9.09 0 00-.231-2.04zM16.5 6c0 5.799-4.701 10.5-10.5 10.5-.426 0-.847-.026-1.26-.075A8.5 8.5 0 1016.425 4.74c.05.413.075.833.075 1.259z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var mute = {
	name: "mute",
	keywords: [
		"quiet",
		"sound",
		"audio",
		"turn",
		"off"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 2.75v10.5a.751.751 0 01-1.238.57L3.473 11H1.75A1.75 1.75 0 010 9.25v-2.5C0 5.784.784 5 1.75 5h1.722l3.29-2.82A.75.75 0 018 2.75zm3.28 2.47L13 6.94l1.72-1.72a.751.751 0 011.042.018.751.751 0 01.018 1.042L14.06 8l1.72 1.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L13 9.06l-1.72 1.72a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L11.94 8l-1.72-1.72a.749.749 0 01.326-1.275.749.749 0 01.734.215zm-7.042 1.1a.752.752 0 01-.488.18h-2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2c.179 0 .352.064.488.18L6.5 11.62V4.38z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 2.75v10.5a.751.751 0 01-1.238.57L3.473 11H1.75A1.75 1.75 0 010 9.25v-2.5C0 5.784.784 5 1.75 5h1.722l3.29-2.82A.75.75 0 018 2.75zm3.28 2.47L13 6.94l1.72-1.72a.751.751 0 011.042.018.751.751 0 01.018 1.042L14.06 8l1.72 1.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L13 9.06l-1.72 1.72a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L11.94 8l-1.72-1.72a.749.749 0 01.326-1.275.749.749 0 01.734.215zm-7.042 1.1a.752.752 0 01-.488.18h-2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2c.179 0 .352.064.488.18L6.5 11.62V4.38z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805A.75.75 0 0112 3.75zM6.255 9.305a.748.748 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86V5.445zM16.28 8.22a.75.75 0 10-1.06 1.06L17.94 12l-2.72 2.72a.75.75 0 101.06 1.06L19 13.06l2.72 2.72a.75.75 0 101.06-1.06L20.06 12l2.72-2.72a.75.75 0 00-1.06-1.06L19 10.94l-2.72-2.72z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805A.75.75 0 0112 3.75zM6.255 9.305a.748.748 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86V5.445zM16.28 8.22a.75.75 0 10-1.06 1.06L17.94 12l-2.72 2.72a.75.75 0 101.06 1.06L19 13.06l2.72 2.72a.75.75 0 101.06-1.06L20.06 12l2.72-2.72a.75.75 0 00-1.06-1.06L19 10.94l-2.72-2.72z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var note = {
	name: "note",
	keywords: [
		"card",
		"paper",
		"ticket"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25zM3.5 6.25a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75zm.75 2.25h4a.75.75 0 010 1.5h-4a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25zM3.5 6.25a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75zm.75 2.25h4a.75.75 0 010 1.5h-4a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z\"></path><path d=\"M5 8.75A.75.75 0 015.75 8h11.5a.75.75 0 010 1.5H5.75A.75.75 0 015 8.75zm0 4a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 8.75A.75.75 0 015.75 8h11.5a.75.75 0 010 1.5H5.75A.75.75 0 015 8.75zm0 4a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var number = {
	name: "number",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9 4.75A.75.75 0 019.75 4h4a.75.75 0 01.53 1.28l-1.89 1.892c.312.076.604.18.867.319.742.391 1.244 1.063 1.244 2.005 0 .653-.231 1.208-.629 1.627-.386.408-.894.653-1.408.777-1.01.243-2.225.063-3.124-.527a.751.751 0 01.822-1.254c.534.35 1.32.474 1.951.322.306-.073.53-.201.67-.349.129-.136.218-.32.218-.596 0-.308-.123-.509-.444-.678-.373-.197-.98-.318-1.806-.318a.75.75 0 01-.53-1.28l1.72-1.72H9.75A.75.75 0 019 4.75zm-3.587 5.763c-.35-.05-.77.113-.983.572a.75.75 0 11-1.36-.632c.508-1.094 1.589-1.565 2.558-1.425 1 .145 1.872.945 1.872 2.222 0 1.433-1.088 2.192-1.79 2.681-.308.216-.571.397-.772.573H7a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75c0-.69.3-1.211.67-1.61.348-.372.8-.676 1.15-.92.8-.56 1.18-.904 1.18-1.474 0-.473-.267-.69-.587-.737zM5.604.089A.75.75 0 016 .75v4.77h.711a.75.75 0 010 1.5H3.759a.75.75 0 010-1.5H4.5V2.15l-.334.223a.75.75 0 01-.832-1.248l1.5-1a.75.75 0 01.77-.037z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9 4.75A.75.75 0 019.75 4h4a.75.75 0 01.53 1.28l-1.89 1.892c.312.076.604.18.867.319.742.391 1.244 1.063 1.244 2.005 0 .653-.231 1.208-.629 1.627-.386.408-.894.653-1.408.777-1.01.243-2.225.063-3.124-.527a.751.751 0 01.822-1.254c.534.35 1.32.474 1.951.322.306-.073.53-.201.67-.349.129-.136.218-.32.218-.596 0-.308-.123-.509-.444-.678-.373-.197-.98-.318-1.806-.318a.75.75 0 01-.53-1.28l1.72-1.72H9.75A.75.75 0 019 4.75zm-3.587 5.763c-.35-.05-.77.113-.983.572a.75.75 0 11-1.36-.632c.508-1.094 1.589-1.565 2.558-1.425 1 .145 1.872.945 1.872 2.222 0 1.433-1.088 2.192-1.79 2.681-.308.216-.571.397-.772.573H7a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75c0-.69.3-1.211.67-1.61.348-.372.8-.676 1.15-.92.8-.56 1.18-.904 1.18-1.474 0-.473-.267-.69-.587-.737zM5.604.089A.75.75 0 016 .75v4.77h.711a.75.75 0 010 1.5H3.759a.75.75 0 010-1.5H4.5V2.15l-.334.223a.75.75 0 01-.832-1.248l1.5-1a.75.75 0 01.77-.037z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13.003 7.754a.75.75 0 01.75-.75h5.232a.75.75 0 01.53 1.28l-2.776 2.777c.55.097 1.057.253 1.492.483.905.477 1.504 1.284 1.504 2.418 0 .966-.471 1.75-1.172 2.27-.687.511-1.587.77-2.521.77-1.367 0-2.274-.528-2.667-.756a.75.75 0 01.755-1.297c.331.193.953.553 1.912.553.673 0 1.243-.188 1.627-.473.37-.275.566-.635.566-1.067 0-.5-.219-.836-.703-1.091-.538-.284-1.375-.443-2.471-.443a.75.75 0 01-.53-1.28l2.643-2.644h-3.421a.75.75 0 01-.75-.75zM7.88 15.215a1.4 1.4 0 00-1.446.83.75.75 0 01-1.37-.61 2.899 2.899 0 012.986-1.71c.589.06 1.139.323 1.557.743.434.446.685 1.058.685 1.778 0 1.641-1.254 2.437-2.12 2.986-.538.341-1.18.694-1.495 1.273H9.75a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75c0-1.799 1.337-2.63 2.243-3.21 1.032-.659 1.55-1.031 1.55-1.8 0-.355-.116-.584-.26-.732a1.071 1.071 0 00-.652-.298zm.234-13.121a.75.75 0 01.386.656V9h1.252a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5H7V4.103l-.853.533a.749.749 0 11-.795-1.272l2-1.25a.749.749 0 01.762-.02z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.003 7.754a.75.75 0 01.75-.75h5.232a.75.75 0 01.53 1.28l-2.776 2.777c.55.097 1.057.253 1.492.483.905.477 1.504 1.284 1.504 2.418 0 .966-.471 1.75-1.172 2.27-.687.511-1.587.77-2.521.77-1.367 0-2.274-.528-2.667-.756a.75.75 0 01.755-1.297c.331.193.953.553 1.912.553.673 0 1.243-.188 1.627-.473.37-.275.566-.635.566-1.067 0-.5-.219-.836-.703-1.091-.538-.284-1.375-.443-2.471-.443a.75.75 0 01-.53-1.28l2.643-2.644h-3.421a.75.75 0 01-.75-.75zM7.88 15.215a1.4 1.4 0 00-1.446.83.75.75 0 01-1.37-.61 2.899 2.899 0 012.986-1.71c.589.06 1.139.323 1.557.743.434.446.685 1.058.685 1.778 0 1.641-1.254 2.437-2.12 2.986-.538.341-1.18.694-1.495 1.273H9.75a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75c0-1.799 1.337-2.63 2.243-3.21 1.032-.659 1.55-1.031 1.55-1.8 0-.355-.116-.584-.26-.732a1.071 1.071 0 00-.652-.298zm.234-13.121a.75.75 0 01.386.656V9h1.252a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5H7V4.103l-.853.533a.749.749 0 11-.795-1.272l2-1.25a.749.749 0 01.762-.02z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var organization = {
	name: "organization",
	keywords: [
		"people",
		"group",
		"team"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.749.749 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.766.766 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zM3.75 6h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zm4 3A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.749.749 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.766.766 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zM3.75 6h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zm4 3A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM5.5 9.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM6.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM9 12.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM9 5.75A.75.75 0 019.75 5h.5a.75.75 0 010 1.5h-.5A.75.75 0 019 5.75zM13.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-.75-2.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM13.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z\"></path><path d=\"M2 20V3a2 2 0 012-2h12a2 2 0 012 2v17c0 .173-.022.34-.063.5H20a.5.5 0 00.5-.5v-8a.5.5 0 00-.2-.4l-.5-.375a.75.75 0 01.9-1.2l.5.375c.504.378.8.97.8 1.6v8a2 2 0 01-2 2h-3.562a.767.767 0 01-.166-.018c-.089.012-.18.018-.272.018h-3.75a.75.75 0 01-.75-.75V19h-3v2.25a.75.75 0 01-.75.75H4a2 2 0 01-2-2zm2 .5h3v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25h3a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v17a.5.5 0 00.5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM5.5 9.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM6.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM9 12.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM9 5.75A.75.75 0 019.75 5h.5a.75.75 0 010 1.5h-.5A.75.75 0 019 5.75zM13.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-.75-2.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM13.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 20V3a2 2 0 012-2h12a2 2 0 012 2v17c0 .173-.022.34-.063.5H20a.5.5 0 00.5-.5v-8a.5.5 0 00-.2-.4l-.5-.375a.75.75 0 01.9-1.2l.5.375c.504.378.8.97.8 1.6v8a2 2 0 01-2 2h-3.562a.767.767 0 01-.166-.018c-.089.012-.18.018-.272.018h-3.75a.75.75 0 01-.75-.75V19h-3v2.25a.75.75 0 01-.75.75H4a2 2 0 01-2-2zm2 .5h3v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25h3a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v17a.5.5 0 00.5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var paintbrush = {
	name: "paintbrush",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.134 1.535c.7-.509 1.416-.942 2.076-1.155.649-.21 1.463-.267 2.069.34.603.601.568 1.411.368 2.07-.202.668-.624 1.39-1.125 2.096-1.011 1.424-2.496 2.987-3.775 4.249-1.098 1.084-2.132 1.839-3.04 2.3a3.744 3.744 0 01-1.055 3.217c-.431.431-1.065.691-1.657.861-.614.177-1.294.287-1.914.357A21.151 21.151 0 01.797 16H.743l.007-.75H.749L.742 16a.75.75 0 01-.743-.742l.743-.008-.742.007v-.054a21.25 21.25 0 01.13-2.284c.067-.647.187-1.287.358-1.914.17-.591.43-1.226.86-1.657a3.746 3.746 0 013.227-1.054c.466-.893 1.225-1.907 2.314-2.982 1.271-1.255 2.833-2.75 4.245-3.777zM1.62 13.089c-.051.464-.086.929-.104 1.395.466-.018.932-.053 1.396-.104a10.511 10.511 0 001.668-.309c.526-.151.856-.325 1.011-.48a2.25 2.25 0 10-3.182-3.182c-.155.155-.329.485-.48 1.01a10.515 10.515 0 00-.309 1.67zm10.396-10.34c-1.224.89-2.605 2.189-3.822 3.384l1.718 1.718c1.21-1.205 2.51-2.597 3.387-3.833.47-.662.78-1.227.912-1.662.134-.444.032-.551.009-.575h-.001V1.78c-.014-.014-.113-.113-.548.027-.432.14-.995.462-1.655.942zm-4.832 7.266l-.001.001a9.859 9.859 0 001.63-1.142L7.155 7.216a9.7 9.7 0 00-1.161 1.607c.482.302.889.71 1.19 1.192z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.134 1.535c.7-.509 1.416-.942 2.076-1.155.649-.21 1.463-.267 2.069.34.603.601.568 1.411.368 2.07-.202.668-.624 1.39-1.125 2.096-1.011 1.424-2.496 2.987-3.775 4.249-1.098 1.084-2.132 1.839-3.04 2.3a3.744 3.744 0 01-1.055 3.217c-.431.431-1.065.691-1.657.861-.614.177-1.294.287-1.914.357A21.151 21.151 0 01.797 16H.743l.007-.75H.749L.742 16a.75.75 0 01-.743-.742l.743-.008-.742.007v-.054a21.25 21.25 0 01.13-2.284c.067-.647.187-1.287.358-1.914.17-.591.43-1.226.86-1.657a3.746 3.746 0 013.227-1.054c.466-.893 1.225-1.907 2.314-2.982 1.271-1.255 2.833-2.75 4.245-3.777zM1.62 13.089c-.051.464-.086.929-.104 1.395.466-.018.932-.053 1.396-.104a10.511 10.511 0 001.668-.309c.526-.151.856-.325 1.011-.48a2.25 2.25 0 10-3.182-3.182c-.155.155-.329.485-.48 1.01a10.515 10.515 0 00-.309 1.67zm10.396-10.34c-1.224.89-2.605 2.189-3.822 3.384l1.718 1.718c1.21-1.205 2.51-2.597 3.387-3.833.47-.662.78-1.227.912-1.662.134-.444.032-.551.009-.575h-.001V1.78c-.014-.014-.113-.113-.548.027-.432.14-.995.462-1.655.942zm-4.832 7.266l-.001.001a9.859 9.859 0 001.63-1.142L7.155 7.216a9.7 9.7 0 00-1.161 1.607c.482.302.889.71 1.19 1.192z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var paperclip = {
	name: "paperclip",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M12.212 3.02a1.753 1.753 0 00-2.478.003l-5.83 5.83a3.007 3.007 0 00-.88 2.127c0 .795.315 1.551.88 2.116.567.567 1.333.89 2.126.89.79 0 1.548-.321 2.116-.89l5.48-5.48a.75.75 0 011.061 1.06l-5.48 5.48a4.492 4.492 0 01-3.177 1.33c-1.2 0-2.345-.487-3.187-1.33a4.483 4.483 0 01-1.32-3.177c0-1.195.475-2.341 1.32-3.186l5.83-5.83a3.25 3.25 0 015.553 2.297c0 .863-.343 1.691-.953 2.301L7.439 12.39c-.375.377-.884.59-1.416.593a1.998 1.998 0 01-1.412-.593 1.992 1.992 0 010-2.828l5.48-5.48a.751.751 0 011.042.018.751.751 0 01.018 1.042l-5.48 5.48a.492.492 0 000 .707.499.499 0 00.352.154.51.51 0 00.356-.154l5.833-5.827a1.755 1.755 0 000-2.481z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.212 3.02a1.753 1.753 0 00-2.478.003l-5.83 5.83a3.007 3.007 0 00-.88 2.127c0 .795.315 1.551.88 2.116.567.567 1.333.89 2.126.89.79 0 1.548-.321 2.116-.89l5.48-5.48a.75.75 0 011.061 1.06l-5.48 5.48a4.492 4.492 0 01-3.177 1.33c-1.2 0-2.345-.487-3.187-1.33a4.483 4.483 0 01-1.32-3.177c0-1.195.475-2.341 1.32-3.186l5.83-5.83a3.25 3.25 0 015.553 2.297c0 .863-.343 1.691-.953 2.301L7.439 12.39c-.375.377-.884.59-1.416.593a1.998 1.998 0 01-1.412-.593 1.992 1.992 0 010-2.828l5.48-5.48a.751.751 0 011.042.018.751.751 0 01.018 1.042l-5.48 5.48a.492.492 0 000 .707.499.499 0 00.352.154.51.51 0 00.356-.154l5.833-5.827a1.755 1.755 0 000-2.481z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M19.187 3.588a2.75 2.75 0 00-3.889 0L5.575 13.31a4.5 4.5 0 006.364 6.364l8.662-8.662a.75.75 0 011.061 1.06L13 20.735a6 6 0 01-8.485-8.485l9.723-9.723a4.247 4.247 0 014.124-1.139 4.247 4.247 0 013.025 3.025 4.247 4.247 0 01-1.139 4.124l-9.193 9.193a2.64 2.64 0 01-1.858.779 2.626 2.626 0 01-1.854-.779c-.196-.196-.338-.47-.43-.726a2.822 2.822 0 01-.168-.946c0-.7.284-1.373.775-1.864l8.132-8.131a.749.749 0 011.275.326.749.749 0 01-.215.734l-8.131 8.132a1.148 1.148 0 00-.336.803c.003.204.053.405.146.587.01.018.018.028.02.032.22.215.501.332.786.332.29 0 .58-.121.798-.34l9.192-9.192a2.75 2.75 0 000-3.89z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M19.187 3.588a2.75 2.75 0 00-3.889 0L5.575 13.31a4.5 4.5 0 006.364 6.364l8.662-8.662a.75.75 0 011.061 1.06L13 20.735a6 6 0 01-8.485-8.485l9.723-9.723a4.247 4.247 0 014.124-1.139 4.247 4.247 0 013.025 3.025 4.247 4.247 0 01-1.139 4.124l-9.193 9.193a2.64 2.64 0 01-1.858.779 2.626 2.626 0 01-1.854-.779c-.196-.196-.338-.47-.43-.726a2.822 2.822 0 01-.168-.946c0-.7.284-1.373.775-1.864l8.132-8.131a.749.749 0 011.275.326.749.749 0 01-.215.734l-8.131 8.132a1.148 1.148 0 00-.336.803c.003.204.053.405.146.587.01.018.018.028.02.032.22.215.501.332.786.332.29 0 .58-.121.798-.34l9.192-9.192a2.75 2.75 0 000-3.89z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var paste = {
	name: "paste",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.626 3.533a.249.249 0 00-.126.217v9.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-9.5a.249.249 0 00-.126-.217.75.75 0 01.752-1.298c.541.313.874.89.874 1.515v9.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-9.5c0-.625.333-1.202.874-1.515a.75.75 0 01.752 1.298zM5.75 1h4.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-4.5A.75.75 0 015 4.75v-3A.75.75 0 015.75 1zm.75 3h3V2.5h-3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.626 3.533a.249.249 0 00-.126.217v9.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-9.5a.249.249 0 00-.126-.217.75.75 0 01.752-1.298c.541.313.874.89.874 1.515v9.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-9.5c0-.625.333-1.202.874-1.515a.75.75 0 01.752 1.298zM5.75 1h4.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-4.5A.75.75 0 015 4.75v-3A.75.75 0 015.75 1zm.75 3h3V2.5h-3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.751 1.751 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z\"></path><path d=\"M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.962 2.513a.75.75 0 01-.475.949l-.816.272a.25.25 0 00-.171.237V21.25c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V3.97a.25.25 0 00-.17-.236l-.817-.272a.75.75 0 01.474-1.424l.816.273A1.751 1.751 0 0121 3.97v17.28A1.75 1.75 0 0119.25 23H4.75A1.75 1.75 0 013 21.25V3.97a1.75 1.75 0 011.197-1.66l.816-.272a.75.75 0 01.949.475z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7 1.75C7 .784 7.784 0 8.75 0h6.5C16.216 0 17 .784 17 1.75v1.5A1.75 1.75 0 0115.25 5h-6.5A1.75 1.75 0 017 3.25zm1.75-.25a.25.25 0 00-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-1.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var pencil = {
	name: "pencil",
	keywords: [
		"edit",
		"change",
		"update",
		"write"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 00-.064.108l-.558 1.953 1.953-.558a.253.253 0 00.108-.064zm1.238-3.763a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 01-.699.409l-5.523 1.68a.748.748 0 01-.747-.188.748.748 0 01-.188-.747l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963zM4.708 16.361a.26.26 0 00-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 00.1-.059l10.273-9.806-2.94-2.939-10.279 9.813zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 01-.699.409l-5.523 1.68a.748.748 0 01-.747-.188.748.748 0 01-.188-.747l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963zM4.708 16.361a.26.26 0 00-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 00.1-.059l10.273-9.806-2.94-2.939-10.279 9.813zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var people = {
	name: "people",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 5.5a3.5 3.5 0 115.898 2.549 5.508 5.508 0 013.034 4.084.75.75 0 11-1.482.235 4 4 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.493 3.493 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.012.749.749 0 01-.885.954.752.752 0 01-.549-.514 3.507 3.507 0 00-2.522-2.372.75.75 0 01-.574-.73v-.352a.75.75 0 01.416-.672A1.5 1.5 0 0011 5.5.75.75 0 0111 4zm-5.5-.5a2 2 0 10-.001 3.999A2 2 0 005.5 3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 5.5a3.5 3.5 0 115.898 2.549 5.508 5.508 0 013.034 4.084.75.75 0 11-1.482.235 4 4 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.493 3.493 0 012 5.5zM11 4a3.001 3.001 0 012.22 5.018 5.01 5.01 0 012.56 3.012.749.749 0 01-.885.954.752.752 0 01-.549-.514 3.507 3.507 0 00-2.522-2.372.75.75 0 01-.574-.73v-.352a.75.75 0 01.416-.672A1.5 1.5 0 0011 5.5.75.75 0 0111 4zm-5.5-.5a2 2 0 10-.001 3.999A2 2 0 005.5 3.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.5 8a5.5 5.5 0 118.596 4.547 9.005 9.005 0 015.9 8.18.751.751 0 01-1.5.045 7.5 7.5 0 00-14.993 0 .75.75 0 01-1.499-.044 9.005 9.005 0 015.9-8.181A5.496 5.496 0 013.5 8zM9 4a4 4 0 100 8 4 4 0 000-8zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 11-.212-1.484 4.53 4.53 0 013.38 8.097 6.69 6.69 0 013.956 6.107.75.75 0 01-1.5 0 5.193 5.193 0 00-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0017.29 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.5 8a5.5 5.5 0 118.596 4.547 9.005 9.005 0 015.9 8.18.751.751 0 01-1.5.045 7.5 7.5 0 00-14.993 0 .75.75 0 01-1.499-.044 9.005 9.005 0 015.9-8.181A5.496 5.496 0 013.5 8zM9 4a4 4 0 100 8 4 4 0 000-8zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 11-.212-1.484 4.53 4.53 0 013.38 8.097 6.69 6.69 0 013.956 6.107.75.75 0 01-1.5 0 5.193 5.193 0 00-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0017.29 8z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var person = {
	name: "person",
	keywords: [
		"people",
		"man",
		"woman",
		"human"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.561 8.073a6.005 6.005 0 013.432 5.142.75.75 0 11-1.498.07 4.5 4.5 0 00-8.99 0 .75.75 0 01-1.498-.07 6.004 6.004 0 013.431-5.142 3.999 3.999 0 115.123 0zM10.5 5a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.561 8.073a6.005 6.005 0 013.432 5.142.75.75 0 11-1.498.07 4.5 4.5 0 00-8.99 0 .75.75 0 01-1.498-.07 6.004 6.004 0 013.431-5.142 3.999 3.999 0 115.123 0zM10.5 5a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 2.5a5.5 5.5 0 013.096 10.047 9.005 9.005 0 015.9 8.181.75.75 0 11-1.499.044 7.5 7.5 0 00-14.993 0 .75.75 0 01-1.5-.045 9.005 9.005 0 015.9-8.18A5.5 5.5 0 0112 2.5zM8 8a4 4 0 108 0 4 4 0 00-8 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 2.5a5.5 5.5 0 013.096 10.047 9.005 9.005 0 015.9 8.181.75.75 0 11-1.499.044 7.5 7.5 0 00-14.993 0 .75.75 0 01-1.5-.045 9.005 9.005 0 015.9-8.18A5.5 5.5 0 0112 2.5zM8 8a4 4 0 108 0 4 4 0 00-8 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var pin = {
	name: "pin",
	keywords: [
		"save",
		"star",
		"bookmark"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.456.734a1.75 1.75 0 012.826.504l.613 1.327a3.08 3.08 0 002.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.748.748 0 01-.332 1.265.75.75 0 01-.729-.205L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.08 3.08 0 00-1.707-2.084l-1.327-.613a1.75 1.75 0 01-.504-2.826zM5.92 1.866a.253.253 0 00-.183-.142.251.251 0 00-.221.07L1.794 5.516a.251.251 0 00-.07.221c.015.08.068.149.142.183l1.328.613A4.582 4.582 0 015.73 9.63l.584 2.454a.251.251 0 00.42.12l5.47-5.47a.25.25 0 00-.12-.42L9.63 5.73a4.583 4.583 0 01-3.098-2.537z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.456.734a1.75 1.75 0 012.826.504l.613 1.327a3.08 3.08 0 002.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.748.748 0 01-.332 1.265.75.75 0 01-.729-.205L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.08 3.08 0 00-1.707-2.084l-1.327-.613a1.75 1.75 0 01-.504-2.826zM5.92 1.866a.253.253 0 00-.183-.142.251.251 0 00-.221.07L1.794 5.516a.251.251 0 00-.07.221c.015.08.068.149.142.183l1.328.613A4.582 4.582 0 015.73 9.63l.584 2.454a.251.251 0 00.42.12l5.47-5.47a.25.25 0 00-.12-.42L9.63 5.73a4.583 4.583 0 01-3.098-2.537z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.886 1.553a1.75 1.75 0 012.869.604l.633 1.629a5.667 5.667 0 003.725 3.395l3.959 1.131a1.749 1.749 0 01.757 2.92L16.06 15l5.594 5.595a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L15 16.061l-3.768 3.768a1.749 1.749 0 01-2.92-.757l-1.131-3.96a5.665 5.665 0 00-3.395-3.724l-1.63-.633a1.75 1.75 0 01-.603-2.869zm6.589 12.912l4.293-4.294a.25.25 0 00-.108-.417L14.7 8.623A7.165 7.165 0 019.99 4.33L9.357 2.7a.25.25 0 00-.41-.086L2.614 8.946a.25.25 0 00.086.41l1.63.634a7.167 7.167 0 014.294 4.71l1.13 3.96a.25.25 0 00.417.108l4.294-4.293z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.886 1.553a1.75 1.75 0 012.869.604l.633 1.629a5.667 5.667 0 003.725 3.395l3.959 1.131a1.749 1.749 0 01.757 2.92L16.06 15l5.594 5.595a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L15 16.061l-3.768 3.768a1.749 1.749 0 01-2.92-.757l-1.131-3.96a5.665 5.665 0 00-3.395-3.724l-1.63-.633a1.75 1.75 0 01-.603-2.869zm6.589 12.912l4.293-4.294a.25.25 0 00-.108-.417L14.7 8.623A7.165 7.165 0 019.99 4.33L9.357 2.7a.25.25 0 00-.41-.086L2.614 8.946a.25.25 0 00.086.41l1.63.634a7.167 7.167 0 014.294 4.71l1.13 3.96a.25.25 0 00.417.108l4.294-4.293z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var play = {
	name: "play",
	keywords: [
		"play",
		"start",
		"begin",
		"action"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm4.879-2.773l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559V5.442a.25.25 0 01.379-.215z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm4.879-2.773l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559V5.442a.25.25 0 01.379-.215z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.5 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842l-5.576 3.584a.5.5 0 01-.77-.42z\"></path><path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5A9.5 9.5 0 002.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.5 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842l-5.576 3.584a.5.5 0 01-.77-.42z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11-9.5A9.5 9.5 0 002.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var plug = {
	name: "plug",
	keywords: [
		"hook",
		"webhook"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 8H2.5a1 1 0 00-1 1v5.25a.75.75 0 01-1.5 0V9a2.5 2.5 0 012.5-2.5H4V5.133a1.75 1.75 0 011.533-1.737l2.831-.353.76-.913c.332-.4.825-.63 1.344-.63h.782c.966 0 1.75.784 1.75 1.75V4h2.25a.75.75 0 010 1.5H13v4h2.25a.75.75 0 010 1.5H13v.75a1.75 1.75 0 01-1.75 1.75h-.782c-.519 0-1.012-.23-1.344-.63l-.761-.912-2.83-.354A1.75 1.75 0 014 9.867zm6.276-4.91l-.95 1.14a.753.753 0 01-.483.265l-3.124.39a.25.25 0 00-.219.248v4.734c0 .126.094.233.219.249l3.124.39a.752.752 0 01.483.264l.95 1.14a.25.25 0 00.192.09h.782a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-.782a.25.25 0 00-.192.09z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 8H2.5a1 1 0 00-1 1v5.25a.75.75 0 01-1.5 0V9a2.5 2.5 0 012.5-2.5H4V5.133a1.75 1.75 0 011.533-1.737l2.831-.353.76-.913c.332-.4.825-.63 1.344-.63h.782c.966 0 1.75.784 1.75 1.75V4h2.25a.75.75 0 010 1.5H13v4h2.25a.75.75 0 010 1.5H13v.75a1.75 1.75 0 01-1.75 1.75h-.782c-.519 0-1.012-.23-1.344-.63l-.761-.912-2.83-.354A1.75 1.75 0 014 9.867zm6.276-4.91l-.95 1.14a.753.753 0 01-.483.265l-3.124.39a.25.25 0 00-.219.248v4.734c0 .126.094.233.219.249l3.124.39a.752.752 0 01.483.264l.95 1.14a.25.25 0 00.192.09h.782a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-.782a.25.25 0 00-.192.09z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7 11.5H2.938c-.794 0-1.438.644-1.438 1.437v8.313a.75.75 0 01-1.5 0v-8.312A2.939 2.939 0 012.937 10H7V6.151c0-.897.678-1.648 1.57-1.74l6.055-.626 1.006-1.174A1.752 1.752 0 0116.96 2h1.29c.966 0 1.75.784 1.75 1.75V6h3.25a.75.75 0 010 1.5H20V14h3.25a.75.75 0 010 1.5H20v2.25a1.75 1.75 0 01-1.75 1.75h-1.29a1.75 1.75 0 01-1.329-.611l-1.006-1.174-6.055-.627A1.749 1.749 0 017 15.348zm9.77-7.913v.001l-1.201 1.4a.75.75 0 01-.492.258l-6.353.657a.25.25 0 00-.224.249v9.196a.25.25 0 00.224.249l6.353.657c.191.02.368.112.493.258l1.2 1.401a.252.252 0 00.19.087h1.29a.25.25 0 00.25-.25v-14a.25.25 0 00-.25-.25h-1.29a.252.252 0 00-.19.087z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7 11.5H2.938c-.794 0-1.438.644-1.438 1.437v8.313a.75.75 0 01-1.5 0v-8.312A2.939 2.939 0 012.937 10H7V6.151c0-.897.678-1.648 1.57-1.74l6.055-.626 1.006-1.174A1.752 1.752 0 0116.96 2h1.29c.966 0 1.75.784 1.75 1.75V6h3.25a.75.75 0 010 1.5H20V14h3.25a.75.75 0 010 1.5H20v2.25a1.75 1.75 0 01-1.75 1.75h-1.29a1.75 1.75 0 01-1.329-.611l-1.006-1.174-6.055-.627A1.749 1.749 0 017 15.348zm9.77-7.913v.001l-1.201 1.4a.75.75 0 01-.492.258l-6.353.657a.25.25 0 00-.224.249v9.196a.25.25 0 00.224.249l6.353.657c.191.02.368.112.493.258l1.2 1.401a.252.252 0 00.19.087h1.29a.25.25 0 00.25-.25v-14a.25.25 0 00-.25-.25h-1.29a.252.252 0 00-.19.087z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var plus = {
	name: "plus",
	keywords: [
		"add",
		"new",
		"more"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var project = {
	name: "project",
	keywords: [
		"board",
		"kanban",
		"columns",
		"scrum"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0zM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zM11.75 3a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5a.75.75 0 01.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0zM8 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0zM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zM11.75 3a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5a.75.75 0 01.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0zM8 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.25 6a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 007.25 6zM12 6a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 6zm4 .75a.75.75 0 011.5 0v9.5a.75.75 0 01-1.5 0v-9.5z\"></path><path d=\"M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H3.75a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.25 6a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5A.75.75 0 007.25 6zM12 6a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 6zm4 .75a.75.75 0 011.5 0v9.5a.75.75 0 01-1.5 0v-9.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H3.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var pulse = {
	name: "pulse",
	keywords: [
		"graph",
		"trend",
		"line",
		"activity"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6 2c.306 0 .582.187.696.471L10 10.731l1.304-3.26A.751.751 0 0112 7h3.25a.75.75 0 010 1.5h-2.742l-1.812 4.528a.751.751 0 01-1.392 0L6 4.77 4.696 8.03A.75.75 0 014 8.5H.75a.75.75 0 010-1.5h2.742l1.812-4.529A.751.751 0 016 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 2c.306 0 .582.187.696.471L10 10.731l1.304-3.26A.751.751 0 0112 7h3.25a.75.75 0 010 1.5h-2.742l-1.812 4.528a.751.751 0 01-1.392 0L6 4.77 4.696 8.03A.75.75 0 014 8.5H.75a.75.75 0 010-1.5h2.742l1.812-4.529A.751.751 0 016 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.002 2.5a.75.75 0 01.691.464l6.302 15.305 2.56-6.301a.75.75 0 01.695-.468h4a.75.75 0 010 1.5h-3.495l-3.06 7.532a.75.75 0 01-1.389.004L8.997 5.21l-3.054 7.329A.75.75 0 015.25 13H.75a.75.75 0 010-1.5h4l3.558-8.538a.75.75 0 01.694-.462z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.002 2.5a.75.75 0 01.691.464l6.302 15.305 2.56-6.301a.75.75 0 01.695-.468h4a.75.75 0 010 1.5h-3.495l-3.06 7.532a.75.75 0 01-1.389.004L8.997 5.21l-3.054 7.329A.75.75 0 015.25 13H.75a.75.75 0 010-1.5h4l3.558-8.538a.75.75 0 01.694-.462z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var question = {
	name: "question",
	keywords: [
		"help",
		"explain"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.92 6.085h.001a.749.749 0 11-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 011.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 00-.26.16.952.952 0 00-.276.245.75.75 0 01-1.248-.832c.184-.264.42-.489.692-.661.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 00.277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 00-.262-.525A1.27 1.27 0 008 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 00-.34.398zM9 11a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.92 6.085h.001a.749.749 0 11-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 011.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 00-.26.16.952.952 0 00-.276.245.75.75 0 01-1.248-.832c.184-.264.42-.489.692-.661.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 00.277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 00-.262-.525A1.27 1.27 0 008 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 00-.34.398zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.97 8.265a1.45 1.45 0 00-.487.57.75.75 0 01-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 011.004 2.006c0 1.033-.513 1.72-1.027 2.215-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 00-.435.409v1.37a.75.75 0 11-1.5 0v-1.473c0-.237.067-.504.247-.736.22-.28.486-.517.718-.714l.183-.153.001-.001c.172-.143.324-.27.47-.412.368-.355.569-.676.569-1.136a.953.953 0 00-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265zM13 17a1 1 0 11-2 0 1 1 0 012 0z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.97 8.265a1.45 1.45 0 00-.487.57.75.75 0 01-1.341-.67c.2-.402.513-.826.997-1.148C10.627 6.69 11.244 6.5 12 6.5c.658 0 1.369.195 1.934.619a2.45 2.45 0 011.004 2.006c0 1.033-.513 1.72-1.027 2.215-.19.183-.399.358-.579.508l-.147.123a4.329 4.329 0 00-.435.409v1.37a.75.75 0 11-1.5 0v-1.473c0-.237.067-.504.247-.736.22-.28.486-.517.718-.714l.183-.153.001-.001c.172-.143.324-.27.47-.412.368-.355.569-.676.569-1.136a.953.953 0 00-.404-.806C12.766 8.118 12.384 8 12 8c-.494 0-.814.121-1.03.265zM13 17a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var quote = {
	name: "quote",
	keywords: [
		"quotation"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 2.5h10.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5zm4 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zM2.5 7.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 011.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 2.5h10.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5zm4 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zM2.5 7.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 011.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 6.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.25zm5 6.063a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zm0 5.937a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zM3.75 11a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 6.25a.75.75 0 01.75-.75h13.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.25zm5 6.063a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zm0 5.937a.75.75 0 01.75-.75h11.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75zM3.75 11a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var read$1 = {
	name: "read",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.115.65a1.752 1.752 0 011.77 0l6.25 3.663c.536.314.865.889.865 1.51v6.427A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25V5.823c0-.621.33-1.196.865-1.51zm1.011 1.293a.252.252 0 00-.252 0l-5.72 3.353L6.468 7.76a2.748 2.748 0 013.066 0l4.312-2.464-5.719-3.353zM13.15 12.5L8.772 9.06a1.25 1.25 0 00-1.544 0L2.85 12.5zm1.35-5.85l-3.687 2.106 3.687 2.897zM5.187 8.756L1.5 6.65v5.003z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.115.65a1.752 1.752 0 011.77 0l6.25 3.663c.536.314.865.889.865 1.51v6.427A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25V5.823c0-.621.33-1.196.865-1.51zm1.011 1.293a.252.252 0 00-.252 0l-5.72 3.353L6.468 7.76a2.748 2.748 0 013.066 0l4.312-2.464-5.719-3.353zM13.15 12.5L8.772 9.06a1.25 1.25 0 00-1.544 0L2.85 12.5zm1.35-5.85l-3.687 2.106 3.687 2.897zM5.187 8.756L1.5 6.65v5.003z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.89 1.767a2.252 2.252 0 012.22 0l9.75 5.525A2.25 2.25 0 0124 9.249v9.501A2.25 2.25 0 0121.75 21H2.25A2.25 2.25 0 010 18.75v-9.5c0-.81.435-1.558 1.14-1.958zm1.48 1.305a.75.75 0 00-.74 0l-9.316 5.28 7.41 4.233a3.75 3.75 0 014.553 0l7.41-4.234-9.317-5.28zM20.65 19.5l-7.26-5.704a2.25 2.25 0 00-2.78 0L3.35 19.5zm1.85-9.886l-6.95 3.971 6.663 5.236c.089.07.161.159.21.26a.745.745 0 00.077-.331zM8.45 13.585L1.5 9.614v9.136c0 .119.028.23.076.33a.744.744 0 01.21-.259z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.89 1.767a2.252 2.252 0 012.22 0l9.75 5.525A2.25 2.25 0 0124 9.249v9.501A2.25 2.25 0 0121.75 21H2.25A2.25 2.25 0 010 18.75v-9.5c0-.81.435-1.558 1.14-1.958zm1.48 1.305a.75.75 0 00-.74 0l-9.316 5.28 7.41 4.233a3.75 3.75 0 014.553 0l7.41-4.234-9.317-5.28zM20.65 19.5l-7.26-5.704a2.25 2.25 0 00-2.78 0L3.35 19.5zm1.85-9.886l-6.95 3.971 6.663 5.236c.089.07.161.159.21.26a.745.745 0 00.077-.331zM8.45 13.585L1.5 9.614v9.136c0 .119.028.23.076.33a.744.744 0 01.21-.259z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var reply = {
	name: "reply",
	keywords: [
		"reply all",
		"back"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.78 1.97a.75.75 0 010 1.06L3.81 6h6.44A4.75 4.75 0 0115 10.75v2.5a.75.75 0 01-1.5 0v-2.5a3.25 3.25 0 00-3.25-3.25H3.81l2.97 2.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L1.47 7.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.78 1.97a.75.75 0 010 1.06L3.81 6h6.44A4.75 4.75 0 0115 10.75v2.5a.75.75 0 01-1.5 0v-2.5a3.25 3.25 0 00-3.25-3.25H3.81l2.97 2.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L1.47 7.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.53 5.03a.75.75 0 10-1.06-1.06l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 101.06-1.06L5.56 11.5H17a3.248 3.248 0 013.25 3.248v4.502a.75.75 0 001.5 0v-4.502A4.748 4.748 0 0017 10H5.56l4.97-4.97z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.53 5.03a.75.75 0 10-1.06-1.06l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 101.06-1.06L5.56 11.5H17a3.248 3.248 0 013.25 3.248v4.502a.75.75 0 001.5 0v-4.502A4.748 4.748 0 0017 10H5.56l4.97-4.97z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var repo = {
	name: "repo",
	keywords: [
		"book",
		"journal",
		"repository"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8zM5 12.25a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.25a.25.25 0 01-.4.2l-1.45-1.087a.249.249 0 00-.3 0L5.4 15.7a.25.25 0 01-.4-.2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 11-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8zM5 12.25a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.25a.25.25 0 01-.4.2l-1.45-1.087a.249.249 0 00-.3 0L5.4 15.7a.25.25 0 01-.4-.2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 2.75A2.75 2.75 0 015.75 0h14.5a.75.75 0 01.75.75v20.5a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h5.25v-4H6A1.5 1.5 0 004.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 01-.6 1.374A3.251 3.251 0 013 18.75zM19.5 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.651A2.989 2.989 0 016 15h13.5z\"></path><path d=\"M7 18.25a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46a.25.25 0 01-.397-.2v-5.01z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 2.75A2.75 2.75 0 015.75 0h14.5a.75.75 0 01.75.75v20.5a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h5.25v-4H6A1.5 1.5 0 004.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 01-.6 1.374A3.251 3.251 0 013 18.75zM19.5 1.5H5.75c-.69 0-1.25.56-1.25 1.25v12.651A2.989 2.989 0 016 15h13.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7 18.25a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46a.25.25 0 01-.397-.2v-5.01z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var report = {
	name: "report",
	keywords: [
		"report",
		"abuse",
		"flag"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25zm1.75-.25a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25zm7 2.25v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 011.5 0zM9 9a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25zm1.75-.25a.25.25 0 00-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25zm7 2.25v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 011.5 0zM9 9a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.586a.25.25 0 00-.177.073l-3.5 3.5A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.427-3.427A1.75 1.75 0 0111.164 17h9.586a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25zM12 6a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 0112 6zm0 9a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.586a.25.25 0 00-.177.073l-3.5 3.5A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.427-3.427A1.75 1.75 0 0111.164 17h9.586a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25zM12 6a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 0112 6zm0 9a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var rocket = {
	name: "rocket",
	keywords: [
		"staff",
		"stafftools",
		"blast",
		"off",
		"space",
		"launch",
		"ship"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 01-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 01-1.11-.418l-.954-3.102a1.214 1.214 0 01-.145-.125L3.754 9.816a1.218 1.218 0 01-.124-.145L.528 8.717a.749.749 0 01-.418-1.11l1.71-2.774A1.748 1.748 0 013.31 4h3.204c.288-.338.59-.665.904-.979l.459-.458A8.749 8.749 0 0114.064 0zM8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317 2.143 2.143 2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 002.123-5.127V1.75a.25.25 0 00-.25-.25h-.186a7.249 7.249 0 00-5.125 2.123zM3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.234.234 0 01-.201-.064.234.234 0 01-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 112.12 2.12zm6.94-3.935c-.088.06-.177.118-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 00.119-.213zM3.678 8.116L5.2 5.766c.058-.09.117-.178.176-.266H3.309a.25.25 0 00-.213.119l-1.2 1.95zM12 5a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 01-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 01-1.11-.418l-.954-3.102a1.214 1.214 0 01-.145-.125L3.754 9.816a1.218 1.218 0 01-.124-.145L.528 8.717a.749.749 0 01-.418-1.11l1.71-2.774A1.748 1.748 0 013.31 4h3.204c.288-.338.59-.665.904-.979l.459-.458A8.749 8.749 0 0114.064 0zM8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317 2.143 2.143 2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 002.123-5.127V1.75a.25.25 0 00-.25-.25h-.186a7.249 7.249 0 00-5.125 2.123zM3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.234.234 0 01-.201-.064.234.234 0 01-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 112.12 2.12zm6.94-3.935c-.088.06-.177.118-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 00.119-.213zM3.678 8.116L5.2 5.766c.058-.09.117-.178.176-.266H3.309a.25.25 0 00-.213.119l-1.2 1.95zM12 5a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20.322.75h1.176a1.75 1.75 0 011.75 1.749v1.177a10.75 10.75 0 01-2.925 7.374l-1.228 1.304a23.699 23.699 0 01-1.596 1.542v5.038c0 .615-.323 1.184-.85 1.5l-4.514 2.709a.75.75 0 01-1.12-.488l-.963-4.572a1.305 1.305 0 01-.14-.129L8.04 15.96l-1.994-1.873a1.305 1.305 0 01-.129-.14l-4.571-.963a.75.75 0 01-.49-1.12l2.71-4.514c.316-.527.885-.85 1.5-.85h5.037a23.668 23.668 0 011.542-1.594l1.304-1.23A10.753 10.753 0 0120.321.75zm-6.344 4.018v-.001l-1.304 1.23a22.275 22.275 0 00-3.255 3.851l-2.193 3.29 1.859 1.744a.545.545 0 01.034.034l1.743 1.858 3.288-2.192a22.263 22.263 0 003.854-3.257l1.228-1.303a9.251 9.251 0 002.517-6.346V2.5a.25.25 0 00-.25-.25h-1.177a9.252 9.252 0 00-6.344 2.518zM6.5 21c-1.209 1.209-3.901 1.445-4.743 1.49a.236.236 0 01-.18-.067.236.236 0 01-.067-.18c.045-.842.281-3.534 1.49-4.743.9-.9 2.6-.9 3.5 0 .9.9.9 2.6 0 3.5zm-.592-8.588L8.17 9.017c.23-.346.47-.685.717-1.017H5.066a.25.25 0 00-.214.121l-2.167 3.612zM16 15.112c-.333.248-.672.487-1.018.718l-3.393 2.262.678 3.223 3.612-2.167a.25.25 0 00.121-.214zM17.5 8a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0117.5 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20.322.75h1.176a1.75 1.75 0 011.75 1.749v1.177a10.75 10.75 0 01-2.925 7.374l-1.228 1.304a23.699 23.699 0 01-1.596 1.542v5.038c0 .615-.323 1.184-.85 1.5l-4.514 2.709a.75.75 0 01-1.12-.488l-.963-4.572a1.305 1.305 0 01-.14-.129L8.04 15.96l-1.994-1.873a1.305 1.305 0 01-.129-.14l-4.571-.963a.75.75 0 01-.49-1.12l2.71-4.514c.316-.527.885-.85 1.5-.85h5.037a23.668 23.668 0 011.542-1.594l1.304-1.23A10.753 10.753 0 0120.321.75zm-6.344 4.018v-.001l-1.304 1.23a22.275 22.275 0 00-3.255 3.851l-2.193 3.29 1.859 1.744a.545.545 0 01.034.034l1.743 1.858 3.288-2.192a22.263 22.263 0 003.854-3.257l1.228-1.303a9.251 9.251 0 002.517-6.346V2.5a.25.25 0 00-.25-.25h-1.177a9.252 9.252 0 00-6.344 2.518zM6.5 21c-1.209 1.209-3.901 1.445-4.743 1.49a.236.236 0 01-.18-.067.236.236 0 01-.067-.18c.045-.842.281-3.534 1.49-4.743.9-.9 2.6-.9 3.5 0 .9.9.9 2.6 0 3.5zm-.592-8.588L8.17 9.017c.23-.346.47-.685.717-1.017H5.066a.25.25 0 00-.214.121l-2.167 3.612zM16 15.112c-.333.248-.672.487-1.018.718l-3.393 2.262.678 3.223 3.612-2.167a.25.25 0 00.121-.214zM17.5 8a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0117.5 8z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var rows = {
	name: "rows",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M16 10.75v2.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-2.5C0 9.784.784 9 1.75 9h12.5c.966 0 1.75.784 1.75 1.75zm0-8v2.5A1.75 1.75 0 0114.25 7H1.75A1.75 1.75 0 010 5.25v-2.5C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75zm-1.75-.25H1.75a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm0 8H1.75a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 10.75v2.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-2.5C0 9.784.784 9 1.75 9h12.5c.966 0 1.75.784 1.75 1.75zm0-8v2.5A1.75 1.75 0 0114.25 7H1.75A1.75 1.75 0 010 5.25v-2.5C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75zm-1.75-.25H1.75a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm0 8H1.75a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M22 3.75v5.5A1.75 1.75 0 0120.25 11H3.75A1.75 1.75 0 012 9.25v-5.5C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75zm0 11v5.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-5.5c0-.966.784-1.75 1.75-1.75h16.5c.966 0 1.75.784 1.75 1.75zM20.25 3.5H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25zm0 11H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22 3.75v5.5A1.75 1.75 0 0120.25 11H3.75A1.75 1.75 0 012 9.25v-5.5C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75zm0 11v5.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25v-5.5c0-.966.784-1.75 1.75-1.75h16.5c.966 0 1.75.784 1.75 1.75zM20.25 3.5H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25zm0 11H3.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var rss = {
	name: "rss",
	keywords: [
		"broadcast",
		"feed",
		"atom"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.002 2.725a.75.75 0 01.797-.699C8.79 2.42 13.58 7.21 13.974 13.201a.75.75 0 01-1.497.098 10.502 10.502 0 00-9.776-9.776.747.747 0 01-.7-.798zM2.84 7.05h-.002a7.002 7.002 0 016.113 6.111.75.75 0 01-1.49.178 5.503 5.503 0 00-4.8-4.8.75.75 0 01.179-1.489zM2 13a1 1 0 112 0 1 1 0 01-2 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.002 2.725a.75.75 0 01.797-.699C8.79 2.42 13.58 7.21 13.974 13.201a.75.75 0 01-1.497.098 10.502 10.502 0 00-9.776-9.776.747.747 0 01-.7-.798zM2.84 7.05h-.002a7.002 7.002 0 016.113 6.111.75.75 0 01-1.49.178 5.503 5.503 0 00-4.8-4.8.75.75 0 01.179-1.489zM2 13a1 1 0 112 0 1 1 0 01-2 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.5 3.25a.75.75 0 01.75-.75C14.053 2.5 22 10.447 22 20.25a.75.75 0 01-1.5 0C20.5 11.275 13.225 4 4.25 4a.75.75 0 01-.75-.75zm.75 6.25C10.187 9.5 15 14.313 15 20.25a.75.75 0 01-1.5 0A9.25 9.25 0 004.25 11a.75.75 0 010-1.5zM3.5 19a2 2 0 113.999-.001A2 2 0 013.5 19z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.5 3.25a.75.75 0 01.75-.75C14.053 2.5 22 10.447 22 20.25a.75.75 0 01-1.5 0C20.5 11.275 13.225 4 4.25 4a.75.75 0 01-.75-.75zm.75 6.25C10.187 9.5 15 14.313 15 20.25a.75.75 0 01-1.5 0A9.25 9.25 0 004.25 11a.75.75 0 010-1.5zM3.5 19a2 2 0 113.999-.001A2 2 0 013.5 19z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var ruby = {
	name: "ruby",
	keywords: [
		"code",
		"language"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.637 2.291A.748.748 0 014.23 2h7.54c.232 0 .451.107.593.291l3.48 4.5a.75.75 0 01-.072.999l-7.25 7a.75.75 0 01-1.042 0l-7.25-7a.75.75 0 01-.072-.999zM4.598 3.5L1.754 7.177 8 13.207l6.246-6.03L11.402 3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.637 2.291A.748.748 0 014.23 2h7.54c.232 0 .451.107.593.291l3.48 4.5a.75.75 0 01-.072.999l-7.25 7a.75.75 0 01-1.042 0l-7.25-7a.75.75 0 01-.072-.999zM4.598 3.5L1.754 7.177 8 13.207l6.246-6.03L11.402 3.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.873 3.26A.748.748 0 016.44 3h11.31c.223 0 .434.099.576.27l5 6a.75.75 0 01-.028.992l-10.75 11.5a.75.75 0 01-1.096 0l-10.75-11.5a.75.75 0 01-.02-1.003l5.19-6zm.91 1.24L2.258 9.73 12 20.153l9.75-10.43L17.399 4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.873 3.26A.748.748 0 016.44 3h11.31c.223 0 .434.099.576.27l5 6a.75.75 0 01-.028.992l-10.75 11.5a.75.75 0 01-1.096 0l-10.75-11.5a.75.75 0 01-.02-1.003l5.19-6zm.91 1.24L2.258 9.73 12 20.153l9.75-10.43L17.399 4.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var search = {
	name: "search",
	keywords: [
		"magnifying",
		"glass"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215zM11.5 7a4.499 4.499 0 10-8.997 0A4.499 4.499 0 0011.5 7z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.68 11.74a6 6 0 01-7.922-8.982 6 6 0 018.982 7.922l3.04 3.04a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215zM11.5 7a4.499 4.499 0 10-8.997 0A4.499 4.499 0 0011.5 7z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.25 2a8.25 8.25 0 016.34 13.53l5.69 5.69a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-5.69-5.69A8.25 8.25 0 1110.25 2zM3.5 10.25a6.75 6.75 0 1013.5 0 6.75 6.75 0 00-13.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.25 2a8.25 8.25 0 016.34 13.53l5.69 5.69a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-5.69-5.69A8.25 8.25 0 1110.25 2zM3.5 10.25a6.75 6.75 0 1013.5 0 6.75 6.75 0 00-13.5 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var server = {
	name: "server",
	keywords: [
		"computers",
		"racks",
		"ops"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v4c0 .372-.116.717-.314 1 .198.283.314.628.314 1v4a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 12.75v-4c0-.358.109-.707.314-1a1.739 1.739 0 01-.314-1v-4C0 1.784.784 1 1.75 1zM1.5 2.75v4c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zm.25 5.75a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25zM7 4.75A.75.75 0 017.75 4h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017 4.75zM7.75 10h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM3 4.75A.75.75 0 013.75 4h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 4.75zM3.75 10h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v4c0 .372-.116.717-.314 1 .198.283.314.628.314 1v4a1.75 1.75 0 01-1.75 1.75H1.75A1.75 1.75 0 010 12.75v-4c0-.358.109-.707.314-1a1.739 1.739 0 01-.314-1v-4C0 1.784.784 1 1.75 1zM1.5 2.75v4c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zm.25 5.75a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25zM7 4.75A.75.75 0 017.75 4h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017 4.75zM7.75 10h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM3 4.75A.75.75 0 013.75 4h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 4.75zM3.75 10h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.75 6.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zM6 7.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 7.25zm4 9a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm-3.25-.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z\"></path><path d=\"M3.25 2h17.5c.966 0 1.75.784 1.75 1.75v7c0 .372-.116.716-.314 1 .198.284.314.628.314 1v7a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75v-7c0-.358.109-.707.314-1a1.741 1.741 0 01-.314-1v-7C1.5 2.784 2.284 2 3.25 2zm0 10.5a.25.25 0 00-.25.25v7c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25zm0-1.5h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25H3.25a.25.25 0 00-.25.25v7c0 .138.112.25.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.75 6.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zM6 7.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 7.25zm4 9a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zm-3.25-.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 2h17.5c.966 0 1.75.784 1.75 1.75v7c0 .372-.116.716-.314 1 .198.284.314.628.314 1v7a1.75 1.75 0 01-1.75 1.75H3.25a1.75 1.75 0 01-1.75-1.75v-7c0-.358.109-.707.314-1a1.741 1.741 0 01-.314-1v-7C1.5 2.784 2.284 2 3.25 2zm0 10.5a.25.25 0 00-.25.25v7c0 .138.112.25.25.25h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25zm0-1.5h17.5a.25.25 0 00.25-.25v-7a.25.25 0 00-.25-.25H3.25a.25.25 0 00-.25.25v7c0 .138.112.25.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var share = {
	name: "share",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.75 6.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-6.5a.25.25 0 00-.25-.25h-1a.75.75 0 010-1.5h1c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-6.5C2 5.784 2.784 5 3.75 5h1a.75.75 0 010 1.5zM7.823.177a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v5.75a.75.75 0 01-1.5 0V3.5H5.104a.25.25 0 01-.177-.427z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 6.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-6.5a.25.25 0 00-.25-.25h-1a.75.75 0 010-1.5h1c.966 0 1.75.784 1.75 1.75v6.5A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25v-6.5C2 5.784 2.784 5 3.75 5h1a.75.75 0 010 1.5zM7.823.177a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v5.75a.75.75 0 01-1.5 0V3.5H5.104a.25.25 0 01-.177-.427z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.5 9.75v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V9.75a.25.25 0 00-.25-.25h-2.5a.75.75 0 010-1.5h2.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0118.25 22H5.75A1.75 1.75 0 014 20.25V9.75C4 8.784 4.784 8 5.75 8h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25zm7.03-8.53l3.25 3.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-1.97-1.97v10.69a.75.75 0 01-1.5 0V3.56L9.28 5.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.5 9.75v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V9.75a.25.25 0 00-.25-.25h-2.5a.75.75 0 010-1.5h2.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0118.25 22H5.75A1.75 1.75 0 014 20.25V9.75C4 8.784 4.784 8 5.75 8h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25zm7.03-8.53l3.25 3.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-1.97-1.97v10.69a.75.75 0 01-1.5 0V3.56L9.28 5.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.25-3.25a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var shield = {
	name: "shield",
	keywords: [
		"security",
		"shield",
		"protection"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.467.133a1.748 1.748 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667zm.61 1.429a.25.25 0 00-.153 0l-5.25 1.68a.25.25 0 00-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.196.196 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.251.251 0 00-.174-.237l-5.25-1.68zM8.75 4.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 011.5 0zM9 10.5a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.467.133a1.748 1.748 0 011.066 0l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667zm.61 1.429a.25.25 0 00-.153 0l-5.25 1.68a.25.25 0 00-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.196.196 0 00.154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.251.251 0 00-.174-.237l-5.25-1.68zM8.75 4.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 011.5 0zM9 10.5a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13 15.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z\"></path><path d=\"M11.46.637a1.748 1.748 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.77 10.705-9.401 12.83a1.704 1.704 0 01-1.198 0C5.771 20.704 2 16.19 2 10V4.976c0-.76.49-1.43 1.21-1.664zm.617 1.426a.253.253 0 00-.154 0L3.673 4.74a.25.25 0 00-.173.237V10c0 5.461 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.46 20.5 10V4.976a.25.25 0 00-.173-.237z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13 15.5a1 1 0 11-2 0 1 1 0 012 0zm-.25-8.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.46.637a1.748 1.748 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.77 10.705-9.401 12.83a1.704 1.704 0 01-1.198 0C5.771 20.704 2 16.19 2 10V4.976c0-.76.49-1.43 1.21-1.664zm.617 1.426a.253.253 0 00-.154 0L3.673 4.74a.25.25 0 00-.173.237V10c0 5.461 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.46 20.5 10V4.976a.25.25 0 00-.173-.237z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var skip = {
	name: "skip",
	keywords: [
		"skip",
		"slash"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm9.78-2.22l-5.5 5.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l5.5-5.5a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm9.78-2.22l-5.5 5.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l5.5-5.5a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.28 7.78a.75.75 0 00-1.06-1.06l-9.5 9.5a.75.75 0 101.06 1.06l9.5-9.5z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.28 7.78a.75.75 0 00-1.06-1.06l-9.5 9.5a.75.75 0 101.06 1.06l9.5-9.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var sliders = {
	name: "sliders",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M15 2.75a.75.75 0 01-.75.75h-4a.75.75 0 010-1.5h4a.75.75 0 01.75.75zm-8.5.75v1.25a.75.75 0 001.5 0v-4a.75.75 0 00-1.5 0V2H1.75a.75.75 0 000 1.5H6.5zm1.25 5.25a.75.75 0 000-1.5h-6a.75.75 0 000 1.5h6zM15 8a.75.75 0 01-.75.75H11.5V10a.75.75 0 11-1.5 0V6a.75.75 0 011.5 0v1.25h2.75A.75.75 0 0115 8zm-9 5.25v-2a.75.75 0 00-1.5 0v1.25H1.75a.75.75 0 000 1.5H4.5v1.25a.75.75 0 001.5 0v-2zm9 0a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h6a.75.75 0 01.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 2.75a.75.75 0 01-.75.75h-4a.75.75 0 010-1.5h4a.75.75 0 01.75.75zm-8.5.75v1.25a.75.75 0 001.5 0v-4a.75.75 0 00-1.5 0V2H1.75a.75.75 0 000 1.5H6.5zm1.25 5.25a.75.75 0 000-1.5h-6a.75.75 0 000 1.5h6zM15 8a.75.75 0 01-.75.75H11.5V10a.75.75 0 11-1.5 0V6a.75.75 0 011.5 0v1.25h2.75A.75.75 0 0115 8zm-9 5.25v-2a.75.75 0 00-1.5 0v1.25H1.75a.75.75 0 000 1.5H4.5v1.25a.75.75 0 001.5 0v-2zm9 0a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h6a.75.75 0 01.75.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var smiley = {
	name: "smiley",
	keywords: [
		"emoji",
		"smile",
		"mood",
		"emotion"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm3.82 1.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 011.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044zM12 7a1 1 0 11-2 0 1 1 0 012 0zM5 8a1 1 0 110-2 1 1 0 010 2zm5.25 2.25l.592.416a97.71 97.71 0 00-.592-.416z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm3.82 1.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 011.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044zM12 7a1 1 0 11-2 0 1 1 0 012 0zM5 8a1 1 0 110-2 1 1 0 010 2zm5.25 2.25l.592.416a97.71 97.71 0 00-.592-.416z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.456 14.494a.75.75 0 011.068.17 3.08 3.08 0 00.572.492A3.381 3.381 0 0012 15.72c.855 0 1.487-.283 1.904-.562a3.081 3.081 0 00.572-.492l.021-.026a.75.75 0 011.197.905l-.027.034c-.013.016-.03.038-.052.063-.044.05-.105.119-.184.198a4.569 4.569 0 01-.695.566A4.88 4.88 0 0112 17.22a4.88 4.88 0 01-2.736-.814 4.57 4.57 0 01-.695-.566 3.253 3.253 0 01-.236-.261c-.259-.332-.223-.824.123-1.084z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path><path d=\"M9 10.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM16.25 12a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.456 14.494a.75.75 0 011.068.17 3.08 3.08 0 00.572.492A3.381 3.381 0 0012 15.72c.855 0 1.487-.283 1.904-.562a3.081 3.081 0 00.572-.492l.021-.026a.75.75 0 011.197.905l-.027.034c-.013.016-.03.038-.052.063-.044.05-.105.119-.184.198a4.569 4.569 0 01-.695.566A4.88 4.88 0 0112 17.22a4.88 4.88 0 01-2.736-.814 4.57 4.57 0 01-.695-.566 3.253 3.253 0 01-.236-.261c-.259-.332-.223-.824.123-1.084z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9 10.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM16.25 12a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var square = {
	name: "square",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 5.75C4 4.784 4.784 4 5.75 4h4.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0110.25 12h-4.5A1.75 1.75 0 014 10.25zm1.75-.25a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h4.5a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 5.75C4 4.784 4.784 4 5.75 4h4.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0110.25 12h-4.5A1.75 1.75 0 014 10.25zm1.75-.25a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h4.5a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6 7.75C6 6.784 6.784 6 7.75 6h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 18h-8.5A1.75 1.75 0 016 16.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 7.75C6 6.784 6.784 6 7.75 6h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 18h-8.5A1.75 1.75 0 016 16.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var squirrel = {
	name: "squirrel",
	keywords: [
		"ship",
		"shipit",
		"launch"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.499.75a.75.75 0 011.5 0v.996C5.9 2.903 6.793 3.65 7.662 4.376l.24.202c-.036-.694.055-1.422.426-2.163C9.1.873 10.794-.045 12.622.26 14.408.558 16 1.94 16 4.25c0 1.278-.954 2.575-2.44 2.734l.146.508.065.22c.203.701.412 1.455.476 2.226.142 1.707-.4 3.03-1.487 3.898C11.714 14.671 10.27 15 8.75 15h-6a.75.75 0 010-1.5h1.376a4.484 4.484 0 01-.563-1.191 3.835 3.835 0 01-.05-2.063 4.647 4.647 0 01-2.025-.293.75.75 0 01.525-1.406c1.357.507 2.376-.006 2.698-.318l.009-.01a.747.747 0 011.06 0 .748.748 0 01-.012 1.074c-.912.92-.992 1.835-.768 2.586.221.74.745 1.337 1.196 1.621H8.75c1.343 0 2.398-.296 3.074-.836.635-.507 1.036-1.31.928-2.602-.05-.603-.216-1.224-.422-1.93l-.064-.221c-.12-.407-.246-.84-.353-1.29a2.425 2.425 0 01-.507-.441 3.075 3.075 0 01-.633-1.248.75.75 0 011.455-.364c.046.185.144.436.31.627.146.168.353.305.712.305.738 0 1.25-.615 1.25-1.25 0-1.47-.95-2.315-2.123-2.51-1.172-.196-2.227.387-2.706 1.345-.46.92-.27 1.774.019 3.062l.042.19a.884.884 0 01.01.05c.348.443.666.949.94 1.553a.75.75 0 11-1.365.62c-.553-1.217-1.32-1.94-2.3-2.768L6.7 5.527c-.814-.68-1.75-1.462-2.692-2.619a3.737 3.737 0 00-1.023.88c-.406.495-.663 1.036-.722 1.508.116.122.306.21.591.239.388.038.797-.06 1.032-.19a.75.75 0 01.728 1.31c-.515.287-1.23.439-1.906.373-.682-.067-1.473-.38-1.879-1.193L.75 5.677V5.5c0-.984.48-1.94 1.077-2.664.46-.559 1.05-1.055 1.673-1.353V.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.499.75a.75.75 0 011.5 0v.996C5.9 2.903 6.793 3.65 7.662 4.376l.24.202c-.036-.694.055-1.422.426-2.163C9.1.873 10.794-.045 12.622.26 14.408.558 16 1.94 16 4.25c0 1.278-.954 2.575-2.44 2.734l.146.508.065.22c.203.701.412 1.455.476 2.226.142 1.707-.4 3.03-1.487 3.898C11.714 14.671 10.27 15 8.75 15h-6a.75.75 0 010-1.5h1.376a4.484 4.484 0 01-.563-1.191 3.835 3.835 0 01-.05-2.063 4.647 4.647 0 01-2.025-.293.75.75 0 01.525-1.406c1.357.507 2.376-.006 2.698-.318l.009-.01a.747.747 0 011.06 0 .748.748 0 01-.012 1.074c-.912.92-.992 1.835-.768 2.586.221.74.745 1.337 1.196 1.621H8.75c1.343 0 2.398-.296 3.074-.836.635-.507 1.036-1.31.928-2.602-.05-.603-.216-1.224-.422-1.93l-.064-.221c-.12-.407-.246-.84-.353-1.29a2.425 2.425 0 01-.507-.441 3.075 3.075 0 01-.633-1.248.75.75 0 011.455-.364c.046.185.144.436.31.627.146.168.353.305.712.305.738 0 1.25-.615 1.25-1.25 0-1.47-.95-2.315-2.123-2.51-1.172-.196-2.227.387-2.706 1.345-.46.92-.27 1.774.019 3.062l.042.19a.884.884 0 01.01.05c.348.443.666.949.94 1.553a.75.75 0 11-1.365.62c-.553-1.217-1.32-1.94-2.3-2.768L6.7 5.527c-.814-.68-1.75-1.462-2.692-2.619a3.737 3.737 0 00-1.023.88c-.406.495-.663 1.036-.722 1.508.116.122.306.21.591.239.388.038.797-.06 1.032-.19a.75.75 0 01.728 1.31c-.515.287-1.23.439-1.906.373-.682-.067-1.473-.38-1.879-1.193L.75 5.677V5.5c0-.984.48-1.94 1.077-2.664.46-.559 1.05-1.055 1.673-1.353V.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.377 3.49c-1.862-.31-3.718.62-4.456 2.095-.428.857-.691 1.624-.728 2.361-.035.71.138 1.444.67 2.252.644.854 1.199 1.913 1.608 3.346a.75.75 0 11-1.442.412c-.353-1.236-.82-2.135-1.372-2.865l-.008-.01c-.53-.698-1.14-1.242-1.807-1.778a50.724 50.724 0 00-.667-.524C9.024 7.884 7.71 6.863 6.471 5.16c-.59.287-1.248.798-1.806 1.454-.665.78-1.097 1.66-1.158 2.446.246.36.685.61 1.246.715.643.12 1.278.015 1.633-.182a.75.75 0 11.728 1.311c-.723.402-1.728.516-2.637.346-.916-.172-1.898-.667-2.398-1.666L2 9.427V9.25c0-1.323.678-2.615 1.523-3.607.7-.824 1.59-1.528 2.477-1.917V2.75a.75.75 0 111.5 0v1.27c1.154 1.67 2.363 2.612 3.568 3.551.207.162.415.323.621.489.001-.063.003-.126.006-.188.052-1.034.414-2.017.884-2.958 1.06-2.118 3.594-3.313 6.044-2.904 1.225.204 2.329.795 3.125 1.748C22.546 4.713 23 5.988 23 7.5c0 1.496-.913 3.255-2.688 3.652.838 1.699 1.438 3.768 1.181 5.697-.269 2.017-1.04 3.615-2.582 4.675C17.409 22.558 15.288 23 12.5 23H4.75a.75.75 0 010-1.5h2.322c-.58-.701-.998-1.578-1.223-2.471-.327-1.3-.297-2.786.265-4.131-.92.091-1.985-.02-3.126-.445a.75.75 0 11.524-1.406c1.964.733 3.428.266 4.045-.19.068-.06.137-.12.208-.18a.745.745 0 01.861-.076.746.746 0 01.32.368.752.752 0 01-.173.819c-.077.076-.16.15-.252.221-1.322 1.234-1.62 3.055-1.218 4.654.438 1.737 1.574 2.833 2.69 2.837H12.5c2.674 0 4.429-.433 5.56-1.212 1.094-.752 1.715-1.904 1.946-3.637.236-1.768-.445-3.845-1.407-5.529a.576.576 0 01-.012-.02 3.557 3.557 0 01-1.553-.94c-.556-.565-.89-1.243-1.012-1.73a.75.75 0 011.456-.364c.057.231.26.67.626 1.043.35.357.822.623 1.443.623 1.172 0 1.953-1.058 1.953-2.234 0-1.205-.357-2.127-.903-2.78-.547-.654-1.318-1.08-2.22-1.23z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.377 3.49c-1.862-.31-3.718.62-4.456 2.095-.428.857-.691 1.624-.728 2.361-.035.71.138 1.444.67 2.252.644.854 1.199 1.913 1.608 3.346a.75.75 0 11-1.442.412c-.353-1.236-.82-2.135-1.372-2.865l-.008-.01c-.53-.698-1.14-1.242-1.807-1.778a50.724 50.724 0 00-.667-.524C9.024 7.884 7.71 6.863 6.471 5.16c-.59.287-1.248.798-1.806 1.454-.665.78-1.097 1.66-1.158 2.446.246.36.685.61 1.246.715.643.12 1.278.015 1.633-.182a.75.75 0 11.728 1.311c-.723.402-1.728.516-2.637.346-.916-.172-1.898-.667-2.398-1.666L2 9.427V9.25c0-1.323.678-2.615 1.523-3.607.7-.824 1.59-1.528 2.477-1.917V2.75a.75.75 0 111.5 0v1.27c1.154 1.67 2.363 2.612 3.568 3.551.207.162.415.323.621.489.001-.063.003-.126.006-.188.052-1.034.414-2.017.884-2.958 1.06-2.118 3.594-3.313 6.044-2.904 1.225.204 2.329.795 3.125 1.748C22.546 4.713 23 5.988 23 7.5c0 1.496-.913 3.255-2.688 3.652.838 1.699 1.438 3.768 1.181 5.697-.269 2.017-1.04 3.615-2.582 4.675C17.409 22.558 15.288 23 12.5 23H4.75a.75.75 0 010-1.5h2.322c-.58-.701-.998-1.578-1.223-2.471-.327-1.3-.297-2.786.265-4.131-.92.091-1.985-.02-3.126-.445a.75.75 0 11.524-1.406c1.964.733 3.428.266 4.045-.19.068-.06.137-.12.208-.18a.745.745 0 01.861-.076.746.746 0 01.32.368.752.752 0 01-.173.819c-.077.076-.16.15-.252.221-1.322 1.234-1.62 3.055-1.218 4.654.438 1.737 1.574 2.833 2.69 2.837H12.5c2.674 0 4.429-.433 5.56-1.212 1.094-.752 1.715-1.904 1.946-3.637.236-1.768-.445-3.845-1.407-5.529a.576.576 0 01-.012-.02 3.557 3.557 0 01-1.553-.94c-.556-.565-.89-1.243-1.012-1.73a.75.75 0 011.456-.364c.057.231.26.67.626 1.043.35.357.822.623 1.443.623 1.172 0 1.953-1.058 1.953-2.234 0-1.205-.357-2.127-.903-2.78-.547-.654-1.318-1.08-2.22-1.23z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var stack = {
	name: "stack",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.122.392a1.75 1.75 0 011.756 0l5.003 2.902c.83.481.83 1.68 0 2.162L8.878 8.358a1.75 1.75 0 01-1.756 0L2.119 5.456a1.251 1.251 0 010-2.162zM8.125 1.69a.248.248 0 00-.25 0l-4.63 2.685 4.63 2.685a.248.248 0 00.25 0l4.63-2.685zM1.601 7.789a.75.75 0 011.025-.273l5.249 3.044a.248.248 0 00.25 0l5.249-3.044a.75.75 0 01.752 1.298l-5.248 3.044a1.75 1.75 0 01-1.756 0L1.874 8.814A.75.75 0 011.6 7.789zm0 3.5a.75.75 0 011.025-.273l5.249 3.044a.248.248 0 00.25 0l5.249-3.044a.75.75 0 01.752 1.298l-5.248 3.044a1.75 1.75 0 01-1.756 0l-5.248-3.044a.75.75 0 01-.273-1.025z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.122.392a1.75 1.75 0 011.756 0l5.003 2.902c.83.481.83 1.68 0 2.162L8.878 8.358a1.75 1.75 0 01-1.756 0L2.119 5.456a1.251 1.251 0 010-2.162zM8.125 1.69a.248.248 0 00-.25 0l-4.63 2.685 4.63 2.685a.248.248 0 00.25 0l4.63-2.685zM1.601 7.789a.75.75 0 011.025-.273l5.249 3.044a.248.248 0 00.25 0l5.249-3.044a.75.75 0 01.752 1.298l-5.248 3.044a1.75 1.75 0 01-1.756 0L1.874 8.814A.75.75 0 011.6 7.789zm0 3.5a.75.75 0 011.025-.273l5.249 3.044a.248.248 0 00.25 0l5.249-3.044a.75.75 0 01.752 1.298l-5.248 3.044a1.75 1.75 0 01-1.756 0l-5.248-3.044a.75.75 0 01-.273-1.025z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.063 1.456a1.749 1.749 0 011.874 0l8.383 5.316a1.751 1.751 0 010 2.956l-8.383 5.316a1.749 1.749 0 01-1.874 0L2.68 9.728a1.751 1.751 0 010-2.956zm1.071 1.267a.25.25 0 00-.268 0L3.483 8.039a.25.25 0 000 .422l8.383 5.316a.25.25 0 00.268 0l8.383-5.316a.25.25 0 000-.422z\"></path><path d=\"M1.867 12.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.749 1.749 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z\"></path><path d=\"M1.867 16.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.749 1.749 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.063 1.456a1.749 1.749 0 011.874 0l8.383 5.316a1.751 1.751 0 010 2.956l-8.383 5.316a1.749 1.749 0 01-1.874 0L2.68 9.728a1.751 1.751 0 010-2.956zm1.071 1.267a.25.25 0 00-.268 0L3.483 8.039a.25.25 0 000 .422l8.383 5.316a.25.25 0 00.268 0l8.383-5.316a.25.25 0 000-.422z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.867 12.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.749 1.749 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.867 16.324a.75.75 0 011.035-.232l8.964 5.685a.25.25 0 00.268 0l8.964-5.685a.75.75 0 01.804 1.267l-8.965 5.685a1.749 1.749 0 01-1.874 0l-8.965-5.685a.75.75 0 01-.231-1.035z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var star = {
	name: "star",
	keywords: [
		"save",
		"remember",
		"like"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 .25a.75.75 0 01.673.418l3.058 6.197 6.839.994a.75.75 0 01.415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 01-1.088.791L12 18.347l-6.117 3.216a.75.75 0 01-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 01.416-1.28l6.838-.993L11.328.668A.75.75 0 0112 .25zm0 2.445L9.44 7.882a.75.75 0 01-.565.41l-5.725.832 4.143 4.038a.748.748 0 01.215.664l-.978 5.702 5.121-2.692a.75.75 0 01.698 0l5.12 2.692-.977-5.702a.748.748 0 01.215-.664l4.143-4.038-5.725-.831a.75.75 0 01-.565-.41L12 2.694z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 .25a.75.75 0 01.673.418l3.058 6.197 6.839.994a.75.75 0 01.415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 01-1.088.791L12 18.347l-6.117 3.216a.75.75 0 01-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 01.416-1.28l6.838-.993L11.328.668A.75.75 0 0112 .25zm0 2.445L9.44 7.882a.75.75 0 01-.565.41l-5.725.832 4.143 4.038a.748.748 0 01.215.664l-.978 5.702 5.121-2.692a.75.75 0 01.698 0l5.12 2.692-.977-5.702a.748.748 0 01.215-.664l4.143-4.038-5.725-.831a.75.75 0 01-.565-.41L12 2.694z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var stop = {
	name: "stop",
	keywords: [
		"block",
		"spam",
		"report"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.47.22A.749.749 0 015 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 01-.22.53l-4.25 4.25A.749.749 0 0111 16H5a.749.749 0 01-.53-.22L.22 11.53A.749.749 0 010 11V5c0-.199.079-.389.22-.53zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.47.22A.749.749 0 015 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 01-.22.53l-4.25 4.25A.749.749 0 0111 16H5a.749.749 0 01-.53-.22L.22 11.53A.749.749 0 010 11V5c0-.199.079-.389.22-.53zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm0 10a1 1 0 100-2 1 1 0 000 2z\"></path><path d=\"M7.328 1.47a.749.749 0 01.53-.22h8.284c.199 0 .389.079.53.22l5.858 5.858c.141.14.22.33.22.53v8.284a.749.749 0 01-.22.53l-5.858 5.858a.749.749 0 01-.53.22H7.858a.749.749 0 01-.53-.22L1.47 16.672a.749.749 0 01-.22-.53V7.858c0-.199.079-.389.22-.53zm.84 1.28L2.75 8.169v7.662l5.419 5.419h7.662l5.419-5.418V8.168L15.832 2.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 7a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 7zm0 10a1 1 0 100-2 1 1 0 000 2z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.328 1.47a.749.749 0 01.53-.22h8.284c.199 0 .389.079.53.22l5.858 5.858c.141.14.22.33.22.53v8.284a.749.749 0 01-.22.53l-5.858 5.858a.749.749 0 01-.53.22H7.858a.749.749 0 01-.53-.22L1.47 16.672a.749.749 0 01-.22-.53V7.858c0-.199.079-.389.22-.53zm.84 1.28L2.75 8.169v7.662l5.419 5.419h7.662l5.419-5.418V8.168L15.832 2.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var stopwatch = {
	name: "stopwatch",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.75.75A.75.75 0 016.5 0h3a.75.75 0 010 1.5h-.75v1l-.001.041a6.724 6.724 0 013.464 1.435l.007-.006.75-.75a.749.749 0 011.275.326.749.749 0 01-.215.734l-.75.75-.006.007a6.75 6.75 0 11-10.548 0L2.72 5.03l-.75-.75a.751.751 0 01.018-1.042.751.751 0 011.042-.018l.75.75.007.006A6.72 6.72 0 017.25 2.541V1.5H6.5a.75.75 0 01-.75-.75zM8 14.5a5.25 5.25 0 10-.001-10.501A5.25 5.25 0 008 14.5zm.389-6.7l1.33-1.33a.75.75 0 111.061 1.06L9.45 8.861A1.503 1.503 0 018 10.75a1.499 1.499 0 11.389-2.95z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75.75A.75.75 0 016.5 0h3a.75.75 0 010 1.5h-.75v1l-.001.041a6.724 6.724 0 013.464 1.435l.007-.006.75-.75a.749.749 0 011.275.326.749.749 0 01-.215.734l-.75.75-.006.007a6.75 6.75 0 11-10.548 0L2.72 5.03l-.75-.75a.751.751 0 01.018-1.042.751.751 0 011.042-.018l.75.75.007.006A6.72 6.72 0 017.25 2.541V1.5H6.5a.75.75 0 01-.75-.75zM8 14.5a5.25 5.25 0 10-.001-10.501A5.25 5.25 0 008 14.5zm.389-6.7l1.33-1.33a.75.75 0 111.061 1.06L9.45 8.861A1.503 1.503 0 018 10.75a1.499 1.499 0 11.389-2.95z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.25 0h3.5a.75.75 0 010 1.5h-1v1.278a9.954 9.954 0 015.636 2.276L19.72 3.72a.751.751 0 011.042.018.751.751 0 01.018 1.042l-1.315 1.316A9.959 9.959 0 0122 12.75c0 5.523-4.477 10-10 10s-10-4.477-10-10a9.959 9.959 0 012.535-6.654L3.22 4.78a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.335 1.334a9.958 9.958 0 015.635-2.276V1.5h-1a.75.75 0 010-1.5zM12 21.25a8.5 8.5 0 10-.001-17.001A8.5 8.5 0 0012 21.25zm4.03-12.53a.75.75 0 010 1.06l-2.381 2.382a1.75 1.75 0 11-1.06-1.06l2.38-2.382a.75.75 0 011.061 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.25 0h3.5a.75.75 0 010 1.5h-1v1.278a9.954 9.954 0 015.636 2.276L19.72 3.72a.751.751 0 011.042.018.751.751 0 01.018 1.042l-1.315 1.316A9.959 9.959 0 0122 12.75c0 5.523-4.477 10-10 10s-10-4.477-10-10a9.959 9.959 0 012.535-6.654L3.22 4.78a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.335 1.334a9.958 9.958 0 015.635-2.276V1.5h-1a.75.75 0 010-1.5zM12 21.25a8.5 8.5 0 10-.001-17.001A8.5 8.5 0 0012 21.25zm4.03-12.53a.75.75 0 010 1.06l-2.381 2.382a1.75 1.75 0 11-1.06-1.06l2.38-2.382a.75.75 0 011.061 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var strikethrough = {
	name: "strikethrough",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.055 8.5c.524.536.815 1.257.811 2.007a3.133 3.133 0 01-1.12 2.408C9.948 13.597 8.748 14 7.096 14c-1.706 0-3.104-.607-3.902-1.377a.751.751 0 011.042-1.079c.48.463 1.487.956 2.86.956 1.422 0 2.232-.346 2.676-.726.435-.372.594-.839.594-1.267 0-.472-.208-.857-.647-1.197-.448-.346-1.116-.623-1.951-.81H1.75a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5zM7.581 3.25c-2.036 0-2.778 1.082-2.778 1.786 0 .055.002.107.006.157a.75.75 0 01-1.496.114 3.506 3.506 0 01-.01-.271c0-1.832 1.75-3.286 4.278-3.286 1.418 0 2.721.58 3.514 1.093a.75.75 0 11-.814 1.26c-.64-.414-1.662-.853-2.7-.853z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.055 8.5c.524.536.815 1.257.811 2.007a3.133 3.133 0 01-1.12 2.408C9.948 13.597 8.748 14 7.096 14c-1.706 0-3.104-.607-3.902-1.377a.751.751 0 011.042-1.079c.48.463 1.487.956 2.86.956 1.422 0 2.232-.346 2.676-.726.435-.372.594-.839.594-1.267 0-.472-.208-.857-.647-1.197-.448-.346-1.116-.623-1.951-.81H1.75a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5zM7.581 3.25c-2.036 0-2.778 1.082-2.778 1.786 0 .055.002.107.006.157a.75.75 0 01-1.496.114 3.506 3.506 0 01-.01-.271c0-1.832 1.75-3.286 4.278-3.286 1.418 0 2.721.58 3.514 1.093a.75.75 0 11-.814 1.26c-.64-.414-1.662-.853-2.7-.853z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.533 12.5l.054.043c.93.75 1.538 1.77 1.538 3.066a4.13 4.13 0 01-1.479 3.177c-1.058.904-2.679 1.464-4.974 1.464-2.35 0-4.252-.837-5.318-1.865a.75.75 0 111.042-1.08c.747.722 2.258 1.445 4.276 1.445 2.065 0 3.296-.504 3.999-1.105a2.63 2.63 0 00.954-2.036c0-.764-.337-1.38-.979-1.898-.649-.523-1.598-.931-2.76-1.211H3.75a.75.75 0 010-1.5h16.5a.75.75 0 010 1.5zM12.36 5C9.37 5 8.105 6.613 8.105 7.848c0 .411.072.744.193 1.02a.75.75 0 01-1.373.603 3.988 3.988 0 01-.32-1.623c0-2.363 2.271-4.348 5.755-4.348 1.931 0 3.722.794 4.814 1.5a.75.75 0 11-.814 1.26c-.94-.607-2.448-1.26-4-1.26z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.533 12.5l.054.043c.93.75 1.538 1.77 1.538 3.066a4.13 4.13 0 01-1.479 3.177c-1.058.904-2.679 1.464-4.974 1.464-2.35 0-4.252-.837-5.318-1.865a.75.75 0 111.042-1.08c.747.722 2.258 1.445 4.276 1.445 2.065 0 3.296-.504 3.999-1.105a2.63 2.63 0 00.954-2.036c0-.764-.337-1.38-.979-1.898-.649-.523-1.598-.931-2.76-1.211H3.75a.75.75 0 010-1.5h16.5a.75.75 0 010 1.5zM12.36 5C9.37 5 8.105 6.613 8.105 7.848c0 .411.072.744.193 1.02a.75.75 0 01-1.373.603 3.988 3.988 0 01-.32-1.623c0-2.363 2.271-4.348 5.755-4.348 1.931 0 3.722.794 4.814 1.5a.75.75 0 11-.814 1.26c-.94-.607-2.448-1.26-4-1.26z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var sun = {
	name: "sun",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 12a4 4 0 110-8 4 4 0 010 8zm0-1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm5.657-8.157a.75.75 0 010 1.061l-1.061 1.06a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm13 0a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zm-8 5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zm3.536-1.464a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-1.06-1.06a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 12a4 4 0 110-8 4 4 0 010 8zm0-1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm5.657-8.157a.75.75 0 010 1.061l-1.061 1.06a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm13 0a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zm-8 5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zm3.536-1.464a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-1.06-1.06a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 19a7 7 0 110-14 7 7 0 010 14zm0-1.5a5.5 5.5 0 100-11 5.5 5.5 0 100 11zm-5.657.157a.75.75 0 010 1.06l-1.768 1.768a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.767-1.768a.75.75 0 011.061 0zM3.515 3.515a.75.75 0 011.06 0l1.768 1.768a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L3.515 4.575a.75.75 0 010-1.06zM12 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V.75A.75.75 0 0112 0zM4 12a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h2.5A.75.75 0 014 12zm8 8a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0112 20zm12-8a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5A.75.75 0 0124 12zm-6.343 5.657a.75.75 0 011.06 0l1.768 1.768a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-1.768-1.767a.75.75 0 010-1.061zm2.828-14.142a.75.75 0 010 1.06l-1.768 1.768a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l1.767-1.768a.75.75 0 011.061 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 19a7 7 0 110-14 7 7 0 010 14zm0-1.5a5.5 5.5 0 100-11 5.5 5.5 0 100 11zm-5.657.157a.75.75 0 010 1.06l-1.768 1.768a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.767-1.768a.75.75 0 011.061 0zM3.515 3.515a.75.75 0 011.06 0l1.768 1.768a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L3.515 4.575a.75.75 0 010-1.06zM12 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V.75A.75.75 0 0112 0zM4 12a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h2.5A.75.75 0 014 12zm8 8a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0112 20zm12-8a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5A.75.75 0 0124 12zm-6.343 5.657a.75.75 0 011.06 0l1.768 1.768a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-1.768-1.767a.75.75 0 010-1.061zm2.828-14.142a.75.75 0 010 1.06l-1.768 1.768a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l1.767-1.768a.75.75 0 011.061 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var sync = {
	name: "sync",
	keywords: [
		"cycle",
		"refresh",
		"loop"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.705 8.005a.75.75 0 01.834.656 5.5 5.5 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.002 7.002 0 011.05 8.84a.75.75 0 01.656-.834zM8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.002 7.002 0 0114.95 7.16a.75.75 0 01-1.49.178A5.5 5.5 0 008 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.705 8.005a.75.75 0 01.834.656 5.5 5.5 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.002 7.002 0 011.05 8.84a.75.75 0 01.656-.834zM8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.002 7.002 0 0114.95 7.16a.75.75 0 01-1.49.178A5.5 5.5 0 008 2.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var tab = {
	name: "tab",
	keywords: [
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M22 4.25a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zm-9.72 14.28a.75.75 0 11-1.06-1.06l4.97-4.97H1.75a.75.75 0 010-1.5h14.44l-4.97-4.97a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22 4.25a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zm-9.72 14.28a.75.75 0 11-1.06-1.06l4.97-4.97H1.75a.75.75 0 010-1.5h14.44l-4.97-4.97a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var table = {
	name: "table",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zM6.5 6.5v8h7.75a.25.25 0 00.25-.25V6.5zm8-1.5V1.75a.25.25 0 00-.25-.25H6.5V5zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8zM5 5V1.5H1.75a.25.25 0 00-.25.25V5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zM6.5 6.5v8h7.75a.25.25 0 00.25-.25V6.5zm8-1.5V1.75a.25.25 0 00-.25-.25H6.5V5zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8zM5 5V1.5H1.75a.25.25 0 00-.25.25V5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zM9 9v11.5h11.25a.25.25 0 00.25-.25V9zm11.5-1.5V3.75a.25.25 0 00-.25-.25H9v4zM3.5 9v11.25c0 .138.112.25.25.25H7.5V9zm4-1.5v-4H3.75a.25.25 0 00-.25.25V7.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zM9 9v11.5h11.25a.25.25 0 00.25-.25V9zm11.5-1.5V3.75a.25.25 0 00-.25-.25H9v4zM3.5 9v11.25c0 .138.112.25.25.25H7.5V9zm4-1.5v-4H3.75a.25.25 0 00-.25.25V7.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var tag = {
	name: "tag",
	keywords: [
		"release"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.752 1.752 0 011 7.775zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 00.354 0l5.025-5.025a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.177-.073H2.75a.25.25 0 00-.25.25zM6 5a1 1 0 110 2 1 1 0 010-2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.752 1.752 0 011 7.775zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 00.354 0l5.025-5.025a.25.25 0 000-.354l-6.25-6.25a.25.25 0 00-.177-.073H2.75a.25.25 0 00-.25.25zM6 5a1 1 0 110 2 1 1 0 010-2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.75 6.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z\"></path><path d=\"M2.5 1h8.44a1.5 1.5 0 011.06.44l10.25 10.25a1.5 1.5 0 010 2.12l-8.44 8.44a1.5 1.5 0 01-2.12 0L1.44 12A1.497 1.497 0 011 10.94V2.5A1.5 1.5 0 012.5 1zm0 1.5v8.44l10.25 10.25 8.44-8.44L10.94 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.75 6.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 1h8.44a1.5 1.5 0 011.06.44l10.25 10.25a1.5 1.5 0 010 2.12l-8.44 8.44a1.5 1.5 0 01-2.12 0L1.44 12A1.497 1.497 0 011 10.94V2.5A1.5 1.5 0 012.5 1zm0 1.5v8.44l10.25 10.25 8.44-8.44L10.94 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var tasklist = {
	name: "tasklist",
	keywords: [
		"todo"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 2h4a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm4.655 8.595a.75.75 0 010 1.06L4.03 14.28a.75.75 0 01-1.06 0l-1.5-1.5a.749.749 0 01.326-1.275.749.749 0 01.734.215l.97.97 2.095-2.095a.75.75 0 011.06 0zM9.75 2.5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm0 5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm0 5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm-7.25-9v3h3v-3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2h4a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm4.655 8.595a.75.75 0 010 1.06L4.03 14.28a.75.75 0 01-1.06 0l-1.5-1.5a.749.749 0 01.326-1.275.749.749 0 01.734.215l.97.97 2.095-2.095a.75.75 0 011.06 0zM9.75 2.5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm0 5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm0 5h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 010-1.5zm-7.25-9v3h3v-3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 6a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1zm1.5 4.5h4v-4h-4zm8.25-5a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 6a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 6a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm-2.97-2.53a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 6a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1zm1.5 4.5h4v-4h-4zm8.25-5a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 6a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm0 6a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zm-2.97-2.53a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06l1.47 1.47 2.97-2.97a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var telescope = {
	name: "telescope",
	keywords: [
		"science",
		"space",
		"look",
		"view",
		"explore"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M14.184 1.143v-.001l1.422 2.464a1.75 1.75 0 01-.757 2.451L3.104 11.713a1.75 1.75 0 01-2.275-.702l-.447-.775a1.75 1.75 0 01.53-2.32L11.682.573a1.748 1.748 0 012.502.57zm-4.709 9.32h-.001l2.644 3.863a.75.75 0 11-1.238.848l-1.881-2.75v2.826a.75.75 0 01-1.5 0v-2.826l-1.881 2.75a.75.75 0 11-1.238-.848l2.049-2.992a.746.746 0 01.293-.253l1.809-.87a.749.749 0 01.944.252zM9.436 3.92h-.001l-4.97 3.39.942 1.63 5.42-2.61zm3.091-2.108h.001l-1.85 1.26 1.505 2.605 2.016-.97a.247.247 0 00.13-.151.247.247 0 00-.022-.199l-1.422-2.464a.253.253 0 00-.161-.119.254.254 0 00-.197.038zM1.756 9.157a.25.25 0 00-.075.33l.447.775a.25.25 0 00.325.1l1.598-.769-.83-1.436-1.465 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.184 1.143v-.001l1.422 2.464a1.75 1.75 0 01-.757 2.451L3.104 11.713a1.75 1.75 0 01-2.275-.702l-.447-.775a1.75 1.75 0 01.53-2.32L11.682.573a1.748 1.748 0 012.502.57zm-4.709 9.32h-.001l2.644 3.863a.75.75 0 11-1.238.848l-1.881-2.75v2.826a.75.75 0 01-1.5 0v-2.826l-1.881 2.75a.75.75 0 11-1.238-.848l2.049-2.992a.746.746 0 01.293-.253l1.809-.87a.749.749 0 01.944.252zM9.436 3.92h-.001l-4.97 3.39.942 1.63 5.42-2.61zm3.091-2.108h.001l-1.85 1.26 1.505 2.605 2.016-.97a.247.247 0 00.13-.151.247.247 0 00-.022-.199l-1.422-2.464a.253.253 0 00-.161-.119.254.254 0 00-.197.038zM1.756 9.157a.25.25 0 00-.075.33l.447.775a.25.25 0 00.325.1l1.598-.769-.83-1.436-1.465 1z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M.408 15.13a2 2 0 01.59-2.642L17.038 1.33a1.999 1.999 0 012.85.602l2.828 4.644a2 2 0 01-.851 2.847l-17.762 8.43a2 2 0 01-2.59-.807zm5.263-4.066l1.987 3.44 8.712-4.135-2.857-4.76zm12.06-1.34l.001-.001 3.49-1.656a.498.498 0 00.212-.712l-2.826-4.644a.503.503 0 00-.713-.151l-3.148 2.19zm-13.295 2.2L1.854 13.72a.5.5 0 00-.147.66l1.105 1.915a.5.5 0 00.648.201l2.838-1.347zM17.155 22.87a.75.75 0 00.226-1.036l-4-6.239a.75.75 0 00-.941-.278l-2.75 1.25a.75.75 0 00-.318.274l-3.25 4.989a.75.75 0 001.256.819l3.131-4.806.51-.232v5.64a.75.75 0 101.5 0v-6.22l3.6 5.613a.75.75 0 001.036.226z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.408 15.13a2 2 0 01.59-2.642L17.038 1.33a1.999 1.999 0 012.85.602l2.828 4.644a2 2 0 01-.851 2.847l-17.762 8.43a2 2 0 01-2.59-.807zm5.263-4.066l1.987 3.44 8.712-4.135-2.857-4.76zm12.06-1.34l.001-.001 3.49-1.656a.498.498 0 00.212-.712l-2.826-4.644a.503.503 0 00-.713-.151l-3.148 2.19zm-13.295 2.2L1.854 13.72a.5.5 0 00-.147.66l1.105 1.915a.5.5 0 00.648.201l2.838-1.347zM17.155 22.87a.75.75 0 00.226-1.036l-4-6.239a.75.75 0 00-.941-.278l-2.75 1.25a.75.75 0 00-.318.274l-3.25 4.989a.75.75 0 001.256.819l3.131-4.806.51-.232v5.64a.75.75 0 101.5 0v-6.22l3.6 5.613a.75.75 0 001.036.226z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var terminal = {
	name: "terminal",
	keywords: [
		"code",
		"ops",
		"shell"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM7.25 8a.749.749 0 01-.22.53l-2.25 2.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L5.44 8 3.72 6.28a.749.749 0 01.326-1.275.749.749 0 01.734.215l2.25 2.25c.141.14.22.331.22.53zm1.5 1.5h3a.75.75 0 010 1.5h-3a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM7.25 8a.749.749 0 01-.22.53l-2.25 2.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L5.44 8 3.72 6.28a.749.749 0 01.326-1.275.749.749 0 01.734.215l2.25 2.25c.141.14.22.331.22.53zm1.5 1.5h3a.75.75 0 010 1.5h-3a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.25 12a.75.75 0 01-.22.53l-2.75 2.75a.75.75 0 01-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 111.06-1.06l2.75 2.75c.141.14.22.331.22.53zm2 2a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z\"></path><path d=\"M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.25 12a.75.75 0 01-.22.53l-2.75 2.75a.75.75 0 01-1.06-1.06L7.44 12 5.22 9.78a.75.75 0 111.06-1.06l2.75 2.75c.141.14.22.331.22.53zm2 2a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var thumbsdown = {
	name: "thumbsdown",
	keywords: [
		"thumb",
		"thumbsdown",
		"rejected",
		"dislike"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.083 15.986c-.763-.087-1.499-.295-2.011-.884-.504-.581-.655-1.378-.655-2.299 0-.468.087-1.12.157-1.638l.015-.112H3.167c-.603 0-1.174-.086-1.669-.334a2.415 2.415 0 01-1.136-1.2c-.454-.998-.438-2.447-.188-4.316l.04-.306C.32 4.108.41 3.424.526 2.864c.132-.63.316-1.209.669-1.672C1.947.205 3.211.053 4.917.053c1.848 0 3.234.332 4.388.652l.474.133c.658.187 1.201.341 1.726.415a1.75 1.75 0 011.662-1.2h1c.966 0 1.75.784 1.75 1.75v7.5a1.75 1.75 0 01-1.75 1.75h-1a1.75 1.75 0 01-1.514-.872c-.259.105-.59.268-.919.508-.671.491-1.317 1.285-1.317 2.614v.5c0 1.201-.994 2.336-2.334 2.183zm4.334-13.232c-.706-.089-1.39-.284-2.072-.479l-.441-.125c-1.096-.304-2.335-.597-3.987-.597-1.794 0-2.28.222-2.529.548-.147.193-.275.505-.393 1.07-.105.502-.188 1.124-.295 1.93l-.04.3c-.25 1.882-.19 2.933.067 3.497a.923.923 0 00.443.48c.208.104.52.175.997.175h1.75c.685 0 1.295.577 1.205 1.335-.022.192-.049.39-.075.586-.066.488-.13.97-.13 1.329 0 .808.144 1.15.288 1.316.137.157.401.303 1.048.377.307.035.664-.237.664-.693v-.5c0-1.922.978-3.127 1.932-3.825a5.878 5.878 0 011.568-.809zm1.75 6.798h1a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-1a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.083 15.986c-.763-.087-1.499-.295-2.011-.884-.504-.581-.655-1.378-.655-2.299 0-.468.087-1.12.157-1.638l.015-.112H3.167c-.603 0-1.174-.086-1.669-.334a2.415 2.415 0 01-1.136-1.2c-.454-.998-.438-2.447-.188-4.316l.04-.306C.32 4.108.41 3.424.526 2.864c.132-.63.316-1.209.669-1.672C1.947.205 3.211.053 4.917.053c1.848 0 3.234.332 4.388.652l.474.133c.658.187 1.201.341 1.726.415a1.75 1.75 0 011.662-1.2h1c.966 0 1.75.784 1.75 1.75v7.5a1.75 1.75 0 01-1.75 1.75h-1a1.75 1.75 0 01-1.514-.872c-.259.105-.59.268-.919.508-.671.491-1.317 1.285-1.317 2.614v.5c0 1.201-.994 2.336-2.334 2.183zm4.334-13.232c-.706-.089-1.39-.284-2.072-.479l-.441-.125c-1.096-.304-2.335-.597-3.987-.597-1.794 0-2.28.222-2.529.548-.147.193-.275.505-.393 1.07-.105.502-.188 1.124-.295 1.93l-.04.3c-.25 1.882-.19 2.933.067 3.497a.923.923 0 00.443.48c.208.104.52.175.997.175h1.75c.685 0 1.295.577 1.205 1.335-.022.192-.049.39-.075.586-.066.488-.13.97-.13 1.329 0 .808.144 1.15.288 1.316.137.157.401.303 1.048.377.307.035.664-.237.664-.693v-.5c0-1.922.978-3.127 1.932-3.825a5.878 5.878 0 011.568-.809zm1.75 6.798h1a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-1a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.596 21.957c-1.301.092-2.303-.986-2.303-2.206v-1.053c0-2.666-1.813-3.785-2.774-4.2a1.884 1.884 0 00-.523-.13A1.75 1.75 0 015.25 16h-1.5A1.75 1.75 0 012 14.25V3.75C2 2.784 2.784 2 3.75 2h1.5a1.75 1.75 0 011.742 1.58c.838-.06 1.667-.296 2.69-.586l.602-.17C11.748 2.419 13.497 2 15.828 2c2.188 0 3.693.204 4.583 1.372.422.554.65 1.255.816 2.05.148.708.262 1.57.396 2.58l.051.39c.319 2.386.328 4.18-.223 5.394-.293.644-.743 1.125-1.355 1.431-.59.296-1.284.404-2.036.404h-2.05l.056.429c.025.18.05.372.076.572.06.483.117 1.006.117 1.438 0 1.245-.222 2.253-.92 2.942-.684.674-1.668.879-2.743.955zM7 5.082v7.779c.383.025.759.113 1.113.26 1.192.514 3.68 2.027 3.68 5.577v1.053c0 .436.347.734.698.71 1.021-.072 1.52-.258 1.795-.528.26-.256.473-.748.473-1.873 0-.328-.045-.768-.105-1.25l-.07-.527c-.04-.297-.079-.59-.105-.834-.082-.758.53-1.328 1.211-1.328h2.37c.625 0 1.06-.092 1.365-.245.285-.142.5-.359.66-.711.355-.78.422-2.176.102-4.574l-.05-.385c-.137-1.027-.243-1.827-.379-2.477-.152-.73-.324-1.165-.54-1.448-.386-.507-1.113-.781-3.39-.781-2.136 0-3.736.379-5.142.771-.191.052-.38.106-.568.16-1.039.296-2.059.587-3.118.651zM3.75 3.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.596 21.957c-1.301.092-2.303-.986-2.303-2.206v-1.053c0-2.666-1.813-3.785-2.774-4.2a1.884 1.884 0 00-.523-.13A1.75 1.75 0 015.25 16h-1.5A1.75 1.75 0 012 14.25V3.75C2 2.784 2.784 2 3.75 2h1.5a1.75 1.75 0 011.742 1.58c.838-.06 1.667-.296 2.69-.586l.602-.17C11.748 2.419 13.497 2 15.828 2c2.188 0 3.693.204 4.583 1.372.422.554.65 1.255.816 2.05.148.708.262 1.57.396 2.58l.051.39c.319 2.386.328 4.18-.223 5.394-.293.644-.743 1.125-1.355 1.431-.59.296-1.284.404-2.036.404h-2.05l.056.429c.025.18.05.372.076.572.06.483.117 1.006.117 1.438 0 1.245-.222 2.253-.92 2.942-.684.674-1.668.879-2.743.955zM7 5.082v7.779c.383.025.759.113 1.113.26 1.192.514 3.68 2.027 3.68 5.577v1.053c0 .436.347.734.698.71 1.021-.072 1.52-.258 1.795-.528.26-.256.473-.748.473-1.873 0-.328-.045-.768-.105-1.25l-.07-.527c-.04-.297-.079-.59-.105-.834-.082-.758.53-1.328 1.211-1.328h2.37c.625 0 1.06-.092 1.365-.245.285-.142.5-.359.66-.711.355-.78.422-2.176.102-4.574l-.05-.385c-.137-1.027-.243-1.827-.379-2.477-.152-.73-.324-1.165-.54-1.448-.386-.507-1.113-.781-3.39-.781-2.136 0-3.736.379-5.142.771-.191.052-.38.106-.568.16-1.039.296-2.059.587-3.118.651zM3.75 3.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var thumbsup = {
	name: "thumbsup",
	keywords: [
		"thumb",
		"thumbsup",
		"prop",
		"ship",
		"like"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.834.066c.763.087 1.5.295 2.01.884.505.581.656 1.378.656 2.3 0 .467-.087 1.119-.157 1.637L11.328 5h1.422c.603 0 1.174.085 1.668.333.508.254.911.679 1.137 1.2.453.998.438 2.447.188 4.316l-.04.306c-.105.79-.195 1.473-.313 2.033-.131.63-.315 1.209-.668 1.672C13.97 15.847 12.706 16 11 16c-1.848 0-3.234-.333-4.388-.653-.165-.045-.323-.09-.475-.133-.658-.186-1.2-.34-1.725-.415A1.75 1.75 0 012.75 16h-1A1.75 1.75 0 010 14.25v-7.5C0 5.784.784 5 1.75 5h1a1.75 1.75 0 011.514.872c.258-.105.59-.268.918-.508C5.853 4.874 6.5 4.079 6.5 2.75v-.5c0-1.202.994-2.337 2.334-2.184zM4.5 13.3c.705.088 1.39.284 2.072.478l.441.125c1.096.305 2.334.598 3.987.598 1.794 0 2.28-.223 2.528-.549.147-.193.276-.505.394-1.07.105-.502.188-1.124.295-1.93l.04-.3c.25-1.882.189-2.933-.068-3.497a.921.921 0 00-.442-.48c-.208-.104-.52-.174-.997-.174H11c-.686 0-1.295-.577-1.206-1.336.023-.192.05-.39.076-.586.065-.488.13-.97.13-1.328 0-.809-.144-1.15-.288-1.316-.137-.158-.402-.304-1.048-.378C8.357 1.521 8 1.793 8 2.25v.5c0 1.922-.978 3.128-1.933 3.825a5.831 5.831 0 01-1.567.81zM2.75 6.5h-1a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.834.066c.763.087 1.5.295 2.01.884.505.581.656 1.378.656 2.3 0 .467-.087 1.119-.157 1.637L11.328 5h1.422c.603 0 1.174.085 1.668.333.508.254.911.679 1.137 1.2.453.998.438 2.447.188 4.316l-.04.306c-.105.79-.195 1.473-.313 2.033-.131.63-.315 1.209-.668 1.672C13.97 15.847 12.706 16 11 16c-1.848 0-3.234-.333-4.388-.653-.165-.045-.323-.09-.475-.133-.658-.186-1.2-.34-1.725-.415A1.75 1.75 0 012.75 16h-1A1.75 1.75 0 010 14.25v-7.5C0 5.784.784 5 1.75 5h1a1.75 1.75 0 011.514.872c.258-.105.59-.268.918-.508C5.853 4.874 6.5 4.079 6.5 2.75v-.5c0-1.202.994-2.337 2.334-2.184zM4.5 13.3c.705.088 1.39.284 2.072.478l.441.125c1.096.305 2.334.598 3.987.598 1.794 0 2.28-.223 2.528-.549.147-.193.276-.505.394-1.07.105-.502.188-1.124.295-1.93l.04-.3c.25-1.882.189-2.933-.068-3.497a.921.921 0 00-.442-.48c-.208-.104-.52-.174-.997-.174H11c-.686 0-1.295-.577-1.206-1.336.023-.192.05-.39.076-.586.065-.488.13-.97.13-1.328 0-.809-.144-1.15-.288-1.316-.137-.158-.402-.304-1.048-.378C8.357 1.521 8 1.793 8 2.25v.5c0 1.922-.978 3.128-1.933 3.825a5.831 5.831 0 01-1.567.81zM2.75 6.5h-1a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.596 2.043c1.075.076 2.059.281 2.743.956.698.688.92 1.696.92 2.941 0 .432-.057.955-.117 1.438-.026.2-.051.392-.076.572l-.056.429h2.05c.752 0 1.446.108 2.036.404.612.306 1.062.787 1.355 1.431.551 1.214.542 3.008.223 5.394l-.051.39c-.134 1.01-.248 1.872-.396 2.58-.166.795-.394 1.496-.816 2.05-.89 1.168-2.395 1.372-4.583 1.372-2.331 0-4.08-.418-5.544-.824l-.602-.17c-1.023-.29-1.852-.526-2.69-.586A1.75 1.75 0 015.25 22h-1.5A1.75 1.75 0 012 20.25V9.75C2 8.784 2.784 8 3.75 8h1.5a1.75 1.75 0 011.746 1.633 1.85 1.85 0 00.523-.131c.961-.415 2.774-1.534 2.774-4.2V4.249c0-1.22 1.002-2.298 2.303-2.206zM7 18.918c1.059.064 2.079.355 3.118.652l.568.16c1.406.39 3.006.77 5.142.77 2.277 0 3.004-.274 3.39-.781.216-.283.388-.718.54-1.448.136-.65.242-1.45.379-2.477l.05-.384c.32-2.4.253-3.795-.102-4.575-.16-.352-.375-.568-.66-.711-.305-.153-.74-.245-1.365-.245h-2.37c-.681 0-1.293-.57-1.211-1.328.026-.243.065-.537.105-.834l.07-.527c.06-.482.105-.921.105-1.25 0-1.125-.213-1.617-.473-1.873-.275-.27-.774-.455-1.795-.528-.351-.024-.698.274-.698.71v1.053c0 3.55-2.488 5.063-3.68 5.577-.372.16-.754.232-1.113.26zM3.75 20.5h1.5a.25.25 0 00.25-.25V9.75a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.596 2.043c1.075.076 2.059.281 2.743.956.698.688.92 1.696.92 2.941 0 .432-.057.955-.117 1.438-.026.2-.051.392-.076.572l-.056.429h2.05c.752 0 1.446.108 2.036.404.612.306 1.062.787 1.355 1.431.551 1.214.542 3.008.223 5.394l-.051.39c-.134 1.01-.248 1.872-.396 2.58-.166.795-.394 1.496-.816 2.05-.89 1.168-2.395 1.372-4.583 1.372-2.331 0-4.08-.418-5.544-.824l-.602-.17c-1.023-.29-1.852-.526-2.69-.586A1.75 1.75 0 015.25 22h-1.5A1.75 1.75 0 012 20.25V9.75C2 8.784 2.784 8 3.75 8h1.5a1.75 1.75 0 011.746 1.633 1.85 1.85 0 00.523-.131c.961-.415 2.774-1.534 2.774-4.2V4.249c0-1.22 1.002-2.298 2.303-2.206zM7 18.918c1.059.064 2.079.355 3.118.652l.568.16c1.406.39 3.006.77 5.142.77 2.277 0 3.004-.274 3.39-.781.216-.283.388-.718.54-1.448.136-.65.242-1.45.379-2.477l.05-.384c.32-2.4.253-3.795-.102-4.575-.16-.352-.375-.568-.66-.711-.305-.153-.74-.245-1.365-.245h-2.37c-.681 0-1.293-.57-1.211-1.328.026-.243.065-.537.105-.834l.07-.527c.06-.482.105-.921.105-1.25 0-1.125-.213-1.617-.473-1.873-.275-.27-.774-.455-1.795-.528-.351-.024-.698.274-.698.71v1.053c0 3.55-2.488 5.063-3.68 5.577-.372.16-.754.232-1.113.26zM3.75 20.5h1.5a.25.25 0 00.25-.25V9.75a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var tools = {
	name: "tools",
	keywords: [
		"screwdriver",
		"wrench",
		"settings"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.433 2.304A4.492 4.492 0 003.5 6c0 1.598.832 3.002 2.09 3.802.518.328.929.923.902 1.64v.008l-.164 3.337a.75.75 0 11-1.498-.073l.163-3.33c.002-.085-.05-.216-.207-.316A5.996 5.996 0 012 6a5.993 5.993 0 012.567-4.92 1.482 1.482 0 011.673-.04c.462.296.76.827.76 1.423v2.82c0 .082.041.16.11.206l.75.51a.25.25 0 00.28 0l.75-.51A.249.249 0 009 5.282V2.463c0-.596.298-1.127.76-1.423a1.482 1.482 0 011.673.04A5.993 5.993 0 0114 6a5.996 5.996 0 01-2.786 5.068c-.157.1-.209.23-.207.315l.163 3.33a.752.752 0 01-1.094.714.75.75 0 01-.404-.64l-.164-3.345c-.027-.717.384-1.312.902-1.64A4.495 4.495 0 0012.5 6a4.492 4.492 0 00-1.933-3.696c-.024.017-.067.067-.067.16v2.818a1.75 1.75 0 01-.767 1.448l-.75.51a1.75 1.75 0 01-1.966 0l-.75-.51A1.75 1.75 0 015.5 5.282V2.463c0-.092-.043-.142-.067-.159z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.433 2.304A4.492 4.492 0 003.5 6c0 1.598.832 3.002 2.09 3.802.518.328.929.923.902 1.64v.008l-.164 3.337a.75.75 0 11-1.498-.073l.163-3.33c.002-.085-.05-.216-.207-.316A5.996 5.996 0 012 6a5.993 5.993 0 012.567-4.92 1.482 1.482 0 011.673-.04c.462.296.76.827.76 1.423v2.82c0 .082.041.16.11.206l.75.51a.25.25 0 00.28 0l.75-.51A.249.249 0 009 5.282V2.463c0-.596.298-1.127.76-1.423a1.482 1.482 0 011.673.04A5.993 5.993 0 0114 6a5.996 5.996 0 01-2.786 5.068c-.157.1-.209.23-.207.315l.163 3.33a.752.752 0 01-1.094.714.75.75 0 01-.404-.64l-.164-3.345c-.027-.717.384-1.312.902-1.64A4.495 4.495 0 0012.5 6a4.492 4.492 0 00-1.933-3.696c-.024.017-.067.067-.067.16v2.818a1.75 1.75 0 01-.767 1.448l-.75.51a1.75 1.75 0 01-1.966 0l-.75-.51A1.75 1.75 0 015.5 5.282V2.463c0-.092-.043-.142-.067-.159z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.875 2.292a.114.114 0 00-.032.018A7.239 7.239 0 004.75 8.25a7.248 7.248 0 003.654 6.297c.57.327.982.955.941 1.682v.002l-.317 6.058a.75.75 0 11-1.498-.078l.317-6.062v-.004c.006-.09-.047-.215-.188-.296A8.749 8.749 0 013.25 8.25a8.738 8.738 0 013.732-7.169 1.547 1.547 0 011.709-.064c.484.292.809.835.809 1.46v4.714a.25.25 0 00.119.213l2.25 1.385c.08.05.182.05.262 0l2.25-1.385a.25.25 0 00.119-.213V2.478c0-.626.325-1.169.81-1.461a1.547 1.547 0 011.708.064 8.741 8.741 0 013.732 7.17 8.747 8.747 0 01-4.41 7.598c-.14.081-.193.206-.188.296v.004l.318 6.062a.75.75 0 11-1.498.078l-.317-6.058v-.002c-.041-.727.37-1.355.94-1.682A7.247 7.247 0 0019.25 8.25a7.239 7.239 0 00-3.093-5.94.114.114 0 00-.032-.018l-.01-.001c-.003 0-.014 0-.031.01-.036.022-.084.079-.084.177V7.19c0 .608-.315 1.172-.833 1.49l-2.25 1.385a1.75 1.75 0 01-1.834 0l-2.25-1.384A1.752 1.752 0 018 7.192V2.477c0-.098-.048-.155-.084-.176a.068.068 0 00-.031-.011l-.01.001z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.875 2.292a.114.114 0 00-.032.018A7.239 7.239 0 004.75 8.25a7.248 7.248 0 003.654 6.297c.57.327.982.955.941 1.682v.002l-.317 6.058a.75.75 0 11-1.498-.078l.317-6.062v-.004c.006-.09-.047-.215-.188-.296A8.749 8.749 0 013.25 8.25a8.738 8.738 0 013.732-7.169 1.547 1.547 0 011.709-.064c.484.292.809.835.809 1.46v4.714a.25.25 0 00.119.213l2.25 1.385c.08.05.182.05.262 0l2.25-1.385a.25.25 0 00.119-.213V2.478c0-.626.325-1.169.81-1.461a1.547 1.547 0 011.708.064 8.741 8.741 0 013.732 7.17 8.747 8.747 0 01-4.41 7.598c-.14.081-.193.206-.188.296v.004l.318 6.062a.75.75 0 11-1.498.078l-.317-6.058v-.002c-.041-.727.37-1.355.94-1.682A7.247 7.247 0 0019.25 8.25a7.239 7.239 0 00-3.093-5.94.114.114 0 00-.032-.018l-.01-.001c-.003 0-.014 0-.031.01-.036.022-.084.079-.084.177V7.19c0 .608-.315 1.172-.833 1.49l-2.25 1.385a1.75 1.75 0 01-1.834 0l-2.25-1.384A1.752 1.752 0 018 7.192V2.477c0-.098-.048-.155-.084-.176a.068.068 0 00-.031-.011l-.01.001z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var trash = {
	name: "trash",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0V3h5V1.75a.25.25 0 00-.25-.25h-4.5a.25.25 0 00-.25.25zM4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z\"></path><path d=\"M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0V3h5V1.75a.25.25 0 00-.25-.25h-4.5a.25.25 0 00-.25.25zM4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var trophy = {
	name: "trophy",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.217 6.962A3.75 3.75 0 010 3.25v-.5C0 1.784.784 1 1.75 1h1.356c.228-.585.796-1 1.462-1h6.864c.647 0 1.227.397 1.462 1h1.356c.966 0 1.75.784 1.75 1.75v.5a3.75 3.75 0 01-3.217 3.712 5.014 5.014 0 01-2.771 3.117l.144 1.446c.005.05.03.12.114.204.086.087.217.17.373.227.283.103.618.274.89.568.285.31.467.723.467 1.226v.75h1.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H4v-.75c0-.503.182-.916.468-1.226.27-.294.606-.465.889-.568.139-.048.266-.126.373-.227.084-.085.109-.153.114-.204l.144-1.446a5.015 5.015 0 01-2.77-3.117zM4.5 1.568V5.5a3.5 3.5 0 107 0V1.568a.068.068 0 00-.068-.068H4.568a.068.068 0 00-.068.068zm2.957 8.902l-.12 1.204c-.093.925-.858 1.47-1.467 1.691a.766.766 0 00-.3.176c-.037.04-.07.093-.07.21v.75h5v-.75c0-.117-.033-.17-.07-.21a.766.766 0 00-.3-.176c-.609-.221-1.374-.766-1.466-1.69l-.12-1.204a5.064 5.064 0 01-1.087 0zM13 2.5v2.872a2.25 2.25 0 001.5-2.122v-.5a.25.25 0 00-.25-.25H13zm-10 0H1.75a.25.25 0 00-.25.25v.5c0 .98.626 1.813 1.5 2.122z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.217 6.962A3.75 3.75 0 010 3.25v-.5C0 1.784.784 1 1.75 1h1.356c.228-.585.796-1 1.462-1h6.864c.647 0 1.227.397 1.462 1h1.356c.966 0 1.75.784 1.75 1.75v.5a3.75 3.75 0 01-3.217 3.712 5.014 5.014 0 01-2.771 3.117l.144 1.446c.005.05.03.12.114.204.086.087.217.17.373.227.283.103.618.274.89.568.285.31.467.723.467 1.226v.75h1.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H4v-.75c0-.503.182-.916.468-1.226.27-.294.606-.465.889-.568.139-.048.266-.126.373-.227.084-.085.109-.153.114-.204l.144-1.446a5.015 5.015 0 01-2.77-3.117zM4.5 1.568V5.5a3.5 3.5 0 107 0V1.568a.068.068 0 00-.068-.068H4.568a.068.068 0 00-.068.068zm2.957 8.902l-.12 1.204c-.093.925-.858 1.47-1.467 1.691a.766.766 0 00-.3.176c-.037.04-.07.093-.07.21v.75h5v-.75c0-.117-.033-.17-.07-.21a.766.766 0 00-.3-.176c-.609-.221-1.374-.766-1.466-1.69l-.12-1.204a5.064 5.064 0 01-1.087 0zM13 2.5v2.872a2.25 2.25 0 001.5-2.122v-.5a.25.25 0 00-.25-.25H13zm-10 0H1.75a.25.25 0 00-.25.25v.5c0 .98.626 1.813 1.5 2.122z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.09 10.121A5.251 5.251 0 011 5V3.75C1 2.784 1.784 2 2.75 2h2.364c.236-.586.81-1 1.48-1h10.812c.67 0 1.244.414 1.48 1h2.489c.966 0 1.75.784 1.75 1.75V5a5.252 5.252 0 01-4.219 5.149 7.01 7.01 0 01-4.644 5.478l.231 3.003a.5.5 0 00.034.031c.079.065.303.203.836.282.838.124 1.637.81 1.637 1.807v.75h2.25a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H7v-.75c0-.996.8-1.683 1.637-1.807.533-.08.757-.217.836-.282a.5.5 0 00.034-.031l.231-3.003A7.012 7.012 0 015.09 10.12zM6.5 2.594V9a5.5 5.5 0 1011 0V2.594a.094.094 0 00-.094-.094H6.594a.094.094 0 00-.094.094zm4.717 13.363l-.215 2.793-.001.021-.003.043a1.212 1.212 0 01-.022.147c-.05.237-.194.567-.553.86-.348.286-.853.5-1.566.605a.478.478 0 00-.274.136.264.264 0 00-.083.188v.75h7v-.75a.264.264 0 00-.083-.188.478.478 0 00-.274-.136c-.713-.105-1.218-.32-1.567-.604-.358-.294-.502-.624-.552-.86a1.22 1.22 0 01-.025-.19l-.001-.022-.215-2.793a7.069 7.069 0 01-1.566 0zM19 8.578A3.751 3.751 0 0021.625 5V3.75a.25.25 0 00-.25-.25H19zM5 3.5H2.75a.25.25 0 00-.25.25V5A3.752 3.752 0 005 8.537z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.09 10.121A5.251 5.251 0 011 5V3.75C1 2.784 1.784 2 2.75 2h2.364c.236-.586.81-1 1.48-1h10.812c.67 0 1.244.414 1.48 1h2.489c.966 0 1.75.784 1.75 1.75V5a5.252 5.252 0 01-4.219 5.149 7.01 7.01 0 01-4.644 5.478l.231 3.003a.5.5 0 00.034.031c.079.065.303.203.836.282.838.124 1.637.81 1.637 1.807v.75h2.25a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H7v-.75c0-.996.8-1.683 1.637-1.807.533-.08.757-.217.836-.282a.5.5 0 00.034-.031l.231-3.003A7.012 7.012 0 015.09 10.12zM6.5 2.594V9a5.5 5.5 0 1011 0V2.594a.094.094 0 00-.094-.094H6.594a.094.094 0 00-.094.094zm4.717 13.363l-.215 2.793-.001.021-.003.043a1.212 1.212 0 01-.022.147c-.05.237-.194.567-.553.86-.348.286-.853.5-1.566.605a.478.478 0 00-.274.136.264.264 0 00-.083.188v.75h7v-.75a.264.264 0 00-.083-.188.478.478 0 00-.274-.136c-.713-.105-1.218-.32-1.567-.604-.358-.294-.502-.624-.552-.86a1.22 1.22 0 01-.025-.19l-.001-.022-.215-2.793a7.069 7.069 0 01-1.566 0zM19 8.578A3.751 3.751 0 0021.625 5V3.75a.25.25 0 00-.25-.25H19zM5 3.5H2.75a.25.25 0 00-.25.25V5A3.752 3.752 0 005 8.537z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var typography = {
	name: "typography",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.71 10H2.332l-.874 2.498a.75.75 0 01-1.415-.496l3.39-9.688a1.217 1.217 0 012.302.018l3.227 9.681a.75.75 0 01-1.423.474zm3.13-4.358C10.53 4.374 11.87 4 13 4c1.5 0 3 .939 3 2.601v5.649a.75.75 0 01-1.448.275C13.995 12.82 13.3 13 12.5 13c-.77 0-1.514-.231-2.078-.709-.577-.488-.922-1.199-.922-2.041 0-.694.265-1.411.887-1.944C11 7.78 11.88 7.5 13 7.5h1.5v-.899c0-.54-.5-1.101-1.5-1.101-.869 0-1.528.282-1.84.858a.75.75 0 11-1.32-.716zM6.21 8.5L4.574 3.594 2.857 8.5zm8.29.5H13c-.881 0-1.375.22-1.637.444-.253.217-.363.5-.363.806 0 .408.155.697.39.896.249.21.63.354 1.11.354.732 0 1.26-.209 1.588-.449.35-.257.412-.495.412-.551z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.71 10H2.332l-.874 2.498a.75.75 0 01-1.415-.496l3.39-9.688a1.217 1.217 0 012.302.018l3.227 9.681a.75.75 0 01-1.423.474zm3.13-4.358C10.53 4.374 11.87 4 13 4c1.5 0 3 .939 3 2.601v5.649a.75.75 0 01-1.448.275C13.995 12.82 13.3 13 12.5 13c-.77 0-1.514-.231-2.078-.709-.577-.488-.922-1.199-.922-2.041 0-.694.265-1.411.887-1.944C11 7.78 11.88 7.5 13 7.5h1.5v-.899c0-.54-.5-1.101-1.5-1.101-.869 0-1.528.282-1.84.858a.75.75 0 11-1.32-.716zM6.21 8.5L4.574 3.594 2.857 8.5zm8.29.5H13c-.881 0-1.375.22-1.637.444-.253.217-.363.5-.363.806 0 .408.155.697.39.896.249.21.63.354 1.11.354.732 0 1.26-.209 1.588-.449.35-.257.412-.495.412-.551z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.414 15H3.586l-1.631 4.505a.75.75 0 11-1.41-.51l5.08-14.03a1.463 1.463 0 012.75 0l5.08 14.03a.75.75 0 11-1.411.51zm4.532-5.098c.913-1.683 2.703-2.205 4.284-2.205 1.047 0 2.084.312 2.878.885.801.577 1.392 1.455 1.392 2.548v8.12a.75.75 0 01-1.5 0v-.06l-.044.025c-.893.52-2.096.785-3.451.785-1.051 0-2.048-.315-2.795-.948-.76-.643-1.217-1.578-1.217-2.702 0-.919.349-1.861 1.168-2.563.81-.694 2-1.087 3.569-1.087H22v-1.57c0-.503-.263-.967-.769-1.332-.513-.37-1.235-.6-2.001-.6-1.319 0-2.429.43-2.966 1.42a.75.75 0 01-1.318-.716zM9.87 13.5L7 5.572 4.13 13.5zm12.13.7h-2.77c-1.331 0-2.134.333-2.593.726a1.822 1.822 0 00-.644 1.424c0 .689.267 1.203.686 1.557.43.365 1.065.593 1.826.593 1.183 0 2.102-.235 2.697-.581.582-.34.798-.74.798-1.134z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.414 15H3.586l-1.631 4.505a.75.75 0 11-1.41-.51l5.08-14.03a1.463 1.463 0 012.75 0l5.08 14.03a.75.75 0 11-1.411.51zm4.532-5.098c.913-1.683 2.703-2.205 4.284-2.205 1.047 0 2.084.312 2.878.885.801.577 1.392 1.455 1.392 2.548v8.12a.75.75 0 01-1.5 0v-.06l-.044.025c-.893.52-2.096.785-3.451.785-1.051 0-2.048-.315-2.795-.948-.76-.643-1.217-1.578-1.217-2.702 0-.919.349-1.861 1.168-2.563.81-.694 2-1.087 3.569-1.087H22v-1.57c0-.503-.263-.967-.769-1.332-.513-.37-1.235-.6-2.001-.6-1.319 0-2.429.43-2.966 1.42a.75.75 0 01-1.318-.716zM9.87 13.5L7 5.572 4.13 13.5zm12.13.7h-2.77c-1.331 0-2.134.333-2.593.726a1.822 1.822 0 00-.644 1.424c0 .689.267 1.203.686 1.557.43.365 1.065.593 1.826.593 1.183 0 2.102-.235 2.697-.581.582-.34.798-.74.798-1.134z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unfold = {
	name: "unfold",
	keywords: [
		"expand",
		"open",
		"reveal"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.177.677l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25a.75.75 0 01-1.5 0V4H5.104a.25.25 0 01-.177-.427L7.823.677a.25.25 0 01.354 0zM7.25 10.75a.75.75 0 011.5 0V12h2.146a.25.25 0 01.177.427l-2.896 2.896a.25.25 0 01-.354 0l-2.896-2.896A.25.25 0 015.104 12H7.25v-1.25zm-5-2a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.177.677l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25a.75.75 0 01-1.5 0V4H5.104a.25.25 0 01-.177-.427L7.823.677a.25.25 0 01.354 0zM7.25 10.75a.75.75 0 011.5 0V12h2.146a.25.25 0 01.177.427l-2.896 2.896a.25.25 0 01-.354 0l-2.896-2.896A.25.25 0 015.104 12H7.25v-1.25zm-5-2a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 23a.749.749 0 01-.53-.22l-3.25-3.25a.749.749 0 01.326-1.275.749.749 0 01.734.215L12 21.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734l-3.25 3.25A.749.749 0 0112 23z\"></path><path d=\"M11.47 1.22a.75.75 0 011.06 0l3.25 3.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L12 2.81 9.28 5.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zM12 22.25a.75.75 0 01-.75-.75v-5.75a.75.75 0 011.5 0v5.75a.75.75 0 01-.75.75zM2.75 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z\"></path><path d=\"M12 1.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6A.75.75 0 0112 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 23a.749.749 0 01-.53-.22l-3.25-3.25a.749.749 0 01.326-1.275.749.749 0 01.734.215L12 21.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734l-3.25 3.25A.749.749 0 0112 23z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.47 1.22a.75.75 0 011.06 0l3.25 3.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L12 2.81 9.28 5.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zM12 22.25a.75.75 0 01-.75-.75v-5.75a.75.75 0 011.5 0v5.75a.75.75 0 01-.75.75zM2.75 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6A.75.75 0 0112 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unlink = {
	name: "unlink",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M12.914 5.914a2 2 0 00-2.828-2.828l-.837.837a.75.75 0 11-1.06-1.061l.836-.837a3.5 3.5 0 114.95 4.95l-.195.194a.75.75 0 01-1.06-1.06l.194-.195zm-1.87 3.482a.759.759 0 01-.07.079c-.63.63-1.468 1.108-2.343 1.263-.89.159-1.86-.017-2.606-.763a.75.75 0 111.06-1.06c.329.327.767.438 1.284.347.493-.088 1.018-.36 1.445-.752l-1.247-.897a.709.709 0 01-.01-.008l-.295-.212c-.94-.597-1.984-.499-2.676.193l-2.5 2.5a2 2 0 102.828 2.828l.837-.836a.75.75 0 011.06 1.06l-.836.837a3.5 3.5 0 01-4.95-4.95l2.5-2.5a3.472 3.472 0 011.354-.848L2.312 3.109a.75.75 0 01.876-1.218l5.93 4.27c.115.074.226.155.335.24l6.235 4.49a.75.75 0 01-.876 1.218l-3.768-2.713z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.914 5.914a2 2 0 00-2.828-2.828l-.837.837a.75.75 0 11-1.06-1.061l.836-.837a3.5 3.5 0 114.95 4.95l-.195.194a.75.75 0 01-1.06-1.06l.194-.195zm-1.87 3.482a.759.759 0 01-.07.079c-.63.63-1.468 1.108-2.343 1.263-.89.159-1.86-.017-2.606-.763a.75.75 0 111.06-1.06c.329.327.767.438 1.284.347.493-.088 1.018-.36 1.445-.752l-1.247-.897a.709.709 0 01-.01-.008l-.295-.212c-.94-.597-1.984-.499-2.676.193l-2.5 2.5a2 2 0 102.828 2.828l.837-.836a.75.75 0 011.06 1.06l-.836.837a3.5 3.5 0 01-4.95-4.95l2.5-2.5a3.472 3.472 0 011.354-.848L2.312 3.109a.75.75 0 01.876-1.218l5.93 4.27c.115.074.226.155.335.24l6.235 4.49a.75.75 0 01-.876 1.218l-3.768-2.713z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20.347 3.653a3.936 3.936 0 00-5.567 0l-1.75 1.75a.75.75 0 01-1.06-1.06l1.75-1.75a5.436 5.436 0 017.688 7.687l-1.564 1.564a.75.75 0 01-1.06-1.06l1.563-1.564a3.936 3.936 0 000-5.567zM9.786 12.369a.75.75 0 011.053.125c.096.122.2.24.314.353 1.348 1.348 3.386 1.587 4.89.658l-3.922-2.858a.745.745 0 01-.057-.037c-1.419-1.013-3.454-.787-4.784.543L3.653 14.78a3.936 3.936 0 005.567 5.567l3-3a.75.75 0 111.06 1.06l-3 3a5.436 5.436 0 11-7.688-7.687l3.628-3.628a5.517 5.517 0 013.014-1.547l-7.05-5.136a.75.75 0 01.883-1.213l20.25 14.75a.75.75 0 01-.884 1.213l-5.109-3.722c-2.155 1.709-5.278 1.425-7.232-.53a5.491 5.491 0 01-.431-.485.75.75 0 01.125-1.053z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20.347 3.653a3.936 3.936 0 00-5.567 0l-1.75 1.75a.75.75 0 01-1.06-1.06l1.75-1.75a5.436 5.436 0 017.688 7.687l-1.564 1.564a.75.75 0 01-1.06-1.06l1.563-1.564a3.936 3.936 0 000-5.567zM9.786 12.369a.75.75 0 011.053.125c.096.122.2.24.314.353 1.348 1.348 3.386 1.587 4.89.658l-3.922-2.858a.745.745 0 01-.057-.037c-1.419-1.013-3.454-.787-4.784.543L3.653 14.78a3.936 3.936 0 005.567 5.567l3-3a.75.75 0 111.06 1.06l-3 3a5.436 5.436 0 11-7.688-7.687l3.628-3.628a5.517 5.517 0 013.014-1.547l-7.05-5.136a.75.75 0 01.883-1.213l20.25 14.75a.75.75 0 01-.884 1.213l-5.109-3.722c-2.155 1.709-5.278 1.425-7.232-.53a5.491 5.491 0 01-.431-.485.75.75 0 01.125-1.053z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unlock = {
	name: "unlock",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.5 4v2h7A1.5 1.5 0 0114 7.5v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5v-6A1.5 1.5 0 013.499 6H4V4a4 4 0 017.371-2.154.75.75 0 01-1.264.808A2.5 2.5 0 005.5 4zm-2 3.5v6h9v-6h-9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.5 4v2h7A1.5 1.5 0 0114 7.5v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5v-6A1.5 1.5 0 013.499 6H4V4a4 4 0 017.371-2.154.75.75 0 01-1.264.808A2.5 2.5 0 005.5 4zm-2 3.5v6h9v-6h-9z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.5 7.25V9h11a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9H6V7.25C6 3.845 8.503 1 12 1c2.792 0 4.971 1.825 5.718 4.31a.75.75 0 11-1.436.432C15.71 3.84 14.079 2.5 12 2.5c-2.578 0-4.5 2.08-4.5 4.75zm-3 4.25v8a1 1 0 001 1h13a1 1 0 001-1v-8a1 1 0 00-1-1h-13a1 1 0 00-1 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.5 7.25V9h11a2.5 2.5 0 012.5 2.5v8a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 19.5v-8A2.5 2.5 0 015.5 9H6V7.25C6 3.845 8.503 1 12 1c2.792 0 4.971 1.825 5.718 4.31a.75.75 0 11-1.436.432C15.71 3.84 14.079 2.5 12 2.5c-2.578 0-4.5 2.08-4.5 4.75zm-3 4.25v8a1 1 0 001 1h13a1 1 0 001-1v-8a1 1 0 00-1-1h-13a1 1 0 00-1 1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unmute = {
	name: "unmute",
	keywords: [
		"loud",
		"volume",
		"audio",
		"sound",
		"play"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.563 2.069A.75.75 0 018 2.75v10.5a.751.751 0 01-1.238.57L3.472 11H1.75A1.75 1.75 0 010 9.25v-2.5C0 5.784.784 5 1.75 5h1.723l3.289-2.82a.75.75 0 01.801-.111zM6.5 4.38L4.238 6.319a.748.748 0 01-.488.181h-2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2c.179 0 .352.064.488.18L6.5 11.62zm6.096-2.038a.75.75 0 011.06 0 8 8 0 010 11.314.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042 6.5 6.5 0 000-9.193.75.75 0 010-1.06zm-1.06 2.121l-.001.001a5 5 0 010 7.07.749.749 0 01-1.275-.326.749.749 0 01.215-.734 3.5 3.5 0 000-4.95.75.75 0 111.061-1.061z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.563 2.069A.75.75 0 018 2.75v10.5a.751.751 0 01-1.238.57L3.472 11H1.75A1.75 1.75 0 010 9.25v-2.5C0 5.784.784 5 1.75 5h1.723l3.289-2.82a.75.75 0 01.801-.111zM6.5 4.38L4.238 6.319a.748.748 0 01-.488.181h-2a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h2c.179 0 .352.064.488.18L6.5 11.62zm6.096-2.038a.75.75 0 011.06 0 8 8 0 010 11.314.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042 6.5 6.5 0 000-9.193.75.75 0 010-1.06zm-1.06 2.121l-.001.001a5 5 0 010 7.07.749.749 0 01-1.275-.326.749.749 0 01.215-.734 3.5 3.5 0 000-4.95.75.75 0 111.061-1.061z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.752.752 0 01.808-.13zM10.5 5.445l-4.245 3.86a.748.748 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86zm8.218-1.223a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z\"></path><path d=\"M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.752.752 0 01.808-.13zM10.5 5.445l-4.245 3.86a.748.748 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3c.187 0 .367.069.505.195l4.245 3.86zm8.218-1.223a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unread = {
	name: "unread",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.5 3.5H1.75a.25.25 0 00-.25.25v.32L8 7.88l3.02-1.77a.75.75 0 01.758 1.295L8.379 9.397a.75.75 0 01-.758 0L1.5 5.809v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4.5a.75.75 0 011.5 0v4.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25V4.513a.75.75 0 010-.027V3.75C0 2.784.784 2 1.75 2h8.75a.75.75 0 010 1.5z\"></path><path d=\"M14 6a2 2 0 100-4 2 2 0 000 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.5 3.5H1.75a.25.25 0 00-.25.25v.32L8 7.88l3.02-1.77a.75.75 0 01.758 1.295L8.379 9.397a.75.75 0 01-.758 0L1.5 5.809v6.441c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-4.5a.75.75 0 011.5 0v4.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25V4.513a.75.75 0 010-.027V3.75C0 2.784.784 2 1.75 2h8.75a.75.75 0 010 1.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14 6a2 2 0 100-4 2 2 0 000 4z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.75 4.5a.25.25 0 00-.25.25v.852l10.36 7a.25.25 0 00.28 0l5.69-3.845A.75.75 0 0118.67 10l-5.69 3.845c-.592.4-1.368.4-1.96 0L1.5 7.412V19.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3h15.5a.75.75 0 010 1.5H1.75z\"></path><path d=\"M24 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 4.5a.25.25 0 00-.25.25v.852l10.36 7a.25.25 0 00.28 0l5.69-3.845A.75.75 0 0118.67 10l-5.69 3.845c-.592.4-1.368.4-1.96 0L1.5 7.412V19.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3h15.5a.75.75 0 010 1.5H1.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M24 5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var unverified = {
	name: "unverified",
	keywords: [
		"insecure",
		"untrusted",
		"signed"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.415.52a2.677 2.677 0 013.17 0l.928.68c.153.113.33.186.518.215l1.138.175a2.678 2.678 0 012.241 2.24l.175 1.138c.029.187.102.365.215.518l.68.928a2.677 2.677 0 010 3.17l-.68.928a1.186 1.186 0 00-.215.518l-.175 1.138a2.678 2.678 0 01-2.241 2.241l-1.138.175a1.186 1.186 0 00-.518.215l-.928.68a2.677 2.677 0 01-3.17 0l-.928-.68a1.186 1.186 0 00-.518-.215L3.83 14.41a2.678 2.678 0 01-2.24-2.24l-.175-1.138a1.186 1.186 0 00-.215-.518l-.68-.928a2.677 2.677 0 010-3.17l.68-.928a1.17 1.17 0 00.215-.518l.175-1.14a2.678 2.678 0 012.24-2.24l1.138-.175c.187-.029.365-.102.518-.215l.928-.68zm2.282 1.209a1.18 1.18 0 00-1.394 0l-.928.68a2.67 2.67 0 01-1.18.489l-1.136.174a1.18 1.18 0 00-.987.987l-.174 1.137a2.67 2.67 0 01-.489 1.18l-.68.927c-.305.415-.305.98 0 1.394l.68.928c.256.348.423.752.489 1.18l.174 1.136c.078.51.478.909.987.987l1.137.174c.427.066.831.233 1.18.489l.927.68c.415.305.98.305 1.394 0l.928-.68a2.67 2.67 0 011.18-.489l1.136-.174c.51-.078.909-.478.987-.987l.174-1.137c.066-.427.233-.831.489-1.18l.68-.927c.305-.415.305-.98 0-1.394l-.68-.928a2.67 2.67 0 01-.489-1.18l-.174-1.136a1.18 1.18 0 00-.987-.987l-1.137-.174a2.67 2.67 0 01-1.18-.489zM6.92 6.085h.001a.75.75 0 01-1.342-.67c.169-.339.436-.701.849-.977C6.846 4.16 7.369 4 8 4a2.76 2.76 0 011.638.525c.502.377.862.965.862 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 00-.26.16.952.952 0 00-.276.245.75.75 0 01-1.248-.832c.184-.264.42-.489.692-.661.109-.073.22-.139.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 00.277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 00-.262-.525A1.27 1.27 0 008 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 00-.34.398zM9 11a1 1 0 11-2 0 1 1 0 012 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.415.52a2.677 2.677 0 013.17 0l.928.68c.153.113.33.186.518.215l1.138.175a2.678 2.678 0 012.241 2.24l.175 1.138c.029.187.102.365.215.518l.68.928a2.677 2.677 0 010 3.17l-.68.928a1.186 1.186 0 00-.215.518l-.175 1.138a2.678 2.678 0 01-2.241 2.241l-1.138.175a1.186 1.186 0 00-.518.215l-.928.68a2.677 2.677 0 01-3.17 0l-.928-.68a1.186 1.186 0 00-.518-.215L3.83 14.41a2.678 2.678 0 01-2.24-2.24l-.175-1.138a1.186 1.186 0 00-.215-.518l-.68-.928a2.677 2.677 0 010-3.17l.68-.928a1.17 1.17 0 00.215-.518l.175-1.14a2.678 2.678 0 012.24-2.24l1.138-.175c.187-.029.365-.102.518-.215l.928-.68zm2.282 1.209a1.18 1.18 0 00-1.394 0l-.928.68a2.67 2.67 0 01-1.18.489l-1.136.174a1.18 1.18 0 00-.987.987l-.174 1.137a2.67 2.67 0 01-.489 1.18l-.68.927c-.305.415-.305.98 0 1.394l.68.928c.256.348.423.752.489 1.18l.174 1.136c.078.51.478.909.987.987l1.137.174c.427.066.831.233 1.18.489l.927.68c.415.305.98.305 1.394 0l.928-.68a2.67 2.67 0 011.18-.489l1.136-.174c.51-.078.909-.478.987-.987l.174-1.137c.066-.427.233-.831.489-1.18l.68-.927c.305-.415.305-.98 0-1.394l-.68-.928a2.67 2.67 0 01-.489-1.18l-.174-1.136a1.18 1.18 0 00-.987-.987l-1.137-.174a2.67 2.67 0 01-1.18-.489zM6.92 6.085h.001a.75.75 0 01-1.342-.67c.169-.339.436-.701.849-.977C6.846 4.16 7.369 4 8 4a2.76 2.76 0 011.638.525c.502.377.862.965.862 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 00-.26.16.952.952 0 00-.276.245.75.75 0 01-1.248-.832c.184-.264.42-.489.692-.661.109-.073.22-.139.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 00.277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 00-.262-.525A1.27 1.27 0 008 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 00-.34.398zM9 11a1 1 0 11-2 0 1 1 0 012 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13 16.5a1 1 0 11-2 0 1 1 0 012 0zm-2.517-7.665c.112-.223.268-.424.488-.57C11.186 8.12 11.506 8 12 8c.384 0 .766.118 1.034.319a.953.953 0 01.403.806c0 .48-.218.81-.62 1.186a9.293 9.293 0 01-.409.354 19.8 19.8 0 00-.294.249c-.246.213-.524.474-.738.795l-.126.19V13.5a.75.75 0 001.5 0v-1.12c.09-.1.203-.208.347-.333.063-.055.14-.119.222-.187.166-.14.358-.3.52-.452.536-.5 1.098-1.2 1.098-2.283a2.45 2.45 0 00-1.003-2.006C13.37 6.695 12.658 6.5 12 6.5c-.756 0-1.373.191-1.861.517a2.944 2.944 0 00-.997 1.148.75.75 0 001.341.67z\"></path><path d=\"M9.864 1.2a3.61 3.61 0 014.272 0l1.375 1.01c.274.2.593.333.929.384l1.686.259a3.61 3.61 0 013.021 3.02l.259 1.687c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 010 4.272l-1.01 1.375a2.106 2.106 0 00-.384.929l-.259 1.686a3.61 3.61 0 01-3.02 3.021l-1.687.259a2.106 2.106 0 00-.929.384l-1.375 1.01a3.61 3.61 0 01-4.272 0l-1.375-1.01a2.106 2.106 0 00-.929-.384l-1.686-.259a3.61 3.61 0 01-3.021-3.02l-.259-1.687a2.106 2.106 0 00-.384-.929L1.2 14.136a3.61 3.61 0 010-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.686a3.61 3.61 0 013.02-3.021l1.687-.259c.336-.051.655-.183.929-.384zm3.384 1.209a2.11 2.11 0 00-2.496 0l-1.376 1.01a3.61 3.61 0 01-1.589.658l-1.686.258a2.111 2.111 0 00-1.766 1.766l-.258 1.686a3.614 3.614 0 01-.658 1.59l-1.01 1.375a2.11 2.11 0 000 2.496l1.01 1.376a3.61 3.61 0 01.658 1.589l.258 1.686a2.11 2.11 0 001.766 1.765l1.686.26a3.613 3.613 0 011.59.657l1.375 1.01a2.11 2.11 0 002.496 0l1.376-1.01a3.61 3.61 0 011.589-.658l1.686-.258a2.11 2.11 0 001.765-1.766l.26-1.686a3.613 3.613 0 01.657-1.59l1.01-1.375a2.11 2.11 0 000-2.496l-1.01-1.376a3.61 3.61 0 01-.658-1.589l-.258-1.686a2.111 2.111 0 00-1.766-1.766l-1.686-.258a3.614 3.614 0 01-1.59-.658z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13 16.5a1 1 0 11-2 0 1 1 0 012 0zm-2.517-7.665c.112-.223.268-.424.488-.57C11.186 8.12 11.506 8 12 8c.384 0 .766.118 1.034.319a.953.953 0 01.403.806c0 .48-.218.81-.62 1.186a9.293 9.293 0 01-.409.354 19.8 19.8 0 00-.294.249c-.246.213-.524.474-.738.795l-.126.19V13.5a.75.75 0 001.5 0v-1.12c.09-.1.203-.208.347-.333.063-.055.14-.119.222-.187.166-.14.358-.3.52-.452.536-.5 1.098-1.2 1.098-2.283a2.45 2.45 0 00-1.003-2.006C13.37 6.695 12.658 6.5 12 6.5c-.756 0-1.373.191-1.861.517a2.944 2.944 0 00-.997 1.148.75.75 0 001.341.67z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.864 1.2a3.61 3.61 0 014.272 0l1.375 1.01c.274.2.593.333.929.384l1.686.259a3.61 3.61 0 013.021 3.02l.259 1.687c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 010 4.272l-1.01 1.375a2.106 2.106 0 00-.384.929l-.259 1.686a3.61 3.61 0 01-3.02 3.021l-1.687.259a2.106 2.106 0 00-.929.384l-1.375 1.01a3.61 3.61 0 01-4.272 0l-1.375-1.01a2.106 2.106 0 00-.929-.384l-1.686-.259a3.61 3.61 0 01-3.021-3.02l-.259-1.687a2.106 2.106 0 00-.384-.929L1.2 14.136a3.61 3.61 0 010-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.686a3.61 3.61 0 013.02-3.021l1.687-.259c.336-.051.655-.183.929-.384zm3.384 1.209a2.11 2.11 0 00-2.496 0l-1.376 1.01a3.61 3.61 0 01-1.589.658l-1.686.258a2.111 2.111 0 00-1.766 1.766l-.258 1.686a3.614 3.614 0 01-.658 1.59l-1.01 1.375a2.11 2.11 0 000 2.496l1.01 1.376a3.61 3.61 0 01.658 1.589l.258 1.686a2.11 2.11 0 001.766 1.765l1.686.26a3.613 3.613 0 011.59.657l1.375 1.01a2.11 2.11 0 002.496 0l1.376-1.01a3.61 3.61 0 011.589-.658l1.686-.258a2.11 2.11 0 001.765-1.766l.26-1.686a3.613 3.613 0 01.657-1.59l1.01-1.375a2.11 2.11 0 000-2.496l-1.01-1.376a3.61 3.61 0 01-.658-1.589l-.258-1.686a2.111 2.111 0 00-1.766-1.766l-1.686-.258a3.614 3.614 0 01-1.59-.658z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var upload = {
	name: "upload",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.53 1.22l3.75 3.75a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8.75 3.56v6.69a.75.75 0 01-1.5 0V3.56L4.78 6.03a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75a.75.75 0 011.06 0zM3.75 13h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.53 1.22l3.75 3.75a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8.75 3.56v6.69a.75.75 0 01-1.5 0V3.56L4.78 6.03a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75a.75.75 0 011.06 0zM3.75 13h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.97 8.47l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12.5 4.56v12.19a.75.75 0 01-1.5 0V4.56L6.03 9.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zM4.75 22a.75.75 0 010-1.5h14.5a.75.75 0 010 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.97 8.47l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12.5 4.56v12.19a.75.75 0 01-1.5 0V4.56L6.03 9.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042zM4.75 22a.75.75 0 010-1.5h14.5a.75.75 0 010 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var verified = {
	name: "verified",
	keywords: [
		"trusted",
		"secure",
		"trustworthy",
		"signed"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.585.52l.929.68c.153.112.331.186.518.215l1.138.175a2.678 2.678 0 012.24 2.24l.174 1.139c.029.187.103.365.215.518l.68.928a2.677 2.677 0 010 3.17l-.68.928a1.174 1.174 0 00-.215.518l-.175 1.138a2.678 2.678 0 01-2.241 2.241l-1.138.175a1.17 1.17 0 00-.518.215l-.928.68a2.677 2.677 0 01-3.17 0l-.928-.68a1.174 1.174 0 00-.518-.215L3.83 14.41a2.678 2.678 0 01-2.24-2.24l-.175-1.138a1.17 1.17 0 00-.215-.518l-.68-.928a2.677 2.677 0 010-3.17l.68-.928c.112-.153.186-.331.215-.518l.175-1.14a2.678 2.678 0 012.24-2.24l1.139-.175c.187-.029.365-.103.518-.215l.928-.68a2.677 2.677 0 013.17 0zM7.303 1.728l-.927.68a2.67 2.67 0 01-1.18.489l-1.137.174a1.179 1.179 0 00-.987.987l-.174 1.136a2.677 2.677 0 01-.489 1.18l-.68.928a1.18 1.18 0 000 1.394l.68.927c.256.348.424.753.489 1.18l.174 1.137c.078.509.478.909.987.987l1.136.174a2.67 2.67 0 011.18.489l.928.68c.414.305.979.305 1.394 0l.927-.68a2.67 2.67 0 011.18-.489l1.137-.174a1.18 1.18 0 00.987-.987l.174-1.136a2.67 2.67 0 01.489-1.18l.68-.928a1.176 1.176 0 000-1.394l-.68-.927a2.686 2.686 0 01-.489-1.18l-.174-1.137a1.179 1.179 0 00-.987-.987l-1.136-.174a2.677 2.677 0 01-1.18-.489l-.928-.68a1.176 1.176 0 00-1.394 0zM11.28 6.78l-3.75 3.75a.75.75 0 01-1.06 0L4.72 8.78a.751.751 0 01.018-1.042.751.751 0 011.042-.018L7 8.94l3.22-3.22a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.585.52l.929.68c.153.112.331.186.518.215l1.138.175a2.678 2.678 0 012.24 2.24l.174 1.139c.029.187.103.365.215.518l.68.928a2.677 2.677 0 010 3.17l-.68.928a1.174 1.174 0 00-.215.518l-.175 1.138a2.678 2.678 0 01-2.241 2.241l-1.138.175a1.17 1.17 0 00-.518.215l-.928.68a2.677 2.677 0 01-3.17 0l-.928-.68a1.174 1.174 0 00-.518-.215L3.83 14.41a2.678 2.678 0 01-2.24-2.24l-.175-1.138a1.17 1.17 0 00-.215-.518l-.68-.928a2.677 2.677 0 010-3.17l.68-.928c.112-.153.186-.331.215-.518l.175-1.14a2.678 2.678 0 012.24-2.24l1.139-.175c.187-.029.365-.103.518-.215l.928-.68a2.677 2.677 0 013.17 0zM7.303 1.728l-.927.68a2.67 2.67 0 01-1.18.489l-1.137.174a1.179 1.179 0 00-.987.987l-.174 1.136a2.677 2.677 0 01-.489 1.18l-.68.928a1.18 1.18 0 000 1.394l.68.927c.256.348.424.753.489 1.18l.174 1.137c.078.509.478.909.987.987l1.136.174a2.67 2.67 0 011.18.489l.928.68c.414.305.979.305 1.394 0l.927-.68a2.67 2.67 0 011.18-.489l1.137-.174a1.18 1.18 0 00.987-.987l.174-1.136a2.67 2.67 0 01.489-1.18l.68-.928a1.176 1.176 0 000-1.394l-.68-.927a2.686 2.686 0 01-.489-1.18l-.174-1.137a1.179 1.179 0 00-.987-.987l-1.136-.174a2.677 2.677 0 01-1.18-.489l-.928-.68a1.176 1.176 0 00-1.394 0zM11.28 6.78l-3.75 3.75a.75.75 0 01-1.06 0L4.72 8.78a.751.751 0 01.018-1.042.751.751 0 011.042-.018L7 8.94l3.22-3.22a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6z\"></path><path d=\"M14.136 1.2l1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 013.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 010 4.272l-1.01 1.375a2.106 2.106 0 00-.384.929l-.259 1.687a3.61 3.61 0 01-3.021 3.02l-1.686.259a2.106 2.106 0 00-.929.384l-1.375 1.01a3.61 3.61 0 01-4.272 0l-1.375-1.01a2.106 2.106 0 00-.929-.384l-1.687-.259a3.61 3.61 0 01-3.02-3.021l-.259-1.686a2.117 2.117 0 00-.384-.929L1.2 14.136a3.61 3.61 0 010-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 013.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 014.272 0zm-3.384 1.209l-1.375 1.01a3.614 3.614 0 01-1.59.658l-1.686.258a2.111 2.111 0 00-1.766 1.766l-.258 1.686a3.61 3.61 0 01-.658 1.589l-1.01 1.376a2.11 2.11 0 000 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 011.589.658l1.376 1.01a2.11 2.11 0 002.496 0l1.375-1.01a3.613 3.613 0 011.59-.657l1.686-.26a2.11 2.11 0 001.766-1.765l.258-1.686a3.61 3.61 0 01.658-1.589l1.01-1.376a2.11 2.11 0 000-2.496l-1.01-1.375a3.613 3.613 0 01-.657-1.59l-.26-1.686a2.11 2.11 0 00-1.765-1.766l-1.686-.258a3.61 3.61 0 01-1.589-.658l-1.376-1.01a2.11 2.11 0 00-2.496 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.03 9.78a.75.75 0 00-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6-6z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.136 1.2l1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 013.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 010 4.272l-1.01 1.375a2.106 2.106 0 00-.384.929l-.259 1.687a3.61 3.61 0 01-3.021 3.02l-1.686.259a2.106 2.106 0 00-.929.384l-1.375 1.01a3.61 3.61 0 01-4.272 0l-1.375-1.01a2.106 2.106 0 00-.929-.384l-1.687-.259a3.61 3.61 0 01-3.02-3.021l-.259-1.686a2.117 2.117 0 00-.384-.929L1.2 14.136a3.61 3.61 0 010-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 013.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 014.272 0zm-3.384 1.209l-1.375 1.01a3.614 3.614 0 01-1.59.658l-1.686.258a2.111 2.111 0 00-1.766 1.766l-.258 1.686a3.61 3.61 0 01-.658 1.589l-1.01 1.376a2.11 2.11 0 000 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 011.589.658l1.376 1.01a2.11 2.11 0 002.496 0l1.375-1.01a3.613 3.613 0 011.59-.657l1.686-.26a2.11 2.11 0 001.766-1.765l.258-1.686a3.61 3.61 0 01.658-1.589l1.01-1.376a2.11 2.11 0 000-2.496l-1.01-1.375a3.613 3.613 0 01-.657-1.59l-.26-1.686a2.11 2.11 0 00-1.765-1.766l-1.686-.258a3.61 3.61 0 01-1.589-.658l-1.376-1.01a2.11 2.11 0 00-2.496 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var versions = {
	name: "versions",
	keywords: [
		"history",
		"commits"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.75 14A1.75 1.75 0 016 12.25v-8.5C6 2.784 6.784 2 7.75 2h6.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14zm-.25-1.75c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-6.5a.25.25 0 00-.25.25zM4.9 3.508a.75.75 0 01-.274 1.025.249.249 0 00-.126.217v6.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.75 1.75 0 013 11.25v-6.5c0-.649.353-1.214.874-1.516a.75.75 0 011.025.274zM1.625 5.533h.001a.249.249 0 00-.126.217v4.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.748 1.748 0 010 10.25v-4.5a1.748 1.748 0 01.873-1.516.75.75 0 11.752 1.299z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.75 14A1.75 1.75 0 016 12.25v-8.5C6 2.784 6.784 2 7.75 2h6.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14zm-.25-1.75c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-6.5a.25.25 0 00-.25.25zM4.9 3.508a.75.75 0 01-.274 1.025.249.249 0 00-.126.217v6.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.75 1.75 0 013 11.25v-6.5c0-.649.353-1.214.874-1.516a.75.75 0 011.025.274zM1.625 5.533h.001a.249.249 0 00-.126.217v4.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.748 1.748 0 010 10.25v-4.5a1.748 1.748 0 01.873-1.516.75.75 0 11.752 1.299z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10 22a2 2 0 01-2-2V4a2 2 0 012-2h11a2 2 0 012 2v16a2 2 0 01-2 2zm-.5-2a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5H10a.5.5 0 00-.5.5zM6.17 4.165a.75.75 0 01-.335 1.006c-.228.114-.295.177-.315.201a.035.035 0 00-.008.016.423.423 0 00-.012.112v13c0 .07.008.102.012.112a.03.03 0 00.008.016c.02.024.087.087.315.201a.749.749 0 11-.67 1.342c-.272-.136-.58-.315-.81-.598C4.1 19.259 4 18.893 4 18.5v-13c0-.393.1-.759.355-1.073.23-.283.538-.462.81-.598a.75.75 0 011.006.336zM2.15 5.624a.75.75 0 01-.274 1.025c-.15.087-.257.17-.32.245C1.5 6.96 1.5 6.99 1.5 7v10c0 .01 0 .04.056.106.063.074.17.158.32.245a.75.75 0 01-.752 1.298C.73 18.421 0 17.907 0 17V7c0-.907.73-1.42 1.124-1.65a.75.75 0 011.025.274z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10 22a2 2 0 01-2-2V4a2 2 0 012-2h11a2 2 0 012 2v16a2 2 0 01-2 2zm-.5-2a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V4a.5.5 0 00-.5-.5H10a.5.5 0 00-.5.5zM6.17 4.165a.75.75 0 01-.335 1.006c-.228.114-.295.177-.315.201a.035.035 0 00-.008.016.423.423 0 00-.012.112v13c0 .07.008.102.012.112a.03.03 0 00.008.016c.02.024.087.087.315.201a.749.749 0 11-.67 1.342c-.272-.136-.58-.315-.81-.598C4.1 19.259 4 18.893 4 18.5v-13c0-.393.1-.759.355-1.073.23-.283.538-.462.81-.598a.75.75 0 011.006.336zM2.15 5.624a.75.75 0 01-.274 1.025c-.15.087-.257.17-.32.245C1.5 6.96 1.5 6.99 1.5 7v10c0 .01 0 .04.056.106.063.074.17.158.32.245a.75.75 0 01-.752 1.298C.73 18.421 0 17.907 0 17V7c0-.907.73-1.42 1.124-1.65a.75.75 0 011.025.274z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var video = {
	name: "video",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25z\"></path><path d=\"M6 10.559V5.442a.25.25 0 01.379-.215l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zm1.75-.25a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 10.559V5.442a.25.25 0 01.379-.215l4.264 2.559a.25.25 0 010 .428l-4.264 2.559A.25.25 0 016 10.559z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z\"></path><path d=\"M9 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842L9.77 16.005a.5.5 0 01-.77-.42z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 4.75C0 3.784.784 3 1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V4.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9 15.584V8.416a.5.5 0 01.77-.42l5.576 3.583a.5.5 0 010 .842L9.77 16.005a.5.5 0 01-.77-.42z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var webhook = {
	name: "webhook",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.5 4.25a2.25 2.25 0 014.5 0 .75.75 0 001.5 0 3.75 3.75 0 10-6.14 2.889l-2.272 4.258a.75.75 0 001.324.706L7 7.25a.75.75 0 00-.309-1.015A2.25 2.25 0 015.5 4.25z\"></path><path d=\"M7.364 3.607a.75.75 0 011.03.257l2.608 4.349a3.75 3.75 0 11-.628 6.785.75.75 0 01.752-1.299 2.25 2.25 0 10-.033-3.88.75.75 0 01-1.03-.256L7.107 4.636a.75.75 0 01.257-1.03z\"></path><path d=\"M2.9 8.776A.75.75 0 012.625 9.8 2.25 2.25 0 106 11.75a.75.75 0 01.75-.751h5.5a.75.75 0 010 1.5H7.425a3.751 3.751 0 11-5.55-3.998.75.75 0 011.024.274z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.5 4.25a2.25 2.25 0 014.5 0 .75.75 0 001.5 0 3.75 3.75 0 10-6.14 2.889l-2.272 4.258a.75.75 0 001.324.706L7 7.25a.75.75 0 00-.309-1.015A2.25 2.25 0 015.5 4.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.364 3.607a.75.75 0 011.03.257l2.608 4.349a3.75 3.75 0 11-.628 6.785.75.75 0 01.752-1.299 2.25 2.25 0 10-.033-3.88.75.75 0 01-1.03-.256L7.107 4.636a.75.75 0 01.257-1.03z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.9 8.776A.75.75 0 012.625 9.8 2.25 2.25 0 106 11.75a.75.75 0 01.75-.751h5.5a.75.75 0 010 1.5H7.425a3.751 3.751 0 11-5.55-3.998.75.75 0 011.024.274z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var workflow = {
	name: "workflow",
	keywords: [
		"workflow",
		"actions"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75C0 .784.784 0 1.75 0h3.5C6.216 0 7 .784 7 1.75v3.5A1.75 1.75 0 015.25 7H4v4a1 1 0 001 1h4v-1.25C9 9.784 9.784 9 10.75 9h3.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0114.25 16h-3.5A1.75 1.75 0 019 14.25v-.75H5A2.5 2.5 0 012.5 11V7h-.75A1.75 1.75 0 010 5.25zm1.75-.25a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25zm9 9a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h3.5C6.216 0 7 .784 7 1.75v3.5A1.75 1.75 0 015.25 7H4v4a1 1 0 001 1h4v-1.25C9 9.784 9.784 9 10.75 9h3.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0114.25 16h-3.5A1.75 1.75 0 019 14.25v-.75H5A2.5 2.5 0 012.5 11V7h-.75A1.75 1.75 0 010 5.25zm1.75-.25a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25zm9 9a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 3a2 2 0 012-2h6.5a2 2 0 012 2v6.5a2 2 0 01-2 2H7v4.063C7 16.355 7.644 17 8.438 17H12.5v-2.5a2 2 0 012-2H21a2 2 0 012 2V21a2 2 0 01-2 2h-6.5a2 2 0 01-2-2v-2.5H8.437A2.939 2.939 0 015.5 15.562V11.5H3a2 2 0 01-2-2zm2-.5a.5.5 0 00-.5.5v6.5a.5.5 0 00.5.5h6.5a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5zM14.5 14a.5.5 0 00-.5.5V21a.5.5 0 00.5.5H21a.5.5 0 00.5-.5v-6.5a.5.5 0 00-.5-.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 3a2 2 0 012-2h6.5a2 2 0 012 2v6.5a2 2 0 01-2 2H7v4.063C7 16.355 7.644 17 8.438 17H12.5v-2.5a2 2 0 012-2H21a2 2 0 012 2V21a2 2 0 01-2 2h-6.5a2 2 0 01-2-2v-2.5H8.437A2.939 2.939 0 015.5 15.562V11.5H3a2 2 0 01-2-2zm2-.5a.5.5 0 00-.5.5v6.5a.5.5 0 00.5.5h6.5a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5zM14.5 14a.5.5 0 00-.5.5V21a.5.5 0 00.5.5H21a.5.5 0 00.5-.5v-6.5a.5.5 0 00-.5-.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var x$1 = {
	name: "x",
	keywords: [
		"remove",
		"close",
		"delete"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l3.22 3.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-3.22 3.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 8 3.72 4.78a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l3.22 3.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-3.22 3.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.749.749 0 011.275.326.749.749 0 01-.215.734L13.06 12l5.22 5.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12 13.06l-5.22 5.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L10.94 12 5.72 6.78a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.749.749 0 011.275.326.749.749 0 01-.215.734L13.06 12l5.22 5.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L12 13.06l-5.22 5.22a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var zap = {
	name: "zap",
	keywords: [
		"electricity",
		"lightning",
		"props",
		"like",
		"star",
		"save"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.504.43a1.516 1.516 0 012.437 1.713L10.415 5.5h2.123c1.57 0 2.346 1.909 1.22 3.004l-7.34 7.142a1.249 1.249 0 01-.871.354h-.302a1.25 1.25 0 01-1.157-1.723L5.633 10.5H3.462c-1.57 0-2.346-1.909-1.22-3.004L9.503.429zm1.047 1.074L3.286 8.571A.25.25 0 003.462 9H6.75a.75.75 0 01.694 1.034l-1.713 4.188 6.982-6.793A.25.25 0 0012.538 7H9.25a.75.75 0 01-.683-1.06l2.008-4.418.003-.006a.036.036 0 00-.004-.009l-.006-.006-.008-.001c-.003 0-.006.002-.009.004z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.504.43a1.516 1.516 0 012.437 1.713L10.415 5.5h2.123c1.57 0 2.346 1.909 1.22 3.004l-7.34 7.142a1.249 1.249 0 01-.871.354h-.302a1.25 1.25 0 01-1.157-1.723L5.633 10.5H3.462c-1.57 0-2.346-1.909-1.22-3.004L9.503.429zm1.047 1.074L3.286 8.571A.25.25 0 003.462 9H6.75a.75.75 0 01.694 1.034l-1.713 4.188 6.982-6.793A.25.25 0 0012.538 7H9.25a.75.75 0 01-.683-1.06l2.008-4.418.003-.006a.036.036 0 00-.004-.009l-.006-.006-.008-.001c-.003 0-.006.002-.009.004z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.716 1.329a1.341 1.341 0 012.109 1.55L15.147 9h4.161c1.623 0 2.372 2.016 1.143 3.075L8.102 22.721a1.148 1.148 0 01-1.81-1.317L8.996 15H4.674c-1.619 0-2.37-2.008-1.148-3.07l12.19-10.6zm.452 1.595L4.51 13.061a.25.25 0 00.164.439h5.45a.749.749 0 01.692 1.041l-2.559 6.066 11.215-9.668a.25.25 0 00-.164-.439H14a.75.75 0 01-.687-1.05z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.716 1.329a1.341 1.341 0 012.109 1.55L15.147 9h4.161c1.623 0 2.372 2.016 1.143 3.075L8.102 22.721a1.148 1.148 0 01-1.81-1.317L8.996 15H4.674c-1.619 0-2.37-2.008-1.148-3.07l12.19-10.6zm.452 1.595L4.51 13.061a.25.25 0 00.164.439h5.45a.749.749 0 01.692 1.041l-2.559 6.066 11.215-9.668a.25.25 0 00-.164-.439H14a.75.75 0 01-.687-1.05z"
						},
						children: [
						]
					}
				]
			}
		}
	}
};
var require$$0 = {
	accessibility: accessibility,
	"accessibility-inset": {
	name: "accessibility-inset",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zm2 4a2 2 0 10-2.95 1.76 1.87 1.87 0 00-.32.24H3.75a.75.75 0 000 1.5h2.363l-.607 5.67a.75.75 0 101.49.16l.25-2.33h1.508l.25 2.33a.75.75 0 001.492-.16L9.888 7.5h2.362a.75.75 0 000-1.5H9.27a1.98 1.98 0 00-.32-.24A2 2 0 0010 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zm2 4a2 2 0 10-2.95 1.76 1.87 1.87 0 00-.32.24H3.75a.75.75 0 000 1.5h2.363l-.607 5.67a.75.75 0 101.49.16l.25-2.33h1.508l.25 2.33a.75.75 0 001.492-.16L9.888 7.5h2.362a.75.75 0 000-1.5H9.27a1.98 1.98 0 00-.32-.24A2 2 0 0010 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	alert: alert,
	"alert-fill": {
	name: "alert-fill",
	keywords: [
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 01-1.146 1.954H1.33A1.313 1.313 0 01.183 9.058zM7 7V3H5v4zm-1 3a1 1 0 100-2 1 1 0 000 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 01-1.146 1.954H1.33A1.313 1.313 0 01.183 9.058zM7 7V3H5v4zm-1 3a1 1 0 100-2 1 1 0 000 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"16": {
			width: 16,
			path: "<path d=\"M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575zM8 5a.75.75 0 00-.75.75v2.5a.75.75 0 001.5 0v-2.5A.75.75 0 008 5zm1 6a1 1 0 10-2 0 1 1 0 002 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575zM8 5a.75.75 0 00-.75.75v2.5a.75.75 0 001.5 0v-2.5A.75.75 0 008 5zm1 6a1 1 0 10-2 0 1 1 0 002 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752zM12 8.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 8.5zm1 9a1 1 0 10-2 0 1 1 0 002 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.836 3.244c.963-1.665 3.365-1.665 4.328 0l8.967 15.504c.963 1.667-.24 3.752-2.165 3.752H3.034c-1.926 0-3.128-2.085-2.165-3.752zM12 8.5a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 8.5zm1 9a1 1 0 10-2 0 1 1 0 002 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	apps: apps,
	archive: archive,
	"arrow-both": {
	name: "arrow-both",
	keywords: [
		"point",
		"direction",
		"left",
		"right"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.72 3.72a.751.751 0 011.042.018.751.751 0 01.018 1.042L2.56 7h10.88l-2.22-2.22a.751.751 0 01.018-1.042.751.751 0 011.042-.018l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l2.22-2.22H2.56l2.22 2.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-3.5-3.5a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.72 3.72a.751.751 0 011.042.018.751.751 0 01.018 1.042L2.56 7h10.88l-2.22-2.22a.751.751 0 01.018-1.042.751.751 0 011.042-.018l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l2.22-2.22H2.56l2.22 2.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-3.5-3.5a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.78 5.97a.75.75 0 00-1.06 0l-5.25 5.25a.75.75 0 000 1.06l5.25 5.25a.75.75 0 001.06-1.06L3.81 12.5h16.38l-3.97 3.97a.75.75 0 101.06 1.06l5.25-5.25a.75.75 0 000-1.06l-5.25-5.25a.75.75 0 10-1.06 1.06L20.19 11H3.81l3.97-3.97a.75.75 0 000-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.78 5.97a.75.75 0 00-1.06 0l-5.25 5.25a.75.75 0 000 1.06l5.25 5.25a.75.75 0 001.06-1.06L3.81 12.5h16.38l-3.97 3.97a.75.75 0 101.06 1.06l5.25-5.25a.75.75 0 000-1.06l-5.25-5.25a.75.75 0 10-1.06 1.06L20.19 11H3.81l3.97-3.97a.75.75 0 000-1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-down": {
	name: "arrow-down",
	keywords: [
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.03 8.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.47 9.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l2.97 2.97V3.75a.75.75 0 011.5 0v7.44l2.97-2.97a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.03 8.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.47 9.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l2.97 2.97V3.75a.75.75 0 011.5 0v7.44l2.97-2.97a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.97 13.22a.75.75 0 011.06 0L11 18.19V3.75a.75.75 0 011.5 0v14.44l4.97-4.97a.749.749 0 011.275.326.749.749 0 01-.215.734l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.97 13.22a.75.75 0 011.06 0L11 18.19V3.75a.75.75 0 011.5 0v14.44l4.97-4.97a.749.749 0 011.275.326.749.749 0 01-.215.734l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-down-left": {
	name: "arrow-down-left",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.78 4.22a.75.75 0 010 1.06l-5.26 5.26h4.2a.75.75 0 010 1.5H4.71a.75.75 0 01-.75-.75V5.28a.75.75 0 011.5 0v4.2l5.26-5.26a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.78 4.22a.75.75 0 010 1.06l-5.26 5.26h4.2a.75.75 0 010 1.5H4.71a.75.75 0 01-.75-.75V5.28a.75.75 0 011.5 0v4.2l5.26-5.26a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.75 8.5a.75.75 0 01.75.75v7.19L16.72 6.22a.751.751 0 011.042.018.751.751 0 01.018 1.042L7.56 17.5h7.19a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75v-9a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 8.5a.75.75 0 01.75.75v7.19L16.72 6.22a.751.751 0 011.042.018.751.751 0 01.018 1.042L7.56 17.5h7.19a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75v-9a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-down-right": {
	name: "arrow-down-right",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.22 4.179a.75.75 0 011.06 0l5.26 5.26v-4.2a.75.75 0 011.5 0v6.01a.75.75 0 01-.75.75H5.28a.75.75 0 010-1.5h4.2L4.22 5.24a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.22 4.179a.75.75 0 011.06 0l5.26 5.26v-4.2a.75.75 0 011.5 0v6.01a.75.75 0 01-.75.75H5.28a.75.75 0 010-1.5h4.2L4.22 5.24a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.25 8.5a.75.75 0 01.75.75v9a.75.75 0 01-.75.75h-9a.75.75 0 010-1.5h7.19L6.22 7.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L17.5 16.44V9.25a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.25 8.5a.75.75 0 01.75.75v9a.75.75 0 01-.75.75h-9a.75.75 0 010-1.5h7.19L6.22 7.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L17.5 16.44V9.25a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-left": {
	name: "arrow-left",
	keywords: [
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.751.751 0 011.042.018.751.751 0 01.018 1.042L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.751.751 0 011.042.018.751.751 0 01.018 1.042L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.749.749 0 011.275.326.749.749 0 01-.215.734L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.749.749 0 011.275.326.749.749 0 01-.215.734L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-right": {
	name: "arrow-right",
	keywords: [
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M13.22 19.03a.75.75 0 010-1.06L18.19 13H3.75a.75.75 0 010-1.5h14.44l-4.97-4.97a.749.749 0 01.326-1.275.749.749 0 01.734.215l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.22 19.03a.75.75 0 010-1.06L18.19 13H3.75a.75.75 0 010-1.5h14.44l-4.97-4.97a.749.749 0 01.326-1.275.749.749 0 01.734.215l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-switch": {
	name: "arrow-switch",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.22 14.78a.75.75 0 001.06-1.06L4.56 12h8.69a.75.75 0 000-1.5H4.56l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3zm5.56-6.5a.75.75 0 11-1.06-1.06l1.72-1.72H2.75a.75.75 0 010-1.5h8.69L9.72 2.28a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.22 14.78a.75.75 0 001.06-1.06L4.56 12h8.69a.75.75 0 000-1.5H4.56l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06l3 3zm5.56-6.5a.75.75 0 11-1.06-1.06l1.72-1.72H2.75a.75.75 0 010-1.5h8.69L9.72 2.28a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.72 21.78a.75.75 0 001.06-1.06L5.56 17.5h14.69a.75.75 0 000-1.5H5.56l3.22-3.22a.75.75 0 10-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5zm8.56-9.5a.75.75 0 11-1.06-1.06L18.44 8H3.75a.75.75 0 010-1.5h14.69l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.72 21.78a.75.75 0 001.06-1.06L5.56 17.5h14.69a.75.75 0 000-1.5H5.56l3.22-3.22a.75.75 0 10-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5zm8.56-9.5a.75.75 0 11-1.06-1.06L18.44 8H3.75a.75.75 0 010-1.5h14.69l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-up": {
	name: "arrow-up",
	keywords: [
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.47 7.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L9 4.81v7.44a.75.75 0 01-1.5 0V4.81L4.53 7.78a.75.75 0 01-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.47 7.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L9 4.81v7.44a.75.75 0 01-1.5 0V4.81L4.53 7.78a.75.75 0 01-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.655 10.405a.75.75 0 01-1.06 0l-4.97-4.97v14.44a.75.75 0 01-1.5 0V5.435l-4.97 4.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.655 10.405a.75.75 0 01-1.06 0l-4.97-4.97v14.44a.75.75 0 01-1.5 0V5.435l-4.97 4.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-up-left": {
	name: "arrow-up-left",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.96 4.75A.75.75 0 014.71 4h6.01a.75.75 0 010 1.5h-4.2l5.26 5.26a.75.75 0 01-1.06 1.061l-5.26-5.26v4.2a.75.75 0 01-1.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.96 4.75A.75.75 0 014.71 4h6.01a.75.75 0 010 1.5h-4.2l5.26 5.26a.75.75 0 01-1.06 1.061l-5.26-5.26v4.2a.75.75 0 01-1.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.75 15.5a.75.75 0 01-.75-.75v-9A.75.75 0 015.75 5h9a.75.75 0 010 1.5H7.56l10.22 10.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L6.5 7.56v7.19a.75.75 0 01-.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 15.5a.75.75 0 01-.75-.75v-9A.75.75 0 015.75 5h9a.75.75 0 010 1.5H7.56l10.22 10.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L6.5 7.56v7.19a.75.75 0 01-.75.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"arrow-up-right": {
	name: "arrow-up-right",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.53 4.75A.75.75 0 015.28 4h6.01a.75.75 0 01.75.75v6.01a.75.75 0 01-1.5 0v-4.2l-5.26 5.261a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L9.48 5.5h-4.2a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.53 4.75A.75.75 0 015.28 4h6.01a.75.75 0 01.75.75v6.01a.75.75 0 01-1.5 0v-4.2l-5.26 5.261a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L9.48 5.5h-4.2a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.25 15.5a.75.75 0 01-.75-.75V7.56L7.28 17.78a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L16.44 6.5H9.25a.75.75 0 010-1.5h9a.75.75 0 01.75.75v9a.75.75 0 01-.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.25 15.5a.75.75 0 01-.75-.75V7.56L7.28 17.78a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L16.44 6.5H9.25a.75.75 0 010-1.5h9a.75.75 0 01.75.75v9a.75.75 0 01-.75.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	beaker: beaker,
	bell: bell,
	"bell-fill": {
	name: "bell-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16c.9 0 1.7-.6 1.9-1.5.1-.3-.1-.5-.4-.5h-3c-.3 0-.5.2-.4.5.2.9 1 1.5 1.9 1.5zM3 5c0-2.8 2.2-5 5-5s5 2.2 5 5v3l1.7 2.6c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5h-11c-.8.1-1.5-.6-1.5-1.4 0-.3.1-.6.3-.8L3 8.1V5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16c.9 0 1.7-.6 1.9-1.5.1-.3-.1-.5-.4-.5h-3c-.3 0-.5.2-.4.5.2.9 1 1.5 1.9 1.5zM3 5c0-2.8 2.2-5 5-5s5 2.2 5 5v3l1.7 2.6c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5h-11c-.8.1-1.5-.6-1.5-1.4 0-.3.1-.6.3-.8L3 8.1V5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M6 8a6 6 0 1112 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 01-1.2 2.4h-15a1.5 1.5 0 01-1.2-2.4l2.05-2.733a3.25 3.25 0 00.65-1.95zm6 13.5A3.502 3.502 0 018.645 19h6.71A3.502 3.502 0 0112 21.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 8a6 6 0 1112 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 01-1.2 2.4h-15a1.5 1.5 0 01-1.2-2.4l2.05-2.733a3.25 3.25 0 00.65-1.95zm6 13.5A3.502 3.502 0 018.645 19h6.71A3.502 3.502 0 0112 21.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"bell-slash": {
	name: "bell-slash",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.182 4.31l.016.011 10.104 7.316.013.01 1.375.996a.75.75 0 11-.88 1.214L13.626 13H2.518a1.516 1.516 0 01-1.263-2.36l1.703-2.554A.255.255 0 003 7.947V5.305L.31 3.357a.75.75 0 11.88-1.214zm7.373 7.19L4.5 6.391v1.556c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 00-.003.01c0 .005.002.009.005.012l.006.004.007.001zM8 1.5c-.997 0-1.895.416-2.534 1.086A.75.75 0 114.38 1.55 5 5 0 0113 5v2.373a.75.75 0 01-1.5 0V5A3.5 3.5 0 008 1.5zM8 16a2 2 0 01-1.985-1.75c-.017-.137.097-.25.235-.25h3.5c.138 0 .252.113.235.25A2 2 0 018 16z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.182 4.31l.016.011 10.104 7.316.013.01 1.375.996a.75.75 0 11-.88 1.214L13.626 13H2.518a1.516 1.516 0 01-1.263-2.36l1.703-2.554A.255.255 0 003 7.947V5.305L.31 3.357a.75.75 0 11.88-1.214zm7.373 7.19L4.5 6.391v1.556c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 00-.003.01c0 .005.002.009.005.012l.006.004.007.001zM8 1.5c-.997 0-1.895.416-2.534 1.086A.75.75 0 114.38 1.55 5 5 0 0113 5v2.373a.75.75 0 01-1.5 0V5A3.5 3.5 0 008 1.5zM8 16a2 2 0 01-1.985-1.75c-.017-.137.097-.25.235-.25h3.5c.138 0 .252.113.235.25A2 2 0 018 16z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.22 1.22a.75.75 0 011.06 0l20.5 20.5a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L17.94 19H15.5a3.5 3.5 0 11-7 0H3.518a1.516 1.516 0 01-1.263-2.36l2.2-3.298A3.249 3.249 0 005 11.539V7c0-.294.025-.583.073-.866L1.22 2.28a.75.75 0 010-1.06zM6.5 7.56h-.001v3.979a4.75 4.75 0 01-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001H16.44zM10 19a2 2 0 104 0zm2-16.5c-1.463 0-2.8.485-3.788 1.257l-.04.032a.75.75 0 11-.935-1.173l.05-.04C8.548 1.59 10.212 1 12 1c3.681 0 7 2.565 7 6v4.539c0 .642.19 1.269.546 1.803l1.328 1.992a.75.75 0 11-1.248.832l-1.328-1.992a4.75 4.75 0 01-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.22 1.22a.75.75 0 011.06 0l20.5 20.5a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L17.94 19H15.5a3.5 3.5 0 11-7 0H3.518a1.516 1.516 0 01-1.263-2.36l2.2-3.298A3.249 3.249 0 005 11.539V7c0-.294.025-.583.073-.866L1.22 2.28a.75.75 0 010-1.06zM6.5 7.56h-.001v3.979a4.75 4.75 0 01-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001H16.44zM10 19a2 2 0 104 0zm2-16.5c-1.463 0-2.8.485-3.788 1.257l-.04.032a.75.75 0 11-.935-1.173l.05-.04C8.548 1.59 10.212 1 12 1c3.681 0 7 2.565 7 6v4.539c0 .642.19 1.269.546 1.803l1.328 1.992a.75.75 0 11-1.248.832l-1.328-1.992a4.75 4.75 0 01-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	blocked: blocked,
	bold: bold,
	book: book,
	bookmark: bookmark,
	"bookmark-fill": {
	name: "bookmark-fill",
	keywords: [
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M6.69 2h10.56c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.585L12 17.21l-5.781 4.626A.75.75 0 015 21.253L4.94 3.756A1.748 1.748 0 016.69 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.69 2h10.56c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.585L12 17.21l-5.781 4.626A.75.75 0 015 21.253L4.94 3.756A1.748 1.748 0 016.69 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"bookmark-slash": {
	name: "bookmark-slash",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.19 1.143L4.182 3.31l.014.01 8.486 6.145.014.01 2.994 2.168a.75.75 0 11-.88 1.214L13 11.547v2.703a.75.75 0 01-1.206.596L8 11.944l-3.794 2.902A.75.75 0 013 14.25V4.305L.31 2.357a.75.75 0 11.88-1.214zM4.5 5.39v7.341l3.044-2.328a.75.75 0 01.912 0l3.044 2.328V10.46zM5.865 1h5.385c.966 0 1.75.784 1.75 1.75v3.624a.75.75 0 01-1.5 0V2.75a.25.25 0 00-.25-.25H5.865a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.19 1.143L4.182 3.31l.014.01 8.486 6.145.014.01 2.994 2.168a.75.75 0 11-.88 1.214L13 11.547v2.703a.75.75 0 01-1.206.596L8 11.944l-3.794 2.902A.75.75 0 013 14.25V4.305L.31 2.357a.75.75 0 11.88-1.214zM4.5 5.39v7.341l3.044-2.328a.75.75 0 01.912 0l3.044 2.328V10.46zM5.865 1h5.385c.966 0 1.75.784 1.75 1.75v3.624a.75.75 0 01-1.5 0V2.75a.25.25 0 00-.25-.25H5.865a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.565 2.018v-.001l21.75 15.75a.75.75 0 11-.88 1.215L19 16.495v4.764a.748.748 0 01-1.219.584L12 17.21l-5.781 4.634A.75.75 0 015 21.259V6.357L.685 3.232a.75.75 0 01.88-1.214zM17.5 15.408l-11-7.965v12.254l5.031-4.032a.749.749 0 01.938 0l5.031 4.032zM7.25 2a.75.75 0 000 1.5h10a.25.25 0 01.25.25v6.5a.75.75 0 001.5 0v-6.5A1.75 1.75 0 0017.25 2h-10z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.565 2.018v-.001l21.75 15.75a.75.75 0 11-.88 1.215L19 16.495v4.764a.748.748 0 01-1.219.584L12 17.21l-5.781 4.634A.75.75 0 015 21.259V6.357L.685 3.232a.75.75 0 01.88-1.214zM17.5 15.408l-11-7.965v12.254l5.031-4.032a.749.749 0 01.938 0l5.031 4.032zM7.25 2a.75.75 0 000 1.5h10a.25.25 0 01.25.25v6.5a.75.75 0 001.5 0v-6.5A1.75 1.75 0 0017.25 2h-10z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"bookmark-slash-fill": {
	name: "bookmark-slash-fill",
	keywords: [
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M3.232 2.175l18.5 15.5a.75.75 0 11-.964 1.15L19 17.343v3.907a.75.75 0 01-1.218.585L12 17.21l-5.781 4.626A.75.75 0 015 21.253L4.947 5.569 2.268 3.325a.75.75 0 11.964-1.15zM7.421 2h9.829c.966 0 1.75.784 1.75 1.75v8.073a.75.75 0 01-1.232.575L6.94 3.325A.75.75 0 017.421 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.232 2.175l18.5 15.5a.75.75 0 11-.964 1.15L19 17.343v3.907a.75.75 0 01-1.218.585L12 17.21l-5.781 4.626A.75.75 0 015 21.253L4.947 5.569 2.268 3.325a.75.75 0 11.964-1.15zM7.421 2h9.829c.966 0 1.75.784 1.75 1.75v8.073a.75.75 0 01-1.232.575L6.94 3.325A.75.75 0 017.421 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	briefcase: briefcase,
	broadcast: broadcast,
	browser: browser,
	bug: bug,
	cache: cache,
	calendar: calendar,
	check: check,
	"check-circle": {
	name: "check-circle",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm1.5 0a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm10.28-1.72l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm1.5 0a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm10.28-1.72l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.751.751 0 01.018-1.042.751.751 0 011.042-.018l1.47 1.47 3.97-3.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"check-circle-fill": {
	name: "check-circle-fill",
	keywords: [
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M6 0a6 6 0 110 12A6 6 0 016 0zm-.705 8.737L9.63 4.403 8.392 3.166 5.295 6.263l-1.7-1.702L2.356 5.8l2.938 2.938z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 0a6 6 0 110 12A6 6 0 016 0zm-.705 8.737L9.63 4.403 8.392 3.166 5.295 6.263l-1.7-1.702L2.356 5.8l2.938 2.938z"
						},
						children: [
						]
					}
				]
			}
		},
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm3.78-9.72a.751.751 0 00-.018-1.042.751.751 0 00-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042l2 2a.75.75 0 001.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm3.78-9.72a.751.751 0 00-.018-1.042.751.751 0 00-1.042-.018L6.75 9.19 5.28 7.72a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042l2 2a.75.75 0 001.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.28-2.72a.751.751 0 00-.018-1.042.751.751 0 00-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042l3 3a.75.75 0 001.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.28-2.72a.751.751 0 00-.018-1.042.751.751 0 00-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042l3 3a.75.75 0 001.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	checkbox: checkbox,
	checklist: checklist,
	"chevron-down": {
	name: "chevron-down",
	keywords: [
		"triangle",
		"arrow"
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M6 8.8c-.2 0-.4-.1-.5-.2L2.2 5.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0L6 6.9l2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1L6.6 8.5c-.2.2-.4.3-.6.3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 8.8c-.2 0-.4-.1-.5-.2L2.2 5.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0L6 6.9l2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1L6.6 8.5c-.2.2-.4.3-.6.3z"
						},
						children: [
						]
					}
				]
			}
		},
		"16": {
			width: 16,
			path: "<path d=\"M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L8 9.94l3.72-3.72a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018L8 9.94l3.72-3.72a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.22 8.72a.75.75 0 011.06 0L12 14.44l5.72-5.72a.751.751 0 011.042.018.751.751 0 01.018 1.042l-6.25 6.25a.75.75 0 01-1.06 0L5.22 9.78a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.22 8.72a.75.75 0 011.06 0L12 14.44l5.72-5.72a.751.751 0 011.042.018.751.751 0 01.018 1.042l-6.25 6.25a.75.75 0 01-1.06 0L5.22 9.78a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"chevron-left": {
	name: "chevron-left",
	keywords: [
		"triangle",
		"arrow"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.751.751 0 011.042.018.751.751 0 01.018 1.042L6.06 8l3.72 3.72a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.751.751 0 011.042.018.751.751 0 01.018 1.042L6.06 8l3.72 3.72a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.28 5.22a.75.75 0 010 1.06L9.56 12l5.72 5.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.28 5.22a.75.75 0 010 1.06L9.56 12l5.72 5.72a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"chevron-right": {
	name: "chevron-right",
	keywords: [
		"triangle",
		"arrow"
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.7 10c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1L6.9 6 4.2 3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l3.3 3.2c.3.3.3.8 0 1.1L5.3 9.7c-.2.2-.4.3-.6.3z"
						},
						children: [
						]
					}
				]
			}
		},
		"16": {
			width: 16,
			path: "<path d=\"M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L9.94 8 6.22 4.28a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.72 18.78a.75.75 0 010-1.06L14.44 12 8.72 6.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.72 18.78a.75.75 0 010-1.06L14.44 12 8.72 6.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"chevron-up": {
	name: "chevron-up",
	keywords: [
		"triangle",
		"arrow"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.22 9.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L8 6.06 4.28 9.78a.75.75 0 01-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.22 9.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L8 6.06 4.28 9.78a.75.75 0 01-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.78 15.28a.75.75 0 01-1.06 0L12 9.56l-5.72 5.72a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.78 15.28a.75.75 0 01-1.06 0L12 9.56l-5.72 5.72a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l6.25-6.25a.75.75 0 011.06 0l6.25 6.25a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	circle: circle,
	"circle-slash": {
	name: "circle-slash",
	keywords: [
		"no",
		"deny",
		"fail",
		"failure",
		"error",
		"bad"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM3.965 13.096a6.5 6.5 0 009.131-9.131zM1.5 8a6.474 6.474 0 001.404 4.035l9.131-9.131A6.499 6.499 0 001.5 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM3.965 13.096a6.5 6.5 0 009.131-9.131zM1.5 8a6.474 6.474 0 001.404 4.035l9.131-9.131A6.499 6.499 0 001.5 8z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM5.834 19.227A9.464 9.464 0 0012 21.5a9.5 9.5 0 009.5-9.5 9.464 9.464 0 00-2.273-6.166zM2.5 12a9.464 9.464 0 002.273 6.166L18.166 4.773A9.463 9.463 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM5.834 19.227A9.464 9.464 0 0012 21.5a9.5 9.5 0 009.5-9.5 9.464 9.464 0 00-2.273-6.166zM2.5 12a9.464 9.464 0 002.273 6.166L18.166 4.773A9.463 9.463 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	clock: clock,
	"clock-fill": {
	name: "clock-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm8.575-3.25a.825.825 0 10-1.65 0v3.5c0 .337.205.64.519.766l2.5 1a.825.825 0 00.612-1.532l-1.981-.793z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm8.575-3.25a.825.825 0 10-1.65 0v3.5c0 .337.205.64.519.766l2.5 1a.825.825 0 00.612-1.532l-1.981-.793z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.575-4.75a.825.825 0 10-1.65 0v5.5c0 .296.159.57.416.716l3.5 2a.825.825 0 00.818-1.432l-3.084-1.763z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.575-4.75a.825.825 0 10-1.65 0v5.5c0 .296.159.57.416.716l3.5 2a.825.825 0 00.818-1.432l-3.084-1.763z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	cloud: cloud,
	"cloud-offline": {
	name: "cloud-offline",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.25 2c-.69 0-1.351.13-1.957.371a.75.75 0 10.554 1.394c.43-.17.903-.265 1.403-.265a3.72 3.72 0 013.541 2.496.75.75 0 00.709.504c1.676 0 3 1.324 3 3a3 3 0 01-.681 1.92.75.75 0 001.156.955A4.496 4.496 0 0016 9.5a4.472 4.472 0 00-3.983-4.471A5.222 5.222 0 007.25 2zM.72 1.72a.75.75 0 011.06 0l2.311 2.31c.03.025.056.052.08.08l8.531 8.532.035.034 2.043 2.044a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-1.8-1.799a4.54 4.54 0 01-.42.019h-8A3.474 3.474 0 010 10.5c0-1.41.809-2.614 2.001-3.17a5.218 5.218 0 01.646-2.622L.72 2.78a.75.75 0 010-1.06zM3.5 7.25c.004.161.018.322.041.481a.75.75 0 01-.557.833c-.86.22-1.484.986-1.484 1.936 0 1.124.876 2 2 2h6.94L3.771 5.832A3.788 3.788 0 003.5 7.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.25 2c-.69 0-1.351.13-1.957.371a.75.75 0 10.554 1.394c.43-.17.903-.265 1.403-.265a3.72 3.72 0 013.541 2.496.75.75 0 00.709.504c1.676 0 3 1.324 3 3a3 3 0 01-.681 1.92.75.75 0 001.156.955A4.496 4.496 0 0016 9.5a4.472 4.472 0 00-3.983-4.471A5.222 5.222 0 007.25 2zM.72 1.72a.75.75 0 011.06 0l2.311 2.31c.03.025.056.052.08.08l8.531 8.532.035.034 2.043 2.044a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-1.8-1.799a4.54 4.54 0 01-.42.019h-8A3.474 3.474 0 010 10.5c0-1.41.809-2.614 2.001-3.17a5.218 5.218 0 01.646-2.622L.72 2.78a.75.75 0 010-1.06zM3.5 7.25c.004.161.018.322.041.481a.75.75 0 01-.557.833c-.86.22-1.484.986-1.484 1.936 0 1.124.876 2 2 2h6.94L3.771 5.832A3.788 3.788 0 003.5 7.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.78 2.22l19.5 19.5a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2.845-2.845a6.932 6.932 0 01-.944.065H5.017C2.229 20 0 17.831 0 15.059a4.899 4.899 0 013.111-4.58A7.52 7.52 0 014.36 5.922L1.72 3.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018zM16.94 18.5L5.448 7.01a6.026 6.026 0 00-.794 3.853.75.75 0 01-.552.869c-1.52.385-2.603 1.712-2.603 3.328 0 1.917 1.532 3.44 3.517 3.44zm-6.104-16a7.865 7.865 0 00-3.638.88.75.75 0 10.692 1.331A6.365 6.365 0 0110.836 4c2.588 0 4.77 1.5 5.72 3.655l.179.445a.75.75 0 00.696.471c2.843 0 5.069 2.206 5.069 4.965a4.9 4.9 0 01-1.684 3.716.75.75 0 00.986 1.13A6.396 6.396 0 0024 13.536c0-3.44-2.652-6.191-6.054-6.445l-.002-.006a.634.634 0 00-.01-.022C16.749 4.358 14.026 2.5 10.837 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.78 2.22l19.5 19.5a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2.845-2.845a6.932 6.932 0 01-.944.065H5.017C2.229 20 0 17.831 0 15.059a4.899 4.899 0 013.111-4.58A7.52 7.52 0 014.36 5.922L1.72 3.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018zM16.94 18.5L5.448 7.01a6.026 6.026 0 00-.794 3.853.75.75 0 01-.552.869c-1.52.385-2.603 1.712-2.603 3.328 0 1.917 1.532 3.44 3.517 3.44zm-6.104-16a7.865 7.865 0 00-3.638.88.75.75 0 10.692 1.331A6.365 6.365 0 0110.836 4c2.588 0 4.77 1.5 5.72 3.655l.179.445a.75.75 0 00.696.471c2.843 0 5.069 2.206 5.069 4.965a4.9 4.9 0 01-1.684 3.716.75.75 0 00.986 1.13A6.396 6.396 0 0024 13.536c0-3.44-2.652-6.191-6.054-6.445l-.002-.006a.634.634 0 00-.01-.022C16.749 4.358 14.026 2.5 10.837 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	code: code,
	"code-of-conduct": {
	name: "code-of-conduct",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.048 2.241c.964-.709 2.079-1.238 3.325-1.241a4.616 4.616 0 013.282 1.355c.41.408.757.86.996 1.428.238.568.348 1.206.347 1.968 0 2.193-1.505 4.254-3.081 5.862-1.496 1.526-3.213 2.796-4.249 3.563l-.22.163a.749.749 0 01-.895 0l-.221-.163c-1.036-.767-2.753-2.037-4.249-3.563C1.51 10.008.007 7.952.002 5.762a4.614 4.614 0 011.353-3.407C3.123.585 6.223.537 8.048 2.24zm-1.153.983c-1.25-1.033-3.321-.967-4.48.191a3.115 3.115 0 00-.913 2.335c0 1.556 1.109 3.24 2.652 4.813C5.463 11.898 6.96 13.032 8 13.805c.353-.262.758-.565 1.191-.905l-1.326-1.223a.75.75 0 011.018-1.102l1.48 1.366c.328-.281.659-.577.984-.887L9.99 9.802a.75.75 0 111.019-1.103l1.384 1.28c.295-.329.566-.661.81-.995L12.92 8.7l-1.167-1.168c-.674-.671-1.78-.664-2.474.03-.268.269-.538.537-.802.797-.893.882-2.319.843-3.185-.032-.346-.35-.693-.697-1.043-1.047a.75.75 0 01-.04-1.016c.162-.191.336-.401.52-.623.62-.748 1.356-1.637 2.166-2.417zm7.112 4.442c.313-.65.491-1.293.491-1.916v-.001c0-.614-.088-1.045-.23-1.385-.143-.339-.357-.633-.673-.949a3.111 3.111 0 00-2.218-.915c-1.092.003-2.165.627-3.226 1.602-.823.755-1.554 1.637-2.228 2.45l-.127.154.562.566a.755.755 0 001.066.02l.794-.79c1.258-1.258 3.312-1.31 4.594-.032.396.394.792.791 1.173 1.173z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.048 2.241c.964-.709 2.079-1.238 3.325-1.241a4.616 4.616 0 013.282 1.355c.41.408.757.86.996 1.428.238.568.348 1.206.347 1.968 0 2.193-1.505 4.254-3.081 5.862-1.496 1.526-3.213 2.796-4.249 3.563l-.22.163a.749.749 0 01-.895 0l-.221-.163c-1.036-.767-2.753-2.037-4.249-3.563C1.51 10.008.007 7.952.002 5.762a4.614 4.614 0 011.353-3.407C3.123.585 6.223.537 8.048 2.24zm-1.153.983c-1.25-1.033-3.321-.967-4.48.191a3.115 3.115 0 00-.913 2.335c0 1.556 1.109 3.24 2.652 4.813C5.463 11.898 6.96 13.032 8 13.805c.353-.262.758-.565 1.191-.905l-1.326-1.223a.75.75 0 011.018-1.102l1.48 1.366c.328-.281.659-.577.984-.887L9.99 9.802a.75.75 0 111.019-1.103l1.384 1.28c.295-.329.566-.661.81-.995L12.92 8.7l-1.167-1.168c-.674-.671-1.78-.664-2.474.03-.268.269-.538.537-.802.797-.893.882-2.319.843-3.185-.032-.346-.35-.693-.697-1.043-1.047a.75.75 0 01-.04-1.016c.162-.191.336-.401.52-.623.62-.748 1.356-1.637 2.166-2.417zm7.112 4.442c.313-.65.491-1.293.491-1.916v-.001c0-.614-.088-1.045-.23-1.385-.143-.339-.357-.633-.673-.949a3.111 3.111 0 00-2.218-.915c-1.092.003-2.165.627-3.226 1.602-.823.755-1.554 1.637-2.228 2.45l-.127.154.562.566a.755.755 0 001.066.02l.794-.79c1.258-1.258 3.312-1.31 4.594-.032.396.394.792.791 1.173 1.173z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.828 4.328C5.26 1.896 9.5 1.881 11.935 4.317c.024.024.046.05.067.076 1.391-1.078 2.993-1.886 4.777-1.89a6.22 6.22 0 014.424 1.825c.559.56 1.023 1.165 1.34 1.922.318.756.47 1.617.468 2.663 0 2.972-2.047 5.808-4.269 8.074-2.098 2.14-4.507 3.924-5.974 5.009l-.311.23a.752.752 0 01-.897 0l-.312-.23c-1.466-1.085-3.875-2.869-5.973-5.009-2.22-2.263-4.264-5.095-4.27-8.063a6.216 6.216 0 011.823-4.596zm8.033 1.042c-1.846-1.834-5.124-1.823-6.969.022a4.712 4.712 0 00-1.382 3.52c0 2.332 1.65 4.79 3.839 7.022 1.947 1.986 4.184 3.66 5.66 4.752a78.214 78.214 0 002.159-1.645l-2.14-1.974a.752.752 0 011.02-1.106l2.295 2.118c.616-.52 1.242-1.08 1.85-1.672l-2.16-1.992a.753.753 0 011.021-1.106l2.188 2.02a18.963 18.963 0 001.528-1.877l-.585-.586-1.651-1.652c-1.078-1.074-2.837-1.055-3.935.043-.379.38-.76.758-1.132 1.126-1.14 1.124-2.96 1.077-4.07-.043-.489-.495-.98-.988-1.475-1.482a.752.752 0 01-.04-1.019c.234-.276.483-.576.745-.893.928-1.12 2.023-2.442 3.234-3.576zm9.725 6.77c.579-1.08.92-2.167.92-3.228.002-.899-.128-1.552-.35-2.08-.22-.526-.551-.974-1.017-1.44a4.71 4.71 0 00-3.356-1.384c-1.66.004-3.25.951-4.77 2.346-1.18 1.084-2.233 2.353-3.188 3.506l-.351.423c.331.332.663.664.993.998a1.375 1.375 0 001.943.03c.37-.365.748-.74 1.125-1.118 1.662-1.663 4.373-1.726 6.06-.045.56.558 1.12 1.12 1.658 1.658z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.828 4.328C5.26 1.896 9.5 1.881 11.935 4.317c.024.024.046.05.067.076 1.391-1.078 2.993-1.886 4.777-1.89a6.22 6.22 0 014.424 1.825c.559.56 1.023 1.165 1.34 1.922.318.756.47 1.617.468 2.663 0 2.972-2.047 5.808-4.269 8.074-2.098 2.14-4.507 3.924-5.974 5.009l-.311.23a.752.752 0 01-.897 0l-.312-.23c-1.466-1.085-3.875-2.869-5.973-5.009-2.22-2.263-4.264-5.095-4.27-8.063a6.216 6.216 0 011.823-4.596zm8.033 1.042c-1.846-1.834-5.124-1.823-6.969.022a4.712 4.712 0 00-1.382 3.52c0 2.332 1.65 4.79 3.839 7.022 1.947 1.986 4.184 3.66 5.66 4.752a78.214 78.214 0 002.159-1.645l-2.14-1.974a.752.752 0 011.02-1.106l2.295 2.118c.616-.52 1.242-1.08 1.85-1.672l-2.16-1.992a.753.753 0 011.021-1.106l2.188 2.02a18.963 18.963 0 001.528-1.877l-.585-.586-1.651-1.652c-1.078-1.074-2.837-1.055-3.935.043-.379.38-.76.758-1.132 1.126-1.14 1.124-2.96 1.077-4.07-.043-.489-.495-.98-.988-1.475-1.482a.752.752 0 01-.04-1.019c.234-.276.483-.576.745-.893.928-1.12 2.023-2.442 3.234-3.576zm9.725 6.77c.579-1.08.92-2.167.92-3.228.002-.899-.128-1.552-.35-2.08-.22-.526-.551-.974-1.017-1.44a4.71 4.71 0 00-3.356-1.384c-1.66.004-3.25.951-4.77 2.346-1.18 1.084-2.233 2.353-3.188 3.506l-.351.423c.331.332.663.664.993.998a1.375 1.375 0 001.943.03c.37-.365.748-.74 1.125-1.118 1.662-1.663 4.373-1.726 6.06-.045.56.558 1.12 1.12 1.658 1.658z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"code-review": {
	name: "code-review",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.061l-2.574 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5C0 1.784.784 1 1.75 1zM1.5 2.75v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zm5.28 1.72a.75.75 0 010 1.06L5.31 7l1.47 1.47a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-2-2a.75.75 0 010-1.06l2-2a.75.75 0 011.06 0zm2.44 0a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L10.69 7 9.22 5.53a.75.75 0 010-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.061l-2.574 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5C0 1.784.784 1 1.75 1zM1.5 2.75v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25zm5.28 1.72a.75.75 0 010 1.06L5.31 7l1.47 1.47a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-2-2a.75.75 0 010-1.06l2-2a.75.75 0 011.06 0zm2.44 0a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L10.69 7 9.22 5.53a.75.75 0 010-1.06z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.3 6.74a.75.75 0 01-.04 1.06l-2.908 2.7 2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z\"></path><path d=\"M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.749.749 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.3 6.74a.75.75 0 01-.04 1.06l-2.908 2.7 2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 4.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.458 1.458 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75zM3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.749.749 0 01.53-.22h10a.25.25 0 00.25-.25V4.25a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"code-square": {
	name: "code-square",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25zm7.47 3.97a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L10.69 8 9.22 6.53a.75.75 0 010-1.06zM6.78 6.53L5.31 8l1.47 1.47a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2-2a.75.75 0 010-1.06l2-2a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25zm7.47 3.97a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L10.69 8 9.22 6.53a.75.75 0 010-1.06zM6.78 6.53L5.31 8l1.47 1.47a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2-2a.75.75 0 010-1.06l2-2a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.3 8.24a.75.75 0 01-.04 1.06L7.352 12l2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z\"></path><path d=\"M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.3 8.24a.75.75 0 01-.04 1.06L7.352 12l2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	codescan: codescan,
	"codescan-checkmark": {
	name: "codescan-checkmark",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.28 6.28a.75.75 0 10-1.06-1.06L6.25 8.19l-.97-.97a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3.5-3.5z\"></path><path d=\"M7.5 15a7.5 7.5 0 115.807-2.754l2.473 2.474a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2.474-2.473A7.472 7.472 0 017.5 15zm0-13.5a6 6 0 104.094 10.386.748.748 0 01.293-.292 6.002 6.002 0 001.117-6.486A6.002 6.002 0 007.5 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.28 6.28a.75.75 0 10-1.06-1.06L6.25 8.19l-.97-.97a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3.5-3.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.5 15a7.5 7.5 0 115.807-2.754l2.473 2.474a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-2.474-2.473A7.472 7.472 0 017.5 15zm0-13.5a6 6 0 104.094 10.386.748.748 0 01.293-.292 6.002 6.002 0 001.117-6.486A6.002 6.002 0 007.5 1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.03 8.28a.75.75 0 00-1.06-1.06l-5.22 5.22-2.22-2.22a.75.75 0 10-1.06 1.06l2.75 2.75a.75.75 0 001.06 0l5.75-5.75z\"></path><path d=\"M0 10.5C0 4.701 4.701 0 10.5 0S21 4.701 21 10.5c0 2.63-.967 5.033-2.564 6.875l4.344 4.345a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-4.345-4.344A10.457 10.457 0 0110.5 21C4.701 21 0 16.299 0 10.5zm10.5-9a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.03 8.28a.75.75 0 00-1.06-1.06l-5.22 5.22-2.22-2.22a.75.75 0 10-1.06 1.06l2.75 2.75a.75.75 0 001.06 0l5.75-5.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 10.5C0 4.701 4.701 0 10.5 0S21 4.701 21 10.5c0 2.63-.967 5.033-2.564 6.875l4.344 4.345a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-4.345-4.344A10.457 10.457 0 0110.5 21C4.701 21 0 16.299 0 10.5zm10.5-9a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	codespaces: codespaces,
	columns: columns,
	"command-palette": {
	name: "command-palette",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.354 8.04l-4.773 4.773a.75.75 0 101.061 1.06L7.945 8.57a.75.75 0 000-1.06L2.642 2.206a.75.75 0 00-1.06 1.061L6.353 8.04zM8.75 11.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.354 8.04l-4.773 4.773a.75.75 0 101.061 1.06L7.945 8.57a.75.75 0 000-1.06L2.642 2.206a.75.75 0 00-1.06 1.061L6.353 8.04zM8.75 11.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.045 18.894L9.94 12 3.045 5.106a.75.75 0 011.06-1.061l7.425 7.425a.75.75 0 010 1.06l-7.424 7.425a.75.75 0 01-1.061-1.06zm8.205.606a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.045 18.894L9.94 12 3.045 5.106a.75.75 0 011.06-1.061l7.425 7.425a.75.75 0 010 1.06l-7.424 7.425a.75.75 0 01-1.061-1.06zm8.205.606a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	comment: comment,
	"comment-discussion": {
	name: "comment-discussion",
	keywords: [
		"converse",
		"talk"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0110.25 10H7.061l-2.574 2.573A1.458 1.458 0 012 11.543V10h-.25A1.75 1.75 0 010 8.25v-5.5C0 1.784.784 1 1.75 1zM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h3.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zm13 2a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.458 1.458 0 01-2.487 1.03L9.22 12.28a.749.749 0 01.326-1.275.749.749 0 01.734.215l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0110.25 10H7.061l-2.574 2.573A1.458 1.458 0 012 11.543V10h-.25A1.75 1.75 0 010 8.25v-5.5C0 1.784.784 1 1.75 1zM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h3.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zm13 2a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.458 1.458 0 01-2.487 1.03L9.22 12.28a.749.749 0 01.326-1.275.749.749 0 01.734.215l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0114.25 14H8.061l-2.574 2.573A1.458 1.458 0 013 15.543V14H1.75A1.75 1.75 0 010 12.25v-9.5C0 1.784.784 1 1.75 1zM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z\"></path><path d=\"M22.5 8.75a.25.25 0 00-.25-.25h-3.5a.75.75 0 010-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0122.25 20H21v1.543a1.457 1.457 0 01-2.487 1.03L15.939 20H10.75A1.75 1.75 0 019 18.25v-1.465a.75.75 0 011.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 01.53.22l2.72 2.72v-2.19a.75.75 0 01.75-.75h2a.25.25 0 00.25-.25v-9.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0114.25 14H8.061l-2.574 2.573A1.458 1.458 0 013 15.543V14H1.75A1.75 1.75 0 010 12.25v-9.5C0 1.784.784 1 1.75 1zM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h6.5a.25.25 0 00.25-.25v-9.5a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22.5 8.75a.25.25 0 00-.25-.25h-3.5a.75.75 0 010-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0122.25 20H21v1.543a1.457 1.457 0 01-2.487 1.03L15.939 20H10.75A1.75 1.75 0 019 18.25v-1.465a.75.75 0 011.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 01.53.22l2.72 2.72v-2.19a.75.75 0 01.75-.75h2a.25.25 0 00.25-.25v-9.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	commit: commit,
	container: container,
	copilot: copilot,
	"copilot-error": {
	name: "copilot-error",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.865 2.759v.001l14.82 10.722a.755.755 0 00.188.1.751.751 0 01-1.063 1.025l-1.415-1.024c-.274.147-.613.315-1.008.482C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.473-4.387-.934a11.947 11.947 0 01-1.654-.859l-.098-.065-.028-.018-.006-.004-.015-.01a10.19 10.19 0 01-.792-.597 5.145 5.145 0 01-.605-.58 2.185 2.185 0 01-.259-.366A1.193 1.193 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838c-.175-.442-.238-.936-.251-1.434L.31 4.107a.75.75 0 01.555-1.348zM7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0116 9.736V11c0 .24-.086.438-.156.567a1.59 1.59 0 01-.075.125L13 9.688V7.824l-.023-.115c-.49.21-1.075.291-1.727.291-.22 0-.43-.012-.633-.036L6.824 5.22c.082-.233.143-.503.182-.813.117-.936-.038-1.396-.242-1.614-.193-.207-.637-.414-1.681-.298-.707.079-1.144.243-1.424.434l-1.251-.905c.58-.579 1.422-.899 2.51-1.02 1.205-.133 2.26.035 2.943.766zM4.75 8c-.652 0-1.237-.081-1.727-.291L3 7.825v4.26c.387.225.788.426 1.2.6.97.412 2.306.815 3.8.815 1.494 0 2.829-.403 3.801-.815.076-.033.15-.065.22-.097L5.594 7.934A5.158 5.158 0 014.75 8zm4.486-5.207c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.865 2.759v.001l14.82 10.722a.755.755 0 00.188.1.751.751 0 01-1.063 1.025l-1.415-1.024c-.274.147-.613.315-1.008.482C11.296 14.528 9.756 15 8 15c-1.756 0-3.296-.473-4.387-.934a11.947 11.947 0 01-1.654-.859l-.098-.065-.028-.018-.006-.004-.015-.01a10.19 10.19 0 01-.792-.597 5.145 5.145 0 01-.605-.58 2.185 2.185 0 01-.259-.366A1.193 1.193 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838c-.175-.442-.238-.936-.251-1.434L.31 4.107a.75.75 0 01.555-1.348zM7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .572-.053 1.147-.254 1.655l.168.838.066.033A2.75 2.75 0 0116 9.736V11c0 .24-.086.438-.156.567a1.59 1.59 0 01-.075.125L13 9.688V7.824l-.023-.115c-.49.21-1.075.291-1.727.291-.22 0-.43-.012-.633-.036L6.824 5.22c.082-.233.143-.503.182-.813.117-.936-.038-1.396-.242-1.614-.193-.207-.637-.414-1.681-.298-.707.079-1.144.243-1.424.434l-1.251-.905c.58-.579 1.422-.899 2.51-1.02 1.205-.133 2.26.035 2.943.766zM4.75 8c-.652 0-1.237-.081-1.727-.291L3 7.825v4.26c.387.225.788.426 1.2.6.97.412 2.306.815 3.8.815 1.494 0 2.829-.403 3.801-.815.076-.033.15-.065.22-.097L5.594 7.934A5.158 5.158 0 014.75 8zm4.486-5.207c-.204.218-.359.678-.242 1.614.091.726.303 1.23.618 1.553.299.304.784.54 1.638.54.922 0 1.28-.199 1.442-.38.179-.2.308-.578.308-1.37 0-.765-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"copilot-warning": {
	name: "copilot-warning",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .463-.035.929-.155 1.359a6.015 6.015 0 00-1.398-.616c.034-.195.053-.439.053-.743 0-.766-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298-.204.218-.359.678-.242 1.614.06.479.172.86.332 1.158a6.014 6.014 0 00-2.92 2.144C5.926 7.904 5.372 8 4.75 8c-.652 0-1.237-.082-1.727-.291L3 7.824v4.261c.02.013.043.025.065.038a10.83 10.83 0 002.495 1.035c.21.629.522 1.21.916 1.726a11.883 11.883 0 01-2.863-.819 12.28 12.28 0 01-1.296-.641 8.849 8.849 0 01-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 01-.792-.596 5.264 5.264 0 01-.605-.58 2.133 2.133 0 01-.259-.367A1.189 1.189 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765zM6.765 2.793c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614z\"></path><path d=\"M8.498 14.81v.001a4.5 4.5 0 115.503-7.12 4.5 4.5 0 01-5.503 7.119zM10.5 8.75V11a.75.75 0 001.5 0V8.75a.75.75 0 00-1.5 0zm.75 5.75a1 1 0 100-2 1 1 0 000 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.86 1.77c.05.053.097.107.14.164.043-.057.09-.111.14-.164.681-.731 1.737-.9 2.943-.765 1.23.136 2.145.527 2.724 1.26.566.716.693 1.614.693 2.485 0 .463-.035.929-.155 1.359a6.015 6.015 0 00-1.398-.616c.034-.195.053-.439.053-.743 0-.766-.123-1.242-.37-1.555-.233-.296-.693-.586-1.713-.7-1.044-.116-1.488.091-1.681.298-.204.218-.359.678-.242 1.614.06.479.172.86.332 1.158a6.014 6.014 0 00-2.92 2.144C5.926 7.904 5.372 8 4.75 8c-.652 0-1.237-.082-1.727-.291L3 7.824v4.261c.02.013.043.025.065.038a10.83 10.83 0 002.495 1.035c.21.629.522 1.21.916 1.726a11.883 11.883 0 01-2.863-.819 12.28 12.28 0 01-1.296-.641 8.849 8.849 0 01-.456-.281l-.028-.02-.006-.003-.015-.01a10.593 10.593 0 01-.792-.596 5.264 5.264 0 01-.605-.58 2.133 2.133 0 01-.259-.367A1.189 1.189 0 010 11V9.736a2.75 2.75 0 011.52-2.46l.067-.033.167-.838C1.553 5.897 1.5 5.322 1.5 4.75c0-.87.127-1.77.693-2.485.579-.733 1.494-1.124 2.724-1.26 1.206-.134 2.262.034 2.944.765zM6.765 2.793c-.193-.207-.637-.414-1.681-.298-1.02.114-1.48.404-1.713.7-.247.313-.37.79-.37 1.555 0 .792.129 1.17.308 1.37.162.181.52.38 1.442.38.854 0 1.339-.236 1.638-.54.315-.323.527-.827.618-1.553.117-.936-.038-1.396-.242-1.614z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.498 14.81v.001a4.5 4.5 0 115.503-7.12 4.5 4.5 0 01-5.503 7.119zM10.5 8.75V11a.75.75 0 001.5 0V8.75a.75.75 0 00-1.5 0zm.75 5.75a1 1 0 100-2 1 1 0 000 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	copy: copy,
	cpu: cpu,
	"credit-card": {
	name: "credit-card",
	keywords: [
		"money",
		"billing",
		"payments",
		"transactions"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.75 9a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z\"></path><path d=\"M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zM14.5 6.5h-13v5.75c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25zm0-2.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25V5h13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.75 9a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 3.75C0 2.784.784 2 1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 14H1.75A1.75 1.75 0 010 12.25zM14.5 6.5h-13v5.75c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25zm0-2.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25V5h13z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.25 14a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z\"></path><path d=\"M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3zm-.25 7v9.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V10zm0-5.25V8.5h21V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.25 14a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0122.25 21H1.75A1.75 1.75 0 010 19.25V4.75C0 3.784.784 3 1.75 3zm-.25 7v9.25c0 .138.112.25.25.25h20.5a.25.25 0 00.25-.25V10zm0-5.25V8.5h21V4.75a.25.25 0 00-.25-.25H1.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"cross-reference": {
	name: "cross-reference",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h4.5a.25.25 0 00.25-.25v-2.5a.75.75 0 011.5 0v2.5A1.75 1.75 0 0113.25 13H9.06l-2.573 2.573A1.458 1.458 0 014 14.543V13H2.75A1.75 1.75 0 011 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5zM16 1.25v4.146a.25.25 0 01-.427.177L14.03 4.03l-3.75 3.75a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l3.75-3.75-1.543-1.543A.25.25 0 0111.604 1h4.146a.25.25 0 01.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h4.5a.25.25 0 00.25-.25v-2.5a.75.75 0 011.5 0v2.5A1.75 1.75 0 0113.25 13H9.06l-2.573 2.573A1.458 1.458 0 014 14.543V13H2.75A1.75 1.75 0 011 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5zM16 1.25v4.146a.25.25 0 01-.427.177L14.03 4.03l-3.75 3.75a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l3.75-3.75-1.543-1.543A.25.25 0 0111.604 1h4.146a.25.25 0 01.25.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L20.94 3h-3.69a.75.75 0 01-.75-.75z\"></path><path d=\"M3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.75.75 0 01.53-.22h10a.25.25 0 00.25-.25v-6a.75.75 0 011.5 0v6a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75V4.25c0-.966.784-1.75 1.75-1.75h11a.75.75 0 010 1.5h-11z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L20.94 3h-3.69a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 4a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 01.75.75v3.19l3.72-3.72a.75.75 0 01.53-.22h10a.25.25 0 00.25-.25v-6a.75.75 0 011.5 0v6a1.75 1.75 0 01-1.75 1.75h-9.69l-3.573 3.573A1.457 1.457 0 015 21.043V18.5H3.25a1.75 1.75 0 01-1.75-1.75V4.25c0-.966.784-1.75 1.75-1.75h11a.75.75 0 010 1.5h-11z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	dash: dash,
	database: database,
	dependabot: dependabot,
	"desktop-download": {
	name: "desktop-download",
	keywords: [
		"clone",
		"download"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.927 5.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 5H8.75V.75a.75.75 0 10-1.5 0V5H5.104a.25.25 0 00-.177.427z\"></path><path d=\"M1.573 2.573a.25.25 0 00-.073.177v7.5a.25.25 0 00.25.25h12.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-3a.75.75 0 110-1.5h3A1.75 1.75 0 0116 2.75v7.5A1.75 1.75 0 0114.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0111.25 16h-6.5a.75.75 0 01-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 010 10.25v-7.5A1.75 1.75 0 011.75 1h3a.75.75 0 010 1.5h-3a.25.25 0 00-.177.073zM6.982 12a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5H6.982z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.927 5.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 5H8.75V.75a.75.75 0 10-1.5 0V5H5.104a.25.25 0 00-.177.427z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.573 2.573a.25.25 0 00-.073.177v7.5a.25.25 0 00.25.25h12.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-3a.75.75 0 110-1.5h3A1.75 1.75 0 0116 2.75v7.5A1.75 1.75 0 0114.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.75.75 0 0111.25 16h-6.5a.75.75 0 01-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 010 10.25v-7.5A1.75 1.75 0 011.75 1h3a.75.75 0 010 1.5h-3a.25.25 0 00-.177.073zM6.982 12a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5H6.982z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.25 9.331V.75a.75.75 0 011.5 0v8.58l1.949-2.11A.75.75 0 1115.8 8.237l-3.25 3.52a.75.75 0 01-1.102 0l-3.25-3.52A.75.75 0 119.3 7.22l1.949 2.111z\"></path><path d=\"M2.5 3.75v11.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.75.75 0 010-1.5h5.5c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0121.25 17h-6.204c.171 1.375.805 2.652 1.769 3.757A.752.752 0 0116.25 22h-8.5a.75.75 0 01-.566-1.243c.965-1.105 1.599-2.382 1.77-3.757H2.75A1.75 1.75 0 011 15.25V3.75C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25zM10.463 17c-.126 1.266-.564 2.445-1.223 3.5h5.52c-.66-1.055-1.098-2.234-1.223-3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.25 9.331V.75a.75.75 0 011.5 0v8.58l1.949-2.11A.75.75 0 1115.8 8.237l-3.25 3.52a.75.75 0 01-1.102 0l-3.25-3.52A.75.75 0 119.3 7.22l1.949 2.111z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 3.75v11.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25h-5.5a.75.75 0 010-1.5h5.5c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0121.25 17h-6.204c.171 1.375.805 2.652 1.769 3.757A.752.752 0 0116.25 22h-8.5a.75.75 0 01-.566-1.243c.965-1.105 1.599-2.382 1.77-3.757H2.75A1.75 1.75 0 011 15.25V3.75C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25zM10.463 17c-.126 1.266-.564 2.445-1.223 3.5h5.52c-.66-1.055-1.098-2.234-1.223-3.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"device-camera": {
	name: "device-camera",
	keywords: [
		"photo",
		"picture",
		"image",
		"snapshot"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M15 3c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1 0-.55.45-1 1-1h4c.55 0 1 .45 1 1zm-4.5 9c1.94 0 3.5-1.56 3.5-3.5S12.44 5 10.5 5 7 6.56 7 8.5 8.56 12 10.5 12zM13 8.5c0 1.38-1.13 2.5-2.5 2.5S8 9.87 8 8.5 9.13 6 10.5 6 13 7.13 13 8.5zM6 5V4H2v1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 3c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1 0-.55.45-1 1-1h4c.55 0 1 .45 1 1zm-4.5 9c1.94 0 3.5-1.56 3.5-3.5S12.44 5 10.5 5 7 6.56 7 8.5 8.56 12 10.5 12zM13 8.5c0 1.38-1.13 2.5-2.5 2.5S8 9.87 8 8.5 9.13 6 10.5 6 13 7.13 13 8.5zM6 5V4H2v1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"device-camera-video": {
	name: "device-camera-video",
	keywords: [
		"watch",
		"view",
		"media",
		"stream"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M16 3.75v8.5a.75.75 0 01-1.136.643L11 10.575v.675A1.75 1.75 0 019.25 13h-7.5A1.75 1.75 0 010 11.25v-6.5C0 3.784.784 3 1.75 3h7.5c.966 0 1.75.784 1.75 1.75v.675l3.864-2.318A.75.75 0 0116 3.75zm-6.5 1a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-6.5zM11 8.825l3.5 2.1v-5.85l-3.5 2.1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 3.75v8.5a.75.75 0 01-1.136.643L11 10.575v.675A1.75 1.75 0 019.25 13h-7.5A1.75 1.75 0 010 11.25v-6.5C0 3.784.784 3 1.75 3h7.5c.966 0 1.75.784 1.75 1.75v.675l3.864-2.318A.75.75 0 0116 3.75zm-6.5 1a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-6.5zM11 8.825l3.5 2.1v-5.85l-3.5 2.1z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M24 5.25v13a.75.75 0 01-1.136.643L16.5 15.075v2.175A1.75 1.75 0 0114.75 19h-13A1.75 1.75 0 010 17.25v-11C0 5.284.784 4.5 1.75 4.5h13c.966 0 1.75.784 1.75 1.75v2.175l6.364-3.818A.75.75 0 0124 5.25zm-9 1a.25.25 0 00-.25-.25h-13a.25.25 0 00-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 00.25-.25v-11zm1.5 7.075l6 3.6V6.575l-6 3.6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M24 5.25v13a.75.75 0 01-1.136.643L16.5 15.075v2.175A1.75 1.75 0 0114.75 19h-13A1.75 1.75 0 010 17.25v-11C0 5.284.784 4.5 1.75 4.5h13c.966 0 1.75.784 1.75 1.75v2.175l6.364-3.818A.75.75 0 0124 5.25zm-9 1a.25.25 0 00-.25-.25h-13a.25.25 0 00-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 00.25-.25v-11zm1.5 7.075l6 3.6V6.575l-6 3.6z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"device-desktop": {
	name: "device-desktop",
	keywords: [
		"computer",
		"monitor"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M14.25 1c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0114.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.752.752 0 0111.25 16h-6.5a.75.75 0 01-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 010 10.25v-7.5C0 1.784.784 1 1.75 1zM1.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25zM9.018 12H6.982a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.25 1c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0114.25 12h-3.727c.099 1.041.52 1.872 1.292 2.757A.752.752 0 0111.25 16h-6.5a.75.75 0 01-.565-1.243c.772-.885 1.192-1.716 1.292-2.757H1.75A1.75 1.75 0 010 10.25v-7.5C0 1.784.784 1 1.75 1zM1.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25zM9.018 12H6.982a5.72 5.72 0 01-.765 2.5h3.566a5.72 5.72 0 01-.765-2.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.954 17H2.75A1.75 1.75 0 011 15.25V3.75C1 2.784 1.784 2 2.75 2h18.5c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0121.25 17h-6.204c.171 1.375.805 2.652 1.769 3.757A.752.752 0 0116.25 22h-8.5a.75.75 0 01-.565-1.243c.964-1.105 1.598-2.382 1.769-3.757zM21.5 3.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25zM13.537 17h-3.074c-.126 1.266-.564 2.445-1.223 3.5h5.52c-.659-1.055-1.098-2.234-1.223-3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.954 17H2.75A1.75 1.75 0 011 15.25V3.75C1 2.784 1.784 2 2.75 2h18.5c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0121.25 17h-6.204c.171 1.375.805 2.652 1.769 3.757A.752.752 0 0116.25 22h-8.5a.75.75 0 01-.565-1.243c.964-1.105 1.598-2.382 1.769-3.757zM21.5 3.75a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h18.5a.25.25 0 00.25-.25zM13.537 17h-3.074c-.126 1.266-.564 2.445-1.223 3.5h5.52c-.659-1.055-1.098-2.234-1.223-3.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"device-mobile": {
	name: "device-mobile",
	keywords: [
		"phone",
		"iphone",
		"cellphone"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0112.25 16h-8.5A1.75 1.75 0 012 14.25V1.75C2 .784 2.784 0 3.75 0zM3.5 1.75v12.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zM8 13a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 0h8.5C13.216 0 14 .784 14 1.75v12.5A1.75 1.75 0 0112.25 16h-8.5A1.75 1.75 0 012 14.25V1.75C2 .784 2.784 0 3.75 0zM3.5 1.75v12.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zM8 13a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M10.25 5.25A.75.75 0 0111 4.5h2A.75.75 0 0113 6h-2a.75.75 0 01-.75-.75zM12 19.5a1 1 0 100-2 1 1 0 000 2z\"></path><path d=\"M4 2.75C4 1.784 4.784 1 5.75 1h12.5c.966 0 1.75.784 1.75 1.75v18.5A1.75 1.75 0 0118.25 23H5.75A1.75 1.75 0 014 21.25zm1.75-.25a.25.25 0 00-.25.25v18.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.25 5.25A.75.75 0 0111 4.5h2A.75.75 0 0113 6h-2a.75.75 0 01-.75-.75zM12 19.5a1 1 0 100-2 1 1 0 000 2z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 2.75C4 1.784 4.784 1 5.75 1h12.5c.966 0 1.75.784 1.75 1.75v18.5A1.75 1.75 0 0118.25 23H5.75A1.75 1.75 0 014 21.25zm1.75-.25a.25.25 0 00-.25.25v18.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	diamond: diamond,
	diff: diff,
	"diff-added": {
	name: "diff-added",
	keywords: [
		"new",
		"addition",
		"plus"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zm10.5 1.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zm10.5 1.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"diff-ignored": {
	name: "diff-ignored",
	keywords: [
		"slash"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm8.53 3.28l-5.5 5.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l5.5-5.5a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm8.53 3.28l-5.5 5.5a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l5.5-5.5a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"diff-modified": {
	name: "diff-modified",
	keywords: [
		"dot",
		"changed",
		"updated"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM8 10a2 2 0 11-.001-3.999A2 2 0 018 10z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM8 10a2 2 0 11-.001-3.999A2 2 0 018 10z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"diff-removed": {
	name: "diff-removed",
	keywords: [
		"deleted",
		"subtracted",
		"dash"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm8.5 6.25h-6.5a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm8.5 6.25h-6.5a.75.75 0 010-1.5h6.5a.75.75 0 010 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"diff-renamed": {
	name: "diff-renamed",
	keywords: [
		"moved",
		"arrow"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm9.03 6.03l-3.25 3.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.97-1.97H4.75a.75.75 0 010-1.5h4.69L7.47 5.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l3.25 3.25a.75.75 0 010 1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.25 1c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM2.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zm9.03 6.03l-3.25 3.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.97-1.97H4.75a.75.75 0 010-1.5h4.69L7.47 5.28a.751.751 0 01.018-1.042.751.751 0 011.042-.018l3.25 3.25a.75.75 0 010 1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	dot: dot,
	"dot-fill": {
	name: "dot-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 4a4 4 0 110 8 4 4 0 010-8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 4a4 4 0 110 8 4 4 0 010-8z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 18a6 6 0 100-12 6 6 0 000 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 18a6 6 0 100-12 6 6 0 000 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	download: download,
	duplicate: duplicate,
	ellipsis: ellipsis,
	eye: eye,
	"eye-closed": {
	name: "eye-closed",
	keywords: [
		"hidden",
		"invisible",
		"concealed",
		""
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.143 2.31a.75.75 0 011.047-.167l14.5 10.5a.75.75 0 11-.88 1.214l-2.248-1.628C11.346 13.19 9.792 14 8 14c-1.981 0-3.67-.992-4.933-2.078C1.797 10.832.88 9.577.43 8.9a1.619 1.619 0 010-1.797c.353-.533.995-1.42 1.868-2.305L.31 3.357A.75.75 0 01.143 2.31zm1.536 5.622A.12.12 0 001.657 8c0 .021.006.045.022.068.412.621 1.242 1.75 2.366 2.717C5.175 11.758 6.527 12.5 8 12.5c1.195 0 2.31-.488 3.29-1.191L9.063 9.695A2 2 0 016.058 7.52L3.529 5.688a14.207 14.207 0 00-1.85 2.244zM8 3.5c-.516 0-1.017.09-1.499.251a.75.75 0 11-.473-1.423A6.207 6.207 0 018 2c1.981 0 3.67.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 010 1.798c-.11.166-.248.365-.41.587a.75.75 0 11-1.21-.887c.148-.201.272-.382.371-.53a.119.119 0 000-.137c-.412-.621-1.242-1.75-2.366-2.717C10.825 4.242 9.473 3.5 8 3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.143 2.31a.75.75 0 011.047-.167l14.5 10.5a.75.75 0 11-.88 1.214l-2.248-1.628C11.346 13.19 9.792 14 8 14c-1.981 0-3.67-.992-4.933-2.078C1.797 10.832.88 9.577.43 8.9a1.619 1.619 0 010-1.797c.353-.533.995-1.42 1.868-2.305L.31 3.357A.75.75 0 01.143 2.31zm1.536 5.622A.12.12 0 001.657 8c0 .021.006.045.022.068.412.621 1.242 1.75 2.366 2.717C5.175 11.758 6.527 12.5 8 12.5c1.195 0 2.31-.488 3.29-1.191L9.063 9.695A2 2 0 016.058 7.52L3.529 5.688a14.207 14.207 0 00-1.85 2.244zM8 3.5c-.516 0-1.017.09-1.499.251a.75.75 0 11-.473-1.423A6.207 6.207 0 018 2c1.981 0 3.67.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 010 1.798c-.11.166-.248.365-.41.587a.75.75 0 11-1.21-.887c.148-.201.272-.382.371-.53a.119.119 0 000-.137c-.412-.621-1.242-1.75-2.366-2.717C10.825 4.242 9.473 3.5 8 3.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.052 5.837A9.715 9.715 0 0112 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.11.11 0 01.016.055.122.122 0 01-.017.06 16.766 16.766 0 01-1.53 2.218.75.75 0 101.163.946 18.253 18.253 0 001.67-2.42 1.607 1.607 0 00.001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 00.604 1.373zm11.114 12.15C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.606 1.606 0 01.001-1.6A18.283 18.283 0 013.648 7.01L1.317 5.362a.75.75 0 11.866-1.224l20.5 14.5a.75.75 0 11-.866 1.224zM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.112.112 0 00-.017.059c0 .015.003.034.016.055.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 01-5.583-3.949L4.902 7.899z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.052 5.837A9.715 9.715 0 0112 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.11.11 0 01.016.055.122.122 0 01-.017.06 16.766 16.766 0 01-1.53 2.218.75.75 0 101.163.946 18.253 18.253 0 001.67-2.42 1.607 1.607 0 00.001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 00.604 1.373zm11.114 12.15C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.606 1.606 0 01.001-1.6A18.283 18.283 0 013.648 7.01L1.317 5.362a.75.75 0 11.866-1.224l20.5 14.5a.75.75 0 11-.866 1.224zM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.112.112 0 00-.017.059c0 .015.003.034.016.055.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 01-5.583-3.949L4.902 7.899z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-discussion": {
	name: "feed-discussion",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zM4 5v5a1 1 0 001 1h1v1.5a.5.5 0 00.854.354L8.707 11H11a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zM4 5v5a1 1 0 001 1h1v1.5a.5.5 0 00.854.354L8.707 11H11a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-forked": {
	name: "feed-forked",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zM6 6.928a1.75 1.75 0 10-1 0V7.5A1.5 1.5 0 006.5 9h1v1.072a1.75 1.75 0 101 0V9h1A1.5 1.5 0 0011 7.5v-.572a1.75 1.75 0 10-1 0V7.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zM6 6.928a1.75 1.75 0 10-1 0V7.5A1.5 1.5 0 006.5 9h1v1.072a1.75 1.75 0 101 0V9h1A1.5 1.5 0 0011 7.5v-.572a1.75 1.75 0 10-1 0V7.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-heart": {
	name: "feed-heart",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm2.33-11.5c-1.22 0-1.83.5-2.323 1.136C7.513 5 6.903 4.5 5.682 4.5c-1.028 0-2.169.784-2.169 2.5 0 1.499 1.493 3.433 3.246 4.517.52.321.89.479 1.248.484.357-.005.728-.163 1.247-.484C11.007 10.433 12.5 8.5 12.5 7c0-1.716-1.14-2.5-2.17-2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm2.33-11.5c-1.22 0-1.83.5-2.323 1.136C7.513 5 6.903 4.5 5.682 4.5c-1.028 0-2.169.784-2.169 2.5 0 1.499 1.493 3.433 3.246 4.517.52.321.89.479 1.248.484.357-.005.728-.163 1.247-.484C11.007 10.433 12.5 8.5 12.5 7c0-1.716-1.14-2.5-2.17-2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-merged": {
	name: "feed-merged",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm.25-11.25A1.75 1.75 0 106 6.428v3.144a1.75 1.75 0 101 0V8.236A2.99 2.99 0 009 9h.571a1.75 1.75 0 100-1H9a2 2 0 01-1.957-1.586A1.75 1.75 0 008.25 4.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm.25-11.25A1.75 1.75 0 106 6.428v3.144a1.75 1.75 0 101 0V8.236A2.99 2.99 0 009 9h.571a1.75 1.75 0 100-1H9a2 2 0 01-1.957-1.586A1.75 1.75 0 008.25 4.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-person": {
	name: "feed-person",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm.847-8.145a2.502 2.502 0 10-1.694 0C5.471 8.261 4 9.775 4 11c0 .395.145.995 1 .995h6c.855 0 1-.6 1-.995 0-1.224-1.47-2.74-3.153-3.145z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm.847-8.145a2.502 2.502 0 10-1.694 0C5.471 8.261 4 9.775 4 11c0 .395.145.995 1 .995h6c.855 0 1-.6 1-.995 0-1.224-1.47-2.74-3.153-3.145z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-repo": {
	name: "feed-repo",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zM5.5 4A1.5 1.5 0 004 5.5v5c0 .828.5 1.5 1 1.5v-1a1 1 0 011-1h5v1h-1v1h1.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5zm.5 7.25v2.514a.25.25 0 00.426.178l.898-.888a.25.25 0 01.352 0l.898.888A.25.25 0 009 13.764V11H6.25a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zM5.5 4A1.5 1.5 0 004 5.5v5c0 .828.5 1.5 1 1.5v-1a1 1 0 011-1h5v1h-1v1h1.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5zm.5 7.25v2.514a.25.25 0 00.426.178l.898-.888a.25.25 0 01.352 0l.898.888A.25.25 0 009 13.764V11H6.25a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-rocket": {
	name: "feed-rocket",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm3.031-12a4.38 4.38 0 00-3.097 1.283l-.23.229c-.156.157-.308.32-.452.49H5.65a.876.876 0 00-.746.417l-.856 1.388a.377.377 0 00.21.556l1.552.477 1.35 1.35.478 1.553a.374.374 0 00.555.21l1.389-.855a.876.876 0 00.416-.746V8.747c.17-.144.333-.295.49-.452l.23-.23A4.379 4.379 0 0012 4.969v-.093A.876.876 0 0011.124 4zm-5.107 7.144h-.001a.809.809 0 00-1.33-.881c-.395.394-.564 1.258-.62 1.62a.12.12 0 00.035.108.12.12 0 00.108.035c.362-.056 1.226-.225 1.62-.619a.803.803 0 00.188-.263z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm3.031-12a4.38 4.38 0 00-3.097 1.283l-.23.229c-.156.157-.308.32-.452.49H5.65a.876.876 0 00-.746.417l-.856 1.388a.377.377 0 00.21.556l1.552.477 1.35 1.35.478 1.553a.374.374 0 00.555.21l1.389-.855a.876.876 0 00.416-.746V8.747c.17-.144.333-.295.49-.452l.23-.23A4.379 4.379 0 0012 4.969v-.093A.876.876 0 0011.124 4zm-5.107 7.144h-.001a.809.809 0 00-1.33-.881c-.395.394-.564 1.258-.62 1.62a.12.12 0 00.035.108.12.12 0 00.108.035c.362-.056 1.226-.225 1.62-.619a.803.803 0 00.188-.263z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-star": {
	name: "feed-star",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zm.252-12.932a.476.476 0 00-.682.195l-1.2 2.432-2.684.39a.477.477 0 00-.266.816l1.944 1.892-.46 2.674a.479.479 0 00.694.504L8 10.709l2.4 1.261a.478.478 0 00.694-.504l-.458-2.673L12.578 6.9a.479.479 0 00-.265-.815l-2.685-.39-1.2-2.432a.473.473 0 00-.176-.195z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zm.252-12.932a.476.476 0 00-.682.195l-1.2 2.432-2.684.39a.477.477 0 00-.266.816l1.944 1.892-.46 2.674a.479.479 0 00.694.504L8 10.709l2.4 1.261a.478.478 0 00.694-.504l-.458-2.673L12.578 6.9a.479.479 0 00-.265-.815l-2.685-.39-1.2-2.432a.473.473 0 00-.176-.195z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-tag": {
	name: "feed-tag",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.22 6.5a.72.72 0 11-1.44 0 .72.72 0 011.44 0z\"></path><path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zM4 5v3.38c.001.397.159.778.44 1.059l3.211 3.213a1.202 1.202 0 001.698 0l3.303-3.303a1.202 1.202 0 000-1.698L9.439 4.44A1.5 1.5 0 008.379 4H5a1 1 0 00-1 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.22 6.5a.72.72 0 11-1.44 0 .72.72 0 011.44 0z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zM4 5v3.38c.001.397.159.778.44 1.059l3.211 3.213a1.202 1.202 0 001.698 0l3.303-3.303a1.202 1.202 0 000-1.698L9.439 4.44A1.5 1.5 0 008.379 4H5a1 1 0 00-1 1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"feed-trophy": {
	name: "feed-trophy",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11 5h1v1.146a1 1 0 01-.629.928L11 7.223V5zM5 7.223l-.371-.149A1 1 0 014 6.146V5h1v2.223z\"></path><path d=\"M8 16A8 8 0 118 0a8 8 0 010 16zM3 5v1.146a2 2 0 001.257 1.858l.865.346a3.005 3.005 0 002.294 2.093C7.22 11.404 6.658 12 5.502 12H5.5a.5.5 0 000 1h5a.5.5 0 000-1c-1.158 0-1.72-.595-1.916-1.557a3.005 3.005 0 002.294-2.094l.865-.346A2 2 0 0013 6.146V5a1 1 0 00-1-1H4a1 1 0 00-1 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11 5h1v1.146a1 1 0 01-.629.928L11 7.223V5zM5 7.223l-.371-.149A1 1 0 014 6.146V5h1v2.223z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 16A8 8 0 118 0a8 8 0 010 16zM3 5v1.146a2 2 0 001.257 1.858l.865.346a3.005 3.005 0 002.294 2.093C7.22 11.404 6.658 12 5.502 12H5.5a.5.5 0 000 1h5a.5.5 0 000-1c-1.158 0-1.72-.595-1.916-1.557a3.005 3.005 0 002.294-2.094l.865-.346A2 2 0 0013 6.146V5a1 1 0 00-1-1H4a1 1 0 00-1 1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	file: file,
	"file-added": {
	name: "file-added",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zm4.48 3.758a.75.75 0 01.755.745l.01 1.497h1.497a.75.75 0 010 1.5H9v1.507a.75.75 0 01-1.5 0V9.005l-1.502.01a.75.75 0 01-.01-1.5l1.507-.01-.01-1.492a.75.75 0 01.745-.755z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zm4.48 3.758a.75.75 0 01.755.745l.01 1.497h1.497a.75.75 0 010 1.5H9v1.507a.75.75 0 01-1.5 0V9.005l-1.502.01a.75.75 0 01-.01-1.5l1.507-.01-.01-1.492a.75.75 0 01.745-.755z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-badge": {
	name: "file-badge",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h8a1.75 1.75 0 011.508.862.75.75 0 11-1.289.768.25.25 0 00-.219-.13h-8z\"></path><path d=\"M8 7a3.999 3.999 0 017.605-1.733 4 4 0 01-1.115 4.863l.995 4.973a.75.75 0 01-.991.852l-2.409-.876a.248.248 0 00-.17 0l-2.409.876a.75.75 0 01-.991-.852l.994-4.973A3.994 3.994 0 018 7zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 6.5c-.373 0-.745-.051-1.104-.154l-.649 3.243 1.155-.42c.386-.14.81-.14 1.196 0l1.155.42-.649-3.243A4.004 4.004 0 0112 11z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 011 13.25V1.75C1 .784 1.784 0 2.75 0h8a1.75 1.75 0 011.508.862.75.75 0 11-1.289.768.25.25 0 00-.219-.13h-8z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 7a3.999 3.999 0 017.605-1.733 4 4 0 01-1.115 4.863l.995 4.973a.75.75 0 01-.991.852l-2.409-.876a.248.248 0 00-.17 0l-2.409.876a.75.75 0 01-.991-.852l.994-4.973A3.994 3.994 0 018 7zm4-2.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 6.5c-.373 0-.745-.051-1.104-.154l-.649 3.243 1.155-.42c.386-.14.81-.14 1.196 0l1.155.42-.649-3.243A4.004 4.004 0 0112 11z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-binary": {
	name: "file-binary",
	keywords: [
		"image",
		"video",
		"word",
		"powerpoint",
		"excel"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0114.25 15h-9a.75.75 0 010-1.5h9a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 0110 4.25V1.5H5.75a.25.25 0 00-.25.25v2a.75.75 0 01-1.5 0zm-4 6C0 6.784.784 6 1.75 6h1.5C4.216 6 5 6.784 5 7.75v2.5A1.75 1.75 0 013.25 12h-1.5A1.75 1.75 0 010 10.25zM6.75 6h1.5a.75.75 0 01.75.75v3.75h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75v-3h-.75a.75.75 0 010-1.5zm-5 1.5a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm9.75-5.938V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0114.25 15h-9a.75.75 0 010-1.5h9a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 0110 4.25V1.5H5.75a.25.25 0 00-.25.25v2a.75.75 0 01-1.5 0zm-4 6C0 6.784.784 6 1.75 6h1.5C4.216 6 5 6.784 5 7.75v2.5A1.75 1.75 0 013.25 12h-1.5A1.75 1.75 0 010 10.25zM6.75 6h1.5a.75.75 0 01.75.75v3.75h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75v-3h-.75a.75.75 0 010-1.5zm-5 1.5a.25.25 0 00-.25.25v2.5c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25v-2.5a.25.25 0 00-.25-.25zm9.75-5.938V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm12-.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z\"></path><path d=\"M0 13.75C0 12.784.784 12 1.75 12h3c.966 0 1.75.784 1.75 1.75v4a1.75 1.75 0 01-1.75 1.75h-3A1.75 1.75 0 010 17.75zm1.75-.25a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h3a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25zM9 12a.75.75 0 000 1.5h1.5V18H9a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12v-5.25a.75.75 0 00-.75-.75H9z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm12-.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 13.75C0 12.784.784 12 1.75 12h3c.966 0 1.75.784 1.75 1.75v4a1.75 1.75 0 01-1.75 1.75h-3A1.75 1.75 0 010 17.75zm1.75-.25a.25.25 0 00-.25.25v4c0 .138.112.25.25.25h3a.25.25 0 00.25-.25v-4a.25.25 0 00-.25-.25zM9 12a.75.75 0 000 1.5h1.5V18H9a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12v-5.25a.75.75 0 00-.75-.75H9z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-code": {
	name: "file-code",
	keywords: [
		"text",
		"javascript",
		"html",
		"css",
		"php",
		"ruby",
		"coffeescript",
		"sass",
		"scss"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0114.25 15h-9a.75.75 0 010-1.5h9a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 0110 4.25V1.5H5.75a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0zm1.72 4.97a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.47-1.47-1.47-1.47a.75.75 0 010-1.06zM3.28 7.78L1.81 9.25l1.47 1.47a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-2-2a.75.75 0 010-1.06l2-2a.751.751 0 011.042.018.751.751 0 01.018 1.042zm8.22-6.218V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0114.25 15h-9a.75.75 0 010-1.5h9a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 0110 4.25V1.5H5.75a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0zm1.72 4.97a.75.75 0 011.06 0l2 2a.75.75 0 010 1.06l-2 2a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.47-1.47-1.47-1.47a.75.75 0 010-1.06zM3.28 7.78L1.81 9.25l1.47 1.47a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-2-2a.75.75 0 010-1.06l2-2a.751.751 0 011.042.018.751.751 0 01.018 1.042zm8.22-6.218V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm12-.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z\"></path><path d=\"M4.53 12.24a.75.75 0 01-.039 1.06l-2.639 2.45 2.64 2.45a.75.75 0 11-1.022 1.1l-3.23-3a.75.75 0 010-1.1l3.23-3a.75.75 0 011.06.04zm3.979 1.06a.75.75 0 111.02-1.1l3.231 3a.75.75 0 010 1.1l-3.23 3a.75.75 0 11-1.021-1.1l2.639-2.45-2.64-2.45z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm12-.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.53 12.24a.75.75 0 01-.039 1.06l-2.639 2.45 2.64 2.45a.75.75 0 11-1.022 1.1l-3.23-3a.75.75 0 010-1.1l3.23-3a.75.75 0 011.06.04zm3.979 1.06a.75.75 0 111.02-1.1l3.231 3a.75.75 0 010 1.1l-3.23 3a.75.75 0 11-1.021-1.1l2.639-2.45-2.64-2.45z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-diff": {
	name: "file-diff",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zM8 3.25a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0V7h-1.5a.75.75 0 010-1.5h1.5V4A.75.75 0 018 3.25zm-3 8a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zM8 3.25a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0V7h-1.5a.75.75 0 010-1.5h1.5V4A.75.75 0 018 3.25zm-3 8a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.5 6.75a.75.75 0 00-1.5 0V9H8.75a.75.75 0 000 1.5H11v2.25a.75.75 0 001.5 0V10.5h2.25a.75.75 0 000-1.5H12.5V6.75zM8.75 16a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z\"></path><path d=\"M5 1h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H5a2 2 0 01-2-2V3a2 2 0 012-2zm-.5 2v18a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V7.018a.5.5 0 00-.146-.354l-4.018-4.018a.5.5 0 00-.354-.146H5a.5.5 0 00-.5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.5 6.75a.75.75 0 00-1.5 0V9H8.75a.75.75 0 000 1.5H11v2.25a.75.75 0 001.5 0V10.5h2.25a.75.75 0 000-1.5H12.5V6.75zM8.75 16a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 1h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H5a2 2 0 01-2-2V3a2 2 0 012-2zm-.5 2v18a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V7.018a.5.5 0 00-.146-.354l-4.018-4.018a.5.5 0 00-.354-.146H5a.5.5 0 00-.5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-directory": {
	name: "file-directory",
	keywords: [
		"folder"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75C0 1.784.784 1 1.75 1H5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1h6.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H7.5c-.55 0-1.07-.26-1.4-.7l-.9-1.2a.25.25 0 00-.2-.1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75C0 1.784.784 1 1.75 1H5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1h6.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H7.5c-.55 0-1.07-.26-1.4-.7l-.9-1.2a.25.25 0 00-.2-.1z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 4.75C2 3.784 2.784 3 3.75 3h4.971c.58 0 1.12.286 1.447.765l1.404 2.063c.046.069.124.11.207.11h8.471c.966 0 1.75.783 1.75 1.75V19.25A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V7.687a.25.25 0 00-.25-.25h-8.471a1.75 1.75 0 01-1.447-.765L8.928 4.61a.252.252 0 00-.208-.11z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 4.75C2 3.784 2.784 3 3.75 3h4.971c.58 0 1.12.286 1.447.765l1.404 2.063c.046.069.124.11.207.11h8.471c.966 0 1.75.783 1.75 1.75V19.25A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25zm1.75-.25a.25.25 0 00-.25.25v14.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V7.687a.25.25 0 00-.25-.25h-8.471a1.75 1.75 0 01-1.447-.765L8.928 4.61a.252.252 0 00-.208-.11z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-directory-fill": {
	name: "file-directory-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 4.75C2 3.784 2.784 3 3.75 3h4.971c.58 0 1.12.286 1.447.765l1.404 2.063c.046.069.124.11.207.11h8.471c.966 0 1.75.783 1.75 1.75V19.25A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 4.75C2 3.784 2.784 3 3.75 3h4.971c.58 0 1.12.286 1.447.765l1.404 2.063c.046.069.124.11.207.11h8.471c.966 0 1.75.783 1.75 1.75V19.25A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-directory-open-fill": {
	name: "file-directory-open-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.513 1.513A1.75 1.75 0 011.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1H13a1 1 0 011 1v.5H2.75a.75.75 0 000 1.5h11.978a1 1 0 01.994 1.117L15 13.25A1.75 1.75 0 0113.25 15H1.75A1.75 1.75 0 010 13.25V2.75c0-.464.184-.91.513-1.237z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.513 1.513A1.75 1.75 0 011.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1H13a1 1 0 011 1v.5H2.75a.75.75 0 000 1.5h11.978a1 1 0 01.994 1.117L15 13.25A1.75 1.75 0 0113.25 15H1.75A1.75 1.75 0 010 13.25V2.75c0-.464.184-.91.513-1.237z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-media": {
	name: "file-media",
	keywords: [
		"image",
		"video",
		"audio"
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M21.75 21.5H2.25A1.75 1.75 0 01.5 19.75V4.25c0-.966.784-1.75 1.75-1.75h19.5c.966 0 1.75.784 1.75 1.75v15.5a1.75 1.75 0 01-1.75 1.75zM2.25 4a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h3.178L14 10.977a1.749 1.749 0 012.506-.032L22 16.44V4.25a.25.25 0 00-.25-.25zM22 19.75v-1.19l-6.555-6.554a.248.248 0 00-.18-.073.247.247 0 00-.178.077L7.497 20H21.75a.25.25 0 00.25-.25zM10.5 9.25a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0zm-1.5 0a1.75 1.75 0 10-3.501.001A1.75 1.75 0 009 9.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M21.75 21.5H2.25A1.75 1.75 0 01.5 19.75V4.25c0-.966.784-1.75 1.75-1.75h19.5c.966 0 1.75.784 1.75 1.75v15.5a1.75 1.75 0 01-1.75 1.75zM2.25 4a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h3.178L14 10.977a1.749 1.749 0 012.506-.032L22 16.44V4.25a.25.25 0 00-.25-.25zM22 19.75v-1.19l-6.555-6.554a.248.248 0 00-.18-.073.247.247 0 00-.178.077L7.497 20H21.75a.25.25 0 00.25-.25zM10.5 9.25a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0zm-1.5 0a1.75 1.75 0 10-3.501.001A1.75 1.75 0 009 9.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-moved": {
	name: "file-moved",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073H3.75a.25.25 0 00-.25.25v6.5a.75.75 0 01-1.5 0v-6.5z\"></path><path d=\"M5.427 15.573l3.146-3.146a.25.25 0 000-.354L5.427 8.927A.25.25 0 005 9.104V11.5H.75a.75.75 0 000 1.5H5v2.396c0 .223.27.335.427.177z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073H3.75a.25.25 0 00-.25.25v6.5a.75.75 0 01-1.5 0v-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.427 15.573l3.146-3.146a.25.25 0 000-.354L5.427 8.927A.25.25 0 005 9.104V11.5H.75a.75.75 0 000 1.5H5v2.396c0 .223.27.335.427.177z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-removed": {
	name: "file-removed",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zm4.5 6h2.242a.75.75 0 010 1.5h-2.24l-2.254.015a.75.75 0 01-.01-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177l-2.914-2.914a.25.25 0 00-.177-.073zm4.5 6h2.242a.75.75 0 010 1.5h-2.24l-2.254.015a.75.75 0 01-.01-1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-submodule": {
	name: "file-submodule",
	keywords: [
		"folder"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75C0 1.784.784 1 1.75 1H5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1h6.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm9.42 9.36l2.883-2.677a.25.25 0 000-.366L9.42 6.39a.249.249 0 00-.42.183V8.5H4.75a.75.75 0 000 1.5H9v1.927c0 .218.26.331.42.183z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75C0 1.784.784 1 1.75 1H5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 00.2.1h6.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25zm9.42 9.36l2.883-2.677a.25.25 0 000-.366L9.42 6.39a.249.249 0 00-.42.183V8.5H4.75a.75.75 0 000 1.5H9v1.927c0 .218.26.331.42.183z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 4.75C2 3.784 2.784 3 3.75 3h4.965a1.75 1.75 0 011.456.78l1.406 2.109a.25.25 0 00.208.111h8.465c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25zm12.78 4.97a.749.749 0 00-1.275.326.749.749 0 00.215.734l1.72 1.72H6.75a.75.75 0 000 1.5h8.69l-1.72 1.72a.749.749 0 00.326 1.275.749.749 0 00.734-.215l3-3a.75.75 0 000-1.06z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 4.75C2 3.784 2.784 3 3.75 3h4.965a1.75 1.75 0 011.456.78l1.406 2.109a.25.25 0 00.208.111h8.465c.966 0 1.75.784 1.75 1.75v11.5A1.75 1.75 0 0120.25 21H3.75A1.75 1.75 0 012 19.25zm12.78 4.97a.749.749 0 00-1.275.326.749.749 0 00.215.734l1.72 1.72H6.75a.75.75 0 000 1.5h8.69l-1.72 1.72a.749.749 0 00.326 1.275.749.749 0 00.734-.215l3-3a.75.75 0 000-1.06z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-symlink-file": {
	name: "file-symlink-file",
	keywords: [
		"link",
		"alias"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0112.25 15h-7a.75.75 0 010-1.5h7a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75a.25.25 0 00-.25.25V4.5a.75.75 0 01-1.5 0zm-.5 10.487v1.013a.75.75 0 01-1.5 0v-1.012a3.748 3.748 0 013.77-3.749L4 8.49V6.573a.25.25 0 01.42-.183l2.883 2.678a.25.25 0 010 .366L4.42 12.111a.25.25 0 01-.42-.183V9.99l-.238-.003a2.25 2.25 0 00-2.262 2.25zm8-10.675V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0112.25 15h-7a.75.75 0 010-1.5h7a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75a.25.25 0 00-.25.25V4.5a.75.75 0 01-1.5 0zm-.5 10.487v1.013a.75.75 0 01-1.5 0v-1.012a3.748 3.748 0 013.77-3.749L4 8.49V6.573a.25.25 0 01.42-.183l2.883 2.678a.25.25 0 010 .366L4.42 12.111a.25.25 0 01-.42-.183V9.99l-.238-.003a2.25 2.25 0 00-2.262 2.25zm8-10.675V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm6.308 11.5l-2.104-2.236a.751.751 0 01.369-1.255.749.749 0 01.723.227l3.294 3.5a.75.75 0 010 1.028l-3.294 3.5a.749.749 0 01-1.275-.293.751.751 0 01.183-.735L9.308 16H4.09a2.59 2.59 0 00-2.59 2.59v3.16a.75.75 0 01-1.5 0v-3.16a4.09 4.09 0 014.09-4.09zM15 2.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2H4.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V8.5h-4a2 2 0 01-2-2v-4H5a.5.5 0 00-.5.5v6.25a.75.75 0 01-1.5 0zm6.308 11.5l-2.104-2.236a.751.751 0 01.369-1.255.749.749 0 01.723.227l3.294 3.5a.75.75 0 010 1.028l-3.294 3.5a.749.749 0 01-1.275-.293.751.751 0 01.183-.735L9.308 16H4.09a2.59 2.59 0 00-2.59 2.59v3.16a.75.75 0 01-1.5 0v-3.16a4.09 4.09 0 014.09-4.09zM15 2.5v4a.5.5 0 00.5.5h4a.5.5 0 00-.146-.336l-4.018-4.018A.5.5 0 0015 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"file-zip": {
	name: "file-zip",
	keywords: [
		"compress",
		"archive"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.5 1.75v11.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.748 1.748 0 012 13.25V1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.185 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0112.25 15h-.5a.75.75 0 010-1.5h.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177L9.513 1.573a.25.25 0 00-.177-.073H7.25a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h-3a.25.25 0 00-.25.25zm3.75 8.75h.5c.966 0 1.75.784 1.75 1.75v3a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-3c0-.966.784-1.75 1.75-1.75zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm.75 2.25h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM8 6.75A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zM8.75 3h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-1 2.5v2.25h1v-2.25a.25.25 0 00-.25-.25h-.5a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.5 1.75v11.5c0 .09.048.173.126.217a.75.75 0 01-.752 1.298A1.748 1.748 0 012 13.25V1.75C2 .784 2.784 0 3.75 0h5.586c.464 0 .909.185 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0112.25 15h-.5a.75.75 0 010-1.5h.5a.25.25 0 00.25-.25V4.664a.25.25 0 00-.073-.177L9.513 1.573a.25.25 0 00-.177-.073H7.25a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5h-3a.25.25 0 00-.25.25zm3.75 8.75h.5c.966 0 1.75.784 1.75 1.75v3a.75.75 0 01-.75.75h-2.5a.75.75 0 01-.75-.75v-3c0-.966.784-1.75 1.75-1.75zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm.75 2.25h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM8 6.75A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zM8.75 3h.5a.75.75 0 010 1.5h-.5a.75.75 0 010-1.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-1 2.5v2.25h1v-2.25a.25.25 0 00-.25-.25h-.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5 2.5a.5.5 0 00-.5.5v18a.5.5 0 00.5.5h1.75a.75.75 0 010 1.5H5a2 2 0 01-2-2V3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2h-2.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V7.018a.5.5 0 00-.146-.354l-4.018-4.018a.5.5 0 00-.354-.146H5z\"></path><path d=\"M11.5 15.75a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zm-.75-2.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM12.25 6a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zm-.75-2.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM9.75 13.5a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM9 11.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM9 5.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 019 5.25zM11 17h1a2 2 0 012 2v4.25a.75.75 0 01-.75.75h-3.5a.75.75 0 01-.75-.75V19a2 2 0 012-2zm-.5 2v3.5h2V19a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 2.5a.5.5 0 00-.5.5v18a.5.5 0 00.5.5h1.75a.75.75 0 010 1.5H5a2 2 0 01-2-2V3a2 2 0 012-2h9.982a2 2 0 011.414.586l4.018 4.018A2 2 0 0121 7.018V21a2 2 0 01-2 2h-2.75a.75.75 0 010-1.5H19a.5.5 0 00.5-.5V7.018a.5.5 0 00-.146-.354l-4.018-4.018a.5.5 0 00-.354-.146H5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.5 15.75a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zm-.75-2.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM12.25 6a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zm-.75-2.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM9.75 13.5a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM9 11.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM9 5.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 019 5.25zM11 17h1a2 2 0 012 2v4.25a.75.75 0 01-.75.75h-3.5a.75.75 0 01-.75-.75V19a2 2 0 012-2zm-.5 2v3.5h2V19a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	filter: filter,
	flame: flame,
	fold: fold,
	"fold-down": {
	name: "fold-down",
	keywords: [
		"unfold",
		"hide",
		"collapse",
		"down"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.177 14.323l2.896-2.896a.25.25 0 00-.177-.427H8.75V7.764a.75.75 0 10-1.5 0V11H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0zM2.25 5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 4.25a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zM8.25 5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 4.25a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.177 14.323l2.896-2.896a.25.25 0 00-.177-.427H8.75V7.764a.75.75 0 10-1.5 0V11H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0zM2.25 5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 4.25a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zM8.25 5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 4.25a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 19a.749.749 0 01-.53-.22l-3.25-3.25a.749.749 0 01.326-1.275.749.749 0 01.734.215L12 17.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734l-3.25 3.25A.749.749 0 0112 19z\"></path><path d=\"M12 18a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 18zM2.75 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 012.75 6zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 016.75 6zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 19a.749.749 0 01-.53-.22l-3.25-3.25a.749.749 0 01.326-1.275.749.749 0 01.734.215L12 17.19l2.72-2.72a.749.749 0 011.275.326.749.749 0 01-.215.734l-3.25 3.25A.749.749 0 0112 19z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 18a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 18zM2.75 6a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 012.75 6zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 016.75 6zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"fold-up": {
	name: "fold-up",
	keywords: [
		"unfold",
		"hide",
		"collapse",
		"up"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.823 1.677L4.927 4.573A.25.25 0 005.104 5H7.25v3.236a.75.75 0 101.5 0V5h2.146a.25.25 0 00.177-.427L8.177 1.677a.25.25 0 00-.354 0zM13.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-3.75.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM7.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM4 11.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM1.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.823 1.677L4.927 4.573A.25.25 0 005.104 5H7.25v3.236a.75.75 0 101.5 0V5h2.146a.25.25 0 00.177-.427L8.177 1.677a.25.25 0 00-.354 0zM13.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-3.75.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM7.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM4 11.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM1.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.47 5.22a.75.75 0 011.06 0l3.25 3.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L12 6.81 9.28 9.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042z\"></path><path d=\"M12 5.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0v-8A.75.75 0 0112 5.5zM2.75 18a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.47 5.22a.75.75 0 011.06 0l3.25 3.25a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018L12 6.81 9.28 9.53a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 5.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0v-8A.75.75 0 0112 5.5zM2.75 18a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm4 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	gear: gear,
	gift: gift,
	"git-branch": {
	name: "git-branch",
	keywords: [
		"fork",
		"branch",
		"git",
		"duplicate"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.5 3.25a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.493 2.493 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zm-6 0a.75.75 0 101.5 0 .75.75 0 00-1.5 0zm8.25-.75a.75.75 0 100 1.5.75.75 0 000-1.5zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.5 3.25a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.493 2.493 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zm-6 0a.75.75 0 101.5 0 .75.75 0 00-1.5 0zm8.25-.75a.75.75 0 100 1.5.75.75 0 000-1.5zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM2.5 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zm0 14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 21zm12.5-14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 6.5z\"></path><path d=\"M5.75 16.75A.75.75 0 015 16V8a.75.75 0 011.5 0v8a.75.75 0 01-.75.75z\"></path><path d=\"M17.5 8.75v-1H19v1a3.75 3.75 0 01-3.75 3.75h-7a1.75 1.75 0 00-1.75 1.75H5A3.25 3.25 0 018.25 11h7a2.25 2.25 0 002.25-2.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM2.5 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zm0 14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 21zm12.5-14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 16.75A.75.75 0 015 16V8a.75.75 0 011.5 0v8a.75.75 0 01-.75.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.5 8.75v-1H19v1a3.75 3.75 0 01-3.75 3.75h-7a1.75 1.75 0 00-1.75 1.75H5A3.25 3.25 0 018.25 11h7a2.25 2.25 0 002.25-2.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-commit": {
	name: "git-commit",
	keywords: [
		"save"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5zm-1.43-.75a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5zm-1.43-.75a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.944 11h4.306a.75.75 0 010 1.5h-4.306a5.001 5.001 0 01-9.888 0H2.75a.75.75 0 010-1.5h4.306a5.001 5.001 0 019.888 0zm-1.444.75a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.944 11h4.306a.75.75 0 010 1.5h-4.306a5.001 5.001 0 01-9.888 0H2.75a.75.75 0 010-1.5h4.306a5.001 5.001 0 019.888 0zm-1.444.75a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-compare": {
	name: "git-compare",
	keywords: [
		"difference",
		"changes"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.573.677A.25.25 0 0110 .854V2.5h1A2.5 2.5 0 0113.5 5v5.628a2.251 2.251 0 11-1.5 0V5a1 1 0 00-1-1h-1v1.646a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM6 12v-1.646a.25.25 0 01.427-.177l2.396 2.396a.25.25 0 010 .354l-2.396 2.396A.25.25 0 016 15.146V13.5H5A2.5 2.5 0 012.5 11V5.372a2.25 2.25 0 111.5 0V11a1 1 0 001 1zM4 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM12.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.573.677A.25.25 0 0110 .854V2.5h1A2.5 2.5 0 0113.5 5v5.628a2.251 2.251 0 11-1.5 0V5a1 1 0 00-1-1h-1v1.646a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM6 12v-1.646a.25.25 0 01.427-.177l2.396 2.396a.25.25 0 010 .354l-2.396 2.396A.25.25 0 016 15.146V13.5H5A2.5 2.5 0 012.5 11V5.372a2.25 2.25 0 111.5 0V11a1 1 0 001 1zM4 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zM12.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.5 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm3.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z\"></path><path d=\"M13.905 1.72a.75.75 0 010 1.06L12.685 4h4.065a3.75 3.75 0 013.75 3.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM7.5 4.75a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0zM4.25 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 004.25 6.5z\"></path><path d=\"M10.095 22.28a.75.75 0 010-1.06l1.22-1.22H7.25a3.75 3.75 0 01-3.75-3.75V7.5a.75.75 0 011.5 0v8.75a2.25 2.25 0 002.25 2.25h4.064l-1.22-1.22a.748.748 0 01.332-1.265.75.75 0 01.729.205l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a.75.75 0 01-1.06 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.5 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm3.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.905 1.72a.75.75 0 010 1.06L12.685 4h4.065a3.75 3.75 0 013.75 3.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM7.5 4.75a3.25 3.25 0 11-6.5 0 3.25 3.25 0 016.5 0zM4.25 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 004.25 6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.095 22.28a.75.75 0 010-1.06l1.22-1.22H7.25a3.75 3.75 0 01-3.75-3.75V7.5a.75.75 0 011.5 0v8.75a2.25 2.25 0 002.25 2.25h4.064l-1.22-1.22a.748.748 0 01.332-1.265.75.75 0 01.729.205l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a.75.75 0 01-1.06 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-merge": {
	name: "git-merge",
	keywords: [
		"join"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.45 5.154A4.25 4.25 0 009.25 7.5h1.378a2.251 2.251 0 110 1.5H9.25A5.734 5.734 0 015 7.123v3.505a2.25 2.25 0 11-1.5 0V5.372a2.25 2.25 0 111.95-.218zM4.25 13.5a.75.75 0 100-1.5.75.75 0 000 1.5zm8.5-4.5a.75.75 0 100-1.5.75.75 0 000 1.5zM5 3.25a.75.75 0 100 .005V3.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.45 5.154A4.25 4.25 0 009.25 7.5h1.378a2.251 2.251 0 110 1.5H9.25A5.734 5.734 0 015 7.123v3.505a2.25 2.25 0 11-1.5 0V5.372a2.25 2.25 0 111.95-.218zM4.25 13.5a.75.75 0 100-1.5.75.75 0 000 1.5zm8.5-4.5a.75.75 0 100-1.5.75.75 0 000 1.5zM5 3.25a.75.75 0 100 .005V3.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15 13.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-12.5 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zm0 14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 21zm12.5-6a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 15z\"></path><path d=\"M6.5 7.25c0 2.9 2.35 5.25 5.25 5.25h4.5V14h-4.5A6.75 6.75 0 015 7.25z\"></path><path d=\"M5.75 16.75A.75.75 0 015 16V8a.75.75 0 011.5 0v8a.75.75 0 01-.75.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 13.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-12.5 6a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zm0 14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 21zm12.5-6a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 15z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.5 7.25c0 2.9 2.35 5.25 5.25 5.25h4.5V14h-4.5A6.75 6.75 0 015 7.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 16.75A.75.75 0 015 16V8a.75.75 0 011.5 0v8a.75.75 0 01-.75.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-merge-queue": {
	name: "git-merge-queue",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.75 4.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM3 7.75a.75.75 0 011.5 0v2.878a2.251 2.251 0 11-1.5 0zm.75 5.75a.75.75 0 100-1.5.75.75 0 000 1.5zm5-7.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm5.75 2.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 4.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM3 7.75a.75.75 0 011.5 0v2.878a2.251 2.251 0 11-1.5 0zm.75 5.75a.75.75 0 100-1.5.75.75 0 000 1.5zm5-7.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm5.75 2.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-pull-request": {
	name: "git-pull-request",
	keywords: [
		"review"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zm5.677-.177L9.573.677A.25.25 0 0110 .854V2.5h1A2.5 2.5 0 0113.5 5v5.628a2.251 2.251 0 11-1.5 0V5a1 1 0 00-1-1h-1v1.646a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5zm8.25.75a.75.75 0 101.5 0 .75.75 0 00-1.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zm5.677-.177L9.573.677A.25.25 0 0110 .854V2.5h1A2.5 2.5 0 0113.5 5v5.628a2.251 2.251 0 11-1.5 0V5a1 1 0 00-1-1h-1v1.646a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5zm8.25.75a.75.75 0 101.5 0 .75.75 0 00-1.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-14.5 0a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM4.75 3a1.75 1.75 0 10.001 3.501A1.75 1.75 0 004.75 3zm0 14.5a1.75 1.75 0 10.001 3.501A1.75 1.75 0 004.75 17.5zm14.5 0a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z\"></path><path d=\"M13.405 1.72a.75.75 0 010 1.06L12.185 4h4.065A3.75 3.75 0 0120 7.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM4.75 7.25A.75.75 0 015.5 8v8A.75.75 0 014 16V8a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-14.5 0a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm0-14.5a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM4.75 3a1.75 1.75 0 10.001 3.501A1.75 1.75 0 004.75 3zm0 14.5a1.75 1.75 0 10.001 3.501A1.75 1.75 0 004.75 17.5zm14.5 0a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.405 1.72a.75.75 0 010 1.06L12.185 4h4.065A3.75 3.75 0 0120 7.75v8.75a.75.75 0 01-1.5 0V7.75a2.25 2.25 0 00-2.25-2.25h-4.064l1.22 1.22a.75.75 0 01-1.061 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 011.06 0zM4.75 7.25A.75.75 0 015.5 8v8A.75.75 0 014 16V8a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-pull-request-closed": {
	name: "git-pull-request-closed",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.25 1A2.25 2.25 0 014 5.372v5.256a2.251 2.251 0 11-1.5 0V5.372A2.251 2.251 0 013.25 1zm9.5 5.5a.75.75 0 01.75.75v3.378a2.251 2.251 0 11-1.5 0V7.25a.75.75 0 01.75-.75zm-2.03-5.273a.75.75 0 011.06 0l.97.97.97-.97a.748.748 0 011.265.332.75.75 0 01-.205.729l-.97.97.97.97a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-.97-.97-.97.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l.97-.97-.97-.97a.75.75 0 010-1.06zM2.5 3.25a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM3.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zm9.5 0a.75.75 0 100 1.5.75.75 0 000-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 1A2.25 2.25 0 014 5.372v5.256a2.251 2.251 0 11-1.5 0V5.372A2.251 2.251 0 013.25 1zm9.5 5.5a.75.75 0 01.75.75v3.378a2.251 2.251 0 11-1.5 0V7.25a.75.75 0 01.75-.75zm-2.03-5.273a.75.75 0 011.06 0l.97.97.97-.97a.748.748 0 011.265.332.75.75 0 01-.205.729l-.97.97.97.97a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018l-.97-.97-.97.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l.97-.97-.97-.97a.75.75 0 010-1.06zM2.5 3.25a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM3.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zm9.5 0a.75.75 0 100 1.5.75.75 0 000-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M22.266 2.711a.75.75 0 10-1.061-1.06l-1.983 1.983-1.984-1.983a.75.75 0 10-1.06 1.06l1.983 1.983-1.983 1.984a.75.75 0 001.06 1.06l1.984-1.983 1.983 1.983a.75.75 0 001.06-1.06l-1.983-1.984 1.984-1.983zM4.75 1.5a3.25 3.25 0 01.745 6.414A.827.827 0 015.5 8v8a.827.827 0 01-.005.086A3.25 3.25 0 014.75 22.5a3.25 3.25 0 01-.745-6.414A.827.827 0 014 16V8c0-.029.002-.057.005-.086A3.25 3.25 0 014.75 1.5zM16 19.25a3.252 3.252 0 012.5-3.163V9.625a.75.75 0 011.5 0v6.462a3.252 3.252 0 01-.75 6.413A3.25 3.25 0 0116 19.25zM3 4.75a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 4.75zm0 14.5a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 19.25zm16.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M22.266 2.711a.75.75 0 10-1.061-1.06l-1.983 1.983-1.984-1.983a.75.75 0 10-1.06 1.06l1.983 1.983-1.983 1.984a.75.75 0 001.06 1.06l1.984-1.983 1.983 1.983a.75.75 0 001.06-1.06l-1.983-1.984 1.984-1.983zM4.75 1.5a3.25 3.25 0 01.745 6.414A.827.827 0 015.5 8v8a.827.827 0 01-.005.086A3.25 3.25 0 014.75 22.5a3.25 3.25 0 01-.745-6.414A.827.827 0 014 16V8c0-.029.002-.057.005-.086A3.25 3.25 0 014.75 1.5zM16 19.25a3.252 3.252 0 012.5-3.163V9.625a.75.75 0 011.5 0v6.462a3.252 3.252 0 01-.75 6.413A3.25 3.25 0 0116 19.25zM3 4.75a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 4.75zm0 14.5a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 19.25zm16.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"git-pull-request-draft": {
	name: "git-pull-request-draft",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.25 1A2.25 2.25 0 014 5.372v5.256a2.251 2.251 0 11-1.5 0V5.372A2.251 2.251 0 013.25 1zm9.5 14a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM2.5 3.25a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM3.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zm9.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM14 7.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm0-4.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 1A2.25 2.25 0 014 5.372v5.256a2.251 2.251 0 11-1.5 0V5.372A2.251 2.251 0 013.25 1zm9.5 14a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM2.5 3.25a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM3.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zm9.5 0a.75.75 0 100 1.5.75.75 0 000-1.5zM14 7.5a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm0-4.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.75 1.5a3.25 3.25 0 01.745 6.414A.827.827 0 015.5 8v8a.827.827 0 01-.005.086A3.25 3.25 0 014.75 22.5a3.25 3.25 0 01-.745-6.414A.827.827 0 014 16V8c0-.029.002-.057.005-.086A3.25 3.25 0 014.75 1.5zM16 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM3 4.75a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 4.75zm0 14.5a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 19.25zm16.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501zm0-11.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM21 11.25a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 1.5a3.25 3.25 0 01.745 6.414A.827.827 0 015.5 8v8a.827.827 0 01-.005.086A3.25 3.25 0 014.75 22.5a3.25 3.25 0 01-.745-6.414A.827.827 0 014 16V8c0-.029.002-.057.005-.086A3.25 3.25 0 014.75 1.5zM16 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM3 4.75a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 4.75zm0 14.5a1.75 1.75 0 103.501-.001A1.75 1.75 0 003 19.25zm16.25-1.75a1.75 1.75 0 10.001 3.501 1.75 1.75 0 00-.001-3.501zm0-11.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM21 11.25a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	globe: globe,
	goal: goal,
	grabber: grabber,
	graph: graph,
	hash: hash$2,
	heading: heading,
	heart: heart,
	"heart-fill": {
	name: "heart-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 01-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 01-3.433 2.414 7.152 7.152 0 01-.31.17l-.018.01-.008.004a.75.75 0 01-.69 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 01-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 01-3.433 2.414 7.152 7.152 0 01-.31.17l-.018.01-.008.004a.75.75 0 01-.69 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	history: history,
	home: home,
	"home-fill": {
	name: "home-fill",
	keywords: [
	],
	heights: {
		"24": {
			width: 24,
			path: "<path d=\"M12.97 2.59a1.5 1.5 0 00-1.94 0l-7.5 6.363A1.5 1.5 0 003 10.097V19.5A1.5 1.5 0 004.5 21h4.75a.75.75 0 00.75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 001.5-1.5v-9.403a1.5 1.5 0 00-.53-1.144l-7.5-6.363z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.97 2.59a1.5 1.5 0 00-1.94 0l-7.5 6.363A1.5 1.5 0 003 10.097V19.5A1.5 1.5 0 004.5 21h4.75a.75.75 0 00.75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 001.5-1.5v-9.403a1.5 1.5 0 00-.53-1.144l-7.5-6.363z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"horizontal-rule": {
	name: "horizontal-rule",
	keywords: [
		"hr"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 7.75A.75.75 0 01.75 7h14.5a.75.75 0 010 1.5H.75A.75.75 0 010 7.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 7.75A.75.75 0 01.75 7h14.5a.75.75 0 010 1.5H.75A.75.75 0 010 7.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 12.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 12.75a.75.75 0 01.75-.75h18.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	hourglass: hourglass,
	hubot: hubot,
	"id-badge": {
	name: "id-badge",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3 7.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3zm10 .25a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM10.25 11a.75.75 0 000-1.5h-2.5a.75.75 0 000 1.5h2.5z\"></path><path d=\"M7.25 0h1.5c.966 0 1.75.784 1.75 1.75V3h3.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-8.5C0 3.784.784 3 1.75 3H5.5V1.75C5.5.784 6.284 0 7.25 0zm3.232 4.5A1.75 1.75 0 018.75 6h-1.5a1.75 1.75 0 01-1.732-1.5H1.75a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25zM7 1.75v2.5c0 .138.112.25.25.25h1.5A.25.25 0 009 4.25v-2.5a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 7.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3zm10 .25a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75zM10.25 11a.75.75 0 000-1.5h-2.5a.75.75 0 000 1.5h2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.25 0h1.5c.966 0 1.75.784 1.75 1.75V3h3.75c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25v-8.5C0 3.784.784 3 1.75 3H5.5V1.75C5.5.784 6.284 0 7.25 0zm3.232 4.5A1.75 1.75 0 018.75 6h-1.5a1.75 1.75 0 01-1.732-1.5H1.75a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25zM7 1.75v2.5c0 .138.112.25.25.25h1.5A.25.25 0 009 4.25v-2.5a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	image: image,
	inbox: inbox,
	infinity: infinity,
	info: info,
	"issue-closed": {
	name: "issue-closed",
	keywords: [
		"done",
		"complete"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z\"></path><path d=\"M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 10-13 0 6.5 6.5 0 0013 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.28 6.78a.75.75 0 00-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 10-13 0 6.5 6.5 0 0013 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"issue-draft": {
	name: "issue-draft",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M14.307 11.655a.75.75 0 01.165 1.048 8.05 8.05 0 01-1.769 1.77.75.75 0 01-.883-1.214 6.552 6.552 0 001.44-1.439.75.75 0 011.047-.165zm-2.652-9.962a.75.75 0 011.048-.165 8.05 8.05 0 011.77 1.769.75.75 0 01-1.214.883 6.552 6.552 0 00-1.439-1.44.75.75 0 01-.165-1.047zM6.749.097a8.074 8.074 0 012.502 0 .75.75 0 11-.233 1.482 6.558 6.558 0 00-2.036 0A.751.751 0 016.749.097zM.955 6.125a.75.75 0 01.624.857 6.558 6.558 0 000 2.036.75.75 0 11-1.482.233 8.074 8.074 0 010-2.502.75.75 0 01.858-.624zm14.09 0a.75.75 0 01.858.624c.13.829.13 1.673 0 2.502a.75.75 0 11-1.482-.233 6.558 6.558 0 000-2.036.75.75 0 01.624-.857zm-8.92 8.92a.75.75 0 01.857-.624 6.558 6.558 0 002.036 0 .75.75 0 11.233 1.482c-.829.13-1.673.13-2.502 0a.75.75 0 01-.624-.858zm-4.432-3.39a.75.75 0 011.048.165 6.552 6.552 0 001.439 1.44.751.751 0 01-.883 1.212 8.05 8.05 0 01-1.77-1.769.75.75 0 01.166-1.048zm2.652-9.962A.75.75 0 014.18 2.74a6.556 6.556 0 00-1.44 1.44.751.751 0 01-1.212-.883 8.05 8.05 0 011.769-1.77.75.75 0 011.048.166z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M14.307 11.655a.75.75 0 01.165 1.048 8.05 8.05 0 01-1.769 1.77.75.75 0 01-.883-1.214 6.552 6.552 0 001.44-1.439.75.75 0 011.047-.165zm-2.652-9.962a.75.75 0 011.048-.165 8.05 8.05 0 011.77 1.769.75.75 0 01-1.214.883 6.552 6.552 0 00-1.439-1.44.75.75 0 01-.165-1.047zM6.749.097a8.074 8.074 0 012.502 0 .75.75 0 11-.233 1.482 6.558 6.558 0 00-2.036 0A.751.751 0 016.749.097zM.955 6.125a.75.75 0 01.624.857 6.558 6.558 0 000 2.036.75.75 0 11-1.482.233 8.074 8.074 0 010-2.502.75.75 0 01.858-.624zm14.09 0a.75.75 0 01.858.624c.13.829.13 1.673 0 2.502a.75.75 0 11-1.482-.233 6.558 6.558 0 000-2.036.75.75 0 01.624-.857zm-8.92 8.92a.75.75 0 01.857-.624 6.558 6.558 0 002.036 0 .75.75 0 11.233 1.482c-.829.13-1.673.13-2.502 0a.75.75 0 01-.624-.858zm-4.432-3.39a.75.75 0 011.048.165 6.552 6.552 0 001.439 1.44.751.751 0 01-.883 1.212 8.05 8.05 0 01-1.77-1.769.75.75 0 01.166-1.048zm2.652-9.962A.75.75 0 014.18 2.74a6.556 6.556 0 00-1.44 1.44.751.751 0 01-1.212-.883 8.05 8.05 0 011.769-1.77.75.75 0 011.048.166z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.32 3.205a.75.75 0 011.046-.177 11.056 11.056 0 012.605 2.606.75.75 0 11-1.222.869 9.554 9.554 0 00-2.252-2.252.75.75 0 01-.177-1.046zm3.475 14.115a.75.75 0 01.176 1.046 11.07 11.07 0 01-2.605 2.605.75.75 0 11-.869-1.222 9.554 9.554 0 002.252-2.252.75.75 0 011.046-.177zM2.018 9.543a.75.75 0 01.615.864 9.571 9.571 0 000 3.186.75.75 0 11-1.48.25 11.07 11.07 0 010-3.686.75.75 0 01.865-.614zm7.525 12.439a.75.75 0 01.864-.615 9.571 9.571 0 003.186 0 .75.75 0 11.25 1.48 11.07 11.07 0 01-3.686 0 .75.75 0 01-.614-.865zM6.68 3.205a.75.75 0 01-.177 1.046A9.558 9.558 0 004.25 6.503a.75.75 0 11-1.223-.87 11.056 11.056 0 012.606-2.605.75.75 0 011.046.177zM3.205 17.32a.75.75 0 011.046.177 9.554 9.554 0 002.252 2.252.75.75 0 11-.87 1.223 11.056 11.056 0 01-2.605-2.606.75.75 0 01.177-1.046zm6.952-16.166a11.07 11.07 0 013.686 0 .75.75 0 01-.25 1.479 9.571 9.571 0 00-3.186 0 .75.75 0 11-.25-1.48zm11.825 8.389a.75.75 0 01.864.614 11.07 11.07 0 010 3.686.75.75 0 01-1.479-.25 9.571 9.571 0 000-3.186.75.75 0 01.615-.864z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.32 3.205a.75.75 0 011.046-.177 11.056 11.056 0 012.605 2.606.75.75 0 11-1.222.869 9.554 9.554 0 00-2.252-2.252.75.75 0 01-.177-1.046zm3.475 14.115a.75.75 0 01.176 1.046 11.07 11.07 0 01-2.605 2.605.75.75 0 11-.869-1.222 9.554 9.554 0 002.252-2.252.75.75 0 011.046-.177zM2.018 9.543a.75.75 0 01.615.864 9.571 9.571 0 000 3.186.75.75 0 11-1.48.25 11.07 11.07 0 010-3.686.75.75 0 01.865-.614zm7.525 12.439a.75.75 0 01.864-.615 9.571 9.571 0 003.186 0 .75.75 0 11.25 1.48 11.07 11.07 0 01-3.686 0 .75.75 0 01-.614-.865zM6.68 3.205a.75.75 0 01-.177 1.046A9.558 9.558 0 004.25 6.503a.75.75 0 11-1.223-.87 11.056 11.056 0 012.606-2.605.75.75 0 011.046.177zM3.205 17.32a.75.75 0 011.046.177 9.554 9.554 0 002.252 2.252.75.75 0 11-.87 1.223 11.056 11.056 0 01-2.605-2.606.75.75 0 01.177-1.046zm6.952-16.166a11.07 11.07 0 013.686 0 .75.75 0 01-.25 1.479 9.571 9.571 0 00-3.186 0 .75.75 0 11-.25-1.48zm11.825 8.389a.75.75 0 01.864.614 11.07 11.07 0 010 3.686.75.75 0 01-1.479-.25 9.571 9.571 0 000-3.186.75.75 0 01.615-.864z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"issue-opened": {
	name: "issue-opened",
	keywords: [
		"new"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"></path><path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12zm9.5 2a2 2 0 11-.001-3.999A2 2 0 0112 14z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12zm9.5 2a2 2 0 11-.001-3.999A2 2 0 0112 14z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"issue-reopened": {
	name: "issue-reopened",
	keywords: [
		"regression"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.029 2.217a6.5 6.5 0 019.437 5.11.75.75 0 101.492-.154 8 8 0 00-14.315-4.03L.427 1.927A.25.25 0 000 2.104V5.75A.25.25 0 00.25 6h3.646a.25.25 0 00.177-.427L2.715 4.215a6.491 6.491 0 012.314-1.998zM1.262 8.169a.75.75 0 00-1.22.658 8.001 8.001 0 0014.315 4.03l1.216 1.216a.25.25 0 00.427-.177V10.25a.25.25 0 00-.25-.25h-3.646a.25.25 0 00-.177.427l1.358 1.358a6.501 6.501 0 01-11.751-3.11.75.75 0 00-.272-.506z\"></path><path d=\"M9.06 9.06a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.029 2.217a6.5 6.5 0 019.437 5.11.75.75 0 101.492-.154 8 8 0 00-14.315-4.03L.427 1.927A.25.25 0 000 2.104V5.75A.25.25 0 00.25 6h3.646a.25.25 0 00.177-.427L2.715 4.215a6.491 6.491 0 012.314-1.998zM1.262 8.169a.75.75 0 00-1.22.658 8.001 8.001 0 0014.315 4.03l1.216 1.216a.25.25 0 00.427-.177V10.25a.25.25 0 00-.25-.25h-3.646a.25.25 0 00-.177.427l1.358 1.358a6.501 6.501 0 01-11.751-3.11.75.75 0 00-.272-.506z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.06 9.06a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z\"></path><path d=\"M13.414 13.414a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.414 13.414a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"issue-tracked-by": {
	name: "issue-tracked-by",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.5 8a6.5 6.5 0 0113 0A.75.75 0 0016 8a8 8 0 10-8 8 .75.75 0 000-1.5A6.5 6.5 0 011.5 8z\"></path><path d=\"M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1.5 1.75a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm2.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 8a6.5 6.5 0 0113 0A.75.75 0 0016 8a8 8 0 10-8 8 .75.75 0 000-1.5A6.5 6.5 0 011.5 8z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm1.5 1.75a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm2.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2.5 12a9.5 9.5 0 1119 0 .75.75 0 001.5 0c0-6.075-4.925-11-11-11S1 5.925 1 12s4.925 11 11 11a.75.75 0 000-1.5A9.5 9.5 0 012.5 12z\"></path><path d=\"M12 14a2 2 0 100-4 2 2 0 000 4zm2.5 2.75a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75zm3.75 2.75a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 12a9.5 9.5 0 1119 0 .75.75 0 001.5 0c0-6.075-4.925-11-11-11S1 5.925 1 12s4.925 11 11 11a.75.75 0 000-1.5A9.5 9.5 0 012.5 12z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 14a2 2 0 100-4 2 2 0 000 4zm2.5 2.75a.75.75 0 01.75-.75h7a.75.75 0 010 1.5h-7a.75.75 0 01-.75-.75zm3.75 2.75a.75.75 0 000 1.5h4a.75.75 0 000-1.5h-4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"issue-tracked-in": {
	name: "issue-tracked-in",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.5 8a6.5 6.5 0 0113 0A.75.75 0 0016 8a8 8 0 10-8 8 .75.75 0 000-1.5A6.5 6.5 0 011.5 8z\"></path><path d=\"M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3.573 5.823l-2.896-2.896a.25.25 0 010-.354l2.896-2.896a.25.25 0 01.427.177V11.5h3.25a.75.75 0 010 1.5H12v2.146a.25.25 0 01-.427.177z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 8a6.5 6.5 0 0113 0A.75.75 0 0016 8a8 8 0 10-8 8 .75.75 0 000-1.5A6.5 6.5 0 011.5 8z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm3.573 5.823l-2.896-2.896a.25.25 0 010-.354l2.896-2.896a.25.25 0 01.427.177V11.5h3.25a.75.75 0 010 1.5H12v2.146a.25.25 0 01-.427.177z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 2.5a9.5 9.5 0 100 19 .75.75 0 010 1.5C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11a.75.75 0 01-1.5 0A9.5 9.5 0 0012 2.5z\"></path><path d=\"M13.759 17.48l3.728 3.314a.308.308 0 00.513-.23V18h4.25a.75.75 0 000-1.5H18v-2.564a.308.308 0 00-.513-.23L13.76 17.02a.308.308 0 000 .46zM12 14a2 2 0 100-4 2 2 0 000 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 2.5a9.5 9.5 0 100 19 .75.75 0 010 1.5C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11a.75.75 0 01-1.5 0A9.5 9.5 0 0012 2.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.759 17.48l3.728 3.314a.308.308 0 00.513-.23V18h4.25a.75.75 0 000-1.5H18v-2.564a.308.308 0 00-.513-.23L13.76 17.02a.308.308 0 000 .46zM12 14a2 2 0 100-4 2 2 0 000 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	italic: italic,
	iterations: iterations,
	"kebab-horizontal": {
	name: "kebab-horizontal",
	keywords: [
		"kebab",
		"dot",
		"menu",
		"more"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20 14a2 2 0 11-.001-3.999A2 2 0 0120 14zM6 12a2 2 0 11-3.999.001A2 2 0 016 12zm8 0a2 2 0 11-3.999.001A2 2 0 0114 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20 14a2 2 0 11-.001-3.999A2 2 0 0120 14zM6 12a2 2 0 11-3.999.001A2 2 0 016 12zm8 0a2 2 0 11-3.999.001A2 2 0 0114 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	key: key,
	"key-asterisk": {
	name: "key-asterisk",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 2.75A2.75 2.75 0 012.75 0h10.5A2.75 2.75 0 0116 2.75v10.5A2.75 2.75 0 0113.25 16H2.75A2.75 2.75 0 010 13.25zM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25z\"></path><path d=\"M8 4a.75.75 0 01.75.75V6.7l1.69-.975a.75.75 0 01.75 1.3L9.5 8l1.69.976a.75.75 0 01-.75 1.298L8.75 9.3v1.951a.75.75 0 01-1.5 0V9.299l-1.69.976a.75.75 0 01-.75-1.3L6.5 8l-1.69-.975a.75.75 0 01.75-1.3l1.69.976V4.75A.75.75 0 018 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 2.75A2.75 2.75 0 012.75 0h10.5A2.75 2.75 0 0116 2.75v10.5A2.75 2.75 0 0113.25 16H2.75A2.75 2.75 0 010 13.25zM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 4a.75.75 0 01.75.75V6.7l1.69-.975a.75.75 0 01.75 1.3L9.5 8l1.69.976a.75.75 0 01-.75 1.298L8.75 9.3v1.951a.75.75 0 01-1.5 0V9.299l-1.69.976a.75.75 0 01-.75-1.3L6.5 8l-1.69-.975a.75.75 0 01.75-1.3l1.69.976V4.75A.75.75 0 018 4z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	law: law,
	"light-bulb": {
	name: "light-bulb",
	keywords: [
		"idea"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 01-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 00-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 01-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75zM5.75 12h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM6 15.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 01-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 00-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 01-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75zM5.75 12h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 010-1.5zM6 15.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 2.5c-3.81 0-6.5 2.743-6.5 6.119 0 1.536.632 2.572 1.425 3.56.172.215.347.422.527.635l.096.112c.21.25.427.508.63.774.404.531.783 1.128.995 1.834a.75.75 0 01-1.436.432c-.138-.46-.397-.89-.753-1.357a18.111 18.111 0 00-.582-.714l-.092-.11c-.18-.212-.37-.436-.555-.667C4.87 12.016 4 10.651 4 8.618 4 4.363 7.415 1 12 1s8 3.362 8 7.619c0 2.032-.87 3.397-1.755 4.5-.185.23-.375.454-.555.667l-.092.109c-.21.248-.405.481-.582.714-.356.467-.615.898-.753 1.357a.751.751 0 01-1.437-.432c.213-.706.592-1.303.997-1.834.202-.266.419-.524.63-.774l.095-.112c.18-.213.355-.42.527-.634.793-.99 1.425-2.025 1.425-3.561C18.5 5.243 15.81 2.5 12 2.5zM8.75 18h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5zm.75 3.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 2.5c-3.81 0-6.5 2.743-6.5 6.119 0 1.536.632 2.572 1.425 3.56.172.215.347.422.527.635l.096.112c.21.25.427.508.63.774.404.531.783 1.128.995 1.834a.75.75 0 01-1.436.432c-.138-.46-.397-.89-.753-1.357a18.111 18.111 0 00-.582-.714l-.092-.11c-.18-.212-.37-.436-.555-.667C4.87 12.016 4 10.651 4 8.618 4 4.363 7.415 1 12 1s8 3.362 8 7.619c0 2.032-.87 3.397-1.755 4.5-.185.23-.375.454-.555.667l-.092.109c-.21.248-.405.481-.582.714-.356.467-.615.898-.753 1.357a.751.751 0 01-1.437-.432c.213-.706.592-1.303.997-1.834.202-.266.419-.524.63-.774l.095-.112c.18-.213.355-.42.527-.634.793-.99 1.425-2.025 1.425-3.561C18.5 5.243 15.81 2.5 12 2.5zM8.75 18h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5zm.75 3.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	link: link,
	"link-external": {
	name: "link-external",
	keywords: [
		"out",
		"see",
		"more",
		"go",
		"to"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-3.5a.75.75 0 011.5 0v3.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm6.854-1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L19.94 3h-3.69a.75.75 0 01-.75-.75z\"></path><path d=\"M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 010 1.5h-8.5a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5a1.75 1.75 0 01-1.75 1.75H4.25a1.75 1.75 0 01-1.75-1.75V4.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.5 2.25a.75.75 0 01.75-.75h5.5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0V4.06l-6.22 6.22a.75.75 0 11-1.06-1.06L19.94 3h-3.69a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.5 4.25c0-.966.784-1.75 1.75-1.75h8.5a.75.75 0 010 1.5h-8.5a.25.25 0 00-.25.25v15.5c0 .138.112.25.25.25h15.5a.25.25 0 00.25-.25v-8.5a.75.75 0 011.5 0v8.5a1.75 1.75 0 01-1.75 1.75H4.25a1.75 1.75 0 01-1.75-1.75V4.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"list-ordered": {
	name: "list-ordered",
	keywords: [
		"numbers",
		"tasks",
		"todo",
		"items"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32a.5.5 0 01-.851-.525l.001-.001.001-.002.002-.004.007-.011c.097-.144.215-.273.348-.384.228-.19.588-.392 1.068-.392.468 0 .858.181 1.126.484.259.294.377.673.377 1.038 0 .987-.686 1.495-1.156 1.845l-.047.035c-.303.225-.522.4-.654.597h1.357a.5.5 0 010 1H.5a.5.5 0 01-.5-.5c0-1.005.692-1.52 1.167-1.875l.035-.025c.531-.396.8-.625.8-1.078a.57.57 0 00-.128-.376C1.806 10.068 1.695 10 1.5 10a.658.658 0 00-.429.163.835.835 0 00-.144.153zM2.003 2.5V6h.503a.5.5 0 010 1H.5a.5.5 0 010-1h.503V3.308l-.28.14a.5.5 0 01-.446-.895l1.003-.5a.5.5 0 01.723.447z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32a.5.5 0 01-.851-.525l.001-.001.001-.002.002-.004.007-.011c.097-.144.215-.273.348-.384.228-.19.588-.392 1.068-.392.468 0 .858.181 1.126.484.259.294.377.673.377 1.038 0 .987-.686 1.495-1.156 1.845l-.047.035c-.303.225-.522.4-.654.597h1.357a.5.5 0 010 1H.5a.5.5 0 01-.5-.5c0-1.005.692-1.52 1.167-1.875l.035-.025c.531-.396.8-.625.8-1.078a.57.57 0 00-.128-.376C1.806 10.068 1.695 10 1.5 10a.658.658 0 00-.429.163.835.835 0 00-.144.153zM2.003 2.5V6h.503a.5.5 0 010 1H.5a.5.5 0 010-1h.503V3.308l-.28.14a.5.5 0 01-.446-.895l1.003-.5a.5.5 0 01.723.447z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.604 3.089A.75.75 0 014 3.75V8.5h.75a.75.75 0 010 1.5h-3a.75.75 0 110-1.5h.75V5.151l-.334.223a.75.75 0 01-.832-1.248l1.5-1a.75.75 0 01.77-.037zM8.75 5.5a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zM5.5 15.75c0-.704-.271-1.286-.72-1.686a2.302 2.302 0 00-1.53-.564c-.535 0-1.094.178-1.53.565-.449.399-.72.982-.72 1.685a.75.75 0 001.5 0c0-.296.104-.464.217-.564A.805.805 0 013.25 15c.215 0 .406.072.533.185.113.101.217.268.217.565 0 .332-.069.48-.21.657-.092.113-.216.24-.403.419l-.147.14c-.152.144-.33.313-.52.504l-1.5 1.5a.75.75 0 00-.22.53v.25c0 .414.336.75.75.75H5A.75.75 0 005 19H3.31l.47-.47c.176-.176.333-.324.48-.465l.165-.156a5.98 5.98 0 00.536-.566c.358-.447.539-.925.539-1.593z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.604 3.089A.75.75 0 014 3.75V8.5h.75a.75.75 0 010 1.5h-3a.75.75 0 110-1.5h.75V5.151l-.334.223a.75.75 0 01-.832-1.248l1.5-1a.75.75 0 01.77-.037zM8.75 5.5a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zm0 6a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H8.75zM5.5 15.75c0-.704-.271-1.286-.72-1.686a2.302 2.302 0 00-1.53-.564c-.535 0-1.094.178-1.53.565-.449.399-.72.982-.72 1.685a.75.75 0 001.5 0c0-.296.104-.464.217-.564A.805.805 0 013.25 15c.215 0 .406.072.533.185.113.101.217.268.217.565 0 .332-.069.48-.21.657-.092.113-.216.24-.403.419l-.147.14c-.152.144-.33.313-.52.504l-1.5 1.5a.75.75 0 00-.22.53v.25c0 .414.336.75.75.75H5A.75.75 0 005 19H3.31l.47-.47c.176-.176.333-.324.48-.465l.165-.156a5.98 5.98 0 00.536-.566c.358-.447.539-.925.539-1.593z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"list-unordered": {
	name: "list-unordered",
	keywords: [
		"bullet",
		"point",
		"tasks",
		"todo",
		"items"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.75 2.5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zM2 14a1 1 0 110-2 1 1 0 010 2zm1-6a1 1 0 11-2 0 1 1 0 012 0zM2 4a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 2.5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm0 5h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zM2 14a1 1 0 110-2 1 1 0 010 2zm1-6a1 1 0 11-2 0 1 1 0 012 0zM2 4a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 5.5h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zM5 12a1 1 0 11-2 0 1 1 0 012 0zM4 7a1 1 0 110-2 1 1 0 010 2zm0 12a1 1 0 110-2 1 1 0 010 2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 5.5h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zM5 12a1 1 0 11-2 0 1 1 0 012 0zM4 7a1 1 0 110-2 1 1 0 010 2zm0 12a1 1 0 110-2 1 1 0 010 2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	location: location,
	lock: lock,
	log: log$2,
	"logo-gist": {
	name: "logo-gist",
	keywords: [
		"brand",
		"github",
		"logo"
	],
	heights: {
		"16": {
			width: 25,
			path: "<path d=\"M4.7 8.73v-1h3.52v5.69c-.78.37-1.95.64-3.59.64C1.11 14.06 0 11.37 0 8.03 0 4.69 1.13 2 4.63 2c1.62 0 2.64.33 3.28.66v1.05c-1.22-.5-2-.73-3.28-.73-2.57 0-3.48 2.21-3.48 5.06 0 2.85.91 5.05 3.47 5.05.89 0 1.98-.07 2.53-.34V8.73zm10.98.69h.03c2.22.2 2.75.95 2.75 2.23 0 1.21-.76 2.41-3.14 2.41-.75 0-1.83-.19-2.33-.39v-.94c.47.17 1.22.36 2.33.36 1.62 0 2.06-.69 2.06-1.42 0-.71-.22-1.21-1.77-1.34-2.26-.2-2.73-1-2.73-2.08 0-1.11.72-2.31 2.92-2.31.73 0 1.56.09 2.25.39v.94c-.61-.2-1.22-.36-2.27-.36-1.55 0-1.88.57-1.88 1.34 0 .69.28 1.04 1.78 1.17zm8.58-3.33v.85h-2.42v4.87c0 .95.53 1.34 1.5 1.34.2 0 .42 0 .61-.03v.89c-.17.03-.5.05-.69.05-1.31 0-2.5-.6-2.5-2.13v-5H19.2v-.48l1.56-.44V3.9l1.08-.31v2.5h2.42zm-13.17-.03v6.41c0 .54.19.7.67.7v.89c-1.14 0-1.72-.47-1.72-1.72V6.06h1.05zm.25-2.33c0 .44-.34.78-.78.78a.76.76 0 01-.77-.78c0-.44.32-.78.77-.78s.78.34.78.78z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "25",
					height: "16",
					viewBox: "0 0 25 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.7 8.73v-1h3.52v5.69c-.78.37-1.95.64-3.59.64C1.11 14.06 0 11.37 0 8.03 0 4.69 1.13 2 4.63 2c1.62 0 2.64.33 3.28.66v1.05c-1.22-.5-2-.73-3.28-.73-2.57 0-3.48 2.21-3.48 5.06 0 2.85.91 5.05 3.47 5.05.89 0 1.98-.07 2.53-.34V8.73zm10.98.69h.03c2.22.2 2.75.95 2.75 2.23 0 1.21-.76 2.41-3.14 2.41-.75 0-1.83-.19-2.33-.39v-.94c.47.17 1.22.36 2.33.36 1.62 0 2.06-.69 2.06-1.42 0-.71-.22-1.21-1.77-1.34-2.26-.2-2.73-1-2.73-2.08 0-1.11.72-2.31 2.92-2.31.73 0 1.56.09 2.25.39v.94c-.61-.2-1.22-.36-2.27-.36-1.55 0-1.88.57-1.88 1.34 0 .69.28 1.04 1.78 1.17zm8.58-3.33v.85h-2.42v4.87c0 .95.53 1.34 1.5 1.34.2 0 .42 0 .61-.03v.89c-.17.03-.5.05-.69.05-1.31 0-2.5-.6-2.5-2.13v-5H19.2v-.48l1.56-.44V3.9l1.08-.31v2.5h2.42zm-13.17-.03v6.41c0 .54.19.7.67.7v.89c-1.14 0-1.72-.47-1.72-1.72V6.06h1.05zm.25-2.33c0 .44-.34.78-.78.78a.76.76 0 01-.77-.78c0-.44.32-.78.77-.78s.78.34.78.78z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"logo-github": {
	name: "logo-github",
	keywords: [
		"brand",
		"github",
		"logo"
	],
	heights: {
		"16": {
			width: 45,
			path: "<path d=\"M8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17zm35.85 2.33c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88zM27.68 2.43c.09 0 .17.08.17.17v11.11c0 .09-.08.17-.17.17h-2.13c-.09 0-.17-.08-.17-.17l.02-4.75h-3.31v4.75c0 .09-.08.17-.17.17h-2.13c-.08 0-.17-.08-.17-.17V2.6c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v4.09h3.31V2.6c0-.09.08-.17.17-.17zm8.26 3.64c.11 0 .19.08.19.17l-.02 7.47c0 .09-.06.17-.17.17H34.6c-.07 0-.14-.04-.16-.09-.03-.06-.08-.45-.08-.45s-1.13.77-2.52.77c-1.69 0-2.92-.55-2.92-2.75V6.25c0-.09.08-.17.17-.17h2.14c.09 0 .17.08.17.17V11c0 .75.22 1.09.97 1.09s1.3-.39 1.3-.39V6.26c0-.11.06-.19.17-.19zm-17.406 5.971h.005a.177.177 0 01.141.179v1.5c0 .07-.03.14-.09.16-.1.05-.74.22-1.27.22-1.16 0-2.86-.25-2.86-2.69V8.13h-1.11c-.09 0-.17-.08-.17-.19V6.58c0-.08.05-.15.13-.17.07-.01 1.16-.28 1.16-.28V3.96c0-.08.05-.13.14-.13h2.16c.09 0 .14.05.14.13v2.11h1.59c.08 0 .16.08.16.17v1.7c0 .11-.07.19-.16.19h-1.59v3.131c0 .47.27.83 1.05.83.247 0 .481-.049.574-.05zM12.24 6.06c.09 0 .17.08.17.17v7.37c0 .18-.05.27-.25.27h-1.92c-.17 0-.3-.07-.3-.27V6.26c0-.11.08-.2.17-.2zm29.99 3.78c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25zM11.19 2.68c.75 0 1.36.61 1.36 1.38 0 .77-.61 1.38-1.36 1.38-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38zm7.34 9.35v.001l.01.01h-.001l-.005-.001v.001c-.009-.001-.015-.011-.024-.011z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "45",
					height: "16",
					viewBox: "0 0 45 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.81 7.35v5.74c0 .04-.01.11-.06.13 0 0-1.25.89-3.31.89-2.49 0-5.44-.78-5.44-5.92S2.58 1.99 5.1 2c2.18 0 3.06.49 3.2.58.04.05.06.09.06.14L7.94 4.5c0 .09-.09.2-.2.17-.36-.11-.9-.33-2.17-.33-1.47 0-3.05.42-3.05 3.73s1.5 3.7 2.58 3.7c.92 0 1.25-.11 1.25-.11v-2.3H4.88c-.11 0-.19-.08-.19-.17V7.35c0-.09.08-.17.19-.17h3.74c.11 0 .19.08.19.17zm35.85 2.33c0 3.43-1.11 4.41-3.05 4.41-1.64 0-2.52-.83-2.52-.83s-.04.46-.09.52c-.03.06-.08.08-.14.08h-1.48c-.1 0-.19-.08-.19-.17l.02-11.11c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v3.77s.82-.53 2.02-.53l-.01-.02c1.2 0 2.97.45 2.97 3.88zM27.68 2.43c.09 0 .17.08.17.17v11.11c0 .09-.08.17-.17.17h-2.13c-.09 0-.17-.08-.17-.17l.02-4.75h-3.31v4.75c0 .09-.08.17-.17.17h-2.13c-.08 0-.17-.08-.17-.17V2.6c0-.09.08-.17.17-.17h2.13c.09 0 .17.08.17.17v4.09h3.31V2.6c0-.09.08-.17.17-.17zm8.26 3.64c.11 0 .19.08.19.17l-.02 7.47c0 .09-.06.17-.17.17H34.6c-.07 0-.14-.04-.16-.09-.03-.06-.08-.45-.08-.45s-1.13.77-2.52.77c-1.69 0-2.92-.55-2.92-2.75V6.25c0-.09.08-.17.17-.17h2.14c.09 0 .17.08.17.17V11c0 .75.22 1.09.97 1.09s1.3-.39 1.3-.39V6.26c0-.11.06-.19.17-.19zm-17.406 5.971h.005a.177.177 0 01.141.179v1.5c0 .07-.03.14-.09.16-.1.05-.74.22-1.27.22-1.16 0-2.86-.25-2.86-2.69V8.13h-1.11c-.09 0-.17-.08-.17-.19V6.58c0-.08.05-.15.13-.17.07-.01 1.16-.28 1.16-.28V3.96c0-.08.05-.13.14-.13h2.16c.09 0 .14.05.14.13v2.11h1.59c.08 0 .16.08.16.17v1.7c0 .11-.07.19-.16.19h-1.59v3.131c0 .47.27.83 1.05.83.247 0 .481-.049.574-.05zM12.24 6.06c.09 0 .17.08.17.17v7.37c0 .18-.05.27-.25.27h-1.92c-.17 0-.3-.07-.3-.27V6.26c0-.11.08-.2.17-.2zm29.99 3.78c0-1.81-.73-2.05-1.5-1.97-.6.04-1.08.34-1.08.34v3.52s.49.34 1.22.36c1.03.03 1.36-.34 1.36-2.25zM11.19 2.68c.75 0 1.36.61 1.36 1.38 0 .77-.61 1.38-1.36 1.38-.77 0-1.38-.61-1.38-1.38 0-.77.61-1.38 1.38-1.38zm7.34 9.35v.001l.01.01h-.001l-.005-.001v.001c-.009-.001-.015-.011-.024-.011z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	mail: mail,
	"mark-github": {
	name: "mark-github",
	keywords: [
		"octocat",
		"brand",
		"github",
		"logo"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	markdown: markdown,
	megaphone: megaphone,
	mention: mention,
	meter: meter,
	milestone: milestone,
	mirror: mirror,
	moon: moon,
	"mortar-board": {
	name: "mortar-board",
	keywords: [
		"education",
		"learn",
		"teach"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.693 1.066a.747.747 0 01.614 0l7.25 3.25a.75.75 0 010 1.368L13 6.831v2.794c0 1.024-.81 1.749-1.66 2.173-.893.447-2.075.702-3.34.702-.278 0-.55-.012-.816-.036a.75.75 0 01.133-1.494c.22.02.45.03.683.03 1.082 0 2.025-.221 2.67-.543.69-.345.83-.682.83-.832V7.503L8.307 8.934a.747.747 0 01-.614 0L4 7.28v1.663c.296.105.575.275.812.512.438.438.688 1.059.688 1.796v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3c0-.737.25-1.358.688-1.796.237-.237.516-.407.812-.512V6.606L.443 5.684a.75.75 0 010-1.368zM2.583 5L8 7.428 13.416 5 8 2.572zM2.5 11.25v2.25H4v-2.25c0-.388-.125-.611-.25-.735a.697.697 0 00-.5-.203.707.707 0 00-.5.203c-.125.124-.25.347-.25.735z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.693 1.066a.747.747 0 01.614 0l7.25 3.25a.75.75 0 010 1.368L13 6.831v2.794c0 1.024-.81 1.749-1.66 2.173-.893.447-2.075.702-3.34.702-.278 0-.55-.012-.816-.036a.75.75 0 01.133-1.494c.22.02.45.03.683.03 1.082 0 2.025-.221 2.67-.543.69-.345.83-.682.83-.832V7.503L8.307 8.934a.747.747 0 01-.614 0L4 7.28v1.663c.296.105.575.275.812.512.438.438.688 1.059.688 1.796v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3c0-.737.25-1.358.688-1.796.237-.237.516-.407.812-.512V6.606L.443 5.684a.75.75 0 010-1.368zM2.583 5L8 7.428 13.416 5 8 2.572zM2.5 11.25v2.25H4v-2.25c0-.388-.125-.611-.25-.735a.697.697 0 00-.5-.203.707.707 0 00-.5.203c-.125.124-.25.347-.25.735z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.292 2.06v-.001l11.25 4.75a.749.749 0 010 1.382L19 10.108V15a.75.75 0 01-.11.391h-.001a2.84 2.84 0 01-.392.482c-.249.256-.625.58-1.163.896-1.08.638-2.776 1.23-5.334 1.23-.673 0-1.286-.041-1.846-.113a.75.75 0 01.192-1.487c.492.063 1.042.1 1.654.1 2.317 0 3.746-.533 4.572-1.021.31-.178.596-.397.849-.65l.079-.085V10.74l-5.208 2.2a.75.75 0 01-.584 0L5.75 10.424v3.17c.502.129.96.391 1.327.758.579.578.923 1.41.923 2.428v4.5a.761.761 0 01-.345.634 2.157 2.157 0 01-.21.117 3.923 3.923 0 01-.52.213A6.121 6.121 0 015 22.532a6.092 6.092 0 01-1.925-.288 4.065 4.065 0 01-.52-.213 1.816 1.816 0 01-.22-.124.757.757 0 01-.335-.624v-4.5c0-1.02.344-1.85.923-2.43a2.904 2.904 0 011.327-.757V9.793L.458 8.19a.75.75 0 010-1.38l11.25-4.75a.75.75 0 01.584 0zM12 11.436L21.322 7.5 12 3.564 2.678 7.5zM5 15c-.377 0-.745.141-1.017.413-.265.265-.483.7-.483 1.368v4.022c.299.105.797.228 1.5.228s1.201-.123 1.5-.228V16.78c0-.669-.218-1.103-.483-1.368A1.433 1.433 0 005 15z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.292 2.06v-.001l11.25 4.75a.749.749 0 010 1.382L19 10.108V15a.75.75 0 01-.11.391h-.001a2.84 2.84 0 01-.392.482c-.249.256-.625.58-1.163.896-1.08.638-2.776 1.23-5.334 1.23-.673 0-1.286-.041-1.846-.113a.75.75 0 01.192-1.487c.492.063 1.042.1 1.654.1 2.317 0 3.746-.533 4.572-1.021.31-.178.596-.397.849-.65l.079-.085V10.74l-5.208 2.2a.75.75 0 01-.584 0L5.75 10.424v3.17c.502.129.96.391 1.327.758.579.578.923 1.41.923 2.428v4.5a.761.761 0 01-.345.634 2.157 2.157 0 01-.21.117 3.923 3.923 0 01-.52.213A6.121 6.121 0 015 22.532a6.092 6.092 0 01-1.925-.288 4.065 4.065 0 01-.52-.213 1.816 1.816 0 01-.22-.124.757.757 0 01-.335-.624v-4.5c0-1.02.344-1.85.923-2.43a2.904 2.904 0 011.327-.757V9.793L.458 8.19a.75.75 0 010-1.38l11.25-4.75a.75.75 0 01.584 0zM12 11.436L21.322 7.5 12 3.564 2.678 7.5zM5 15c-.377 0-.745.141-1.017.413-.265.265-.483.7-.483 1.368v4.022c.299.105.797.228 1.5.228s1.201-.123 1.5-.228V16.78c0-.669-.218-1.103-.483-1.368A1.433 1.433 0 005 15z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"multi-select": {
	name: "multi-select",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.75 7.5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-4-10h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5zM2 14a1 1 0 110-2 1 1 0 010 2zm1-6a1 1 0 11-2 0 1 1 0 012 0zm10.314-3.082L11.07 2.417A.25.25 0 0111.256 2h4.488a.25.25 0 01.186.417l-2.244 2.5a.25.25 0 01-.372 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 7.5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-4-10h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5zM2 14a1 1 0 110-2 1 1 0 010 2zm1-6a1 1 0 11-2 0 1 1 0 012 0zm10.314-3.082L11.07 2.417A.25.25 0 0111.256 2h4.488a.25.25 0 01.186.417l-2.244 2.5a.25.25 0 01-.372 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 11.5h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm-5-12h10a.75.75 0 010 1.5h-10a.75.75 0 010-1.5zM5 12a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 110-2 1 1 0 010 2zM19.309 7.918l-2.245-2.501A.25.25 0 0117.25 5h4.49a.25.25 0 01.185.417l-2.244 2.5a.25.25 0 01-.372 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 11.5h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm0 6h11.5a.75.75 0 010 1.5H8.75a.75.75 0 010-1.5zm-5-12h10a.75.75 0 010 1.5h-10a.75.75 0 010-1.5zM5 12a1 1 0 11-2 0 1 1 0 012 0zm-1 7a1 1 0 110-2 1 1 0 010 2zM19.309 7.918l-2.245-2.501A.25.25 0 0117.25 5h4.49a.25.25 0 01.185.417l-2.244 2.5a.25.25 0 01-.372 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	mute: mute,
	"no-entry": {
	name: "no-entry",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.25 7.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z\"></path><path d=\"M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 10-13 0 6.5 6.5 0 0013 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.25 7.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16 8A8 8 0 110 8a8 8 0 0116 0zm-1.5 0a6.5 6.5 0 10-13 0 6.5 6.5 0 0013 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12zm15.75.75H5.75a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12zm15.75.75H5.75a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"no-entry-fill": {
	name: "no-entry-fill",
	keywords: [
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M6 0a6 6 0 110 12A6 6 0 016 0zm3 5H3v2h6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6 0a6 6 0 110 12A6 6 0 016 0zm3 5H3v2h6z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"north-star": {
	name: "north-star",
	keywords: [
		"star",
		"snowflake",
		"asterisk"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.5 1.25a.75.75 0 00-1.5 0v8.69L6.447 5.385a.75.75 0 10-1.061 1.06L9.94 11H1.25a.75.75 0 000 1.5h8.69l-4.554 4.553a.75.75 0 001.06 1.061L11 13.561v8.689a.75.75 0 001.5 0v-8.69l4.553 4.554a.75.75 0 001.061-1.06L13.561 12.5h8.689a.75.75 0 000-1.5h-8.69l4.554-4.553a.75.75 0 10-1.06-1.061L12.5 9.939V1.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.5 1.25a.75.75 0 00-1.5 0v8.69L6.447 5.385a.75.75 0 10-1.061 1.06L9.94 11H1.25a.75.75 0 000 1.5h8.69l-4.554 4.553a.75.75 0 001.06 1.061L11 13.561v8.689a.75.75 0 001.5 0v-8.69l4.553 4.554a.75.75 0 001.061-1.06L13.561 12.5h8.689a.75.75 0 000-1.5h-8.69l4.554-4.553a.75.75 0 10-1.06-1.061L12.5 9.939V1.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	note: note,
	number: number,
	organization: organization,
	"package": {
	name: "package",
	keywords: [
		"box",
		"ship"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.878.392l5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 01-.872 1.514l-5.25 3.045a1.75 1.75 0 01-1.756 0l-5.25-3.045A1.75 1.75 0 011 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 011.756 0zM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 00-.25 0zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.878.392l5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 01-.872 1.514l-5.25 3.045a1.75 1.75 0 01-1.756 0l-5.25-3.045A1.75 1.75 0 011 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 011.756 0zM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 00-.25 0zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.876.64V.639l8.25 4.763c.541.313.875.89.875 1.515v9.525a1.75 1.75 0 01-.875 1.516l-8.25 4.762a1.748 1.748 0 01-1.75 0l-8.25-4.763a1.75 1.75 0 01-.875-1.515V6.917c0-.625.334-1.202.875-1.515L11.126.64a1.748 1.748 0 011.75 0zm-1 1.298L4.251 6.34l7.75 4.474 7.75-4.474-7.625-4.402a.248.248 0 00-.25 0zm.875 19.123l7.625-4.402a.25.25 0 00.125-.216V7.639l-7.75 4.474zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.876.64V.639l8.25 4.763c.541.313.875.89.875 1.515v9.525a1.75 1.75 0 01-.875 1.516l-8.25 4.762a1.748 1.748 0 01-1.75 0l-8.25-4.763a1.75 1.75 0 01-.875-1.515V6.917c0-.625.334-1.202.875-1.515L11.126.64a1.748 1.748 0 011.75 0zm-1 1.298L4.251 6.34l7.75 4.474 7.75-4.474-7.625-4.402a.248.248 0 00-.25 0zm.875 19.123l7.625-4.402a.25.25 0 00.125-.216V7.639l-7.75 4.474zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"package-dependencies": {
	name: "package-dependencies",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514zM7.125 1.69a.248.248 0 00-.25 0l-4.63 2.685L7 7.133l4.755-2.758zM1.5 11.049a.25.25 0 00.125.216l4.625 2.683V8.432L1.5 5.677zm11.672-.282L11.999 12h3.251a.75.75 0 010 1.5h-3.251l1.173 1.233a.75.75 0 11-1.087 1.034l-2.378-2.5a.75.75 0 010-1.034l2.378-2.5a.75.75 0 011.087 1.034z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514zM7.125 1.69a.248.248 0 00-.25 0l-4.63 2.685L7 7.133l4.755-2.758zM1.5 11.049a.25.25 0 00.125.216l4.625 2.683V8.432L1.5 5.677zm11.672-.282L11.999 12h3.251a.75.75 0 010 1.5h-3.251l1.173 1.233a.75.75 0 11-1.087 1.034l-2.378-2.5a.75.75 0 010-1.034l2.378-2.5a.75.75 0 011.087 1.034z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.126.64a1.748 1.748 0 011.75 0l8.25 4.762c.103.06.199.128.286.206a.75.75 0 01.554.96c.023.113.035.23.035.35v3.332a.75.75 0 01-1.5 0V7.64l-7.75 4.474V22.36a.75.75 0 01-1.125.65l-8.75-5.052a1.75 1.75 0 01-.875-1.515V6.917c0-.119.012-.236.035-.35a.749.749 0 01.554-.96c.088-.078.184-.146.286-.205L9.126.639zm.875 10.173v.001l7.75-4.474-7.625-4.402a.248.248 0 00-.25 0L2.251 6.34zm-8.5-3.175v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z\"></path><path d=\"M16.617 17.5l2.895-2.702a.75.75 0 00-1.024-1.096l-4.285 4a.75.75 0 000 1.096l4.285 4a.75.75 0 101.024-1.096L16.617 19h6.633a.75.75 0 000-1.5h-6.633z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.126.64a1.748 1.748 0 011.75 0l8.25 4.762c.103.06.199.128.286.206a.75.75 0 01.554.96c.023.113.035.23.035.35v3.332a.75.75 0 01-1.5 0V7.64l-7.75 4.474V22.36a.75.75 0 01-1.125.65l-8.75-5.052a1.75 1.75 0 01-.875-1.515V6.917c0-.119.012-.236.035-.35a.749.749 0 01.554-.96c.088-.078.184-.146.286-.205L9.126.639zm.875 10.173v.001l7.75-4.474-7.625-4.402a.248.248 0 00-.25 0L2.251 6.34zm-8.5-3.175v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.617 17.5l2.895-2.702a.75.75 0 00-1.024-1.096l-4.285 4a.75.75 0 000 1.096l4.285 4a.75.75 0 101.024-1.096L16.617 19h6.633a.75.75 0 000-1.5h-6.633z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"package-dependents": {
	name: "package-dependents",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514zM7.125 1.69a.248.248 0 00-.25 0l-4.63 2.685L7 7.133l4.755-2.758zM1.5 11.049a.25.25 0 00.125.216l4.625 2.683V8.432L1.5 5.677zm10.828 3.684l1.173-1.233H10.25a.75.75 0 010-1.5h3.251l-1.173-1.233a.75.75 0 111.087-1.034l2.378 2.5a.75.75 0 010 1.034l-2.378 2.5a.75.75 0 01-1.087-1.034z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514zM7.125 1.69a.248.248 0 00-.25 0l-4.63 2.685L7 7.133l4.755-2.758zM1.5 11.049a.25.25 0 00.125.216l4.625 2.683V8.432L1.5 5.677zm10.828 3.684l1.173-1.233H10.25a.75.75 0 010-1.5h3.251l-1.173-1.233a.75.75 0 111.087-1.034l2.378 2.5a.75.75 0 010 1.034l-2.378 2.5a.75.75 0 01-1.087-1.034z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.126.64a1.748 1.748 0 011.75 0l8.25 4.762c.103.06.199.128.286.206a.75.75 0 01.554.96c.023.113.035.23.035.35v3.332a.75.75 0 01-1.5 0V7.64l-7.75 4.474V22.36a.75.75 0 01-1.125.65l-8.75-5.052a1.75 1.75 0 01-.875-1.515V6.917c0-.119.012-.236.035-.35a.749.749 0 01.554-.96c.088-.078.184-.146.286-.205L9.126.639zm.875 10.173v.001l7.75-4.474-7.625-4.402a.248.248 0 00-.25 0L2.251 6.34zm-8.5-3.175v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z\"></path><path d=\"M21.347 17.5l-2.894-2.702a.75.75 0 111.023-1.096l4.286 4a.75.75 0 010 1.096l-4.286 4a.75.75 0 11-1.023-1.096L21.347 19h-6.633a.75.75 0 010-1.5h6.633z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.126.64a1.748 1.748 0 011.75 0l8.25 4.762c.103.06.199.128.286.206a.75.75 0 01.554.96c.023.113.035.23.035.35v3.332a.75.75 0 01-1.5 0V7.64l-7.75 4.474V22.36a.75.75 0 01-1.125.65l-8.75-5.052a1.75 1.75 0 01-.875-1.515V6.917c0-.119.012-.236.035-.35a.749.749 0 01.554-.96c.088-.078.184-.146.286-.205L9.126.639zm.875 10.173v.001l7.75-4.474-7.625-4.402a.248.248 0 00-.25 0L2.251 6.34zm-8.5-3.175v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M21.347 17.5l-2.894-2.702a.75.75 0 111.023-1.096l4.286 4a.75.75 0 010 1.096l-4.286 4a.75.75 0 11-1.023-1.096L21.347 19h-6.633a.75.75 0 010-1.5h6.633z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	paintbrush: paintbrush,
	"paper-airplane": {
	name: "paper-airplane",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M.989 8L.064 2.68a1.342 1.342 0 011.85-1.462l13.402 5.744a1.13 1.13 0 010 2.076L1.913 14.782a1.343 1.343 0 01-1.85-1.463L.99 8zm.603-5.288L2.38 7.25h4.87a.75.75 0 010 1.5H2.38l-.788 4.538L13.929 8z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M.989 8L.064 2.68a1.342 1.342 0 011.85-1.462l13.402 5.744a1.13 1.13 0 010 2.076L1.913 14.782a1.343 1.343 0 01-1.85-1.463L.99 8zm.603-5.288L2.38 7.25h4.87a.75.75 0 010 1.5H2.38l-.788 4.538L13.929 8z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.147 1.147 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.375 1.375 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.513 1.96a1.374 1.374 0 011.499-.21l19.335 9.215a1.147 1.147 0 010 2.07L3.012 22.25a1.374 1.374 0 01-1.947-1.46L2.49 12 1.065 3.21a1.375 1.375 0 01.448-1.25zm2.375 10.79l-1.304 8.042L21.031 12 2.584 3.208l1.304 8.042h7.362a.75.75 0 010 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	paperclip: paperclip,
	paste: paste,
	pencil: pencil,
	people: people,
	person: person,
	"person-add": {
	name: "person-add",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M7.9 8.548h-.001a5.528 5.528 0 013.1 4.659.75.75 0 11-1.498.086A4.01 4.01 0 005.5 9.5a4.01 4.01 0 00-4.001 3.793.75.75 0 11-1.498-.085 5.527 5.527 0 013.1-4.66 3.5 3.5 0 114.799 0zM13.25 0a.75.75 0 01.75.75V2h1.25a.75.75 0 010 1.5H14v1.25a.75.75 0 01-1.5 0V3.5h-1.25a.75.75 0 010-1.5h1.25V.75a.75.75 0 01.75-.75zM5.5 4a2 2 0 10-.001 3.999A2 2 0 005.5 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.9 8.548h-.001a5.528 5.528 0 013.1 4.659.75.75 0 11-1.498.086A4.01 4.01 0 005.5 9.5a4.01 4.01 0 00-4.001 3.793.75.75 0 11-1.498-.085 5.527 5.527 0 013.1-4.66 3.5 3.5 0 114.799 0zM13.25 0a.75.75 0 01.75.75V2h1.25a.75.75 0 010 1.5H14v1.25a.75.75 0 01-1.5 0V3.5h-1.25a.75.75 0 010-1.5h1.25V.75a.75.75 0 01.75-.75zM5.5 4a2 2 0 10-.001 3.999A2 2 0 005.5 4z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4 9.5a5 5 0 117.916 4.062 7.973 7.973 0 015.018 7.166.75.75 0 11-1.499.044 6.469 6.469 0 00-12.932 0 .75.75 0 01-1.499-.044 7.972 7.972 0 015.059-7.181A4.994 4.994 0 014 9.5zM9 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm10.25-5a.75.75 0 01.75.75V4h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V5.5h-2.25a.75.75 0 010-1.5h2.25V1.75a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4 9.5a5 5 0 117.916 4.062 7.973 7.973 0 015.018 7.166.75.75 0 11-1.499.044 6.469 6.469 0 00-12.932 0 .75.75 0 01-1.499-.044 7.972 7.972 0 015.059-7.181A4.994 4.994 0 014 9.5zM9 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm10.25-5a.75.75 0 01.75.75V4h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V5.5h-2.25a.75.75 0 010-1.5h2.25V1.75a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"person-fill": {
	name: "person-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.243 4.757a3.757 3.757 0 115.851 3.119 6.006 6.006 0 013.9 5.339.75.75 0 01-.715.784H2.721a.75.75 0 01-.714-.784 6.006 6.006 0 013.9-5.34 3.753 3.753 0 01-1.664-3.118z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.243 4.757a3.757 3.757 0 115.851 3.119 6.006 6.006 0 013.9 5.339.75.75 0 01-.715.784H2.721a.75.75 0 01-.714-.784 6.006 6.006 0 013.9-5.34 3.753 3.753 0 01-1.664-3.118z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12 2.5a5.25 5.25 0 00-2.519 9.857 9.005 9.005 0 00-6.477 8.37.75.75 0 00.727.773H20.27a.75.75 0 00.727-.772 9.005 9.005 0 00-6.477-8.37A5.25 5.25 0 0012 2.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 2.5a5.25 5.25 0 00-2.519 9.857 9.005 9.005 0 00-6.477 8.37.75.75 0 00.727.773H20.27a.75.75 0 00.727-.772 9.005 9.005 0 00-6.477-8.37A5.25 5.25 0 0012 2.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	pin: pin,
	play: play,
	plug: plug,
	plus: plus,
	"plus-circle": {
	name: "plus-circle",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm7.25-3.25v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5a.75.75 0 011.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1013 0 6.5 6.5 0 00-13 0zm7.25-3.25v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5a.75.75 0 011.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.75 7.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.75 7.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	project: project,
	"project-roadmap": {
	name: "project-roadmap",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 4.75A.75.75 0 015.75 4h5.5a.75.75 0 010 1.5h-5.5A.75.75 0 015 4.75zM6.75 10a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z\"></path><path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 4.75A.75.75 0 015.75 4h5.5a.75.75 0 010 1.5h-5.5A.75.75 0 015 4.75zM6.75 10a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 7a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zM7 11.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM9.75 15a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z\"></path><path d=\"M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 7a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zM7 11.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM9.75 15a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"project-symlink": {
	name: "project-symlink",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16h-8.5a.75.75 0 010-1.5h8.5a.25.25 0 00.25-.25V6.5h-13v1.75a.75.75 0 01-1.5 0zM6.5 5h8V1.75a.25.25 0 00-.25-.25H6.5zm-5 0H5V1.5H1.75a.25.25 0 00-.25.25z\"></path><path d=\"M1.5 13.737a2.25 2.25 0 012.262-2.25L4 11.49v1.938c0 .218.26.331.42.183l2.883-2.677a.25.25 0 000-.366L4.42 7.89a.25.25 0 00-.42.183V9.99l-.23-.001A3.75 3.75 0 000 13.738v1.012a.75.75 0 001.5 0v-1.013z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16h-8.5a.75.75 0 010-1.5h8.5a.25.25 0 00.25-.25V6.5h-13v1.75a.75.75 0 01-1.5 0zM6.5 5h8V1.75a.25.25 0 00-.25-.25H6.5zm-5 0H5V1.5H1.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.5 13.737a2.25 2.25 0 012.262-2.25L4 11.49v1.938c0 .218.26.331.42.183l2.883-2.677a.25.25 0 000-.366L4.42 7.89a.25.25 0 00-.42.183V9.99l-.23-.001A3.75 3.75 0 000 13.738v1.012a.75.75 0 001.5 0v-1.013z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H9.75a.75.75 0 010-1.5h10.5a.25.25 0 00.25-.25V9h-17v3A.75.75 0 012 12zM9 7.5h11.5V3.75a.25.25 0 00-.25-.25H9zm-5.5 0h4v-4H3.75a.25.25 0 00-.25.25z\"></path><path d=\"M9.308 14.5l-2.104-2.236a.75.75 0 111.092-1.028l3.294 3.5a.75.75 0 010 1.028l-3.294 3.5a.75.75 0 11-1.092-1.028L9.308 16H6.09a2.59 2.59 0 00-2.59 2.59v2.66a.75.75 0 01-1.5 0v-2.66a4.09 4.09 0 014.09-4.09h3.218z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H9.75a.75.75 0 010-1.5h10.5a.25.25 0 00.25-.25V9h-17v3A.75.75 0 012 12zM9 7.5h11.5V3.75a.25.25 0 00-.25-.25H9zm-5.5 0h4v-4H3.75a.25.25 0 00-.25.25z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.308 14.5l-2.104-2.236a.75.75 0 111.092-1.028l3.294 3.5a.75.75 0 010 1.028l-3.294 3.5a.75.75 0 11-1.092-1.028L9.308 16H6.09a2.59 2.59 0 00-2.59 2.59v2.66a.75.75 0 01-1.5 0v-2.66a4.09 4.09 0 014.09-4.09h3.218z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	pulse: pulse,
	question: question,
	quote: quote,
	read: read$1,
	"rel-file-path": {
	name: "rel-file-path",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.94 3.045a.75.75 0 00-1.38-.59l-4.5 10.5a.75.75 0 101.38.59l4.5-10.5zM5 11.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.94 3.045a.75.75 0 00-1.38-.59l-4.5 10.5a.75.75 0 101.38.59l4.5-10.5zM5 11.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M19.564 4.42a.75.75 0 00-1.378-.59l-6.75 15.75a.75.75 0 001.378.59l6.75-15.75zM7 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M19.564 4.42a.75.75 0 00-1.378-.59l-6.75 15.75a.75.75 0 001.378.59l6.75-15.75zM7 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	reply: reply,
	repo: repo,
	"repo-clone": {
	name: "repo-clone",
	keywords: [
		"book",
		"journal",
		"repository"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 1v9h10v3c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h7v1zm13-1c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-3v1h-1V8h-1c-.55 0-1-.45-1-1V0zm-4 11H1v2h2v-1h3v1h5zm4-6V1h-4v4zm0 2V6h-3v1zM4 3H3V2h1zm0 2H3V4h1zm0 2H3V6h1zm7 0V6h-1v1zM3 8h1v1H3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 1v9h10v3c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h7v1zm13-1c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-3v1h-1V8h-1c-.55 0-1-.45-1-1V0zm-4 11H1v2h2v-1h3v1h5zm4-6V1h-4v4zm0 2V6h-3v1zM4 3H3V2h1zm0 2H3V4h1zm0 2H3V6h1zm7 0V6h-1v1zM3 8h1v1H3z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-deleted": {
	name: "repo-deleted",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h4.75a.75.75 0 010 1.5H3.5a1 1 0 100 2h4.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9z\"></path><path d=\"M11.28 10.22a.75.75 0 10-1.06 1.06L11.94 13l-1.72 1.72a.75.75 0 101.06 1.06L13 14.06l1.72 1.72a.75.75 0 101.06-1.06L14.06 13l1.72-1.72a.75.75 0 10-1.06-1.06L13 11.94l-1.72-1.72z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h4.75a.75.75 0 010 1.5H3.5a1 1 0 100 2h4.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.28 10.22a.75.75 0 10-1.06 1.06L11.94 13l-1.72 1.72a.75.75 0 101.06 1.06L13 14.06l1.72 1.72a.75.75 0 101.06-1.06L14.06 13l1.72-1.72a.75.75 0 10-1.06-1.06L13 11.94l-1.72-1.72z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-forked": {
	name: "repo-forked",
	keywords: [
		"book",
		"journal",
		"copy"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.75 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM15 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-12.5 0a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zM12 21a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0012 21zm6.25-14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 6.5z\"></path><path d=\"M6.5 7.75v1A2.25 2.25 0 008.75 11h6.5a2.25 2.25 0 002.25-2.25v-1H19v1a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 8.75v-1z\"></path><path d=\"M11.25 16.25v-5h1.5v5h-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.75 19.25a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM15 4.75a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zm-12.5 0a3.25 3.25 0 116.5 0 3.25 3.25 0 01-6.5 0zM5.75 6.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 005.75 6.5zM12 21a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0012 21zm6.25-14.5a1.75 1.75 0 10-.001-3.501A1.75 1.75 0 0018.25 6.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.5 7.75v1A2.25 2.25 0 008.75 11h6.5a2.25 2.25 0 002.25-2.25v-1H19v1a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 8.75v-1z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.25 16.25v-5h1.5v5h-1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-locked": {
	name: "repo-locked",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h2.75a.75.75 0 010 1.5H3.5a1 1 0 100 2h2.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9z\"></path><path d=\"M9 10.168V9a3 3 0 116 0v1.168c.591.281 1 .884 1 1.582v2.5A1.75 1.75 0 0114.25 16h-4.5A1.75 1.75 0 018 14.25v-2.5c0-.698.409-1.3 1-1.582zM13.5 10V9a1.5 1.5 0 00-3 0v1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h2.75a.75.75 0 010 1.5H3.5a1 1 0 100 2h2.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9 10.168V9a3 3 0 116 0v1.168c.591.281 1 .884 1 1.582v2.5A1.75 1.75 0 0114.25 16h-4.5A1.75 1.75 0 018 14.25v-2.5c0-.698.409-1.3 1-1.582zM13.5 10V9a1.5 1.5 0 00-3 0v1z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M2 2.75A2.75 2.75 0 014.75 0h14.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0V1.5H4.75c-.69 0-1.25.56-1.25 1.25v12.651A2.987 2.987 0 015 15h6.25a.75.75 0 010 1.5H5A1.5 1.5 0 003.5 18v1.25c0 .69.56 1.25 1.25 1.25h6a.75.75 0 010 1.5h-6A2.75 2.75 0 012 19.25V2.75z\"></path><path d=\"M15 14.5a3.5 3.5 0 117 0V16h.25c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0122.25 24h-7.5A1.75 1.75 0 0113 22.25v-4.5c0-.966.784-1.75 1.75-1.75H15zm3.5-2a2 2 0 00-2 2V16h4v-1.5a2 2 0 00-2-2z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2.75A2.75 2.75 0 014.75 0h14.5a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0V1.5H4.75c-.69 0-1.25.56-1.25 1.25v12.651A2.987 2.987 0 015 15h6.25a.75.75 0 010 1.5H5A1.5 1.5 0 003.5 18v1.25c0 .69.56 1.25 1.25 1.25h6a.75.75 0 010 1.5h-6A2.75 2.75 0 012 19.25V2.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 14.5a3.5 3.5 0 117 0V16h.25c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0122.25 24h-7.5A1.75 1.75 0 0113 22.25v-4.5c0-.966.784-1.75 1.75-1.75H15zm3.5-2a2 2 0 00-2 2V16h4v-1.5a2 2 0 00-2-2z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-pull": {
	name: "repo-pull",
	keywords: [
		"book",
		"journal",
		"get"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11 7h1v6c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v2h-1V1H2v9h9zm2 1V6H7V4h6V2l3 3zm-2 3H1v2h2v-1h3v1h5zM4 2v1H3V2zm0 2v1H3V4zm0 2v1H3V6zM3 9V8h1v1z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11 7h1v6c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v2h-1V1H2v9h9zm2 1V6H7V4h6V2l3 3zm-2 3H1v2h2v-1h3v1h5zM4 2v1H3V2zm0 2v1H3V4zm0 2v1H3V6zM3 9V8h1v1z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-push": {
	name: "repo-push",
	keywords: [
		"book",
		"journal",
		"repository",
		"put"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.493 2.493 0 013.5 9h3.25a.75.75 0 010 1.5H3.5a1 1 0 000 2h5.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5zm13.23 7.79h-.001l-1.224-1.224v6.184a.75.75 0 01-1.5 0V9.066L10.28 10.29a.75.75 0 01-1.06-1.061l2.505-2.504a.75.75 0 011.06 0L15.29 9.23a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.493 2.493 0 013.5 9h3.25a.75.75 0 010 1.5H3.5a1 1 0 000 2h5.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5zm13.23 7.79h-.001l-1.224-1.224v6.184a.75.75 0 01-1.5 0V9.066L10.28 10.29a.75.75 0 01-1.06-1.061l2.505-2.504a.75.75 0 011.06 0L15.29 9.23a.751.751 0 01-.018 1.042.751.751 0 01-1.042.018z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M4.75 0A2.75 2.75 0 002 2.75v16.5A2.75 2.75 0 004.75 22h11a.75.75 0 000-1.5h-11c-.69 0-1.25-.56-1.25-1.25V18A1.5 1.5 0 015 16.5h7.25a.75.75 0 000-1.5H5c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H18.5v7a.75.75 0 001.5 0V.75a.75.75 0 00-.75-.75H4.75z\"></path><path d=\"M20 13.903l2.202 2.359a.75.75 0 001.096-1.024l-3.5-3.75a.75.75 0 00-1.096 0l-3.5 3.75a.75.75 0 101.096 1.024l2.202-2.36v9.348a.75.75 0 001.5 0v-9.347z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.75 0A2.75 2.75 0 002 2.75v16.5A2.75 2.75 0 004.75 22h11a.75.75 0 000-1.5h-11c-.69 0-1.25-.56-1.25-1.25V18A1.5 1.5 0 015 16.5h7.25a.75.75 0 000-1.5H5c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H18.5v7a.75.75 0 001.5 0V.75a.75.75 0 00-.75-.75H4.75z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20 13.903l2.202 2.359a.75.75 0 001.096-1.024l-3.5-3.75a.75.75 0 00-1.096 0l-3.5 3.75a.75.75 0 101.096 1.024l2.202-2.36v9.348a.75.75 0 001.5 0v-9.347z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"repo-template": {
	name: "repo-template",
	keywords: [
		"book",
		"new",
		"add",
		"template"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M13.25 8a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM5 12.25a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.25a.25.25 0 01-.4.2l-1.45-1.087a.249.249 0 00-.3 0L5.4 15.7a.25.25 0 01-.4-.2zM2.75 8a.75.75 0 01.75.75v.268c.083-.012.166-.018.25-.018h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 11-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zM11 .75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zm-5 0A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm0 9A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.751.751 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M13.25 8a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM5 12.25a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.25a.25.25 0 01-.4.2l-1.45-1.087a.249.249 0 00-.3 0L5.4 15.7a.25.25 0 01-.4-.2zM2.75 8a.75.75 0 01.75.75v.268c.083-.012.166-.018.25-.018h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 11-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zM11 .75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zm-5 0A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm0 9A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.751.751 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M5.75 0A2.75 2.75 0 003 2.75v1a.75.75 0 001.5 0v-1c0-.69.56-1.25 1.25-1.25h1a.75.75 0 000-1.5h-1zm4 0a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm7.5 0a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75h-3zM4.5 6.5a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6.5zm16.5 0a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6.5zM4.5 13.25a.75.75 0 00-1.5 0v5.5a3.25 3.25 0 001.95 2.98.75.75 0 10.6-1.375A1.75 1.75 0 014.5 18.75V18A1.5 1.5 0 016 16.5h.75a.75.75 0 000-1.5H6c-.546 0-1.059.146-1.5.401V13.25zm16.5 0a.75.75 0 00-1.5 0V15h-2.25a.75.75 0 000 1.5h2.25v4h-5.25a.75.75 0 000 1.5h6a.75.75 0 00.75-.75v-8zM9.75 15a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm-2.353 8.461A.25.25 0 017 23.26v-5.01a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 0A2.75 2.75 0 003 2.75v1a.75.75 0 001.5 0v-1c0-.69.56-1.25 1.25-1.25h1a.75.75 0 000-1.5h-1zm4 0a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm7.5 0a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75h-3zM4.5 6.5a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6.5zm16.5 0a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V6.5zM4.5 13.25a.75.75 0 00-1.5 0v5.5a3.25 3.25 0 001.95 2.98.75.75 0 10.6-1.375A1.75 1.75 0 014.5 18.75V18A1.5 1.5 0 016 16.5h.75a.75.75 0 000-1.5H6c-.546 0-1.059.146-1.5.401V13.25zm16.5 0a.75.75 0 00-1.5 0V15h-2.25a.75.75 0 000 1.5h2.25v4h-5.25a.75.75 0 000 1.5h6a.75.75 0 00.75-.75v-8zM9.75 15a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm-2.353 8.461A.25.25 0 017 23.26v-5.01a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	report: report,
	rocket: rocket,
	rows: rows,
	rss: rss,
	ruby: ruby,
	"screen-full": {
	name: "screen-full",
	keywords: [
		"fullscreen",
		"expand"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1.75 10a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 011 13.25v-2.5a.75.75 0 01.75-.75zm12.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 0113.25 15h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75zM2.75 2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5C1 1.784 1.784 1 2.75 1h2.5a.75.75 0 010 1.5zM10 1.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 10a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 011 13.25v-2.5a.75.75 0 01.75-.75zm12.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 0113.25 15h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5a.75.75 0 01.75-.75zM2.75 2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0v-2.5C1 1.784 1.784 1 2.75 1h2.5a.75.75 0 010 1.5zM10 1.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3.75 15a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 013 19.25v-3.5a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 0119.25 21h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5a.75.75 0 01.75-.75zM4.75 4.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 010 1.5zM15 3.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 15a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 013 19.25v-3.5a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 0119.25 21h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5a.75.75 0 01.75-.75zM4.75 4.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 010 1.5zM15 3.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"screen-normal": {
	name: "screen-normal",
	keywords: [
		"fullscreen",
		"expand",
		"exit"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.75 1a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 0110 4.25v-2.5a.75.75 0 01.75-.75zm-5.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 014.25 6h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5A.75.75 0 015.25 1zM1 10.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zm9 1c0-.966.784-1.75 1.75-1.75h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.75 1a.75.75 0 01.75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 0110 4.25v-2.5a.75.75 0 01.75-.75zm-5.5 0a.75.75 0 01.75.75v2.5A1.75 1.75 0 014.25 6h-2.5a.75.75 0 010-1.5h2.5a.25.25 0 00.25-.25v-2.5A.75.75 0 015.25 1zM1 10.75a.75.75 0 01.75-.75h2.5c.966 0 1.75.784 1.75 1.75v2.5a.75.75 0 01-1.5 0v-2.5a.25.25 0 00-.25-.25h-2.5a.75.75 0 01-.75-.75zm9 1c0-.966.784-1.75 1.75-1.75h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v2.5a.75.75 0 01-1.5 0z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.75 3a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 0115 7.25v-3.5a.75.75 0 01.75-.75zm-7.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 017.25 9h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5A.75.75 0 018.25 3zM3 15.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zm12 1c0-.966.784-1.75 1.75-1.75h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.75 3a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 0115 7.25v-3.5a.75.75 0 01.75-.75zm-7.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 017.25 9h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5A.75.75 0 018.25 3zM3 15.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zm12 1c0-.966.784-1.75 1.75-1.75h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	search: search,
	server: server,
	share: share,
	"share-android": {
	name: "share-android",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M15 3a3 3 0 01-5.175 2.066l-3.92 2.179a2.994 2.994 0 010 1.51l3.92 2.179a3 3 0 11-.73 1.31l-3.92-2.178a3 3 0 110-4.133l3.92-2.178A3 3 0 1115 3zm-1.5 10a1.5 1.5 0 10-3.001.001A1.5 1.5 0 0013.5 13zm-9-5a1.5 1.5 0 10-3.001.001A1.5 1.5 0 004.5 8zm9-5a1.5 1.5 0 10-3.001.001A1.5 1.5 0 0013.5 3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15 3a3 3 0 01-5.175 2.066l-3.92 2.179a2.994 2.994 0 010 1.51l3.92 2.179a3 3 0 11-.73 1.31l-3.92-2.178a3 3 0 110-4.133l3.92-2.178A3 3 0 1115 3zm-1.5 10a1.5 1.5 0 10-3.001.001A1.5 1.5 0 0013.5 13zm-9-5a1.5 1.5 0 10-3.001.001A1.5 1.5 0 004.5 8zm9-5a1.5 1.5 0 10-3.001.001A1.5 1.5 0 0013.5 3z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M20 5.5a3.498 3.498 0 01-6.062 2.385l-5.112 3.021a3.498 3.498 0 010 2.188l5.112 3.021a3.5 3.5 0 11-.764 1.29l-5.112-3.02a3.499 3.499 0 11-3.843-5.642 3.499 3.499 0 013.843.872l5.112-3.021A3.5 3.5 0 1120 5.5zm-1.5 13a2 2 0 10-3.999-.001 2 2 0 003.999.001zm0-13a2 2 0 10-3.999-.001A2 2 0 0018.5 5.5zM5.5 14a2 2 0 10.001-3.999A2 2 0 005.5 14z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M20 5.5a3.498 3.498 0 01-6.062 2.385l-5.112 3.021a3.498 3.498 0 010 2.188l5.112 3.021a3.5 3.5 0 11-.764 1.29l-5.112-3.02a3.499 3.499 0 11-3.843-5.642 3.499 3.499 0 013.843.872l5.112-3.021A3.5 3.5 0 1120 5.5zm-1.5 13a2 2 0 10-3.999-.001 2 2 0 003.999.001zm0-13a2 2 0 10-3.999-.001A2 2 0 0018.5 5.5zM5.5 14a2 2 0 10.001-3.999A2 2 0 005.5 14z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	shield: shield,
	"shield-check": {
	name: "shield-check",
	keywords: [
		"security",
		"shield",
		"protection",
		"check",
		"success"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM11.28 6.28l-3.5 3.5a.75.75 0 01-1.06 0l-1.5-1.5a.749.749 0 01.326-1.275.749.749 0 01.734.215l.97.97 2.97-2.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM11.28 6.28l-3.5 3.5a.75.75 0 01-1.06 0l-1.5-1.5a.749.749 0 01.326-1.275.749.749 0 01.734.215l.97.97 2.97-2.97a.751.751 0 011.042.018.751.751 0 01.018 1.042z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.53 9.78a.75.75 0 00-1.06-1.06L11 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5-5z\"></path><path d=\"M12.54.637l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.771 10.704-9.401 12.83a1.704 1.704 0 01-1.198 0C5.77 20.705 2 16.19 2 10V4.976c0-.758.489-1.43 1.21-1.664L11.46.637a1.748 1.748 0 011.08 0zm-.617 1.426l-8.25 2.676a.249.249 0 00-.173.237V10c0 5.46 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.461 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676a.253.253 0 00-.154 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.53 9.78a.75.75 0 00-1.06-1.06L11 13.19l-1.97-1.97a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5-5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.54.637l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.771 10.704-9.401 12.83a1.704 1.704 0 01-1.198 0C5.77 20.705 2 16.19 2 10V4.976c0-.758.489-1.43 1.21-1.664L11.46.637a1.748 1.748 0 011.08 0zm-.617 1.426l-8.25 2.676a.249.249 0 00-.173.237V10c0 5.46 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.461 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676a.253.253 0 00-.154 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"shield-lock": {
	name: "shield-lock",
	keywords: [
		"protect",
		"shield",
		"lock"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 01-1.5 0V7.8A1.5 1.5 0 119.5 6.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 01-1.5 0V7.8A1.5 1.5 0 119.5 6.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.46 1.137a1.748 1.748 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 5.476V10.5c0 6.19-3.77 10.705-9.401 12.83a1.704 1.704 0 01-1.198 0C5.771 21.204 2 16.69 2 10.5V5.476c0-.76.49-1.43 1.21-1.664zm.617 1.426a.253.253 0 00-.154 0L3.673 5.24a.25.25 0 00-.173.237V10.5c0 5.461 3.28 9.483 8.43 11.426a.199.199 0 00.14 0c5.15-1.943 8.43-5.965 8.43-11.426V5.476a.25.25 0 00-.173-.237zM13 12.232V15a1 1 0 01-2 0v-2.768a2 2 0 112 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.46 1.137a1.748 1.748 0 011.08 0l8.25 2.675A1.75 1.75 0 0122 5.476V10.5c0 6.19-3.77 10.705-9.401 12.83a1.704 1.704 0 01-1.198 0C5.771 21.204 2 16.69 2 10.5V5.476c0-.76.49-1.43 1.21-1.664zm.617 1.426a.253.253 0 00-.154 0L3.673 5.24a.25.25 0 00-.173.237V10.5c0 5.461 3.28 9.483 8.43 11.426a.199.199 0 00.14 0c5.15-1.943 8.43-5.965 8.43-11.426V5.476a.25.25 0 00-.173-.237zM13 12.232V15a1 1 0 01-2 0v-2.768a2 2 0 112 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"shield-slash": {
	name: "shield-slash",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.533.133a1.75 1.75 0 00-1.066 0l-2.091.67a.75.75 0 00.457 1.428l2.09-.67a.25.25 0 01.153 0l5.25 1.68a.25.25 0 01.174.239V7c0 .233-.008.464-.025.694a.75.75 0 101.495.112c.02-.27.03-.538.03-.806V3.48a1.75 1.75 0 00-1.217-1.667L8.533.133zM1 2.857l-.69-.5a.75.75 0 11.88-1.214l14.5 10.5a.75.75 0 11-.88 1.214l-1.282-.928c-.995 1.397-2.553 2.624-4.864 3.608-.425.181-.905.18-1.329 0-2.447-1.042-4.049-2.356-5.032-3.855C1.32 10.182 1 8.566 1 7zm1.5 1.086V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297.05.02.106.02.153 0 2.127-.905 3.439-1.982 4.237-3.108z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.533.133a1.75 1.75 0 00-1.066 0l-2.091.67a.75.75 0 00.457 1.428l2.09-.67a.25.25 0 01.153 0l5.25 1.68a.25.25 0 01.174.239V7c0 .233-.008.464-.025.694a.75.75 0 101.495.112c.02-.27.03-.538.03-.806V3.48a1.75 1.75 0 00-1.217-1.667L8.533.133zM1 2.857l-.69-.5a.75.75 0 11.88-1.214l14.5 10.5a.75.75 0 11-.88 1.214l-1.282-.928c-.995 1.397-2.553 2.624-4.864 3.608-.425.181-.905.18-1.329 0-2.447-1.042-4.049-2.356-5.032-3.855C1.32 10.182 1 8.566 1 7zm1.5 1.086V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297.05.02.106.02.153 0 2.127-.905 3.439-1.982 4.237-3.108z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"shield-x": {
	name: "shield-x",
	keywords: [
		"security",
		"shield",
		"protection",
		"fail"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM6.78 5.22L8 6.44l1.22-1.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 7.5l1.22 1.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 8.56 6.78 9.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 7.5 5.72 6.28a.749.749 0 01.326-1.275.749.749 0 01.734.215z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.533.133l5.25 1.68A1.75 1.75 0 0115 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 01-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 011.217-1.667l5.25-1.68a1.748 1.748 0 011.066 0zm-.61 1.429l.001.001-5.25 1.68a.251.251 0 00-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 00.154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 00-.174-.238l-5.25-1.68a.25.25 0 00-.153 0zM6.78 5.22L8 6.44l1.22-1.22a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 7.5l1.22 1.22a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 8.56 6.78 9.78a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042L6.94 7.5 5.72 6.28a.749.749 0 01.326-1.275.749.749 0 01.734.215z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.28 7.72a.75.75 0 00-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 101.06 1.06L12 12.56l2.72 2.72a.75.75 0 101.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 00-1.06-1.06L12 10.44 9.28 7.72z\"></path><path d=\"M12.54.637l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.771 10.704-9.401 12.83a1.704 1.704 0 01-1.198 0C5.77 20.705 2 16.19 2 10V4.976c0-.758.489-1.43 1.21-1.664L11.46.637a1.748 1.748 0 011.08 0zm-.617 1.426l-8.25 2.676a.249.249 0 00-.173.237V10c0 5.46 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.461 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676a.253.253 0 00-.154 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.28 7.72a.75.75 0 00-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 101.06 1.06L12 12.56l2.72 2.72a.75.75 0 101.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 00-1.06-1.06L12 10.44 9.28 7.72z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.54.637l8.25 2.675A1.75 1.75 0 0122 4.976V10c0 6.19-3.771 10.704-9.401 12.83a1.704 1.704 0 01-1.198 0C5.77 20.705 2 16.19 2 10V4.976c0-.758.489-1.43 1.21-1.664L11.46.637a1.748 1.748 0 011.08 0zm-.617 1.426l-8.25 2.676a.249.249 0 00-.173.237V10c0 5.46 3.28 9.483 8.43 11.426a.199.199 0 00.14 0C17.22 19.483 20.5 15.461 20.5 10V4.976a.25.25 0 00-.173-.237l-8.25-2.676a.253.253 0 00-.154 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sidebar-collapse": {
	name: "sidebar-collapse",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.823 7.823a.25.25 0 010 .354l-2.396 2.396A.25.25 0 014 10.396V5.604a.25.25 0 01.427-.177z\"></path><path d=\"M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0zM1.5 1.75v12.5c0 .138.112.25.25.25H9.5v-13H1.75a.25.25 0 00-.25.25zM11 14.5h3.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H11z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.823 7.823a.25.25 0 010 .354l-2.396 2.396A.25.25 0 014 10.396V5.604a.25.25 0 01.427-.177z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0zM1.5 1.75v12.5c0 .138.112.25.25.25H9.5v-13H1.75a.25.25 0 00-.25.25zM11 14.5h3.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H11z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.22 14.47L9.69 12 7.22 9.53a.749.749 0 01.326-1.275.749.749 0 01.734.215l3 3a.75.75 0 010 1.06l-3 3a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042z\"></path><path d=\"M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25H15v-17H3.75a.25.25 0 00-.25.25zm13 16.75h3.75a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H16.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.22 14.47L9.69 12 7.22 9.53a.749.749 0 01.326-1.275.749.749 0 01.734.215l3 3a.75.75 0 010 1.06l-3 3a.751.751 0 01-1.042-.018.751.751 0 01-.018-1.042z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25H15v-17H3.75a.25.25 0 00-.25.25zm13 16.75h3.75a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H16.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sidebar-expand": {
	name: "sidebar-expand",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.177 7.823l2.396-2.396A.25.25 0 017 5.604v4.792a.25.25 0 01-.427.177L4.177 8.177a.25.25 0 010-.354z\"></path><path d=\"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25H9.5v-13zm12.5 13a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H11v13z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.177 7.823l2.396-2.396A.25.25 0 017 5.604v4.792a.25.25 0 01-.427.177L4.177 8.177a.25.25 0 010-.354z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25H9.5v-13zm12.5 13a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H11v13z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.28 9.53L8.81 12l2.47 2.47a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-3-3a.75.75 0 010-1.06l3-3a.749.749 0 011.275.326.749.749 0 01-.215.734z\"></path><path d=\"M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25H15v-17H3.75a.25.25 0 00-.25.25zm13 16.75h3.75a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H16.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.28 9.53L8.81 12l2.47 2.47a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215l-3-3a.75.75 0 010-1.06l3-3a.749.749 0 011.275.326.749.749 0 01-.215.734z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25V3.75C2 2.784 2.784 2 3.75 2zM3.5 3.75v16.5c0 .138.112.25.25.25H15v-17H3.75a.25.25 0 00-.25.25zm13 16.75h3.75a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25H16.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sign-in": {
	name: "sign-in",
	keywords: [
		"door",
		"arrow",
		"direction",
		"enter",
		"log in"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25zm6.56 4.5h5.69a.75.75 0 010 1.5H8.56l1.97 1.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L6.22 8.53a.75.75 0 010-1.06l3.25-3.25a.749.749 0 011.275.326.749.749 0 01-.215.734z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25zm6.56 4.5h5.69a.75.75 0 010 1.5H8.56l1.97 1.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L6.22 8.53a.75.75 0 010-1.06l3.25-3.25a.749.749 0 011.275.326.749.749 0 01-.215.734z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75zm9.994 9.5l3.3 3.484a.75.75 0 01-1.088 1.032l-4.5-4.75a.75.75 0 010-1.032l4.5-4.75a.75.75 0 011.088 1.032l-3.3 3.484h8.256a.75.75 0 010 1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75zm9.994 9.5l3.3 3.484a.75.75 0 01-1.088 1.032l-4.5-4.75a.75.75 0 010-1.032l4.5-4.75a.75.75 0 011.088 1.032l-3.3 3.484h8.256a.75.75 0 010 1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sign-out": {
	name: "sign-out",
	keywords: [
		"door",
		"arrow",
		"direction",
		"leave",
		"log out"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25zm10.44 4.5l-1.97-1.97a.749.749 0 01.326-1.275.749.749 0 01.734.215l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.97-1.97H6.75a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 010 1.5h-2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 010 1.5h-2.5A1.75 1.75 0 012 13.25zm10.44 4.5l-1.97-1.97a.749.749 0 01.326-1.275.749.749 0 01.734.215l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.749.749 0 01-1.275-.326.749.749 0 01.215-.734l1.97-1.97H6.75a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75zm16.006 9.5H10.75a.75.75 0 010-1.5h8.256l-3.3-3.484a.75.75 0 011.088-1.032l4.5 4.75a.75.75 0 010 1.032l-4.5 4.75a.75.75 0 01-1.088-1.032z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75zm16.006 9.5H10.75a.75.75 0 010-1.5h8.256l-3.3-3.484a.75.75 0 011.088-1.032l4.5 4.75a.75.75 0 010 1.032l-4.5 4.75a.75.75 0 01-1.088-1.032z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"single-select": {
	name: "single-select",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.06 7.356l2.795 2.833c.08.081.21.081.29 0l2.794-2.833c.13-.131.038-.356-.145-.356H5.206c-.183 0-.275.225-.145.356z\"></path><path d=\"M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.06 7.356l2.795 2.833c.08.081.21.081.29 0l2.794-2.833c.13-.131.038-.356-.145-.356H5.206c-.183 0-.275.225-.145.356z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.854 10.854l3.792 3.792a.5.5 0 00.708 0l3.793-3.792a.5.5 0 00-.354-.854H8.207a.5.5 0 00-.353.854z\"></path><path d=\"M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.854 10.854l3.792 3.792a.5.5 0 00.708 0l3.793-3.792a.5.5 0 00-.354-.854H8.207a.5.5 0 00-.353.854z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0120.25 22H3.75A1.75 1.75 0 012 20.25zm1.75-.25a.25.25 0 00-.25.25v16.5c0 .138.112.25.25.25h16.5a.25.25 0 00.25-.25V3.75a.25.25 0 00-.25-.25z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	skip: skip,
	"skip-fill": {
	name: "skip-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm11.333-2.167a.825.825 0 00-1.166-1.166l-5.5 5.5a.825.825 0 001.166 1.166z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 8a8 8 0 1116 0A8 8 0 010 8zm11.333-2.167a.825.825 0 00-1.166-1.166l-5.5 5.5a.825.825 0 001.166 1.166z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.333-4.167a.825.825 0 00-1.166-1.166l-9.5 9.5a.825.825 0 001.166 1.166z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.333-4.167a.825.825 0 00-1.166-1.166l-9.5 9.5a.825.825 0 001.166 1.166z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	sliders: sliders,
	smiley: smiley,
	"sort-asc": {
	name: "sort-asc",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M12.927 2.573l3 3A.25.25 0 0115.75 6H13.5v6.75a.75.75 0 01-1.5 0V6H9.75a.25.25 0 01-.177-.427l3-3a.25.25 0 01.354 0zM0 12.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zm0-4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0-4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.927 2.573l3 3A.25.25 0 0115.75 6H13.5v6.75a.75.75 0 01-1.5 0V6H9.75a.25.25 0 01-.177-.427l3-3a.25.25 0 01.354 0zM0 12.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zm0-4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0-4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.5 17.25a.75.75 0 01-1.5 0V7.56l-2.22 2.22a.75.75 0 11-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L18.5 7.56v9.69zm-15.75.25a.75.75 0 010-1.5h9.5a.75.75 0 010 1.5h-9.5zm0-5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5h-5.5zm0-5a.75.75 0 010-1.5h3.5a.75.75 0 010 1.5h-3.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.5 17.25a.75.75 0 01-1.5 0V7.56l-2.22 2.22a.75.75 0 11-1.06-1.06l3.5-3.5a.75.75 0 011.06 0l3.5 3.5a.75.75 0 01-1.06 1.06L18.5 7.56v9.69zm-15.75.25a.75.75 0 010-1.5h9.5a.75.75 0 010 1.5h-9.5zm0-5a.75.75 0 010-1.5h5.5a.75.75 0 010 1.5h-5.5zm0-5a.75.75 0 010-1.5h3.5a.75.75 0 010 1.5h-3.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sort-desc": {
	name: "sort-desc",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M0 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zM13.5 10h2.25a.25.25 0 01.177.427l-3 3a.25.25 0 01-.354 0l-3-3A.25.25 0 019.75 10H12V3.75a.75.75 0 011.5 0V10z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M0 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zM13.5 10h2.25a.25.25 0 01.177.427l-3 3a.25.25 0 01-.354 0l-3-3A.25.25 0 019.75 10H12V3.75a.75.75 0 011.5 0V10z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M18.5 16.44V6.75a.75.75 0 00-1.5 0v9.69l-2.22-2.22a.75.75 0 10-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06l-2.22 2.22zM2 7.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 012 7.25zm0 5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M18.5 16.44V6.75a.75.75 0 00-1.5 0v9.69l-2.22-2.22a.75.75 0 10-1.06 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 10-1.06-1.06l-2.22 2.22zM2 7.25a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5A.75.75 0 012 7.25zm0 5a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5a.75.75 0 01-.75-.75zm0 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"sponsor-tiers": {
	name: "sponsor-tiers",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M10.586 1C12.268 1 13.5 2.37 13.5 4.25c0 1.745-.996 3.359-2.622 4.831-.166.15-.336.297-.509.438l1.116 5.584a.75.75 0 01-.991.852l-2.409-.876a.25.25 0 00-.17 0l-2.409.876a.75.75 0 01-.991-.852L5.63 9.519a13.78 13.78 0 01-.51-.438C3.497 7.609 2.5 5.995 2.5 4.25 2.5 2.37 3.732 1 5.414 1c.963 0 1.843.403 2.474 1.073L8 2.198l.112-.125a3.385 3.385 0 012.283-1.068L10.586 1zm-3.621 9.495l-.718 3.594 1.155-.42a1.75 1.75 0 011.028-.051l.168.051 1.154.42-.718-3.592c-.199.13-.37.235-.505.314l-.169.097a.75.75 0 01-.72 0 9.54 9.54 0 01-.515-.308l-.16-.105zM10.586 2.5c-.863 0-1.611.58-1.866 1.459-.209.721-1.231.721-1.44 0C7.025 3.08 6.277 2.5 5.414 2.5 4.598 2.5 4 3.165 4 4.25c0 1.23.786 2.504 2.128 3.719.49.443 1.018.846 1.546 1.198l.325.21.076-.047.251-.163a13.341 13.341 0 001.546-1.198C11.214 6.754 12 5.479 12 4.25c0-1.085-.598-1.75-1.414-1.75z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M10.586 1C12.268 1 13.5 2.37 13.5 4.25c0 1.745-.996 3.359-2.622 4.831-.166.15-.336.297-.509.438l1.116 5.584a.75.75 0 01-.991.852l-2.409-.876a.25.25 0 00-.17 0l-2.409.876a.75.75 0 01-.991-.852L5.63 9.519a13.78 13.78 0 01-.51-.438C3.497 7.609 2.5 5.995 2.5 4.25 2.5 2.37 3.732 1 5.414 1c.963 0 1.843.403 2.474 1.073L8 2.198l.112-.125a3.385 3.385 0 012.283-1.068L10.586 1zm-3.621 9.495l-.718 3.594 1.155-.42a1.75 1.75 0 011.028-.051l.168.051 1.154.42-.718-3.592c-.199.13-.37.235-.505.314l-.169.097a.75.75 0 01-.72 0 9.54 9.54 0 01-.515-.308l-.16-.105zM10.586 2.5c-.863 0-1.611.58-1.866 1.459-.209.721-1.231.721-1.44 0C7.025 3.08 6.277 2.5 5.414 2.5 4.598 2.5 4 3.165 4 4.25c0 1.23.786 2.504 2.128 3.719.49.443 1.018.846 1.546 1.198l.325.21.076-.047.251-.163a13.341 13.341 0 001.546-1.198C11.214 6.754 12 5.479 12 4.25c0-1.085-.598-1.75-1.414-1.75z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M16.004 1.25C18.311 1.25 20 3.128 20 5.75c0 2.292-1.23 4.464-3.295 6.485-.481.47-.98.909-1.482 1.31l.265 1.32 1.375 7.5a.75.75 0 01-.982.844l-3.512-1.207a.75.75 0 00-.488 0L8.37 23.209a.75.75 0 01-.982-.844l1.378-7.512.261-1.309c-.5-.4-1-.838-1.481-1.31C5.479 10.215 4.25 8.043 4.25 5.75c0-2.622 1.689-4.5 3.996-4.5 1.55 0 2.947.752 3.832 1.967l.047.067.047-.067a4.726 4.726 0 013.612-1.962l.22-.005zM13.89 14.531c-.418.285-.828.542-1.218.77l-.18.103a.75.75 0 01-.734 0l-.071-.04-.46-.272c-.282-.173-.573-.36-.868-.562l-.121.605-1.145 6.239 2.3-.79a2.248 2.248 0 011.284-.054l.18.053 2.299.79-1.141-6.226-.125-.616zM16.004 2.75c-1.464 0-2.731.983-3.159 2.459-.209.721-1.231.721-1.44 0-.428-1.476-1.695-2.459-3.16-2.459-1.44 0-2.495 1.173-2.495 3 0 1.811 1.039 3.647 2.844 5.412a19.624 19.624 0 003.734 2.84l-.019-.011-.184-.111.147-.088a19.81 19.81 0 003.015-2.278l.37-.352C17.46 9.397 18.5 7.561 18.5 5.75c0-1.827-1.055-3-2.496-3z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M16.004 1.25C18.311 1.25 20 3.128 20 5.75c0 2.292-1.23 4.464-3.295 6.485-.481.47-.98.909-1.482 1.31l.265 1.32 1.375 7.5a.75.75 0 01-.982.844l-3.512-1.207a.75.75 0 00-.488 0L8.37 23.209a.75.75 0 01-.982-.844l1.378-7.512.261-1.309c-.5-.4-1-.838-1.481-1.31C5.479 10.215 4.25 8.043 4.25 5.75c0-2.622 1.689-4.5 3.996-4.5 1.55 0 2.947.752 3.832 1.967l.047.067.047-.067a4.726 4.726 0 013.612-1.962l.22-.005zM13.89 14.531c-.418.285-.828.542-1.218.77l-.18.103a.75.75 0 01-.734 0l-.071-.04-.46-.272c-.282-.173-.573-.36-.868-.562l-.121.605-1.145 6.239 2.3-.79a2.248 2.248 0 011.284-.054l.18.053 2.299.79-1.141-6.226-.125-.616zM16.004 2.75c-1.464 0-2.731.983-3.159 2.459-.209.721-1.231.721-1.44 0-.428-1.476-1.695-2.459-3.16-2.459-1.44 0-2.495 1.173-2.495 3 0 1.811 1.039 3.647 2.844 5.412a19.624 19.624 0 003.734 2.84l-.019-.011-.184-.111.147-.088a19.81 19.81 0 003.015-2.278l.37-.352C17.46 9.397 18.5 7.561 18.5 5.75c0-1.827-1.055-3-2.496-3z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	square: square,
	"square-fill": {
	name: "square-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M5.75 4h4.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0110.25 12h-4.5A1.75 1.75 0 014 10.25v-4.5C4 4.784 4.784 4 5.75 4z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M5.75 4h4.5c.966 0 1.75.784 1.75 1.75v4.5A1.75 1.75 0 0110.25 12h-4.5A1.75 1.75 0 014 10.25v-4.5C4 4.784 4.784 4 5.75 4z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M7.75 6h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 18h-8.5A1.75 1.75 0 016 16.25v-8.5C6 6.784 6.784 6 7.75 6z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.75 6h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 18h-8.5A1.75 1.75 0 016 16.25v-8.5C6 6.784 6.784 6 7.75 6z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	squirrel: squirrel,
	stack: stack,
	star: star,
	"star-fill": {
	name: "star-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.672.668l3.059 6.197 6.838.993a.75.75 0 01.416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 01-1.088.79L12 18.347l-6.116 3.216a.75.75 0 01-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 01.416-1.279l6.838-.994L11.327.668a.75.75 0 011.345 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.672.668l3.059 6.197 6.838.993a.75.75 0 01.416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 01-1.088.79L12 18.347l-6.116 3.216a.75.75 0 01-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 01.416-1.279l6.838-.994L11.327.668a.75.75 0 011.345 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	stop: stop,
	stopwatch: stopwatch,
	strikethrough: strikethrough,
	sun: sun,
	sync: sync,
	tab: tab,
	"tab-external": {
	name: "tab-external",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M3.25 4a.25.25 0 00-.25.25v9a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h.75V4.25c0-.966.784-1.75 1.75-1.75h9.5c.966 0 1.75.784 1.75 1.75v8.25h.75a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75v-9a.25.25 0 00-.25-.25h-9.5z\"></path><path d=\"M7.97 7.97l-2.75 2.75a.75.75 0 101.06 1.06l2.75-2.75 1.543 1.543a.25.25 0 00.427-.177V6.25a.25.25 0 00-.25-.25H6.604a.25.25 0 00-.177.427L7.97 7.97z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M3.25 4a.25.25 0 00-.25.25v9a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h.75V4.25c0-.966.784-1.75 1.75-1.75h9.5c.966 0 1.75.784 1.75 1.75v8.25h.75a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75v-9a.25.25 0 00-.25-.25h-9.5z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M7.97 7.97l-2.75 2.75a.75.75 0 101.06 1.06l2.75-2.75 1.543 1.543a.25.25 0 00.427-.177V6.25a.25.25 0 00-.25-.25H6.604a.25.25 0 00-.177.427L7.97 7.97z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	table: table,
	tag: tag,
	tasklist: tasklist,
	telescope: telescope,
	"telescope-fill": {
	name: "telescope-fill",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M11.905.42a1.5 1.5 0 012.144.49l1.692 2.93a1.5 1.5 0 01-.649 2.102L2.895 11.815a1.5 1.5 0 01-1.95-.602l-.68-1.176a1.5 1.5 0 01.455-1.99L11.905.422zm-3.374 9.79a.75.75 0 01.944.253l2.644 3.864a.751.751 0 01-1.238.847L9 12.424v2.826a.75.75 0 01-1.5 0v-2.826l-1.881 2.75a.75.75 0 11-1.238-.848l2.048-2.992a.752.752 0 01.293-.252l1.81-.871zm2.476-3.965v-.001l1.356-.653-1.52-2.631-1.243.848zM3.279 8.119l.835 1.445 1.355-.653-.947-1.64z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.905.42a1.5 1.5 0 012.144.49l1.692 2.93a1.5 1.5 0 01-.649 2.102L2.895 11.815a1.5 1.5 0 01-1.95-.602l-.68-1.176a1.5 1.5 0 01.455-1.99L11.905.422zm-3.374 9.79a.75.75 0 01.944.253l2.644 3.864a.751.751 0 01-1.238.847L9 12.424v2.826a.75.75 0 01-1.5 0v-2.826l-1.881 2.75a.75.75 0 11-1.238-.848l2.048-2.992a.752.752 0 01.293-.252l1.81-.871zm2.476-3.965v-.001l1.356-.653-1.52-2.631-1.243.848zM3.279 8.119l.835 1.445 1.355-.653-.947-1.64z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M17.155 22.87a.75.75 0 00.226-1.036l-4-6.239a.75.75 0 00-.941-.277l-2.75 1.25a.75.75 0 00-.318.273l-3.25 4.989a.75.75 0 001.256.819l3.131-4.806.51-.232v5.64a.75.75 0 101.5 0v-6.22l3.6 5.613a.75.75 0 001.036.226zM.408 15.13a2 2 0 01.59-2.642L17.038 1.33a1.999 1.999 0 012.85.602l2.828 4.644a2 2 0 01-.851 2.847l-17.762 8.43a2 2 0 01-2.59-.807zm13.105-9.521l2.857 4.76 1.361-.646-2.984-4.973zm-7.842 5.455l-1.235.86 1.862 3.225 1.36-.645z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M17.155 22.87a.75.75 0 00.226-1.036l-4-6.239a.75.75 0 00-.941-.277l-2.75 1.25a.75.75 0 00-.318.273l-3.25 4.989a.75.75 0 001.256.819l3.131-4.806.51-.232v5.64a.75.75 0 101.5 0v-6.22l3.6 5.613a.75.75 0 001.036.226zM.408 15.13a2 2 0 01.59-2.642L17.038 1.33a1.999 1.999 0 012.85.602l2.828 4.644a2 2 0 01-.851 2.847l-17.762 8.43a2 2 0 01-2.59-.807zm13.105-9.521l2.857 4.76 1.361-.646-2.984-4.973zm-7.842 5.455l-1.235.86 1.862 3.225 1.36-.645z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	terminal: terminal,
	"three-bars": {
	name: "three-bars",
	keywords: [
		"hamburger",
		"menu",
		"dropdown"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12h12.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 010 1.5H1.75A.75.75 0 011 7.75zM1.75 12h12.5a.75.75 0 010 1.5H1.75a.75.75 0 010-1.5z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	thumbsdown: thumbsdown,
	thumbsup: thumbsup,
	tools: tools,
	trash: trash,
	"triangle-down": {
	name: "triangle-down",
	keywords: [
		"arrow",
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"triangle-left": {
	name: "triangle-left",
	keywords: [
		"arrow",
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M9.573 4.427L6.177 7.823a.25.25 0 000 .354l3.396 3.396a.25.25 0 00.427-.177V4.604a.25.25 0 00-.427-.177z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.573 4.427L6.177 7.823a.25.25 0 000 .354l3.396 3.396a.25.25 0 00.427-.177V4.604a.25.25 0 00-.427-.177z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M8.854 11.646l5.792-5.792a.5.5 0 01.854.353v11.586a.5.5 0 01-.854.353l-5.792-5.792a.5.5 0 010-.708z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M8.854 11.646l5.792-5.792a.5.5 0 01.854.353v11.586a.5.5 0 01-.854.353l-5.792-5.792a.5.5 0 010-.708z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"triangle-right": {
	name: "triangle-right",
	keywords: [
		"arrow",
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M6.427 4.427l3.396 3.396a.25.25 0 010 .354l-3.396 3.396A.25.25 0 016 11.396V4.604a.25.25 0 01.427-.177z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M6.427 4.427l3.396 3.396a.25.25 0 010 .354l-3.396 3.396A.25.25 0 016 11.396V4.604a.25.25 0 01.427-.177z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M15.146 12.354l-5.792 5.792a.5.5 0 01-.854-.353V6.207a.5.5 0 01.854-.353l5.792 5.792a.5.5 0 010 .708z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M15.146 12.354l-5.792 5.792a.5.5 0 01-.854-.353V6.207a.5.5 0 01.854-.353l5.792 5.792a.5.5 0 010 .708z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"triangle-up": {
	name: "triangle-up",
	keywords: [
		"arrow",
		"point",
		"direction"
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M4.427 9.573l3.396-3.396a.25.25 0 01.354 0l3.396 3.396a.25.25 0 01-.177.427H4.604a.25.25 0 01-.177-.427z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M4.427 9.573l3.396-3.396a.25.25 0 01.354 0l3.396 3.396a.25.25 0 01-.177.427H4.604a.25.25 0 01-.177-.427z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M12.354 8.854l5.792 5.792a.5.5 0 01-.353.854H6.207a.5.5 0 01-.353-.854l5.792-5.792a.5.5 0 01.708 0z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12.354 8.854l5.792 5.792a.5.5 0 01-.353.854H6.207a.5.5 0 01-.353-.854l5.792-5.792a.5.5 0 01.708 0z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	trophy: trophy,
	typography: typography,
	unfold: unfold,
	unlink: unlink,
	unlock: unlock,
	unmute: unmute,
	unread: unread,
	unverified: unverified,
	upload: upload,
	verified: verified,
	versions: versions,
	video: video,
	webhook: webhook,
	workflow: workflow,
	x: x$1,
	"x-circle": {
	name: "x-circle",
	keywords: [
	],
	heights: {
		"16": {
			width: 16,
			path: "<path d=\"M2.344 2.343h-.001a8 8 0 0111.314 11.314A8.002 8.002 0 01.234 10.089a8 8 0 012.11-7.746zm1.06 10.253a6.5 6.5 0 109.108-9.275 6.5 6.5 0 00-9.108 9.275zM6.03 4.97L8 6.94l1.97-1.97a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l1.97 1.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-1.97 1.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L6.94 8 4.97 6.03a.751.751 0 01.018-1.042.751.751 0 011.042-.018z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.344 2.343h-.001a8 8 0 0111.314 11.314A8.002 8.002 0 01.234 10.089a8 8 0 012.11-7.746zm1.06 10.253a6.5 6.5 0 109.108-9.275 6.5 6.5 0 00-9.108 9.275zM6.03 4.97L8 6.94l1.97-1.97a.749.749 0 011.275.326.749.749 0 01-.215.734L9.06 8l1.97 1.97a.749.749 0 01-.326 1.275.749.749 0 01-.734-.215L8 9.06l-1.97 1.97a.749.749 0 01-1.275-.326.749.749 0 01.215-.734L6.94 8 4.97 6.03a.751.751 0 01.018-1.042.751.751 0 011.042-.018z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M9.036 7.976a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z\"></path><path d=\"M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M9.036 7.976a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"
						},
						children: [
						]
					},
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 009.5 9.5 9.5 9.5 0 009.5-9.5A9.5 9.5 0 0012 2.5 9.5 9.5 0 002.5 12z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	"x-circle-fill": {
	name: "x-circle-fill",
	keywords: [
	],
	heights: {
		"12": {
			width: 12,
			path: "<path d=\"M1.757 10.243a6.001 6.001 0 118.488-8.486 6.001 6.001 0 01-8.488 8.486zM6 4.763l-2-2L2.763 4l2 2-2 2L4 9.237l2-2 2 2L9.237 8l-2-2 2-2L8 2.763z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "12",
					height: "12",
					viewBox: "0 0 12 12"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1.757 10.243a6.001 6.001 0 118.488-8.486 6.001 6.001 0 01-8.488 8.486zM6 4.763l-2-2L2.763 4l2 2-2 2L4 9.237l2-2 2 2L9.237 8l-2-2 2-2L8 2.763z"
						},
						children: [
						]
					}
				]
			}
		},
		"16": {
			width: 16,
			path: "<path d=\"M2.343 13.657A8 8 0 1113.658 2.343 8 8 0 012.343 13.657zM6.03 4.97a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042L6.94 8 4.97 9.97a.749.749 0 00.326 1.275.749.749 0 00.734-.215L8 9.06l1.97 1.97a.749.749 0 001.275-.326.749.749 0 00-.215-.734L9.06 8l1.97-1.97a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L8 6.94z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 16 16"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M2.343 13.657A8 8 0 1113.658 2.343 8 8 0 012.343 13.657zM6.03 4.97a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042L6.94 8 4.97 9.97a.749.749 0 00.326 1.275.749.749 0 00.734-.215L8 9.06l1.97 1.97a.749.749 0 001.275-.326.749.749 0 00-.215-.734L9.06 8l1.97-1.97a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L8 6.94z"
						},
						children: [
						]
					}
				]
			}
		},
		"24": {
			width: 24,
			path: "<path d=\"M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.036-4.024a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 00.326 1.275.749.749 0 00.734-.215L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L12 10.939z\"></path>",
			ast: {
				name: "svg",
				type: "element",
				value: "",
				attributes: {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24"
				},
				children: [
					{
						name: "path",
						type: "element",
						value: "",
						attributes: {
							d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm8.036-4.024a.751.751 0 00-1.042.018.751.751 0 00-.018 1.042L10.939 12l-2.963 2.963a.749.749 0 00.326 1.275.749.749 0 00.734-.215L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.749.749 0 00-.326-1.275.749.749 0 00-.734.215L12 10.939z"
						},
						children: [
						]
					}
				]
			}
		}
	}
},
	zap: zap
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign$1 = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty$1.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

const data = require$$0;
const objectAssign = objectAssign$1;

const DEFAULT_HEIGHT = 16;

for (const key of Object.keys(data)) {
  // Returns a string representation of html attributes
  const htmlAttributes = (icon, defaultOptions, options) => {
    const attributes = [];
    const attrObj = objectAssign({}, defaultOptions, options);

    // If the user passed in options
    if (options) {
      // If any of the width or height is passed in
      if (options['width'] || options['height']) {
        attrObj['width'] = options['width']
          ? options['width']
          : (parseInt(options['height']) * defaultOptions['width']) / defaultOptions['height'];
        attrObj['height'] = options['height']
          ? options['height']
          : (parseInt(options['width']) * defaultOptions['height']) / defaultOptions['width'];
      }

      // If the user passed in class
      if (options['class']) {
        attrObj['class'] = `octicon octicon-${key} ${options['class']}`;
        attrObj['class'].trim();
      }

      // If the user passed in aria-label
      if (options['aria-label']) {
        attrObj['aria-label'] = options['aria-label'];
        attrObj['role'] = 'img';

        // Un-hide the icon
        delete attrObj['aria-hidden'];
      }
    }

    for (const option of Object.keys(attrObj)) {
      attributes.push(`${option}="${attrObj[option]}"`);
    }

    return attributes.join(' ').trim()
  };

  // Set the symbol for easy access
  data[key].symbol = key;

  // Set options for each icon height
  for (const height of Object.keys(data[key].heights)) {
    data[key].heights[height].options = {
      version: '1.1',
      width: data[key].heights[height].width,
      height: parseInt(height),
      viewBox: `0 0 ${data[key].heights[height].width} ${height}`,
      class: `octicon octicon-${key}`,
      'aria-hidden': 'true'
    };
  }

  // Function to return an SVG object
  data[key].toSVG = function (options = {}) {
    const {height, width} = options;
    const naturalHeight = closestNaturalHeight(Object.keys(data[key].heights), height || width || DEFAULT_HEIGHT);
    return `<svg ${htmlAttributes(data[key], data[key].heights[naturalHeight].options, options)}>${
      data[key].heights[naturalHeight].path
    }</svg>`
  };
}

// Import data into exports
var octicons = data;

function closestNaturalHeight(naturalHeights, height) {
  return naturalHeights
    .map(naturalHeight => parseInt(naturalHeight, 10))
    .reduce((acc, naturalHeight) => (naturalHeight <= height ? naturalHeight : acc), naturalHeights[0])
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$4=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$4=new WeakMap;class o$4{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$3),i$2=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$3)},S$1=(s,n)=>{e$4?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$3=window,r$1=e$3.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$3.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$1};class d$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:d$1}),(null!==(s$2=e$3.reactiveElementVersions)&&void 0!==s$2?s$2:e$3.reactiveElementVersions=[]).push("1.5.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$1=window,s$1=i$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$2="?"+o$2,l$1=`<${n$2}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$2+y):s+o$2+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$2?e$2.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$2)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)c.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$1?s$1.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i$1.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$2=i$1.litHtmlVersions)&&void 0!==t$2?t$2:i$1.litHtmlVersions=[]).push("2.5.0");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$1;class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(i){if(super(i),this.it=b,i.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===b||null==r)return this._t=void 0,this.it=r;if(r===x)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class t extends e{}t.directiveName="unsafeSVG",t.resultType=2;const o=e$1(t);

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce$1(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce$1(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

class MenuElement extends s {
  constructor() {
    super();
    this.placement = '';
  }

  static get properties() {
    return {
      placement: { type: String },
      href: { type: String },
    };
  }

  static get styles() {
    return i$2`
      :host {
        position: absolute;
        background-color: white;
        opacity: 0.8;

        width: 24px;
        height: 24px;
        border-radius: 12px;

        top: initial;
        right: 0;
        bottom: 0;
        left: initial;
      }

      #info-button {
        display: block;
        padding: 4px;
      }

      #info-button svg {
        display: block;
        transform: translateY(0.5px);
      }

      :host([placement='top-left']) {
        top: 0;
        right: initial;
        bottom: initial;
        left: 0;
      }

      :host([placement='top-right']) {
        top: 0;
        right: 0;
        bottom: initial;
        left: initial;
      }

      :host([placement='bottom-left']) {
        top: initial;
        right: initial;
        bottom: 0;
        left: 0;
      }

      :host([placement='none']) {
        display: none;
      }

      .menu {
        min-width: 6rem;
        padding: 0.5rem 0;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        list-style: none;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem;
        display: none;
      }

      .menu[data-show] {
        display: block;
      }

      .menu-item {
        display: block;
        padding: 0.25rem 1rem;
        font-size: 12px;
        font-weight: 400;
        color: #212529;
        text-decoration: none;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
      }

      .menu-item:focus,
      .menu-item:hover {
        color: #1e2125;
        background-color: #e9ecef;
      }

      .menu .divider {
        height: 1px;
        margin: 4px 1px;
        background-color: #e5e5e5;
        border-bottom: 1px solid #ffffff;
      }
    `;
  }

  _hideMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    menu.removeAttribute('data-show');
  }

  firstUpdated() {
    const infoButton = this.shadowRoot.querySelector('#info-button');
    const menu = this.shadowRoot.querySelector('.menu');

    const popperInstance = createPopper(infoButton, menu, {
      placement: this._menuPlacement(),
    });

    infoButton.addEventListener('click', () => {
      if (menu.getAttribute('data-show') === null) {
        this.requestUpdate(); // update menu contents
        menu.setAttribute('data-show', '');
        popperInstance.update();
      } else {
        menu.removeAttribute('data-show');
      }
    });
  }

  _menuPlacement() {
    switch (this.placement) {
      case 'top-left':
        return 'bottom-start';
      case 'top-right':
        return 'bottom-end';
      case 'bottom-left':
        return 'top-start';
      case 'bottom-right':
        return 'top-end';
      case 'none':
      default:
        return 'top-end';
    }
  }

  _handlerForMenuItem(menuItem) {
    return () => {
      this._hideMenu();
      menuItem.handler();
    };
  }

  async _copyHTMLSnippetToClipboard() {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = this.stanzaInstance.url;
    script.async = true;
    const html = [script.outerHTML, this.stanzaInstance.element.outerHTML].join(
      ' '
    );

    await navigator.clipboard.writeText(html);

    this._hideMenu();
  }

  _renderMenuItem(item) {
    switch (item.type) {
      case 'item':
        return y`<li>
          <a
            class="menu-item"
            href="#"
            @click="${this._handlerForMenuItem(item)}"
            >${item.label}</a
          >
        </li>`;

      case 'divider':
        return y`<li class="divider"></li>`;

      default:
        throw new Error(`unknown menu item type specified: ${item.type}`);
    }
  }

  render() {
    const menuDefinition = this.menuDefinition();
    return y`<div id="info-button">
        ${o(octicons.info.toSVG({ width: 16 }))}
      </div>
      <ul class="menu">
        ${menuDefinition.map((item) => this._renderMenuItem(item))}
        ${menuDefinition.length > 0 ? y`<li class="divider"></li>` : ''}
        <li>
          <a
            class="menu-item"
            href="#"
            @click="${this._copyHTMLSnippetToClipboard}"
            >Copy HTML snippet to clipboard</a
          >
        </li>
        <li>
          <a
            class="menu-item"
            href=${this.href}
            @click="${this._hideMenu}"
            target="_blank"
            rel="noopener noreferrer"
          >
            About this stanza</a
          >
        </li>
      </ul>`;
  }
}

MenuElement.customElementName = 'togostanza--menu';

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag$1 = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$1 = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol$1 = root$1.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root$1, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction$1(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol$1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray$1(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString$1(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject$1(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var lodash_get = get;

class ContainerElement extends HTMLElement {
  dataSourceUrls = {};

  connectedCallback() {
    const stanzaElements = Array.from(this.querySelectorAll('*')).filter(
      (el) =>
        el.tagName.startsWith('TOGOSTANZA-') &&
        !el.tagName.startsWith('TOGOSTANZA--')
    );

    let tries = 0;
    const connectStanzasWhenReady = () => {
      const ready = stanzaElements.every((el) => 'stanzaInstance' in el);
      if (ready) {
        connectStanzasWithAttributes(this, stanzaElements);
        connectStanzasWithHandler(stanzaElements);
        connectDataSource(this);
        return;
      }

      tries++;
      setTimeout(connectStanzasWhenReady, 2 ** Math.min(tries, 11));
    };
    connectStanzasWhenReady();
  }

  disconnectedCallback() {
    for (const entry of Object.values(this.dataSourceUrls)) {
      URL.revokeObjectURL(entry.value);
    }
  }

  async dataSourceUrlChanged(oldUrl, newUrl, receiver, targetAttribute) {
    this.disposeDataSourceUrl(oldUrl);

    const receiverElements = this.querySelectorAll(receiver);

    if (newUrl) {
      const objectUrl = await this.getOrCreateObjectUrl(newUrl);

      setEach(receiverElements, targetAttribute, objectUrl);
    } else {
      removeEach(receiverElements, targetAttribute);
    }
  }

  async getOrCreateObjectUrl(url) {
    const entry = this.dataSourceUrls[url];

    if (entry) {
      entry.count++;
      return entry.value;
    }

    const blob = await fetch(url).then((res) => res.blob());
    const objectUrl = URL.createObjectURL(blob);

    this.dataSourceUrls[url] = {
      value: objectUrl,
      count: 1,
    };

    return objectUrl;
  }

  disposeDataSourceUrl(url) {
    const entry = this.dataSourceUrls[url];

    if (!entry) {
      return;
    }

    entry.count--;

    if (entry.count === 0) {
      URL.revokeObjectURL(entry.value);

      delete this.dataSourceUrls[url];
    }
  }
}

ContainerElement.customElementName = 'togostanza--container';

function connectStanzasWithHandler(stanzaElements) {
  for (const srcEl of stanzaElements) {
    for (const eventName of outgoingEventNames(srcEl.stanzaInstance)) {
      srcEl.addEventListener(eventName, (event) => {
        for (const destEl of stanzaElements) {
          if (incomingEventNames(destEl.stanzaInstance).includes(eventName)) {
            destEl.stanzaInstance.handleEvent(event);
          }
        }
      });
    }
  }
}

function connectStanzasWithAttributes(container, stanzaElements) {
  for (const mapElement of container.querySelectorAll(
    'togostanza--event-map'
  )) {
    const on = mapElement.getAttribute('on');
    const receiver = mapElement.getAttribute('receiver');
    const targetAttribute = mapElement.getAttribute('target-attribute');
    const valuePath = mapElement.getAttribute('value-path');

    const receiverElements = container.querySelectorAll(receiver);

    for (const srcEl of stanzaElements) {
      if (!outgoingEventNames(srcEl.stanzaInstance).includes(on)) {
        continue;
      }

      srcEl.addEventListener(on, (event) => {
        const value = valuePath ? lodash_get(event.detail, valuePath) : event.detail;

        if (value === true) {
          setEach(receiverElements, targetAttribute, '');
        } else if (value === false || value === undefined) {
          removeEach(receiverElements, targetAttribute);
        } else if (value.constructor === String) {
          // a bit weird, but a unified way to determine string literals and objects
          setEach(receiverElements, targetAttribute, value);
        } else {
          setEach(receiverElements, targetAttribute, JSON.stringify(value));
        }
      });
    }
  }
}

function connectDataSource(container) {
  for (const dataSource of container.querySelectorAll(
    'togostanza--data-source'
  )) {
    dataSource.containerElement = container;

    const url = dataSource.getAttribute('url');
    const receiver = dataSource.getAttribute('receiver');
    const targetAttribute = dataSource.getAttribute('target-attribute');

    container.dataSourceUrlChanged(null, url, receiver, targetAttribute);
  }
}

function setEach(elements, key, value) {
  for (const el of elements) {
    el.setAttribute(key, value);
  }
}

function removeEach(elements, key) {
  for (const el of elements) {
    el.removeAttribute(key);
  }
}

function outgoingEventNames(stanzaInstance) {
  return (
    stanzaInstance.metadata['stanza:outgoingEvent']?.map(
      (e) => e['stanza:key']
    ) || []
  );
}

function incomingEventNames(stanzaInstance) {
  return (
    stanzaInstance.metadata['stanza:incomingEvent']?.map(
      (e) => e['stanza:key']
    ) || []
  );
}

class DataSourceElement extends HTMLElement {
  attributeChangedCallback(key, oldVal, newVal) {
    if (key !== 'url') { return; }

    const receiver        = this.getAttribute('receiver');
    const targetAttribute = this.getAttribute('target-attribute');

    this.containerElement?.dataSourceUrlChanged(oldVal, newVal, receiver, targetAttribute);
  }
}

DataSourceElement.observedAttributes = ['url'];
DataSourceElement.customElementName = 'togostanza--data-source';

async function defineStanzaElement({
  stanzaModule,
  metadata,
  templates,
  url,
}) {
  const id = metadata['@id'];
  const paramKeys = metadata['stanza:parameter'].map(
    (param) => param['stanza:key']
  );

  class StanzaElement extends HTMLElement {
    constructor() {
      super(...arguments);

      ensureBuiltinElementsDefined();

      this.attachShadow({ mode: 'open' });

      this.stanzaInstance = new stanzaModule.default(
        this,
        metadata,
        templates,
        url
      );
    }

    connectedCallback() {
      const hostStyle = document.createElement('style');
      hostStyle.append(cssVariableDefaults(metadata['stanza:style']) || '');
      this.shadowRoot.append(hostStyle);

      const shadowStyleLink = document.createElement('link');
      shadowStyleLink.rel = 'stylesheet';
      shadowStyleLink.href = url.replace(/\.js$/, '.css');
      this.shadowRoot.append(shadowStyleLink);

      this.stanzaInstance.renderDebounced();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'togostanza-menu_placement') {
        this.stanzaInstance.menuElement.setAttribute(
          'placement',
          newValue || metadata['stanza:menu-placement']
        );
      }
      this.stanzaInstance.handleAttributeChange(name, oldValue, newValue);
    }

    render() {
      this.stanzaInstance.render();
    }
  }

  StanzaElement.observedAttributes = [
    ...paramKeys,
    'togostanza-menu_placement',
  ];

  customElements.define(`togostanza-${id}`, StanzaElement);
}

function cssVariableDefaults(defs) {
  if (!defs) {
    return null;
  }

  return defaultOutdent`
    :host {
    ${defs
      .map((def) => `  ${def['stanza:key']}: ${def['stanza:default']};`)
      .join('\n')}
    }
  `;
}

function ensureBuiltinElementsDefined() {
  for (const el of [MenuElement, ContainerElement, DataSourceElement]) {
    const name = el.customElementName;

    if (!customElements.get(name)) {
      customElements.define(name, el);
    }
  }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce = debounce;

var handlebars_runtimeExports = {};
var handlebars_runtime = {
  get exports(){ return handlebars_runtimeExports; },
  set exports(v){ handlebars_runtimeExports = v; },
};

var base = {};

var utils = {};

utils.__esModule = true;
utils.extend = extend;
utils.indexOf = indexOf;
utils.escapeExpression = escapeExpression;
utils.isEmpty = isEmpty;
utils.createFrame = createFrame;
utils.blockParams = blockParams;
utils.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

utils.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  utils.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
utils.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

utils.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

var exceptionExports = {};
var exception = {
  get exports(){ return exceptionExports; },
  set exports(v){ exceptionExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      endLineNumber = undefined,
	      column = undefined,
	      endColumn = undefined;

	  if (loc) {
	    line = loc.start.line;
	    endLineNumber = loc.end.line;
	    column = loc.start.column;
	    endColumn = loc.end.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;
	      this.endLineNumber = endLineNumber;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (Object.defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true
	        });
	        Object.defineProperty(this, 'endColumn', {
	          value: endColumn,
	          enumerable: true
	        });
	      } else {
	        this.column = column;
	        this.endColumn = endColumn;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];
	
} (exception, exceptionExports));

var helpers = {};

var blockHelperMissingExports = {};
var blockHelperMissing = {
  get exports(){ return blockHelperMissingExports; },
  set exports(v){ blockHelperMissingExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	var _utils = utils;

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];
	
} (blockHelperMissing, blockHelperMissingExports));

var eachExports = {};
var each = {
  get exports(){ return eachExports; },
  set exports(v){ eachExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = utils;

	var _exception = exceptionExports;

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else if (commonjsGlobal.Symbol && context[commonjsGlobal.Symbol.iterator]) {
	        var newContext = [];
	        var iterator = context[commonjsGlobal.Symbol.iterator]();
	        for (var it = iterator.next(); !it.done; it = iterator.next()) {
	          newContext.push(it.value);
	        }
	        context = newContext;
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        (function () {
	          var priorKey = undefined;

	          Object.keys(context).forEach(function (key) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          });
	          if (priorKey !== undefined) {
	            execIteration(priorKey, i - 1, true);
	          }
	        })();
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];
	
} (each, eachExports));

var helperMissingExports = {};
var helperMissing = {
  get exports(){ return helperMissingExports; },
  set exports(v){ helperMissingExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _exception = exceptionExports;

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];
	
} (helperMissing, helperMissingExports));

var _ifExports = {};
var _if = {
  get exports(){ return _ifExports; },
  set exports(v){ _ifExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = utils;

	var _exception = exceptionExports;

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#if requires exactly one argument');
	    }
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#unless requires exactly one argument');
	    }
	    return instance.helpers['if'].call(this, conditional, {
	      fn: options.inverse,
	      inverse: options.fn,
	      hash: options.hash
	    });
	  });
	};

	module.exports = exports['default'];
	
} (_if, _ifExports));

var logExports = {};
var log$1 = {
  get exports(){ return logExports; },
  set exports(v){ logExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];
	
} (log$1, logExports));

var lookupExports = {};
var lookup = {
  get exports(){ return lookupExports; },
  set exports(v){ lookupExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field, options) {
	    if (!obj) {
	      // Note for 5.0: Change to "obj == null" in 5.0
	      return obj;
	    }
	    return options.lookupProperty(obj, field);
	  });
	};

	module.exports = exports['default'];
	
} (lookup, lookupExports));

var _withExports = {};
var _with = {
  get exports(){ return _withExports; },
  set exports(v){ _withExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = utils;

	var _exception = exceptionExports;

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (arguments.length != 2) {
	      throw new _exception2['default']('#with requires exactly one argument');
	    }
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];
	
} (_with, _withExports));

helpers.__esModule = true;
helpers.registerDefaultHelpers = registerDefaultHelpers;
helpers.moveHelperToHooks = moveHelperToHooks;
// istanbul ignore next

function _interopRequireDefault$3(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = blockHelperMissingExports;

var _helpersBlockHelperMissing2 = _interopRequireDefault$3(_helpersBlockHelperMissing);

var _helpersEach = eachExports;

var _helpersEach2 = _interopRequireDefault$3(_helpersEach);

var _helpersHelperMissing = helperMissingExports;

var _helpersHelperMissing2 = _interopRequireDefault$3(_helpersHelperMissing);

var _helpersIf = _ifExports;

var _helpersIf2 = _interopRequireDefault$3(_helpersIf);

var _helpersLog = logExports;

var _helpersLog2 = _interopRequireDefault$3(_helpersLog);

var _helpersLookup = lookupExports;

var _helpersLookup2 = _interopRequireDefault$3(_helpersLookup);

var _helpersWith = _withExports;

var _helpersWith2 = _interopRequireDefault$3(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}

var decorators = {};

var inlineExports = {};
var inline = {
  get exports(){ return inlineExports; },
  set exports(v){ inlineExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	var _utils = utils;

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];
	
} (inline, inlineExports));

decorators.__esModule = true;
decorators.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault$2(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = inlineExports;

var _decoratorsInline2 = _interopRequireDefault$2(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

var loggerExports = {};
var logger$1 = {
  get exports(){ return loggerExports; },
  set exports(v){ loggerExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	var _utils = utils;

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      // eslint-disable-next-line no-console
	      if (!console[method]) {
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];
	
} (logger$1, loggerExports));

var protoAccess = {};

var createNewLookupObject$1 = {};

createNewLookupObject$1.__esModule = true;
createNewLookupObject$1.createNewLookupObject = createNewLookupObject;

var _utils$2 = utils;

/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */

function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return _utils$2.extend.apply(undefined, [Object.create(null)].concat(sources));
}

protoAccess.__esModule = true;
protoAccess.createProtoAccessControl = createProtoAccessControl;
protoAccess.resultIsAllowed = resultIsAllowed;
protoAccess.resetLoggedProperties = resetLoggedProperties;
// istanbul ignore next

function _interopRequireWildcard$1(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _createNewLookupObject = createNewLookupObject$1;

var _logger$1 = loggerExports;

var logger = _interopRequireWildcard$1(_logger$1);

var loggedProperties = Object.create(null);

function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = Object.create(null);
  defaultMethodWhiteList['constructor'] = false;
  defaultMethodWhiteList['__defineGetter__'] = false;
  defaultMethodWhiteList['__defineSetter__'] = false;
  defaultMethodWhiteList['__lookupGetter__'] = false;

  var defaultPropertyWhiteList = Object.create(null);
  // eslint-disable-next-line no-proto
  defaultPropertyWhiteList['__proto__'] = false;

  return {
    properties: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}

function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === 'function') {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}

function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }
  if (protoAccessControlForType.defaultValue !== undefined) {
    return protoAccessControlForType.defaultValue;
  }
  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}

function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
  }
}

function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function (propertyName) {
    delete loggedProperties[propertyName];
  });
}

base.__esModule = true;
base.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault$1(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils$1 = utils;

var _exception$1 = exceptionExports;

var _exception2$1 = _interopRequireDefault$1(_exception$1);

var _helpers$1 = helpers;

var _decorators = decorators;

var _logger = loggerExports;

var _logger2 = _interopRequireDefault$1(_logger);

var _internalProtoAccess$1 = protoAccess;

var VERSION = '4.7.7';
base.VERSION = VERSION;
var COMPILER_REVISION = 8;
base.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;

base.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0 <4.3.0',
  8: '>= 4.3.0'
};

base.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers$1.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils$1.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2$1['default']('Arg not supported with multiple helpers');
      }
      _utils$1.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils$1.toString.call(name) === objectType) {
      _utils$1.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2$1['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils$1.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2$1['default']('Arg not supported with multiple decorators');
      }
      _utils$1.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    _internalProtoAccess$1.resetLoggedProperties();
  }
};

var log = _logger2['default'].log;

base.log = log;
base.createFrame = _utils$1.createFrame;
base.logger = _logger2['default'];

var safeStringExports = {};
var safeString = {
  get exports(){ return safeStringExports; },
  set exports(v){ safeStringExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];
	
} (safeString, safeStringExports));

var runtime = {};

var wrapHelper$1 = {};

wrapHelper$1.__esModule = true;
wrapHelper$1.wrapHelper = wrapHelper;

function wrapHelper(helper, transformOptionsFn) {
  if (typeof helper !== 'function') {
    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    return helper;
  }
  var wrapper = function wrapper() /* dynamic arguments */{
    var options = arguments[arguments.length - 1];
    arguments[arguments.length - 1] = transformOptionsFn(options);
    return helper.apply(this, arguments);
  };
  return wrapper;
}

runtime.__esModule = true;
runtime.checkRevision = checkRevision;
runtime.template = template;
runtime.wrapProgram = wrapProgram;
runtime.resolvePartial = resolvePartial;
runtime.invokePartial = invokePartial;
runtime.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = utils;

var Utils = _interopRequireWildcard(_utils);

var _exception = exceptionExports;

var _exception2 = _interopRequireDefault(_exception);

var _base = base;

var _helpers = helpers;

var _internalWrapHelper = wrapHelper$1;

var _internalProtoAccess = protoAccess;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    return;
  }

  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
  } else {
    // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as pseudo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);

    var extendedOptions = Utils.extend({}, options, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    });

    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, extendedOptions);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
          loc: loc
        });
      }
      return container.lookupProperty(obj, name);
    },
    lookupProperty: function lookupProperty(parent, propertyName) {
      var result = parent[propertyName];
      if (result == null) {
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return result;
      }

      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
        return result;
      }
      return undefined;
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        var result = depths[i] && container.lookupProperty(depths[i], name);
        if (result != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    mergeIfNeeded: function mergeIfNeeded(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }

    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }

  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
      wrapHelpersToPassLookupProperty(mergedHelpers, container);
      container.helpers = mergedHelpers;

      if (templateSpec.usePartial) {
        // Use mergeIfNeeded here to prevent compiling global partials multiple times
        container.partials = container.mergeIfNeeded(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }

      container.hooks = {};
      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    } else {
      container.protoAccessControl = options.protoAccessControl; // internal option
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
  Object.keys(mergedHelpers).forEach(function (helperName) {
    var helper = mergedHelpers[helperName];
    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
  });
}

function passLookupPropertyOption(helper, container) {
  var lookupProperty = container.lookupProperty;
  return _internalWrapHelper.wrapHelper(helper, function (options) {
    return Utils.extend({ lookupProperty: lookupProperty }, options);
  });
}

var noConflictExports = {};
var noConflict = {
  get exports(){ return noConflictExports; },
  set exports(v){ noConflictExports = v; },
};

(function (module, exports) {

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	
} (noConflict, noConflictExports));

(function (module, exports) {

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	// istanbul ignore next

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _handlebarsBase = base;

	var base$1 = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = safeStringExports;

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = exceptionExports;

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = utils;

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = runtime;

	var runtime$1 = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = noConflictExports;

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base$1.HandlebarsEnvironment();

	  Utils.extend(hb, base$1);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime$1;
	  hb.template = function (spec) {
	    return runtime$1.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];
	
} (handlebars_runtime, handlebars_runtimeExports));

var HandlebarsRuntime = /*@__PURE__*/getDefaultExportFromCjs(handlebars_runtimeExports);

class Stanza {
    constructor(element, metadata, templates, url) {
        var _a;
        this.element = element;
        this.metadata = metadata;
        const handlebarsRuntime = HandlebarsRuntime.create();
        this.templates = Object.fromEntries(templates.map(([name, spec]) => {
            return [name, handlebarsRuntime.template(spec)];
        }));
        const bbox = document.createElement('div');
        bbox.style.position = 'relative';
        const main = document.createElement('main');
        main.style.overflow = 'auto';
        bbox.appendChild(main);
        this.menuElement = document.createElement('togostanza--menu');
        this.menuElement.setAttribute('href', url.replace(/\.js$/, '.html'));
        this.menuElement.menuDefinition = this.menu.bind(this);
        this.menuElement.setAttribute('placement', metadata['stanza:menu-placement']);
        this.menuElement.stanzaInstance = this;
        bbox.appendChild(this.menuElement);
        (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.appendChild(bbox);
        this.url = url;
        this.renderDebounced = lodash_debounce(() => {
            this.render();
        }, 50);
    }
    get root() {
        return this.element.shadowRoot;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    menu() {
        return [];
    }
    renderTemplate({ template: templateName, parameters, selector, }) {
        var _a;
        const template = this.templates[templateName];
        if (!template) {
            throw new Error(`template "${templateName}" is missing, available templates: ${Object.keys(this.templates).join(', ')}`);
        }
        const html = template(parameters);
        const main = (_a = this.root) === null || _a === void 0 ? void 0 : _a.querySelector(selector || 'main');
        if (!main) {
            return;
        }
        main.innerHTML = html;
    }
    get params() {
        const attributes = this.element.attributes;
        return Object.fromEntries(this.metadata['stanza:parameter'].map((param) => {
            var _a;
            const key = param['stanza:key'];
            const type = param['stanza:type'];
            if (type === 'boolean') {
                return [key, attributes.hasOwnProperty(key)];
            }
            const valueStr = (_a = attributes.getNamedItem(key)) === null || _a === void 0 ? void 0 : _a.value;
            if (valueStr === null || valueStr === undefined) {
                return [key, valueStr];
            }
            let value;
            switch (type) {
                case 'number':
                    value = valueStr ? Number(valueStr) : undefined;
                    break;
                case 'date':
                case 'datetime':
                    value = valueStr ? new Date(valueStr) : undefined;
                    break;
                case 'json':
                    value = valueStr ? JSON.parse(valueStr) : undefined;
                    break;
                default:
                    value = valueStr;
            }
            return [key, value];
        }));
    }
    importWebFontCSS(cssUrl) {
        var _a;
        const el = document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        el.href = new URL(cssUrl, this.url).href;
        document.head.appendChild(el);
        (_a = this.root) === null || _a === void 0 ? void 0 : _a.appendChild(el.cloneNode());
    }
    handleAttributeChange(name, oldValue, newValue) {
        this.renderDebounced();
    }
    query({ template, parameters, endpoint, method, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sparql = this.templates[template](parameters);
            const payload = new URLSearchParams();
            payload.set('query', sparql);
            return yield fetch(endpoint, {
                method: method || 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/sparql-results+json',
                },
                body: payload,
            }).then((res) => res.json());
        });
    }
}

export { Stanza as S, __awaiter as _, __assign as a, getDefaultExportFromCjs as b, commonjsGlobal as c, defineStanzaElement as d, createPopper as e, getAugmentedNamespace as g, objectAssign$1 as o };
//# sourceMappingURL=stanza-6dd55acc.js.map
