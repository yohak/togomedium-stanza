import { y as jsxRuntimeExports, B as alpha_1, _ as _objectWithoutPropertiesLoose, A as capitalize, w as THEME_ID, U as formatMuiErrorMessage, V as deepmerge, D as useRtl } from './StanzaReactProvider-36ae7cf4.js';
import { _ as _extends, r as reactExports } from './getData-1a784a8c.js';
import { G as GlobalStyles$2, g as generateUtilityClass, b as generateUtilityClasses, f as styled, h as useDefaultProps, m as clsx, e as composeClasses, j as useControlled, k as useEventCallback, s as setRef, u as useForkRef, a as useEnhancedEffect, d as defaultTheme, q as isHostComponent, o as ownerDocument, t as extractEventHandlers, c as useSlotProps, p as rootShouldForwardProp, v as slotShouldForwardProp } from './DefaultPropsProvider-4e645303.js';
import { c as createSvgIcon, o as ownerWindow, d as debounce, a as createChainedFunction, i as isMuiElement } from './consts-55c53200.js';
import { B as ButtonBase, e as usePreviousProps, f as useFormControl, F as FormControlContext } from './MediaPane-de4888ee.js';
import { c as useTheme, d as useId, P as Popper, u as useTheme$1, e as Transition, r as reflow, g as getTransitionProps, f as Portal, G as Grow } from './paths-0bbd78cc.js';

function GlobalStyles$1({
  styles,
  themeId,
  defaultTheme = {}
}) {
  const upperTheme = useTheme(defaultTheme);
  const globalStyles = typeof styles === 'function' ? styles(themeId ? upperTheme[themeId] || upperTheme : upperTheme) : styles;
  return /*#__PURE__*/jsxRuntimeExports.jsx(GlobalStyles$2, {
    styles: globalStyles
  });
}

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
function getScrollbarSize(doc) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
const getOverlayAlpha = elevation => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};
var getOverlayAlpha$1 = getOverlayAlpha;

function getPaperUtilityClass(slot) {
  return generateUtilityClass('MuiPaper', slot);
}
generateUtilityClasses('MuiPaper', ['root', 'rounded', 'outlined', 'elevation', 'elevation0', 'elevation1', 'elevation2', 'elevation3', 'elevation4', 'elevation5', 'elevation6', 'elevation7', 'elevation8', 'elevation9', 'elevation10', 'elevation11', 'elevation12', 'elevation13', 'elevation14', 'elevation15', 'elevation16', 'elevation17', 'elevation18', 'elevation19', 'elevation20', 'elevation21', 'elevation22', 'elevation23', 'elevation24']);

