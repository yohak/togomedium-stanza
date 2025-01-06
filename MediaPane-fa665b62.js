import { r as reactExports, R as React, k as keyframes, c as css, l as dist } from './getData-8b0d864a.js';
import { z as jsxRuntimeExports, B as capitalize, D as alpha, E as resolveProps, A as useRtl, G as COLOR_GRAY_BG, H as SIZE1, I as ROUNDED_CORNER, l as COLOR_WHITE, R as Recoil_index_8, o as Recoil_index_20, p as Recoil_index_24, J as SIZE2, K as SIZE05, L as FONT_WEIGHT_MEDIUM, a as jsxs, j as jsx, M as COLOR_GRAY_LINE, C as COLOR_PRIMARY, N as FONT_WEIGHT_BOLD, O as SIZE3, P as COLOR_GRAY700, Q as SIZE4 } from './StanzaReactProvider-d614d9ca.js';
import { o as ownerDocument, n as clsx, c as generateUtilityClasses, h as styled, i as useDefaultProps, g as generateUtilityClass, u as useForkRef, l as useEventCallback, p as isFocusVisible, f as composeClasses, j as memoTheme, e as useSlotProps, q as rootShouldForwardProp, k as useControlled, b as useEnhancedEffect } from './DefaultPropsProvider-0ba0cf40.js';
import { c as createSimplePaletteValueFilter, C as CircularProgress } from './CircularProgress-5e108e03.js';
import { _ as _inheritsLoose, b as _objectWithoutPropertiesLoose, T as TransitionGroupContext, u as useLazyRef, c as useTimeout, d as useTheme, e as Tooltip } from './paths-9c191287.js';
import { c as createSvgIcon, P as PATH_MEDIUM } from './consts-c38322df.js';

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      // @ts-ignore
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}

function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

const usePreviousProps = value => {
  const ref = reactExports.useRef({});
  reactExports.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var usePreviousProps$1 = usePreviousProps;

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
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

/**
 * Lazy initialization container for the Ripple instance. This improves
 * performance by delaying mounting the ripple until it's needed.
 */
class LazyRipple {
  /** React ref to the ripple instance */

  /** If the ripple component should be mounted */

  /** Promise that resolves when the ripple component is mounted */

  /** If the ripple component has been mounted */

  /** React state hook setter */

  static create() {
    return new LazyRipple();
  }
  static use() {
    /* eslint-disable */
    const ripple = useLazyRef(LazyRipple.create).current;
    const [shouldMount, setShouldMount] = reactExports.useState(false);
    ripple.shouldMount = shouldMount;
    ripple.setShouldMount = setShouldMount;
    reactExports.useEffect(ripple.mountEffect, [shouldMount]);
    /* eslint-enable */

    return ripple;
  }
  constructor() {
    this.ref = {
      current: null
    };
    this.mounted = null;
    this.didMount = false;
    this.shouldMount = false;
    this.setShouldMount = null;
  }
  mount() {
    if (!this.mounted) {
      this.mounted = createControlledPromise();
      this.shouldMount = true;
      this.setShouldMount(this.shouldMount);
    }
    return this.mounted;
  }
  mountEffect = () => {
    if (this.shouldMount && !this.didMount) {
      if (this.ref.current !== null) {
        this.didMount = true;
        this.mounted.resolve();
      }
    }
  };

  /* Ripple API */

  start(...args) {
    this.mount().then(() => this.ref.current?.start(...args));
  }
  stop(...args) {
    this.mount().then(() => this.ref.current?.stop(...args));
  }
  pulsate(...args) {
    this.mount().then(() => this.ref.current?.pulsate(...args));
  }
}
function useLazyRipple() {
  return LazyRipple.use();
}
function createControlledPromise() {
  let resolve;
  let reject;
  const p = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn;
    reject = rejectFn;
  });
  p.resolve = resolve;
  p.reject = reject;
  return p;
}

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

