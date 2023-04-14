import { r as reactExports, _ as _extends, R as React, k as keyframes, c as css, l as dist } from './getData-0fc4e1b9.js';
import { _ as _objectWithoutPropertiesLoose, l as jsxRuntimeExports, h as capitalize, p as alpha, R as Recoil_index_6, f as Recoil_index_18, g as Recoil_index_22, q as COLOR_GRAY_BG, S as SIZE1, t as ROUNDED_CORNER, d as COLOR_WHITE, v as SIZE2, w as SIZE05, x as FONT_WEIGHT_MEDIUM, a as jsxs, j as jsx, y as COLOR_GRAY_LINE, C as COLOR_PRIMARY, z as FONT_WEIGHT_BOLD, A as SIZE3, B as COLOR_GRAY700, D as SIZE4 } from './StanzaReactProvider-5a1c35e0.js';
import { _ as _inheritsLoose, T as TransitionGroupContext, c as clsx, g as generateUtilityClasses, s as styled, u as useThemeProps, b as generateUtilityClass, d as useForkRef, e as useIsFocusVisible, f as useEventCallback, h as composeClasses, i as useSlotProps, r as rootShouldForwardProp, j as resolveProps, k as useControlled, l as useTheme, o as ownerDocument, m as Tooltip } from './paths-d1e79f8a.js';
import { c as createSvgIcon, o as ownerWindow, d as debounce, P as PATH_MEDIUM } from './consts-d8934727.js';

var reactIsExports = {};
var reactIs = {
  get exports(){ return reactIsExports; },
  set exports(v){ reactIsExports = v; },
};

var reactIs_production_min = {};

/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}reactIs_production_min.ContextConsumer=h;reactIs_production_min.ContextProvider=g;reactIs_production_min.Element=b;reactIs_production_min.ForwardRef=l;reactIs_production_min.Fragment=d;reactIs_production_min.Lazy=q;reactIs_production_min.Memo=p;reactIs_production_min.Portal=c;reactIs_production_min.Profiler=f;reactIs_production_min.StrictMode=e;reactIs_production_min.Suspense=m;
reactIs_production_min.SuspenseList=n;reactIs_production_min.isAsyncMode=function(){return !1};reactIs_production_min.isConcurrentMode=function(){return !1};reactIs_production_min.isContextConsumer=function(a){return v(a)===h};reactIs_production_min.isContextProvider=function(a){return v(a)===g};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===b};reactIs_production_min.isForwardRef=function(a){return v(a)===l};reactIs_production_min.isFragment=function(a){return v(a)===d};reactIs_production_min.isLazy=function(a){return v(a)===q};reactIs_production_min.isMemo=function(a){return v(a)===p};
reactIs_production_min.isPortal=function(a){return v(a)===c};reactIs_production_min.isProfiler=function(a){return v(a)===f};reactIs_production_min.isStrictMode=function(a){return v(a)===e};reactIs_production_min.isSuspense=function(a){return v(a)===m};reactIs_production_min.isSuspenseList=function(a){return v(a)===n};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};reactIs_production_min.typeOf=v;

(function (module) {

	{
	  module.exports = reactIs_production_min;
	}
} (reactIs));

// Source from https://github.com/alitaheri/normalize-scroll-left
let cachedType;

/**
 * Based on the jquery plugin https://github.com/othree/jquery.rtl-scroll-type
 *
 * Types of scrollLeft, assuming scrollWidth=100 and direction is rtl.
 *
 * Type             | <- Most Left | Most Right -> | Initial
 * ---------------- | ------------ | ------------- | -------
 * default          | 0            | 100           | 100
 * negative (spec*) | -100         | 0             | 0
 * reverse          | 100          | 0             | 0
 *
 * Edge 85: default
 * Safari 14: negative
 * Chrome 85: negative
 * Firefox 81: negative
 * IE11: reverse
 *
 * spec* https://drafts.csswg.org/cssom-view/#dom-window-scroll
 */
function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }
  const dummy = document.createElement('div');
  const container = document.createElement('div');
  container.style.width = '10px';
  container.style.height = '1px';
  dummy.appendChild(container);
  dummy.dir = 'rtl';
  dummy.style.fontSize = '14px';
  dummy.style.width = '4px';
  dummy.style.height = '1px';
  dummy.style.position = 'absolute';
  dummy.style.top = '-1000px';
  dummy.style.overflow = 'scroll';
  document.body.appendChild(dummy);
  cachedType = 'reverse';
  if (dummy.scrollLeft > 0) {
    cachedType = 'default';
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = 'negative';
    }
  }
  document.body.removeChild(dummy);
  return cachedType;
}

// Based on https://stackoverflow.com/a/24394376
function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;

  // Perform the calculations only when direction is rtl to avoid messing up the ltr behavior
  if (direction !== 'rtl') {
    return scrollLeft;
  }
  const type = detectScrollType();
  switch (type) {
    case 'negative':
      return element.scrollWidth - element.clientWidth + scrollLeft;
    case 'reverse':
      return element.scrollWidth - element.clientWidth - scrollLeft;
    default:
      return scrollLeft;
  }
}

const usePreviousProps = value => {
  const ref = reactExports.useRef({});
  reactExports.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePreviousProps$1 = usePreviousProps;

/**
 *
 * Demos:
 *
 * - [Unstyled badge](https://mui.com/base/react-badge/#hook)
 *
 * API:
 *
 * - [useBadge API](https://mui.com/base/api/use-badge/)
 */
function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps$1({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max,
    displayValue
  };
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */

function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && reactExports.isValidElement(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) reactExports.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */

function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return reactExports.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!reactExports.isValidElement(child)) return;
    var hasPrev = (key in prevChildMapping);
    var hasNext = (key in nextChildMapping);
    var prevChild = prevChildMapping[key];
    var isLeaving = reactExports.isValidElement(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = reactExports.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && reactExports.isValidElement(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = reactExports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

var values = Object.values || function (obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
};

var defaultProps = {
  component: 'div',
  childFactory: function childFactory(child) {
    return child;
  }
};
/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */

var TransitionGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this)); // Initial children should all be entering, dependent on appear


    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited: handleExited,
      firstRender: true
    };
    return _this;
  }

  var _proto = TransitionGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children,
        handleExited = _ref.handleExited,
        firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  } // node is `undefined` when user provided `nodeRef` prop
  ;

  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping) return;

    if (child.props.onExited) {
      child.props.onExited(node);
    }

    if (this.mounted) {
      this.setState(function (state) {
        var children = _extends({}, state.children);

        delete children[child.key];
        return {
          children: children
        };
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        Component = _this$props.component,
        childFactory = _this$props.childFactory,
        props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory);
    delete props.appear;
    delete props.enter;
    delete props.exit;

    if (Component === null) {
      return /*#__PURE__*/React.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }

    return /*#__PURE__*/React.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement(Component, props, children));
  };

  return TransitionGroup;
}(React.Component);

TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup$1 = TransitionGroup;

function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = reactExports.useState(false);
  const rippleClassName = clsx(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  reactExports.useEffect(() => {
    if (!inProp && onExited != null) {
      // react-transition-group#onExited
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
  }, [onExited, inProp, timeout]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/jsxRuntimeExports.jsx("span", {
      className: childClassName
    })
  });
}