const _excluded$p = ["className", "component", "elevation", "square", "variant"];
const useUtilityClasses$l = ownerState => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
const PaperRoot = styled('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], !ownerState.square && styles.rounded, ownerState.variant === 'elevation' && styles[`elevation${ownerState.elevation}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$vars$overlays;
  return _extends({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.primary,
    transition: theme.transitions.create('box-shadow')
  }, !ownerState.square && {
    borderRadius: theme.shape.borderRadius
  }, ownerState.variant === 'outlined' && {
    border: `1px solid ${(theme.vars || theme).palette.divider}`
  }, ownerState.variant === 'elevation' && _extends({
    boxShadow: (theme.vars || theme).shadows[ownerState.elevation]
  }, !theme.vars && theme.palette.mode === 'dark' && {
    backgroundImage: `linear-gradient(${alpha_1('#fff', getOverlayAlpha$1(ownerState.elevation))}, ${alpha_1('#fff', getOverlayAlpha$1(ownerState.elevation))})`
  }, theme.vars && {
    backgroundImage: (_theme$vars$overlays = theme.vars.overlays) == null ? void 0 : _theme$vars$overlays[ownerState.elevation]
  }));
});
const Paper = /*#__PURE__*/reactExports.forwardRef(function Paper(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiPaper'
  });
  const {
      className,
      component = 'div',
      elevation = 1,
      square = false,
      variant = 'elevation'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$p);
  const ownerState = _extends({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses$l(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(PaperRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
var Paper$1 = Paper;

function getIconButtonUtilityClass(slot) {
  return generateUtilityClass('MuiIconButton', slot);
}
const iconButtonClasses = generateUtilityClasses('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'colorError', 'colorInfo', 'colorSuccess', 'colorWarning', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
var iconButtonClasses$1 = iconButtonClasses;

const _excluded$o = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"];
const useUtilityClasses$k = ownerState => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', color !== 'default' && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`]
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};
const IconButtonRoot = styled(ButtonBase, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`], styles[`size${capitalize(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  textAlign: 'center',
  flex: '0 0 auto',
  fontSize: theme.typography.pxToRem(24),
  padding: 8,
  borderRadius: '50%',
  overflow: 'visible',
  // Explicitly set the default value to solve a bug on IE11.
  color: (theme.vars || theme).palette.action.active,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  })
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha_1(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.edge === 'start' && {
  marginLeft: ownerState.size === 'small' ? -3 : -12
}, ownerState.edge === 'end' && {
  marginRight: ownerState.size === 'small' ? -3 : -12
}), ({
  theme,
  ownerState
}) => {
  var _palette;
  const palette = (_palette = (theme.vars || theme).palette) == null ? void 0 : _palette[ownerState.color];
  return _extends({}, ownerState.color === 'inherit' && {
    color: 'inherit'
  }, ownerState.color !== 'inherit' && ownerState.color !== 'default' && _extends({
    color: palette == null ? void 0 : palette.main
  }, !ownerState.disableRipple && {
    '&:hover': _extends({}, palette && {
      backgroundColor: theme.vars ? `rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha_1(palette.main, theme.palette.action.hoverOpacity)
    }, {
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    })
  }), ownerState.size === 'small' && {
    padding: 5,
    fontSize: theme.typography.pxToRem(18)
  }, ownerState.size === 'large' && {
    padding: 12,
    fontSize: theme.typography.pxToRem(28)
  }, {
    [`&.${iconButtonClasses$1.disabled}`]: {
      backgroundColor: 'transparent',
      color: (theme.vars || theme).palette.action.disabled
    }
  });
});

/**
 * Refer to the [Icons](/material-ui/icons/) section of the documentation
 * regarding the available icon options.
 */
const IconButton = /*#__PURE__*/reactExports.forwardRef(function IconButton(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiIconButton'
  });
  const {
      edge = false,
      children,
      className,
      color = 'default',
      disabled = false,
      disableFocusRipple = false,
      size = 'medium'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$o);
  const ownerState = _extends({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });
  const classes = useUtilityClasses$k(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(IconButtonRoot, _extends({
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    ref: ref
  }, other, {
    ownerState: ownerState,
    children: children
  }));
});
var IconButton$1 = IconButton;

var ClearIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close');

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
// Give up on IE11 support for this feature
function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined' ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : string;
}
function createFilterOptions(config = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = 'any',
    stringify,
    trim = false
  } = config;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = !input ? options : options.filter(option => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === 'start' ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === 'number' ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}

// To replace with .findIndex() once we stop IE11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }
  return -1;
}
const defaultFilterOptions = createFilterOptions();

// Number of options to jump in list box when `Page Up` and `Page Down` keys are used.
const pageSize = 5;
const defaultIsActiveElementInListbox = listboxRef => {
  var _listboxRef$current$p;
  return listboxRef.current !== null && ((_listboxRef$current$p = listboxRef.current.parentElement) == null ? void 0 : _listboxRef$current$p.contains(document.activeElement));
};
function useAutocomplete(props) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_isActiveElementInListbox = defaultIsActiveElementInListbox,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_classNamePrefix = 'Mui',
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = 'useAutocomplete',
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled: disabledProp,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionKey,
    getOptionLabel: getOptionLabelProp = option => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value) => option === value,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = option => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== 'string') {
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = reactExports.useRef(false);
  const firstFocus = reactExports.useRef(true);
  const inputRef = reactExports.useRef(null);
  const listboxRef = reactExports.useRef(null);
  const [anchorEl, setAnchorEl] = reactExports.useState(null);
  const [focusedTag, setFocusedTag] = reactExports.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = reactExports.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: '',
    name: componentName,
    state: 'inputValue'
  });
  const [focused, setFocused] = reactExports.useState(false);
  const resetInputValue = reactExports.useCallback((event, newValue) => {
    // retain current `inputValue` if new option isn't selected and `clearOnBlur` is false
    // When `multiple` is enabled, `newValue` is an array of all selected items including the newly selected item
    const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
    if (!isOptionSelected && !clearOnBlur) {
      return;
    }
    let newInputValue;
    if (multiple) {
      newInputValue = '';
    } else if (newValue == null) {
      newInputValue = '';
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, 'reset');
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open'
  });
  const [inputPristine, setInputPristine] = reactExports.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open && !readOnly;
  const filteredOptions = popupOpen ? filterOptions(options.filter(option => {
    if (filterSelectedOptions && (multiple ? value : [value]).some(value2 => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }
    return true;
  }),
  // we use the empty string to manipulate `filterOptions` to not filter any options
  // i.e. the filter predicate always returns true
  {
    inputValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
    getOptionLabel
  }) : [];
  const previousProps = usePreviousProps({
    filteredOptions,
    value,
    inputValue
  });
  reactExports.useEffect(() => {
    const valueChange = value !== previousProps.value;
    if (focused && !valueChange) {
      return;
    }

    // Only reset the input's value when freeSolo if the component's value changes.
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, previousProps.value, freeSolo]);
  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;
  const focusTag = useEventCallback(tagToFocus => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });

  // Ensure the focusedTag is never inconsistent
  reactExports.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index < 0 || index >= filteredOptions.length) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute('aria-disabled') === 'true';
      if (option && option.hasAttribute('tabindex') && !nextFocusDisabled) {
        // The next option is available
        return nextFocus;
      }

      // The next option is disabled, move to the next element.
      // with looped index
      if (direction === 'next') {
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus = (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }

      // We end up with initial index, that means we don't have available options.
      // All of them are disabled
      if (nextFocus === index) {
        return -1;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = 'auto'
  }) => {
    highlightedIndexRef.current = index;

    // does the index exist?
    if (index === -1) {
      inputRef.current.removeAttribute('aria-activedescendant');
    } else {
      inputRef.current.setAttribute('aria-activedescendant', `${id}-option-${index}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector(`[role="option"].${unstable_classNamePrefix}-focused`);
    if (prev) {
      prev.classList.remove(`${unstable_classNamePrefix}-focused`);
      prev.classList.remove(`${unstable_classNamePrefix}-focusVisible`);
    }
    let listboxNode = listboxRef.current;
    if (listboxRef.current.getAttribute('role') !== 'listbox') {
      listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    }

    // "No results"
    if (!listboxNode) {
      return;
    }
    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);
    if (!option) {
      return;
    }
    option.classList.add(`${unstable_classNamePrefix}-focused`);
    if (reason === 'keyboard') {
      option.classList.add(`${unstable_classNamePrefix}-focusVisible`);
    }

    // Scroll active descendant into view.
    // Logic copied from https://www.w3.org/WAI/content-assets/wai-aria-practices/patterns/combobox/examples/js/select-only.js
    // In case of mouse clicks and touch (in mobile devices) we avoid scrolling the element and keep both behaviors same.
    // Consider this API instead once it has a better browser support:
    // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== 'mouse' && reason !== 'touch') {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = 'next',
    reason = 'auto'
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === 'reset') {
        return defaultHighlighted;
      }
      if (diff === 'start') {
        return 0;
      }
      if (diff === 'end') {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });

    // Sync the content of the input with the highlighted option.
    if (autoComplete && diff !== 'reset') {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;

        // The portion of the selected suggestion that has not been typed by the user,
        // a completion string, appears inline after the input cursor in the textbox.
        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const getPreviousHighlightedOptionIndex = () => {
    const isSameValue = (value1, value2) => {
      const label1 = value1 ? getOptionLabel(value1) : '';
      const label2 = value2 ? getOptionLabel(value2) : '';
      return label1 === label2;
    };
    if (highlightedIndexRef.current !== -1 && previousProps.filteredOptions && previousProps.filteredOptions.length !== filteredOptions.length && previousProps.inputValue === inputValue && (multiple ? value.length === previousProps.value.length && previousProps.value.every((val, i) => getOptionLabel(value[i]) === getOptionLabel(val)) : isSameValue(previousProps.value, value))) {
      const previousHighlightedOption = previousProps.filteredOptions[highlightedIndexRef.current];
      if (previousHighlightedOption) {
        return findIndex(filteredOptions, option => {
          return getOptionLabel(option) === getOptionLabel(previousHighlightedOption);
        });
      }
    }
    return -1;
  };
  const syncHighlightedIndex = reactExports.useCallback(() => {
    if (!popupOpen) {
      return;
    }

    // Check if the previously highlighted option still exists in the updated filtered options list and if the value and inputValue haven't changed
    // If it exists and the value and the inputValue haven't changed, just update its index, otherwise continue execution
    const previousHighlightedOptionIndex = getPreviousHighlightedOptionIndex();
    if (previousHighlightedOptionIndex !== -1) {
      highlightedIndexRef.current = previousHighlightedOptionIndex;
      return;
    }
    const valueItem = multiple ? value[0] : value;

    // The popup is empty, reset
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: 'reset'
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }

    // Synchronize the value with the highlighted index
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];

      // Keep the current highlighted index if possible
      if (multiple && currentOption && findIndex(value, val => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, optionItem => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: 'reset'
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }

    // Prevent the highlighted index to leak outside the boundaries.
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }

    // Restore the focus to the previous index.
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
    // Ignore filteredOptions (and options, isOptionEqualToValue, getOptionLabel) not to break the scroll position
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
  // Only sync the highlighted index when the option switch between empty and not
  filteredOptions.length,
  // Don't sync the highlighted index with the value when multiple
  // eslint-disable-next-line react-hooks/exhaustive-deps
  multiple ? false : value, filterSelectedOptions, changeHighlightedIndex, setHighlightedIndex, popupOpen, inputValue, multiple]);
  const handleListboxRef = useEventCallback(node => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  reactExports.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = event => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = reactExports.useRef(false);
  const selectNewValue = (event, option, reasonProp = 'selectOption', origin = 'options') => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = findIndex(newValue, valueItem => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== 'freeSolo') {
        newValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && (!event || !event.ctrlKey && !event.metaKey)) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === 'touch' && isTouch.current || blurOnSelect === 'mouse' && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      // Out of range
      if (direction === 'next' && nextFocus === value.length || direction === 'previous' && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);

      // Same logic as MenuList.js
      if (!option || !option.hasAttribute('tabindex') || option.disabled || option.getAttribute('aria-disabled') === 'true') {
        nextFocus += direction === 'next' ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    if (inputValue === '') {
      handleClose(event, 'toggleInput');
    }
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === '' && direction === 'previous') {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === 'next' ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = event => {
    ignoreFocus.current = true;
    setInputValueState('');
    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }
    handleValue(event, multiple ? [] : null, 'clear');
  };
  const handleKeyDown = other => event => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }

    // Wait until IME is settled.
    if (event.which !== 229) {
      switch (event.key) {
        case 'Home':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'start',
              direction: 'next',
              reason: 'keyboard',
              event
            });
          }
          break;
        case 'End':
          if (popupOpen && handleHomeEndKeys) {
            // Prevent scroll of the page
            event.preventDefault();
            changeHighlightedIndex({
              diff: 'end',
              direction: 'previous',
              reason: 'keyboard',
              event
            });
          }
          break;
        case 'PageUp':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: 'previous',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;
        case 'PageDown':
          // Prevent scroll of the page
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: 'next',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;
        case 'ArrowDown':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: 'next',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;
        case 'ArrowUp':
          // Prevent cursor move
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: 'previous',
            reason: 'keyboard',
            event
          });
          handleOpen(event);
          break;
        case 'ArrowLeft':
          handleFocusTag(event, 'previous');
          break;
        case 'ArrowRight':
          handleFocusTag(event, 'next');
          break;
        case 'Enter':
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

            // Avoid early form validation, let the end-users continue filling the form.
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, 'selectOption');

            // Move the selection to the end.
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== '' && inputValueIsSelectedValue === false) {
            if (multiple) {
              // Allow people to add new values before they submit the form.
              event.preventDefault();
            }
            selectNewValue(event, inputValue, 'createOption', 'freeSolo');
          }
          break;
        case 'Escape':
          if (popupOpen) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClose(event, 'escape');
          } else if (clearOnEscape && (inputValue !== '' || multiple && value.length > 0)) {
            // Avoid Opera to exit fullscreen mode.
            event.preventDefault();
            // Avoid the Modal to handle the event.
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case 'Backspace':
          // Remove the value on the left of the "cursor"
          if (multiple && !readOnly && inputValue === '' && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', {
              option: value[index]
            });
          }
          break;
        case 'Delete':
          // Remove the value on the right of the "cursor"
          if (multiple && !readOnly && inputValue === '' && value.length > 0 && focusedTag !== -1) {
            const index = focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, 'removeOption', {
              option: value[index]
            });
          }
          break;
      }
    }
  };
  const handleFocus = event => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur = event => {
    // Ignore the event when using the scrollbar with IE11
    if (unstable_isActiveElementInListbox(listboxRef)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, 'blur');
  };
  const handleInputChange = event => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }
    if (newValue === '') {
      if (!disableClearable && !multiple) {
        handleValue(event, null, 'clear');
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseMove = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex({
        event,
        index,
        reason: 'mouse'
      });
    }
  };
  const handleOptionTouchStart = event => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute('data-option-index')),
      reason: 'touch'
    });
    isTouch.current = true;
  };
  const handleOptionClick = event => {
    const index = Number(event.currentTarget.getAttribute('data-option-index'));
    selectNewValue(event, filteredOptions[index], 'selectOption');
    isTouch.current = false;
  };
  const handleTagDelete = index => event => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', {
      option: value[index]
    });
  };
  const handlePopupIndicator = event => {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
    }
  };

  // Prevent input blur when interacting with the combobox
  const handleMouseDown = event => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = event => {
    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!event.currentTarget.contains(event.target)) {
      return;
    }
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = event => {
    if (!disabledProp && (inputValue === '' || !open)) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur();
  }
  return {
    getRootProps: (other = {}) => _extends({
      'aria-owns': listboxAvailable ? `${id}-listbox` : null
    }, other, {
      onKeyDown: handleKeyDown(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id}-label`,
      htmlFor: id
    }),
    getInputProps: () => ({
      id,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      // if open then this is handled imperatively so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': listboxAvailable ? `${id}-listbox` : undefined,
      'aria-expanded': listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
      role: 'combobox',
      disabled: disabledProp
    }),
    getClearProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      type: 'button',
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => _extends({
      key: index,
      'data-tag-index': index,
      tabIndex: -1
    }, !readOnly && {
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: 'listbox',
      id: `${id}-listbox`,
      'aria-labelledby': `${id}-label`,
      ref: handleListboxRef,
      onMouseDown: event => {
        // Prevent blur
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      var _getOptionKey;
      const selected = (multiple ? value : [value]).some(value2 => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: (_getOptionKey = getOptionKey == null ? void 0 : getOptionKey(option)) != null ? _getOptionKey : getOptionLabel(option),
        tabIndex: -1,
        role: 'option',
        id: `${id}-option-${index}`,
        onMouseMove: handleOptionMouseMove,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        'data-option-index': index,
        'aria-disabled': disabled,
        'aria-selected': selected
      };
    },
    id,
    inputValue,
    value,
    dirty,
    expanded: popupOpen && anchorEl,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}

function getListSubheaderUtilityClass(slot) {
  return generateUtilityClass('MuiListSubheader', slot);
}
generateUtilityClasses('MuiListSubheader', ['root', 'colorPrimary', 'colorInherit', 'gutters', 'inset', 'sticky']);

const _excluded$n = ["className", "color", "component", "disableGutters", "disableSticky", "inset"];
const useUtilityClasses$j = ownerState => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = ownerState;
  const slots = {
    root: ['root', color !== 'default' && `color${capitalize(color)}`, !disableGutters && 'gutters', inset && 'inset', !disableSticky && 'sticky']
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};
const ListSubheaderRoot = styled('li', {
  name: 'MuiListSubheader',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], !ownerState.disableGutters && styles.gutters, ownerState.inset && styles.inset, !ownerState.disableSticky && styles.sticky];
  }
})(({
  theme,
  ownerState
}) => _extends({
  boxSizing: 'border-box',
  lineHeight: '48px',
  listStyle: 'none',
  color: (theme.vars || theme).palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14)
}, ownerState.color === 'primary' && {
  color: (theme.vars || theme).palette.primary.main
}, ownerState.color === 'inherit' && {
  color: 'inherit'
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.inset && {
  paddingLeft: 72
}, !ownerState.disableSticky && {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));
const ListSubheader = /*#__PURE__*/reactExports.forwardRef(function ListSubheader(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiListSubheader'
  });
  const {
      className,
      color = 'default',
      component = 'li',
      disableGutters = false,
      disableSticky = false,
      inset = false
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$n);
  const ownerState = _extends({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });
  const classes = useUtilityClasses$j(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(ListSubheaderRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other));
});
ListSubheader.muiSkipListHighlight = true;
var ListSubheader$1 = ListSubheader;

var CancelIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
}), 'Cancel');

function getChipUtilityClass(slot) {
  return generateUtilityClass('MuiChip', slot);
}
const chipClasses = generateUtilityClasses('MuiChip', ['root', 'sizeSmall', 'sizeMedium', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'disabled', 'clickable', 'clickableColorPrimary', 'clickableColorSecondary', 'deletable', 'deletableColorPrimary', 'deletableColorSecondary', 'outlined', 'filled', 'outlinedPrimary', 'outlinedSecondary', 'filledPrimary', 'filledSecondary', 'avatar', 'avatarSmall', 'avatarMedium', 'avatarColorPrimary', 'avatarColorSecondary', 'icon', 'iconSmall', 'iconMedium', 'iconColorPrimary', 'iconColorSecondary', 'label', 'labelSmall', 'labelMedium', 'deleteIcon', 'deleteIconSmall', 'deleteIconMedium', 'deleteIconColorPrimary', 'deleteIconColorSecondary', 'deleteIconOutlinedColorPrimary', 'deleteIconOutlinedColorSecondary', 'deleteIconFilledColorPrimary', 'deleteIconFilledColorSecondary', 'focusVisible']);
var chipClasses$1 = chipClasses;

const _excluded$m = ["avatar", "className", "clickable", "color", "component", "deleteIcon", "disabled", "icon", "label", "onClick", "onDelete", "onKeyDown", "onKeyUp", "size", "variant", "tabIndex", "skipFocusWhenDisabled"];
const useUtilityClasses$i = ownerState => {
  const {
    classes,
    disabled,
    size,
    color,
    iconColor,
    onDelete,
    clickable,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, disabled && 'disabled', `size${capitalize(size)}`, `color${capitalize(color)}`, clickable && 'clickable', clickable && `clickableColor${capitalize(color)}`, onDelete && 'deletable', onDelete && `deletableColor${capitalize(color)}`, `${variant}${capitalize(color)}`],
    label: ['label', `label${capitalize(size)}`],
    avatar: ['avatar', `avatar${capitalize(size)}`, `avatarColor${capitalize(color)}`],
    icon: ['icon', `icon${capitalize(size)}`, `iconColor${capitalize(iconColor)}`],
    deleteIcon: ['deleteIcon', `deleteIcon${capitalize(size)}`, `deleteIconColor${capitalize(color)}`, `deleteIcon${capitalize(variant)}Color${capitalize(color)}`]
  };
  return composeClasses(slots, getChipUtilityClass, classes);
};
const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      color,
      iconColor,
      clickable,
      onDelete,
      size,
      variant
    } = ownerState;
    return [{
      [`& .${chipClasses$1.avatar}`]: styles.avatar
    }, {
      [`& .${chipClasses$1.avatar}`]: styles[`avatar${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.avatar}`]: styles[`avatarColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles.icon
    }, {
      [`& .${chipClasses$1.icon}`]: styles[`icon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.icon}`]: styles[`iconColor${capitalize(iconColor)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles.deleteIcon
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`]
    }, {
      [`& .${chipClasses$1.deleteIcon}`]: styles[`deleteIcon${capitalize(variant)}Color${capitalize(color)}`]
    }, styles.root, styles[`size${capitalize(size)}`], styles[`color${capitalize(color)}`], clickable && styles.clickable, clickable && color !== 'default' && styles[`clickableColor${capitalize(color)})`], onDelete && styles.deletable, onDelete && color !== 'default' && styles[`deletableColor${capitalize(color)}`], styles[variant], styles[`${variant}${capitalize(color)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  const textColor = theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return _extends({
    maxWidth: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    // reset cursor explicitly in case ButtonBase is used
    cursor: 'unset',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    textDecoration: 'none',
    border: 0,
    // Remove `button` border
    padding: 0,
    // Remove `button` padding
    verticalAlign: 'middle',
    boxSizing: 'border-box',
    [`&.${chipClasses$1.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`& .${chipClasses$1.avatar}`]: {
      marginLeft: 5,
      marginRight: -6,
      width: 24,
      height: 24,
      color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
      fontSize: theme.typography.pxToRem(12)
    },
    [`& .${chipClasses$1.avatarColorPrimary}`]: {
      color: (theme.vars || theme).palette.primary.contrastText,
      backgroundColor: (theme.vars || theme).palette.primary.dark
    },
    [`& .${chipClasses$1.avatarColorSecondary}`]: {
      color: (theme.vars || theme).palette.secondary.contrastText,
      backgroundColor: (theme.vars || theme).palette.secondary.dark
    },
    [`& .${chipClasses$1.avatarSmall}`]: {
      marginLeft: 4,
      marginRight: -4,
      width: 18,
      height: 18,
      fontSize: theme.typography.pxToRem(10)
    },
    [`& .${chipClasses$1.icon}`]: _extends({
      marginLeft: 5,
      marginRight: -6
    }, ownerState.size === 'small' && {
      fontSize: 18,
      marginLeft: 4,
      marginRight: -4
    }, ownerState.iconColor === ownerState.color && _extends({
      color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor
    }, ownerState.color !== 'default' && {
      color: 'inherit'
    })),
    [`& .${chipClasses$1.deleteIcon}`]: _extends({
      WebkitTapHighlightColor: 'transparent',
      color: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.26)` : alpha_1(theme.palette.text.primary, 0.26),
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)` : alpha_1(theme.palette.text.primary, 0.4)
      }
    }, ownerState.size === 'small' && {
      fontSize: 16,
      marginRight: 4,
      marginLeft: -4
    }, ownerState.color !== 'default' && {
      color: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].contrastTextChannel} / 0.7)` : alpha_1(theme.palette[ownerState.color].contrastText, 0.7),
      '&:hover, &:active': {
        color: (theme.vars || theme).palette[ownerState.color].contrastText
      }
    })
  }, ownerState.size === 'small' && {
    height: 24
  }, ownerState.color !== 'default' && {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    color: (theme.vars || theme).palette[ownerState.color].contrastText
  }, ownerState.onDelete && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha_1(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  }, ownerState.onDelete && ownerState.color !== 'default' && {
    [`&.${chipClasses$1.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
    }
  });
}, ({
  theme,
  ownerState
}) => _extends({}, ownerState.clickable && {
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha_1(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha_1(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  },
  '&:active': {
    boxShadow: (theme.vars || theme).shadows[1]
  }
}, ownerState.clickable && ownerState.color !== 'default' && {
  [`&:hover, &.${chipClasses$1.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
  }
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.variant === 'outlined' && {
  backgroundColor: 'transparent',
  border: theme.vars ? `1px solid ${theme.vars.palette.Chip.defaultBorder}` : `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: (theme.vars || theme).palette.action.hover
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`& .${chipClasses$1.avatar}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.avatarSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.icon}`]: {
    marginLeft: 4
  },
  [`& .${chipClasses$1.iconSmall}`]: {
    marginLeft: 2
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    marginRight: 5
  },
  [`& .${chipClasses$1.deleteIconSmall}`]: {
    marginRight: 3
  }
}, ownerState.variant === 'outlined' && ownerState.color !== 'default' && {
  color: (theme.vars || theme).palette[ownerState.color].main,
  border: `1px solid ${theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)` : alpha_1(theme.palette[ownerState.color].main, 0.7)}`,
  [`&.${chipClasses$1.clickable}:hover`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha_1(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity)
  },
  [`&.${chipClasses$1.focusVisible}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.focusOpacity})` : alpha_1(theme.palette[ownerState.color].main, theme.palette.action.focusOpacity)
  },
  [`& .${chipClasses$1.deleteIcon}`]: {
    color: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)` : alpha_1(theme.palette[ownerState.color].main, 0.7),
    '&:hover, &:active': {
      color: (theme.vars || theme).palette[ownerState.color].main
    }
  }
}));
const ChipLabel = styled('span', {
  name: 'MuiChip',
  slot: 'Label',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      size
    } = ownerState;
    return [styles.label, styles[`label${capitalize(size)}`]];
  }
})(({
  ownerState
}) => _extends({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  paddingLeft: 12,
  paddingRight: 12,
  whiteSpace: 'nowrap'
}, ownerState.variant === 'outlined' && {
  paddingLeft: 11,
  paddingRight: 11
}, ownerState.size === 'small' && {
  paddingLeft: 8,
  paddingRight: 8
}, ownerState.size === 'small' && ownerState.variant === 'outlined' && {
  paddingLeft: 7,
  paddingRight: 7
}));
function isDeleteKeyboardEvent(keyboardEvent) {
  return keyboardEvent.key === 'Backspace' || keyboardEvent.key === 'Delete';
}

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
const Chip = /*#__PURE__*/reactExports.forwardRef(function Chip(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiChip'
  });
  const {
      avatar: avatarProp,
      className,
      clickable: clickableProp,
      color = 'default',
      component: ComponentProp,
      deleteIcon: deleteIconProp,
      disabled = false,
      icon: iconProp,
      label,
      onClick,
      onDelete,
      onKeyDown,
      onKeyUp,
      size = 'medium',
      variant = 'filled',
      tabIndex,
      skipFocusWhenDisabled = false // TODO v6: Rename to `focusableWhenDisabled`.
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$m);
  const chipRef = reactExports.useRef(null);
  const handleRef = useForkRef(chipRef, ref);
  const handleDeleteIconClick = event => {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };
  const handleKeyDown = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target && isDeleteKeyboardEvent(event)) {
      // Will be handled in keyUp, otherwise some browsers
      // might init navigation
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleKeyUp = event => {
    // Ignore events from children of `Chip`.
    if (event.currentTarget === event.target) {
      if (onDelete && isDeleteKeyboardEvent(event)) {
        onDelete(event);
      } else if (event.key === 'Escape' && chipRef.current) {
        chipRef.current.blur();
      }
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  };
  const clickable = clickableProp !== false && onClick ? true : clickableProp;
  const component = clickable || onDelete ? ButtonBase : ComponentProp || 'div';
  const ownerState = _extends({}, props, {
    component,
    disabled,
    size,
    color,
    iconColor: /*#__PURE__*/reactExports.isValidElement(iconProp) ? iconProp.props.color || color : color,
    onDelete: !!onDelete,
    clickable,
    variant
  });
  const classes = useUtilityClasses$i(ownerState);
  const moreProps = component === ButtonBase ? _extends({
    component: ComponentProp || 'div',
    focusVisibleClassName: classes.focusVisible
  }, onDelete && {
    disableRipple: true
  }) : {};
  let deleteIcon = null;
  if (onDelete) {
    deleteIcon = deleteIconProp && /*#__PURE__*/reactExports.isValidElement(deleteIconProp) ? ( /*#__PURE__*/reactExports.cloneElement(deleteIconProp, {
      className: clsx(deleteIconProp.props.className, classes.deleteIcon),
      onClick: handleDeleteIconClick
    })) : /*#__PURE__*/jsxRuntimeExports.jsx(CancelIcon, {
      className: clsx(classes.deleteIcon),
      onClick: handleDeleteIconClick
    });
  }
  let avatar = null;
  if (avatarProp && /*#__PURE__*/reactExports.isValidElement(avatarProp)) {
    avatar = /*#__PURE__*/reactExports.cloneElement(avatarProp, {
      className: clsx(classes.avatar, avatarProp.props.className)
    });
  }
  let icon = null;
  if (iconProp && /*#__PURE__*/reactExports.isValidElement(iconProp)) {
    icon = /*#__PURE__*/reactExports.cloneElement(iconProp, {
      className: clsx(classes.icon, iconProp.props.className)
    });
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(ChipRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    disabled: clickable && disabled ? true : undefined,
    onClick: onClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    ref: handleRef,
    tabIndex: skipFocusWhenDisabled && disabled ? -1 : tabIndex,
    ownerState: ownerState
  }, moreProps, other, {
    children: [avatar || icon, /*#__PURE__*/jsxRuntimeExports.jsx(ChipLabel, {
      className: clsx(classes.label),
      ownerState: ownerState,
      children: label
    }), deleteIcon]
  }));
});
var Chip$1 = Chip;