const DURATION = 550;
const DELAY_RIPPLE = 80;
const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
const exitKeyframe = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
const pulsateKeyframe = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
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
})`
  opacity: 0;
  position: absolute;

  &.${touchRippleClasses$1.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  &.${touchRippleClasses$1.ripplePulsate} {
    animation-duration: ${({
  theme
}) => theme.transitions.duration.shorter}ms;
  }

  & .${touchRippleClasses$1.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${touchRippleClasses$1.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
  }

  & .${touchRippleClasses$1.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme
}) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;

/**
 * @ignore - internal component.
 *
 * TODO v5: Make private
 */
const TouchRipple = /*#__PURE__*/reactExports.forwardRef(function TouchRipple(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTouchRipple'
  });
  const {
    center: centerProp = false,
    classes = {},
    className,
    ...other
  } = props;
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
  const startTimer = useTimeout();

  // This is the hook called once the previous timeout is ready.
  const startTimerCommit = reactExports.useRef(null);
  const container = reactExports.useRef(null);
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
    if (event?.type === 'mousedown' && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event?.type === 'touchstart') {
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
    if (event?.touches) {
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
        // We have to make a tradeoff with this delay value.
        startTimer.start(DELAY_RIPPLE, () => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        });
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
  }, [centerProp, startCommit, startTimer]);
  const pulsate = reactExports.useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = reactExports.useCallback((event, cb) => {
    startTimer.clear();

    // The touch interaction occurs too quickly.
    // We still want to show ripple effect.
    if (event?.type === 'touchend' && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.start(0, () => {
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
  }, [startTimer]);
  reactExports.useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TouchRippleRoot, {
    className: clsx(touchRippleClasses$1.root, classes.root, className),
    ref: container,
    ...other,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(TransitionGroup$1, {
      component: null,
      exit: true,
      children: ripples
    })
  });
});
var TouchRipple$1 = TouchRipple;

function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}
const buttonBaseClasses = generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']);
var buttonBaseClasses$1 = buttonBaseClasses;

const useUtilityClasses$7 = ownerState => {
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
  const props = useDefaultProps({
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
    focusVisibleClassName,
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
    type,
    ...other
  } = props;
  const buttonRef = reactExports.useRef(null);
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);
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
  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;
  reactExports.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);
  const handleMouseDown = useRippleHandler(ripple, 'start', onMouseDown, disableTouchRipple);
  const handleContextMenu = useRippleHandler(ripple, 'stop', onContextMenu, disableTouchRipple);
  const handleDragLeave = useRippleHandler(ripple, 'stop', onDragLeave, disableTouchRipple);
  const handleMouseUp = useRippleHandler(ripple, 'stop', onMouseUp, disableTouchRipple);
  const handleMouseLeave = useRippleHandler(ripple, 'stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }, disableTouchRipple);
  const handleTouchStart = useRippleHandler(ripple, 'start', onTouchStart, disableTouchRipple);
  const handleTouchEnd = useRippleHandler(ripple, 'stop', onTouchEnd, disableTouchRipple);
  const handleTouchMove = useRippleHandler(ripple, 'stop', onTouchMove, disableTouchRipple);
  const handleBlur = useRippleHandler(ripple, 'stop', event => {
    if (!isFocusVisible(event.target)) {
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
    if (isFocusVisible(event.target)) {
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
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
      ripple.stop(event, () => {
        ripple.start(event);
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
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
      ripple.stop(event, () => {
        ripple.pulsate(event);
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
  const handleRef = useForkRef(ref, buttonRef);
  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  };
  const classes = useUtilityClasses$7(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(ButtonBaseRoot, {
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
    type: type,
    ...buttonProps,
    ...other,
    children: [children, enableTouchRipple ? /*#__PURE__*/jsxRuntimeExports.jsx(TouchRipple$1, {
      ref: handleRippleRef,
      center: centerRipple,
      ...TouchRippleProps
    }) : null]
  });
});
function useRippleHandler(ripple, rippleAction, eventCallback, skipRippleAction = false) {
  return useEventCallback(event => {
    if (eventCallback) {
      eventCallback(event);
    }
    if (!skipRippleAction) {
      ripple[rippleAction](event);
    }
    return true;
  });
}
var ButtonBase$1 = ButtonBase;

/**
 * @ignore - internal component.
 */
const FormControlContext = /*#__PURE__*/reactExports.createContext(undefined);
var FormControlContext$1 = FormControlContext;

function useFormControl() {
  return reactExports.useContext(FormControlContext$1);
}

/**
 *
 * Demos:
 *
 * - [Badge](https://mui.com/base-ui/react-badge/#hook)
 *
 * API:
 *
 * - [useBadge API](https://mui.com/base-ui/react-badge/hooks-api/#use-badge)
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

function getBadgeUtilityClass(slot) {
  return generateUtilityClass('MuiBadge', slot);
}
const badgeClasses = generateUtilityClasses('MuiBadge', ['root', 'badge', 'dot', 'standard', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft', 'invisible', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'overlapRectangular', 'overlapCircular',
// TODO: v6 remove the overlap value from these class keys
'anchorOriginTopLeftCircular', 'anchorOriginTopLeftRectangular', 'anchorOriginTopRightCircular', 'anchorOriginTopRightRectangular', 'anchorOriginBottomLeftCircular', 'anchorOriginBottomLeftRectangular', 'anchorOriginBottomRightCircular', 'anchorOriginBottomRightRectangular']);
var badgeClasses$1 = badgeClasses;

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;
const useUtilityClasses$6 = ownerState => {
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
})(memoTheme(({
  theme
}) => ({
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
  }),
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['contrastText'])).map(([color]) => ({
    props: {
      color
    },
    style: {
      backgroundColor: (theme.vars || theme).palette[color].main,
      color: (theme.vars || theme).palette[color].contrastText
    }
  })), {
    props: {
      variant: 'dot'
    },
    style: {
      borderRadius: RADIUS_DOT,
      height: RADIUS_DOT * 2,
      minWidth: RADIUS_DOT * 2,
      padding: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'rectangular',
    style: {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'rectangular',
    style: {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'rectangular',
    style: {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'rectangular',
    style: {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'circular',
    style: {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'right' && ownerState.overlap === 'circular',
    style: {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'top' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'circular',
    style: {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'bottom' && ownerState.anchorOrigin.horizontal === 'left' && ownerState.overlap === 'circular',
    style: {
      bottom: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses$1.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)'
      }
    }
  }, {
    props: {
      invisible: true
    },
    style: {
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }]
})));
function getAnchorOrigin(anchorOrigin) {
  return {
    vertical: anchorOrigin?.vertical ?? 'top',
    horizontal: anchorOrigin?.horizontal ?? 'right'
  };
}
const Badge = /*#__PURE__*/reactExports.forwardRef(function Badge(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiBadge'
  });
  const {
    anchorOrigin: anchorOriginProp,
    className,
    classes: classesProp,
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
    variant: variantProp = 'standard',
    ...other
  } = props;
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
    anchorOrigin: getAnchorOrigin(anchorOriginProp),
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp
  });
  const invisible = invisibleFromHook || badgeContent == null && variantProp !== 'dot';
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin: anchorOriginPropProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const anchorOrigin = getAnchorOrigin(anchorOriginPropProp);
  const displayValue = variant !== 'dot' ? displayValueFromHook : undefined;
  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant
  };
  const classes = useUtilityClasses$6(ownerState);

  // support both `slots` and `components` for backward compatibility
  const RootSlot = slots?.root ?? components.Root ?? BadgeRoot;
  const BadgeSlot = slots?.badge ?? components.Badge ?? BadgeBadge;
  const rootSlotProps = slotProps?.root ?? componentsProps.root;
  const badgeSlotProps = slotProps?.badge ?? componentsProps.badge;
  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component
    },
    ownerState,
    className: clsx(rootSlotProps?.className, classes.root, className)
  });
  const badgeProps = useSlotProps({
    elementType: BadgeSlot,
    externalSlotProps: badgeSlotProps,
    ownerState,
    className: clsx(classes.badge, badgeSlotProps?.className)
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, {
    ...rootProps,
    children: [children, /*#__PURE__*/jsxRuntimeExports.jsx(BadgeSlot, {
      ...badgeProps,
      children: displayValue
    })]
  });
});
var Badge$1 = Badge;

function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}
const buttonClasses = generateUtilityClasses('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'textSuccess', 'textError', 'textInfo', 'textWarning', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'outlinedSuccess', 'outlinedError', 'outlinedInfo', 'outlinedWarning', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'containedSuccess', 'containedError', 'containedInfo', 'containedWarning', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorError', 'colorInfo', 'colorWarning', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'icon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge']);
var buttonClasses$1 = buttonClasses;

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = /*#__PURE__*/reactExports.createContext({});
var ButtonGroupContext$1 = ButtonGroupContext;

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = /*#__PURE__*/reactExports.createContext(undefined);
var ButtonGroupButtonContext$1 = ButtonGroupButtonContext;

const useUtilityClasses$5 = ownerState => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, `${variant}${capitalize(color)}`, `size${capitalize(size)}`, `${variant}Size${capitalize(size)}`, `color${capitalize(color)}`, disableElevation && 'disableElevation', fullWidth && 'fullWidth'],
    label: ['label'],
    startIcon: ['icon', 'startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['icon', 'endIcon', `iconSize${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);
  return {
    ...classes,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses
  };
};
const commonIconStyles = [{
  props: {
    size: 'small'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 18
    }
  }
}, {
  props: {
    size: 'medium'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 20
    }
  }
}, {
  props: {
    size: 'large'
  },
  style: {
    '& > *:nth-of-type(1)': {
      fontSize: 22
    }
  }
}];
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
})(memoTheme(({
  theme
}) => {
  const inheritContainedBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];
  const inheritContainedHoverBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
  return {
    ...theme.typography.button,
    minWidth: 64,
    padding: '6px 16px',
    border: 0,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      textDecoration: 'none'
    },
    [`&.${buttonClasses$1.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled
    },
    variants: [{
      props: {
        variant: 'contained'
      },
      style: {
        color: `var(--variant-containedColor)`,
        backgroundColor: `var(--variant-containedBg)`,
        boxShadow: (theme.vars || theme).shadows[2],
        '&:hover': {
          boxShadow: (theme.vars || theme).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            boxShadow: (theme.vars || theme).shadows[2]
          }
        },
        '&:active': {
          boxShadow: (theme.vars || theme).shadows[8]
        },
        [`&.${buttonClasses$1.focusVisible}`]: {
          boxShadow: (theme.vars || theme).shadows[6]
        },
        [`&.${buttonClasses$1.disabled}`]: {
          color: (theme.vars || theme).palette.action.disabled,
          boxShadow: (theme.vars || theme).shadows[0],
          backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: 'outlined'
      },
      style: {
        padding: '5px 15px',
        border: '1px solid currentColor',
        borderColor: `var(--variant-outlinedBorder, currentColor)`,
        backgroundColor: `var(--variant-outlinedBg)`,
        color: `var(--variant-outlinedColor)`,
        [`&.${buttonClasses$1.disabled}`]: {
          border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: 'text'
      },
      style: {
        padding: '6px 8px',
        color: `var(--variant-textColor)`,
        backgroundColor: `var(--variant-textBg)`
      }
    }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
      props: {
        color
      },
      style: {
        '--variant-textColor': (theme.vars || theme).palette[color].main,
        '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
        '--variant-outlinedBorder': theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)` : alpha(theme.palette[color].main, 0.5),
        '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
        '--variant-containedBg': (theme.vars || theme).palette[color].main,
        '@media (hover: hover)': {
          '&:hover': {
            '--variant-containedBg': (theme.vars || theme).palette[color].dark,
            '--variant-textBg': theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
            '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
            '--variant-outlinedBg': theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: 'inherit'
      },
      style: {
        color: 'inherit',
        borderColor: 'currentColor',
        '--variant-containedBg': theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
        '@media (hover: hover)': {
          '&:hover': {
            '--variant-containedBg': theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
            '--variant-textBg': theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            '--variant-outlinedBg': theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: 'small',
        variant: 'text'
      },
      style: {
        padding: '4px 5px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'text'
      },
      style: {
        padding: '8px 11px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: 'small',
        variant: 'outlined'
      },
      style: {
        padding: '3px 9px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'outlined'
      },
      style: {
        padding: '7px 21px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        size: 'small',
        variant: 'contained'
      },
      style: {
        padding: '4px 10px',
        fontSize: theme.typography.pxToRem(13)
      }
    }, {
      props: {
        size: 'large',
        variant: 'contained'
      },
      style: {
        padding: '8px 22px',
        fontSize: theme.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: true
      },
      style: {
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
      }
    }, {
      props: {
        fullWidth: true
      },
      style: {
        width: '100%'
      }
    }]
  };
}));
const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginLeft: -2
    }
  }, ...commonIconStyles]
});
const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  }
})({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      marginRight: -2
    }
  }, ...commonIconStyles]
});
const Button = /*#__PURE__*/reactExports.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = reactExports.useContext(ButtonGroupContext$1);
  const buttonGroupButtonContextPositionClassName = reactExports.useContext(ButtonGroupButtonContext$1);
  const resolvedProps = resolveProps(contextProps, inProps);
  const props = useDefaultProps({
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
    variant = 'text',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  };
  const classes = useUtilityClasses$5(ownerState);
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
  const positionClassName = buttonGroupButtonContextPositionClassName || '';
  return /*#__PURE__*/jsxRuntimeExports.jsxs(ButtonRoot, {
    ownerState: ownerState,
    className: clsx(contextProps.className, classes.root, className, positionClassName),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type,
    ...other,
    classes: classes,
    children: [startIcon, children, endIcon]
  });
});
var Button$1 = Button;

