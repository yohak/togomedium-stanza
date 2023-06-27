import { d as defineComponent, h as ref, i as octicons, a as createElementBlock, F as Fragment, e as createBaseVNode, j as createTextVNode, m as mergeProps, o as openBlock, k as computed, l as watch, r as resolveComponent, c as createBlock, n as normalizeProps, p as guardReactiveProps, q as resolveDynamicComponent, u as createVNode, t as toDisplayString, b as renderList, v as pushScopeId, x as popScopeId, y as n, f as createCommentVNode, z as normalizeClass, A as unref, B as normalizeStyle, s as script$8, w as withCtx, g as createApp } from './Layout-b2192e38.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var tabExports = {};
var tab = {
  get exports(){ return tabExports; },
  set exports(v){ tabExports = v; },
};

var baseComponentExports = {};
var baseComponent = {
  get exports(){ return baseComponentExports; },
  set exports(v){ baseComponentExports = v; },
};

var dataExports = {};
var data = {
  get exports(){ return dataExports; },
  set exports(v){ dataExports = v; },
};

/*!
  * Bootstrap data.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredData;

function requireData () {
	if (hasRequiredData) return dataExports;
	hasRequiredData = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(commonjsGlobal, (function () {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap dom/data.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  /**
		   * Constants
		   */

		  const elementMap = new Map();
		  const data = {
		    set(element, key, instance) {
		      if (!elementMap.has(element)) {
		        elementMap.set(element, new Map());
		      }
		      const instanceMap = elementMap.get(element);

		      // make it clear we only want one instance per element
		      // can be removed later when multiple key/instances are fine to be used
		      if (!instanceMap.has(key) && instanceMap.size !== 0) {
		        // eslint-disable-next-line no-console
		        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
		        return;
		      }
		      instanceMap.set(key, instance);
		    },
		    get(element, key) {
		      if (elementMap.has(element)) {
		        return elementMap.get(element).get(key) || null;
		      }
		      return null;
		    },
		    remove(element, key) {
		      if (!elementMap.has(element)) {
		        return;
		      }
		      const instanceMap = elementMap.get(element);
		      instanceMap.delete(key);

		      // free up element references if there are no instances left for an element
		      if (instanceMap.size === 0) {
		        elementMap.delete(element);
		      }
		    }
		  };

		  return data;

		}));
		
} (data));
	return dataExports;
}

var eventHandlerExports = {};
var eventHandler = {
  get exports(){ return eventHandlerExports; },
  set exports(v){ eventHandlerExports = v; },
};

var utilExports = {};
var util = {
  get exports(){ return utilExports; },
  set exports(v){ utilExports = v; },
};

/*!
  * Bootstrap index.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return utilExports;
	hasRequiredUtil = 1;
	(function (module, exports) {
		(function (global, factory) {
		  factory(exports) ;
		})(commonjsGlobal, (function (exports) {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap util/index.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  const MAX_UID = 1000000;
		  const MILLISECONDS_MULTIPLIER = 1000;
		  const TRANSITION_END = 'transitionend';

		  /**
		   * Properly escape IDs selectors to handle weird IDs
		   * @param {string} selector
		   * @returns {string}
		   */
		  const parseSelector = selector => {
		    if (selector && window.CSS && window.CSS.escape) {
		      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
		      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
		    }
		    return selector;
		  };

		  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
		  const toType = object => {
		    if (object === null || object === undefined) {
		      return `${object}`;
		    }
		    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
		  };

		  /**
		   * Public Util API
		   */

		  const getUID = prefix => {
		    do {
		      prefix += Math.floor(Math.random() * MAX_UID);
		    } while (document.getElementById(prefix));
		    return prefix;
		  };
		  const getTransitionDurationFromElement = element => {
		    if (!element) {
		      return 0;
		    }

		    // Get transition-duration of the element
		    let {
		      transitionDuration,
		      transitionDelay
		    } = window.getComputedStyle(element);
		    const floatTransitionDuration = Number.parseFloat(transitionDuration);
		    const floatTransitionDelay = Number.parseFloat(transitionDelay);

		    // Return 0 if element or transition duration is not found
		    if (!floatTransitionDuration && !floatTransitionDelay) {
		      return 0;
		    }

		    // If multiple durations are defined, take the first
		    transitionDuration = transitionDuration.split(',')[0];
		    transitionDelay = transitionDelay.split(',')[0];
		    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
		  };
		  const triggerTransitionEnd = element => {
		    element.dispatchEvent(new Event(TRANSITION_END));
		  };
		  const isElement = object => {
		    if (!object || typeof object !== 'object') {
		      return false;
		    }
		    if (typeof object.jquery !== 'undefined') {
		      object = object[0];
		    }
		    return typeof object.nodeType !== 'undefined';
		  };
		  const getElement = object => {
		    // it's a jQuery object or a node element
		    if (isElement(object)) {
		      return object.jquery ? object[0] : object;
		    }
		    if (typeof object === 'string' && object.length > 0) {
		      return document.querySelector(parseSelector(object));
		    }
		    return null;
		  };
		  const isVisible = element => {
		    if (!isElement(element) || element.getClientRects().length === 0) {
		      return false;
		    }
		    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
		    // Handle `details` element as its content may falsie appear visible when it is closed
		    const closedDetails = element.closest('details:not([open])');
		    if (!closedDetails) {
		      return elementIsVisible;
		    }
		    if (closedDetails !== element) {
		      const summary = element.closest('summary');
		      if (summary && summary.parentNode !== closedDetails) {
		        return false;
		      }
		      if (summary === null) {
		        return false;
		      }
		    }
		    return elementIsVisible;
		  };
		  const isDisabled = element => {
		    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
		      return true;
		    }
		    if (element.classList.contains('disabled')) {
		      return true;
		    }
		    if (typeof element.disabled !== 'undefined') {
		      return element.disabled;
		    }
		    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
		  };
		  const findShadowRoot = element => {
		    if (!document.documentElement.attachShadow) {
		      return null;
		    }

		    // Can find the shadow root otherwise it'll return the document
		    if (typeof element.getRootNode === 'function') {
		      const root = element.getRootNode();
		      return root instanceof ShadowRoot ? root : null;
		    }
		    if (element instanceof ShadowRoot) {
		      return element;
		    }

		    // when we don't find a shadow root
		    if (!element.parentNode) {
		      return null;
		    }
		    return findShadowRoot(element.parentNode);
		  };
		  const noop = () => {};

		  /**
		   * Trick to restart an element's animation
		   *
		   * @param {HTMLElement} element
		   * @return void
		   *
		   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
		   */
		  const reflow = element => {
		    element.offsetHeight; // eslint-disable-line no-unused-expressions
		  };

		  const getjQuery = () => {
		    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
		      return window.jQuery;
		    }
		    return null;
		  };
		  const DOMContentLoadedCallbacks = [];
		  const onDOMContentLoaded = callback => {
		    if (document.readyState === 'loading') {
		      // add listener on the first call when the document is in loading state
		      if (!DOMContentLoadedCallbacks.length) {
		        document.addEventListener('DOMContentLoaded', () => {
		          for (const callback of DOMContentLoadedCallbacks) {
		            callback();
		          }
		        });
		      }
		      DOMContentLoadedCallbacks.push(callback);
		    } else {
		      callback();
		    }
		  };
		  const isRTL = () => document.documentElement.dir === 'rtl';
		  const defineJQueryPlugin = plugin => {
		    onDOMContentLoaded(() => {
		      const $ = getjQuery();
		      /* istanbul ignore if */
		      if ($) {
		        const name = plugin.NAME;
		        const JQUERY_NO_CONFLICT = $.fn[name];
		        $.fn[name] = plugin.jQueryInterface;
		        $.fn[name].Constructor = plugin;
		        $.fn[name].noConflict = () => {
		          $.fn[name] = JQUERY_NO_CONFLICT;
		          return plugin.jQueryInterface;
		        };
		      }
		    });
		  };
		  const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
		    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue;
		  };
		  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
		    if (!waitForTransition) {
		      execute(callback);
		      return;
		    }
		    const durationPadding = 5;
		    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
		    let called = false;
		    const handler = ({
		      target
		    }) => {
		      if (target !== transitionElement) {
		        return;
		      }
		      called = true;
		      transitionElement.removeEventListener(TRANSITION_END, handler);
		      execute(callback);
		    };
		    transitionElement.addEventListener(TRANSITION_END, handler);
		    setTimeout(() => {
		      if (!called) {
		        triggerTransitionEnd(transitionElement);
		      }
		    }, emulatedDuration);
		  };

		  /**
		   * Return the previous/next element of a list.
		   *
		   * @param {array} list    The list of elements
		   * @param activeElement   The active element
		   * @param shouldGetNext   Choose to get next or previous element
		   * @param isCycleAllowed
		   * @return {Element|elem} The proper element
		   */
		  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
		    const listLength = list.length;
		    let index = list.indexOf(activeElement);

		    // if the element does not exist in the list return an element
		    // depending on the direction and if cycle is allowed
		    if (index === -1) {
		      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
		    }
		    index += shouldGetNext ? 1 : -1;
		    if (isCycleAllowed) {
		      index = (index + listLength) % listLength;
		    }
		    return list[Math.max(0, Math.min(index, listLength - 1))];
		  };

		  exports.defineJQueryPlugin = defineJQueryPlugin;
		  exports.execute = execute;
		  exports.executeAfterTransition = executeAfterTransition;
		  exports.findShadowRoot = findShadowRoot;
		  exports.getElement = getElement;
		  exports.getNextActiveElement = getNextActiveElement;
		  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
		  exports.getUID = getUID;
		  exports.getjQuery = getjQuery;
		  exports.isDisabled = isDisabled;
		  exports.isElement = isElement;
		  exports.isRTL = isRTL;
		  exports.isVisible = isVisible;
		  exports.noop = noop;
		  exports.onDOMContentLoaded = onDOMContentLoaded;
		  exports.parseSelector = parseSelector;
		  exports.reflow = reflow;
		  exports.toType = toType;
		  exports.triggerTransitionEnd = triggerTransitionEnd;

		  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

		}));
		
} (util, utilExports));
	return utilExports;
}