const touchRippleClasses = generateUtilityClasses('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var touchRippleClasses$1 = touchRippleClasses;

const _excluded$a = ["center", "classes", "className"];
let _$1 = t => t,
  _t$1,
  _t2$1,
  _t3$1,
  _t4$1;
const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes(_t$1 || (_t$1 = _$1`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
const exitKeyframe = keyframes(_t2$1 || (_t2$1 = _$1`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
const pulsateKeyframe = keyframes(_t3$1 || (_t3$1 = _$1`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
const TouchRippleRoot = styled('span', {
  name: 'MuiTouchRipple',
  slot: 'Root'
})({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit'
});

// This `styled()` function invokes keyframes. `styled-components` only supports keyframes
// in string templates. Do not convert these styles in JS object as it will break.
const TouchRippleRipple = styled(Ripple, {
  name: 'MuiTouchRipple',
  slot: 'Ripple'
})(_t4$1 || (_t4$1 = _$1`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses$1.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses$1.child, touchRippleClasses$1.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses$1.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);

/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
const TouchRipple = /*#__PURE__*/reactExports.forwardRef(function TouchRipple(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTouchRipple'
  });
  const {
      center: centerProp = false,
      classes = {},
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$a);
  const [ripples, setRipples] = reactExports.useState([]);
  const nextKey = reactExports.useRef(0);
  const rippleCallback = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);

  // Used to filter out mouse emulated events on mobile.
  const ignoringMouseDown = reactExports.useRef(false);
  // We use a timer in order to only show the ripples for touch "click" like events.
  // We don't want to display the ripple for touch scroll events.
  const startTimer = reactExports.useRef(null);

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = reactExports.useRef(null);
  const container = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = reactExports.useCallback(params => {
    const {
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples(oldRipples => [...oldRipples, /*#__PURE__*/jsxRuntimeExports.jsx(TouchRippleRipple, {
      classes: {
        ripple: clsx(classes.ripple, touchRippleClasses$1.ripple),
        rippleVisible: clsx(classes.rippleVisible, touchRippleClasses$1.rippleVisible),
        ripplePulsate: clsx(classes.ripplePulsate, touchRippleClasses$1.ripplePulsate),
        child: clsx(classes.child, touchRippleClasses$1.child),
        childLeaving: clsx(classes.childLeaving, touchRippleClasses$1.childLeaving),
        childPulsate: clsx(classes.childPulsate, touchRippleClasses$1.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate,
      rippleX: rippleX,
      rippleY: rippleY,
      rippleSize: rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = reactExports.useCallback((event = {}, options = {}, cb = () => {}) => {
    const {
      pulsate = false,
      center = centerProp || options.pulsate,
      fakeElement = false // For test purposes
    } = options;
    if ((event == null ? void 0 : event.type) === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if ((event == null ? void 0 : event.type) === 'touchstart') {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };

    // Get the size of the ripple
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event === undefined || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

      // For some reason the animation is broken on Mobile Chrome if the size is even.
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }

    // Touche devices
    if (event != null && event.touches) {
      // check that this isn't another touchstart due to multitouch
      // otherwise we will only clear a single timer when unmounting while two
      // are running
      if (startTimerCommit.current === null) {
        // Prepare the ripple effect.
        startTimerCommit.current = () => {
          startCommit({
            pulsate,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        // Delay the execution of the ripple effect.
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE); // We have to make a tradeoff with this value.
      }
    } else {
      startCommit({
        pulsate,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = reactExports.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = reactExports.useCallback((event, cb) => {
    clearTimeout(startTimer.current);

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if ((event == null ? void 0 : event.type) === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples(oldRipples => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  reactExports.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TouchRippleRoot, _extends({
    className: clsx(touchRippleClasses$1.root, classes.root, className),
    ref: container
  }, other, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(TransitionGroup$1, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
});
var TouchRipple$1 = TouchRipple;

function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
var buttonBaseClasses$1 = buttonBaseClasses;

const _excluded$9 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];
const useUtilityClasses$8 = ownerState => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible']
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
};
const ButtonBaseRoot = styled('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: 'transparent',
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: 'pointer',
  userSelect: 'none',
  verticalAlign: 'middle',
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  textDecoration: 'none',
  // So we take precedent over the style of a native <a /> element.
  color: 'inherit',
  '&::-moz-focus-inner': {
    borderStyle: 'none' // Remove Firefox dotted outline.
  },

  [`&.${buttonBaseClasses$1.disabled}`]: {
    pointerEvents: 'none',
    // Disable link interactions
    cursor: 'default'
  },
  '@media print': {
    colorAdjust: 'exact'
  }
});

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = /*#__PURE__*/reactExports.forwardRef(function ButtonBase(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiButtonBase'
  });
  const {
      action,
      centerRipple = false,
      children,
      className,
      component = 'button',
      disabled = false,
      disableRipple = false,
      disableTouchRipple = false,
      focusRipple = false,
      LinkComponent = 'a',
      onBlur,
      onClick,
      onContextMenu,
      onDragLeave,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      tabIndex = 0,
      TouchRippleProps,
      touchRippleRef,
      type
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const buttonRef = reactExports.useRef(null);
  const rippleRef = reactExports.useRef(null);
  const handleRippleRef = useForkRef(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = reactExports.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  reactExports.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  reactExports.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback(event => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleContextMenu = useRippleHandler('stop', onContextMenu);
  const handleDragLeave = useRippleHandler('stop', onDragLeave);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);
  const handleBlur = useRippleHandler('stop', event => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback(event => {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return component && component !== 'button' && !(button.tagName === 'A' && button.href);
  };

  /**
   * IE11 shim for https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
   */
  const keydownRef = reactExports.useRef(false);
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === ' ') {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === 'Enter' && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }

    // Keyboard accessibility for non interactive elements
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === ' ' && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === 'button' && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === 'button') {
    buttonProps.type = type === undefined ? 'button' : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }
  const handleRef = useForkRef(ref, focusVisibleRef, buttonRef);
  const ownerState = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses$8(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    onBlur: handleBlur,
    onClick: onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type: type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ?
    /*#__PURE__*/
    /* TouchRipple is only needed client-side, x2 boost on the server. */
    jsxRuntimeExports.jsx(TouchRipple$1, _extends({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
});
var ButtonBase$1 = ButtonBase;

/**
 * @ignore - internal component.
 */
const FormControlContext = /*#__PURE__*/reactExports.createContext(undefined);
var FormControlContext$1 = FormControlContext;

function useFormControl() {
  return reactExports.useContext(FormControlContext$1);
}

function getBadgeUtilityClass(slot) {
  return generateUtilityClass('MuiBadge', slot);
}
const badgeClasses = generateUtilityClasses('MuiBadge', ['root', 'badge', 'dot', 'standard', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft', 'invisible', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'overlapRectangular', 'overlapCircular',
// TODO: v6 remove the overlap value from these class keys
'anchorOriginTopLeftCircular', 'anchorOriginTopLeftRectangular', 'anchorOriginTopRightCircular', 'anchorOriginTopRightRectangular', 'anchorOriginBottomLeftCircular', 'anchorOriginBottomLeftRectangular', 'anchorOriginBottomRightCircular', 'anchorOriginBottomRightRectangular']);
var badgeClasses$1 = badgeClasses;

const _excluded$8 = ["anchorOrigin", "className", "classes", "component", "components", "componentsProps", "children", "overlap", "color", "invisible", "max", "badgeContent", "slots", "slotProps", "showZero", "variant"];
const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;
const useUtilityClasses$7 = ownerState => {
  const {
    color,
    anchorOrigin,
    invisible,
    overlap,
    variant,
    classes = {}
  } = ownerState;
  const slots = {
    root: ['root'],
    badge: ['badge', variant, invisible && 'invisible', `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`, `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}${capitalize(overlap)}`, `overlap${capitalize(overlap)}`, color !== 'default' && `color${capitalize(color)}`]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0
});
const BadgeBadge = styled('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.badge, styles[ownerState.variant], styles[`anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(ownerState.anchorOrigin.horizontal)}${capitalize(ownerState.overlap)}`], ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], ownerState.invisible && styles.invisible];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  boxSizing: 'border-box',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: '0 6px',
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  // Render the badge on top of potential ripples.
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  })
}, ownerState.color !== 'default' && {
  backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
  color: (theme.vars || theme).palette[ownerState.color].contrastText
}, ownerState.variant === 'dot' && {
  borderRadius: RADIUS_DOT,
  height: RADIUS_DOT * 2,
  minWidth: RADIUS_DOT * 2,
  padding: 0
}, ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'rectangular' && {
  top: 0,
  right: 0,
  transform: 'scale(1) translate(50%, -50%)',
  transformOrigin: '100% 0%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(50%, -50%)'
  }
}, ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'rectangular' && {
  bottom: 0,
  right: 0,
  transform: 'scale(1) translate(50%, 50%)',
  transformOrigin: '100% 100%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(50%, 50%)'
  }
}, ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'rectangular' && {
  top: 0,
  left: 0,
  transform: 'scale(1) translate(-50%, -50%)',
  transformOrigin: '0% 0%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(-50%, -50%)'
  }
}, ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'rectangular' && {
  bottom: 0,
  left: 0,
  transform: 'scale(1) translate(-50%, 50%)',
  transformOrigin: '0% 100%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(-50%, 50%)'
  }
}, ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'circular' && {
  top: '14%',
  right: '14%',
  transform: 'scale(1) translate(50%, -50%)',
  transformOrigin: '100% 0%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(50%, -50%)'
  }
}, ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'circular' && {
  bottom: '14%',
  right: '14%',
  transform: 'scale(1) translate(50%, 50%)',
  transformOrigin: '100% 100%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(50%, 50%)'
  }
}, ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'circular' && {
  top: '14%',
  left: '14%',
  transform: 'scale(1) translate(-50%, -50%)',
  transformOrigin: '0% 0%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(-50%, -50%)'
  }
}, ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'circular' && {
  bottom: '14%',
  left: '14%',
  transform: 'scale(1) translate(-50%, 50%)',
  transformOrigin: '0% 100%',
  [`&.${badgeClasses$1.invisible}`]: {
    transform: 'scale(0) translate(-50%, 50%)'
  }
}, ownerState.invisible && {
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.leavingScreen
  })
}));
const Badge = /*#__PURE__*/reactExports.forwardRef(function Badge(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$badge, _slotProps$root, _slotProps$badge;
  const props = useThemeProps({
    props: inProps,
    name: 'MuiBadge'
  });
  const {
      anchorOrigin: anchorOriginProp = {
        vertical: 'top',
        horizontal: 'right'
      },
      className,
      component,
      components = {},
      componentsProps = {},
      children,
      overlap: overlapProp = 'rectangular',
      color: colorProp = 'default',
      invisible: invisibleProp = false,
      max: maxProp = 99,
      badgeContent: badgeContentProp,
      slots,
      slotProps,
      showZero = false,
      variant: variantProp = 'standard'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$8);
  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero
  });
  const prevProps = usePreviousProps$1({
    anchorOrigin: anchorOriginProp,
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp
  });
  const invisible = invisibleFromHook || badgeContent == null && variantProp !== 'dot';
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin = anchorOriginProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const displayValue = variant !== 'dot' ? displayValueFromHook : undefined;
  const ownerState = _extends({}, props, {
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant
  });
  const classes = useUtilityClasses$7(ownerState);

  // support both `slots` and `components` for backward compatibility
  const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : BadgeRoot;
  const BadgeSlot = (_ref2 = (_slots$badge = slots == null ? void 0 : slots.badge) != null ? _slots$badge : components.Badge) != null ? _ref2 : BadgeBadge;
  const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
  const badgeSlotProps = (_slotProps$badge = slotProps == null ? void 0 : slotProps.badge) != null ? _slotProps$badge : componentsProps.badge;
  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component
    },
    ownerState,
    className: clsx(rootSlotProps == null ? void 0 : rootSlotProps.className, classes.root, className)
  });
  const badgeProps = useSlotProps({
    elementType: BadgeSlot,
    externalSlotProps: badgeSlotProps,
    ownerState,
    className: clsx(classes.badge, badgeSlotProps == null ? void 0 : badgeSlotProps.className)
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, _extends({}, rootProps, {
    children: [children, /*#__PURE__*/jsxRuntimeExports.jsx(BadgeSlot, _extends({}, badgeProps, {
      children: displayValue
    }))]
  }));
});
var Badge$1 = Badge;

function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}
const buttonClasses = generateUtilityClasses('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'textSuccess', 'textError', 'textInfo', 'textWarning', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'outlinedSuccess', 'outlinedError', 'outlinedInfo', 'outlinedWarning', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'containedSuccess', 'containedError', 'containedInfo', 'containedWarning', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge']);
var buttonClasses$1 = buttonClasses;

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = /*#__PURE__*/reactExports.createContext({});
var ButtonGroupContext$1 = ButtonGroupContext;

const _excluded$7 = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
const useUtilityClasses$6 = ownerState => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, color === 'inherit' && 'colorInherit', disableElevation && 'disableElevation', fullWidth && 'fullWidth'],
    label: ['label'],
    startIcon: ['startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['endIcon', `iconSize${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const commonIconStyles = ownerState => _extends({}, ownerState.size === 'small' && {
  '& > *:nth-of-type(1)': {
    fontSize: 18
  }
}, ownerState.size === 'medium' && {
  '& > *:nth-of-type(1)': {
    fontSize: 20
  }
}, ownerState.size === 'large' && {
  '& > *:nth-of-type(1)': {
    fontSize: 22
  }
});
const ButtonRoot = styled(ButtonBase$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color)}`], styles[`size${capitalize(ownerState.size)}`], styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`], ownerState.color === 'inherit' && styles.colorInherit, ownerState.disableElevation && styles.disableElevation, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$getCon, _theme$palette;
  return _extends({}, theme.typography.button, {
    minWidth: 64,
    padding: '6px 16px',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': _extends({
      textDecoration: 'none',
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
      border: `1px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, ownerState.variant === 'contained' && {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      boxShadow: (theme.vars || theme).shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: (theme.vars || theme).shadows[2],
        backgroundColor: (theme.vars || theme).palette.grey[300]
      }
    }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }),
    '&:active': _extends({}, ownerState.variant === 'contained' && {
      boxShadow: (theme.vars || theme).shadows[8]
    }),
    [`&.${buttonClasses$1.focusVisible}`]: _extends({}, ownerState.variant === 'contained' && {
      boxShadow: (theme.vars || theme).shadows[6]
    }),
    [`&.${buttonClasses$1.disabled}`]: _extends({
      color: (theme.vars || theme).palette.action.disabled
    }, ownerState.variant === 'outlined' && {
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    }, ownerState.variant === 'contained' && {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    })
  }, ownerState.variant === 'text' && {
    padding: '6px 8px'
  }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
    color: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.variant === 'outlined' && {
    padding: '5px 15px',
    border: '1px solid currentColor'
  }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: theme.vars ? `1px solid rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
  }, ownerState.variant === 'contained' && {
    color: theme.vars ?
    // this is safe because grey does not change between default light/dark mode
    theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    boxShadow: (theme.vars || theme).shadows[2]
  }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main
  }, ownerState.color === 'inherit' && {
    color: 'inherit',
    borderColor: 'currentColor'
  }, ownerState.size === 'small' && ownerState.variant === 'text' && {
    padding: '4px 5px',
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === 'large' && ownerState.variant === 'text' && {
    padding: '8px 11px',
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === 'small' && ownerState.variant === 'outlined' && {
    padding: '3px 9px',
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === 'large' && ownerState.variant === 'outlined' && {
    padding: '7px 21px',
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === 'small' && ownerState.variant === 'contained' && {
    padding: '4px 10px',
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === 'large' && ownerState.variant === 'contained' && {
    padding: '8px 22px',
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.fullWidth && {
    width: '100%'
  });
}, ({
  ownerState
}) => ownerState.disableElevation && {
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none'
  },
  [`&.${buttonClasses$1.focusVisible}`]: {
    boxShadow: 'none'
  },
  '&:active': {
    boxShadow: 'none'
  },
  [`&.${buttonClasses$1.disabled}`]: {
    boxShadow: 'none'
  }
});
const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4
}, ownerState.size === 'small' && {
  marginLeft: -2
}, commonIconStyles(ownerState)));
const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})(({
  ownerState
}) => _extends({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8
}, ownerState.size === 'small' && {
  marginRight: -2
}, commonIconStyles(ownerState)));
const Button = /*#__PURE__*/reactExports.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = reactExports.useContext(ButtonGroupContext$1);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useThemeProps({
    props: resolvedProps,
    name: 'MuiButton'
  });
  const {
      children,
      color = 'primary',
      component = 'button',
      className,
      disabled = false,
      disableElevation = false,
      disableFocusRipple = false,
      endIcon: endIconProp,
      focusVisibleClassName,
      fullWidth = false,
      size = 'medium',
      startIcon: startIconProp,
      type,
      variant = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$7);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });
  const classes = useUtilityClasses$6(ownerState);
  const startIcon = startIconProp && /*#__PURE__*/jsxRuntimeExports.jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState: ownerState,
    children: startIconProp
  });
  const endIcon = endIconProp && /*#__PURE__*/jsxRuntimeExports.jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState: ownerState,
    children: endIconProp
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(ButtonRoot, _extends({
    ownerState: ownerState,
    className: clsx(contextProps.className, classes.root, className),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type
  }, other, {
    classes: classes,
    children: [startIcon, children, endIcon]
  }));
});
var Button$1 = Button;