function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass('PrivateSwitchBase', slot);
}
generateUtilityClasses('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);

const useUtilityClasses$4 = ownerState => {
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
const SwitchBaseRoot = styled(ButtonBase$1)({
  padding: 9,
  borderRadius: '50%',
  variants: [{
    props: {
      edge: 'start',
      size: 'small'
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === 'start' && ownerState.size !== 'small',
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: 'end',
      size: 'small'
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === 'end' && ownerState.size !== 'small',
    style: {
      marginRight: -12
    }
  }]
});
const SwitchBaseInput = styled('input', {
  shouldForwardProp: rootShouldForwardProp
})({
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
    value,
    ...other
  } = props;
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
  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge
  };
  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(SwitchBaseRoot, {
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
    ref: ref,
    ...other,
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(SwitchBaseInput, {
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
      type: type,
      ...(type === 'checkbox' && value === undefined ? {} : {
        value
      }),
      ...inputProps
    }), checked ? checkedIcon : icon]
  });
});
var SwitchBase$1 = SwitchBase;

var CheckBoxOutlineBlankIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), 'CheckBoxOutlineBlank');

var CheckBoxIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), 'CheckBox');

var IndeterminateCheckBoxIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), 'IndeterminateCheckBox');

function getCheckboxUtilityClass(slot) {
  return generateUtilityClass('MuiCheckbox', slot);
}
const checkboxClasses = generateUtilityClasses('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary', 'sizeSmall', 'sizeMedium']);
var checkboxClasses$1 = checkboxClasses;