/*!
  * Bootstrap event-handler.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredEventHandler;

function requireEventHandler () {
	if (hasRequiredEventHandler) return eventHandlerExports;
	hasRequiredEventHandler = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil()) ;
		})(commonjsGlobal, (function (index_js) {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap dom/event-handler.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */


		  /**
		   * Constants
		   */

		  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
		  const stripNameRegex = /\..*/;
		  const stripUidRegex = /::\d+$/;
		  const eventRegistry = {}; // Events storage
		  let uidEvent = 1;
		  const customEvents = {
		    mouseenter: 'mouseover',
		    mouseleave: 'mouseout'
		  };
		  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

		  /**
		   * Private methods
		   */

		  function makeEventUid(element, uid) {
		    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
		  }
		  function getElementEvents(element) {
		    const uid = makeEventUid(element);
		    element.uidEvent = uid;
		    eventRegistry[uid] = eventRegistry[uid] || {};
		    return eventRegistry[uid];
		  }
		  function bootstrapHandler(element, fn) {
		    return function handler(event) {
		      hydrateObj(event, {
		        delegateTarget: element
		      });
		      if (handler.oneOff) {
		        EventHandler.off(element, event.type, fn);
		      }
		      return fn.apply(element, [event]);
		    };
		  }
		  function bootstrapDelegationHandler(element, selector, fn) {
		    return function handler(event) {
		      const domElements = element.querySelectorAll(selector);
		      for (let {
		        target
		      } = event; target && target !== this; target = target.parentNode) {
		        for (const domElement of domElements) {
		          if (domElement !== target) {
		            continue;
		          }
		          hydrateObj(event, {
		            delegateTarget: target
		          });
		          if (handler.oneOff) {
		            EventHandler.off(element, event.type, selector, fn);
		          }
		          return fn.apply(target, [event]);
		        }
		      }
		    };
		  }
		  function findHandler(events, callable, delegationSelector = null) {
		    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
		  }
		  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
		    const isDelegated = typeof handler === 'string';
		    // TODO: tooltip passes `false` instead of selector, so we need to check
		    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
		    let typeEvent = getTypeEvent(originalTypeEvent);
		    if (!nativeEvents.has(typeEvent)) {
		      typeEvent = originalTypeEvent;
		    }
		    return [isDelegated, callable, typeEvent];
		  }
		  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
		    if (typeof originalTypeEvent !== 'string' || !element) {
		      return;
		    }
		    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);

		    // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
		    // this prevents the handler from being dispatched the same way as mouseover or mouseout does
		    if (originalTypeEvent in customEvents) {
		      const wrapFunction = fn => {
		        return function (event) {
		          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
		            return fn.call(this, event);
		          }
		        };
		      };
		      callable = wrapFunction(callable);
		    }
		    const events = getElementEvents(element);
		    const handlers = events[typeEvent] || (events[typeEvent] = {});
		    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
		    if (previousFunction) {
		      previousFunction.oneOff = previousFunction.oneOff && oneOff;
		      return;
		    }
		    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
		    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
		    fn.delegationSelector = isDelegated ? handler : null;
		    fn.callable = callable;
		    fn.oneOff = oneOff;
		    fn.uidEvent = uid;
		    handlers[uid] = fn;
		    element.addEventListener(typeEvent, fn, isDelegated);
		  }
		  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
		    const fn = findHandler(events[typeEvent], handler, delegationSelector);
		    if (!fn) {
		      return;
		    }
		    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
		    delete events[typeEvent][fn.uidEvent];
		  }
		  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
		    const storeElementEvent = events[typeEvent] || {};
		    for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
		      if (handlerKey.includes(namespace)) {
		        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
		      }
		    }
		  }
		  function getTypeEvent(event) {
		    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
		    event = event.replace(stripNameRegex, '');
		    return customEvents[event] || event;
		  }
		  const EventHandler = {
		    on(element, event, handler, delegationFunction) {
		      addHandler(element, event, handler, delegationFunction, false);
		    },
		    one(element, event, handler, delegationFunction) {
		      addHandler(element, event, handler, delegationFunction, true);
		    },
		    off(element, originalTypeEvent, handler, delegationFunction) {
		      if (typeof originalTypeEvent !== 'string' || !element) {
		        return;
		      }
		      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
		      const inNamespace = typeEvent !== originalTypeEvent;
		      const events = getElementEvents(element);
		      const storeElementEvent = events[typeEvent] || {};
		      const isNamespace = originalTypeEvent.startsWith('.');
		      if (typeof callable !== 'undefined') {
		        // Simplest case: handler is passed, remove that listener ONLY.
		        if (!Object.keys(storeElementEvent).length) {
		          return;
		        }
		        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
		        return;
		      }
		      if (isNamespace) {
		        for (const elementEvent of Object.keys(events)) {
		          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
		        }
		      }
		      for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
		        const handlerKey = keyHandlers.replace(stripUidRegex, '');
		        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
		          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
		        }
		      }
		    },
		    trigger(element, event, args) {
		      if (typeof event !== 'string' || !element) {
		        return null;
		      }
		      const $ = index_js.getjQuery();
		      const typeEvent = getTypeEvent(event);
		      const inNamespace = event !== typeEvent;
		      let jQueryEvent = null;
		      let bubbles = true;
		      let nativeDispatch = true;
		      let defaultPrevented = false;
		      if (inNamespace && $) {
		        jQueryEvent = $.Event(event, args);
		        $(element).trigger(jQueryEvent);
		        bubbles = !jQueryEvent.isPropagationStopped();
		        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
		        defaultPrevented = jQueryEvent.isDefaultPrevented();
		      }
		      const evt = hydrateObj(new Event(event, {
		        bubbles,
		        cancelable: true
		      }), args);
		      if (defaultPrevented) {
		        evt.preventDefault();
		      }
		      if (nativeDispatch) {
		        element.dispatchEvent(evt);
		      }
		      if (evt.defaultPrevented && jQueryEvent) {
		        jQueryEvent.preventDefault();
		      }
		      return evt;
		    }
		  };
		  function hydrateObj(obj, meta = {}) {
		    for (const [key, value] of Object.entries(meta)) {
		      try {
		        obj[key] = value;
		      } catch (_unused) {
		        Object.defineProperty(obj, key, {
		          configurable: true,
		          get() {
		            return value;
		          }
		        });
		      }
		    }
		    return obj;
		  }

		  return EventHandler;

		}));
		
} (eventHandler));
	return eventHandlerExports;
}

