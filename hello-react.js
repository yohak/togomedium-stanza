import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { z as generateUtilityClass, A as generateUtilityClasses, E as react, I as clsx, m as jsxRuntime, G as _objectWithoutPropertiesLoose, h as useControlled, l as useIsFocusVisible, k as useForkRef, j as useEventCallback, u as useEnhancedEffect, o as ownerDocument, _ as _extends, J as composeClasses, i as isHostComponent, B as styled, c as capitalize, ak as lighten, al as darken, D as alpha, aj as slotShouldForwardProp, F as useThemeProps, H as useTheme, p as css, w as jsxs, v as jsx, x as jsx$1, R as ReactDOM, T as EmotionCacheProvider } from './EmotionCacheProvider-92758dbd.js';
import { d as dist } from './index-d49f0e1c.js';
import { C as Chip, T as TextField, A as Autocomplete } from './TextField-133d0f35.js';

var propTypes = {exports: {}};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px'
};
var visuallyHidden$1 = visuallyHidden;

function getSliderUtilityClass(slot) {
  return generateUtilityClass('MuiSlider', slot);
}
const sliderUnstyledClasses = generateUtilityClasses('MuiSlider', ['root', 'active', 'focusVisible', 'disabled', 'dragging', 'marked', 'vertical', 'trackInverted', 'trackFalse', 'rail', 'track', 'mark', 'markActive', 'markLabel', 'markLabelActive', 'thumb', 'valueLabel', 'valueLabelOpen', 'valueLabelCircle', 'valueLabelLabel']);
var sliderUnstyledClasses$1 = sliderUnstyledClasses;

const useValueLabelClasses = props => {
  const {
    open
  } = props;
  const utilityClasses = {
    offset: clsx(open && sliderUnstyledClasses$1.valueLabelOpen),
    circle: sliderUnstyledClasses$1.valueLabelCircle,
    label: sliderUnstyledClasses$1.valueLabelLabel
  };
  return utilityClasses;
};
/**
 * @ignore - internal component.
 */


function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value,
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  return /*#__PURE__*/react.exports.cloneElement(children, {
    className: clsx(children.props.className)
  }, /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
    children: [children.props.children, /*#__PURE__*/jsxRuntime.exports.jsx("span", {
      className: clsx(classes.offset, className),
      theme: theme,
      "aria-hidden": true,
      children: /*#__PURE__*/jsxRuntime.exports.jsx("span", {
        className: classes.circle,
        children: /*#__PURE__*/jsxRuntime.exports.jsx("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}

const _excluded$1 = ["aria-label", "aria-labelledby", "aria-valuetext", "className", "component", "classes", "defaultValue", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps"];
const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value == null) {
    return min;
  }

  return Math.min(Math.max(min, value), max);
}

function findClosest(values, currentValue) {
  const {
    index: closestIndex
  } = values.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }

    return acc;
  }, null);
  return closestIndex;
}

function trackFinger(event, touchId) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];

      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }

    return false;
  }

  return {
    x: event.clientX,
    y: event.clientY
  };
}

function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step, min) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex({
  values,
  newValue,
  index
}) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  const doc = ownerDocument(sliderRef.current);

  if (!sliderRef.current.contains(doc.activeElement) || Number(doc.activeElement.getAttribute('data-index')) !== activeIndex) {
    sliderRef.current.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

const axisProps = {
  horizontal: {
    offset: percent => ({
      left: `${percent}%`
    }),
    leap: percent => ({
      width: `${percent}%`
    })
  },
  'horizontal-reverse': {
    offset: percent => ({
      right: `${percent}%`
    }),
    leap: percent => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: percent => ({
      bottom: `${percent}%`
    }),
    leap: percent => ({
      height: `${percent}%`
    })
  }
};

const Identity = x => x; // TODO: remove support for Safari < 13.
// https://caniuse.com/#search=touch-action
//
// Safari, on iOS, supports touch action since v13.
// Over 80% of the iOS phones are compatible
// in August 2020.
// Utilizing the CSS.supports method to check if touch-action is supported.
// Since CSS.supports is supported on all but Edge@12 and IE and touch-action
// is supported on both Edge@12 and IE if CSS.supports is not available that means that
// touch-action will be supported


let cachedSupportsTouchActionNone;

function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }

  return cachedSupportsTouchActionNone;
}