const useUtilityClasses$3 = ownerState => {
  const {
    classes,
    indeterminate,
    color,
    size
  } = ownerState;
  const slots = {
    root: ['root', indeterminate && 'indeterminate', `color${capitalize(color)}`, `size${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return {
    ...classes,
    // forward the disabled and checked classes to the SwitchBase
    ...composedClasses
  };
};
const CheckboxRoot = styled(SwitchBase$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, styles[`size${capitalize(ownerState.size)}`], ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  variants: [{
    props: {
      color: 'default',
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${checkboxClasses$1.checked}, &.${checkboxClasses$1.indeterminate}`]: {
        color: (theme.vars || theme).palette[color].main
      },
      [`&.${checkboxClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      '&:hover': {
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  }]
})));
const defaultCheckedIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxIcon, {});
const defaultIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxOutlineBlankIcon, {});
const defaultIndeterminateIcon = /*#__PURE__*/jsxRuntimeExports.jsx(IndeterminateCheckBoxIcon, {});
const Checkbox = /*#__PURE__*/reactExports.forwardRef(function Checkbox(inProps, ref) {
  const props = useDefaultProps({
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
    disableRipple = false,
    className,
    ...other
  } = props;
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = {
    ...props,
    disableRipple,
    color,
    indeterminate,
    size
  };
  const classes = useUtilityClasses$3(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(CheckboxRoot, {
    type: "checkbox",
    inputProps: {
      'data-indeterminate': indeterminate,
      ...inputProps
    },
    icon: /*#__PURE__*/reactExports.cloneElement(icon, {
      fontSize: icon.props.fontSize ?? size
    }),
    checkedIcon: /*#__PURE__*/reactExports.cloneElement(indeterminateIcon, {
      fontSize: indeterminateIcon.props.fontSize ?? size
    }),
    ownerState: ownerState,
    ref: ref,
    className: clsx(classes.root, className),
    disableRipple: disableRipple,
    ...other,
    classes: classes
  });
});
var Checkbox$1 = Checkbox;

function getTabUtilityClass(slot) {
  return generateUtilityClass('MuiTab', slot);
}
const tabClasses = generateUtilityClasses('MuiTab', ['root', 'labelIcon', 'textColorInherit', 'textColorPrimary', 'textColorSecondary', 'selected', 'disabled', 'fullWidth', 'wrapped', 'iconWrapper', 'icon']);
var tabClasses$1 = tabClasses;

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
    icon: ['iconWrapper', 'icon']
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
    return [styles.root, ownerState.label && ownerState.icon && styles.labelIcon, styles[`textColor${capitalize(ownerState.textColor)}`], ownerState.fullWidth && styles.fullWidth, ownerState.wrapped && styles.wrapped, {
      [`& .${tabClasses$1.iconWrapper}`]: styles.iconWrapper
    }, {
      [`& .${tabClasses$1.icon}`]: styles.icon
    }];
  }
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: 'relative',
  minHeight: 48,
  flexShrink: 0,
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center',
  lineHeight: 1.25,
  variants: [{
    props: ({
      ownerState
    }) => ownerState.label && (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.label && ownerState.iconPosition !== 'top' && ownerState.iconPosition !== 'bottom',
    style: {
      flexDirection: 'row'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.icon && ownerState.label,
    style: {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'top',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginBottom: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'bottom',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginTop: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'start',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginRight: theme.spacing(1)
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'end',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginLeft: theme.spacing(1)
      }
    }
  }, {
    props: {
      textColor: 'inherit'
    },
    style: {
      color: 'inherit',
      opacity: 0.6,
      // same opacity as theme.palette.text.secondary
      [`&.${tabClasses$1.selected}`]: {
        opacity: 1
      },
      [`&.${tabClasses$1.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity
      }
    }
  }, {
    props: {
      textColor: 'primary'
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses$1.selected}`]: {
        color: (theme.vars || theme).palette.primary.main
      },
      [`&.${tabClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: {
      textColor: 'secondary'
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses$1.selected}`]: {
        color: (theme.vars || theme).palette.secondary.main
      },
      [`&.${tabClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: 'none'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.wrapped,
    style: {
      fontSize: theme.typography.pxToRem(12)
    }
  }]
})));
const Tab = /*#__PURE__*/reactExports.forwardRef(function Tab(inProps, ref) {
  const props = useDefaultProps({
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
    wrapped = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped
  };
  const classes = useUtilityClasses$2(ownerState);
  const icon = iconProp && label && /*#__PURE__*/reactExports.isValidElement(iconProp) ? /*#__PURE__*/reactExports.cloneElement(iconProp, {
    className: clsx(classes.icon, iconProp.props.className)
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
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TabRoot, {
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    ownerState: ownerState,
    tabIndex: selected ? 0 : -1,
    ...other,
    children: [iconPosition === 'top' || iconPosition === 'start' ? /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [icon, label]
    }) : /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [label, icon]
    }), indicator]
  });
});
var Tab$1 = Tab;