const _excluded$l = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(value) {
  return parseInt(value, 10) || 0;
}
const styles$1 = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: 'hidden',
    // Remove from the content flow
    position: 'absolute',
    // Ignore the scrollbar width
    overflow: 'hidden',
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: 'translateZ(0)'
  }
};
function isEmpty$1(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length === 0 || obj.outerHeightStyle === 0 && !obj.overflowing;
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://mui.com/material-ui/api/textarea-autosize/)
 */
const TextareaAutosize = /*#__PURE__*/reactExports.forwardRef(function TextareaAutosize(props, forwardedRef) {
  const {
      onChange,
      maxRows,
      minRows = 1,
      style,
      value
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$l);
  const {
    current: isControlled
  } = reactExports.useRef(value != null);
  const inputRef = reactExports.useRef(null);
  const handleRef = useForkRef(forwardedRef, inputRef);
  const heightRef = reactExports.useRef(null);
  const shadowRef = reactExports.useRef(null);
  const calculateTextareaStyles = reactExports.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);

    // If input's width is shrunk and it's not visible, don't sync height.
    if (computedStyle.width === '0px') {
      return {
        outerHeightStyle: 0,
        overflowing: false
      };
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || 'x';
    if (inputShallow.value.slice(-1) === '\n') {
      // Certain fonts which overflow the line height will cause the textarea
      // to report a different scrollHeight depending on whether the last line
      // is empty. Make it non-empty to avoid this issue.
      inputShallow.value += ' ';
    }
    const boxSizing = computedStyle.boxSizing;
    const padding = getStyleValue(computedStyle.paddingBottom) + getStyleValue(computedStyle.paddingTop);
    const border = getStyleValue(computedStyle.borderBottomWidth) + getStyleValue(computedStyle.borderTopWidth);

    // The height of the inner content
    const innerHeight = inputShallow.scrollHeight;

    // Measure height of a textarea with a single row
    inputShallow.value = 'x';
    const singleRowHeight = inputShallow.scrollHeight;

    // The height of the outer content
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);

    // Take the box sizing into account for applying this value as a style.
    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0);
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1;
    return {
      outerHeightStyle,
      overflowing
    };
  }, [maxRows, minRows, props.placeholder]);
  const syncHeight = reactExports.useCallback(() => {
    const textareaStyles = calculateTextareaStyles();
    if (isEmpty$1(textareaStyles)) {
      return;
    }
    const outerHeightStyle = textareaStyles.outerHeightStyle;
    const input = inputRef.current;
    if (heightRef.current !== outerHeightStyle) {
      heightRef.current = outerHeightStyle;
      input.style.height = `${outerHeightStyle}px`;
    }
    input.style.overflow = textareaStyles.overflowing ? 'hidden' : '';
  }, [calculateTextareaStyles]);
  useEnhancedEffect(() => {
    const handleResize = () => {
      syncHeight();
    };
    // Workaround a "ResizeObserver loop completed with undelivered notifications" error
    // in test.
    // Note that we might need to use this logic in production per https://github.com/WICG/resize-observer/issues/38
    // Also see https://github.com/mui/mui-x/issues/8733
    let rAF;
    const debounceHandleResize = debounce(handleResize);
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    containerWindow.addEventListener('resize', debounceHandleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(input);
    }
    return () => {
      debounceHandleResize.clear();
      cancelAnimationFrame(rAF);
      containerWindow.removeEventListener('resize', debounceHandleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [calculateTextareaStyles, syncHeight]);
  useEnhancedEffect(() => {
    syncHeight();
  });
  const handleChange = event => {
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx("textarea", _extends({
      value: value,
      onChange: handleChange,
      ref: handleRef
      // Apply the rows prop to get a "correct" first SSR paint
      ,
      rows: minRows,
      style: style
    }, other)), /*#__PURE__*/jsxRuntimeExports.jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles$1.shadow, style, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
var TextareaAutosize$1 = TextareaAutosize;

function formControlState({
  props,
  states,
  muiFormControl
}) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}

function GlobalStyles(props) {
  return /*#__PURE__*/jsxRuntimeExports.jsx(GlobalStyles$1, _extends({}, props, {
    defaultTheme: defaultTheme,
    themeId: THEME_ID
  }));
}

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
function isAdornedStart(obj) {
  return obj.startAdornment;
}

function getInputBaseUtilityClass(slot) {
  return generateUtilityClass('MuiInputBase', slot);
}
const inputBaseClasses = generateUtilityClasses('MuiInputBase', ['root', 'formControl', 'focused', 'disabled', 'adornedStart', 'adornedEnd', 'error', 'sizeSmall', 'multiline', 'colorSecondary', 'fullWidth', 'hiddenLabel', 'readOnly', 'input', 'inputSizeSmall', 'inputMultiline', 'inputTypeSearch', 'inputAdornedStart', 'inputAdornedEnd', 'inputHiddenLabel']);
var inputBaseClasses$1 = inputBaseClasses;

const _excluded$k = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "disableInjectingGlobalStyles", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "slotProps", "slots", "startAdornment", "type", "value"];
const rootOverridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.formControl && styles.formControl, ownerState.startAdornment && styles.adornedStart, ownerState.endAdornment && styles.adornedEnd, ownerState.error && styles.error, ownerState.size === 'small' && styles.sizeSmall, ownerState.multiline && styles.multiline, ownerState.color && styles[`color${capitalize(ownerState.color)}`], ownerState.fullWidth && styles.fullWidth, ownerState.hiddenLabel && styles.hiddenLabel];
};
const inputOverridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.input, ownerState.size === 'small' && styles.inputSizeSmall, ownerState.multiline && styles.inputMultiline, ownerState.type === 'search' && styles.inputTypeSearch, ownerState.startAdornment && styles.inputAdornedStart, ownerState.endAdornment && styles.inputAdornedEnd, ownerState.hiddenLabel && styles.inputHiddenLabel];
};
const useUtilityClasses$h = ownerState => {
  const {
    classes,
    color,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    readOnly,
    size,
    startAdornment,
    type
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color)}`, disabled && 'disabled', error && 'error', fullWidth && 'fullWidth', focused && 'focused', formControl && 'formControl', size && size !== 'medium' && `size${capitalize(size)}`, multiline && 'multiline', startAdornment && 'adornedStart', endAdornment && 'adornedEnd', hiddenLabel && 'hiddenLabel', readOnly && 'readOnly'],
    input: ['input', disabled && 'disabled', type === 'search' && 'inputTypeSearch', multiline && 'inputMultiline', size === 'small' && 'inputSizeSmall', hiddenLabel && 'inputHiddenLabel', startAdornment && 'inputAdornedStart', endAdornment && 'inputAdornedEnd', readOnly && 'readOnly']
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};
const InputBaseRoot = styled('div', {
  name: 'MuiInputBase',
  slot: 'Root',
  overridesResolver: rootOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: '1.4375em',
  // 23px
  boxSizing: 'border-box',
  // Prevent padding issue with fullWidth.
  position: 'relative',
  cursor: 'text',
  display: 'inline-flex',
  alignItems: 'center',
  [`&.${inputBaseClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled,
    cursor: 'default'
  }
}, ownerState.multiline && _extends({
  padding: '4px 0 5px'
}, ownerState.size === 'small' && {
  paddingTop: 1
}), ownerState.fullWidth && {
  width: '100%'
}));
const InputBaseComponent = styled('input', {
  name: 'MuiInputBase',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => {
  const light = theme.palette.mode === 'light';
  const placeholder = _extends({
    color: 'currentColor'
  }, theme.vars ? {
    opacity: theme.vars.opacity.inputPlaceholder
  } : {
    opacity: light ? 0.42 : 0.5
  }, {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  });
  const placeholderHidden = {
    opacity: '0 !important'
  };
  const placeholderVisible = theme.vars ? {
    opacity: theme.vars.opacity.inputPlaceholder
  } : {
    opacity: light ? 0.42 : 0.5
  };
  return _extends({
    font: 'inherit',
    letterSpacing: 'inherit',
    color: 'currentColor',
    padding: '4px 0 5px',
    border: 0,
    boxSizing: 'content-box',
    background: 'none',
    height: '1.4375em',
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: 'transparent',
    display: 'block',
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: '100%',
    // Fix IE11 width issue
    animationName: 'mui-auto-fill-cancel',
    animationDuration: '10ms',
    '&::-webkit-input-placeholder': placeholder,
    '&::-moz-placeholder': placeholder,
    // Firefox 19+
    '&:-ms-input-placeholder': placeholder,
    // IE11
    '&::-ms-input-placeholder': placeholder,
    // Edge
    '&:focus': {
      outline: 0
    },
    // Reset Firefox invalid required input style
    '&:invalid': {
      boxShadow: 'none'
    },
    '&::-webkit-search-decoration': {
      // Remove the padding when type=search.
      WebkitAppearance: 'none'
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${inputBaseClasses$1.formControl} &`]: {
      '&::-webkit-input-placeholder': placeholderHidden,
      '&::-moz-placeholder': placeholderHidden,
      // Firefox 19+
      '&:-ms-input-placeholder': placeholderHidden,
      // IE11
      '&::-ms-input-placeholder': placeholderHidden,
      // Edge
      '&:focus::-webkit-input-placeholder': placeholderVisible,
      '&:focus::-moz-placeholder': placeholderVisible,
      // Firefox 19+
      '&:focus:-ms-input-placeholder': placeholderVisible,
      // IE11
      '&:focus::-ms-input-placeholder': placeholderVisible // Edge
    },
    [`&.${inputBaseClasses$1.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (theme.vars || theme).palette.text.disabled // Fix opacity Safari bug
    },
    '&:-webkit-autofill': {
      animationDuration: '5000s',
      animationName: 'mui-auto-fill'
    }
  }, ownerState.size === 'small' && {
    paddingTop: 1
  }, ownerState.multiline && {
    height: 'auto',
    resize: 'none',
    padding: 0,
    paddingTop: 0
  }, ownerState.type === 'search' && {
    // Improve type search style.
    MozAppearance: 'textfield'
  });
});
const inputGlobalStyles = /*#__PURE__*/jsxRuntimeExports.jsx(GlobalStyles, {
  styles: {
    '@keyframes mui-auto-fill': {
      from: {
        display: 'block'
      }
    },
    '@keyframes mui-auto-fill-cancel': {
      from: {
        display: 'block'
      }
    }
  }
});

/**
 * `InputBase` contains as few styles as possible.
 * It aims to be a simple building block for creating an input.
 * It contains a load of style reset and some state logic.
 */
const InputBase = /*#__PURE__*/reactExports.forwardRef(function InputBase(inProps, ref) {
  var _slotProps$input;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiInputBase'
  });
  const {
      'aria-describedby': ariaDescribedby,
      autoComplete,
      autoFocus,
      className,
      components = {},
      componentsProps = {},
      defaultValue,
      disabled,
      disableInjectingGlobalStyles,
      endAdornment,
      fullWidth = false,
      id,
      inputComponent = 'input',
      inputProps: inputPropsProp = {},
      inputRef: inputRefProp,
      maxRows,
      minRows,
      multiline = false,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      renderSuffix,
      rows,
      slotProps = {},
      slots = {},
      startAdornment,
      type = 'text',
      value: valueProp
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$k);
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = reactExports.useRef(value != null);
  const inputRef = reactExports.useRef();
  const handleInputRefWarning = reactExports.useCallback(instance => {
  }, []);
  const handleInputRef = useForkRef(inputRef, inputRefProp, inputPropsProp.ref, handleInputRefWarning);
  const [focused, setFocused] = reactExports.useState(false);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'disabled', 'error', 'hiddenLabel', 'size', 'required', 'filled']
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  reactExports.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = reactExports.useCallback(obj => {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  const handleFocus = event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }

    // Perform in the willUpdate
    if (onChange) {
      onChange(event, ...args);
    }
  };

  // Check the input state on mount, in case it was filled by the user
  // or auto filled by the browser before the hydration (for SSR).
  reactExports.useEffect(() => {
    checkDirty(inputRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = event => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;
  if (multiline && InputComponent === 'input') {
    if (rows) {
      inputProps = _extends({
        type: undefined,
        minRows: rows,
        maxRows: rows
      }, inputProps);
    } else {
      inputProps = _extends({
        type: undefined,
        maxRows,
        minRows
      }, inputProps);
    }
    InputComponent = TextareaAutosize$1;
  }
  const handleAutoFill = event => {
    // Provide a fake value as Chrome might not let you access it for security reasons.
    checkDirty(event.animationName === 'mui-auto-fill-cancel' ? inputRef.current : {
      value: 'x'
    });
  };
  reactExports.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const ownerState = _extends({}, props, {
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  });
  const classes = useUtilityClasses$h(ownerState);
  const Root = slots.root || components.Root || InputBaseRoot;
  const rootProps = slotProps.root || componentsProps.root || {};
  const Input = slots.input || components.Input || InputBaseComponent;
  inputProps = _extends({}, inputProps, (_slotProps$input = slotProps.input) != null ? _slotProps$input : componentsProps.input);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [!disableInjectingGlobalStyles && inputGlobalStyles, /*#__PURE__*/jsxRuntimeExports.jsxs(Root, _extends({}, rootProps, !isHostComponent(Root) && {
      ownerState: _extends({}, ownerState, rootProps.ownerState)
    }, {
      ref: ref,
      onClick: handleClick
    }, other, {
      className: clsx(classes.root, rootProps.className, className, readOnly && 'MuiInputBase-readOnly'),
      children: [startAdornment, /*#__PURE__*/jsxRuntimeExports.jsx(FormControlContext.Provider, {
        value: null,
        children: /*#__PURE__*/jsxRuntimeExports.jsx(Input, _extends({
          ownerState: ownerState,
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          autoComplete: autoComplete,
          autoFocus: autoFocus,
          defaultValue: defaultValue,
          disabled: fcs.disabled,
          id: id,
          onAnimationStart: handleAutoFill,
          name: name,
          placeholder: placeholder,
          readOnly: readOnly,
          required: fcs.required,
          rows: rows,
          value: value,
          onKeyDown: onKeyDown,
          onKeyUp: onKeyUp,
          type: type
        }, inputProps, !isHostComponent(Input) && {
          as: InputComponent,
          ownerState: _extends({}, ownerState, inputProps.ownerState)
        }, {
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, readOnly && 'MuiInputBase-readOnly'),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        }))
      }), endAdornment, renderSuffix ? renderSuffix(_extends({}, fcs, {
        startAdornment
      })) : null]
    }))]
  });
});
var InputBase$1 = InputBase;

function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
const inputClasses = _extends({}, inputBaseClasses$1, generateUtilityClasses('MuiInput', ['root', 'underline', 'input']));
var inputClasses$1 = inputClasses;

function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiOutlinedInput', slot);
}
const outlinedInputClasses = _extends({}, inputBaseClasses$1, generateUtilityClasses('MuiOutlinedInput', ['root', 'notchedOutline', 'input']));
var outlinedInputClasses$1 = outlinedInputClasses;