function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass('PrivateSwitchBase', slot);
}
generateUtilityClasses('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);

const _excluded$6 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];
const useUtilityClasses$5 = ownerState => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ['root', checked && 'checked', disabled && 'disabled', edge && `edge${capitalize(edge)}`],
    input: ['input']
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
const SwitchBaseRoot = styled(ButtonBase$1)(({
  ownerState
}) => _extends({
  padding: 9,
  borderRadius: '50%'
}, ownerState.edge === 'start' && {
  marginLeft: ownerState.size === 'small' ? -3 : -12
}, ownerState.edge === 'end' && {
  marginRight: ownerState.size === 'small' ? -3 : -12
}));
const SwitchBaseInput = styled('input')({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});

/**
 * @ignore - internal component.
 */
const SwitchBase = /*#__PURE__*/reactExports.forwardRef(function SwitchBase(props, ref) {
  const {
      autoFocus,
      checked: checkedProp,
      checkedIcon,
      className,
      defaultChecked,
      disabled: disabledProp,
      disableFocusRipple = false,
      edge = false,
      icon,
      id,
      inputProps,
      inputRef,
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      required = false,
      tabIndex,
      type,
      value
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked'
  });
  const muiFormControl = useFormControl();
  const handleFocus = event => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = event => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === 'checkbox' || type === 'radio';
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    disableFocusRipple,
    edge
  });
  const classes = useUtilityClasses$5(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(SwitchBaseRoot, _extends({
    component: "span",
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    tabIndex: null,
    role: undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(SwitchBaseInput, _extends({
      autoFocus: autoFocus,
      checked: checkedProp,
      defaultChecked: defaultChecked,
      className: classes.input,
      disabled: disabled,
      id: hasLabelFor ? id : undefined,
      name: name,
      onChange: handleInputChange,
      readOnly: readOnly,
      ref: inputRef,
      required: required,
      ownerState: ownerState,
      tabIndex: tabIndex,
      type: type
    }, type === 'checkbox' && value === undefined ? {} : {
      value
    }, inputProps)), checked ? checkedIcon : icon]
  }));
});
var SwitchBase$1 = SwitchBase;

var CheckBoxOutlineBlankIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), 'CheckBoxOutlineBlank');

var CheckBoxIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), 'CheckBox');

var IndeterminateCheckBoxIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), 'IndeterminateCheckBox');

function getCheckboxUtilityClass(slot) {
  return generateUtilityClass('MuiCheckbox', slot);
}
const checkboxClasses = generateUtilityClasses('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary']);
var checkboxClasses$1 = checkboxClasses;

const _excluded$5 = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size", "className"];
const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    indeterminate,
    color
  } = ownerState;
  const slots = {
    root: ['root', indeterminate && 'indeterminate', `color${capitalize(color)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const CheckboxRoot = styled(SwitchBase$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${ownerState.color === 'default' ? theme.vars.palette.action.activeChannel : theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(ownerState.color === 'default' ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.color !== 'default' && {
  [`&.${checkboxClasses$1.checked}, &.${checkboxClasses$1.indeterminate}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${checkboxClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}));
const defaultCheckedIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxIcon, {});
const defaultIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxOutlineBlankIcon, {});
const defaultIndeterminateIcon = /*#__PURE__*/jsxRuntimeExports.jsx(IndeterminateCheckBoxIcon, {});
const Checkbox = /*#__PURE__*/reactExports.forwardRef(function Checkbox(inProps, ref) {
  var _icon$props$fontSize, _indeterminateIcon$pr;
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCheckbox'
  });
  const {
      checkedIcon = defaultCheckedIcon,
      color = 'primary',
      icon: iconProp = defaultIcon,
      indeterminate = false,
      indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
      inputProps,
      size = 'medium',
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$5);
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = _extends({}, props, {
    color,
    indeterminate,
    size
  });
  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(CheckboxRoot, _extends({
    type: "checkbox",
    inputProps: _extends({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/reactExports.cloneElement(icon, {
      fontSize: (_icon$props$fontSize = icon.props.fontSize) != null ? _icon$props$fontSize : size
    }),
    checkedIcon: /*#__PURE__*/reactExports.cloneElement(indeterminateIcon, {
      fontSize: (_indeterminateIcon$pr = indeterminateIcon.props.fontSize) != null ? _indeterminateIcon$pr : size
    }),
    ownerState: ownerState,
    ref: ref,
    className: clsx(classes.root, className)
  }, other, {
    classes: classes
  }));
});
var Checkbox$1 = Checkbox;

function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}
generateUtilityClasses('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);

const _excluded$4 = ["className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"];
let _ = t => t,
  _t,
  _t2,
  _t3,
  _t4;
const SIZE = 44;
const circularRotateKeyframe = keyframes(_t || (_t = _`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`));
const circularDashKeyframe = keyframes(_t2 || (_t2 = _`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`));
const useUtilityClasses$3 = ownerState => {
  const {
    classes,
    variant,
    color,
    disableShrink
  } = ownerState;
  const slots = {
    root: ['root', variant, `color${capitalize(color)}`],
    svg: ['svg'],
    circle: ['circle', `circle${capitalize(variant)}`, disableShrink && 'circleDisableShrink']
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
const CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`color${capitalize(ownerState.color)}`]];
  }
})(({
  ownerState,
  theme
}) => _extends({
  display: 'inline-block'
}, ownerState.variant === 'determinate' && {
  transition: theme.transitions.create('transform')
}, ownerState.color !== 'inherit' && {
  color: (theme.vars || theme).palette[ownerState.color].main
}), ({
  ownerState
}) => ownerState.variant === 'indeterminate' && css(_t3 || (_t3 = _`
      animation: ${0} 1.4s linear infinite;
    `), circularRotateKeyframe));
const CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg
})({
  display: 'block' // Keeps the progress centered
});

const CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.circle, styles[`circle${capitalize(ownerState.variant)}`], ownerState.disableShrink && styles.circleDisableShrink];
  }
})(({
  ownerState,
  theme
}) => _extends({
  stroke: 'currentColor'
}, ownerState.variant === 'determinate' && {
  transition: theme.transitions.create('stroke-dashoffset')
}, ownerState.variant === 'indeterminate' && {
  // Some default value that looks fine waiting for the animation to kicks in.
  strokeDasharray: '80px, 200px',
  strokeDashoffset: 0 // Add the unit to fix a Edge 16 and below bug.
}), ({
  ownerState
}) => ownerState.variant === 'indeterminate' && !ownerState.disableShrink && css(_t4 || (_t4 = _`
      animation: ${0} 1.4s ease-in-out infinite;
    `), circularDashKeyframe));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = /*#__PURE__*/reactExports.forwardRef(function CircularProgress(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCircularProgress'
  });
  const {
      className,
      color = 'primary',
      disableShrink = false,
      size = 40,
      style,
      thickness = 3.6,
      value = 0,
      variant = 'indeterminate'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const ownerState = _extends({}, props, {
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant
  });
  const classes = useUtilityClasses$3(ownerState);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};
  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressRoot, _extends({
    className: clsx(classes.root, className),
    style: _extends({
      width: size,
      height: size
    }, rootStyle, style),
    ownerState: ownerState,
    ref: ref,
    role: "progressbar"
  }, rootProps, other, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressSVG, {
      className: classes.svg,
      ownerState: ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        ownerState: ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })
    })
  }));
});
var CircularProgress$1 = CircularProgress;

function getTabUtilityClass(slot) {
  return generateUtilityClass('MuiTab', slot);
}
const tabClasses = generateUtilityClasses('MuiTab', ['root', 'labelIcon', 'textColorInherit', 'textColorPrimary', 'textColorSecondary', 'selected', 'disabled', 'fullWidth', 'wrapped', 'iconWrapper']);
var tabClasses$1 = tabClasses;

const _excluded$3 = ["className", "disabled", "disableFocusRipple", "fullWidth", "icon", "iconPosition", "indicator", "label", "onChange", "onClick", "onFocus", "selected", "selectionFollowsFocus", "textColor", "value", "wrapped"];
const useUtilityClasses$2 = ownerState => {
  const {
    classes,
    textColor,
    fullWidth,
    wrapped,
    icon,
    label,
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', icon && label && 'labelIcon', `textColor${capitalize(textColor)}`, fullWidth && 'fullWidth', wrapped && 'wrapped', selected && 'selected', disabled && 'disabled'],
    iconWrapper: ['iconWrapper']
  };
  return composeClasses(slots, getTabUtilityClass, classes);
};
const TabRoot = styled(ButtonBase$1, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.label && ownerState.icon && styles.labelIcon, styles[`textColor${capitalize(ownerState.textColor)}`], ownerState.fullWidth && styles.fullWidth, ownerState.wrapped && styles.wrapped];
  }
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.button, {
  maxWidth: 360,
  minWidth: 90,
  position: 'relative',
  minHeight: 48,
  flexShrink: 0,
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center'
}, ownerState.label && {
  flexDirection: ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom' ? 'column' : 'row'
}, {
  lineHeight: 1.25
}, ownerState.icon && ownerState.label && {
  minHeight: 72,
  paddingTop: 9,
  paddingBottom: 9,
  [`& > .${tabClasses$1.iconWrapper}`]: _extends({}, ownerState.iconPosition === 'top' && {
    marginBottom: 6
  }, ownerState.iconPosition === 'bottom' && {
    marginTop: 6
  }, ownerState.iconPosition === 'start' && {
    marginRight: theme.spacing(1)
  }, ownerState.iconPosition === 'end' && {
    marginLeft: theme.spacing(1)
  })
}, ownerState.textColor === 'inherit' && {
  color: 'inherit',
  opacity: 0.6,
  // same opacity as theme.palette.text.secondary
  [`&.${tabClasses$1.selected}`]: {
    opacity: 1
  },
  [`&.${tabClasses$1.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }
}, ownerState.textColor === 'primary' && {
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${tabClasses$1.selected}`]: {
    color: (theme.vars || theme).palette.primary.main
  },
  [`&.${tabClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  }
}, ownerState.textColor === 'secondary' && {
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${tabClasses$1.selected}`]: {
    color: (theme.vars || theme).palette.secondary.main
  },
  [`&.${tabClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  }
}, ownerState.fullWidth && {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: 0,
  maxWidth: 'none'
}, ownerState.wrapped && {
  fontSize: theme.typography.pxToRem(12)
}));
const Tab = /*#__PURE__*/reactExports.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTab'
  });
  const {
      className,
      disabled = false,
      disableFocusRipple = false,
      // eslint-disable-next-line react/prop-types
      fullWidth,
      icon: iconProp,
      iconPosition = 'top',
      // eslint-disable-next-line react/prop-types
      indicator,
      label,
      onChange,
      onClick,
      onFocus,
      // eslint-disable-next-line react/prop-types
      selected,
      // eslint-disable-next-line react/prop-types
      selectionFollowsFocus,
      // eslint-disable-next-line react/prop-types
      textColor = 'inherit',
      value,
      wrapped = false
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const ownerState = _extends({}, props, {
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped
  });
  const classes = useUtilityClasses$2(ownerState);
  const icon = iconProp && label && /*#__PURE__*/reactExports.isValidElement(iconProp) ? /*#__PURE__*/reactExports.cloneElement(iconProp, {
    className: clsx(classes.iconWrapper, iconProp.props.className)
  }) : iconProp;
  const handleClick = event => {
    if (!selected && onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const handleFocus = event => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TabRoot, _extends({
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    ownerState: ownerState,
    tabIndex: selected ? 0 : -1
  }, other, {
    children: [iconPosition === 'top' || iconPosition === 'start' ? /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [icon, label]
    }) : /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [label, icon]
    }), indicator]
  }));
});
var Tab$1 = Tab;

var KeyboardArrowLeft = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), 'KeyboardArrowLeft');

var KeyboardArrowRight = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}), 'KeyboardArrowRight');

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {}) {
  const {
    ease = easeInOutSin,
    duration = 300 // standard
  } = options;
  let start = null;
  const from = element[property];
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const step = timestamp => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }
    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);
    element[property] = ease(time) * (to - from) + from;
    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }
    requestAnimationFrame(step);
  };
  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }
  requestAnimationFrame(step);
  return cancel;
}

const _excluded$2 = ["onChange"];
const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll'
};

/**
 * @ignore - internal component.
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
function ScrollbarSize(props) {
  const {
      onChange
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const scrollbarHeight = reactExports.useRef();
  const nodeRef = reactExports.useRef(null);
  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };
  reactExports.useEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();
      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });
    const containerWindow = ownerWindow(nodeRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);
  reactExports.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", _extends({
    style: styles,
    ref: nodeRef
  }, other));
}

function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass('MuiTabScrollButton', slot);
}
const tabScrollButtonClasses = generateUtilityClasses('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
var tabScrollButtonClasses$1 = tabScrollButtonClasses;

var _KeyboardArrowLeft, _KeyboardArrowRight;
const _excluded$1 = ["className", "direction", "orientation", "disabled"];
const useUtilityClasses$1 = ownerState => {
  const {
    classes,
    orientation,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};
const TabScrollButtonRoot = styled(ButtonBase$1, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
  }
})(({
  ownerState
}) => _extends({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses$1.disabled}`]: {
    opacity: 0
  }
}, ownerState.orientation === 'vertical' && {
  width: '100%',
  height: 40,
  '& svg': {
    transform: `rotate(${ownerState.isRtl ? -90 : 90}deg)`
  }
}));
const TabScrollButton = /*#__PURE__*/reactExports.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });
  const {
      className,
      direction
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const ownerState = _extends({
    isRtl
  }, props);
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TabScrollButtonRoot, _extends({
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    ownerState: ownerState,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _KeyboardArrowLeft || (_KeyboardArrowLeft = /*#__PURE__*/jsxRuntimeExports.jsx(KeyboardArrowLeft, {
      fontSize: "small"
    })) : _KeyboardArrowRight || (_KeyboardArrowRight = /*#__PURE__*/jsxRuntimeExports.jsx(KeyboardArrowRight, {
      fontSize: "small"
    }))
  }));
});
var TabScrollButton$1 = TabScrollButton;

