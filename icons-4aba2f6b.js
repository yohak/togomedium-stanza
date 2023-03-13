import { i as capitalize, c as jsxRuntimeExports, n as newStyled } from './EmotionCacheProvider-3b758372.js';
import { b as getAugmentedNamespace } from './stanza-bd712360.js';
import { a as createChainedFunction, c as createSvgIcon$1, d as debounce, i as isMuiElement, o as ownerWindow } from './createSvgIcon-74eb21f1.js';
import { C as ClassNameGenerator, o as ownerDocument, n as setRef, q as useEnhancedEffect, d as useId, c as useControlled, e as useEventCallback, h as useForkRef, f as useIsFocusVisible } from './Grow-1eacc08f.js';

function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}

function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  }
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}

// TODO: remove this export once ClassNameGenerator is stable
// eslint-disable-next-line @typescript-eslint/naming-convention
const unstable_ClassNameGenerator = {
  configure: generator => {
    ClassNameGenerator.configure(generator);
  }
};

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  unstable_ClassNameGenerator: unstable_ClassNameGenerator,
  capitalize: capitalize,
  createChainedFunction: createChainedFunction,
  createSvgIcon: createSvgIcon$1,
  debounce: debounce,
  deprecatedPropType: deprecatedPropType,
  isMuiElement: isMuiElement,
  ownerDocument: ownerDocument,
  ownerWindow: ownerWindow,
  requirePropFactory: requirePropFactory,
  setRef: setRef,
  unstable_useEnhancedEffect: useEnhancedEffect,
  unstable_useId: useId,
  unsupportedProp: unsupportedProp,
  useControlled: useControlled,
  useEventCallback: useEventCallback,
  useForkRef: useForkRef,
  useIsFocusVisible: useIsFocusVisible
});

var AddBoxOutlined = {};

var interopRequireDefaultExports = {};
var interopRequireDefault = {
  get exports(){ return interopRequireDefaultExports; },
  set exports(v){ interopRequireDefaultExports = v; },
};

(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}
	module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (interopRequireDefault));

var createSvgIcon = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(utils);

var hasRequiredCreateSvgIcon;

function requireCreateSvgIcon () {
	if (hasRequiredCreateSvgIcon) return createSvgIcon;
	hasRequiredCreateSvgIcon = 1;
	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports, "default", {
		  enumerable: true,
		  get: function () {
		    return _utils.createSvgIcon;
		  }
		});
		var _utils = require$$0;
} (createSvgIcon));
	return createSvgIcon;
}

var _interopRequireDefault$2 = interopRequireDefaultExports;
Object.defineProperty(AddBoxOutlined, "__esModule", {
  value: true
});
var default_1$2 = AddBoxOutlined.default = void 0;
var _createSvgIcon$2 = _interopRequireDefault$2(requireCreateSvgIcon());
var _jsxRuntime$2 = jsxRuntimeExports;
var _default$2 = (0, _createSvgIcon$2.default)( /*#__PURE__*/(0, _jsxRuntime$2.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
}), 'AddBoxOutlined');
default_1$2 = AddBoxOutlined.default = _default$2;

var AdjustOutlined = {};

var _interopRequireDefault$1 = interopRequireDefaultExports;
Object.defineProperty(AdjustOutlined, "__esModule", {
  value: true
});
var default_1$1 = AdjustOutlined.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(requireCreateSvgIcon());
var _jsxRuntime$1 = jsxRuntimeExports;
var _default$1 = (0, _createSvgIcon$1.default)( /*#__PURE__*/(0, _jsxRuntime$1.jsx)("path", {
  d: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
}), 'AdjustOutlined');
default_1$1 = AdjustOutlined.default = _default$1;

var IndeterminateCheckBoxOutlined = {};

var _interopRequireDefault = interopRequireDefaultExports;
Object.defineProperty(IndeterminateCheckBoxOutlined, "__esModule", {
  value: true
});
var default_1 = IndeterminateCheckBoxOutlined.default = void 0;
var _createSvgIcon = _interopRequireDefault(requireCreateSvgIcon());
var _jsxRuntime = jsxRuntimeExports;
var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 11h10v2H7z"
}), 'IndeterminateCheckBoxOutlined');
default_1 = IndeterminateCheckBoxOutlined.default = _default;

const IconExpand = default_1$2;
const IconCompact = default_1;
const IconNoChildren = default_1$1;
const IconBlank = newStyled.span({
    width: 24,
    height: 24,
});

export { IconBlank as I, IconNoChildren as a, IconCompact as b, IconExpand as c };
//# sourceMappingURL=icons-4aba2f6b.js.map
