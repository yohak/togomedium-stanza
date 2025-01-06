import { g as getDefaultExportFromCjs, a as __assign, b as getAugmentedNamespace, c as commonjsGlobal, _ as __awaiter } from './stanza-97f45b0e.js';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

var reactExports = {};
var react = {
  get exports(){ return reactExports; },
  set exports(v){ reactExports = v; },
};

var react_production_min = {};

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1=Symbol.for("react.element"),n$1=Symbol.for("react.portal"),p$1=Symbol.for("react.fragment"),q$1=Symbol.for("react.strict_mode"),r$1=Symbol.for("react.profiler"),t$1=Symbol.for("react.provider"),u=Symbol.for("react.context"),v$1=Symbol.for("react.forward_ref"),w$1=Symbol.for("react.suspense"),x$1=Symbol.for("react.memo"),y$1=Symbol.for("react.lazy"),z$1=Symbol.iterator;function A$1(a){if(null===a||"object"!==typeof a)return null;a=z$1&&a[z$1]||a["@@iterator"];return "function"===typeof a?a:null}
var B={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B;}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B;}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f;}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return {$$typeof:l$1,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return {$$typeof:l$1,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return "object"===typeof a&&null!==a&&a.$$typeof===l$1}function escape(a){var b={"=":"=0",":":"=2"};return "$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l$1:case n$1:h=!0;}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c);}else if(f=A$1(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b;},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b;});-1===a._status&&(a._status=0,a._result=b);}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
react_production_min.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments);},e);},count:function(a){var b=0;S(a,function(){b++;});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};react_production_min.Component=E;react_production_min.Fragment=p$1;react_production_min.Profiler=r$1;react_production_min.PureComponent=G;react_production_min.StrictMode=q$1;react_production_min.Suspense=w$1;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;react_production_min.act=X;
react_production_min.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f]);}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g;}return {$$typeof:l$1,type:a.type,key:c,ref:k,props:d,_owner:h}};react_production_min.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t$1,_context:a};return a.Consumer=a};react_production_min.createElement=M;react_production_min.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};react_production_min.createRef=function(){return {current:null}};
react_production_min.forwardRef=function(a){return {$$typeof:v$1,render:a}};react_production_min.isValidElement=O;react_production_min.lazy=function(a){return {$$typeof:y$1,_payload:{_status:-1,_result:a},_init:T}};react_production_min.memo=function(a,b){return {$$typeof:x$1,type:a,compare:void 0===b?null:b}};react_production_min.startTransition=function(a){var b=V.transition;V.transition={};try{a();}finally{V.transition=b;}};react_production_min.unstable_act=X;react_production_min.useCallback=function(a,b){return U.current.useCallback(a,b)};react_production_min.useContext=function(a){return U.current.useContext(a)};
react_production_min.useDebugValue=function(){};react_production_min.useDeferredValue=function(a){return U.current.useDeferredValue(a)};react_production_min.useEffect=function(a,b){return U.current.useEffect(a,b)};react_production_min.useId=function(){return U.current.useId()};react_production_min.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};react_production_min.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};react_production_min.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
react_production_min.useMemo=function(a,b){return U.current.useMemo(a,b)};react_production_min.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};react_production_min.useRef=function(a){return U.current.useRef(a)};react_production_min.useState=function(a){return U.current.useState(a)};react_production_min.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};react_production_min.useTransition=function(){return U.current.useTransition()};react_production_min.version="18.3.1";

(function (module) {

	{
	  module.exports = react_production_min;
	}
} (react));

var React = /*@__PURE__*/getDefaultExportFromCjs(reactExports);