const useUtilityClasses = ownerState => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', dragging && 'dragging', marked && 'marked', orientation === 'vertical' && 'vertical', track === 'inverted' && 'trackInverted', track === false && 'trackFalse'],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible']
  };
  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Forward = ({
  children
}) => children;

const SliderUnstyled = /*#__PURE__*/react.exports.forwardRef(function SliderUnstyled(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    className,
    component = 'span',
    classes: classesProp,
    defaultValue,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    scale = Identity,
    step = 1,
    tabIndex,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    isRtl = false,
    components = {},
    componentsProps = {}
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$1);

  const touchId = react.exports.useRef(); // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transferred when inversing a range slider.

  const [active, setActive] = react.exports.useState(-1);
  const [open, setOpen] = react.exports.useState(-1);
  const [dragging, setDragging] = react.exports.useState(false);
  const moveCount = react.exports.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min,
    name: 'Slider'
  });

  const handleChange = onChange && ((event, value, thumbIndex) => {
    // Redefine target to allow name and value to be read.
    // This allows seamless integration with the most popular form libraries.
    // https://github.com/mui-org/material-ui/issues/13485#issuecomment-676048492
    // Clone the event to not override `target` of the original event.
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, 'target', {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });

  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map(value => clamp(value, min, max));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.exports.useState(-1);
  const sliderRef = react.exports.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const handleFocus = event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(index);
    }

    setOpen(index);
  };

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(-1);
    }

    setOpen(-1);
  };

  const handleMouseOver = useEventCallback(event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  });
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });
  useEnhancedEffect(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      // This is necessary because Firefox and Safari will keep focus
      // on a disabled element:
      // https://codesandbox.io/s/mui-pr-22247-forked-h151h?file=/src/App.js
      document.activeElement.blur();
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }

  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }

  const handleHiddenInputChange = event => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    const value = values[index];
    const marksValues = marks.map(mark => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;

    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }

    newValue = clamp(newValue, min, max);

    if (marks && step == null) {
      const markValues = marks.map(mark => mark.value);
      const currentMarkIndex = markValues.indexOf(values[index]);
      newValue = newValue < values[index] ? markValues[currentMarkIndex - 1] : markValues[currentMarkIndex + 1];
    }

    if (range) {
      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[index - 1] || -Infinity, values[index + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index
      });
      let activeIndex = index; // Potentially swap the index if needed.

      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }

      focusThumb({
        sliderRef,
        activeIndex
      });
    }

    setValueState(newValue);
    setFocusVisible(index);

    if (handleChange) {
      handleChange(event, newValue, index);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  };

  const previousIndex = react.exports.useRef();
  let axis = orientation;

  if (isRtl && orientation !== "vertical") {
    axis += '-reverse';
  }

  const getFingerNewValue = ({
    finger,
    move = false,
    values: values2
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width,
      height,
      bottom,
      left
    } = slider.getBoundingClientRect();
    let percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);

    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    } else {
      const marksValues = marks.map(mark => mark.value);
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values2, newValue);
      } else {
        activeIndex = previousIndex.current;
      } // Bound the new value to the thumb's neighbours.


      if (disableSwap) {
        newValue = clamp(newValue, values2[activeIndex - 1] || -Infinity, values2[activeIndex + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        newValue,
        index: activeIndex
      }); // Potentially swap the index if needed.

      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return {
      newValue,
      activeIndex
    };
  };

  const handleTouchMove = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1; // Cancel move in case some other element consumed a mouseup event and it was not fired.

    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true,
      values
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);

    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback(nativeEvent => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);

    if (!finger) {
      return;
    }

    const {
      newValue
    } = getFingerNewValue({
      finger,
      values
    });
    setActive(-1);

    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }

    touchId.current = undefined; // eslint-disable-next-line @typescript-eslint/no-use-before-define

    stopListening();
  });
  const handleTouchStart = useEventCallback(nativeEvent => {
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }

    const touch = nativeEvent.changedTouches[0];

    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }

    const finger = trackFinger(nativeEvent, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  const stopListening = react.exports.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  react.exports.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener('touchstart', handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  react.exports.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const handleMouseDown = useEventCallback(event => {
    if (onMouseDown) {
      onMouseDown(event);
    } // Only handle left clicks


    if (event.button !== 0) {
      return;
    } // Avoid text selection


    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);

    if (handleChange) {
      handleChange(event, newValue, activeIndex);
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('mousemove', handleTouchMove);
    doc.addEventListener('mouseup', handleTouchEnd);
  });
  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  const trackStyle = _extends({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap));

  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  const Rail = components.Rail || 'span';
  const railProps = componentsProps.rail || {};
  const Track = components.Track || 'span';
  const trackProps = componentsProps.track || {};
  const Thumb = components.Thumb || 'span';
  const thumbProps = componentsProps.thumb || {};
  const ValueLabel = components.ValueLabel || SliderValueLabelUnstyled;
  const valueLabelProps = componentsProps.valueLabel || {};
  const Mark = components.Mark || 'span';
  const markProps = componentsProps.mark || {};
  const MarkLabel = components.MarkLabel || 'span';
  const markLabelProps = componentsProps.markLabel || {};
  const Input = components.Input || 'input';
  const inputProps = componentsProps.input || {}; // all props with defaults
  // consider extracting to hook an reusing the lint rule for the varints

  const ownerState = _extends({}, props, {
    classes: classesProp,
    disabled,
    dragging,
    isRtl,
    marked: marks.length > 0 && marks.some(mark => mark.label),
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat
  });

  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(Root, _extends({
    ref: handleRef,
    onMouseDown: handleMouseDown
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState)
  }, other, {
    className: clsx(classes.root, rootProps.className, className),
    children: [/*#__PURE__*/jsxRuntime.exports.jsx(Rail, _extends({}, railProps, !isHostComponent(Rail) && {
      ownerState: _extends({}, ownerState, railProps.ownerState)
    }, {
      className: clsx(classes.rail, railProps.className)
    })), /*#__PURE__*/jsxRuntime.exports.jsx(Track, _extends({}, trackProps, !isHostComponent(Track) && {
      ownerState: _extends({}, ownerState, trackProps.ownerState)
    }, {
      className: clsx(classes.track, trackProps.className),
      style: _extends({}, trackStyle, trackProps.style)
    })), marks.map((mark, index) => {
      const percent = valueToPercent(mark.value, min, max);
      const style = axisProps[axis].offset(percent);
      let markActive;

      if (track === false) {
        markActive = values.indexOf(mark.value) !== -1;
      } else {
        markActive = track === 'normal' && (range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0]) || track === 'inverted' && (range ? mark.value <= values[0] || mark.value >= values[values.length - 1] : mark.value >= values[0]);
      }

      return /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.exports.jsx(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent(Mark) && {
          ownerState: _extends({}, ownerState, markProps.ownerState),
          markActive
        }, {
          style: _extends({}, style, markProps.style),
          className: clsx(classes.mark, markProps.className, markActive && classes.markActive)
        })), mark.label != null ? /*#__PURE__*/jsxRuntime.exports.jsx(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          ownerState: _extends({}, ownerState, markLabelProps.ownerState)
        }, {
          markLabelActive: markActive,
          style: _extends({}, style, markLabelProps.style),
          className: clsx(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, mark.value);
    }), values.map((value, index) => {
      const percent = valueToPercent(value, min, max);
      const style = axisProps[axis].offset(percent);
      const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabel;
      return /*#__PURE__*/jsxRuntime.exports.jsx(react.exports.Fragment, {
        children: /*#__PURE__*/jsxRuntime.exports.jsx(ValueLabelComponent, _extends({
          valueLabelFormat: valueLabelFormat,
          valueLabelDisplay: valueLabelDisplay,
          value: typeof valueLabelFormat === 'function' ? valueLabelFormat(scale(value), index) : valueLabelFormat,
          index: index,
          open: open === index || active === index || valueLabelDisplay === 'on',
          disabled: disabled
        }, valueLabelProps, {
          className: clsx(classes.valueLabel, valueLabelProps.className)
        }, !isHostComponent(ValueLabel) && {
          ownerState: _extends({}, ownerState, valueLabelProps.ownerState)
        }, {
          children: /*#__PURE__*/jsxRuntime.exports.jsx(Thumb, _extends({
            "data-index": index,
            onMouseOver: handleMouseOver,
            onMouseLeave: handleMouseLeave
          }, thumbProps, {
            className: clsx(classes.thumb, thumbProps.className, active === index && classes.active, focusVisible === index && classes.focusVisible)
          }, !isHostComponent(Thumb) && {
            ownerState: _extends({}, ownerState, thumbProps.ownerState)
          }, {
            style: _extends({}, style, {
              pointerEvents: disableSwap && active !== index ? 'none' : undefined
            }, thumbProps.style),
            children: /*#__PURE__*/jsxRuntime.exports.jsx(Input, _extends({
              tabIndex: tabIndex,
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-labelledby": ariaLabelledby,
              "aria-orientation": orientation,
              "aria-valuemax": scale(max),
              "aria-valuemin": scale(min),
              "aria-valuenow": scale(value),
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              onFocus: handleFocus,
              onBlur: handleBlur,
              name: name,
              type: "range",
              min: props.min,
              max: props.max,
              step: props.step,
              disabled: disabled,
              value: values[index],
              onChange: handleHiddenInputChange,
              style: _extends({}, visuallyHidden$1, {
                direction: isRtl ? 'rtl' : 'ltr',
                // So that VoiceOver's focus indicator matches the thumb's dimensions
                width: '100%',
                height: '100%'
              }, inputProps.style)
            }, !isHostComponent(Input) && {
              ownerState: _extends({}, ownerState, inputProps.ownerState)
            }, inputProps))
          }))
        }))
      }, index);
    })]
  }));
});
var SliderUnstyled$1 = SliderUnstyled;