var configExports = {};
var config = {
  get exports(){ return configExports; },
  set exports(v){ configExports = v; },
};

var manipulatorExports = {};
var manipulator = {
  get exports(){ return manipulatorExports; },
  set exports(v){ manipulatorExports = v; },
};

/*!
  * Bootstrap manipulator.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredManipulator;

function requireManipulator () {
	if (hasRequiredManipulator) return manipulatorExports;
	hasRequiredManipulator = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		})(commonjsGlobal, (function () {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap dom/manipulator.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  function normalizeData(value) {
		    if (value === 'true') {
		      return true;
		    }
		    if (value === 'false') {
		      return false;
		    }
		    if (value === Number(value).toString()) {
		      return Number(value);
		    }
		    if (value === '' || value === 'null') {
		      return null;
		    }
		    if (typeof value !== 'string') {
		      return value;
		    }
		    try {
		      return JSON.parse(decodeURIComponent(value));
		    } catch (_unused) {
		      return value;
		    }
		  }
		  function normalizeDataKey(key) {
		    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
		  }
		  const Manipulator = {
		    setDataAttribute(element, key, value) {
		      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
		    },
		    removeDataAttribute(element, key) {
		      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
		    },
		    getDataAttributes(element) {
		      if (!element) {
		        return {};
		      }
		      const attributes = {};
		      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
		      for (const key of bsKeys) {
		        let pureKey = key.replace(/^bs/, '');
		        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
		        attributes[pureKey] = normalizeData(element.dataset[key]);
		      }
		      return attributes;
		    },
		    getDataAttribute(element, key) {
		      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
		    }
		  };

		  return Manipulator;

		}));
		
} (manipulator));
	return manipulatorExports;
}

/*!
  * Bootstrap config.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredConfig;

function requireConfig () {
	if (hasRequiredConfig) return configExports;
	hasRequiredConfig = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireManipulator(), requireUtil()) ;
		})(commonjsGlobal, (function (Manipulator, index_js) {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap util/config.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */


		  /**
		   * Class definition
		   */

		  class Config {
		    // Getters
		    static get Default() {
		      return {};
		    }
		    static get DefaultType() {
		      return {};
		    }
		    static get NAME() {
		      throw new Error('You have to implement the static method "NAME", for each component!');
		    }
		    _getConfig(config) {
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      return config;
		    }
		    _mergeConfigObj(config, element) {
		      const jsonConfig = index_js.isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

		      return {
		        ...this.constructor.Default,
		        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
		        ...(index_js.isElement(element) ? Manipulator.getDataAttributes(element) : {}),
		        ...(typeof config === 'object' ? config : {})
		      };
		    }
		    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
		      for (const [property, expectedTypes] of Object.entries(configTypes)) {
		        const value = config[property];
		        const valueType = index_js.isElement(value) ? 'element' : index_js.toType(value);
		        if (!new RegExp(expectedTypes).test(valueType)) {
		          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
		        }
		      }
		    }
		  }

		  return Config;

		}));
		
} (config));
	return configExports;
}

/*!
  * Bootstrap base-component.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredBaseComponent;

function requireBaseComponent () {
	if (hasRequiredBaseComponent) return baseComponentExports;
	hasRequiredBaseComponent = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireData(), requireEventHandler(), requireConfig(), requireUtil()) ;
		})(commonjsGlobal, (function (Data, EventHandler, Config, index_js) {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap base-component.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */


		  /**
		   * Constants
		   */

		  const VERSION = '5.3.0';

		  /**
		   * Class definition
		   */

		  class BaseComponent extends Config {
		    constructor(element, config) {
		      super();
		      element = index_js.getElement(element);
		      if (!element) {
		        return;
		      }
		      this._element = element;
		      this._config = this._getConfig(config);
		      Data.set(this._element, this.constructor.DATA_KEY, this);
		    }

		    // Public
		    dispose() {
		      Data.remove(this._element, this.constructor.DATA_KEY);
		      EventHandler.off(this._element, this.constructor.EVENT_KEY);
		      for (const propertyName of Object.getOwnPropertyNames(this)) {
		        this[propertyName] = null;
		      }
		    }
		    _queueCallback(callback, element, isAnimated = true) {
		      index_js.executeAfterTransition(callback, element, isAnimated);
		    }
		    _getConfig(config) {
		      config = this._mergeConfigObj(config, this._element);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }

		    // Static
		    static getInstance(element) {
		      return Data.get(index_js.getElement(element), this.DATA_KEY);
		    }
		    static getOrCreateInstance(element, config = {}) {
		      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
		    }
		    static get VERSION() {
		      return VERSION;
		    }
		    static get DATA_KEY() {
		      return `bs.${this.NAME}`;
		    }
		    static get EVENT_KEY() {
		      return `.${this.DATA_KEY}`;
		    }
		    static eventName(name) {
		      return `${name}${this.EVENT_KEY}`;
		    }
		  }

		  return BaseComponent;

		}));
		
} (baseComponent));
	return baseComponentExports;
}

var selectorEngineExports = {};
var selectorEngine = {
  get exports(){ return selectorEngineExports; },
  set exports(v){ selectorEngineExports = v; },
};

/*!
  * Bootstrap selector-engine.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

var hasRequiredSelectorEngine;

function requireSelectorEngine () {
	if (hasRequiredSelectorEngine) return selectorEngineExports;
	hasRequiredSelectorEngine = 1;
	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil()) ;
		})(commonjsGlobal, (function (index_js) {
		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap dom/selector-engine.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */

		  const getSelector = element => {
		    let selector = element.getAttribute('data-bs-target');
		    if (!selector || selector === '#') {
		      let hrefAttribute = element.getAttribute('href');

		      // The only valid content that could double as a selector are IDs or classes,
		      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
		      // `document.querySelector` will rightfully complain it is invalid.
		      // See https://github.com/twbs/bootstrap/issues/32273
		      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
		        return null;
		      }

		      // Just in case some CMS puts out a full URL with the anchor appended
		      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
		        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
		      }
		      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
		    }
		    return index_js.parseSelector(selector);
		  };
		  const SelectorEngine = {
		    find(selector, element = document.documentElement) {
		      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
		    },
		    findOne(selector, element = document.documentElement) {
		      return Element.prototype.querySelector.call(element, selector);
		    },
		    children(element, selector) {
		      return [].concat(...element.children).filter(child => child.matches(selector));
		    },
		    parents(element, selector) {
		      const parents = [];
		      let ancestor = element.parentNode.closest(selector);
		      while (ancestor) {
		        parents.push(ancestor);
		        ancestor = ancestor.parentNode.closest(selector);
		      }
		      return parents;
		    },
		    prev(element, selector) {
		      let previous = element.previousElementSibling;
		      while (previous) {
		        if (previous.matches(selector)) {
		          return [previous];
		        }
		        previous = previous.previousElementSibling;
		      }
		      return [];
		    },
		    // TODO: this is now unused; remove later along with prev()
		    next(element, selector) {
		      let next = element.nextElementSibling;
		      while (next) {
		        if (next.matches(selector)) {
		          return [next];
		        }
		        next = next.nextElementSibling;
		      }
		      return [];
		    },
		    focusableChildren(element) {
		      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
		      return this.find(focusables, element).filter(el => !index_js.isDisabled(el) && index_js.isVisible(el));
		    },
		    getSelectorFromElement(element) {
		      const selector = getSelector(element);
		      if (selector) {
		        return SelectorEngine.findOne(selector) ? selector : null;
		      }
		      return null;
		    },
		    getElementFromSelector(element) {
		      const selector = getSelector(element);
		      return selector ? SelectorEngine.findOne(selector) : null;
		    },
		    getMultipleElementsFromSelector(element) {
		      const selector = getSelector(element);
		      return selector ? SelectorEngine.find(selector) : [];
		    }
		  };

		  return SelectorEngine;

		}));
		
} (selectorEngine));
	return selectorEngineExports;
}