function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}
const filledInputClasses = _extends({}, inputBaseClasses$1, generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']));
var filledInputClasses$1 = filledInputClasses;

var ArrowDropDownIcon = createSvgIcon( /*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M7 10l5 5 5-5z"
}), 'ArrowDropDown');

function getAutocompleteUtilityClass(slot) {
  return generateUtilityClass('MuiAutocomplete', slot);
}
const autocompleteClasses = generateUtilityClasses('MuiAutocomplete', ['root', 'expanded', 'fullWidth', 'focused', 'focusVisible', 'tag', 'tagSizeSmall', 'tagSizeMedium', 'hasPopupIcon', 'hasClearIcon', 'inputRoot', 'input', 'inputFocused', 'endAdornment', 'clearIndicator', 'popupIndicator', 'popupIndicatorOpen', 'popper', 'popperDisablePortal', 'paper', 'listbox', 'loading', 'noOptions', 'option', 'groupLabel', 'groupUl']);
var autocompleteClasses$1 = autocompleteClasses;

var _ClearIcon, _ArrowDropDownIcon;
const _excluded$j = ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionKey", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "readOnly", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "slotProps", "value"],
  _excluded2$3 = ["ref"],
  _excluded3$1 = ["key"],
  _excluded4 = ["key"];
const useUtilityClasses$g = ownerState => {
  const {
    classes,
    disablePortal,
    expanded,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size
  } = ownerState;
  const slots = {
    root: ['root', expanded && 'expanded', focused && 'focused', fullWidth && 'fullWidth', hasClearIcon && 'hasClearIcon', hasPopupIcon && 'hasPopupIcon'],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', `tagSize${capitalize(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl']
  };
  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};
const AutocompleteRoot = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    const {
      fullWidth,
      hasClearIcon,
      hasPopupIcon,
      inputFocused,
      size
    } = ownerState;
    return [{
      [`& .${autocompleteClasses$1.tag}`]: styles.tag
    }, {
      [`& .${autocompleteClasses$1.tag}`]: styles[`tagSize${capitalize(size)}`]
    }, {
      [`& .${autocompleteClasses$1.inputRoot}`]: styles.inputRoot
    }, {
      [`& .${autocompleteClasses$1.input}`]: styles.input
    }, {
      [`& .${autocompleteClasses$1.input}`]: inputFocused && styles.inputFocused
    }, styles.root, fullWidth && styles.fullWidth, hasPopupIcon && styles.hasPopupIcon, hasClearIcon && styles.hasClearIcon];
  }
})({
  [`&.${autocompleteClasses$1.focused} .${autocompleteClasses$1.clearIndicator}`]: {
    visibility: 'visible'
  },
  /* Avoid double tap issue on iOS */
  '@media (pointer: fine)': {
    [`&:hover .${autocompleteClasses$1.clearIndicator}`]: {
      visibility: 'visible'
    }
  },
  [`& .${autocompleteClasses$1.tag}`]: {
    margin: 3,
    maxWidth: 'calc(100% - 6px)'
  },
  [`& .${autocompleteClasses$1.inputRoot}`]: {
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4
    },
    [`& .${autocompleteClasses$1.input}`]: {
      width: 0,
      minWidth: 30
    }
  },
  [`& .${inputClasses$1.root}`]: {
    paddingBottom: 1,
    '& .MuiInput-input': {
      padding: '4px 4px 4px 0px'
    }
  },
  [`& .${inputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    [`& .${inputClasses$1.input}`]: {
      padding: '2px 4px 3px 0'
    }
  },
  [`& .${outlinedInputClasses$1.root}`]: {
    padding: 9,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${autocompleteClasses$1.input}`]: {
      padding: '7.5px 4px 7.5px 5px'
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${outlinedInputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    // Don't specify paddingRight, as it overrides the default value set when there is only
    // one of the popup or clear icon as the specificity is equal so the latter one wins
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    [`& .${autocompleteClasses$1.input}`]: {
      padding: '2.5px 4px 2.5px 8px'
    }
  },
  [`& .${filledInputClasses$1.root}`]: {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${autocompleteClasses$1.hasPopupIcon}&, .${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${autocompleteClasses$1.hasPopupIcon}.${autocompleteClasses$1.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${filledInputClasses$1.input}`]: {
      padding: '7px 4px'
    },
    [`& .${autocompleteClasses$1.endAdornment}`]: {
      right: 9
    }
  },
  [`& .${filledInputClasses$1.root}.${inputBaseClasses$1.sizeSmall}`]: {
    paddingBottom: 1,
    [`& .${filledInputClasses$1.input}`]: {
      padding: '2.5px 4px'
    }
  },
  [`& .${inputBaseClasses$1.hiddenLabel}`]: {
    paddingTop: 8
  },
  [`& .${filledInputClasses$1.root}.${inputBaseClasses$1.hiddenLabel}`]: {
    paddingTop: 0,
    paddingBottom: 0,
    [`& .${autocompleteClasses$1.input}`]: {
      paddingTop: 16,
      paddingBottom: 17
    }
  },
  [`& .${filledInputClasses$1.root}.${inputBaseClasses$1.hiddenLabel}.${inputBaseClasses$1.sizeSmall}`]: {
    [`& .${autocompleteClasses$1.input}`]: {
      paddingTop: 8,
      paddingBottom: 9
    }
  },
  [`& .${autocompleteClasses$1.input}`]: {
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0
  },
  variants: [{
    props: {
      fullWidth: true
    },
    style: {
      width: '100%'
    }
  }, {
    props: {
      size: 'small'
    },
    style: {
      [`& .${autocompleteClasses$1.tag}`]: {
        margin: 2,
        maxWidth: 'calc(100% - 4px)'
      }
    }
  }, {
    props: {
      inputFocused: true
    },
    style: {
      [`& .${autocompleteClasses$1.input}`]: {
        opacity: 1
      }
    }
  }, {
    props: {
      multiple: true
    },
    style: {
      [`& .${autocompleteClasses$1.inputRoot}`]: {
        flexWrap: 'wrap'
      }
    }
  }]
});
const AutocompleteEndAdornment = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endAdornment
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translate(0, -50%)'
});
const AutocompleteClearIndicator = styled(IconButton$1, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden'
});
const AutocompletePopupIndicator = styled(IconButton$1, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: ({
    ownerState
  }, styles) => _extends({}, styles.popupIndicator, ownerState.popupOpen && styles.popupIndicatorOpen)
})({
  padding: 2,
  marginRight: -2,
  variants: [{
    props: {
      popupOpen: true
    },
    style: {
      transform: 'rotate(180deg)'
    }
  }]
});
const AutocompletePopper = styled(Popper, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${autocompleteClasses$1.option}`]: styles.option
    }, styles.popper, ownerState.disablePortal && styles.popperDisablePortal];
  }
})(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.modal,
  variants: [{
    props: {
      disablePortal: true
    },
    style: {
      position: 'absolute'
    }
  }]
}));
const AutocompletePaper = styled(Paper$1, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})(({
  theme
}) => _extends({}, theme.typography.body1, {
  overflow: 'auto'
}));
const AutocompleteLoading = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading
})(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px'
}));
const AutocompleteNoOptions = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions
})(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  padding: '14px 16px'
}));
const AutocompleteListbox = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox
})(({
  theme
}) => ({
  listStyle: 'none',
  margin: 0,
  padding: '8px 0',
  maxHeight: '40vh',
  overflow: 'auto',
  position: 'relative',
  [`& .${autocompleteClasses$1.option}`]: {
    minHeight: 48,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    boxSizing: 'border-box',
    outline: '0',
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto'
    },
    [`&.${autocompleteClasses$1.focused}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&[aria-disabled="true"]': {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`&.${autocompleteClasses$1.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha_1(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${autocompleteClasses$1.focused}`]: {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha_1(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: (theme.vars || theme).palette.action.selected
        }
      },
      [`&.${autocompleteClasses$1.focusVisible}`]: {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha_1(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      }
    }
  }
}));
const AutocompleteGroupLabel = styled(ListSubheader$1, {
  name: 'MuiAutocomplete',
  slot: 'GroupLabel',
  overridesResolver: (props, styles) => styles.groupLabel
})(({
  theme
}) => ({
  backgroundColor: (theme.vars || theme).palette.background.paper,
  top: -8
}));
const AutocompleteGroupUl = styled('ul', {
  name: 'MuiAutocomplete',
  slot: 'GroupUl',
  overridesResolver: (props, styles) => styles.groupUl
})({
  padding: 0,
  [`& .${autocompleteClasses$1.option}`]: {
    paddingLeft: 24
  }
});
const Autocomplete = /*#__PURE__*/reactExports.forwardRef(function Autocomplete(inProps, ref) {
  var _slotProps$clearIndic, _slotProps$paper, _slotProps$popper, _slotProps$popupIndic;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAutocomplete'
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
      autoComplete = false,
      autoHighlight = false,
      autoSelect = false,
      blurOnSelect = false,
      ChipProps,
      className,
      clearIcon = _ClearIcon || (_ClearIcon = /*#__PURE__*/jsxRuntimeExports.jsx(ClearIcon, {
        fontSize: "small"
      })),
      clearOnBlur = !props.freeSolo,
      clearOnEscape = false,
      clearText = 'Clear',
      closeText = 'Close',
      componentsProps = {},
      defaultValue = props.multiple ? [] : null,
      disableClearable = false,
      disableCloseOnSelect = false,
      disabled = false,
      disabledItemsFocusable = false,
      disableListWrap = false,
      disablePortal = false,
      filterSelectedOptions = false,
      forcePopupIcon = 'auto',
      freeSolo = false,
      fullWidth = false,
      getLimitTagsText = more => `+${more}`,
      getOptionLabel: getOptionLabelProp,
      groupBy,
      handleHomeEndKeys = !props.freeSolo,
      includeInputInList = false,
      limitTags = -1,
      ListboxComponent = 'ul',
      ListboxProps,
      loading = false,
      loadingText = 'Loading…',
      multiple = false,
      noOptionsText = 'No options',
      openOnFocus = false,
      openText = 'Open',
      PaperComponent = Paper$1,
      PopperComponent = Popper,
      popupIcon = _ArrowDropDownIcon || (_ArrowDropDownIcon = /*#__PURE__*/jsxRuntimeExports.jsx(ArrowDropDownIcon, {})),
      readOnly = false,
      renderGroup: renderGroupProp,
      renderInput,
      renderOption: renderOptionProp,
      renderTags,
      selectOnFocus = !props.freeSolo,
      size = 'medium',
      slotProps = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$j);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    expanded,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions
  } = useAutocomplete(_extends({}, props, {
    componentName: 'Autocomplete'
  }));
  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
  const {
    onMouseDown: handleInputMouseDown
  } = getInputProps();
  const {
    ref: externalListboxRef
  } = ListboxProps != null ? ListboxProps : {};
  const _getListboxProps = getListboxProps(),
    {
      ref: listboxRef
    } = _getListboxProps,
    otherListboxProps = _objectWithoutPropertiesLoose(_getListboxProps, _excluded2$3);
  const combinedListboxRef = useForkRef(listboxRef, externalListboxRef);
  const defaultGetOptionLabel = option => {
    var _option$label;
    return (_option$label = option.label) != null ? _option$label : option;
  };
  const getOptionLabel = getOptionLabelProp || defaultGetOptionLabel;

  // If you modify this, make sure to keep the `AutocompleteOwnerState` type in sync.
  const ownerState = _extends({}, props, {
    disablePortal,
    expanded,
    focused,
    fullWidth,
    getOptionLabel,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size
  });
  const classes = useUtilityClasses$g(ownerState);
  let startAdornment;
  if (multiple && value.length > 0) {
    const getCustomizedTagProps = params => _extends({
      className: classes.tag,
      disabled
    }, getTagProps(params));
    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps, ownerState);
    } else {
      startAdornment = value.map((option, index) => {
        const _getCustomizedTagProp = getCustomizedTagProps({
            index
          }),
          {
            key
          } = _getCustomizedTagProp,
          customTagProps = _objectWithoutPropertiesLoose(_getCustomizedTagProp, _excluded3$1);
        return /*#__PURE__*/jsxRuntimeExports.jsx(Chip$1, _extends({
          label: getOptionLabel(option),
          size: size
        }, customTagProps, ChipProps), key);
      });
    }
  }
  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;
    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push( /*#__PURE__*/jsxRuntimeExports.jsx("span", {
        className: classes.tag,
        children: getLimitTagsText(more)
      }, startAdornment.length));
    }
  }
  const defaultRenderGroup = params => /*#__PURE__*/jsxRuntimeExports.jsxs("li", {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteGroupLabel, {
      className: classes.groupLabel,
      ownerState: ownerState,
      component: "div",
      children: params.group
    }), /*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteGroupUl, {
      className: classes.groupUl,
      ownerState: ownerState,
      children: params.children
    })]
  }, params.key);
  const renderGroup = renderGroupProp || defaultRenderGroup;
  const defaultRenderOption = (props2, option) => {
    // Need to clearly apply key because of https://github.com/vercel/next.js/issues/55642
    const {
        key
      } = props2,
      otherProps = _objectWithoutPropertiesLoose(props2, _excluded4);
    return /*#__PURE__*/jsxRuntimeExports.jsx("li", _extends({}, otherProps, {
      children: getOptionLabel(option)
    }), key);
  };
  const renderOption = renderOptionProp || defaultRenderOption;
  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({
      option,
      index
    });
    return renderOption(_extends({}, optionProps, {
      className: classes.option
    }), option, {
      selected: optionProps['aria-selected'],
      index,
      inputValue
    }, ownerState);
  };
  const clearIndicatorSlotProps = (_slotProps$clearIndic = slotProps.clearIndicator) != null ? _slotProps$clearIndic : componentsProps.clearIndicator;
  const paperSlotProps = (_slotProps$paper = slotProps.paper) != null ? _slotProps$paper : componentsProps.paper;
  const popperSlotProps = (_slotProps$popper = slotProps.popper) != null ? _slotProps$popper : componentsProps.popper;
  const popupIndicatorSlotProps = (_slotProps$popupIndic = slotProps.popupIndicator) != null ? _slotProps$popupIndic : componentsProps.popupIndicator;
  const renderAutocompletePopperChildren = children => /*#__PURE__*/jsxRuntimeExports.jsx(AutocompletePopper, _extends({
    as: PopperComponent,
    disablePortal: disablePortal,
    style: {
      width: anchorEl ? anchorEl.clientWidth : null
    },
    ownerState: ownerState,
    role: "presentation",
    anchorEl: anchorEl,
    open: popupOpen
  }, popperSlotProps, {
    className: clsx(classes.popper, popperSlotProps == null ? void 0 : popperSlotProps.className),
    children: /*#__PURE__*/jsxRuntimeExports.jsx(AutocompletePaper, _extends({
      ownerState: ownerState,
      as: PaperComponent
    }, paperSlotProps, {
      className: clsx(classes.paper, paperSlotProps == null ? void 0 : paperSlotProps.className),
      children: children
    }))
  }));
  let autocompletePopper = null;
  if (groupedOptions.length > 0) {
    autocompletePopper = renderAutocompletePopperChildren( /*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteListbox, _extends({
      as: ListboxComponent,
      className: classes.listbox,
      ownerState: ownerState
    }, otherListboxProps, ListboxProps, {
      ref: combinedListboxRef,
      children: groupedOptions.map((option, index) => {
        if (groupBy) {
          return renderGroup({
            key: option.key,
            group: option.group,
            children: option.options.map((option2, index2) => renderListOption(option2, option.index + index2))
          });
        }
        return renderListOption(option, index);
      })
    })));
  } else if (loading && groupedOptions.length === 0) {
    autocompletePopper = renderAutocompletePopperChildren( /*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteLoading, {
      className: classes.loading,
      ownerState: ownerState,
      children: loadingText
    }));
  } else if (groupedOptions.length === 0 && !freeSolo && !loading) {
    autocompletePopper = renderAutocompletePopperChildren( /*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteNoOptions, {
      className: classes.noOptions,
      ownerState: ownerState,
      role: "presentation",
      onMouseDown: event => {
        // Prevent input blur when interacting with the "no options" content
        event.preventDefault();
      },
      children: noOptionsText
    }));
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteRoot, _extends({
      ref: ref,
      className: clsx(classes.root, className),
      ownerState: ownerState
    }, getRootProps(other), {
      children: renderInput({
        id,
        disabled,
        fullWidth: true,
        size: size === 'small' ? 'small' : undefined,
        InputLabelProps: getInputLabelProps(),
        InputProps: _extends({
          ref: setAnchorEl,
          className: classes.inputRoot,
          startAdornment,
          onClick: event => {
            if (event.target === event.currentTarget) {
              handleInputMouseDown(event);
            }
          }
        }, (hasClearIcon || hasPopupIcon) && {
          endAdornment: /*#__PURE__*/jsxRuntimeExports.jsxs(AutocompleteEndAdornment, {
            className: classes.endAdornment,
            ownerState: ownerState,
            children: [hasClearIcon ? /*#__PURE__*/jsxRuntimeExports.jsx(AutocompleteClearIndicator, _extends({}, getClearProps(), {
              "aria-label": clearText,
              title: clearText,
              ownerState: ownerState
            }, clearIndicatorSlotProps, {
              className: clsx(classes.clearIndicator, clearIndicatorSlotProps == null ? void 0 : clearIndicatorSlotProps.className),
              children: clearIcon
            })) : null, hasPopupIcon ? /*#__PURE__*/jsxRuntimeExports.jsx(AutocompletePopupIndicator, _extends({}, getPopupIndicatorProps(), {
              disabled: disabled,
              "aria-label": popupOpen ? closeText : openText,
              title: popupOpen ? closeText : openText,
              ownerState: ownerState
            }, popupIndicatorSlotProps, {
              className: clsx(classes.popupIndicator, popupIndicatorSlotProps == null ? void 0 : popupIndicatorSlotProps.className),
              children: popupIcon
            })) : null]
          })
        }),
        inputProps: _extends({
          className: classes.input,
          disabled,
          readOnly
        }, getInputProps())
      })
    })), anchorEl ? autocompletePopper : null]
  });
});
var Autocomplete$1 = Autocomplete;

const _excluded$i = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
const styles = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};

/**
 * The Fade transition is used by the [Modal](/material-ui/react-modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Fade = /*#__PURE__*/reactExports.forwardRef(function Fade(props, ref) {
  const theme = useTheme$1();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
      addEndListener,
      appear = true,
      children,
      easing,
      in: inProp,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      style,
      timeout = defaultTimeout,
      // eslint-disable-next-line react/prop-types
      TransitionComponent = Transition
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$i);
  const nodeRef = reactExports.useRef(null);
  const handleRef = useForkRef(nodeRef, children.ref, ref);
  const normalizedTransitionCallback = callback => maybeIsAppearing => {
    if (callback) {
      const node = nodeRef.current;

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback(node => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      easing
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = next => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };
  return /*#__PURE__*/jsxRuntimeExports.jsx(TransitionComponent, _extends({
    appear: appear,
    in: inProp,
    nodeRef: nodeRef ,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout
  }, other, {
    children: (state, childProps) => {
      return /*#__PURE__*/reactExports.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          visibility: state === 'exited' && !inProp ? 'hidden' : undefined
        }, styles[state], style, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
var Fade$1 = Fade;

function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}
generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);

const _excluded$h = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"];
const useUtilityClasses$f = ownerState => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
const BackdropRoot = styled('div', {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.invisible && styles.invisible];
  }
})(({
  ownerState
}) => _extends({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent'
}, ownerState.invisible && {
  backgroundColor: 'transparent'
}));
const Backdrop = /*#__PURE__*/reactExports.forwardRef(function Backdrop(inProps, ref) {
  var _slotProps$root, _ref, _slots$root;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiBackdrop'
  });
  const {
      children,
      className,
      component = 'div',
      components = {},
      componentsProps = {},
      invisible = false,
      open,
      slotProps = {},
      slots = {},
      TransitionComponent = Fade$1,
      transitionDuration
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$h);
  const ownerState = _extends({}, props, {
    component,
    invisible
  });
  const classes = useUtilityClasses$f(ownerState);
  const rootSlotProps = (_slotProps$root = slotProps.root) != null ? _slotProps$root : componentsProps.root;
  return /*#__PURE__*/jsxRuntimeExports.jsx(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(BackdropRoot, _extends({
      "aria-hidden": true
    }, rootSlotProps, {
      as: (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : component,
      className: clsx(classes.root, className, rootSlotProps == null ? void 0 : rootSlotProps.className),
      ownerState: _extends({}, ownerState, rootSlotProps == null ? void 0 : rootSlotProps.ownerState),
      classes: classes,
      ref: ref,
      children: children
    }))
  }));
});
var Backdrop$1 = Backdrop;

// Is a vertical scrollbar displayed?
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
  // The forbidden HTML tags are the ones from ARIA specification that
  // can be children of body and can't have aria-hidden attribute.
  // cf. https://www.w3.org/TR/html-aria/#docconformance
  const forbiddenTagNames = ['TEMPLATE', 'SCRIPT', 'STYLE', 'LINK', 'MAP', 'META', 'NOSCRIPT', 'PICTURE', 'COL', 'COLGROUP', 'PARAM', 'SLOT', 'SOURCE', 'TRACK'];
  const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  [].forEach.call(container.children, element => {
    const isNotExcludedElement = blacklist.indexOf(element) === -1;
    const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
    if (isNotExcludedElement && isNotForbiddenElement) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      // Compute the size before applying overflow hidden to avoid any scroll jumps.
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: 'padding-right',
        el: container
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;

      // .mui-fixed is a global helper.
      const fixedElements = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, element => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    let scrollContainer;
    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      // Support html overflow-y: auto for scroll stability between pages
      // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer = (parent == null ? void 0 : parent.nodeName) === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll' ? parent : container;
    }

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: 'overflow',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: 'overflow-x',
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: 'overflow-y',
      el: scrollContainer
    });
    scrollContainer.style.overflow = 'hidden';
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property
    }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, element => {
    if (element.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
class ModalManager {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, item => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal, ariaHiddenState = true) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, item => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      // Otherwise make sure the next top modal is visible to a screen reader.
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      // as soon as a modal is adding its modalRef is undefined. it can't set
      // aria-hidden because the dom element doesn't exist either
      // when modal was unmounted before modalRef gets null
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}

// Inspired by https://github.com/focus-trap/tabbable
const candidatesSelector = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'].join(',');
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }

  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.
  if (node.contentEditable === 'true' || (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = selector => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === 'INPUT' && node.type === 'hidden' || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node
      });
    }
  });
  return orderedTabNodes.sort((a, b) => a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map(a => a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}

/**
 * @ignore - internal component.
 */
function FocusTrap(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = reactExports.useRef(false);
  const sentinelStart = reactExports.useRef(null);
  const sentinelEnd = reactExports.useRef(null);
  const nodeToRestore = reactExports.useRef(null);
  const reactFocusEventTarget = reactExports.useRef(null);
  // This variable is useful when disableAutoFocus is true.
  // It waits for the active element to move into the component to activate.
  const activated = reactExports.useRef(false);
  const rootRef = reactExports.useRef(null);
  // @ts-expect-error TODO upstream fix
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = reactExports.useRef(null);
  reactExports.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  reactExports.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute('tabIndex')) {
        rootRef.current.setAttribute('tabIndex', '-1');
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      // restoreLastFocus()
      if (!disableRestoreFocus) {
        // In IE11 it is possible for document.activeElement to be null resulting
        // in nodeToRestore.current being null.
        // Not all elements in IE11 have a focus method.
        // Once IE11 support is dropped the focus() call can be unconditional.
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
    // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open FocusTrap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  reactExports.useEffect(() => {
    // We might render an empty child.
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const loopFocus = nativeEvent => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
        return;
      }

      // Make sure the next tab starts from the right place.
      // doc.activeElement refers to the origin.
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        // We need to ignore the next contain as
        // it will try to move the focus back to the rootRef element.
        ignoreNextEnforceFocus.current = true;
        if (sentinelEnd.current) {
          sentinelEnd.current.focus();
        }
      }
    };
    const contain = () => {
      const rootElement = rootRef.current;

      // Cleanup functions are executed lazily in React 17.
      // Contain can be called between the component being unmounted and its cleanup function being run.
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      // The focus is already inside
      if (rootElement.contains(doc.activeElement)) {
        return;
      }

      // The disableEnforceFocus is set and the focus is outside of the focus trap (and sentinel nodes)
      if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
        return;
      }

      // if the focus event is not coming from inside the children's react tree, reset the refs
      if (doc.activeElement !== reactFocusEventTarget.current) {
        reactFocusEventTarget.current = null;
      } else if (reactFocusEventTarget.current !== null) {
        return;
      }
      if (!activated.current) {
        return;
      }
      let tabbable = [];
      if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
        tabbable = getTabbable(rootRef.current);
      }

      // one of the sentinel nodes was focused, so move the focus
      // to the first/last tabbable element inside the focus trap
      if (tabbable.length > 0) {
        var _lastKeydown$current, _lastKeydown$current2;
        const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === 'Tab');
        const focusNext = tabbable[0];
        const focusPrevious = tabbable[tabbable.length - 1];
        if (typeof focusNext !== 'string' && typeof focusPrevious !== 'string') {
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        }
        // no tabbable elements in the trap focus or the focus was outside of the focus trap
      } else {
        rootElement.focus();
      }
    };
    doc.addEventListener('focusin', contain);
    doc.addEventListener('keydown', loopFocus, true);

    // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
    // for example https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
    // Instead, we can look if the active element was restored on the BODY element.
    //
    // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
    // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
    const interval = setInterval(() => {
      if (doc.activeElement && doc.activeElement.tagName === 'BODY') {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener('focusin', contain);
      doc.removeEventListener('keydown', loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = event => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-testid": "sentinelStart"
    }), /*#__PURE__*/reactExports.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      tabIndex: open ? 0 : -1,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-testid": "sentinelEnd"
    })]
  });
}

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty('in') : false;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const defaultManager = new ModalManager();
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/base-ui/react-modal/#hook)
 *
 * API:
 *
 * - [useModal API](https://mui.com/base-ui/react-modal/hooks-api/#use-modal)
 */
function useModal(parameters) {
  const {
    container,
    disableEscapeKeyDown = false,
    disableScrollLock = false,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager = defaultManager,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef
  } = parameters;

  // @ts-ignore internal logic
  const modal = reactExports.useRef({});
  const mountNodeRef = reactExports.useRef(null);
  const modalRef = reactExports.useRef(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = reactExports.useState(!open);
  const hasTransition = getHasTransition(children);
  let ariaHiddenProp = true;
  if (parameters['aria-hidden'] === 'false' || parameters['aria-hidden'] === false) {
    ariaHiddenProp = false;
  }
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = reactExports.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback(node => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  const handleClose = reactExports.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp, manager]);
  reactExports.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  reactExports.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const createHandleKeyDown = otherHandlers => event => {
    var _otherHandlers$onKeyD;
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (event.key !== 'Escape' || event.which === 229 ||
    // Wait until IME is settled.
    !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      // Swallow the event, in case someone is listening for the escape key on the body.
      event.stopPropagation();
      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
    }
  };
  const createHandleBackdropClick = otherHandlers => event => {
    var _otherHandlers$onClic;
    (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };
  const getRootProps = (otherHandlers = {}) => {
    const propsEventHandlers = extractEventHandlers(parameters);

    // The custom event handlers shouldn't be spread on the root element
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      role: 'presentation'
    }, externalEventHandlers, {
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    });
  };
  const getBackdropProps = (otherHandlers = {}) => {
    const externalEventHandlers = otherHandlers;
    return _extends({
      'aria-hidden': true
    }, externalEventHandlers, {
      onClick: createHandleBackdropClick(externalEventHandlers),
      open
    });
  };
  const getTransitionProps = () => {
    const handleEnter = () => {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    const handleExited = () => {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children == null ? void 0 : children.props.onEnter),
      onExited: createChainedFunction(handleExited, children == null ? void 0 : children.props.onExited)
    };
  };
  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal,
    exited,
    hasTransition
  };
}

function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}
generateUtilityClasses('MuiModal', ['root', 'hidden', 'backdrop']);

const _excluded$g = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"];
const useUtilityClasses$e = ownerState => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ['root', !open && exited && 'hidden'],
    backdrop: ['backdrop']
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
const ModalRoot = styled('div', {
  name: 'MuiModal',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.open && ownerState.exited && styles.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: 'fixed',
  zIndex: (theme.vars || theme).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: 'hidden'
}));
const ModalBackdrop = styled(Backdrop$1, {
  name: 'MuiModal',
  slot: 'Backdrop',
  overridesResolver: (props, styles) => {
    return styles.backdrop;
  }
})({
  zIndex: -1
});

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/material-ui/api/dialog/)
 * - [Drawer](/material-ui/api/drawer/)
 * - [Menu](/material-ui/api/menu/)
 * - [Popover](/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */
const Modal = /*#__PURE__*/reactExports.forwardRef(function Modal(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$backdrop, _slotProps$root, _slotProps$backdrop;
  const props = useDefaultProps({
    name: 'MuiModal',
    props: inProps
  });
  const {
      BackdropComponent = ModalBackdrop,
      BackdropProps,
      className,
      closeAfterTransition = false,
      children,
      container,
      component,
      components = {},
      componentsProps = {},
      disableAutoFocus = false,
      disableEnforceFocus = false,
      disableEscapeKeyDown = false,
      disablePortal = false,
      disableRestoreFocus = false,
      disableScrollLock = false,
      hideBackdrop = false,
      keepMounted = false,
      onBackdropClick,
      open,
      slotProps,
      slots
      // eslint-disable-next-line react/prop-types
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$g);
  const propsWithDefaults = _extends({}, props, {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  });
  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition
  } = useModal(_extends({}, propsWithDefaults, {
    rootRef: ref
  }));
  const ownerState = _extends({}, propsWithDefaults, {
    exited
  });
  const classes = useUtilityClasses$e(ownerState);
  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = '-1';
  }

  // It's a Transition like component
  if (hasTransition) {
    const {
      onEnter,
      onExited
    } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }
  const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : ModalRoot;
  const BackdropSlot = (_ref2 = (_slots$backdrop = slots == null ? void 0 : slots.backdrop) != null ? _slots$backdrop : components.Backdrop) != null ? _ref2 : BackdropComponent;
  const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
  const backdropSlotProps = (_slotProps$backdrop = slotProps == null ? void 0 : slotProps.backdrop) != null ? _slotProps$backdrop : componentsProps.backdrop;
  const rootProps = useSlotProps({
    elementType: RootSlot,
    externalSlotProps: rootSlotProps,
    externalForwardedProps: other,
    getSlotProps: getRootProps,
    additionalProps: {
      ref,
      as: component
    },
    ownerState,
    className: clsx(className, rootSlotProps == null ? void 0 : rootSlotProps.className, classes == null ? void 0 : classes.root, !ownerState.open && ownerState.exited && (classes == null ? void 0 : classes.hidden))
  });
  const backdropProps = useSlotProps({
    elementType: BackdropSlot,
    externalSlotProps: backdropSlotProps,
    additionalProps: BackdropProps,
    getSlotProps: otherHandlers => {
      return getBackdropProps(_extends({}, otherHandlers, {
        onClick: e => {
          if (onBackdropClick) {
            onBackdropClick(e);
          }
          if (otherHandlers != null && otherHandlers.onClick) {
            otherHandlers.onClick(e);
          }
        }
      }));
    },
    className: clsx(backdropSlotProps == null ? void 0 : backdropSlotProps.className, BackdropProps == null ? void 0 : BackdropProps.className, classes == null ? void 0 : classes.backdrop),
    ownerState
  });
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(Portal, {
    ref: portalRef,
    container: container,
    disablePortal: disablePortal,
    children: /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, _extends({}, rootProps, {
      children: [!hideBackdrop && BackdropComponent ? /*#__PURE__*/jsxRuntimeExports.jsx(BackdropSlot, _extends({}, backdropProps)) : null, /*#__PURE__*/jsxRuntimeExports.jsx(FocusTrap, {
        disableEnforceFocus: disableEnforceFocus,
        disableAutoFocus: disableAutoFocus,
        disableRestoreFocus: disableRestoreFocus,
        isEnabled: isTopModal,
        open: open,
        children: /*#__PURE__*/reactExports.cloneElement(children, childProps)
      })]
    }))
  });
});
var Modal$1 = Modal;

const _excluded$f = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "slotProps", "slots", "type"];
const useUtilityClasses$d = ownerState => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input']
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const FilledInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiFilledInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
  }
})(({
  theme,
  ownerState
}) => {
  var _palette;
  const light = theme.palette.mode === 'light';
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  const backgroundColor = light ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.09)';
  const hoverBackground = light ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.13)';
  const disabledBackground = light ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)';
  return _extends({
    position: 'relative',
    backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor,
    borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
    borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    '&:hover': {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.hoverBg : hoverBackground,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
      }
    },
    [`&.${filledInputClasses$1.focused}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.bg : backgroundColor
    },
    [`&.${filledInputClasses$1.disabled}`]: {
      backgroundColor: theme.vars ? theme.vars.palette.FilledInput.disabledBg : disabledBackground
    }
  }, !ownerState.disableUnderline && {
    '&::after': {
      borderBottom: `2px solid ${(_palette = (theme.vars || theme).palette[ownerState.color || 'primary']) == null ? void 0 : _palette.main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&.${filledInputClasses$1.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: 'scaleX(1) translateX(0)'
    },
    [`&.${filledInputClasses$1.error}`]: {
      '&::before, &::after': {
        borderBottomColor: (theme.vars || theme).palette.error.main
      }
    },
    '&::before': {
      borderBottom: `1px solid ${theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})` : bottomLineColor}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('border-bottom-color', {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&:hover:not(.${filledInputClasses$1.disabled}, .${filledInputClasses$1.error}):before`]: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.text.primary}`
    },
    [`&.${filledInputClasses$1.disabled}:before`]: {
      borderBottomStyle: 'dotted'
    }
  }, ownerState.startAdornment && {
    paddingLeft: 12
  }, ownerState.endAdornment && {
    paddingRight: 12
  }, ownerState.multiline && _extends({
    padding: '25px 12px 8px'
  }, ownerState.size === 'small' && {
    paddingTop: 21,
    paddingBottom: 4
  }, ownerState.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }, ownerState.hiddenLabel && ownerState.size === 'small' && {
    paddingTop: 8,
    paddingBottom: 9
  }));
});
const FilledInputInput = styled(InputBaseComponent, {
  name: 'MuiFilledInput',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12
}, !theme.vars && {
  '&:-webkit-autofill': {
    WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
    WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
    caretColor: theme.palette.mode === 'light' ? null : '#fff',
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit'
  }
}, theme.vars && {
  '&:-webkit-autofill': {
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit'
  },
  [theme.getColorSchemeSelector('dark')]: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #266798 inset',
      WebkitTextFillColor: '#fff',
      caretColor: '#fff'
    }
  }
}, ownerState.size === 'small' && {
  paddingTop: 21,
  paddingBottom: 4
}, ownerState.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}, ownerState.hiddenLabel && ownerState.size === 'small' && {
  paddingTop: 8,
  paddingBottom: 9
}, ownerState.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
}));
const FilledInput = /*#__PURE__*/reactExports.forwardRef(function FilledInput(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$input;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFilledInput'
  });
  const {
      components = {},
      componentsProps: componentsPropsProp,
      fullWidth = false,
      // declare here to prevent spreading to DOM
      inputComponent = 'input',
      multiline = false,
      slotProps,
      slots = {},
      type = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$f);
  const ownerState = _extends({}, props, {
    fullWidth,
    inputComponent,
    multiline,
    type
  });
  const classes = useUtilityClasses$d(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = (slotProps != null ? slotProps : componentsPropsProp) ? deepmerge(filledInputComponentsProps, slotProps != null ? slotProps : componentsPropsProp) : filledInputComponentsProps;
  const RootSlot = (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : FilledInputRoot;
  const InputSlot = (_ref2 = (_slots$input = slots.input) != null ? _slots$input : components.Input) != null ? _ref2 : FilledInputInput;
  return /*#__PURE__*/jsxRuntimeExports.jsx(InputBase$1, _extends({
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    componentsProps: componentsProps,
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: classes
  }));
});
FilledInput.muiName = 'Input';
var FilledInput$1 = FilledInput;

function getFormControlUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControl', slot);
}
generateUtilityClasses('MuiFormControl', ['root', 'marginNone', 'marginNormal', 'marginDense', 'fullWidth', 'disabled']);

const _excluded$e = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"];
const useUtilityClasses$c = ownerState => {
  const {
    classes,
    margin,
    fullWidth
  } = ownerState;
  const slots = {
    root: ['root', margin !== 'none' && `margin${capitalize(margin)}`, fullWidth && 'fullWidth']
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
const FormControlRoot = styled('div', {
  name: 'MuiFormControl',
  slot: 'Root',
  overridesResolver: ({
    ownerState
  }, styles) => {
    return _extends({}, styles.root, styles[`margin${capitalize(ownerState.margin)}`], ownerState.fullWidth && styles.fullWidth);
  }
})(({
  ownerState
}) => _extends({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: 'top'
}, ownerState.margin === 'normal' && {
  marginTop: 16,
  marginBottom: 8
}, ownerState.margin === 'dense' && {
  marginTop: 8,
  marginBottom: 4
}, ownerState.fullWidth && {
  width: '100%'
}));

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/material-ui/react-text-field/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️ Only one `InputBase` can be used within a FormControl because it creates visual inconsistencies.
 * For instance, only one input can be focused at the same time, the state shouldn't be shared.
 */
const FormControl = /*#__PURE__*/reactExports.forwardRef(function FormControl(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormControl'
  });
  const {
      children,
      className,
      color = 'primary',
      component = 'div',
      disabled = false,
      error = false,
      focused: visuallyFocused,
      fullWidth = false,
      hiddenLabel = false,
      margin = 'none',
      required = false,
      size = 'medium',
      variant = 'outlined'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$e);
  const ownerState = _extends({}, props, {
    color,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin,
    required,
    size,
    variant
  });
  const classes = useUtilityClasses$c(ownerState);
  const [adornedStart, setAdornedStart] = reactExports.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialAdornedStart = false;
    if (children) {
      reactExports.Children.forEach(children, child => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }
        const input = isMuiElement(child, ['Select']) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = reactExports.useState(() => {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    let initialFilled = false;
    if (children) {
      reactExports.Children.forEach(children, child => {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }
        if (isFilled(child.props, true) || isFilled(child.props.inputProps, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = reactExports.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== undefined && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  const childContext = reactExports.useMemo(() => {
    return {
      adornedStart,
      setAdornedStart,
      color,
      disabled,
      error,
      filled,
      focused,
      fullWidth,
      hiddenLabel,
      size,
      onBlur: () => {
        setFocused(false);
      },
      onEmpty: () => {
        setFilled(false);
      },
      onFilled: () => {
        setFilled(true);
      },
      onFocus: () => {
        setFocused(true);
      },
      registerEffect,
      required,
      variant
    };
  }, [adornedStart, color, disabled, error, filled, focused, fullWidth, hiddenLabel, registerEffect, required, size, variant]);
  return /*#__PURE__*/jsxRuntimeExports.jsx(FormControlContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(FormControlRoot, _extends({
      as: component,
      ownerState: ownerState,
      className: clsx(classes.root, className),
      ref: ref
    }, other, {
      children: children
    }))
  });
});
var FormControl$1 = FormControl;

function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass('MuiFormHelperText', slot);
}
const formHelperTextClasses = generateUtilityClasses('MuiFormHelperText', ['root', 'error', 'disabled', 'sizeSmall', 'sizeMedium', 'contained', 'focused', 'filled', 'required']);
var formHelperTextClasses$1 = formHelperTextClasses;

var _span$2;
const _excluded$d = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"];
const useUtilityClasses$b = ownerState => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', error && 'error', size && `size${capitalize(size)}`, contained && 'contained', focused && 'focused', filled && 'filled', required && 'required']
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
const FormHelperTextRoot = styled('p', {
  name: 'MuiFormHelperText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.size && styles[`size${capitalize(ownerState.size)}`], ownerState.contained && styles.contained, ownerState.filled && styles.filled];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, theme.typography.caption, {
  textAlign: 'left',
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formHelperTextClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}, ownerState.size === 'small' && {
  marginTop: 4
}, ownerState.contained && {
  marginLeft: 14,
  marginRight: 14
}));
const FormHelperText = /*#__PURE__*/reactExports.forwardRef(function FormHelperText(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormHelperText'
  });
  const {
      children,
      className,
      component = 'p'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$d);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required']
  });
  const ownerState = _extends({}, props, {
    component,
    contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$b(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(FormHelperTextRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: children === ' ' ? // notranslate needed while Google Translate will not fix zero-width space issue
    _span$2 || (_span$2 = /*#__PURE__*/jsxRuntimeExports.jsx("span", {
      className: "notranslate",
      children: "\u200B"
    })) : children
  }));
});
var FormHelperText$1 = FormHelperText;

function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormLabel', slot);
}
const formLabelClasses = generateUtilityClasses('MuiFormLabel', ['root', 'colorSecondary', 'focused', 'disabled', 'error', 'filled', 'required', 'asterisk']);
var formLabelClasses$1 = formLabelClasses;

const _excluded$c = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"];
const useUtilityClasses$a = ownerState => {
  const {
    classes,
    color,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color)}`, disabled && 'disabled', error && 'error', filled && 'filled', focused && 'focused', required && 'required'],
    asterisk: ['asterisk', error && 'error']
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
const FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: ({
    ownerState
  }, styles) => {
    return _extends({}, styles.root, ownerState.color === 'secondary' && styles.colorSecondary, ownerState.filled && styles.filled);
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: (theme.vars || theme).palette.text.secondary
}, theme.typography.body1, {
  lineHeight: '1.4375em',
  padding: 0,
  position: 'relative',
  [`&.${formLabelClasses$1.focused}`]: {
    color: (theme.vars || theme).palette[ownerState.color].main
  },
  [`&.${formLabelClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.text.disabled
  },
  [`&.${formLabelClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk
})(({
  theme
}) => ({
  [`&.${formLabelClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));
const FormLabel = /*#__PURE__*/reactExports.forwardRef(function FormLabel(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormLabel'
  });
  const {
      children,
      className,
      component = 'label'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$c);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });
  const ownerState = _extends({}, props, {
    color: fcs.color || 'primary',
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$a(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(FormLabelRoot, _extends({
    as: component,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [children, fcs.required && /*#__PURE__*/jsxRuntimeExports.jsxs(AsteriskComponent, {
      ownerState: ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: ["\u2009", '*']
    })]
  }));
});
var FormLabel$1 = FormLabel;

const _excluded$b = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "slotProps", "slots", "type"];
const useUtilityClasses$9 = ownerState => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input']
  };
  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const InputRoot = styled(InputBaseRoot, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles), !ownerState.disableUnderline && styles.underline];
  }
})(({
  theme,
  ownerState
}) => {
  const light = theme.palette.mode === 'light';
  let bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  if (theme.vars) {
    bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
  }
  return _extends({
    position: 'relative'
  }, ownerState.formControl && {
    'label + &': {
      marginTop: 16
    }
  }, !ownerState.disableUnderline && {
    '&::after': {
      borderBottom: `2px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&.${inputClasses$1.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: 'scaleX(1) translateX(0)'
    },
    [`&.${inputClasses$1.error}`]: {
      '&::before, &::after': {
        borderBottomColor: (theme.vars || theme).palette.error.main
      }
    },
    '&::before': {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('border-bottom-color', {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: 'none' // Transparent to the hover style.
    },
    [`&:hover:not(.${inputClasses$1.disabled}, .${inputClasses$1.error}):before`]: {
      borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        borderBottom: `1px solid ${bottomLineColor}`
      }
    },
    [`&.${inputClasses$1.disabled}:before`]: {
      borderBottomStyle: 'dotted'
    }
  });
});
const InputInput = styled(InputBaseComponent, {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})({});
const Input = /*#__PURE__*/reactExports.forwardRef(function Input(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$input;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiInput'
  });
  const {
      disableUnderline,
      components = {},
      componentsProps: componentsPropsProp,
      fullWidth = false,
      inputComponent = 'input',
      multiline = false,
      slotProps,
      slots = {},
      type = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$b);
  const classes = useUtilityClasses$9(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = (slotProps != null ? slotProps : componentsPropsProp) ? deepmerge(slotProps != null ? slotProps : componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  const RootSlot = (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : InputRoot;
  const InputSlot = (_ref2 = (_slots$input = slots.input) != null ? _slots$input : components.Input) != null ? _ref2 : InputInput;
  return /*#__PURE__*/jsxRuntimeExports.jsx(InputBase$1, _extends({
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    slotProps: componentsProps,
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: classes
  }));
});
Input.muiName = 'Input';
var Input$1 = Input;

function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiInputLabel', slot);
}
generateUtilityClasses('MuiInputLabel', ['root', 'focused', 'disabled', 'error', 'required', 'asterisk', 'formControl', 'sizeSmall', 'shrink', 'animated', 'standard', 'filled', 'outlined']);

const _excluded$a = ["disableAnimation", "margin", "shrink", "variant", "className"];
const useUtilityClasses$8 = ownerState => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ['root', formControl && 'formControl', !disableAnimation && 'animated', shrink && 'shrink', size && size !== 'normal' && `size${capitalize(size)}`, variant],
    asterisk: [required && 'asterisk']
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends({}, classes, composedClasses);
};
const InputLabelRoot = styled(FormLabel$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses$1.asterisk}`]: styles.asterisk
    }, styles.root, ownerState.formControl && styles.formControl, ownerState.size === 'small' && styles.sizeSmall, ownerState.shrink && styles.shrink, !ownerState.disableAnimation && styles.animated, ownerState.focused && styles.focused, styles[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: 'block',
  transformOrigin: 'top left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%'
}, ownerState.formControl && {
  position: 'absolute',
  left: 0,
  top: 0,
  // slight alteration to spec spacing to match visual spec result
  transform: 'translate(0, 20px) scale(1)'
}, ownerState.size === 'small' && {
  // Compensation for the `Input.inputSizeSmall` style.
  transform: 'translate(0, 17px) scale(1)'
}, ownerState.shrink && {
  transform: 'translate(0, -1.5px) scale(0.75)',
  transformOrigin: 'top left',
  maxWidth: '133%'
}, !ownerState.disableAnimation && {
  transition: theme.transitions.create(['color', 'transform', 'max-width'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.variant === 'filled' && _extends({
  // Chrome's autofill feature gives the input field a yellow background.
  // Since the input field is behind the label in the HTML tree,
  // the input field is drawn last and hides the label with an opaque background color.
  // zIndex: 1 will raise the label above opaque background-colors of input.
  zIndex: 1,
  pointerEvents: 'none',
  transform: 'translate(12px, 16px) scale(1)',
  maxWidth: 'calc(100% - 24px)'
}, ownerState.size === 'small' && {
  transform: 'translate(12px, 13px) scale(1)'
}, ownerState.shrink && _extends({
  userSelect: 'none',
  pointerEvents: 'auto',
  transform: 'translate(12px, 7px) scale(0.75)',
  maxWidth: 'calc(133% - 24px)'
}, ownerState.size === 'small' && {
  transform: 'translate(12px, 4px) scale(0.75)'
})), ownerState.variant === 'outlined' && _extends({
  // see comment above on filled.zIndex
  zIndex: 1,
  pointerEvents: 'none',
  transform: 'translate(14px, 16px) scale(1)',
  maxWidth: 'calc(100% - 24px)'
}, ownerState.size === 'small' && {
  transform: 'translate(14px, 9px) scale(1)'
}, ownerState.shrink && {
  userSelect: 'none',
  pointerEvents: 'auto',
  // Theoretically, we should have (8+5)*2/0.75 = 34px
  // but it feels a better when it bleeds a bit on the left, so 32px.
  maxWidth: 'calc(133% - 32px)',
  transform: 'translate(14px, -9px) scale(0.75)'
})));
const InputLabel = /*#__PURE__*/reactExports.forwardRef(function InputLabel(inProps, ref) {
  const props = useDefaultProps({
    name: 'MuiInputLabel',
    props: inProps
  });
  const {
      disableAnimation = false,
      shrink: shrinkProp,
      className
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$a);
  const muiFormControl = useFormControl();
  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['size', 'variant', 'required', 'focused']
  });
  const ownerState = _extends({}, props, {
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required,
    focused: fcs.focused
  });
  const classes = useUtilityClasses$8(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(InputLabelRoot, _extends({
    "data-shrink": shrink,
    ownerState: ownerState,
    ref: ref,
    className: clsx(classes.root, className)
  }, other, {
    classes: classes
  }));
});
var InputLabel$1 = InputLabel;

/**
 * @ignore - internal component.
 */
const ListContext = /*#__PURE__*/reactExports.createContext({});
var ListContext$1 = ListContext;

function getListUtilityClass(slot) {
  return generateUtilityClass('MuiList', slot);
}
generateUtilityClasses('MuiList', ['root', 'padding', 'dense', 'subheader']);

const _excluded$9 = ["children", "className", "component", "dense", "disablePadding", "subheader"];
const useUtilityClasses$7 = ownerState => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader']
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disablePadding && styles.padding, ownerState.dense && styles.dense, ownerState.subheader && styles.subheader];
  }
})(({
  ownerState
}) => _extends({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
}, !ownerState.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.subheader && {
  paddingTop: 0
}));
const List = /*#__PURE__*/reactExports.forwardRef(function List(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiList'
  });
  const {
      children,
      className,
      component = 'ul',
      dense = false,
      disablePadding = false,
      subheader
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const context = reactExports.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = _extends({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses$7(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(ListContext$1.Provider, {
    value: context,
    children: /*#__PURE__*/jsxRuntimeExports.jsxs(ListRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
      ref: ref,
      ownerState: ownerState
    }, other, {
      children: [subheader, children]
    }))
  });
});
var List$1 = List;

const _excluded$8 = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === undefined) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === undefined) {
    // jsdom doesn't support innerText
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join('')) === 0;
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return false;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';
    if (!nextFocus.hasAttribute('tabindex') || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}

/**
 * A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
 * It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 */
const MenuList = /*#__PURE__*/reactExports.forwardRef(function MenuList(props, ref) {
  const {
      // private
      // eslint-disable-next-line react/prop-types
      actions,
      autoFocus = false,
      autoFocusItem = false,
      children,
      className,
      disabledItemsFocusable = false,
      disableListWrap = false,
      onKeyDown,
      variant = 'selectedMenu'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$8);
  const listRef = reactExports.useRef(null);
  const textCriteriaRef = reactExports.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  useEnhancedEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  reactExports.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, {
      direction
    }) => {
      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
        listRef.current.style[direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    }
  }), []);
  const handleKeyDown = event => {
    const list = listRef.current;
    const key = event.key;
    /**
     * @type {Element} - will always be defined since we are in a keydown handler
     * attached to an element. A keydown event is either dispatched to the activeElement
     * or document.body or document.documentElement. Only the first case will
     * trigger this specific handler.
     */
    const currentFocus = ownerDocument(list).activeElement;
    if (key === 'ArrowDown') {
      // Prevent scroll of the page
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key === 'Home') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === 'End') {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        // Reset
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleRef = useForkRef(listRef, ref);

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
  reactExports.Children.forEach(children, (child, index) => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      if (activeItemIndex === index) {
        activeItemIndex += 1;
        if (activeItemIndex >= children.length) {
          // there are no focusable items within the list.
          activeItemIndex = -1;
        }
      }
      return;
    }
    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
    if (activeItemIndex === index && (child.props.disabled || child.props.muiSkipListHighlight || child.type.muiSkipListHighlight)) {
      activeItemIndex += 1;
      if (activeItemIndex >= children.length) {
        // there are no focusable items within the list.
        activeItemIndex = -1;
      }
    }
  });
  const items = reactExports.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      const newChildProps = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === undefined && variant === 'selectedMenu') {
        newChildProps.tabIndex = 0;
      }
      return /*#__PURE__*/reactExports.cloneElement(child, newChildProps);
    }
    return child;
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(List$1, _extends({
    role: "menu",
    ref: handleRef,
    className: className,
    onKeyDown: handleKeyDown,
    tabIndex: autoFocus ? 0 : -1
  }, other, {
    children: items
  }));
});
var MenuList$1 = MenuList;

function getPopoverUtilityClass(slot) {
  return generateUtilityClass('MuiPopover', slot);
}
generateUtilityClasses('MuiPopover', ['root', 'paper']);

const _excluded$7 = ["onEntering"],
  _excluded2$2 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"],
  _excluded3 = ["slotProps"];
function getOffsetTop(rect, vertical) {
  let offset = 0;
  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }
  return offset;
}
function getOffsetLeft(rect, horizontal) {
  let offset = 0;
  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(n => typeof n === 'number' ? `${n}px` : n).join(' ');
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}
const useUtilityClasses$6 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    paper: ['paper']
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
const PopoverRoot = styled(Modal$1, {
  name: 'MuiPopover',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const PopoverPaper = styled(Paper$1, {
  name: 'MuiPopover',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})({
  position: 'absolute',
  overflowY: 'auto',
  overflowX: 'hidden',
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Popover = /*#__PURE__*/reactExports.forwardRef(function Popover(inProps, ref) {
  var _slotProps$paper, _slots$root, _slots$paper;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiPopover'
  });
  const {
      action,
      anchorEl,
      anchorOrigin = {
        vertical: 'top',
        horizontal: 'left'
      },
      anchorPosition,
      anchorReference = 'anchorEl',
      children,
      className,
      container: containerProp,
      elevation = 8,
      marginThreshold = 16,
      open,
      PaperProps: PaperPropsProp = {},
      slots,
      slotProps,
      transformOrigin = {
        vertical: 'top',
        horizontal: 'left'
      },
      TransitionComponent = Grow,
      transitionDuration: transitionDurationProp = 'auto',
      TransitionProps: {
        onEntering
      } = {},
      disableScrollLock = false
    } = props,
    TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$7),
    other = _objectWithoutPropertiesLoose(props, _excluded2$2);
  const externalPaperSlotProps = (_slotProps$paper = slotProps == null ? void 0 : slotProps.paper) != null ? _slotProps$paper : PaperPropsProp;
  const paperRef = reactExports.useRef();
  const handlePaperRef = useForkRef(paperRef, externalPaperSlotProps.ref);
  const ownerState = _extends({}, props, {
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    externalPaperSlotProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  });
  const classes = useUtilityClasses$6(ownerState);

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = reactExports.useCallback(() => {
    if (anchorReference === 'anchorPosition') {
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // If an anchor element wasn't provided, just use the parent body element of this Popover
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);

  // Returns the base transform origin using the element
  const getTransformOrigin = reactExports.useCallback(elemRect => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = reactExports.useCallback(element => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    // Get the transform origin point on the element itself
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === 'none') {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }

    // Get the offset of the anchoring element
    const anchorOffset = getAnchorOffset();

    // Calculate element positioning
    let top = anchorOffset.top - elemTransformOrigin.vertical;
    let left = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;

    // Use the parent window of the anchorEl if provided
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));

    // Window thresholds taking required margin into account
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (marginThreshold !== null && top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (marginThreshold !== null && bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    }

    // Check if the horizontal axis needs shifting
    if (marginThreshold !== null && left < marginThreshold) {
      const diff = left - marginThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const [isPositioned, setIsPositioned] = reactExports.useState(open);
  const setPositioningStyles = reactExports.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);
  reactExports.useEffect(() => {
    if (disableScrollLock) {
      window.addEventListener('scroll', setPositioningStyles);
    }
    return () => window.removeEventListener('scroll', setPositioningStyles);
  }, [anchorEl, disableScrollLock, setPositioningStyles]);
  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  const handleExited = () => {
    setIsPositioned(false);
  };
  reactExports.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  reactExports.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  reactExports.useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleResize = debounce(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : undefined);
  const RootSlot = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : PopoverRoot;
  const PaperSlot = (_slots$paper = slots == null ? void 0 : slots.paper) != null ? _slots$paper : PopoverPaper;
  const paperProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: _extends({}, externalPaperSlotProps, {
      style: isPositioned ? externalPaperSlotProps.style : _extends({}, externalPaperSlotProps.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation,
      ref: handlePaperRef
    },
    ownerState,
    className: clsx(classes.paper, externalPaperSlotProps == null ? void 0 : externalPaperSlotProps.className)
  });
  const _useSlotProps = useSlotProps({
      elementType: RootSlot,
      externalSlotProps: (slotProps == null ? void 0 : slotProps.root) || {},
      externalForwardedProps: other,
      additionalProps: {
        ref,
        slotProps: {
          backdrop: {
            invisible: true
          }
        },
        container,
        open
      },
      ownerState,
      className: clsx(classes.root, className)
    }),
    {
      slotProps: rootSlotPropsProp
    } = _useSlotProps,
    rootProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded3);
  return /*#__PURE__*/jsxRuntimeExports.jsx(RootSlot, _extends({}, rootProps, !isHostComponent(RootSlot) && {
    slotProps: rootSlotPropsProp,
    disableScrollLock
  }, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(TransitionComponent, _extends({
      appear: true,
      in: open,
      onEntering: handleEntering,
      onExited: handleExited,
      timeout: transitionDuration
    }, TransitionProps, {
      children: /*#__PURE__*/jsxRuntimeExports.jsx(PaperSlot, _extends({}, paperProps, {
        children: children
      }))
    }))
  }));
});
var Popover$1 = Popover;

function getMenuUtilityClass(slot) {
  return generateUtilityClass('MuiMenu', slot);
}
generateUtilityClasses('MuiMenu', ['root', 'paper', 'list']);

const _excluded$6 = ["onEntering"],
  _excluded2$1 = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"];
const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};
const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};
const useUtilityClasses$5 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list']
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
const MenuRoot = styled(Popover$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const MenuPaper = styled(PopoverPaper, {
  name: 'MuiMenu',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch'
});
const MenuMenuList = styled(MenuList$1, {
  name: 'MuiMenu',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Menu = /*#__PURE__*/reactExports.forwardRef(function Menu(inProps, ref) {
  var _slots$paper, _slotProps$paper;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenu'
  });
  const {
      autoFocus = true,
      children,
      className,
      disableAutoFocusItem = false,
      MenuListProps = {},
      onClose,
      open,
      PaperProps = {},
      PopoverClasses,
      transitionDuration = 'auto',
      TransitionProps: {
        onEntering
      } = {},
      variant = 'selectedMenu',
      slots = {},
      slotProps = {}
    } = props,
    TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$6),
    other = _objectWithoutPropertiesLoose(props, _excluded2$1);
  const isRtl = useRtl();
  const ownerState = _extends({}, props, {
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  });
  const classes = useUtilityClasses$5(ownerState);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = reactExports.useRef(null);
  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, {
        direction: isRtl ? 'rtl' : 'ltr'
      });
    }
    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };
  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };

  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */
  let activeItemIndex = -1;
  // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback
  reactExports.Children.map(children, (child, index) => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  const PaperSlot = (_slots$paper = slots.paper) != null ? _slots$paper : MenuPaper;
  const paperExternalSlotProps = (_slotProps$paper = slotProps.paper) != null ? _slotProps$paper : PaperProps;
  const rootSlotProps = useSlotProps({
    elementType: slots.root,
    externalSlotProps: slotProps.root,
    ownerState,
    className: [classes.root, className]
  });
  const paperSlotProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: paperExternalSlotProps,
    ownerState,
    className: classes.paper
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(MenuRoot, _extends({
    onClose: onClose,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: isRtl ? 'right' : 'left'
    },
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    slots: {
      paper: PaperSlot,
      root: slots.root
    },
    slotProps: {
      root: rootSlotProps,
      paper: paperSlotProps
    },
    open: open,
    ref: ref,
    transitionDuration: transitionDuration,
    TransitionProps: _extends({
      onEntering: handleEntering
    }, TransitionProps),
    ownerState: ownerState
  }, other, {
    classes: PopoverClasses,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(MenuMenuList, _extends({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem: autoFocusItem,
      variant: variant
    }, MenuListProps, {
      className: clsx(classes.list, MenuListProps.className),
      children: children
    }))
  }));
});
var Menu$1 = Menu;

function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiNativeSelect', slot);
}
const nativeSelectClasses = generateUtilityClasses('MuiNativeSelect', ['root', 'select', 'multiple', 'filled', 'outlined', 'standard', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput', 'error']);
var nativeSelectClasses$1 = nativeSelectClasses;

const _excluded$5 = ["className", "disabled", "error", "IconComponent", "inputRef", "variant"];
const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled']
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const nativeSelectSelectStyles = ({
  ownerState,
  theme
}) => _extends({
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  borderRadius: 0,
  // Reset
  cursor: 'pointer',
  '&:focus': _extends({}, theme.vars ? {
    backgroundColor: `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.05)`
  } : {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
  }, {
    borderRadius: 0 // Reset Chrome style
  }),
  // Remove IE11 arrow
  '&::-ms-expand': {
    display: 'none'
  },
  [`&.${nativeSelectClasses$1.disabled}`]: {
    cursor: 'default'
  },
  '&[multiple]': {
    height: 'auto'
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: (theme.vars || theme).palette.background.paper
  },
  // Bump specificity to allow extending custom inputs
  '&&&': {
    paddingRight: 24,
    minWidth: 16 // So it doesn't collapse.
  }
}, ownerState.variant === 'filled' && {
  '&&&': {
    paddingRight: 32
  }
}, ownerState.variant === 'outlined' && {
  borderRadius: (theme.vars || theme).shape.borderRadius,
  '&:focus': {
    borderRadius: (theme.vars || theme).shape.borderRadius // Reset the reset for Chrome style
  },
  '&&&': {
    paddingRight: 32
  }
});
const NativeSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.select, styles[ownerState.variant], ownerState.error && styles.error, {
      [`&.${nativeSelectClasses$1.multiple}`]: styles.multiple
    }];
  }
})(nativeSelectSelectStyles);
const nativeSelectIconStyles = ({
  ownerState,
  theme
}) => _extends({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  top: 'calc(50% - .5em)',
  // Center vertically, height is 1em
  pointerEvents: 'none',
  // Don't block pointer events on the select under the icon.
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses$1.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}, ownerState.open && {
  transform: 'rotate(180deg)'
}, ownerState.variant === 'filled' && {
  right: 7
}, ownerState.variant === 'outlined' && {
  right: 7
});
const NativeSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);

/**
 * @ignore - internal component.
 */
const NativeSelectInput = /*#__PURE__*/reactExports.forwardRef(function NativeSelectInput(props, ref) {
  const {
      className,
      disabled,
      error,
      IconComponent,
      inputRef,
      variant = 'standard'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$5);
  const ownerState = _extends({}, props, {
    disabled,
    variant,
    error
  });
  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(NativeSelectSelect, _extends({
      ownerState: ownerState,
      className: clsx(classes.select, className),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/jsxRuntimeExports.jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState: ownerState,
      className: classes.icon
    })]
  });
});
var NativeSelectInput$1 = NativeSelectInput;

var _span$1;
const _excluded$4 = ["children", "classes", "className", "label", "notched"];
const NotchedOutlineRoot$1 = styled('fieldset', {
  shouldForwardProp: rootShouldForwardProp
})({
  textAlign: 'left',
  position: 'absolute',
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: '0 8px',
  pointerEvents: 'none',
  borderRadius: 'inherit',
  borderStyle: 'solid',
  borderWidth: 1,
  overflow: 'hidden',
  minWidth: '0%'
});
const NotchedOutlineLegend = styled('legend', {
  shouldForwardProp: rootShouldForwardProp
})(({
  ownerState,
  theme
}) => _extends({
  float: 'unset',
  // Fix conflict with bootstrap
  width: 'auto',
  // Fix conflict with bootstrap
  overflow: 'hidden'
}, !ownerState.withLabel && {
  padding: 0,
  lineHeight: '11px',
  // sync with `height` in `legend` styles
  transition: theme.transitions.create('width', {
    duration: 150,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.withLabel && _extends({
  display: 'block',
  // Fix conflict with normalize.css and sanitize.css
  padding: 0,
  height: 11,
  // sync with `lineHeight` in `legend` styles
  fontSize: '0.75em',
  visibility: 'hidden',
  maxWidth: 0.01,
  transition: theme.transitions.create('max-width', {
    duration: 50,
    easing: theme.transitions.easing.easeOut
  }),
  whiteSpace: 'nowrap',
  '& > span': {
    paddingLeft: 5,
    paddingRight: 5,
    display: 'inline-block',
    opacity: 0,
    visibility: 'visible'
  }
}, ownerState.notched && {
  maxWidth: '100%',
  transition: theme.transitions.create('max-width', {
    duration: 100,
    easing: theme.transitions.easing.easeOut,
    delay: 50
  })
})));

/**
 * @ignore - internal component.
 */
function NotchedOutline(props) {
  const {
      className,
      label,
      notched
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const withLabel = label != null && label !== '';
  const ownerState = _extends({}, props, {
    notched,
    withLabel
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(NotchedOutlineRoot$1, _extends({
    "aria-hidden": true,
    className: className,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(NotchedOutlineLegend, {
      ownerState: ownerState,
      children: withLabel ? /*#__PURE__*/jsxRuntimeExports.jsx("span", {
        children: label
      }) : // notranslate needed while Google Translate will not fix zero-width space issue
      _span$1 || (_span$1 = /*#__PURE__*/jsxRuntimeExports.jsx("span", {
        className: "notranslate",
        children: "\u200B"
      }))
    })
  }));
}

const _excluded$3 = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "slots", "type"];
const useUtilityClasses$3 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    notchedOutline: ['notchedOutline'],
    input: ['input']
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
const OutlinedInputRoot = styled(InputBaseRoot, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiOutlinedInput',
  slot: 'Root',
  overridesResolver: rootOverridesResolver
})(({
  theme,
  ownerState
}) => {
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return _extends({
    position: 'relative',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      [`&:hover .${outlinedInputClasses$1.notchedOutline}`]: {
        borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
      }
    },
    [`&.${outlinedInputClasses$1.focused} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette[ownerState.color].main,
      borderWidth: 2
    },
    [`&.${outlinedInputClasses$1.error} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.error.main
    },
    [`&.${outlinedInputClasses$1.disabled} .${outlinedInputClasses$1.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.action.disabled
    }
  }, ownerState.startAdornment && {
    paddingLeft: 14
  }, ownerState.endAdornment && {
    paddingRight: 14
  }, ownerState.multiline && _extends({
    padding: '16.5px 14px'
  }, ownerState.size === 'small' && {
    padding: '8.5px 14px'
  }));
});
const NotchedOutlineRoot = styled(NotchedOutline, {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline',
  overridesResolver: (props, styles) => styles.notchedOutline
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
  };
});
const OutlinedInputInput = styled(InputBaseComponent, {
  name: 'MuiOutlinedInput',
  slot: 'Input',
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  padding: '16.5px 14px'
}, !theme.vars && {
  '&:-webkit-autofill': {
    WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
    WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
    caretColor: theme.palette.mode === 'light' ? null : '#fff',
    borderRadius: 'inherit'
  }
}, theme.vars && {
  '&:-webkit-autofill': {
    borderRadius: 'inherit'
  },
  [theme.getColorSchemeSelector('dark')]: {
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #266798 inset',
      WebkitTextFillColor: '#fff',
      caretColor: '#fff'
    }
  }
}, ownerState.size === 'small' && {
  padding: '8.5px 14px'
}, ownerState.multiline && {
  padding: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}));