function getTabsUtilityClass(slot) {
  return generateUtilityClass('MuiTabs', slot);
}
const tabsClasses = generateUtilityClasses('MuiTabs', ['root', 'vertical', 'flexContainer', 'flexContainerVertical', 'centered', 'scroller', 'fixed', 'scrollableX', 'scrollableY', 'hideScrollbar', 'scrollButtons', 'scrollButtonsHideMobile', 'indicator']);
var tabsClasses$1 = tabsClasses;

const _excluded = ["aria-label", "aria-labelledby", "action", "centered", "children", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar"];
const nextItem = (list, item) => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};
const previousItem = (list, item) => {
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};
const moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);
  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';
    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};
const useUtilityClasses = ownerState => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes
  } = ownerState;
  const slots = {
    root: ['root', vertical && 'vertical'],
    scroller: ['scroller', fixed && 'fixed', hideScrollbar && 'hideScrollbar', scrollableX && 'scrollableX', scrollableY && 'scrollableY'],
    flexContainer: ['flexContainer', vertical && 'flexContainerVertical', centered && 'centered'],
    indicator: ['indicator'],
    scrollButtons: ['scrollButtons', scrollButtonsHideMobile && 'scrollButtonsHideMobile'],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar']
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};
const TabsRoot = styled('div', {
  name: 'MuiTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${tabsClasses$1.scrollButtons}`]: styles.scrollButtons
    }, {
      [`& .${tabsClasses$1.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile
    }, styles.root, ownerState.vertical && styles.vertical];
  }
})(({
  ownerState,
  theme
}) => _extends({
  overflow: 'hidden',
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  display: 'flex'
}, ownerState.vertical && {
  flexDirection: 'column'
}, ownerState.scrollButtonsHideMobile && {
  [`& .${tabsClasses$1.scrollButtons}`]: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));
const TabsScroller = styled('div', {
  name: 'MuiTabs',
  slot: 'Scroller',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.scroller, ownerState.fixed && styles.fixed, ownerState.hideScrollbar && styles.hideScrollbar, ownerState.scrollableX && styles.scrollableX, ownerState.scrollableY && styles.scrollableY];
  }
})(({
  ownerState
}) => _extends({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap'
}, ownerState.fixed && {
  overflowX: 'hidden',
  width: '100%'
}, ownerState.hideScrollbar && {
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: 'none',
  // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Safari + Chrome
  }
}, ownerState.scrollableX && {
  overflowX: 'auto',
  overflowY: 'hidden'
}, ownerState.scrollableY && {
  overflowY: 'auto',
  overflowX: 'hidden'
}));
const FlexContainer = styled('div', {
  name: 'MuiTabs',
  slot: 'FlexContainer',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.flexContainer, ownerState.vertical && styles.flexContainerVertical, ownerState.centered && styles.centered];
  }
})(({
  ownerState
}) => _extends({
  display: 'flex'
}, ownerState.vertical && {
  flexDirection: 'column'
}, ownerState.centered && {
  justifyContent: 'center'
}));
const TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator',
  overridesResolver: (props, styles) => styles.indicator
})(({
  ownerState,
  theme
}) => _extends({
  position: 'absolute',
  height: 2,
  bottom: 0,
  width: '100%',
  transition: theme.transitions.create()
}, ownerState.indicatorColor === 'primary' && {
  backgroundColor: (theme.vars || theme).palette.primary.main
}, ownerState.indicatorColor === 'secondary' && {
  backgroundColor: (theme.vars || theme).palette.secondary.main
}, ownerState.vertical && {
  height: '100%',
  width: 2,
  right: 0
}));
const TabsScrollbarSize = styled(ScrollbarSize, {
  name: 'MuiTabs',
  slot: 'ScrollbarSize'
})({
  overflowX: 'auto',
  overflowY: 'hidden',
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: 'none',
  // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Safari + Chrome
  }
});

const defaultIndicatorStyle = {};
const Tabs = /*#__PURE__*/reactExports.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabs'
  });
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';
  const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      action,
      centered = false,
      children: childrenProp,
      className,
      component = 'div',
      allowScrollButtonsMobile = false,
      indicatorColor = 'primary',
      onChange,
      orientation = 'horizontal',
      ScrollButtonComponent = TabScrollButton$1,
      scrollButtons = 'auto',
      selectionFollowsFocus,
      TabIndicatorProps = {},
      TabScrollButtonProps = {},
      textColor = 'primary',
      value,
      variant = 'standard',
      visibleScrollbar = false
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';
  const ownerState = _extends({}, props, {
    component,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile
  });
  const classes = useUtilityClasses(ownerState);
  const [mounted, setMounted] = reactExports.useState(false);
  const [indicatorStyle, setIndicatorStyle] = reactExports.useState(defaultIndicatorStyle);
  const [displayScroll, setDisplayScroll] = reactExports.useState({
    start: false,
    end: false
  });
  const [scrollerStyle, setScrollerStyle] = reactExports.useState({
    overflow: 'hidden',
    scrollbarWidth: 0
  });
  const valueToIndex = new Map();
  const tabsRef = reactExports.useRef(null);
  const tabListRef = reactExports.useRef(null);
  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }
    let tabMeta;
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;
      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return {
      tabsMeta,
      tabMeta
    };
  };
  const updateIndicatorState = useEventCallback(() => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    let startValue = 0;
    let startIndicator;
    if (vertical) {
      startIndicator = 'top';
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';
      if (tabMeta && tabsMeta) {
        const correction = isRtl ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + correction);
      }
    }
    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0
    };

    // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(indicatorStyle[startIndicator]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });
  const scroll = (scrollValue, {
    animation = true
  } = {}) => {
    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };
  const moveTabsScroll = delta => {
    let scrollValue = tabsRef.current[scrollStart];
    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }
    scroll(scrollValue);
  };
  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);
    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        // If the first item is longer than the container size, then only scroll
        // by the container size.
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };
  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };
  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
  // with CSS improves.
  const handleScrollbarSizeChange = reactExports.useCallback(scrollbarWidth => {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth
    });
  }, []);
  const getConditionalElements = () => {
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/jsxRuntimeExports.jsx(TabsScrollbarSize, {
      onChange: handleScrollbarSizeChange,
      className: clsx(classes.scrollableX, classes.hideScrollbar)
    }) : null;
    const scrollButtonsActive = displayScroll.start || displayScroll.end;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayScroll.start
    }, TabScrollButtonProps, {
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    })) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayScroll.end
    }, TabScrollButtonProps, {
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    })) : null;
    return conditionalElements;
  };
  const scrollSelectedIntoView = useEventCallback(animation => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    if (!tabMeta || !tabsMeta) {
      return;
    }
    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, {
        animation
      });
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart, {
        animation
      });
    }
  });
  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth
      } = tabsRef.current;
      let showStartScroll;
      let showEndScroll;
      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction);
        // use 1 for the potential rounding error with browser zooms.
        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }
      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({
          start: showStartScroll,
          end: showEndScroll
        });
      }
    }
  });
  reactExports.useEffect(() => {
    const handleResize = debounce(() => {
      // If the Tabs component is replaced by Suspense with a fallback, the last
      // ResizeObserver's handler that runs because of the change in the layout is trying to
      // access a dom node that is no longer there (as the fallback component is being shown instead).
      // See https://github.com/mui/material-ui/issues/33276
      // TODO: Add tests that will ensure the component is not failing when
      // replaced by Suspense with a fallback, once React is updated to version 18
      if (tabsRef.current) {
        updateIndicatorState();
        updateScrollButtonState();
      }
    });
    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach(child => {
        resizeObserver.observe(child);
      });
    }
    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  const handleTabsScroll = reactExports.useMemo(() => debounce(() => {
    updateScrollButtonState();
  }), [updateScrollButtonState]);
  reactExports.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    updateIndicatorState();
    updateScrollButtonState();
  });
  reactExports.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  reactExports.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);
  const indicator = /*#__PURE__*/jsxRuntimeExports.jsx(TabsIndicator, _extends({}, TabIndicatorProps, {
    className: clsx(classes.indicator, TabIndicatorProps.className),
    ownerState: ownerState,
    style: _extends({}, indicatorStyle, TabIndicatorProps.style)
  }));
  let childIndex = 0;
  const children = reactExports.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      return null;
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/reactExports.cloneElement(child, _extends({
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue
    }, childIndex === 1 && value === false && !child.props.tabIndex ? {
      tabIndex: 0
    } : {}));
  });
  const handleKeyDown = event => {
    const list = tabListRef.current;
    const currentFocus = ownerDocument(list).activeElement;
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = currentFocus.getAttribute('role');
    if (role !== 'tab') {
      return;
    }
    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }
    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
    }
  };
  const conditionalElements = getConditionalElements();
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TabsRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    as: component
  }, other, {
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/jsxRuntimeExports.jsxs(TabsScroller, {
      className: classes.scroller,
      ownerState: ownerState,
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth
      },
      ref: tabsRef,
      onScroll: handleTabsScroll,
      children: [/*#__PURE__*/jsxRuntimeExports.jsx(FlexContainer, {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-orientation": orientation === 'vertical' ? 'vertical' : null,
        className: classes.flexContainer,
        ownerState: ownerState,
        onKeyDown: handleKeyDown,
        ref: tabListRef,
        role: "tablist",
        children: children
      }), mounted && indicator]
    }), conditionalElements.scrollButtonEnd]
  }));
});
var Tabs$1 = Tabs;

const nullResponse = {
    total: 0,
    limit: 0,
    contents: [],
    offset: 0,
};
const foundMedia = Recoil_index_6({
    key: "foundMedia",
    default: nullResponse,
});
const useFoundMediaState = () => {
    return Recoil_index_18(foundMedia);
};
const useFoundMediaMutators = () => {
    const setFoundMedia = Recoil_index_22(foundMedia);
    return { setFoundMedia };
};

const mediaLoadAbort = Recoil_index_6({ key: "mediaLoadAbort", default: null });
const useIsMediaLoading = () => {
    return !!Recoil_index_18(mediaLoadAbort);
};
const useMediaLoadAbortMutators = () => {
    const setMediaLoadAbort = Recoil_index_22(mediaLoadAbort);
    const abortCurrentLoading = () => {
        let result = false;
        setMediaLoadAbort((prev) => {
            if (prev) {
                prev.abort();
                result = true;
            }
            return null;
        });
        return result;
    };
    const setNextMediaLoadAbort = (abort) => {
        setMediaLoadAbort((prev) => {
            if (prev) {
                prev.abort();
            }
            return abort;
        });
    };
    return { abortCurrentLoading, setNextMediaLoadAbort };
};

const queryData = Recoil_index_6({ key: "queryData", default: {} });
const useQueryDataState = () => {
    return Recoil_index_18(queryData);
};
const useQueryDataMutators = () => {
    const setQueryData = Recoil_index_22(queryData);
    return { setQueryData };
};

const wrapper$6 = css `
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  min-height: 640px;
  height: 1px;
  display: flex;
  gap: ${SIZE1};
  & > * {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${SIZE1};
  }
`;
const queryPane = css `
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;
const subPane = css `
  display: flex;
  flex-direction: column;
  max-width: 380px;
  min-width: 380px;
`;

const hasInfo = (arr, info) => {
    return !!arr.find((item) => item.id === info.id);
};
const filterOutInfo = (arr, info) => {
    return arr.filter((item) => item.id !== info.id);
};
const extractLabelIds = (arr) => {
    return arr.map((item) => item.id);
};
const hasIdOfLabel = (arr, id) => {
    return !!arr.find((info) => info.id === id);
};

const selectedMedia = Recoil_index_6({ key: "selectedMedia", default: [] });
const useSelectedMediaState = () => {
    return Recoil_index_18(selectedMedia);
};
const useSelectedMediaMutators = () => {
    const setSelectedMedia = Recoil_index_22(selectedMedia);
    const toggleMediumSelection = (info) => {
        setSelectedMedia((prev) => {
            return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
        });
    };
    const clearSelectedMedia = () => {
        setSelectedMedia([]);
    };
    return { setSelectedMedia, toggleMediumSelection, clearSelectedMedia };
};

const ActionPane = ({ actionLabel, dispatchEvent }) => {
    const selectedMedia = useSelectedMediaState();
    const { clearSelectedMedia } = useSelectedMediaMutators();
    const onClickAction = () => {
        if (!dispatchEvent)
            return;
        dispatchEvent(selectedMedia.map((item) => item.id));
    };
    return (jsxs("div", Object.assign({ css: wrapper$5 }, { children: [jsx("p", Object.assign({ className: "info" }, { children: getInfoText$1(selectedMedia.length) })), jsxs("div", Object.assign({ css: buttonWrapper }, { children: [jsx(Button$1, Object.assign({ variant: "contained", disableElevation: true, disabled: selectedMedia.length === 0, sx: { textTransform: "none" }, onClick: onClickAction }, { children: actionLabel })), jsx(Button$1, Object.assign({ variant: "outlined", onClick: clearSelectedMedia, sx: { textTransform: "none" } }, { children: "Clear selection" }))] }))] })));
};
const getInfoText$1 = (mediaLength) => {
    if (mediaLength === 0) {
        return "No media selected";
    }
    else if (mediaLength === 1) {
        return "1 medium selected";
    }
    else {
        return `${mediaLength} media selected`;
    }
};
const wrapper$5 = css `
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1} ${SIZE2};

  p.info {
    margin-bottom: ${SIZE05};
    font-size: 18px;
    ${FONT_WEIGHT_MEDIUM};
  }
`;
const buttonWrapper = css `
  display: flex;
  gap: ${SIZE1};

  & > * {
    flex-grow: 1;
    flex-basis: 0;
  }
`;

const MediaListItem = ({ id, label, isChecked, onClick }) => {
    return (jsxs("div", Object.assign({ css: wrapper$4 }, { children: [jsx("a", Object.assign({ css: idCol, href: `${PATH_MEDIUM}${id}`, target: "_blank", rel: "noreferrer" }, { children: id })), jsx("span", Object.assign({ css: labelCol }, { children: jsx(Tooltip, Object.assign({ title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true }, { children: jsx("span", { children: label }) })) })), jsx("span", Object.assign({ css: checkCol }, { children: jsx(Checkbox$1, { checked: isChecked, onClick: () => onClick({ id, label }), css: css `
            padding: 5px;
          ` }) }))] })));
};
const wrapper$4 = css `
  & + & {
    border-top: none;
  }
  display: flex;
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_GRAY_LINE};
  padding: 0 ${SIZE1};
  justify-content: space-between;
  align-items: center;
  gap: ${SIZE2};
`;
const idCol = css `
  flex-shrink: 0;
  flex-grow: 0;
  width: 90px;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
`;
const labelCol = css `
  flex-grow: 1;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const checkCol = css `
  flex-shrink: 0;
`;

const Pagination = ({ css, className, total, current, displayLength, onClickNext, onClickPrev, }) => {
    return (jsxs("div", Object.assign({ css: [pagination, css], className: className }, { children: [jsxs("div", { children: [current > 0 && jsx("input", { type: "button", value: "PREV", onClick: onClickPrev }), current + displayLength < total && (jsx("input", { type: "button", value: "NEXT", onClick: onClickNext }))] }), jsx("div", { children: makeDisplayMessage(total, current, displayLength) })] })));
};
const makeDisplayMessage = (total, current, displayLength) => {
    switch (true) {
        case current + displayLength > total:
            return `Showing ${current + 1} to ${total} of total ${total} items`;
        default:
            return `Showing ${current + 1} to ${current + displayLength} of total ${total} items`;
    }
};
const pagination = css `
  display: flex;
  justify-content: space-between;
  margin-top: ${SIZE1};
  input[type="button"] {
    cursor: pointer;
    padding: 0 ${SIZE1};
    margin-right: ${SIZE1};
  }
`;

const queryDataToInfoText = (data) => {
    if (!data) {
        return "";
    }
    return Object.entries(data)
        .map(([key, value]) => {
        let valueText;
        if (dist.isArray(value)) {
            valueText = value.join(", ");
        }
        else {
            valueText = value !== null && value !== void 0 ? value : "";
        }
        return `${key}${valueText ? ":" : ""}${valueText}`;
    })
        .join(" / ");
};

const QueryInfo = () => {
    const queryData = useQueryDataState();
    return (jsxs("div", Object.assign({ css: wrapper$3 }, { children: [jsx("p", { children: "Queried with:" }), jsx("p", { children: queryDataToInfoText(queryData) })] })));
};
const wrapper$3 = css `
  ${ROUNDED_CORNER};
  border-color: ${COLOR_GRAY_LINE};
  border-style: dashed;
  border-width: 2px;
  padding: ${SIZE1};
  & > p:first-of-type {
    ${FONT_WEIGHT_BOLD};
    margin-bottom: ${SIZE05};
  }
`;

const FoundMediaList = ({ next, prev, css, className }) => {
    const { data, toggleChecked, isLoading, response } = useFoundMedia();
    return (jsxs("div", Object.assign({ css: [wrapper$2, css], className: className }, { children: [jsx(QueryInfo, {}), jsx("p", Object.assign({ css: infoTextCSS }, { children: getInfoText(response.total, isLoading) })), jsxs("div", Object.assign({ css: listWrapper }, { children: [isLoading && (jsx("div", Object.assign({ css: loadingIndicator }, { children: jsx(CircularProgress$1, { color: "inherit", size: 40 }) }))), jsx("div", { children: data.map((item) => (jsx(MediaListItem, Object.assign({}, item, { onClick: toggleChecked }), item.id))) }), !!response.total && !isLoading && (jsx(Pagination, { total: response.total, current: response.offset, displayLength: response.limit, onClickNext: () => next(), onClickPrev: () => prev() }))] }))] })));
};
const useFoundMedia = () => {
    const [data, setData] = reactExports.useState([]);
    const response = useFoundMediaState();
    const isLoading = useIsMediaLoading();
    const selectedMedia = useSelectedMediaState();
    const { toggleMediumSelection } = useSelectedMediaMutators();
    const toggleChecked = (info) => {
        toggleMediumSelection(info);
    };
    reactExports.useEffect(() => {
        const result = response.contents.map((medium) => {
            return {
                id: medium.gm_id,
                label: medium.name,
                isChecked: hasIdOfLabel(selectedMedia, medium.gm_id),
            };
        });
        setData(result);
    }, [response, selectedMedia]);
    return { data, toggleChecked, isLoading, response };
};
const wrapper$2 = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const listWrapper = css `
  max-height: 100%;
  overflow-y: auto;
  position: relative;
`;
const infoTextCSS = css `
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-top: ${SIZE3};
  margin-bottom: ${SIZE05};
`;
const loadingIndicator = css `
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_GRAY700};
`;
const getInfoText = (mediaLength, isLoading) => {
    if (isLoading) {
        return "Loading...";
    }
    if (mediaLength === 0) {
        return "No media found";
    }
    else if (mediaLength === 1) {
        return "1 medium found";
    }
    else {
        return `${mediaLength} media found`;
    }
};

const mediaTabNames = ["Found media", "Selected media"];
const mediaTabFocus = Recoil_index_6({ key: "mediaTabFocus", default: "Found media" });
const useMediaTabFocusState = () => {
    return Recoil_index_18(mediaTabFocus);
};
const useMediaTabFocusMutators = () => {
    const setMediaTabFocus = Recoil_index_22(mediaTabFocus);
    return { setMediaTabFocus };
};

const MediaTab = ({ css, className }) => {
    const tabFocus = useMediaTabFocusState();
    const { setMediaTabFocus } = useMediaTabFocusMutators();
    const selected = useSelectedMediaState();
    const handleChange = (event, newValue) => {
        setMediaTabFocus(newValue);
    };
    return (jsx("div", Object.assign({ css: [wrapper$1, css], className: className }, { children: jsx(Tabs$1, Object.assign({ value: tabFocus, onChange: handleChange }, { children: mediaTabNames.map((label) => {
                if (label === "Selected media") {
                    return (jsx(Tab$1, { label: jsx(Badge$1, Object.assign({ badgeContent: selected.length, color: "primary" }, { children: label })), value: label, css: tabCSS }, label));
                }
                return jsx(Tab$1, { label: label, value: label, css: tabCSS }, label);
            }) })) })));
};
const wrapper$1 = css `
  width: 100%;
  border-bottom: 1px solid ${COLOR_GRAY_LINE};
  & > * {
    position: relative;
    top: 1px;
  }
`;
const tabCSS = css `
  text-transform: none;
  padding-left: ${SIZE4};
  padding-right: ${SIZE4};
  //width: 200px;
`;

const SHOW_COUNT = 10;
const SelectedMediaList = ({ css, className }) => {
    const selectedMedia = useSelectedMediaState();
    const { toggleMediumSelection } = useSelectedMediaMutators();
    const [data, setData] = reactExports.useState([]);
    const [current, setCurrent] = reactExports.useState(0);
    const next = () => {
        setCurrent(current + SHOW_COUNT);
    };
    const prev = () => {
        setCurrent(current - SHOW_COUNT);
    };
    reactExports.useEffect(() => {
        const filtered = selectedMedia
            .filter((item, i) => i >= current)
            .filter((item, i) => i < SHOW_COUNT);
        setData(filtered);
    }, [selectedMedia, current]);
    return (jsxs("div", Object.assign({ css: [selectedMediaList, css], className: className }, { children: [jsx("div", { children: data.map((item) => (jsx(MediaListItem, Object.assign({}, item, { isChecked: true, onClick: () => {
                        toggleMediumSelection(item);
                    } }), item.id))) }), !!selectedMedia.length && (jsx(Pagination, { total: selectedMedia.length, current: current, displayLength: SHOW_COUNT, onClickNext: next, onClickPrev: prev }))] })));
};
const selectedMediaList = css ``;

const MediaPane = ({ css, className, dispatchEvent, next, prev }) => {
    const { tabFocus } = useTabFocus();
    return (jsxs("div", Object.assign({ css: wrapper }, { children: [jsxs("div", Object.assign({ css: [media, css], className: className }, { children: [jsx(MediaTab, {}), jsxs("div", Object.assign({ css: contents }, { children: [tabFocus === "Found media" && jsx(FoundMediaList, { next: next, prev: prev }), tabFocus === "Selected media" && jsx(SelectedMediaList, {})] }))] })), tabFocus === "Selected media" && (jsx(ActionPane, { actionLabel: "Compare media", dispatchEvent: dispatchEvent }))] })));
};
const useTabFocus = () => {
    const tabFocus = useMediaTabFocusState();
    const { setMediaTabFocus } = useMediaTabFocusMutators();
    const foundMedia = useFoundMediaState();
    reactExports.useEffect(() => {
        setMediaTabFocus("Found media");
    }, [foundMedia]);
    return { tabFocus };
};
const wrapper = css `
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${SIZE1};
`;
const media = css `
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const contents = css `
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;

export { ButtonBase$1 as B, CircularProgress$1 as C, FormControlContext$1 as F, MediaPane as M, Pagination as P, Tabs$1 as T, useQueryDataMutators as a, useMediaLoadAbortMutators as b, useFoundMediaState as c, usePreviousProps$1 as d, useFormControl as e, Checkbox$1 as f, filterOutInfo as g, hasInfo as h, hasIdOfLabel as i, Tab$1 as j, Badge$1 as k, extractLabelIds as l, nullResponse as n, queryPane as q, subPane as s, useFoundMediaMutators as u, wrapper$6 as w };
//# sourceMappingURL=MediaPane-7499d61c.js.map