/*!
  * Bootstrap tab.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

(function (module, exports) {
	(function (global, factory) {
	  module.exports = factory(requireBaseComponent(), requireEventHandler(), requireSelectorEngine(), requireUtil()) ;
	})(commonjsGlobal, (function (BaseComponent, EventHandler, SelectorEngine, index_js) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap tab.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	   * --------------------------------------------------------------------------
	   */


	  /**
	   * Constants
	   */

	  const NAME = 'tab';
	  const DATA_KEY = 'bs.tab';
	  const EVENT_KEY = `.${DATA_KEY}`;
	  const EVENT_HIDE = `hide${EVENT_KEY}`;
	  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	  const EVENT_SHOW = `show${EVENT_KEY}`;
	  const EVENT_SHOWN = `shown${EVENT_KEY}`;
	  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
	  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
	  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
	  const ARROW_LEFT_KEY = 'ArrowLeft';
	  const ARROW_RIGHT_KEY = 'ArrowRight';
	  const ARROW_UP_KEY = 'ArrowUp';
	  const ARROW_DOWN_KEY = 'ArrowDown';
	  const CLASS_NAME_ACTIVE = 'active';
	  const CLASS_NAME_FADE = 'fade';
	  const CLASS_NAME_SHOW = 'show';
	  const CLASS_DROPDOWN = 'dropdown';
	  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
	  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
	  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
	  const SELECTOR_OUTER = '.nav-item, .list-group-item';
	  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
	  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
	  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
	  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;

	  /**
	   * Class definition
	   */

	  class Tab extends BaseComponent {
	    constructor(element) {
	      super(element);
	      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
	      if (!this._parent) {
	        return;
	        // TODO: should throw exception in v6
	        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
	      }

	      // Set up initial aria attributes
	      this._setInitialAttributes(this._parent, this._getChildren());
	      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	    }

	    // Getters
	    static get NAME() {
	      return NAME;
	    }

	    // Public
	    show() {
	      // Shows this elem and deactivate the active sibling if exists
	      const innerElem = this._element;
	      if (this._elemIsActive(innerElem)) {
	        return;
	      }

	      // Search for active tab on same parent to deactivate it
	      const active = this._getActiveElem();
	      const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE, {
	        relatedTarget: innerElem
	      }) : null;
	      const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW, {
	        relatedTarget: active
	      });
	      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
	        return;
	      }
	      this._deactivate(active, innerElem);
	      this._activate(innerElem, active);
	    }

	    // Private
	    _activate(element, relatedElem) {
	      if (!element) {
	        return;
	      }
	      element.classList.add(CLASS_NAME_ACTIVE);
	      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

	      const complete = () => {
	        if (element.getAttribute('role') !== 'tab') {
	          element.classList.add(CLASS_NAME_SHOW);
	          return;
	        }
	        element.removeAttribute('tabindex');
	        element.setAttribute('aria-selected', true);
	        this._toggleDropDown(element, true);
	        EventHandler.trigger(element, EVENT_SHOWN, {
	          relatedTarget: relatedElem
	        });
	      };
	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
	    }
	    _deactivate(element, relatedElem) {
	      if (!element) {
	        return;
	      }
	      element.classList.remove(CLASS_NAME_ACTIVE);
	      element.blur();
	      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

	      const complete = () => {
	        if (element.getAttribute('role') !== 'tab') {
	          element.classList.remove(CLASS_NAME_SHOW);
	          return;
	        }
	        element.setAttribute('aria-selected', false);
	        element.setAttribute('tabindex', '-1');
	        this._toggleDropDown(element, false);
	        EventHandler.trigger(element, EVENT_HIDDEN, {
	          relatedTarget: relatedElem
	        });
	      };
	      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
	    }
	    _keydown(event) {
	      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
	        return;
	      }
	      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
	      event.preventDefault();
	      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
	      const nextActiveElement = index_js.getNextActiveElement(this._getChildren().filter(element => !index_js.isDisabled(element)), event.target, isNext, true);
	      if (nextActiveElement) {
	        nextActiveElement.focus({
	          preventScroll: true
	        });
	        Tab.getOrCreateInstance(nextActiveElement).show();
	      }
	    }
	    _getChildren() {
	      // collection of inner elements
	      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
	    }
	    _getActiveElem() {
	      return this._getChildren().find(child => this._elemIsActive(child)) || null;
	    }
	    _setInitialAttributes(parent, children) {
	      this._setAttributeIfNotExists(parent, 'role', 'tablist');
	      for (const child of children) {
	        this._setInitialAttributesOnChild(child);
	      }
	    }
	    _setInitialAttributesOnChild(child) {
	      child = this._getInnerElement(child);
	      const isActive = this._elemIsActive(child);
	      const outerElem = this._getOuterElement(child);
	      child.setAttribute('aria-selected', isActive);
	      if (outerElem !== child) {
	        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
	      }
	      if (!isActive) {
	        child.setAttribute('tabindex', '-1');
	      }
	      this._setAttributeIfNotExists(child, 'role', 'tab');

	      // set attributes to the related panel too
	      this._setInitialAttributesOnTargetPanel(child);
	    }
	    _setInitialAttributesOnTargetPanel(child) {
	      const target = SelectorEngine.getElementFromSelector(child);
	      if (!target) {
	        return;
	      }
	      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
	      if (child.id) {
	        this._setAttributeIfNotExists(target, 'aria-labelledby', `${child.id}`);
	      }
	    }
	    _toggleDropDown(element, open) {
	      const outerElem = this._getOuterElement(element);
	      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
	        return;
	      }
	      const toggle = (selector, className) => {
	        const element = SelectorEngine.findOne(selector, outerElem);
	        if (element) {
	          element.classList.toggle(className, open);
	        }
	      };
	      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
	      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
	      outerElem.setAttribute('aria-expanded', open);
	    }
	    _setAttributeIfNotExists(element, attribute, value) {
	      if (!element.hasAttribute(attribute)) {
	        element.setAttribute(attribute, value);
	      }
	    }
	    _elemIsActive(elem) {
	      return elem.classList.contains(CLASS_NAME_ACTIVE);
	    }

	    // Try to get the inner element (usually the .nav-link)
	    _getInnerElement(elem) {
	      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
	    }

	    // Try to get the outer element (usually the .nav-item)
	    _getOuterElement(elem) {
	      return elem.closest(SELECTOR_OUTER) || elem;
	    }

	    // Static
	    static jQueryInterface(config) {
	      return this.each(function () {
	        const data = Tab.getOrCreateInstance(this);
	        if (typeof config !== 'string') {
	          return;
	        }
	        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	          throw new TypeError(`No method named "${config}"`);
	        }
	        data[config]();
	      });
	    }
	  }

	  /**
	   * Data API implementation
	   */

	  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }
	    if (index_js.isDisabled(this)) {
	      return;
	    }
	    Tab.getOrCreateInstance(this).show();
	  });

	  /**
	   * Initialize on focus
	   */
	  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
	    for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
	      Tab.getOrCreateInstance(element);
	    }
	  });
	  /**
	   * jQuery
	   */

	  index_js.defineJQueryPlugin(Tab);

	  return Tab;

	}));
	
} (tab));

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

var script$7 = defineComponent({
  props: ['value'],

  setup(props) {
    const isCopiedShown = ref(false);

    const hideCopiedDebounced = lodash_debounce(() => {
      isCopiedShown.value = false;
    }, 1_500);

    async function copyToClipboard() {
      await navigator.clipboard.writeText(props.value);

      isCopiedShown.value = true;
      hideCopiedDebounced();
    }

    return {
      isCopiedShown,
      copyToClipboard,
      checkIcon: octicons.check
    };
  }
});

