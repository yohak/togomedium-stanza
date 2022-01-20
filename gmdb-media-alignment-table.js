import { g as getAugmentedNamespace, S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { _ as _extends, c as capitalize, s as setRef, u as useEnhancedEffect, a as useEventCallback, b as useForkRef, d as useIsFocusVisible, C as ClassNameGenerator, j as jsxRuntime, n as newStyled, e as css, f as COLOR_WHITE, S as SIZE1, g as SIZE4, h as SIZE3, i as jsx, k as jsxs, l as jsx$1, m as COLOR_GRAY700, o as generateUtilityClass, p as generateUtilityClasses, q as styled, r as alpha, t as react, v as useThemeProps, w as _objectWithoutPropertiesLoose, x as clsx, y as composeClasses, z as COLOR_PRIMARY, A as COLOR_GRAY, F as FONT_EN, B as COLOR_GRAY_LINE, D as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-514a31e5.js';
import { R as Recoil_index_6, a as Recoil_index_18, b as Recoil_index_22, c as Recoil_index_4 } from './recoil-d3a049b1.js';
import { i as isHostComponent, c as createChainedFunction, a as createSvgIcon$1, d as debounce, b as isMuiElement, o as ownerDocument, e as ownerWindow, u as useId, f as useControlled, P as Popper, g as useTheme, G as Grow } from './Grow-b0e272fa.js';
import { i as importWebFontForTogoMedium } from './stanza-488096af.js';
import { s as stringToArray } from './string-ad764b4c.js';

var AddBoxOutlined = {};

var interopRequireDefault = {exports: {}};

(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}(interopRequireDefault));

var createSvgIcon = {};

function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}

function requirePropFactory(componentNameInError, Component) {
  {
    return () => null;
  } // eslint-disable-next-line react/forbid-foreign-prop-types
}

function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `ownerState` are not applied.
 * @param existingProps Props of the element.
 * @param ownerState
 */

function appendOwnerState(elementType, existingProps = {}, ownerState) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }

  return _extends({}, existingProps, {
    ownerState: _extends({}, existingProps.ownerState, ownerState)
  });
}

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
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
  useIsFocusVisible: useIsFocusVisible,
  unstable_ClassNameGenerator: ClassNameGenerator
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(utils);

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
}(createSvgIcon));

var _interopRequireDefault$1 = interopRequireDefault.exports;

Object.defineProperty(AddBoxOutlined, "__esModule", {
  value: true
});
var default_1$1 = AddBoxOutlined.default = void 0;

var _createSvgIcon$1 = _interopRequireDefault$1(createSvgIcon);

var _jsxRuntime$1 = jsxRuntime.exports;

var _default$1 = (0, _createSvgIcon$1.default)( /*#__PURE__*/(0, _jsxRuntime$1.jsx)("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
}), 'AddBoxOutlined');

default_1$1 = AddBoxOutlined.default = _default$1;

var IndeterminateCheckBoxOutlined = {};

var _interopRequireDefault = interopRequireDefault.exports;

Object.defineProperty(IndeterminateCheckBoxOutlined, "__esModule", {
  value: true
});
var default_1 = IndeterminateCheckBoxOutlined.default = void 0;

var _createSvgIcon = _interopRequireDefault(createSvgIcon);

var _jsxRuntime = jsxRuntime.exports;

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 11h10v2H7z"
}), 'IndeterminateCheckBoxOutlined');

default_1 = IndeterminateCheckBoxOutlined.default = _default;

const IconExpand = default_1$1;
const IconCompact = default_1;
const IconBlank = newStyled.span({
    width: 24,
    height: 24,
});

const WIDTH_EXPANDED = "200px";
const WIDTH_COMPACT = "120px";
const WIDTH_ALIGNMENT_CELL = 40;