const _excluded = ["components", "componentsProps", "color", "size"];
const sliderClasses = _extends({}, sliderUnstyledClasses$1, generateUtilityClasses('MuiSlider', ['colorPrimary', 'colorSecondary', 'thumbColorPrimary', 'thumbColorSecondary', 'sizeSmall', 'thumbSizeSmall']));
const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const marks = ownerState.marksProp === true && ownerState.step !== null ? [...Array(Math.floor((ownerState.max - ownerState.min) / ownerState.step) + 1)].map((_, index) => ({
      value: ownerState.min + ownerState.step * index
    })) : ownerState.marksProp || [];
    const marked = marks.length > 0 && marks.some(mark => mark.label);
    return [styles.root, styles[`color${capitalize(ownerState.color)}`], ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size)}`], marked && styles.marked, ownerState.orientation === 'vertical' && styles.vertical, ownerState.track === 'inverted' && styles.trackInverted, ownerState.track === false && styles.trackFalse];
  }
})(({
  theme,
  ownerState
}) => _extends({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: theme.palette[ownerState.color].main,
  WebkitTapHighlightColor: 'transparent'
}, ownerState.orientation === 'horizontal' && _extends({
  height: 4,
  width: '100%',
  padding: '13px 0',
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': {
    // Reach 42px touch target, about ~8mm on screen.
    padding: '20px 0'
  }
}, ownerState.size === 'small' && {
  height: 2
}, ownerState.marked && {
  marginBottom: 20
}), ownerState.orientation === 'vertical' && _extends({
  height: '100%',
  width: 4,
  padding: '0 13px',
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': {
    // Reach 42px touch target, about ~8mm on screen.
    padding: '0 20px'
  }
}, ownerState.size === 'small' && {
  width: 2
}, ownerState.marked && {
  marginRight: 44
}), {
  '@media print': {
    colorAdjust: 'exact'
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: theme.palette.grey[400]
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: 'none'
    }
  }
}));
const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail
})(({
  ownerState
}) => _extends({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38
}, ownerState.orientation === 'horizontal' && {
  width: '100%',
  height: 'inherit',
  top: '50%',
  transform: 'translateY(-50%)'
}, ownerState.orientation === 'vertical' && {
  height: '100%',
  width: 'inherit',
  left: '50%',
  transform: 'translateX(-50%)'
}, ownerState.track === 'inverted' && {
  opacity: 1
}));
const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme,
  ownerState
}) => {
  const color = // Same logic as the LinearProgress track color
  theme.palette.mode === 'light' ? lighten(theme.palette[ownerState.color].main, 0.62) : darken(theme.palette[ownerState.color].main, 0.5);
  return _extends({
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest
    })
  }, ownerState.size === 'small' && {
    border: 'none'
  }, ownerState.orientation === 'horizontal' && {
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)'
  }, ownerState.orientation === 'vertical' && {
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)'
  }, ownerState.track === false && {
    display: 'none'
  }, ownerState.track === 'inverted' && {
    backgroundColor: color,
    borderColor: color
  });
});
const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.thumb, styles[`thumbColor${capitalize(ownerState.color)}`], ownerState.size !== 'medium' && styles[`thumbSize${capitalize(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: 'absolute',
  width: 20,
  height: 20,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: theme.transitions.duration.shortest
  })
}, ownerState.size === 'small' && {
  width: 12,
  height: 12
}, ownerState.orientation === 'horizontal' && {
  top: '50%',
  transform: 'translate(-50%, -50%)'
}, ownerState.orientation === 'vertical' && {
  left: '50%',
  transform: 'translate(-50%, 50%)'
}, {
  '&:before': _extends({
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[2]
  }, ownerState.size === 'small' && {
    boxShadow: 'none'
  }),
  '&::after': {
    position: 'absolute',
    content: '""',
    borderRadius: '50%',
    // 42px is the hit target
    width: 42,
    height: 42,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette[ownerState.color].main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none'
    }
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette[ownerState.color].main, 0.16)}`
  },
  [`&.${sliderClasses.disabled}`]: {
    '&:hover': {
      boxShadow: 'none'
    }
  }
}));
const SliderValueLabel = styled(SliderValueLabelUnstyled, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel
})(({
  theme,
  ownerState
}) => _extends({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: 'translateY(-100%) scale(1)'
  },
  zIndex: 1,
  whiteSpace: 'nowrap'
}, theme.typography.body2, {
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest
  }),
  top: -10,
  transformOrigin: 'bottom center',
  transform: 'translateY(-100%) scale(0)',
  position: 'absolute',
  backgroundColor: theme.palette.grey[600],
  borderRadius: 2,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem'
}, ownerState.size === 'small' && {
  fontSize: theme.typography.pxToRem(12),
  padding: '0.25rem 0.5rem'
}, {
  '&:before': {
    position: 'absolute',
    content: '""',
    width: 8,
    height: 8,
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    backgroundColor: 'inherit'
  }
}));
const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: prop => slotShouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => styles.mark
})(({
  theme,
  ownerState,
  markActive
}) => _extends({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor'
}, ownerState.orientation === 'horizontal' && {
  top: '50%',
  transform: 'translate(-1px, -50%)'
}, ownerState.orientation === 'vertical' && {
  left: '50%',
  transform: 'translate(-50%, 1px)'
}, markActive && {
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8
}));
const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: prop => slotShouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel
})(({
  theme,
  ownerState,
  markLabelActive
}) => _extends({}, theme.typography.body2, {
  color: theme.palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap'
}, ownerState.orientation === 'horizontal' && {
  top: 30,
  transform: 'translateX(-50%)',
  '@media (pointer: coarse)': {
    top: 40
  }
}, ownerState.orientation === 'vertical' && {
  left: 36,
  transform: 'translateY(50%)',
  '@media (pointer: coarse)': {
    left: 44
  }
}, markLabelActive && {
  color: theme.palette.text.primary
}));
SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  ownerState: PropTypes.shape({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary']),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool,
    marks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.number.isRequired
    })), PropTypes.bool]),
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    scale: PropTypes.func,
    step: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]),
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  })
};

const extendUtilityClasses = ownerState => {
  const {
    color,
    size,
    classes = {}
  } = ownerState;
  return _extends({}, classes, {
    root: clsx(classes.root, getSliderUtilityClass(`color${capitalize(color)}`), classes[`color${capitalize(color)}`], size && [getSliderUtilityClass(`size${capitalize(size)}`), classes[`size${capitalize(size)}`]]),
    thumb: clsx(classes.thumb, getSliderUtilityClass(`thumbColor${capitalize(color)}`), classes[`thumbColor${capitalize(color)}`], size && [getSliderUtilityClass(`thumbSize${capitalize(size)}`), classes[`thumbSize${capitalize(size)}`]])
  });
};

const shouldSpreadOwnerState = Component => {
  return !Component || !isHostComponent(Component);
};

const Slider = /*#__PURE__*/react.exports.forwardRef(function Slider(sliderProps, ref) {
  var _componentsProps$root, _componentsProps$thum, _componentsProps$trac, _componentsProps$valu;

  const props = useThemeProps({
    props: sliderProps,
    name: 'MuiSlider'
  });
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const {
    components = {},
    componentsProps = {},
    color = 'primary',
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ownerState = _extends({}, props, {
    color,
    size
  });

  const classes = extendUtilityClasses(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(SliderUnstyled$1, _extends({}, other, {
    isRtl: isRtl,
    components: _extends({
      Root: SliderRoot,
      Rail: SliderRail,
      Track: SliderTrack,
      Thumb: SliderThumb,
      ValueLabel: SliderValueLabel,
      Mark: SliderMark,
      MarkLabel: SliderMarkLabel
    }, components),
    componentsProps: _extends({}, componentsProps, {
      root: _extends({}, componentsProps.root, shouldSpreadOwnerState(components.Root) && {
        ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState, {
          color,
          size
        })
      }),
      thumb: _extends({}, componentsProps.thumb, shouldSpreadOwnerState(components.Thumb) && {
        ownerState: _extends({}, (_componentsProps$thum = componentsProps.thumb) == null ? void 0 : _componentsProps$thum.ownerState, {
          color,
          size
        })
      }),
      track: _extends({}, componentsProps.track, shouldSpreadOwnerState(components.Track) && {
        ownerState: _extends({}, (_componentsProps$trac = componentsProps.track) == null ? void 0 : _componentsProps$trac.ownerState, {
          color,
          size
        })
      }),
      valueLabel: _extends({}, componentsProps.valueLabel, shouldSpreadOwnerState(components.ValueLabel) && {
        ownerState: _extends({}, (_componentsProps$valu = componentsProps.valueLabel) == null ? void 0 : _componentsProps$valu.ownerState, {
          color,
          size
        })
      })
    }),
    classes: classes,
    ref: ref
  }));
});
var Slider$1 = Slider;

const App = ({ sayTo, wrapper }) => {
    const [count, setCount] = react.exports.useState(0);
    const increment = () => setCount((prev) => prev + 1);
    const handleClick = () => {
        console.log(dist.qs("p"));
        increment();
    };
    return (jsxs("div", { children: [jsxs("p", Object.assign({ css: myStyle }, { children: ["Hello ", jsx("i", { children: sayTo }, void 0)] }), void 0), jsxs("p", { children: [count, " time(s) clicked"] }, void 0), jsx("button", Object.assign({ onClick: handleClick }, { children: "Click this" }), void 0), jsx(Slider$1, { getAriaLabel: () => "Temperature range", valueLabelDisplay: "auto" }, void 0), jsx(Autocomplete, { id: "tags-filled", disablePortal: true, options: top100Films.map((option) => option.title), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined", label: option }, getTagProps({ index }), { key: index })))), renderInput: (params) => (jsx(TextField, Object.assign({}, params, { variant: "filled", label: "freeSolo", placeholder: "Favorites" }), void 0)) }, void 0)] }, void 0));
};
const myStyle = css `
  font-size: 48px !important;
  color: blue;