const _hoisted_1$7 = ["innerHTML"];

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", mergeProps({
    type: "button",
    onClick: _cache[0] || (_cache[0] = $event => (_ctx.copyToClipboard()))
  }, _ctx.$attrs), [
    (_ctx.isCopiedShown)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("span", {
            innerHTML: _ctx.checkIcon.toSVG({height: 19})
          }, null, 8 /* PROPS */, _hoisted_1$7),
          createTextVNode(" Copied ")
        ], 64 /* STABLE_FRAGMENT */))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createTextVNode(" Copy to clipboard ")
        ], 64 /* STABLE_FRAGMENT */))
  ], 16 /* FULL_PROPS */))
}

script$7.render = render$3;
script$7.__file = "node_modules/togostanza/src/components/CopyButton.vue";

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

var runtime$1 = {};

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

runtime$1.__esModule = true;
runtime$1.checkRevision = checkRevision;
runtime$1.template = template;
runtime$1.wrapProgram = wrapProgram;
runtime$1.resolvePartial = resolvePartial;
runtime$1.invokePartial = invokePartial;
runtime$1.noop = noop;
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

	var _handlebarsRuntime = runtime$1;

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

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

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
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

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
var runtime = handlebars_runtimeExports['default'];

function Helpers0 (Handlebars) {
  Handlebars.registerHelper('eq', (a, b) => a === b);
  Handlebars.registerHelper('and', (a, b) => a && b);
}

function init() {
  Helpers0.__initialized || (Helpers0(runtime), Helpers0.__initialized = true);
}

init();
var Template$2 = /*#__PURE__*/runtime.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<style>\n  "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":15}}}) : helper))) != null ? stack1 : "")
    + " {\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"styleVars") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":4,"column":4},"end":{"line":6,"column":13}}})) != null ? stack1 : "")
    + "  }\n</style>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0)) != null ? stack1 : "")
    + ": "
    + ((stack1 = alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"value") : stack1), depth0)) != null ? stack1 : "")
    + ";\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"styleVars") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
function styleSnippetTemplate(data, options, asString) {
  var html = Template$2(data, options);
  return (asString || true) ? html : $(html);
}

init();
var Template$1 = /*#__PURE__*/runtime.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":2,"column":1},"end":{"line":2,"column":12}}}) : helper)))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"params") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":3,"column":2},"end":{"line":11,"column":11}}})) != null ? stack1 : "")
    + "></"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":12,"column":3},"end":{"line":12,"column":14}}}) : helper)))
    + ">\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||container.hooks.helperMissing).call(alias1,((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"type") : stack1),"boolean",{"name":"eq","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":4,"column":8},"end":{"line":4,"column":33}}}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.program(6, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":4,"column":2},"end":{"line":10,"column":9}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"eq")||(depth0 && lookupProperty(depth0,"eq"))||container.hooks.helperMissing).call(alias1,((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"value") : stack1),"true",{"name":"eq","hash":{},"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":5,"column":8},"end":{"line":5,"column":31}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":5,"column":2},"end":{"line":7,"column":9}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  "
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n";
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  "
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"value") : stack1), depth0))
    + "\"\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":14,"column":1},"end":{"line":14,"column":12}}}) : helper)))
    + "></"
    + alias4(((helper = (helper = lookupProperty(helpers,"tagName") || (depth0 != null ? lookupProperty(depth0,"tagName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tagName","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":14,"column":15},"end":{"line":14,"column":26}}}) : helper)))
    + ">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"params") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.program(8, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"source":"style-snippet.html.hbs","start":{"line":1,"column":0},"end":{"line":15,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
function stanzaSnippetTemplate(data, options, asString) {
  var html = Template$1(data, options);
  return (asString || true) ? html : $(html);
}

init();
var Template = /*#__PURE__*/runtime.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script type=\"module\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"scriptSrc") || (depth0 != null ? lookupProperty(depth0,"scriptSrc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"scriptSrc","hash":{},"data":data,"loc":{"source":"style-snippet.html.hbs","start":{"line":1,"column":27},"end":{"line":1,"column":40}}}) : helper)))
    + "\" async></script>\n";
},"useData":true});
function loaderSnippetTemplate(data, options, asString) {
  var html = Template(data, options);
  return (asString || true) ? html : $(html);
}

var script$6 = defineComponent({
  props: ['metadata', 'params', 'styleVars'],

  components: {
    CopyButton: script$7,
  },

  setup(props) {
    const id = props.metadata['@id'];
    const tagName = `togostanza-${id}`;

    const stanzaProps = computed(() => {
      return props.params.reduce((acc, param) => {
        return param.type === 'boolean' && param.value === 'false'
          ? acc
          : {
              ...acc,
              [param.name]: param.value,
            };
      }, {});
    });

    const stanzaSnippet = computed(() => {
      return stanzaSnippetTemplate({
        tagName,
        params: props.params,
      });
    });

    const styleSnippet = computed(() => {
      return styleSnippetTemplate({
        tagName,
        styleVars: props.styleVars,
      });
    });

    const scriptSrc = new URL(`./${id}.js`, location.href).href;
    const loaderSnippet = loaderSnippetTemplate({ scriptSrc });

    const combinedSnippet = computed(() => {
      return [loaderSnippet, styleSnippet.value, stanzaSnippet.value]
        .filter(Boolean)
        .join('\n');
    });

    const stanzaContainer = ref();

    watch(styleSnippet, () => {
      const stanzaElement = stanzaContainer.value.childNodes[0];
      stanzaElement.render();
    });

    return {
      tagName,
      props: stanzaProps,
      styleSnippet,
      stanzaSnippet,
      combinedSnippet,
      stanzaContainer,
    };
  },
});

const _hoisted_1$6 = { class: "p-3 bg-light" };
const _hoisted_2$6 = ["innerHTML"];
const _hoisted_3$6 = { ref: "stanzaContainer" };
const _hoisted_4$6 = { class: "bg-dark mt-3" };
const _hoisted_5$6 = { class: "text-end p-2" };
const _hoisted_6$5 = { class: "overflow-auto p-3 pt-0 text-white" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CopyButton = resolveComponent("CopyButton");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1$6, [
      createBaseVNode("div", { innerHTML: _ctx.styleSnippet }, null, 8 /* PROPS */, _hoisted_2$6),
      createBaseVNode("div", _hoisted_3$6, [
        (openBlock(), createBlock(resolveDynamicComponent(_ctx.tagName), normalizeProps(guardReactiveProps(_ctx.props)), null, 16 /* FULL_PROPS */))
      ], 512 /* NEED_PATCH */)
    ]),
    createBaseVNode("div", _hoisted_4$6, [
      createBaseVNode("div", _hoisted_5$6, [
        createVNode(_component_CopyButton, {
          value: _ctx.combinedSnippet,
          class: "btn btn-sm btn-light"
        }, null, 8 /* PROPS */, ["value"])
      ]),
      createBaseVNode("pre", _hoisted_6$5, [
        createBaseVNode("code", null, toDisplayString(_ctx.combinedSnippet), 1 /* TEXT */)
      ])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script$6.render = render$2;
script$6.__file = "node_modules/togostanza/src/components/StanzaPreviewer.vue";

const _withScopeId = n => (pushScopeId("data-v-43688ce6"),n=n(),popScopeId(),n);
const _hoisted_1$5 = { class: "table table-borderless border mb-1" };
const _hoisted_2$5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("th", null, "Author", -1 /* HOISTED */));
const _hoisted_3$5 = { class: "mb-0" };
const _hoisted_4$5 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("th", null, "Contributors", -1 /* HOISTED */));
const _hoisted_5$5 = {
  key: 0,
  class: "list-unstyled mb-0"
};
const _hoisted_6$4 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("th", null, "License", -1 /* HOISTED */));
const _hoisted_7$3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("th", null, "Created", -1 /* HOISTED */));
const _hoisted_8$3 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createBaseVNode("th", null, "Updated", -1 /* HOISTED */));
const _hoisted_9$2 = { class: "text-end" };
const _hoisted_10$2 = ["href"];
const _hoisted_11$2 = ["innerHTML"];