const findBranchFromTree = (id, tree) => {
    return tree.map((branch) => findNode(id, branch)).find((r) => !!r);
};
function findNode(id, currentNode) {
    let i, currentChild, result;
    if (id == currentNode.id) {
        return currentNode;
    }
    else {
        for (i = 0; i < currentNode.children.length; i += 1) {
            currentChild = currentNode.children[i];
            result = findNode(id, currentChild);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
}

const toggleFooterComponent = (id, data) => {
    const cloned = clone(data);
    const branch = findBranchFromTree(id, cloned);
    if (branch) {
        branch.isOpen = !branch.isOpen;
        return cloned;
    }
    else {
        return undefined;
    }
};
const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const componentTree = Recoil_index_6({ key: "componentTree", default: [] });
const useComponentTreeState = () => {
    return Recoil_index_18(componentTree);
};
const useComponentTreeMutators = () => {
    const setComponentTree = Recoil_index_22(componentTree);
    const toggleComponent = (id) => {
        setComponentTree((prev) => {
            const result = toggleFooterComponent(id, prev);
            if (result) {
                return result;
            }
            else {
                return [];
            }
        });
    };
    return { toggleComponent, setComponentTree };
};

const FooterCell = ({ label, level, hasChildren, isOpen, id }) => {
    const { toggleComponent } = useComponentTreeMutators();
    const onClickFooterItem = (id) => toggleComponent(id);
    const Icon = hasChildren ? (isOpen ? (jsx(IconCompact, { css: icon$1, onClick: () => onClickFooterItem(id) }, void 0)) : (jsx(IconExpand, { css: icon$1, onClick: () => onClickFooterItem(id) }, void 0))) : (jsx(IconBlank, { css: icon$1 }, void 0));
    return (jsxs("div", Object.assign({ css: wrapper$9 }, { children: [new Array(level).fill(null).map((r, index) => (jsx("span", { className: "spacer" }, index))), Icon, jsx("span", Object.assign({ className: "text" }, { children: label }), void 0)] }), void 0));
};
const wrapper$9 = css `
  box-sizing: border-box;
  width: ${WIDTH_ALIGNMENT_CELL}px;
  background-color: ${COLOR_WHITE};
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${SIZE1};
  padding-bottom: ${SIZE4};
  & > .text {
    writing-mode: vertical-rl;
  }
  & > .spacer {
    display: block;
    height: ${SIZE3};
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const iconBlank = css `
  margin-bottom: ${SIZE1};
`;
const icon$1 = css `
  ${iconBlank};
  cursor: pointer;
`;

const isMediaExpanded = Recoil_index_6({ key: "isMediaExpanded", default: false });
const useIsMediaExpendedState = () => {
    return Recoil_index_18(isMediaExpanded);
};
const useIsMediaExpandedMutators = () => {
    const setIsMediaExpanded = Recoil_index_22(isMediaExpanded);
    return { setIsMediaExpanded };
};

const isOrganismsExpanded = Recoil_index_6({ key: "isOrganismsExpanded", default: false });
const useIsOrganismsExpendedState = () => {
    return Recoil_index_18(isOrganismsExpanded);
};
const useIsOrganismsExpandedMutators = () => {
    const setIsOrganismsExpanded = Recoil_index_22(isOrganismsExpanded);
    return { setIsOrganismsExpanded };
};

const FooterRow = ({ components }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs("div", Object.assign({ css: wrapper$8 }, { children: [jsx("div", { css: infoSpacer, className: isMediaExpanded ? "expand" : "compact" }, void 0), jsx("div", { css: infoSpacer, className: isOrganismsExpanded ? "expand" : "compact" }, void 0), components.map((component) => (jsx$1(FooterCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: componentSpacer }, void 0)] }), void 0));
};
const wrapper$8 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const infoSpacer = css `
  background-color: ${COLOR_WHITE};
  &.expand {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;
const componentSpacer = css `
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;

const HeaderCell = ({ label, onClickIcon, isExpanded }) => {
    return (jsxs("div", Object.assign({ css: wrapper$7, className: isExpanded ? "expanded" : "compact" }, { children: [jsx("span", { children: label }, void 0), isExpanded ? (jsx(IconCompact, { css: icon, onClick: onClickIcon }, void 0)) : (jsx(IconExpand, { css: icon, onClick: onClickIcon }, void 0))] }), void 0));
};
const wrapper$7 = css `
  display: flex;
  background-color: ${COLOR_WHITE};
  align-items: center;
  justify-content: space-between;
  padding: ${SIZE1};
  box-sizing: border-box;

  &.expanded {
    width: ${WIDTH_EXPANDED};
  }

  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;
const icon = css `
  font-size: 24px;
  color: ${COLOR_GRAY700};
  cursor: pointer;
`;

const HeaderRow = ({ css, className }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    return (jsxs("div", Object.assign({ css: [wrapper$6, css], className: className }, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }, void 0), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }, void 0), jsx("div", Object.assign({ css: components }, { children: "Components" }), void 0)] }), void 0));
};
const wrapper$6 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const components = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
  padding: ${SIZE1};
  flex-grow: 1 !important;