const OutlinedInput = /*#__PURE__*/reactExports.forwardRef(function OutlinedInput(inProps, ref) {
  var _ref, _slots$root, _ref2, _slots$input, _React$Fragment;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiOutlinedInput'
  });
  const {
      components = {},
      fullWidth = false,
      inputComponent = 'input',
      label,
      multiline = false,
      notched,
      slots = {},
      type = 'text'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$3);
  const classes = useUtilityClasses$3(props);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'disabled', 'error', 'focused', 'hiddenLabel', 'size', 'required']
  });
  const ownerState = _extends({}, props, {
    color: fcs.color || 'primary',
    disabled: fcs.disabled,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    type
  });
  const RootSlot = (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : OutlinedInputRoot;
  const InputSlot = (_ref2 = (_slots$input = slots.input) != null ? _slots$input : components.Input) != null ? _ref2 : OutlinedInputInput;
  return /*#__PURE__*/jsxRuntimeExports.jsx(InputBase$1, _extends({
    slots: {
      root: RootSlot,
      input: InputSlot
    },
    renderSuffix: state => /*#__PURE__*/jsxRuntimeExports.jsx(NotchedOutlineRoot, {
      ownerState: ownerState,
      className: classes.notchedOutline,
      label: label != null && label !== '' && fcs.required ? _React$Fragment || (_React$Fragment = /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
        children: [label, "\u2009", '*']
      })) : label,
      notched: typeof notched !== 'undefined' ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: _extends({}, classes, {
      notchedOutline: null
    })
  }));
});
OutlinedInput.muiName = 'Input';
var OutlinedInput$1 = OutlinedInput;

function getSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}
const selectClasses = generateUtilityClasses('MuiSelect', ['root', 'select', 'multiple', 'filled', 'outlined', 'standard', 'disabled', 'focused', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput', 'error']);
var selectClasses$1 = selectClasses;

var _span;
const _excluded$2 = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultOpen", "defaultValue", "disabled", "displayEmpty", "error", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"];
const SelectSelect = styled('div', {
  name: 'MuiSelect',
  slot: 'Select',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [
    // Win specificity over the input base
    {
      [`&.${selectClasses$1.select}`]: styles.select
    }, {
      [`&.${selectClasses$1.select}`]: styles[ownerState.variant]
    }, {
      [`&.${selectClasses$1.error}`]: styles.error
    }, {
      [`&.${selectClasses$1.multiple}`]: styles.multiple
    }];
  }
})(nativeSelectSelectStyles, {
  // Win specificity over the input base
  [`&.${selectClasses$1.select}`]: {
    height: 'auto',
    // Resets for multiple select with chips
    minHeight: '1.4375em',
    // Required for select\text-field height consistency
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
});
const SelectIcon = styled('svg', {
  name: 'MuiSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);
const SelectNativeInput = styled('input', {
  shouldForwardProp: prop => slotShouldForwardProp(prop) && prop !== 'classes',
  name: 'MuiSelect',
  slot: 'NativeInput',
  overridesResolver: (props, styles) => styles.nativeInput
})({
  bottom: 0,
  left: 0,
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: '100%',
  boxSizing: 'border-box'
});
function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}
function isEmpty(display) {
  return display == null || typeof display === 'string' && !display.trim();
}
const useUtilityClasses$2 = ownerState => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled'],
    nativeInput: ['nativeInput']
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};

/**
 * @ignore - internal component.
 */
const SelectInput = /*#__PURE__*/reactExports.forwardRef(function SelectInput(props, ref) {
  var _MenuProps$slotProps;
  const {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      autoFocus,
      autoWidth,
      children,
      className,
      defaultOpen,
      defaultValue,
      disabled,
      displayEmpty,
      error = false,
      IconComponent,
      inputRef: inputRefProp,
      labelId,
      MenuProps = {},
      multiple,
      name,
      onBlur,
      onChange,
      onClose,
      onFocus,
      onOpen,
      open: openProp,
      readOnly,
      renderValue,
      SelectDisplayProps = {},
      tabIndex: tabIndexProp
      // catching `type` from Input which makes no sense for SelectInput
      ,

      value: valueProp,
      variant = 'standard'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$2);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Select'
  });
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'Select'
  });
  const inputRef = reactExports.useRef(null);
  const displayRef = reactExports.useRef(null);
  const [displayNode, setDisplayNode] = reactExports.useState(null);
  const {
    current: isOpenControlled
  } = reactExports.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = reactExports.useState();
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = reactExports.useCallback(node => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  const anchorElement = displayNode == null ? void 0 : displayNode.parentNode;
  reactExports.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);

  // Resize menu on `defaultOpen` automatic toggle.
  reactExports.useEffect(() => {
    if (defaultOpen && openState && displayNode && !isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      displayRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayNode, autoWidth]);
  // `isOpenControlled` is ignored because the component should never switch between controlled and uncontrolled modes.
  // `defaultOpen` and `openState` are ignored to avoid unnecessary callbacks.
  reactExports.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  reactExports.useEffect(() => {
    if (!labelId) {
      return undefined;
    }
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener('click', handler);
      return () => {
        label.removeEventListener('click', handler);
      };
    }
    return undefined;
  }, [labelId]);
  const update = (open, event) => {
    if (open) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : anchorElement.clientWidth);
      setOpenState(open);
    }
  };
  const handleMouseDown = event => {
    // Ignore everything but left-click
    if (event.button !== 0) {
      return;
    }
    // Hijack the default focus behavior.
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  const handleClose = event => {
    update(false, event);
  };
  const childrenArray = reactExports.Children.toArray(children);

  // Support autofill.
  const handleChange = event => {
    const child = childrenArray.find(childItem => childItem.props.value === event.target.value);
    if (child === undefined) {
      return;
    }
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleItemClick = child => event => {
    let newValue;

    // We use the tabindex attribute to signal the available options.
    if (!event.currentTarget.hasAttribute('tabindex')) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      setValueState(newValue);
      if (onChange) {
        // Redefine target to allow name and value to be read.
        // This allows seamless integration with the most popular form libraries.
        // https://github.com/mui/material-ui/issues/13485#issuecomment-676048492
        // Clone the event to not override `target` of the original event.
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
        Object.defineProperty(clonedEvent, 'target', {
          writable: true,
          value: {
            value: newValue,
            name
          }
        });
        onChange(clonedEvent, child);
      }
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleKeyDown = event => {
    if (!readOnly) {
      const validKeys = [' ', 'ArrowUp', 'ArrowDown',
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      'Enter'];
      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  const open = displayNode !== null && openState;
  const handleBlur = event => {
    // if open event.stopImmediatePropagation
    if (!open && onBlur) {
      // Preact support, target is read only property on a native event.
      Object.defineProperty(event, 'target', {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  delete other['aria-invalid'];
  let display;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;

  // No need to display any value if the field is empty.
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items = childrenArray.map(child => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      return null;
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(formatMuiErrorMessage(2));
      }
      selected = value.some(v => areEqualValues(v, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    return /*#__PURE__*/reactExports.cloneElement(child, {
      'aria-selected': selected ? 'true' : 'false',
      onClick: handleItemClick(child),
      onKeyUp: event => {
        if (event.key === ' ') {
          // otherwise our MenuItems dispatches a click event
          // it's not behavior of the native <option> and causes
          // the select to close immediately since we open on space keydown
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: 'option',
      selected,
      value: undefined,
      // The value is most likely not a valid HTML attribute.
      'data-value': child.props.value // Instead, we provide it as a data attribute.
    });
  });
  if (computeDisplay) {
    if (multiple) {
      if (displayMultiple.length === 0) {
        display = null;
      } else {
        display = displayMultiple.reduce((output, child, index) => {
          output.push(child);
          if (index < displayMultiple.length - 1) {
            output.push(', ');
          }
          return output;
        }, []);
      }
    } else {
      display = displaySingle;
    }
  }

  // Avoid performing a layout computation in the render method.
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = anchorElement.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== 'undefined') {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : undefined);
  const ownerState = _extends({}, props, {
    variant,
    value,
    open,
    error
  });
  const classes = useUtilityClasses$2(ownerState);
  const paperProps = _extends({}, MenuProps.PaperProps, (_MenuProps$slotProps = MenuProps.slotProps) == null ? void 0 : _MenuProps$slotProps.paper);
  const listboxId = useId();
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(SelectSelect, _extends({
      ref: handleDisplayRef,
      tabIndex: tabIndex,
      role: "combobox",
      "aria-controls": listboxId,
      "aria-disabled": disabled ? 'true' : undefined,
      "aria-expanded": open ? 'true' : 'false',
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(' ') || undefined,
      "aria-describedby": ariaDescribedby,
      onKeyDown: handleKeyDown,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus: onFocus
    }, SelectDisplayProps, {
      ownerState: ownerState,
      className: clsx(SelectDisplayProps.className, classes.select, className)
      // The id is required for proper a11y
      ,
      id: buttonId,
      children: isEmpty(display) ? // notranslate needed while Google Translate will not fix zero-width space issue
      _span || (_span = /*#__PURE__*/jsxRuntimeExports.jsx("span", {
        className: "notranslate",
        children: "\u200B"
      })) : display
    })), /*#__PURE__*/jsxRuntimeExports.jsx(SelectNativeInput, _extends({
      "aria-invalid": error,
      value: Array.isArray(value) ? value.join(',') : value,
      name: name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled: disabled,
      className: classes.nativeInput,
      autoFocus: autoFocus,
      ownerState: ownerState
    }, other)), /*#__PURE__*/jsxRuntimeExports.jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState: ownerState
    }), /*#__PURE__*/jsxRuntimeExports.jsx(Menu$1, _extends({
      id: `menu-${name || ''}`,
      anchorEl: anchorElement,
      open: open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    }, MenuProps, {
      MenuListProps: _extends({
        'aria-labelledby': labelId,
        role: 'listbox',
        'aria-multiselectable': multiple ? 'true' : undefined,
        disableListWrap: true,
        id: listboxId
      }, MenuProps.MenuListProps),
      slotProps: _extends({}, MenuProps.slotProps, {
        paper: _extends({}, paperProps, {
          style: _extends({
            minWidth: menuMinWidth
          }, paperProps != null ? paperProps.style : null)
        })
      }),
      children: items
    }))]
  });
});
var SelectInput$1 = SelectInput;

const _excluded$1 = ["autoWidth", "children", "classes", "className", "defaultOpen", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"],
  _excluded2 = ["root"];
const useUtilityClasses$1 = ownerState => {
  const {
    classes
  } = ownerState;
  return classes;
};
const styledRootConfig = {
  name: 'MuiSelect',
  overridesResolver: (props, styles) => styles.root,
  shouldForwardProp: prop => rootShouldForwardProp(prop) && prop !== 'variant',
  slot: 'Root'
};
const StyledInput = styled(Input$1, styledRootConfig)('');
const StyledOutlinedInput = styled(OutlinedInput$1, styledRootConfig)('');
const StyledFilledInput = styled(FilledInput$1, styledRootConfig)('');
const Select = /*#__PURE__*/reactExports.forwardRef(function Select(inProps, ref) {
  const props = useDefaultProps({
    name: 'MuiSelect',
    props: inProps
  });
  const {
      autoWidth = false,
      children,
      classes: classesProp = {},
      className,
      defaultOpen = false,
      displayEmpty = false,
      IconComponent = ArrowDropDownIcon,
      id,
      input,
      inputProps,
      label,
      labelId,
      MenuProps,
      multiple = false,
      native = false,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps,
      variant: variantProp = 'outlined'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
  const inputComponent = native ? NativeSelectInput$1 : SelectInput$1;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'error']
  });
  const variant = fcs.variant || variantProp;
  const ownerState = _extends({}, props, {
    variant,
    classes: classesProp
  });
  const classes = useUtilityClasses$1(ownerState);
  const restOfClasses = _objectWithoutPropertiesLoose(classes, _excluded2);
  const InputComponent = input || {
    standard: /*#__PURE__*/jsxRuntimeExports.jsx(StyledInput, {
      ownerState: ownerState
    }),
    outlined: /*#__PURE__*/jsxRuntimeExports.jsx(StyledOutlinedInput, {
      label: label,
      ownerState: ownerState
    }),
    filled: /*#__PURE__*/jsxRuntimeExports.jsx(StyledFilledInput, {
      ownerState: ownerState
    })
  }[variant];
  const inputComponentRef = useForkRef(ref, InputComponent.ref);
  return /*#__PURE__*/jsxRuntimeExports.jsx(reactExports.Fragment, {
    children: /*#__PURE__*/reactExports.cloneElement(InputComponent, _extends({
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent,
      inputProps: _extends({
        children,
        error: fcs.error,
        IconComponent,
        variant,
        type: undefined,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple
      }, native ? {
        id
      } : {
        autoWidth,
        defaultOpen,
        displayEmpty,
        labelId,
        MenuProps,
        onClose,
        onOpen,
        open,
        renderValue,
        SelectDisplayProps: _extends({
          id
        }, SelectDisplayProps)
      }, inputProps, {
        classes: inputProps ? deepmerge(restOfClasses, inputProps.classes) : restOfClasses
      }, input ? input.props.inputProps : {})
    }, (multiple && native || displayEmpty) && variant === 'outlined' ? {
      notched: true
    } : {}, {
      ref: inputComponentRef,
      className: clsx(InputComponent.props.className, className, classes.root)
    }, !input && {
      variant
    }, other))
  });
});
Select.muiName = 'Select';
var Select$1 = Select;

function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}
generateUtilityClasses('MuiTextField', ['root']);

const _excluded = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"];
const variantComponent = {
  standard: Input$1,
  filled: FilledInput$1,
  outlined: OutlinedInput$1
};
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
const TextFieldRoot = styled(FormControl$1, {
  name: 'MuiTextField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * - [FormControl](/material-ui/api/form-control/)
 * - [InputLabel](/material-ui/api/input-label/)
 * - [FilledInput](/material-ui/api/filled-input/)
 * - [OutlinedInput](/material-ui/api/outlined-input/)
 * - [Input](/material-ui/api/input/)
 * - [FormHelperText](/material-ui/api/form-helper-text/)
 *
 * If you wish to alter the props applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * - using the upper case props for passing values directly to the components
 * - using the underlying components directly as shown in the demos
 */
const TextField = /*#__PURE__*/reactExports.forwardRef(function TextField(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTextField'
  });
  const {
      autoComplete,
      autoFocus = false,
      children,
      className,
      color = 'primary',
      defaultValue,
      disabled = false,
      error = false,
      FormHelperTextProps,
      fullWidth = false,
      helperText,
      id: idOverride,
      InputLabelProps,
      inputProps,
      InputProps,
      inputRef,
      label,
      maxRows,
      minRows,
      multiline = false,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required = false,
      rows,
      select = false,
      SelectProps,
      type,
      value,
      variant = 'outlined'
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const InputMore = {};
  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }
    InputMore.label = label;
  }
  if (select) {
    // unset defaults from textbox inputs
    if (!SelectProps || !SelectProps.native) {
      InputMore.id = undefined;
    }
    InputMore['aria-describedby'] = undefined;
  }
  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;
  const InputComponent = variantComponent[variant];
  const InputElement = /*#__PURE__*/jsxRuntimeExports.jsx(InputComponent, _extends({
    "aria-describedby": helperTextId,
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    defaultValue: defaultValue,
    fullWidth: fullWidth,
    multiline: multiline,
    name: name,
    rows: rows,
    maxRows: maxRows,
    minRows: minRows,
    type: type,
    value: value,
    id: id,
    inputRef: inputRef,
    onBlur: onBlur,
    onChange: onChange,
    onFocus: onFocus,
    placeholder: placeholder,
    inputProps: inputProps
  }, InputMore, InputProps));
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TextFieldRoot, _extends({
    className: clsx(classes.root, className),
    disabled: disabled,
    error: error,
    fullWidth: fullWidth,
    ref: ref,
    required: required,
    color: color,
    variant: variant,
    ownerState: ownerState
  }, other, {
    children: [label != null && label !== '' && /*#__PURE__*/jsxRuntimeExports.jsx(InputLabel$1, _extends({
      htmlFor: id,
      id: inputLabelId
    }, InputLabelProps, {
      children: label
    })), select ? /*#__PURE__*/jsxRuntimeExports.jsx(Select$1, _extends({
      "aria-describedby": helperTextId,
      id: id,
      labelId: inputLabelId,
      value: value,
      input: InputElement
    }, SelectProps, {
      children: children
    })) : InputElement, helperText && /*#__PURE__*/jsxRuntimeExports.jsx(FormHelperText$1, _extends({
      id: helperTextId
    }, FormHelperTextProps, {
      children: helperText
    }))]
  }));
});
var TextField$1 = TextField;

export { Autocomplete$1 as A, Chip$1 as C, FormControl$1 as F, TextField$1 as T, formControlState as f };
//# sourceMappingURL=TextField-c0db7478.js.map