var script$5 = {
  __name: 'HelpAboutPane',
  props: {
  metadata: {
    type: Object,
    required: true,
  },
  readme: String,
},
  setup(__props) {



return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("table", _hoisted_1$5, [
      createBaseVNode("tbody", null, [
        createBaseVNode("tr", null, [
          _hoisted_2$5,
          createBaseVNode("td", null, [
            createBaseVNode("address", _hoisted_3$5, toDisplayString(__props.metadata['stanza:author'] || '-'), 1 /* TEXT */)
          ])
        ]),
        createBaseVNode("tr", null, [
          _hoisted_4$5,
          createBaseVNode("td", null, [
            (
              __props.metadata['stanza:contributor'] &&
              __props.metadata['stanza:contributor'].length > 0
            )
              ? (openBlock(), createElementBlock("ul", _hoisted_5$5, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.metadata['stanza:contributor'], (contributor) => {
                    return (openBlock(), createElementBlock("li", { key: contributor }, toDisplayString(contributor), 1 /* TEXT */))
                  }), 128 /* KEYED_FRAGMENT */))
                ]))
              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(" - ")
                ], 64 /* STABLE_FRAGMENT */))
          ])
        ]),
        createBaseVNode("tr", null, [
          _hoisted_6$4,
          createBaseVNode("td", null, toDisplayString(__props.metadata['stanza:license'] || '-'), 1 /* TEXT */)
        ]),
        createBaseVNode("tr", null, [
          _hoisted_7$3,
          createBaseVNode("td", null, toDisplayString(__props.metadata['stanza:created'] || '-'), 1 /* TEXT */)
        ]),
        createBaseVNode("tr", null, [
          _hoisted_8$3,
          createBaseVNode("td", null, toDisplayString(__props.metadata['stanza:updated'] || '-'), 1 /* TEXT */)
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_9$2, [
      createBaseVNode("a", {
        href: `./${__props.metadata['@id']}/metadata.json`
      }, "Download JSON", 8 /* PROPS */, _hoisted_10$2)
    ]),
    createBaseVNode("div", {
      innerHTML: __props.readme,
      class: "mt-4"
    }, null, 8 /* PROPS */, _hoisted_11$2)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

var css = "\nth[data-v-43688ce6] {\n  background-color: var(--bs-light);\n  text-align: center;\n  white-space: nowrap;\n  width: 1%;\n}\nth[data-v-43688ce6],\ntd[data-v-43688ce6] {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n";
n(css,{});

script$5.__scopeId = "data-v-43688ce6";
script$5.__file = "node_modules/togostanza/src/components/HelpAboutPane.vue";

function removePrefix(str, prefix) {
  if (prefix === str) {
    return '';
  } else if (str.startsWith(prefix + '-')) {
    return str.slice(prefix.length + 1);
  }
  return str;
}

var script$4 = defineComponent({
  props: [
    'choices',
    'helpText',
    'input',
    'name',
    'required',
    'type',
    'label',
    'pathPrefix',
  ],
  setup(props) {
    const shortName = computed(() => {
      return removePrefix(props.name, props.pathPrefix);
    });
    const prefix = computed(() => {
      return props.name === props.pathPrefix
        ? props.pathPrefix
        : props.pathPrefix + '-';
    });
    const formType = computed(() => {
      return props.type === 'datetime' ? 'datetime-local' : props.type;
    });
    return { ...props, formType, shortName, prefix };
  },
});

const _hoisted_1$4 = { class: "form-label d-flex" };
const _hoisted_2$4 = { class: "me-auto" };
const _hoisted_3$4 = {
  key: 0,
  class: "text-danger"
};
const _hoisted_4$4 = { class: "text-muted" };
const _hoisted_5$4 = { class: "fs-5" };
const _hoisted_6$3 = { class: "text-muted" };
const _hoisted_7$2 = { class: "input-group" };
const _hoisted_8$2 = ["value"];
const _hoisted_9$1 = ["value"];
const _hoisted_10$1 = { class: "input-group-text" };
const _hoisted_11$1 = ["checked", "id"];
const _hoisted_12$1 = ["for"];
const _hoisted_13 = ["type", "value"];
const _hoisted_14 = ["disabled"];
const _hoisted_15 = { class: "form-text text-muted" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("label", _hoisted_1$4, [
      createBaseVNode("span", _hoisted_2$4, [
        (_ctx.required)
          ? (openBlock(), createElementBlock("span", _hoisted_3$4, "*"))
          : createCommentVNode("v-if", true),
        createBaseVNode("span", _hoisted_4$4, toDisplayString(_ctx.prefix), 1 /* TEXT */),
        createBaseVNode("span", _hoisted_5$4, toDisplayString(_ctx.shortName), 1 /* TEXT */)
      ]),
      createBaseVNode("small", _hoisted_6$3, toDisplayString(_ctx.type || 'string'), 1 /* TEXT */)
    ]),
    createBaseVNode("div", _hoisted_7$2, [
      (_ctx.formType === 'single-choice')
        ? (openBlock(), createElementBlock("select", {
            key: 0,
            value: _ctx.input.valueStr.value,
            onChange: _cache[0] || (_cache[0] = $event => (_ctx.input.setValueStr($event.target.value))),
            class: "form-select"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.choices, (choice) => {
              return (openBlock(), createElementBlock("option", {
                value: choice,
                key: choice
              }, toDisplayString(choice), 9 /* TEXT, PROPS */, _hoisted_9$1))
            }), 128 /* KEYED_FRAGMENT */))
          ], 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_8$2))
        : (_ctx.formType === 'boolean')
          ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("input", {
                  class: "form-check-input mt-0",
                  type: "checkbox",
                  checked: _ctx.input.valueParsed.value,
                  onChange: _cache[1] || (_cache[1] = $event => (_ctx.input.setValueStr($event.target.checked.toString()))),
                  id: _ctx.name
                }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_11$1)
              ]),
              createBaseVNode("label", {
                class: "input-group-text flex-fill bg-body",
                for: _ctx.name
              }, toDisplayString(_ctx.label), 9 /* TEXT, PROPS */, _hoisted_12$1)
            ], 64 /* STABLE_FRAGMENT */))
          : (openBlock(), createElementBlock("input", {
              key: 2,
              type: _ctx.formType,
              value: _ctx.input.valueStr.value,
              onInput: _cache[2] || (_cache[2] = $event => (_ctx.input.setValueStr($event.target.value))),
              class: normalizeClass(["form-control mw-100", { 'form-control-color': _ctx.formType === 'color' }])
            }, null, 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_13)),
      (_ctx.input.hasDefault)
        ? (openBlock(), createElementBlock("button", {
            key: 3,
            onClick: _cache[3] || (_cache[3] = $event => (_ctx.input.resetToDefault())),
            disabled: _ctx.input.isDefault.value,
            type: "button",
            class: "btn btn-light border"
          }, " Reset ", 8 /* PROPS */, _hoisted_14))
        : createCommentVNode("v-if", true)
    ]),
    createBaseVNode("small", _hoisted_15, toDisplayString(_ctx.helpText), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}

script$4.render = render$1;
script$4.__file = "node_modules/togostanza/src/components/FormField.vue";

const _hoisted_1$3 = { class: "d-flex align-items-start" };
const _hoisted_2$3 = {
  class: "nav flex-column nav-pills me-3",
  id: "params-pills-tab",
  role: "tablist",
  "aria-orientation": "vertical"
};
const _hoisted_3$3 = ["data-bs-target"];
const _hoisted_4$3 = {
  class: "tab-content flex-grow-1",
  id: "params-pills-tabContent"
};
const _hoisted_5$3 = ["id"];