var KeyboardArrowLeft = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), 'KeyboardArrowLeft');

var KeyboardArrowRight = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
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
    onChange,
    ...other
  } = props;
  const scrollbarHeight = reactExports.useRef();
  const nodeRef = reactExports.useRef(null);
  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };
  useEnhancedEffect(() => {
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
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    style: styles,
    ...other,
    ref: nodeRef
  });
}

function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass('MuiTabScrollButton', slot);
}
const tabScrollButtonClasses = generateUtilityClasses('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
var tabScrollButtonClasses$1 = tabScrollButtonClasses;

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
})({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses$1.disabled}`]: {
    opacity: 0
  },
  variants: [{
    props: {
      orientation: 'vertical'
    },
    style: {
      width: '100%',
      height: 40,
      '& svg': {
        transform: 'var(--TabScrollButton-svgRotate)'
      }
    }
  }]
});
const TabScrollButton = /*#__PURE__*/reactExports.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });
  const {
    className,
    slots = {},
    slotProps = {},
    direction,
    orientation,
    disabled,
    ...other
  } = props;
  const isRtl = useRtl();
  const ownerState = {
    isRtl,
    ...props
  };
  const classes = useUtilityClasses$1(ownerState);
  const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft;
  const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight;
  const startButtonIconProps = useSlotProps({
    elementType: StartButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });
  const endButtonIconProps = useSlotProps({
    elementType: EndButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(TabScrollButtonRoot, {
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    ownerState: ownerState,
    tabIndex: null,
    ...other,
    style: {
      ...other.style,
      ...(orientation === 'vertical' && {
        '--TabScrollButton-svgRotate': `rotate(${isRtl ? -90 : 90}deg)`
      })
    },
    children: direction === 'left' ? /*#__PURE__*/jsxRuntimeExports.jsx(StartButtonIcon, {
      ...startButtonIconProps
    }) : /*#__PURE__*/jsxRuntimeExports.jsx(EndButtonIcon, {
      ...endButtonIconProps
    })
  });
});
var TabScrollButton$1 = TabScrollButton;

function getTabsUtilityClass(slot) {
  return generateUtilityClass('MuiTabs', slot);
}
const tabsClasses = generateUtilityClasses('MuiTabs', ['root', 'vertical', 'flexContainer', 'flexContainerVertical', 'centered', 'scroller', 'fixed', 'scrollableX', 'scrollableY', 'hideScrollbar', 'scrollButtons', 'scrollButtonsHideMobile', 'indicator']);
var tabsClasses$1 = tabsClasses;

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
})(memoTheme(({
  theme
}) => ({
  overflow: 'hidden',
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  display: 'flex',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollButtonsHideMobile,
    style: {
      [`& .${tabsClasses$1.scrollButtons}`]: {
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      }
    }
  }]
})));
const TabsScroller = styled('div', {
  name: 'MuiTabs',
  slot: 'Scroller',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.scroller, ownerState.fixed && styles.fixed, ownerState.hideScrollbar && styles.hideScrollbar, ownerState.scrollableX && styles.scrollableX, ownerState.scrollableY && styles.scrollableY];
  }
})({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.fixed,
    style: {
      overflowX: 'hidden',
      width: '100%'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hideScrollbar,
    style: {
      // Hide dimensionless scrollbar on macOS
      scrollbarWidth: 'none',
      // Firefox
      '&::-webkit-scrollbar': {
        display: 'none' // Safari + Chrome
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableX,
    style: {
      overflowX: 'auto',
      overflowY: 'hidden'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableY,
    style: {
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }]
});
const FlexContainer = styled('div', {
  name: 'MuiTabs',
  slot: 'FlexContainer',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.flexContainer, ownerState.vertical && styles.flexContainerVertical, ownerState.centered && styles.centered];
  }
})({
  display: 'flex',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.centered,
    style: {
      justifyContent: 'center'
    }
  }]
});
const TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator',
  overridesResolver: (props, styles) => styles.indicator
})(memoTheme(({
  theme
}) => ({
  position: 'absolute',
  height: 2,
  bottom: 0,
  width: '100%',
  transition: theme.transitions.create(),
  variants: [{
    props: {
      indicatorColor: 'primary'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }, {
    props: {
      indicatorColor: 'secondary'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.secondary.main
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      height: '100%',
      width: 2,
      right: 0
    }
  }]
})));
const TabsScrollbarSize = styled(ScrollbarSize)({
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
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTabs'
  });
  const theme = useTheme();
  const isRtl = useRtl();
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
    slots = {},
    slotProps = {},
    TabIndicatorProps = {},
    TabScrollButtonProps = {},
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';
  const ownerState = {
    ...props,
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
  };
  const classes = useUtilityClasses(ownerState);
  const startScrollButtonIconProps = useSlotProps({
    elementType: slots.StartScrollButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    ownerState
  });
  const endScrollButtonIconProps = useSlotProps({
    elementType: slots.EndScrollButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    ownerState
  });
  const [mounted, setMounted] = reactExports.useState(false);
  const [indicatorStyle, setIndicatorStyle] = reactExports.useState(defaultIndicatorStyle);
  const [displayStartScroll, setDisplayStartScroll] = reactExports.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = reactExports.useState(false);
  const [updateScrollObserver, setUpdateScrollObserver] = reactExports.useState(false);
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
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
      }
    }
    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0
    };
    if (typeof indicatorStyle[startIndicator] !== 'number' || typeof indicatorStyle[size] !== 'number') {
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

  // TODO Remove <ScrollbarSize /> as browser support for hiding the scrollbar
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
    const scrollButtonsActive = displayStartScroll || displayEndScroll;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonComponent, {
      slots: {
        StartScrollButtonIcon: slots.StartScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: startScrollButtonIconProps
      },
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayStartScroll,
      ...TabScrollButtonProps,
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    }) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonComponent, {
      slots: {
        EndScrollButtonIcon: slots.EndScrollButtonIcon
      },
      slotProps: {
        endScrollButtonIcon: endScrollButtonIconProps
      },
      orientation: orientation,
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayEndScroll,
      ...TabScrollButtonProps,
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    }) : null;
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
      setUpdateScrollObserver(!updateScrollObserver);
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
      }
    });
    let resizeObserver;

    /**
     * @type {MutationCallback}
     */
    const handleMutation = records => {
      records.forEach(record => {
        record.removedNodes.forEach(item => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach(item => {
          resizeObserver?.observe(item);
        });
      });
      handleResize();
      updateScrollButtonState();
    };
    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);
    let mutationObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach(child => {
        resizeObserver.observe(child);
      });
    }
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true
      });
    }
    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  /**
   * Toggle visibility of start and end scroll buttons
   * Using IntersectionObserver on first and last Tabs.
   */
  reactExports.useEffect(() => {
    const tabListChildren = Array.from(tabListRef.current.children);
    const length = tabListChildren.length;
    if (typeof IntersectionObserver !== 'undefined' && length > 0 && scrollable && scrollButtons !== false) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99
      };
      const handleScrollButtonStart = entries => {
        setDisplayStartScroll(!entries[0].isIntersecting);
      };
      const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
      firstObserver.observe(firstTab);
      const handleScrollButtonEnd = entries => {
        setDisplayEndScroll(!entries[0].isIntersecting);
      };
      const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
      lastObserver.observe(lastTab);
      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }
    return undefined;
  }, [scrollable, scrollButtons, updateScrollObserver, childrenProp?.length]);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    updateIndicatorState();
  });
  reactExports.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  reactExports.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);
  const indicator = /*#__PURE__*/jsxRuntimeExports.jsx(TabsIndicator, {
    ...TabIndicatorProps,
    className: clsx(classes.indicator, TabIndicatorProps.className),
    ownerState: ownerState,
    style: {
      ...indicatorStyle,
      ...TabIndicatorProps.style
    }
  });
  let childIndex = 0;
  const children = reactExports.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      return null;
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/reactExports.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue,
      ...(childIndex === 1 && value === false && !child.props.tabIndex ? {
        tabIndex: 0
      } : {})
    });
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
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TabsRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    as: component,
    ...other,
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/jsxRuntimeExports.jsxs(TabsScroller, {
      className: classes.scroller,
      ownerState: ownerState,
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth
      },
      ref: tabsRef,
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
  });
});
var Tabs$1 = Tabs;

const wrapper$6 = css `
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  gap: ${SIZE1};
`;
const queryPane = css `
  flex-grow: 1;
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

const selectedMedia = Recoil_index_8({ key: "selectedMedia", default: [] });
const useSelectedMediaState = () => {
    return Recoil_index_20(selectedMedia);
};
const useSelectedMediaMutators = () => {
    const setSelectedMedia = Recoil_index_24(selectedMedia);
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
    return (jsxs("div", { css: wrapper$5, children: [jsx("p", { className: "info", children: getInfoText$1(selectedMedia.length) }), jsxs("div", { css: buttonWrapper, children: [jsx(Button$1, { variant: "contained", disableElevation: true, disabled: selectedMedia.length === 0, sx: { textTransform: "none" }, onClick: onClickAction, children: actionLabel }), jsx(Button$1, { variant: "outlined", onClick: clearSelectedMedia, sx: { textTransform: "none" }, children: "Clear selection" })] })] }));
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
    return (jsxs("div", { css: wrapper$4, children: [jsx("a", { css: idCol, href: `${PATH_MEDIUM}${id}`, target: "_blank", rel: "noreferrer", children: id }), jsx("span", { css: labelCol, children: jsx(Tooltip, { title: label, placement: "top", PopperProps: { disablePortal: true }, arrow: true, children: jsx("span", { children: label }) }) }), jsx("span", { css: checkCol, children: jsx(Checkbox$1, { checked: isChecked, onClick: () => onClick({ id, label }), css: css `
            padding: 5px;
          ` }) })] }));
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
    return (jsxs("div", { css: [pagination, css], className: className, children: [jsxs("div", { children: [current > 0 && jsx("input", { type: "button", value: "PREV", onClick: onClickPrev }), current + displayLength < total && (jsx("input", { type: "button", value: "NEXT", onClick: onClickNext }))] }), jsx("div", { children: makeDisplayMessage(total, current, displayLength) })] }));
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

const queryData = Recoil_index_8({ key: "queryData", default: {} });
const useQueryDataState = () => {
    return Recoil_index_20(queryData);
};
const useQueryDataMutators = () => {
    const setQueryData = Recoil_index_24(queryData);
    return { setQueryData };
};

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
    return (jsxs("div", { css: wrapper$3, children: [jsx("p", { children: "Queried with:" }), jsx("p", { children: queryDataToInfoText(queryData) })] }));
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

const nullResponse = {
    total: 0,
    limit: 0,
    contents: [],
    offset: 0,
};
const foundMedia = Recoil_index_8({
    key: "foundMedia",
    default: nullResponse,
});
const useFoundMediaState = () => {
    return Recoil_index_20(foundMedia);
};
const useFoundMediaMutators = () => {
    const setFoundMedia = Recoil_index_24(foundMedia);
    return { setFoundMedia };
};

const isMediaLoading = Recoil_index_8({
    key: "isMediaLoading",
    default: false,
});
const useIsMediaLoadingState = () => {
    return Recoil_index_20(isMediaLoading);
};
const useIsMediaLoadingMutators = () => {
    const setIsMediaLoading = Recoil_index_24(isMediaLoading);
    return { setIsMediaLoading };
};

const mediaPagination = Recoil_index_8({
    key: "mediaPagination",
    default: 1,
});
const useMediaPaginationState = () => {
    return Recoil_index_20(mediaPagination);
};
const useMediaPaginationMutators = () => {
    const setMediaPagination = Recoil_index_24(mediaPagination);
    const next = () => setMediaPagination((prev) => prev + 1);
    const prev = () => setMediaPagination((prev) => prev - 1);
    const reset = () => setMediaPagination(1);
    return { next, prev, reset };
};

const FoundMediaList = ({ css, className }) => {
    const { next, prev } = useMediaPaginationMutators();
    const { data, toggleChecked, isLoading, response } = useFoundMedia();
    return (jsxs("div", { css: [wrapper$2, css], className: className, children: [jsx(QueryInfo, {}), jsx("p", { css: infoTextCSS, children: getInfoText(response.total, isLoading) }), jsxs("div", { css: listWrapper, children: [isLoading && (jsx("div", { css: loadingIndicator, children: jsx(CircularProgress, { color: "inherit", size: 40 }) })), jsx("div", { children: data.map((item) => (jsx(MediaListItem, Object.assign({}, item, { onClick: toggleChecked }), item.id))) }), !!response.total && !isLoading && (jsx(Pagination, { total: response.total, current: response.offset, displayLength: response.limit, onClickNext: next, onClickPrev: prev }))] })] }));
};
const useFoundMedia = () => {
    const [data, setData] = reactExports.useState([]);
    const response = useFoundMediaState();
    const isLoading = useIsMediaLoadingState();
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
  flex-grow: 1;
`;
const listWrapper = css `
  max-height: 100%;
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
const mediaTabFocus = Recoil_index_8({ key: "mediaTabFocus", default: "Found media" });
const useMediaTabFocusState = () => {
    return Recoil_index_20(mediaTabFocus);
};
const useMediaTabFocusMutators = () => {
    const setMediaTabFocus = Recoil_index_24(mediaTabFocus);
    return { setMediaTabFocus };
};

const MediaTab = ({ css, className }) => {
    const tabFocus = useMediaTabFocusState();
    const { setMediaTabFocus } = useMediaTabFocusMutators();
    const selected = useSelectedMediaState();
    const handleChange = (event, newValue) => {
        setMediaTabFocus(newValue);
    };
    return (jsx("div", { css: [wrapper$1, css], className: className, children: jsx(Tabs$1, { value: tabFocus, onChange: handleChange, children: mediaTabNames.map((label) => {
                if (label === "Selected media") {
                    return (jsx(Tab$1, { label: jsx(Badge$1, { badgeContent: selected.length, color: "primary", children: label }), value: label, css: tabCSS }, label));
                }
                return jsx(Tab$1, { label: label, value: label, css: tabCSS }, label);
            }) }) }));
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
    return (jsxs("div", { css: [selectedMediaList, css], className: className, children: [jsx("div", { children: data.map((item) => (jsx(MediaListItem, Object.assign({}, item, { isChecked: true, onClick: () => {
                        toggleMediumSelection(item);
                    } }), item.id))) }), !!selectedMedia.length && (jsx(Pagination, { total: selectedMedia.length, current: current, displayLength: SHOW_COUNT, onClickNext: next, onClickPrev: prev }))] }));
};
const selectedMediaList = css ``;

const MediaPane = ({ css, className, dispatchEvent }) => {
    const { tabFocus } = useTabFocus();
    return (jsxs("div", { css: wrapper, children: [jsxs("div", { css: [media, css], className: className, children: [jsx(MediaTab, {}), jsxs("div", { css: contents, children: [tabFocus === "Found media" && jsx(FoundMediaList, {}), tabFocus === "Selected media" && jsx(SelectedMediaList, {})] })] }), tabFocus === "Selected media" && (jsx(ActionPane, { actionLabel: "Compare media", dispatchEvent: dispatchEvent }))] }));
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
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export { ButtonBase$1 as B, Checkbox$1 as C, FormControlContext$1 as F, MediaPane as M, Pagination as P, Tabs$1 as T, useFoundMediaMutators as a, useQueryDataMutators as b, useIsMediaLoadingMutators as c, useMediaPaginationMutators as d, usePreviousProps$1 as e, debounce as f, useFormControl as g, hasInfo as h, filterOutInfo as i, hasIdOfLabel as j, Tab$1 as k, Badge$1 as l, extractLabelIds as m, ownerWindow as o, queryPane as q, subPane as s, useMediaPaginationState as u, wrapper$6 as w };
//# sourceMappingURL=MediaPane-fa665b62.js.map