`;

function getTooltipUtilityClass(slot) {
  return generateUtilityClass('MuiTooltip', slot);
}
const tooltipClasses = generateUtilityClasses('MuiTooltip', ['popper', 'popperInteractive', 'popperArrow', 'popperClose', 'tooltip', 'tooltipArrow', 'touch', 'tooltipPlacementLeft', 'tooltipPlacementRight', 'tooltipPlacementTop', 'tooltipPlacementBottom', 'arrow']);
var tooltipClasses$1 = tooltipClasses;

const _excluded = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"];

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const useUtilityClasses = ownerState => {
  const {
    classes,
    disableInteractive,
    arrow,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: ['tooltip', arrow && 'tooltipArrow', touch && 'touch', `tooltipPlacement${capitalize(placement.split('-')[0])}`],
    arrow: ['arrow']
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};

const TooltipPopper = styled(Popper, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.popper, !ownerState.disableInteractive && styles.popperInteractive, ownerState.arrow && styles.popperArrow, !ownerState.open && styles.popperClose];
  }
})(({
  theme,
  ownerState,
  open
}) => _extends({
  zIndex: theme.zIndex.tooltip,
  pointerEvents: 'none'
}, !ownerState.disableInteractive && {
  pointerEvents: 'auto'
}, !open && {
  pointerEvents: 'none'
}, ownerState.arrow && {
  [`&[data-popper-placement*="bottom"] .${tooltipClasses$1.arrow}`]: {
    top: 0,
    marginTop: '-0.71em',
    '&::before': {
      transformOrigin: '0 100%'
    }
  },
  [`&[data-popper-placement*="top"] .${tooltipClasses$1.arrow}`]: {
    bottom: 0,
    marginBottom: '-0.71em',
    '&::before': {
      transformOrigin: '100% 0'
    }
  },
  [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: _extends({}, !ownerState.isRtl ? {
    left: 0,
    marginLeft: '-0.71em'
  } : {
    right: 0,
    marginRight: '-0.71em'
  }, {
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '100% 100%'
    }
  }),
  [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: _extends({}, !ownerState.isRtl ? {
    right: 0,
    marginRight: '-0.71em'
  } : {
    left: 0,
    marginLeft: '-0.71em'
  }, {
    height: '1em',
    width: '0.71em',
    '&::before': {
      transformOrigin: '0 0'
    }
  })
}));
const TooltipTooltip = styled('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.tooltip, ownerState.touch && styles.touch, ownerState.arrow && styles.tooltipArrow, styles[`tooltipPlacement${capitalize(ownerState.placement.split('-')[0])}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  backgroundColor: alpha(theme.palette.grey[700], 0.92),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  fontFamily: theme.typography.fontFamily,
  padding: '4px 8px',
  fontSize: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: 'break-word',
  fontWeight: theme.typography.fontWeightMedium
}, ownerState.arrow && {
  position: 'relative',
  margin: 0
}, ownerState.touch && {
  padding: '8px 16px',
  fontSize: theme.typography.pxToRem(14),
  lineHeight: `${round(16 / 14)}em`,
  fontWeight: theme.typography.fontWeightRegular
}, {
  [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: _extends({
    transformOrigin: 'right center'
  }, !ownerState.isRtl ? _extends({
    marginRight: '14px'
  }, ownerState.touch && {
    marginRight: '24px'
  }) : _extends({
    marginLeft: '14px'
  }, ownerState.touch && {
    marginLeft: '24px'
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: _extends({
    transformOrigin: 'left center'
  }, !ownerState.isRtl ? _extends({
    marginLeft: '14px'
  }, ownerState.touch && {
    marginLeft: '24px'
  }) : _extends({
    marginRight: '14px'
  }, ownerState.touch && {
    marginRight: '24px'
  })),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="top"] &`]: _extends({
    transformOrigin: 'center bottom',
    marginBottom: '14px'
  }, ownerState.touch && {
    marginBottom: '24px'
  }),
  [`.${tooltipClasses$1.popper}[data-popper-placement*="bottom"] &`]: _extends({
    transformOrigin: 'center top',
    marginTop: '14px'
  }, ownerState.touch && {
    marginTop: '24px'
  })
}));
const TooltipArrow = styled('span', {
  name: 'MuiTooltip',
  slot: 'Arrow',
  overridesResolver: (props, styles) => styles.arrow
})(({
  theme
}) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '1em',
  height: '0.71em'
  /* = width / sqrt(2) = (length of the hypotenuse) */
  ,
  boxSizing: 'border-box',
  color: alpha(theme.palette.grey[700], 0.9),
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    transform: 'rotate(45deg)'
  }
}));
let hystersisOpen = false;
let hystersisTimer = null;

function composeEventHandler(handler, eventHandler) {
  return event => {
    if (eventHandler) {
      eventHandler(event);
    }

    handler(event);
  };
} // TODO v6: Remove PopperComponent, PopperProps, TransitionComponent and TransitionProps.


const Tooltip = /*#__PURE__*/react.exports.forwardRef(function Tooltip(inProps, ref) {
  var _components$Popper, _ref, _components$Transitio, _components$Tooltip, _components$Arrow, _componentsProps$popp;

  const props = useThemeProps({
    props: inProps,
    name: 'MuiTooltip'
  });

  const {
    arrow = false,
    children,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    title,
    TransitionComponent: TransitionComponentProp = Grow,
    TransitionProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const [childNode, setChildNode] = react.exports.useState();
  const [arrowRef, setArrowRef] = react.exports.useState(null);
  const ignoreNonTouchEvents = react.exports.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = react.exports.useRef();
  const enterTimer = react.exports.useRef();
  const leaveTimer = react.exports.useRef();
  const touchTimer = react.exports.useRef();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  });
  let open = openState;

  const id = useId(idProp);
  const prevUserSelect = react.exports.useRef();
  const stopTouchInteraction = react.exports.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }

    clearTimeout(touchTimer.current);
  }, []);
  react.exports.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = event => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  event => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  const handleEnter = event => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = event => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible(); // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.

  const [, setChildIsFocusVisible] = react.exports.useState(false);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };

  const handleFocus = event => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }
  };

  const detectTouchStart = event => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = event => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect; // Prevent iOS text selection on long-tap.

    document.body.style.WebkitUserSelect = 'none';
    touchTimer.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = event => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  react.exports.useEffect(() => {
    if (!open) {
      return undefined;
    }
    /**
     * @param {KeyboardEvent} nativeEvent
     */


    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  const positionRef = react.exports.useRef({
    x: 0,
    y: 0
  });
  const popperRef = react.exports.useRef();

  const handleMouseMove = event => {
    const childrenProps = children.props;

    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = _extends({}, nameOrDescProps, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  const popperOptions = react.exports.useMemo(() => {
    var _PopperProps$popperOp;

    let tooltipModifiers = [{
      name: 'arrow',
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];

    if ((_PopperProps$popperOp = PopperProps.popperOptions) != null && _PopperProps$popperOp.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }

    return _extends({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);

  const ownerState = _extends({}, props, {
    isRtl,
    arrow,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current
  });

  const classes = useUtilityClasses(ownerState);
  const PopperComponent = (_components$Popper = components.Popper) != null ? _components$Popper : TooltipPopper;
  const TransitionComponent = (_ref = (_components$Transitio = components.Transition) != null ? _components$Transitio : TransitionComponentProp) != null ? _ref : Grow;
  const TooltipComponent = (_components$Tooltip = components.Tooltip) != null ? _components$Tooltip : TooltipTooltip;
  const ArrowComponent = (_components$Arrow = components.Arrow) != null ? _components$Arrow : TooltipArrow;
  const popperProps = appendOwnerState(PopperComponent, _extends({}, PopperProps, componentsProps.popper), ownerState);
  const transitionProps = appendOwnerState(TransitionComponent, _extends({}, TransitionProps, componentsProps.transition), ownerState);
  const tooltipProps = appendOwnerState(TooltipComponent, _extends({}, componentsProps.tooltip), ownerState);
  const tooltipArrowProps = appendOwnerState(ArrowComponent, _extends({}, componentsProps.arrow), ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
    children: [/*#__PURE__*/react.exports.cloneElement(children, childrenProps), /*#__PURE__*/jsxRuntime.exports.jsx(PopperComponent, _extends({
      as: PopperComponentProp != null ? PopperComponentProp : Popper,
      placement: placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: positionRef.current.y,
          left: positionRef.current.x,
          right: positionRef.current.x,
          bottom: positionRef.current.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef: popperRef,
      open: childNode ? open : false,
      id: id,
      transition: true
    }, interactiveWrapperListeners, popperProps, {
      className: clsx(classes.popper, PopperProps == null ? void 0 : PopperProps.className, (_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className),
      popperOptions: popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => {
        var _componentsProps$tool, _componentsProps$arro;

        return /*#__PURE__*/jsxRuntime.exports.jsx(TransitionComponent, _extends({
          timeout: theme.transitions.duration.shorter
        }, TransitionPropsInner, transitionProps, {
          children: /*#__PURE__*/jsxRuntime.exports.jsxs(TooltipComponent, _extends({}, tooltipProps, {
            className: clsx(classes.tooltip, (_componentsProps$tool = componentsProps.tooltip) == null ? void 0 : _componentsProps$tool.className),
            children: [title, arrow ? /*#__PURE__*/jsxRuntime.exports.jsx(ArrowComponent, _extends({}, tooltipArrowProps, {
              className: clsx(classes.arrow, (_componentsProps$arro = componentsProps.arrow) == null ? void 0 : _componentsProps$arro.className),
              ref: setArrowRef
            })) : null]
          }))
        }));
      }
    }))]
  });
});
var Tooltip$1 = Tooltip;

const PATH_BASE = "http://growthmedium.org";
const PATH_MEDIUM = `${PATH_BASE}/medium/`;
const PATH_ORGANISM = `${PATH_BASE}/organism/`;
const PATH_COMPONENT = `${PATH_BASE}/components/`;

const AlignmentCell = ({ state, label, id }) => {
    return (jsx("div", Object.assign({ css: wrapper$5 }, { children: jsx(Tooltip$1, Object.assign({ title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true }, { children: jsx("a", Object.assign({ href: `${PATH_COMPONENT}${id}`, target: "_blank", className: `icon-${state} icon`, rel: "noreferrer" }, { children: jsx("span", {}, void 0) }), void 0) }), void 0) }), void 0));
};
const wrapper$5 = css `
  box-sizing: border-box;
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1};
  display: flex;
  width: fit-content;
  align-items: center;
  flex-grow: 0;
  .icon {
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }
  .icon-available > span {
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${COLOR_PRIMARY};
  }
  .icon-grouped > span {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 2px solid ${COLOR_PRIMARY};
  }

  .icon-none > span {
    display: none;
    box-sizing: border-box;
    width: 100%;
    height: 4px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
  }
`;

const InfoCell = (props) => {
    return props.expanded ? jsx(Expanded, Object.assign({}, props), void 0) : jsx(Compact, Object.assign({}, props), void 0);
};
const Compact = ({ info, linkBase }) => {
    return (jsx("div", Object.assign({ css: wrapper$4, className: "compact" }, { children: jsx("div", Object.assign({ className: "inner" }, { children: info.map((item, index) => (jsxs("div", Object.assign({ className: "text" }, { children: [jsx(Tooltip$1, Object.assign({ title: item.label, placement: "top", PopperProps: { disablePortal: true }, arrow: true }, { children: jsx("a", Object.assign({ href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer" }, { children: item.id }), void 0) }), void 0), index < info.length - 1 && ","] }), item.id))) }), void 0) }), void 0));
};
const Expanded = ({ info, linkBase }) => {
    return (jsx("div", Object.assign({ css: wrapper$4, className: "expanded" }, { children: jsx("div", Object.assign({ className: "inner" }, { children: info.map((item) => (jsxs("div", Object.assign({ className: "text" }, { children: [jsx("a", Object.assign({ href: `${linkBase}${item.id}`, target: "_blank", rel: "noreferrer" }, { children: item.id }), void 0), jsx("span", { children: item.label }, void 0)] }), item.id))) }), void 0) }), void 0));
};
const wrapper$4 = css `
  font-family: ${FONT_EN};
  font-size: 14px;
  background-color: ${COLOR_WHITE};
  box-sizing: border-box;
  padding: ${SIZE1};
  display: block;
  min-height: 40px;
  .inner {
    padding-top: 4px;
  }
  a {
    color: ${COLOR_PRIMARY};
    text-decoration: none;
  }
  &.compact {
    width: ${WIDTH_COMPACT};
    .inner {
      display: flex;
    }
    .text {
      margin-right: ${SIZE1};
    }
  }
  &.expanded {
    width: ${WIDTH_EXPANDED};
    .text {
      display: flex;
      flex-direction: column;
      + .text {
        margin-top: ${SIZE1};
      }
    }
  }
`;

const MediaRow = ({ medium, organisms, components }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs("div", Object.assign({ css: wrapper$3 }, { children: [jsx(InfoCell, { info: [medium], expanded: isMediaExpanded, linkBase: PATH_MEDIUM }, void 0), jsx(InfoCell, { info: organisms, expanded: isOrganismsExpanded, linkBase: PATH_ORGANISM }, void 0), components.map((component) => (jsx$1(AlignmentCell, Object.assign({}, component, { key: component.id })))), jsx("div", { css: spacer$1 }, void 0)] }), void 0));
};
const wrapper$3 = css `
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;
const spacer$1 = css `
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;

const makeAlignmentData = (data, footerComponents) => {
    return data.media.map((medium) => makeMediaRowProp(medium, data.organisms, data.components, footerComponents));
};
const makeMediaRowProp = (mediumData, organismsData, componentsData, footerList) => {
    const medium = {
        id: mediumData.gmid,
        label: mediumData.name,
    };
    const organisms = mediumData.organisms.map((taxid) => organismsData
        .filter((organism) => organism.taxid === taxid)
        .map((organism) => ({ id: organism.taxid, label: organism.name }))[0]);
    const components = footerList.map((data) => {
        return {
            id: data.id,
            label: data.label,
            state: findComponentState(data.id, mediumData.components, componentsData, footerList),
        };
    });
    return {
        medium,
        organisms,
        components,
    };
};
const findComponentState = (id, mediumComponents, allComponents, footerList) => {
    var _a;
    if (mediumComponents.find((candidate) => candidate === id)) {
        return "available";
    }
    const groupedId = listChildComponents(id, allComponents).find((child) => mediumComponents.find((candidate) => candidate === child));
    if (groupedId) {
        const isOpen = ((_a = footerList.find((item) => item.id === id)) === null || _a === void 0 ? void 0 : _a.isOpen) === true;
        return isOpen ? "grouped" : "available";
    }
    return "none";
};
const listChildComponents = (id, components) => {
    const result = [];
    const addItem = (parentId) => {
        const children = components.filter((c) => c.parent === parentId).map((c) => c.gmoid);
        result.push(...children);
        children.forEach((c) => addItem(c));
    };
    addItem(id);
    return result;
};

const makeComponentTree = (components) => {
    const items = components.map((item) => ({
        name: item.name,
        id: item.gmoid,
        level: 0,
        parent: item.parent,
        children: [],
        isOpen: false,
        func: item.function,
    }));
    const result = items.filter((item) => !item.parent);
    items.forEach((item) => (item.children = items.filter((filtering) => filtering.parent === item.id)));
    items.forEach((item) => (item.level = getItemLevel(item, items)));
    return result;
};
const getItemLevel = (item, items) => {
    let parent = item;
    let level = -1;
    do {
        level++;
        parent = items.find((found) => found.id === parent.parent);
    } while (parent);
    return level;
};

const makeFooterComponents = (data) => {
    const result = [];
    data.forEach((item) => {
        addToCollection(item, result);
    });
    return result;
};
const addToCollection = (data, collection) => {
    collection.push({
        label: data.name,
        level: data.level,
        hasChildren: data.children.length > 0,
        isOpen: data.isOpen,
        id: data.id,
    });
    if (data.isOpen) {
        data.children.forEach((item) => {
            addToCollection(item, collection);
        });
    }
};

const AlignmentTable = ({ data }) => {
    const [rowProps, setRowProps] = react.exports.useState([]);
    const componentTree = useComponentTreeState();
    const { setComponentTree } = useComponentTreeMutators();
    const [footerProps, setFooterProps] = react.exports.useState({ components: [] });
    react.exports.useEffect(() => {
        setComponentTree(makeComponentTree(data.components));
    }, [data]);
    react.exports.useEffect(() => {
        const components = makeFooterComponents(componentTree);
        setFooterProps({ components });
        setRowProps(makeAlignmentData(data, components));
    }, [componentTree]);
    return (jsxs("div", Object.assign({ css: wrapper$2 }, { children: [jsx(HeaderRow, {}, void 0), rowProps.map((props) => (jsx$1(MediaRow, Object.assign({}, props, { key: props.medium.id })))), jsx(FooterRow, Object.assign({}, footerProps), void 0)] }), void 0));
};
const wrapper$2 = css `
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  padding: 1px;
`;

const InfoColumns = ({ data, css, className }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    return (jsxs("div", Object.assign({ css: [wrapper$1, css], className: className }, { children: [jsxs("div", Object.assign({ css: header$1 }, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }, void 0), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }, void 0)] }), void 0), data.media.map((m) => {
                const organisms = m.organisms.map((taxid) => {
                    const organism = data.organisms.find((o) => o.taxid === taxid);
                    const id = organism ? organism.taxid : "";
                    const label = organism ? organism.name : "";
                    return { id, label };
                });
                return (jsx(MediaRow, { medium: { id: m.gmid, label: m.name }, organisms: organisms, components: [] }, m.gmid));
            }), jsxs("div", Object.assign({ css: spacerRow }, { children: [jsx("span", { css: spacer, className: isMediaExpanded ? "expanded" : "compact" }, void 0), jsx("span", { css: spacer, className: isOrganismsExpanded ? "expanded" : "compact" }, void 0)] }), void 0)] }), void 0));
};
const wrapper$1 = css `
  display: flex;
  gap: 1px;
  flex-direction: column;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
  height: 100%;
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
`;
const header$1 = css `
  width: fit-content;
  display: flex;
  gap: 1px;
`;
const spacerRow = css `
  flex-grow: 1;
  gap: 1px;
  display: flex;
`;
const spacer = css `
  background-color: ${COLOR_WHITE};
  //flex-grow: 1;
  &.expanded {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;

const ScrollableTable = ({ data }) => {
    return (jsxs("div", Object.assign({ css: wrapper }, { children: [jsx(HeaderRow, { css: header }, void 0), jsx(InfoColumns, { data: data, css: infoColumns }, void 0), jsx("div", Object.assign({ className: "inner" }, { children: jsx(AlignmentTable, { data: data }, void 0) }), void 0)] }), void 0));
};
const wrapper = css `
  position: relative;
  overflow: hidden;
  background-color: ${COLOR_GRAY_LINE};
  & > .inner {
    overflow-x: auto;
  }
`;
const header = css `
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${COLOR_GRAY_LINE};
  background-color: ${COLOR_GRAY_LINE};
`;
const infoColumns = css `
  position: absolute;
  top: 0;
  left: 0;
`;

const mediaAlignmentTableResponse1 = {
    media: [
        {
            gmid: "HM_D00001a",
            name: "REACTIVATION WITH LIQUID MEDIUM 1",
            components: ["GMO_001001", "GMO_001007", "GMO_001003", "GMO_000012"],
            organisms: ["384676", "643561"],
        },
        {
            gmid: "HM_D00065",
            name: "GYM STREPTOMYCES MEDIUM",
            components: [
                "GMO_001001",
                "GMO_001830",
                "GMO_001063",
                "GMO_001007",
                "GMO_001059",
                "GMO_001815",
            ],
            organisms: ["316284", "446462"],
        },
    ],
    organisms: [
        {
            taxid: "384676",
            name: "Pseudomonas entomophila L48",
        },
        {
            taxid: "643561",
            name: "Acidovorax avenae subsp. avenae ATCC 19860",
        },
        {
            taxid: "316284",
            name: "Streptomyces noursei ATCC 11455",
        },
        {
            taxid: "446462",
            name: "Actinosynnema mirum DSM 43827",
        },
    ],
    components: [
        {
            gmoid: "GMO_001001",
            name: "Distilled water",
            parent: "GMO_001890",
            function: "Solvating media",
        },
        {
            gmoid: "GMO_001890",
            name: "Purified water",
            parent: null,
            function: "Solvating media",
        },
        {
            gmoid: "GMO_001007",
            name: "Agar",
            parent: null,
            function: "Solidifying component",
        },
        {
            gmoid: "GMO_000011",
            name: "Extract",
            parent: null,
            function: null,
        },
        {
            gmoid: "GMO_001074",
            name: "Meat extract",
            parent: "GMO_000011",
            function: null,
        },
        {
            gmoid: "GMO_001830",
            name: "Liver extract",
            parent: "GMO_001074",
            function: null,
        },
        {
            gmoid: "GMO_000012",
            name: "Peptone",
            parent: null,
            function: null,
        },
        {
            gmoid: "GMO_001003",
            name: "Yeast extract",
            parent: "GMO_000011",
            function: "Nutrient source",
        },
        {
            gmoid: "GMO_001063",
            name: "Calcium carbonate",
            parent: null,
            function: "Protective agent",
        },
        {
            gmoid: "GMO_001059",
            name: "Malt extract",
            parent: "GMO_000011",
            function: null,
        },
        {
            gmoid: "GMO_001815",
            name: "Glucose",
            parent: null,
            function: null,
        },
    ],
};

const App = ({ gmids }) => {
    const [data, setData] = react.exports.useState();
    react.exports.useEffect(() => {
        setData(mediaAlignmentTableResponse1);
    }, []);
    return jsx(Fragment, { children: data && jsx(ScrollableTable, { data: data }, void 0) }, void 0);
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
        const gmids = stringToArray(this.params.gm_ids);
        ReactDOM.render(jsx(react.exports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, { gmids }), void 0) }, void 0) }, void 0) }, void 0), main);
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
	"@id": "gmdb-media-alignment-table",
	"stanza:label": "Media Alignment Table",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
	{
		"stanza:key": "gm_ids",
		"stanza:type": "string",
		"stanza:example": "HM_D00001a,HM_D00065",
		"stanza:description": "",
		"stanza:required": true
	}
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
//# sourceMappingURL=gmdb-media-alignment-table.js.map