var script$3 = {
  __name: 'HelpParametersPane',
  props: {
  paramFieldGroups: {
    type: Array,
    required: true,
  },
},
  setup(__props) {

const { paramFieldGroups } = __props;



// paramFieldGroups:
//   [['data', [ParamField, ParamField, ...]], ['axis', undefined], ...]

const firstActiveParamFieldGroupPath = paramFieldGroups
  .find(([_, parameters]) => parameters && parameters.length > 0)[0]
  .join('-');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", _hoisted_2$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.paramFieldGroups, ([path, params]) => {
        return (openBlock(), createElementBlock("button", {
          key: path.join('-'),
          class: normalizeClass(
            `nav-link text-start` +
            (path.join('-') === unref(firstActiveParamFieldGroupPath)
              ? ' active'
              : '') +
            (params ? '' : ' disabled')
          ),
          "data-bs-toggle": "pill",
          "data-bs-target": `#params-pills-${path.join('-')}`,
          type: "button",
          role: "tab",
          style: normalizeStyle({ 'padding-left': `${path.length * 2}rem` })
        }, toDisplayString(path[path.length - 1]), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_3$3))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    createBaseVNode("div", _hoisted_4$3, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.paramFieldGroups, ([path, params]) => {
        return (openBlock(), createElementBlock("div", {
          key: path.join('-'),
          class: normalizeClass(
            `tab-pane` +
            (path.join('-') === unref(firstActiveParamFieldGroupPath)
              ? ' show active'
              : '')
          ),
          id: `params-pills-${path.join('-')}`,
          role: "tabpanel",
          "aria-labelledby": "params-pills-home-tab",
          tabindex: "0"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(params, ({ param, input }) => {
            return (openBlock(), createElementBlock("div", {
              key: param['stanza:key'],
              class: "col mb-2"
            }, [
              createVNode(script$4, {
                input: input,
                "path-prefix": path.join('-'),
                name: param['stanza:key'],
                type: param['stanza:type'],
                choices: param['stanza:choice'],
                required: param['stanza:required'],
                "help-text": param['stanza:description'],
                label: param['stanza:label']
              }, null, 8 /* PROPS */, ["input", "path-prefix", "name", "type", "choices", "required", "help-text", "label"])
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 10 /* CLASS, PROPS */, _hoisted_5$3))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}
}

};

script$3.__file = "node_modules/togostanza/src/components/HelpParametersPane.vue";

const _hoisted_1$2 = {
  key: 0,
  class: "fst-italic"
};
const _hoisted_2$2 = {
  key: 1,
  class: "d-flex align-items-start"
};
const _hoisted_3$2 = {
  class: "nav flex-column nav-pills me-3",
  id: "styles-pills-tab",
  role: "tablist",
  "aria-orientation": "vertical"
};
const _hoisted_4$2 = ["data-bs-target"];
const _hoisted_5$2 = {
  class: "tab-content flex-grow-1",
  id: "styles-pills-tabContent"
};
const _hoisted_6$2 = ["id"];


var script$2 = {
  __name: 'HelpStylesPane',
  props: {
  styleFieldGroups: {
    type: Array,
    required: true,
  },
},
  setup(__props) {

const { styleFieldGroups } = __props;


const first = styleFieldGroups.find(
  ([_, styleField]) => styleField && styleField.length > 0
);
const firstActiveStyleFieldGroupPath = first ? first[0].join('-') : null;

return (_ctx, _cache) => {
  return (__props.styleFieldGroups.length === 0)
    ? (openBlock(), createElementBlock("p", _hoisted_1$2, " No styles defined. "))
    : (openBlock(), createElementBlock("div", _hoisted_2$2, [
        createBaseVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.styleFieldGroups, ([path, styles]) => {
            return (openBlock(), createElementBlock("button", {
              key: path.join('-'),
              class: normalizeClass(
            `nav-link text-start` +
            (path.join('-') === unref(firstActiveStyleFieldGroupPath)
              ? ' active'
              : '') +
            (styles ? '' : ' disabled')
          ),
              "data-bs-toggle": "pill",
              "data-bs-target": `#styles-pills-${path.join('-')}`,
              type: "button",
              role: "tab",
              style: normalizeStyle({ 'padding-left': `${path.length * 2}rem` })
            }, toDisplayString(path[path.length - 1]), 15 /* TEXT, CLASS, STYLE, PROPS */, _hoisted_4$2))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        createBaseVNode("div", _hoisted_5$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.styleFieldGroups, ([path, styles]) => {
            return (openBlock(), createElementBlock("div", {
              key: path.join('-'),
              class: normalizeClass(
            `tab-pane` +
            (path.join('-') === unref(firstActiveStyleFieldGroupPath)
              ? ' show active'
              : '')
          ),
              id: `styles-pills-${path.join('-')}`,
              role: "tabpanel",
              tabindex: "0"
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(styles, ({ style, input }) => {
                return (openBlock(), createElementBlock("div", {
                  key: style['stanza:key'],
                  class: "col mb-2"
                }, [
                  createVNode(script$4, {
                    input: input,
                    "path-prefix": '--togostanza-' + path.join('-'),
                    name: style['stanza:key'],
                    type: style['stanza:type'],
                    choices: style['stanza:choice'],
                    required: style['stanza:required'],
                    "help-text": style['stanza:description'],
                    label: style['stanza:label']
                  }, null, 8 /* PROPS */, ["input", "path-prefix", "name", "type", "choices", "required", "help-text", "label"])
                ]))
              }), 128 /* KEYED_FRAGMENT */))
            ], 10 /* CLASS, PROPS */, _hoisted_6$2))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]))
}
}

};

script$2.__file = "node_modules/togostanza/src/components/HelpStylesPane.vue";

const _hoisted_1$1 = /*#__PURE__*/createBaseVNode("h2", { class: "my-3" }, "Outgoing Events", -1 /* HOISTED */);
const _hoisted_2$1 = { class: "row row-cols-2" };
const _hoisted_3$1 = { class: "text-muted" };
const _hoisted_4$1 = {
  key: 0,
  class: "fst-italic"
};
const _hoisted_5$1 = /*#__PURE__*/createBaseVNode("h2", { class: "my-3" }, "Incoming Events", -1 /* HOISTED */);
const _hoisted_6$1 = { class: "row row-cols-2" };
const _hoisted_7$1 = { class: "text-muted" };
const _hoisted_8$1 = {
  key: 1,
  class: "fst-italic"
};


var script$1 = {
  __name: 'HelpEventsPane',
  props: {
  metadata: {
    type: Object,
    required: true,
  },
},
  setup(__props) {

const { metadata } = __props;



const outgoingEvents = (metadata['stanza:outgoingEvent'] || []).map((event) => {
  return {
    name: event['stanza:key'],
    description: event['stanza:description'],
  };
});

const incomingEvents = (metadata['stanza:incomingEvent'] || []).map((event) => {
  return {
    name: event['stanza:key'],
    description: event['stanza:description'],
  };
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$1,
    createBaseVNode("div", _hoisted_2$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(outgoingEvents), ({ name, description }) => {
        return (openBlock(), createElementBlock("div", {
          key: name,
          class: "col"
        }, [
          createBaseVNode("div", null, toDisplayString(name), 1 /* TEXT */),
          createBaseVNode("div", _hoisted_3$1, toDisplayString(description), 1 /* TEXT */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    (unref(outgoingEvents).length === 0)
      ? (openBlock(), createElementBlock("p", _hoisted_4$1, " No events defined. "))
      : createCommentVNode("v-if", true),
    _hoisted_5$1,
    createBaseVNode("div", _hoisted_6$1, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(incomingEvents), ({ name, description }) => {
        return (openBlock(), createElementBlock("div", {
          key: name,
          class: "col"
        }, [
          createBaseVNode("div", null, toDisplayString(name), 1 /* TEXT */),
          createBaseVNode("div", _hoisted_7$1, toDisplayString(description), 1 /* TEXT */)
        ]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    (unref(incomingEvents).length === 0)
      ? (openBlock(), createElementBlock("p", _hoisted_8$1, " No events defined. "))
      : createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1.__file = "node_modules/togostanza/src/components/HelpEventsPane.vue";

function buildParameterTree(paramFields) {
  const tree = new Map();

  for (const paramField of paramFields) {
    const tmp = paramField.key.split('-', 3);
    const k = tmp.slice(0, Math.max(tmp.length - 1, 1));

    const a = tree.get(k[0]) || new Map();
    tree.set(k[0], a);

    if (k[1]) {
      const b = a.get(k[1]) || new Map();
      a.set(k[1], b);
    }
  }

  return tree;
}

function commonPrefixLength(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) {
    i++;
  }
  return i;
}

function buildParamFieldGroups(paramFields) {
  // Build a hierarchy of parameters
  const tree = buildParameterTree(paramFields);

  // Given a hierarchy `tree` to be displayed, compute at which level each parameter should appear.
  const placements = new Map();
  for (const paramField of paramFields) {
    const key = paramField.key;
    const k = key.split('-', 3);
    let max = -1;
    let argmaxPath = null;

    const paths = [];
    for (const [a, ta] of tree.entries()) {
      paths.push([a]);
      for (const b of ta.keys()) {
        paths.push([a, b]);
      }
    }

    for (const path of paths) {
      const l = commonPrefixLength(k, path);
      if (l > max) {
        max = l;
        argmaxPath = path;
      }
    }

    const placementKey = argmaxPath.join('-');
    const placement = placements.get(placementKey);
    if (placement) {
      placement.push(paramField);
    } else {
      placements.set(placementKey, [paramField]);
    }
  }

  // Compose a list containing a hierarchy with no parameters
  // (Note that placements only contains hierarchies with parameters)
  const results = [];
  for (const [a, ta] of tree.entries()) {
    results.push([[a], placements.get(a)]);
    for (const b of ta.keys()) {
      const key = [a, b].join('-');
      results.push([[a, b], placements.get(key)]);
    }
  }

  return results;
}

var script = defineComponent({
  components: {
    Layout: script$8,
    StanzaPreviewer: script$6,
    HelpAboutPane: script$5,
    HelpParametersPane: script$3,
    HelpStylesPane: script$2,
    HelpEventsPane: script$1,
  },

  props: ['metadata', 'readme'],

  setup({ metadata, readme }) {
    const stanzaParameter = metadata['stanza:parameter'] || [];
    const paramFields = stanzaParameter.map((param) => {
      return {
        key: param['stanza:key'],
        param,
        input: useInput(param['stanza:example'], param['stanza:type'], false),
      };
    });
    const menuPlacement = useInput(
      metadata['stanza:menu-placement'] || 'bottom-right',
      'string'
    );
    paramFields.push({
      key: 'togostanza-menu_placement',
      param: {
        'stanza:key': 'togostanza-menu_placement',
        'stanza:type': 'single-choice',
        'stanza:choice': [
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
          'none',
        ],
        'stanza:description':
          'Placement of the information icon which links to this page.',
      },
      input: menuPlacement,
    });

    const paramFieldGroups = buildParamFieldGroups(paramFields);

    const params = computed(() => {
      return [
        ...paramFields.map(({ param, input }) => {
          return {
            name: param['stanza:key'],
            type: param['stanza:type'],
            input,
          };
        }),
      ]
        .filter(({ input }) => !input.isDefault.value)
        .map(({ name, input, type }) => {
          return {
            name,
            type,
            value: input.valueStr.value,
          };
        });
    });

    const styleFields = (metadata['stanza:style'] || []).map((style) => {
      return {
        key: style['stanza:key'].replace(/^--togostanza-/, ''),
        style,
        input: useInput(style['stanza:default'], style['stanza:type']),
      };
    });
    const styleFieldGroups = buildParamFieldGroups(styleFields);

    const styleVars = computed(() => {
      return styleFields
        .filter(({ input }) => !input.isDefault.value)
        .map(({ style, input }) => {
          return {
            name: style['stanza:key'],
            value: input.valueStr.value,
          };
        });
    });

    return {
      metadata,
      readme,
      paramFieldGroups,
      menuPlacement,
      params,
      styleFieldGroups,
      styleVars,
    };
  },
});

function useInput(initValue, type, hasDefault = true) {
  const initValueStr = stringify(initValue, type);
  const valueStr = ref(initValueStr);
  const valueParsed = computed(() => parse(valueStr.value, type));
  const isDefault = computed(
    () => hasDefault && valueStr.value === initValueStr
  );

  function setValueStr(newValStr) {
    valueStr.value = newValStr;
  }

  function resetToDefault() {
    if (!hasDefault) {
      return;
    }

    this.setValueStr(initValueStr);
  }

  return {
    valueStr,
    valueParsed,
    setValueStr,
    hasDefault,
    isDefault,
    resetToDefault,
  };
}

function stringify(value, type) {
  if (value === null || value === undefined) {
    return null;
  }

  switch (type) {
    case 'boolean':
    case 'number':
    case 'json':
      return JSON.stringify(value);
    default:
      // value is a string (event if type is not a string. e.g. date)
      return value;
  }
}

function parse(valueStr, type) {
  if (valueStr === null || valueStr === undefined) {
    return null;
  }

  switch (type) {
    case 'boolean':
    case 'number':
    case 'json':
      return JSON.parse(valueStr);
    case 'date':
    case 'datetime':
      return new Date(valueStr);
    default:
      return valueStr;
  }
}

const _hoisted_1 = { class: "display-4" };
const _hoisted_2 = { class: "lead" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "col-lg-6" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("nav", {
  class: "nav nav-tabs",
  role: "tablist"
}, [
  /*#__PURE__*/createBaseVNode("a", {
    class: "nav-link active",
    href: "#tabpane-parameters",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "Parameters"),
  /*#__PURE__*/createBaseVNode("a", {
    class: "nav-link",
    href: "#tabpane-styles",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "Styles"),
  /*#__PURE__*/createBaseVNode("a", {
    class: "nav-link",
    href: "#tabpane-events",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "Events"),
  /*#__PURE__*/createBaseVNode("a", {
    class: "nav-link",
    href: "#tabpane-about",
    "data-bs-toggle": "tab",
    role: "tab"
  }, "About")
], -1 /* HOISTED */);
const _hoisted_6 = { class: "tab-content mt-3" };
const _hoisted_7 = {
  class: "tab-pane px-lg-5",
  id: "tabpane-about",
  role: "tabpanel"
};
const _hoisted_8 = {
  class: "tab-pane active",
  id: "tabpane-parameters",
  role: "tabpanel"
};
const _hoisted_9 = {
  class: "tab-pane",
  id: "tabpane-styles",
  role: "tabpanel"
};
const _hoisted_10 = {
  class: "tab-pane",
  id: "tabpane-events",
  role: "tabpanel"
};
const _hoisted_11 = { class: "col-lg-6" };
const _hoisted_12 = /*#__PURE__*/createBaseVNode("hr", { class: "d-lg-none mb-4" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_HelpAboutPane = resolveComponent("HelpAboutPane");
  const _component_HelpParametersPane = resolveComponent("HelpParametersPane");
  const _component_HelpStylesPane = resolveComponent("HelpStylesPane");
  const _component_HelpEventsPane = resolveComponent("HelpEventsPane");
  const _component_StanzaPreviewer = resolveComponent("StanzaPreviewer");
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, { containerClass: "container-fluid" }, {
    default: withCtx(() => [
      createBaseVNode("h1", _hoisted_1, toDisplayString(_ctx.metadata['stanza:label']), 1 /* TEXT */),
      createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.metadata['stanza:definition']), 1 /* TEXT */),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _hoisted_5,
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_HelpAboutPane, {
                metadata: _ctx.metadata,
                readme: _ctx.readme
              }, null, 8 /* PROPS */, ["metadata", "readme"])
            ]),
            createBaseVNode("div", _hoisted_8, [
              createVNode(_component_HelpParametersPane, { paramFieldGroups: _ctx.paramFieldGroups }, null, 8 /* PROPS */, ["paramFieldGroups"])
            ]),
            createBaseVNode("div", _hoisted_9, [
              createVNode(_component_HelpStylesPane, { styleFieldGroups: _ctx.styleFieldGroups }, null, 8 /* PROPS */, ["styleFieldGroups"])
            ]),
            createBaseVNode("div", _hoisted_10, [
              createVNode(_component_HelpEventsPane, { metadata: _ctx.metadata }, null, 8 /* PROPS */, ["metadata"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_11, [
          _hoisted_12,
          createVNode(_component_StanzaPreviewer, {
            metadata: _ctx.metadata,
            params: _ctx.params,
            styleVars: _ctx.styleVars
          }, null, 8 /* PROPS */, ["metadata", "params", "styleVars"])
        ])
      ])
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/Help.vue";

function helpApp({metadata, readme}) {
  return createApp(script, {metadata, readme})
}

export { helpApp as default };
//# sourceMappingURL=help-app.js.map