`;
const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        title: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
        title: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
        title: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
    { title: "Casablanca", year: 1942 },
    { title: "City Lights", year: 1931 },
    { title: "Psycho", year: 1960 },
    { title: "The Green Mile", year: 1999 },
    { title: "The Intouchables", year: 2011 },
    { title: "Modern Times", year: 1936 },
    { title: "Raiders of the Lost Ark", year: 1981 },
    { title: "Rear Window", year: 1954 },
    { title: "The Pianist", year: 2002 },
    { title: "The Departed", year: 2006 },
    { title: "Terminator 2: Judgment Day", year: 1991 },
    { title: "Back to the Future", year: 1985 },
    { title: "Whiplash", year: 2014 },
    { title: "Gladiator", year: 2000 },
    { title: "Memento", year: 2000 },
    { title: "The Prestige", year: 2006 },
    { title: "The Lion King", year: 1994 },
    { title: "Apocalypse Now", year: 1979 },
    { title: "Alien", year: 1979 },
    { title: "Sunset Boulevard", year: 1950 },
    {
        title: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
    },
    { title: "The Great Dictator", year: 1940 },
    { title: "Cinema Paradiso", year: 1988 },
    { title: "The Lives of Others", year: 2006 },
    { title: "Grave of the Fireflies", year: 1988 },
    { title: "Paths of Glory", year: 1957 },
    { title: "Django Unchained", year: 2012 },
    { title: "The Shining", year: 1980 },
    { title: "WALL·E", year: 2008 },
    { title: "American Beauty", year: 1999 },
    { title: "The Dark Knight Rises", year: 2012 },
    { title: "Princess Mononoke", year: 1997 },
    { title: "Aliens", year: 1986 },
    { title: "Oldboy", year: 2003 },
    { title: "Once Upon a Time in America", year: 1984 },
    { title: "Witness for the Prosecution", year: 1957 },
    { title: "Das Boot", year: 1981 },
    { title: "Citizen Kane", year: 1941 },
    { title: "North by Northwest", year: 1959 },
    { title: "Vertigo", year: 1958 },
    {
        title: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
    },
    { title: "Reservoir Dogs", year: 1992 },
    { title: "Braveheart", year: 1995 },
    { title: "M", year: 1931 },
    { title: "Requiem for a Dream", year: 2000 },
    { title: "Amélie", year: 2001 },
    { title: "A Clockwork Orange", year: 1971 },
    { title: "Like Stars on Earth", year: 2007 },
    { title: "Taxi Driver", year: 1976 },
    { title: "Lawrence of Arabia", year: 1962 },
    { title: "Double Indemnity", year: 1944 },
    {
        title: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
    },
    { title: "Amadeus", year: 1984 },
    { title: "To Kill a Mockingbird", year: 1962 },
    { title: "Toy Story 3", year: 2010 },
    { title: "Logan", year: 2017 },
    { title: "Full Metal Jacket", year: 1987 },
    { title: "Dangal", year: 2016 },
    { title: "The Sting", year: 1973 },
    { title: "2001: A Space Odyssey", year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: "Toy Story", year: 1995 },
    { title: "Bicycle Thieves", year: 1948 },
    { title: "The Kid", year: 1921 },
    { title: "Inglourious Basterds", year: 2009 },
    { title: "Snatch", year: 2000 },
    { title: "3 Idiots", year: 2009 },
    { title: "Monty Python and the Holy Grail", year: 1975 },
];

class HelloReact extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const main = this.root.querySelector("main");
            const props = this.params;
            ReactDOM.render(jsx(react.exports.StrictMode, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, props), void 0) }, void 0) }, void 0), main);
        });
    }
    handleAttributeChange() {
        const main = this.root.querySelector("main");
        const props = this.params;
        ReactDOM.render(jsx(react.exports.StrictMode, { children: jsx(EmotionCacheProvider, { children: jsx(App, Object.assign({}, props), void 0) }, void 0) }, void 0), main);
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
	"@id": "hello-react",
	"stanza:label": "Hello react",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Yoji Shidara",
	"stanza:contributor": [
],
	"stanza:created": "2021-10-11",
	"stanza:updated": "2021-10-11",
	"stanza:parameter": [
	{
		"stanza:key": "say-to",
		"stanza:type": "string",
		"stanza:example": "world",
		"stanza:description": "who to say hello to",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "bottom-right",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
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
//# sourceMappingURL=hello-react.js.map
