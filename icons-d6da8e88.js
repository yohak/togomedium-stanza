import { n as newStyled } from './emotion-styled.browser.esm-798c6504.js';
import { A as capitalize, a2 as interopRequireDefaultExports, y as jsxRuntimeExports } from './StanzaReactProvider-36ae7cf4.js';
import { g as getAugmentedNamespace } from './stanza-a84d7c1e.js';
import { a as createChainedFunction, c as createSvgIcon$1, d as debounce, i as isMuiElement, o as ownerWindow } from './consts-55c53200.js';
import { C as ClassNameGenerator, o as ownerDocument, s as setRef, a as useEnhancedEffect, j as useControlled, k as useEventCallback, u as useForkRef, l as useIsFocusVisible } from './DefaultPropsProvider-4e645303.js';
import { d as useId } from './paths-0bbd78cc.js';

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

var createSvgIcon = {};

var require$$0 = /*@__PURE__*/getAugmentedNamespace(utils);

var hasRequiredCreateSvgIcon;

function requireCreateSvgIcon () {
	if (hasRequiredCreateSvgIcon) return createSvgIcon;
	hasRequiredCreateSvgIcon = 1;
	(function (exports) {
		'use client';

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
default_1$2 = AddBoxOutlined.default = (0, _createSvgIcon$2.default)( /*#__PURE__*/(0, _jsxRuntime$2.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
}), 'AddBoxOutlined');

var AdjustOutlined = {};

var _interopRequireDefault$1 = interopRequireDefaultExports;
Object.defineProperty(AdjustOutlined, "__esModule", {
  value: true
});
var default_1$1 = AdjustOutlined.default = void 0;
var _createSvgIcon$1 = _interopRequireDefault$1(requireCreateSvgIcon());
var _jsxRuntime$1 = jsxRuntimeExports;
default_1$1 = AdjustOutlined.default = (0, _createSvgIcon$1.default)( /*#__PURE__*/(0, _jsxRuntime$1.jsx)("path", {
  d: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3"
}), 'AdjustOutlined');

var IndeterminateCheckBoxOutlined = {};

var _interopRequireDefault = interopRequireDefaultExports;
Object.defineProperty(IndeterminateCheckBoxOutlined, "__esModule", {
  value: true
});
var default_1 = IndeterminateCheckBoxOutlined.default = void 0;
var _createSvgIcon = _interopRequireDefault(requireCreateSvgIcon());
var _jsxRuntime = jsxRuntimeExports;
default_1 = IndeterminateCheckBoxOutlined.default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM7 11h10v2H7z"
}), 'IndeterminateCheckBoxOutlined');

const IconExpand = default_1$2;
const IconCompact = default_1;
const IconNoChildren = default_1$1;
const IconBlank = newStyled.span({
    width: 24,
    height: 24,
});

export { IconBlank as I, IconNoChildren as a, IconCompact as b, IconExpand as c };
//# sourceMappingURL=icons-d6da8e88.js.map