var React$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  'default': React
}, [reactExports]);

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace$1 (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace$1(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace$1(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace$1(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace$1(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace$1(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace$1(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace$1(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace$1(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace$1(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace$1(value, '-grow', '') + WEBKIT + value + MS + replace$1(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace$1(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace$1(replace$1(replace$1(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace$1(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace$1(replace$1(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace$1(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace$1(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? prefix(replace$1(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace$1(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace$1(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace$1(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace$1(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace$1(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return serialize([copy(element, {
        value: replace$1(element.value, '@', '@' + WEBKIT)
      })], callback);

    case RULESET:
      if (element.length) return combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return serialize([copy(element, {
              props: [replace$1(value, /:(read-\w+)/, ':' + MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return serialize([copy(element, {
              props: [replace$1(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
            }), copy(element, {
              props: [replace$1(value, /:(plac\w+)/, ':' + MOZ + '$1')]
            }), copy(element, {
              props: [replace$1(value, /:(plac\w+)/, MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

var reactIsExports = {};
var reactIs$1 = {
  get exports(){ return reactIsExports; },
  set exports(v){ reactIsExports = v; },
};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

(function (module) {

	{
	  module.exports = reactIs_production_min;
	}
} (reactIs$1));

var reactIs = reactIsExports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics$1(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics$1(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics$1;

// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = (function (targetComponent, sourceComponent) {
  return hoistNonReactStatics_cjs(targetComponent, sourceComponent);
});

var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {

      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = React$1['useInsertion' + 'Effect'] ? React$1['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || reactExports.useLayoutEffect;

var hasOwn = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */reactExports.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return reactExports.useContext(EmotionCacheContext);
};

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/reactExports.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = reactExports.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */reactExports.createContext({});

var useTheme = function useTheme() {
  return reactExports.useContext(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = reactExports.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/reactExports.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || 'Component';

  var render = function render(props, ref) {
    var theme = reactExports.useContext(ThemeContext);
    return /*#__PURE__*/reactExports.createElement(Component, _extends({
      theme: theme,
      ref: ref
    }, props));
  }; // $FlowFixMe


  var WithTheme = /*#__PURE__*/reactExports.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics(WithTheme, Component);
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {

  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when

  return newProps;
};

var Insertion$1 = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion$1 = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, reactExports.useContext(ThemeContext));

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwn.call(props, key) && key !== 'css' && key !== typePropName && ("production" === 'production' )) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/reactExports.createElement(reactExports.Fragment, null, /*#__PURE__*/reactExports.createElement(Insertion$1, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/reactExports.createElement(WrappedComponent, newProps));
});

var Emotion$1$1 = Emotion$1;

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwn.call(props, 'css')) {
    // $FlowFixMe
    return reactExports.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1$1;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return reactExports.createElement.apply(null, createElementArgArray);
};
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, reactExports.useContext(ThemeContext));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = reactExports.useRef();
  useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  useInsertionEffectAlwaysWithSyncFallback(function () {

    for (var i = 0; i < serializedArr.length; i++) {
      insertStyles(cache, serializedArr[i], false);
    }
  });

  return null;
};

var ClassNames = /* #__PURE__ */withEmotionCache(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && "production" !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && "production" !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: reactExports.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/reactExports.createElement(reactExports.Fragment, null, /*#__PURE__*/reactExports.createElement(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

var emotionReact_browser_esm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ClassNames: ClassNames,
  Global: Global,
  createElement: jsx,
  css: css,
  jsx: jsx,
  keyframes: keyframes,
  CacheProvider: CacheProvider,
  ThemeContext: ThemeContext,
  ThemeProvider: ThemeProvider,
  __unsafe_useEmotionCache: __unsafe_useEmotionCache,
  useTheme: useTheme,
  withEmotionCache: withEmotionCache,
  withTheme: withTheme
});

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

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(dist_es2015);

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
	
} (stripUnit));

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
const change_case_1 = require$$0$1;
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
	
} (getDocumentScroll));

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
	
} (is));

var Emotion = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(emotionReact_browser_esm);

Object.defineProperty(Emotion, "__esModule", { value: true });
Emotion.Transition = Emotion.Ease = void 0;
const react_1 = require$$0;
const is_1 = is;
const _1_IN_SINE = [0.12, 0, 0.39, 0];
const _1_OUT_SINE = [0.61, 1, 0.88, 1];
const _1_IN_OUT_SINE = [0.37, 0, 0.63, 1];
const _2_IN_QUAD = [0.11, 0, 0.5, 0];
const _2_OUT_QUAD = [0.5, 1, 0.89, 1];
const _2_IN_OUT_QUAD = [0.45, 0, 0.55, 1];
const _3_IN_QUBIC = [0.32, 0, 0.67, 0];
const _3_OUT_QUBIC = [0.33, 1, 0.68, 1];
const _3_IN_OUT_QUBIC = [0.65, 0, 0.35, 1];
const _4_IN_QUART = [0.5, 0, 0.75, 0];
const _4_OUT_QUART = [0.25, 1, 0.5, 1];
const _4_IN_OUT_QUART = [0.76, 0, 0.24, 1];
const _5_IN_QUINT = [0.64, 0, 0.78, 0];
const _5_OUT_QUINT = [0.22, 1, 0.36, 1];
const _5_IN_OUT_QUINT = [0.83, 0, 0.17, 1];
const _6_IN_EXPO = [0.7, 0, 0.84, 0];
const _6_OUT_EXPO = [0.16, 1, 0.3, 1];
const _6_IN_OUT_EXPO = [0.87, 0, 0.13, 1];
const IN_CIRC = [0.55, 0, 1, 0.45];
const OUT_CIRC = [0, 0.55, 0.45, 1];
const IN_OUT_CIRC = [0.85, 0, 0.15, 1];
const IN_BACK = [0.36, 0, 0.66, -0.56];
const OUT_BACK = [0.34, 1.56, 0.64, 1];
const IN_OUT_BACK = [0.68, -0.6, 0.32, 1.6];
const transition = (ease, ms) => {
    const timingFunction = ease ? cubicBezier(ease) : "linear";
    const duration = is_1.isValidNumber(ms) ? `transition-duration: ${ms}ms` : "";
    return react_1.css `
    transition-timing-function: ${timingFunction};
    ${duration};
  `;
};
const cubicBezier = (ease) => `cubic-bezier(${ease.join(",")})`;
Emotion.Ease = {
    _1_IN_SINE: cubicBezier(_1_IN_SINE),
    _1_OUT_SINE: cubicBezier(_1_OUT_SINE),
    _1_IN_OUT_SINE: cubicBezier(_1_IN_OUT_SINE),
    _2_IN_QUAD: cubicBezier(_2_IN_QUAD),
    _2_OUT_QUAD: cubicBezier(_2_OUT_QUAD),
    _2_IN_OUT_QUAD: cubicBezier(_2_IN_OUT_QUAD),
    _3_IN_QUBIC: cubicBezier(_3_IN_QUBIC),
    _3_OUT_QUBIC: cubicBezier(_3_OUT_QUBIC),
    _3_IN_OUT_QUBIC: cubicBezier(_3_IN_OUT_QUBIC),
    _4_IN_QUART: cubicBezier(_4_IN_QUART),
    _4_OUT_QUART: cubicBezier(_4_OUT_QUART),
    _4_IN_OUT_QUART: cubicBezier(_4_IN_OUT_QUART),
    _5_IN_QUINT: cubicBezier(_5_IN_QUINT),
    _5_OUT_QUINT: cubicBezier(_5_OUT_QUINT),
    _5_IN_OUT_QUINT: cubicBezier(_5_IN_OUT_QUINT),
    _6_IN_EXPO: cubicBezier(_6_IN_EXPO),
    _6_OUT_EXPO: cubicBezier(_6_OUT_EXPO),
    _6_IN_OUT_EXPO: cubicBezier(_6_IN_OUT_EXPO),
    IN_CIRC: cubicBezier(IN_CIRC),
    OUT_CIRC: cubicBezier(OUT_CIRC),
    IN_OUT_CIRC: cubicBezier(IN_OUT_CIRC),
    IN_BACK: cubicBezier(IN_BACK),
    OUT_BACK: cubicBezier(OUT_BACK),
    IN_OUT_BACK: cubicBezier(IN_OUT_BACK),
    custom: (ease) => cubicBezier(ease),
};
Emotion.Transition = {
    _1_easeInSine: (ms) => transition(_1_IN_SINE, ms),
    _1_easeOutSine: (ms) => transition(_1_OUT_SINE, ms),
    _1_easeInOutSine: (ms) => transition(_1_IN_OUT_SINE, ms),
    _2_easeInQuad: (ms) => transition(_2_IN_QUAD, ms),
    _2_easeOutQuad: (ms) => transition(_2_OUT_QUAD, ms),
    _2_easeInOutQuad: (ms) => transition(_2_IN_OUT_QUAD, ms),
    _3_easeInQubic: (ms) => transition(_3_IN_QUBIC, ms),
    _3_easeOutQubic: (ms) => transition(_3_OUT_QUBIC, ms),
    _3_easeInOutQubic: (ms) => transition(_3_IN_OUT_QUBIC, ms),
    _4_easeInQuart: (ms) => transition(_4_IN_QUART, ms),
    _4_easeOutQuart: (ms) => transition(_4_OUT_QUART, ms),
    _4_easeInOutQuart: (ms) => transition(_4_IN_OUT_QUART, ms),
    _5_easeInQuint: (ms) => transition(_5_IN_QUINT, ms),
    _5_easeOutQuint: (ms) => transition(_5_OUT_QUINT, ms),
    _5_easeInOutQuint: (ms) => transition(_5_IN_OUT_QUINT, ms),
    _6_easeInExpo: (ms) => transition(_6_IN_EXPO, ms),
    _6_easeOutExpo: (ms) => transition(_6_OUT_EXPO, ms),
    _6_easeInOutExpo: (ms) => transition(_6_IN_OUT_EXPO, ms),
    _easeInCirc: (ms) => transition(IN_CIRC, ms),
    _easeOutCirc: (ms) => transition(OUT_CIRC, ms),
    _easeInOutCirc: (ms) => transition(IN_OUT_CIRC, ms),
    _easeInBack: (ms) => transition(IN_BACK, ms),
    _easeOutBack: (ms) => transition(OUT_BACK, ms),
    _easeInOutBack: (ms) => transition(IN_OUT_BACK, ms),
    _easeLinear: (ms) => transition(null, ms),
    _easeCustom: (params, ms) => transition(params, ms),
};

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
	__exportStar(Emotion, exports);
	
} (dist));

const getData = (url, params, abortController) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, makeOptions(params, abortController ? abortController.signal : null));
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
const makeFormBody = (params) => {
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(dist.isArray(value) ? value.join(",") : value)}`);
    return formBody.join("&");
};
const makeOptions = (params, signal = null) => {
    const body = makeFormBody(params);
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        signal,
    };
};

export { CacheProvider as C, Emotion$1$1 as E, Global as G, React as R, ThemeContext as T, _extends as _, createEmotionProps as a, createCache as b, css as c, getRegisteredStyles as d, registerStyles as e, React$1 as f, getData as g, hasOwn as h, insertStyles as i, jsx as j, keyframes as k, dist as l, memoize as m, makeFormBody as n, reactExports as r, serializeStyles as s, useInsertionEffectAlwaysWithSyncFallback as u, withEmotionCache as w };
//# sourceMappingURL=getData-8b0d864a.js.map
