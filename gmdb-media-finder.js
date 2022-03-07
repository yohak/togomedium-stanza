import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-f44e302d.js';
import { _ as _objectWithoutPropertiesLoose, M as propToStyleFunction, N as isPlainObject, O as useTheme, y as jsxRuntime, T as ThemeContext, Q as useTheme$1, A as generateUtilityClass, B as generateUtilityClasses, D as styled, h as capitalize, H as useThemeProps, K as composeClasses, J as clsx, U as rootShouldForwardProp, G as alpha, V as resolveProps, r as useControlled, l as createSvgIcon, u as useEnhancedEffect, v as useForkRef, p as ownerWindow, m as debounce, I as useTheme$2, t as useEventCallback, o as ownerDocument, W as ROUNDED_CORNER, C as COLOR_WHITE, S as SIZE1, X as SIZE2, Y as SIZE05, Z as FONT_WEIGHT_MEDIUM, c as jsxs, j as jsx, g as COLOR_GRAY_LINE, e as COLOR_PRIMARY, d as COLOR_GRAY700, $ as FONT_WEIGHT_BOLD, a as SIZE4, a0 as Fragment, a1 as COLOR_GRAY300, a2 as COLOR_GRAY400, a3 as COLOR_GRAY_BG, a4 as createTheme, F as FONT_EN, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-d90cd57a.js';
import { _ as _extends, r as react, T as ThemeContext$1, k as keyframes, c as css, d as dist, j as jsx$1 } from './index-6aec0cc7.js';
import { R as Recoil_index_6, a as Recoil_index_18, b as Recoil_index_22, f as PATH_MEDIUM, i as API_ALL_COMPONENTS, j as API_MEDIA_BY_ATTRIBUTES, g as PATH_ORGANISM, c as clone, k as API_ORGANISMS_BY_PHENOTYPES, l as API_MEDIA_BY_TAXON, T as Tooltip, m as IconNoChildren, I as IconCompact, d as IconExpand, n as API_TAXONOMY_CHILDREN, h as Recoil_index_4 } from './paths-0099bcd1.js';
import { B as ButtonBase, u as useFormControl, L as ListContext, T as TextField, C as Chip, A as Autocomplete, S as Slider, F as FormControl, I as InputLabel, a as Select } from './TextField-f1b8b2fc.js';
import { g as getData } from './getData-d291c717.js';
import { i as importWebFontForTogoMedium } from './stanza-4b95c663.js';

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
} // Based on https://stackoverflow.com/a/24394376

function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft; // Perform the calculations only when direction is rtl to avoid messing up the ltr behavior

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

const _excluded$b = ["sx"];

const splitProps = props => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach(prop => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};

function extendSxProp(props) {
  const {
    sx: inSx
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$b);

  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;

  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === 'function') {
    finalSx = (...args) => {
      const result = inSx(...args);

      if (!isPlainObject(result)) {
        return systemProps;
      }

      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }

  return _extends({}, otherProps, {
    sx: finalSx
  });
}

const hasSymbol = typeof Symbol === 'function' && Symbol.for;
var nested = hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__';

function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, localTheme);
}
/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */


function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();

  const theme = react.exports.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);

    if (output != null) {
      output[nested] = outerTheme !== null;
    }

    return output;
  }, [localTheme, outerTheme]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(ThemeContext.Provider, {
    value: theme,
    children: children
  });
}

function InnerThemeProvider(props) {
  const theme = useTheme$1();
  return /*#__PURE__*/jsxRuntime.exports.jsx(ThemeContext$1.Provider, {
    value: typeof theme === 'object' ? theme : {},
    children: props.children
  });
}
/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */

function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /*#__PURE__*/jsxRuntime.exports.jsx(ThemeProvider$1, {
    theme: localTheme,
    children: /*#__PURE__*/jsxRuntime.exports.jsx(InnerThemeProvider, {
      children: children
    })
  });
}

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const _excluded$a = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];

const useUtilityClasses$9 = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${capitalize(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};

const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(({
  theme,
  ownerState
}) => _extends({
  margin: 0
}, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
  textAlign: ownerState.align
}, ownerState.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, ownerState.gutterBottom && {
  marginBottom: '0.35em'
}, ownerState.paragraph && {
  marginBottom: 16
}));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
}; // TODO v6: deprecate these color values in v5.x and remove the transformation in v6

const colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};

const transformDeprecatedColors = color => {
  return colorTransformations[color] || color;
};

const Typography = /*#__PURE__*/react.exports.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const color = transformDeprecatedColors(themeProps.color);
  const props = extendSxProp(_extends({}, themeProps, {
    color
  }));

  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$a);

  const ownerState = _extends({}, props, {
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });

  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$9(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other));
});
var Typography$1 = Typography;

function getButtonUtilityClass(slot) {
  return generateUtilityClass('MuiButton', slot);
}
const buttonClasses = generateUtilityClasses('MuiButton', ['root', 'text', 'textInherit', 'textPrimary', 'textSecondary', 'outlined', 'outlinedInherit', 'outlinedPrimary', 'outlinedSecondary', 'contained', 'containedInherit', 'containedPrimary', 'containedSecondary', 'disableElevation', 'focusVisible', 'disabled', 'colorInherit', 'textSizeSmall', 'textSizeMedium', 'textSizeLarge', 'outlinedSizeSmall', 'outlinedSizeMedium', 'outlinedSizeLarge', 'containedSizeSmall', 'containedSizeMedium', 'containedSizeLarge', 'sizeMedium', 'sizeSmall', 'sizeLarge', 'fullWidth', 'startIcon', 'endIcon', 'iconSizeSmall', 'iconSizeMedium', 'iconSizeLarge']);
var buttonClasses$1 = buttonClasses;

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = /*#__PURE__*/react.exports.createContext({});

var ButtonGroupContext$1 = ButtonGroupContext;

const _excluded$9 = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];

const useUtilityClasses$8 = ownerState => {
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

const ButtonRoot = styled(ButtonBase, {
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
}) => _extends({}, theme.typography.button, {
  minWidth: 64,
  padding: '6px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
    duration: theme.transitions.duration.short
  }),
  '&:hover': _extends({
    textDecoration: 'none',
    backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
    border: `1px solid ${theme.palette[ownerState.color].main}`,
    backgroundColor: alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }, ownerState.variant === 'contained' && {
    backgroundColor: theme.palette.grey.A100,
    boxShadow: theme.shadows[4],
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.grey[300]
    }
  }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
    backgroundColor: theme.palette[ownerState.color].dark,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette[ownerState.color].main
    }
  }),
  '&:active': _extends({}, ownerState.variant === 'contained' && {
    boxShadow: theme.shadows[8]
  }),
  [`&.${buttonClasses$1.focusVisible}`]: _extends({}, ownerState.variant === 'contained' && {
    boxShadow: theme.shadows[6]
  }),
  [`&.${buttonClasses$1.disabled}`]: _extends({
    color: theme.palette.action.disabled
  }, ownerState.variant === 'outlined' && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, ownerState.variant === 'outlined' && ownerState.color === 'secondary' && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, ownerState.variant === 'contained' && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  })
}, ownerState.variant === 'text' && {
  padding: '6px 8px'
}, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].main
}, ownerState.variant === 'outlined' && {
  padding: '5px 15px',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
}, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].main,
  border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`
}, ownerState.variant === 'contained' && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
  color: theme.palette[ownerState.color].contrastText,
  backgroundColor: theme.palette[ownerState.color].main
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
}), ({
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
const Button = /*#__PURE__*/react.exports.forwardRef(function Button(inProps, ref) {
  // props priority: `inProps` > `contextProps` > `themeDefaultProps`
  const contextProps = react.exports.useContext(ButtonGroupContext$1);
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
        other = _objectWithoutPropertiesLoose(props, _excluded$9);

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

  const classes = useUtilityClasses$8(ownerState);

  const startIcon = startIconProp && /*#__PURE__*/jsxRuntime.exports.jsx(ButtonStartIcon, {
    className: classes.startIcon,
    ownerState: ownerState,
    children: startIconProp
  });

  const endIcon = endIconProp && /*#__PURE__*/jsxRuntime.exports.jsx(ButtonEndIcon, {
    className: classes.endIcon,
    ownerState: ownerState,
    children: endIconProp
  });

  return /*#__PURE__*/jsxRuntime.exports.jsxs(ButtonRoot, _extends({
    ownerState: ownerState,
    className: clsx(className, contextProps.className),
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

const _excluded$8 = ["autoFocus", "checked", "checkedIcon", "className", "defaultChecked", "disabled", "disableFocusRipple", "edge", "icon", "id", "inputProps", "inputRef", "name", "onBlur", "onChange", "onFocus", "readOnly", "required", "tabIndex", "type", "value"];

const useUtilityClasses$7 = ownerState => {
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

const SwitchBaseRoot = styled(ButtonBase, {
  skipSx: true
})(({
  ownerState
}) => _extends({
  padding: 9,
  borderRadius: '50%'
}, ownerState.edge === 'start' && {
  marginLeft: ownerState.size === 'small' ? -3 : -12
}, ownerState.edge === 'end' && {
  marginRight: ownerState.size === 'small' ? -3 : -12
}));
const SwitchBaseInput = styled('input', {
  skipSx: true
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

const SwitchBase = /*#__PURE__*/react.exports.forwardRef(function SwitchBase(props, ref) {
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
    required,
    tabIndex,
    type,
    value
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$8);

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

  const classes = useUtilityClasses$7(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(SwitchBaseRoot, _extends({
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
    children: [/*#__PURE__*/jsxRuntime.exports.jsx(SwitchBaseInput, _extends({
      autoFocus: autoFocus,
      checked: checkedProp,
      defaultChecked: defaultChecked,
      className: classes.input,
      disabled: disabled,
      id: hasLabelFor && id,
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
}); // NB: If changed, please update Checkbox, Switch and Radio
var SwitchBase$1 = SwitchBase;

var CheckBoxOutlineBlankIcon = createSvgIcon( /*#__PURE__*/jsxRuntime.exports.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}), 'CheckBoxOutlineBlank');

var CheckBoxIcon = createSvgIcon( /*#__PURE__*/jsxRuntime.exports.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}), 'CheckBox');

var IndeterminateCheckBoxIcon = createSvgIcon( /*#__PURE__*/jsxRuntime.exports.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}), 'IndeterminateCheckBox');

function getCheckboxUtilityClass(slot) {
  return generateUtilityClass('MuiCheckbox', slot);
}
const checkboxClasses = generateUtilityClasses('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary']);
var checkboxClasses$1 = checkboxClasses;

const _excluded$7 = ["checkedIcon", "color", "icon", "indeterminate", "indeterminateIcon", "inputProps", "size"];

const useUtilityClasses$6 = ownerState => {
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
  color: theme.palette.text.secondary
}, !ownerState.disableRipple && {
  '&:hover': {
    backgroundColor: alpha(ownerState.color === 'default' ? theme.palette.action.active : theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, ownerState.color !== 'default' && {
  [`&.${checkboxClasses$1.checked}, &.${checkboxClasses$1.indeterminate}`]: {
    color: theme.palette[ownerState.color].main
  },
  [`&.${checkboxClasses$1.disabled}`]: {
    color: theme.palette.action.disabled
  }
}));

const defaultCheckedIcon = /*#__PURE__*/jsxRuntime.exports.jsx(CheckBoxIcon, {});

const defaultIcon = /*#__PURE__*/jsxRuntime.exports.jsx(CheckBoxOutlineBlankIcon, {});

const defaultIndeterminateIcon = /*#__PURE__*/jsxRuntime.exports.jsx(IndeterminateCheckBoxIcon, {});

const Checkbox = /*#__PURE__*/react.exports.forwardRef(function Checkbox(inProps, ref) {
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
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$7);

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  const ownerState = _extends({}, props, {
    color,
    indeterminate,
    size
  });

  const classes = useUtilityClasses$6(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(CheckboxRoot, _extends({
    type: "checkbox",
    inputProps: _extends({
      'data-indeterminate': indeterminate
    }, inputProps),
    icon: /*#__PURE__*/react.exports.cloneElement(icon, {
      fontSize: (_icon$props$fontSize = icon.props.fontSize) != null ? _icon$props$fontSize : size
    }),
    checkedIcon: /*#__PURE__*/react.exports.cloneElement(indeterminateIcon, {
      fontSize: (_indeterminateIcon$pr = indeterminateIcon.props.fontSize) != null ? _indeterminateIcon$pr : size
    }),
    ownerState: ownerState,
    ref: ref
  }, other, {
    classes: classes
  }));
});
var Checkbox$1 = Checkbox;

function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}
generateUtilityClasses('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);

const _excluded$6 = ["className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"];

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

const useUtilityClasses$5 = ownerState => {
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
  color: theme.palette[ownerState.color].main
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

const CircularProgress = /*#__PURE__*/react.exports.forwardRef(function CircularProgress(inProps, ref) {
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
        other = _objectWithoutPropertiesLoose(props, _excluded$6);

  const ownerState = _extends({}, props, {
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant
  });

  const classes = useUtilityClasses$5(ownerState);
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

  return /*#__PURE__*/jsxRuntime.exports.jsx(CircularProgressRoot, _extends({
    className: clsx(classes.root, className),
    style: _extends({
      width: size,
      height: size
    }, rootStyle, style),
    ownerState: ownerState,
    ref: ref,
    role: "progressbar"
  }, rootProps, other, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(CircularProgressSVG, {
      className: classes.svg,
      ownerState: ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: /*#__PURE__*/jsxRuntime.exports.jsx(CircularProgressCircle, {
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

const dividerClasses = generateUtilityClasses('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);
var dividerClasses$1 = dividerClasses;

function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}
const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label']);
var formControlLabelClasses$1 = formControlLabelClasses;

const _excluded$5 = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "value"];

const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    disabled,
    labelPlacement
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`],
    label: ['label', disabled && 'disabled']
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};

const FormControlLabelRoot = styled('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses$1.label}`]: styles.label
    }, styles.root, styles[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${formControlLabelClasses$1.disabled}`]: {
    cursor: 'default'
  }
}, ownerState.labelPlacement === 'start' && {
  flexDirection: 'row-reverse',
  marginLeft: 16,
  // used for row presentation of radio/checkbox
  marginRight: -11
}, ownerState.labelPlacement === 'top' && {
  flexDirection: 'column-reverse',
  marginLeft: 16
}, ownerState.labelPlacement === 'bottom' && {
  flexDirection: 'column',
  marginLeft: 16
}, {
  [`& .${formControlLabelClasses$1.label}`]: {
    [`&.${formControlLabelClasses$1.disabled}`]: {
      color: theme.palette.text.disabled
    }
  }
}));
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

const FormControlLabel = /*#__PURE__*/react.exports.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });

  const {
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    label,
    labelPlacement = 'end'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$5);

  const muiFormControl = useFormControl();
  let disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  const ownerState = _extends({}, props, {
    disabled,
    label,
    labelPlacement
  });

  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(FormControlLabelRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/react.exports.cloneElement(control, controlProps), label.type === Typography$1 || disableTypography ? label : /*#__PURE__*/jsxRuntime.exports.jsx(Typography$1, _extends({
      component: "span",
      className: classes.label
    }, componentsProps.typography, {
      children: label
    }))]
  }));
});
var FormControlLabel$1 = FormControlLabel;

const listItemIconClasses = generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
var listItemIconClasses$1 = listItemIconClasses;

const listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
var listItemTextClasses$1 = listItemTextClasses;

function getMenuItemUtilityClass(slot) {
  return generateUtilityClass('MuiMenuItem', slot);
}
const menuItemClasses = generateUtilityClasses('MuiMenuItem', ['root', 'focusVisible', 'dense', 'disabled', 'divider', 'gutters', 'selected']);
var menuItemClasses$1 = menuItemClasses;

const _excluded$4 = ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex"];
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};

const useUtilityClasses$3 = ownerState => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ['root', dense && 'dense', disabled && 'disabled', !disableGutters && 'gutters', divider && 'divider', selected && 'selected']
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap'
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, {
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${menuItemClasses$1.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses$1.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${menuItemClasses$1.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  },
  [`& + .${dividerClasses$1.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses$1.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses$1.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses$1.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses$1.root}`]: {
    minWidth: 36
  }
}, !ownerState.dense && {
  [theme.breakpoints.up('sm')]: {
    minHeight: 'auto'
  }
}, ownerState.dense && _extends({
  minHeight: 32,
  // https://material.io/components/menus#specs > Dense
  paddingTop: 4,
  paddingBottom: 4
}, theme.typography.body2, {
  [`& .${listItemIconClasses$1.root} svg`]: {
    fontSize: '1.25rem'
  }
})));
const MenuItem = /*#__PURE__*/react.exports.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMenuItem'
  });

  const {
    autoFocus = false,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$4);

  const context = react.exports.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters
  };
  const menuItemRef = react.exports.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      }
    }
  }, [autoFocus]);

  const ownerState = _extends({}, props, {
    dense: childContext.dense,
    divider,
    disableGutters
  });

  const classes = useUtilityClasses$3(props);
  const handleRef = useForkRef(menuItemRef, ref);
  let tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/jsxRuntime.exports.jsx(MenuItemRoot, _extends({
      ref: handleRef,
      role: role,
      tabIndex: tabIndex,
      component: component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName)
    }, other, {
      ownerState: ownerState,
      classes: classes
    }))
  });
});
var MenuItem$1 = MenuItem;

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

const TabRoot = styled(ButtonBase, {
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
    opacity: theme.palette.action.disabledOpacity
  }
}, ownerState.textColor === 'primary' && {
  color: theme.palette.text.secondary,
  [`&.${tabClasses$1.selected}`]: {
    color: theme.palette.primary.main
  },
  [`&.${tabClasses$1.disabled}`]: {
    color: theme.palette.text.disabled
  }
}, ownerState.textColor === 'secondary' && {
  color: theme.palette.text.secondary,
  [`&.${tabClasses$1.selected}`]: {
    color: theme.palette.secondary.main
  },
  [`&.${tabClasses$1.disabled}`]: {
    color: theme.palette.text.disabled
  }
}, ownerState.fullWidth && {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: 0,
  maxWidth: 'none'
}, ownerState.wrapped && {
  fontSize: theme.typography.pxToRem(12)
}));
const Tab = /*#__PURE__*/react.exports.forwardRef(function Tab(inProps, ref) {
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
  const icon = iconProp && label && /*#__PURE__*/react.exports.isValidElement(iconProp) ? /*#__PURE__*/react.exports.cloneElement(iconProp, {
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

  return /*#__PURE__*/jsxRuntime.exports.jsxs(TabRoot, _extends({
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
    children: [iconPosition === 'top' || iconPosition === 'start' ? /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
      children: [icon, label]
    }) : /*#__PURE__*/jsxRuntime.exports.jsxs(react.exports.Fragment, {
      children: [label, icon]
    }), indicator]
  }));
});
var Tab$1 = Tab;

var KeyboardArrowLeft = createSvgIcon( /*#__PURE__*/jsxRuntime.exports.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}), 'KeyboardArrowLeft');

var KeyboardArrowRight = createSvgIcon( /*#__PURE__*/jsxRuntime.exports.jsx("path", {
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

  const scrollbarHeight = react.exports.useRef();
  const nodeRef = react.exports.useRef(null);

  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };

  react.exports.useEffect(() => {
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
  react.exports.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /*#__PURE__*/jsxRuntime.exports.jsx("div", _extends({
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

const TabScrollButtonRoot = styled(ButtonBase, {
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
const TabScrollButton = /*#__PURE__*/react.exports.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });

  const {
    className,
    direction
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded$1);

  const theme = useTheme$2();
  const isRtl = theme.direction === 'rtl';

  const ownerState = _extends({
    isRtl
  }, props);

  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntime.exports.jsx(TabScrollButtonRoot, _extends({
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    ownerState: ownerState,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _KeyboardArrowLeft || (_KeyboardArrowLeft = /*#__PURE__*/jsxRuntime.exports.jsx(KeyboardArrowLeft, {
      fontSize: "small"
    })) : _KeyboardArrowRight || (_KeyboardArrowRight = /*#__PURE__*/jsxRuntime.exports.jsx(KeyboardArrowRight, {
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
    } // Same logic as useAutocomplete.js


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
  // Hide dimensionless scrollbar on MacOS
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
  backgroundColor: theme.palette.primary.main
}, ownerState.indicatorColor === 'secondary' && {
  backgroundColor: theme.palette.secondary.main
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
  // Hide dimensionless scrollbar on MacOS
  scrollbarWidth: 'none',
  // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Safari + Chrome

  }
});
const defaultIndicatorStyle = {};
const Tabs = /*#__PURE__*/react.exports.forwardRef(function Tabs(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiTabs'
  });
  const theme = useTheme$2();
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

  const [mounted, setMounted] = react.exports.useState(false);
  const [indicatorStyle, setIndicatorStyle] = react.exports.useState(defaultIndicatorStyle);
  const [displayScroll, setDisplayScroll] = react.exports.useState({
    start: false,
    end: false
  });
  const [scrollerStyle, setScrollerStyle] = react.exports.useState({
    overflow: 'hidden',
    scrollbarWidth: 0
  });
  const valueToIndex = new Map();
  const tabsRef = react.exports.useRef(null);
  const tabListRef = react.exports.useRef(null);

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;

    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

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
    }; // IE11 support, replace with Number.isNaN
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
      scrollValue += delta * (isRtl ? -1 : 1); // Fix for Edge

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
  }; // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
  // with CSS improves.


  const handleScrollbarSizeChange = react.exports.useCallback(scrollbarWidth => {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth
    });
  }, []);

  const getConditionalElements = () => {
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/jsxRuntime.exports.jsx(TabsScrollbarSize, {
      onChange: handleScrollbarSizeChange,
      className: clsx(classes.scrollableX, classes.hideScrollbar)
    }) : null;
    const scrollButtonsActive = displayScroll.start || displayScroll.end;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/jsxRuntime.exports.jsx(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayScroll.start
    }, TabScrollButtonProps, {
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    })) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/jsxRuntime.exports.jsx(ScrollButtonComponent, _extends({
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
        const scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction); // use 1 for the potential rounding error with browser zooms.

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
  react.exports.useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorState();
      updateScrollButtonState();
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
  const handleTabsScroll = react.exports.useMemo(() => debounce(() => {
    updateScrollButtonState();
  }), [updateScrollButtonState]);
  react.exports.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);
  react.exports.useEffect(() => {
    setMounted(true);
  }, []);
  react.exports.useEffect(() => {
    updateIndicatorState();
    updateScrollButtonState();
  });
  react.exports.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  react.exports.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);

  const indicator = /*#__PURE__*/jsxRuntime.exports.jsx(TabsIndicator, _extends({}, TabIndicatorProps, {
    className: clsx(classes.indicator, TabIndicatorProps.className),
    ownerState: ownerState,
    style: _extends({}, indicatorStyle, TabIndicatorProps.style)
  }));

  let childIndex = 0;
  const children = react.exports.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/react.exports.isValidElement(child)) {
      return null;
    }

    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/react.exports.cloneElement(child, _extends({
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
    const currentFocus = ownerDocument(list).activeElement; // Keyboard navigation assumes that [role="tab"] are siblings
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
  return /*#__PURE__*/jsxRuntime.exports.jsxs(TabsRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    as: component
  }, other, {
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/jsxRuntime.exports.jsxs(TabsScroller, {
      className: classes.scroller,
      ownerState: ownerState,
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth
      },
      ref: tabsRef,
      onScroll: handleTabsScroll,
      children: [/*#__PURE__*/jsxRuntime.exports.jsx(FlexContainer, {
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

const selectedMedia = Recoil_index_6({ key: "selectedMedia", default: [] });
const useSelectedMediaState = () => {
    return Recoil_index_18(selectedMedia);
};
const useSelectedMediaMutators = () => {
    const setSelectedMedia = Recoil_index_22(selectedMedia);
    const toggleMediumSelection = (id) => {
        setSelectedMedia((prev) => {
            let result;
            if (prev.includes(id)) {
                result = prev.filter((r) => r !== id);
            }
            else {
                result = [...prev, id];
            }
            return result;
        });
    };
    const clearSelectedMedia = () => {
        setSelectedMedia([]);
    };
    return { setSelectedMedia, toggleMediumSelection, clearSelectedMedia };
};

const ActionPane = ({ actionLabel }) => {
    const selectedMedia = useSelectedMediaState();
    const { clearSelectedMedia } = useSelectedMediaMutators();
    return (jsxs("div", Object.assign({ css: wrapper$8 }, { children: [jsx("p", Object.assign({ className: "info" }, { children: getInfoText$2(selectedMedia.length) }), void 0), jsxs("div", Object.assign({ css: buttonWrapper }, { children: [jsx(Button$1, Object.assign({ variant: "contained", disableElevation: true, disabled: selectedMedia.length === 0, sx: { textTransform: "none" } }, { children: actionLabel }), void 0), jsx(Button$1, Object.assign({ variant: "outlined", onClick: clearSelectedMedia, sx: { textTransform: "none" } }, { children: "Clear selection" }), void 0)] }), void 0)] }), void 0));
};
const getInfoText$2 = (mediaLength) => {
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
const wrapper$8 = css `
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
    return (jsxs("div", Object.assign({ css: wrapper$7 }, { children: [jsx("a", Object.assign({ css: idCol$1, href: `${PATH_MEDIUM}${id}`, target: "_blank", rel: "noreferrer" }, { children: id }), void 0), jsx("span", Object.assign({ css: labelCol$1 }, { children: label }), void 0), jsx("span", Object.assign({ css: checkCol$1 }, { children: jsx(Checkbox$1, { checked: isChecked, onClick: () => onClick(id) }, void 0) }), void 0)] }), void 0));
};
const wrapper$7 = css `
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
const idCol$1 = css `
  flex-shrink: 0;
  flex-grow: 0;
  width: 90px;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
`;
const labelCol$1 = css `
  flex-grow: 1;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const checkCol$1 = css `
  flex-shrink: 0;
`;

const deepEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

const useResetScroll = (scrollInner, data) => {
    react.exports.useEffect(() => {
        if (!scrollInner.current)
            return;
        scrollInner.current.scrollTop = 0;
    }, [data]);
};

const foundMedia = Recoil_index_6({ key: "foundMedia", default: [] });
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

const MediaList = ({ css, className }) => {
    const isMediaLoading = useIsMediaLoading();
    const scrollInnerRef = react.exports.useRef(null);
    const { data, toggleChecked } = useMediaList();
    useResetScroll(scrollInnerRef, data);
    return (jsxs("div", Object.assign({ css: [wrapper$6, css], className: className }, { children: [isMediaLoading && (jsx("div", Object.assign({ css: loadingIndicator$1 }, { children: jsx(CircularProgress$1, { color: "inherit", size: 40 }, void 0) }), void 0)), jsx("div", Object.assign({ css: inner$2, ref: scrollInnerRef }, { children: data.map((item) => (jsx(MediaListItem, Object.assign({}, item, { onClick: toggleChecked }), item.id))) }), void 0)] }), void 0));
};
const wrapper$6 = css `
  overflow: hidden;
  position: relative;
`;
const inner$2 = css `
  max-height: 100%;
  overflow-y: auto;
`;
const loadingIndicator$1 = css `
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
const useMediaList = () => {
    const [data, setData] = react.exports.useState([]);
    const foundMedia = useFoundMediaState();
    const selectedMedia = useSelectedMediaState();
    const { toggleMediumSelection, setSelectedMedia } = useSelectedMediaMutators();
    const toggleChecked = (id) => {
        toggleMediumSelection(id);
    };
    react.exports.useEffect(() => {
        const result = foundMedia.map((medium) => {
            return {
                id: medium.id,
                label: medium.label,
                isChecked: selectedMedia.includes(medium.id),
            };
        });
        setData(result);
        const updatedSelection = selectedMedia.filter((id) => result.find((info) => info.id === id));
        if (!deepEqual(updatedSelection, selectedMedia)) {
            setSelectedMedia(updatedSelection);
        }
    }, [foundMedia, selectedMedia]);
    return { data, toggleChecked };
};

const queryDataToInfoText = (data) => {
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

const queryData = Recoil_index_6({ key: "queryData", default: {} });
const useQueryDataState = () => {
    return Recoil_index_18(queryData);
};
const useQueryDataMutators = () => {
    const setQueryData = Recoil_index_22(queryData);
    return { setQueryData };
};

const QueryInfo = () => {
    const queryData = useQueryDataState();
    return (jsxs("div", Object.assign({ css: wrapper$5 }, { children: [jsx("p", { children: "Queried with:" }, void 0), jsx("p", { children: queryDataToInfoText(queryData) }, void 0)] }), void 0));
};
const wrapper$5 = css `
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

const MediaSelectPane = ({ css, className }) => {
    const foundMedia = useFoundMediaState();
    const isLoading = useIsMediaLoading();
    return (jsxs("div", Object.assign({ css: [wrapper$4, css], className: className }, { children: [jsx(QueryInfo, {}, void 0), jsx("p", Object.assign({ css: infoTextCSS$1 }, { children: getInfoText$1(foundMedia.length, isLoading) }), void 0), jsx(MediaList, { css: list }, void 0)] }), void 0));
};
const wrapper$4 = css `
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const infoTextCSS$1 = css `
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-top: ${SIZE4};
  margin-bottom: ${SIZE1};
`;
const list = css `
  flex-grow: 1;
`;
const getInfoText$1 = (mediaLength, isLoading) => {
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

const ComponentSelect = ({ onChangeSelection }) => {
    const [loading, setLoading] = react.exports.useState(false);
    const onOpen = () => {
        if (components.length)
            return;
        setLoading(true);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield getData(API_ALL_COMPONENTS, {});
            if (response.body) {
                setComponents(response.body.map((item) => ({
                    id: item.gmo_id,
                    label: item.name,
                })));
            }
            setLoading(false);
        }))();
    };
    const [components, setComponents] = react.exports.useState([]);
    const onChange = (e, value) => {
        onChangeSelection(value.map((v) => v.id));
    };
    return (jsx(Autocomplete, { multiple: true, filterSelectedOptions: true, onChange: onChange, onOpen: onOpen, disablePortal: true, options: components, loading: loading, getOptionLabel: (option) => option.label, renderInput: (params) => (jsx(TextField, Object.assign({}, params, { label: "Components", InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (jsxs(Fragment, { children: [loading ? jsx(CircularProgress$1, { color: "inherit", size: 20 }, void 0) : null, params.InputProps.endAdornment] }, void 0)) }) }), void 0)), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined" }, getTagProps({ index }), { label: option.label, key: option.id })))) }, void 0));
};

const AttributesSection = () => {
    const { setFoundMedia } = useFoundMediaMutators();
    const { setQueryData } = useQueryDataMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const onChangeSelection = (ids) => {
        if (ids.length === 0) {
            setQueryData({});
            setFoundMedia([]);
            setNextMediaLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const params = { gmo_ids: ids };
            setQueryData(params);
            const abort = new AbortController();
            setNextMediaLoadAbort(abort);
            const response = yield getData(API_MEDIA_BY_ATTRIBUTES, params, abort);
            setNextMediaLoadAbort(null);
            if (response.body) {
                setFoundMedia(response.body.map((item) => ({
                    id: item.gm_id,
                    label: item.name,
                })));
            }
        }))();
    };
    return (jsx("div", { children: jsx(ComponentSelect, { onChangeSelection: onChangeSelection }, void 0) }, void 0));
};

const OrganismListItem = ({ css, className, id, label, isChecked, onClick }) => {
    return (jsxs("div", Object.assign({ css: [organismListItem, css], className: className }, { children: [jsxs("div", Object.assign({ css: listInner }, { children: [jsx("span", Object.assign({ css: labelCol }, { children: label }), void 0), jsxs("a", Object.assign({ css: idCol, href: `${PATH_ORGANISM}${id}`, target: "_blank", rel: "noreferrer" }, { children: ["[tax_id:", id, "]"] }), void 0)] }), void 0), jsx("span", Object.assign({ css: checkCol }, { children: jsx(Checkbox$1, { checked: isChecked, onClick: () => onClick(id) }, void 0) }), void 0)] }), void 0));
};
const organismListItem = css `
  & + & {
    border-top: none;
  }
  display: flex;
  justify-content: space-between;
  background-color: ${COLOR_WHITE};
  border: 1px solid ${COLOR_GRAY_LINE};
  padding: 0 ${SIZE1};
  align-items: center;
`;
const listInner = css `
  display: flex;
  gap: ${SIZE2};
  flex-shrink: 0;
  flex-grow: 0;
  width: calc(100% - 40px);
`;
const idCol = css `
  flex-shrink: 0;
  flex-grow: 0;
  width: 100px;
  color: ${COLOR_PRIMARY};
  text-decoration: none;
`;
const labelCol = css `
  flex-grow: 0;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const checkCol = css `
  flex-shrink: 0;
  flex-grow: 0;
`;

const foundOrganisms = Recoil_index_6({ key: "foundOrganisms", default: [] });
const useFoundOrganismsState = () => {
    return Recoil_index_18(foundOrganisms);
};
const useFoundOrganismsMutators = () => {
    const setFoundOrganisms = Recoil_index_22(foundOrganisms);
    return { setFoundOrganisms };
};

const organismLoadAbort = Recoil_index_6({
    key: "organismLoadAbort",
    default: null,
});
const useIsOrganismLoading = () => {
    return !!Recoil_index_18(organismLoadAbort);
};
const useOrganismLoadAbortMutators = () => {
    const setOrganismLoadAbort = Recoil_index_22(organismLoadAbort);
    const abortCurrentLoading = () => {
        let result = false;
        setOrganismLoadAbort((prev) => {
            if (prev) {
                prev.abort();
                result = true;
            }
            return null;
        });
        return result;
    };
    const setNextOrganismLoadAbort = (abort) => {
        setOrganismLoadAbort((prev) => {
            if (prev) {
                prev.abort();
            }
            return abort;
        });
    };
    return { abortCurrentLoading, setNextOrganismLoadAbort };
};

const selectedOrganisms = Recoil_index_6({ key: "selectedOrganisms", default: [] });
const useSelectedOrganismsState = () => {
    return Recoil_index_18(selectedOrganisms);
};
const useSelectedOrganismsMutators = () => {
    const setSelectedOrganisms = Recoil_index_22(selectedOrganisms);
    const toggleOrganismSelection = (id) => {
        setSelectedOrganisms((prev) => {
            let result;
            if (prev.includes(id)) {
                result = prev.filter((r) => r !== id);
            }
            else {
                result = [...prev, id];
            }
            return result;
        });
    };
    const clearSelectedOrganisms = () => {
        setSelectedOrganisms([]);
    };
    return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};

const OrganismList = ({ css, className }) => {
    const isOrganismLoading = useIsOrganismLoading();
    const scrollInnerRef = react.exports.useRef(null);
    const { data, toggleChecked } = useOrganismList();
    useResetScroll(scrollInnerRef, data);
    return (jsxs("div", Object.assign({ css: [organismList, css], className: className }, { children: [isOrganismLoading && (jsx("div", Object.assign({ css: loadingIndicator }, { children: jsx(CircularProgress$1, { color: "inherit", size: 40 }, void 0) }), void 0)), jsx("div", Object.assign({ css: inner$1, ref: scrollInnerRef }, { children: data.map((item) => (jsx(OrganismListItem, Object.assign({}, item, { onClick: toggleChecked }), item.id))) }), void 0)] }), void 0));
};
const organismList = css `
  background-color: ${COLOR_WHITE};
  position: relative;
  min-height: 100px;
`;
const inner$1 = css `
  max-height: 100%;
  overflow-y: auto;
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
const useOrganismList = () => {
    const [data, setData] = react.exports.useState([]);
    const foundOrganisms = useFoundOrganismsState();
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection, setSelectedOrganisms } = useSelectedOrganismsMutators();
    const toggleChecked = (id) => {
        toggleOrganismSelection(id);
    };
    react.exports.useEffect(() => {
        const result = foundOrganisms.map((organism) => {
            return {
                id: organism.id,
                label: organism.label,
                isChecked: selectedOrganisms.includes(organism.id),
            };
        });
        setData(result);
        const updatedSelection = selectedOrganisms.filter((id) => result.find((info) => info.id === id));
        if (!deepEqual(updatedSelection, selectedOrganisms)) {
            setSelectedOrganisms(updatedSelection);
        }
    }, [foundOrganisms, selectedOrganisms]);
    return { data, toggleChecked };
};

function valuetext(value) {
    return `${value}°C`;
}
const RangeSlider = ({ css, className, min, max, label, marks, queryKey, handleValueChange, handleEnabledChange, }) => {
    const [value, setValue] = react.exports.useState([min, max]);
    const [enabled, setEnabled] = react.exports.useState(false);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
    };
    const handleChangeCommitted = (event, newValue) => {
        handleValueChange(queryKey, newValue.join(","));
    };
    react.exports.useEffect(() => {
        if (enabled) {
            handleValueChange(queryKey, value.join(","));
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [enabled]);
    return (jsxs("div", Object.assign({ css: [rangeSlider, css], className: className }, { children: [jsx("div", { children: jsx("span", { children: jsx(FormControlLabel$1, { label: label, control: jsx(Checkbox$1, { onChange: handleCheckChange, css: checkBoxStyle$1 }, void 0) }, void 0) }, void 0) }, void 0), jsx(Slider, { value: value, onChange: handleSliderChange, onChangeCommitted: handleChangeCommitted, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: min, max: max, marks: marks, step: 0.1, disabled: enabled ? undefined : true }, void 0)] }), void 0));
};
const rangeSlider = css ``;
const checkBoxStyle$1 = css `
  padding-left: 0;
`;

const SelectBox = ({ css, className, label, items, queryKey, handleEnabledChange, handleValueChange, }) => {
    const [value, setValue] = react.exports.useState("");
    const [enabled, setEnabled] = react.exports.useState(false);
    const handleSelectChange = (event) => {
        setValue(event.target.value);
    };
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
        setValue("");
    };
    react.exports.useEffect(() => {
        if (enabled && value !== "") {
            handleValueChange(queryKey, value);
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [value, enabled]);
    return (jsxs("div", Object.assign({ css: [selectBox, css], className: className }, { children: [jsx(Checkbox$1, { css: checkBoxStyle, onChange: handleCheckChange }, void 0), jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [jsx(InputLabel, Object.assign({ id: queryKey }, { children: label }), void 0), jsx(Select, Object.assign({ labelId: queryKey, id: queryKey, value: value, label: label, onChange: handleSelectChange, disabled: enabled ? undefined : true }, { children: items.map(([value, name]) => (jsx(MenuItem$1, Object.assign({ value: value }, { children: name }), value))) }), void 0)] }), void 0)] }), void 0));
};
const selectBox = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
`;
const checkBoxStyle = css `
  padding-left: 0;
`;

const phenotypeQuery = Recoil_index_6({ key: "phenotypeQuery", default: {} });
const usePhenotypeQueryState = () => {
    return Recoil_index_18(phenotypeQuery);
};
const usePhenotypeQueryMutators = () => {
    const setPhenotypeQuery = Recoil_index_22(phenotypeQuery);
    const updatePhenotypeQuery = (key, value) => {
        setPhenotypeQuery((prev) => {
            const cloned = clone(prev);
            cloned[key] = value;
            return cloned;
        });
    };
    const removePhenotypeQuery = (key) => {
        setPhenotypeQuery((prev) => {
            const cloned = clone(prev);
            if (cloned[key]) {
                delete cloned[key];
            }
            return cloned;
        });
    };
    const clearPhenotypeQuery = () => {
        setPhenotypeQuery({});
    };
    return { updatePhenotypeQuery, removePhenotypeQuery, clearPhenotypeQuery };
};

const PhenotypeSearchArea = ({ css, className }) => {
    const { handleEnabledChange, handleValueChange } = usePhenotypeQuery();
    return (jsxs("div", Object.assign({ css: [phenotypeSearchArea, css], className: className }, { children: [jsx(RangeSlider, { css: sliderStyle, min: 0, max: 110, label: "Growth Temperature", marks: [
                    { value: 0, label: "0°C" },
                    { value: 37, label: "37°C" },
                    { value: 110, label: "110°C" },
                ], queryKey: "growth_temp", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(RangeSlider, { css: sliderStyle, min: 0, max: 14, label: "Growth pH", marks: [
                    { value: 0, label: "0" },
                    { value: 14, label: "14" },
                ], queryKey: "growth_ph", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(SelectBox, { label: "Oxygen requirement", items: [
                    ["MPO_04002", "Aerobe"],
                    ["MPO_04003", "Anaerobe"],
                    ["MPO_04004", "Obligate aerobe"],
                    ["MPO_04005", "Facultative aerobe"],
                    ["MPO_04006", "Obligate anaerobe"],
                    ["MPO_04007", "Facultative anaerobe"],
                    ["MPO_04009", "Microaerophilic"],
                ], queryKey: "MPO_10002", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(SelectBox, { label: "Gram Strain", queryKey: "MPO_07001", items: [
                    ["MPO_07002", "Gram+"],
                    ["MPO_07003", "Gram-"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(SelectBox, { label: "Motility", queryKey: "MPO_02000", items: [
                    ["MPO_02001", "Motile"],
                    ["MPO_02002", "Nonmotile"],
                    ["MPO_02007", "Chemotactic"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(SelectBox, { label: "Cell shape", queryKey: "MPO_01001", items: [
                    ["MPO_01015", "Rod-shaped"],
                    ["MPO_01003", "Coccus-shaped"],
                    ["MPO_01005", "Curved-shaped"],
                    ["MPO_01014", "Pleomorphic-shaped"],
                    ["MPO_01007", "Filament-shaped"],
                    ["MPO_01022", "Vibrio-shaped"],
                    ["MPO_01021", "Star-shaped"],
                    ["MPO_01026", "Triangular"],
                    ["MPO_01018", "Spiral-shaped"],
                    ["MPO_01010", "Helical-shaped"],
                    ["MPO_01013", "Ovoid-shaped"],
                    ["MPO_01012", "Oval-shaped"],
                    ["MPO_01017", "Spindle-shaped"],
                    ["MPO_01004", "Crescent-shaped"],
                    ["MPO_01009", "Fusiform"],
                    ["MPO_01020", "Square-shaped"],
                    ["MPO_01019", "Spore-shaped"],
                    ["MPO_01006", "Disc-shaped"],
                    ["MPO_01008", "Flask-shaped"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0), jsx(SelectBox, { label: "Salinity", queryKey: "MPO_03006", items: [
                    ["MPO_03007", "Halophile"],
                    ["MPO_03008", "Halotolerant"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }, void 0)] }), void 0));
};
const phenotypeSearchArea = css `
  background-color: ${COLOR_WHITE};
  padding: 0 20px;
`;
const sliderStyle = css `
  & + & {
    margin-top: 10px;
  }
`;
const usePhenotypeQuery = () => {
    const phenotypeQuery = usePhenotypeQueryState();
    const { setFoundOrganisms } = useFoundOrganismsMutators();
    const { setNextOrganismLoadAbort } = useOrganismLoadAbortMutators();
    const { updatePhenotypeQuery, removePhenotypeQuery } = usePhenotypeQueryMutators();
    const handleEnabledChange = (key, enabled) => {
        if (!enabled) {
            removePhenotypeQuery(key);
        }
    };
    const handleValueChange = (key, value) => {
        updatePhenotypeQuery(key, value);
    };
    react.exports.useEffect(() => {
        if (Object.entries(phenotypeQuery).length === 0) {
            setFoundOrganisms([]);
            setNextOrganismLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            console.log(phenotypeQuery);
            const abort = new AbortController();
            setNextOrganismLoadAbort(abort);
            const response = yield getData(API_ORGANISMS_BY_PHENOTYPES, phenotypeQuery, abort);
            setNextOrganismLoadAbort(null);
            if (response.body) {
                setFoundOrganisms(response.body.map((item) => ({ id: item.tax_id, label: item.name })));
            }
        }))();
    }, [phenotypeQuery]);
    return { handleEnabledChange, handleValueChange };
};

const PhenotypeSection = ({ css, className }) => {
    const foundOrganism = useFoundOrganismsState();
    const isLoading = useIsOrganismLoading();
    useMediaLoadFromOrganism();
    return (jsxs("div", Object.assign({ css: [phenotypeSection, css], className: className }, { children: [jsx("div", Object.assign({ css: phenotypes }, { children: jsx(PhenotypeSearchArea, {}, void 0) }), void 0), jsxs("div", Object.assign({ css: organisms }, { children: [jsx("p", Object.assign({ css: infoTextCSS }, { children: getInfoText(foundOrganism.length, isLoading) }), void 0), jsx(OrganismList, {}, void 0)] }), void 0)] }), void 0));
};
const phenotypeSection = css `
  background-color: ${COLOR_WHITE};
  display: flex;
`;
const phenotypes = css `
  max-width: 50%;
  flex-grow: 1;
  border-right-color: ${COLOR_GRAY_LINE};
  border-right-style: dashed;
  border-right-width: 2px;
  padding: ${SIZE2};
`;
const organisms = css `
  max-width: 50%;
  flex-grow: 1;
  padding: ${SIZE2};
`;
const infoTextCSS = css `
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-bottom: ${SIZE1};
`;
const getInfoText = (organismLength, isLoading) => {
    if (isLoading) {
        return "Loading...";
    }
    if (organismLength === 0) {
        return "No organisms found";
    }
    else if (organismLength === 1) {
        return "1 organism found";
    }
    else {
        return `${organismLength} organisms found`;
    }
};
const useMediaLoadFromOrganism = () => {
    const selectedOrganisms = useSelectedOrganismsState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    react.exports.useEffect(() => {
        if (selectedOrganisms.length === 0) {
            setQueryData({});
            setFoundMedia([]);
            setNextMediaLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const params = { tax_ids: selectedOrganisms };
            setQueryData(params);
            const abort = new AbortController();
            setNextMediaLoadAbort(abort);
            const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
            setNextMediaLoadAbort(null);
            if (response.body) {
                setFoundMedia(response.body.map((item) => ({
                    id: item.gm_id,
                    label: item.name,
                })));
            }
        }))();
    }, [selectedOrganisms]);
};

const queryMethod = Recoil_index_6({ key: "queryMethod", default: "Taxonomic tree" });
const useQueryMethodState = () => {
    return Recoil_index_18(queryMethod);
};
const useQueryMethodMutators = () => {
    const setQueryMethod = Recoil_index_22(queryMethod);
    return { setQueryMethod };
};

const tabNames = ["Taxonomic tree", "Organism phenotypes", "Media attributes"];
const QueryMethodTab = ({ css, className }) => {
    const queryMethod = useQueryMethodState();
    const { setQueryMethod } = useQueryMethodMutators();
    const handleChange = (event, newValue) => {
        setQueryMethod(newValue);
    };
    return (jsx("div", Object.assign({ css: [wrapper$3, css], className: className }, { children: jsx(Tabs$1, Object.assign({ value: queryMethod, onChange: handleChange }, { children: tabNames.map((label) => (jsx(Tab$1, { label: label, value: label, css: tabCSS }, label))) }), void 0) }), void 0));
};
const wrapper$3 = css `
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

const TreeBranchView = ({ label, linkString, linkURL, id, check, tag, hasChildren, isOpen, onClickCheck, onToggleChildren, children, className, css, toolTipLabel = "", }) => {
    return (jsxs("li", Object.assign({ css: [wrapper$2, css], className: className }, { children: [jsxs("div", Object.assign({ css: inner }, { children: [jsxs("div", Object.assign({ css: left }, { children: [jsx("span", Object.assign({ onClick: () => onToggleChildren(id) }, { children: jsx(ToggleIcon, Object.assign({}, { hasChildren, isOpen }), void 0) }), void 0), jsx(Tooltip, Object.assign({ title: toolTipLabel, PopperProps: { disablePortal: true }, arrow: true, placement: "top-start" }, { children: jsx("span", { children: label }, void 0) }), void 0), tag && jsx("span", Object.assign({ css: tagTip }, { children: tag }), void 0), linkString && linkURL && (jsxs("a", Object.assign({ href: linkURL, target: "_blank", rel: "noreferrer" }, { children: ["[", linkString, "]"] }), void 0))] }), void 0), jsx(Checkbox$1, { checked: check === "checked" || check === "grouped", indeterminate: check === "indeterminate", onClick: () => onClickCheck(id) }, void 0)] }), void 0), isOpen && !!children && jsx("ul", Object.assign({ css: childrenWrapper }, { children: children }), void 0)] }), void 0));
};
const ToggleIcon = ({ hasChildren, isOpen }) => {
    if (!hasChildren)
        return jsx(IconNoChildren, { css: icon }, void 0);
    if (isOpen)
        return jsx(IconCompact, { css: [icon, clickable] }, void 0);
    return jsx(IconExpand, { css: [icon, clickable] }, void 0);
};
const wrapper$2 = css `
  margin-top: -1px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const inner = css `
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  background-color: ${COLOR_WHITE};
  padding: 0 8px;
  border: 1px solid ${COLOR_GRAY_LINE};
`;
const left = css `
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  line-height: 1;
  font-size: 16px;
  a {
    font-size: 14px;
    color: ${COLOR_PRIMARY};
  }
`;
const icon = css `
  display: block;
  color: ${COLOR_GRAY300};
  width: 24px;
  height: 24px;
`;
const clickable = css `
  cursor: pointer;
  color: ${COLOR_GRAY700};
`;
const childrenWrapper = css `
  padding-left: 32px;
`;
const tagTip = css `
  font-size: 12px;
  background-color: ${COLOR_GRAY400};
  color: ${COLOR_WHITE};
  padding: 4px 6px;
  border-radius: 5px;
`;

const retrieveTaxonInfo = (info, addTaxonToList, setTaxonChildren) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const params = {
            tax_id: info.id,
        };
        console.log(info.id);
        const response = yield getData(API_TAXONOMY_CHILDREN, params);
        setTaxonChildren(info.id, (_b = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.map((item) => item.tax_id)) !== null && _b !== void 0 ? _b : []);
        (_c = response === null || response === void 0 ? void 0 : response.body) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
            addTaxonToList({
                id: item.tax_id,
                label: item.name,
                rank: item.rank,
                children: item.rank === "Species" ? [] : "not-yet",
            });
        });
    }))();
};
const findAscendants = (list, id) => {
    let iterationCount = 0;
    const result = [];
    let currentId = id;
    while (iterationCount < 255) {
        iterationCount++;
        const parent = findParent(list, currentId);
        if (parent) {
            result.unshift(parent.id);
            currentId = parent.id;
        }
        else {
            break;
        }
    }
    return result;
};
const findDescendants = (list, id) => {
    let result = [];
    const process = (currentId) => {
        const children = findChildren(list, currentId);
        if (children && dist.isArray(children)) {
            result = [...result, ...children];
            children.forEach((childId) => process(childId));
        }
    };
    process(id);
    return result;
};
const makeNewSelection = (list, id, selection) => {
    const isSelected = checkIsSelected(id, selection);
    let result = setSelection(selection, id, !isSelected);
    let currentId;
    const ascendants = findAscendants(list, id).reverse();
    const descendants = findDescendants(list, id);
    if (descendants) {
        result = setMultipleSelection(result, descendants, false);
    }
    const checkedAscendant = ascendants.find((ascendant) => result.includes(ascendant));
    if (checkedAscendant) {
        currentId = id;
        for (let i = 0; i < ascendants.length; i++) {
            const parent = ascendants[i];
            result = setSelection(result, parent, false);
            const siblings = findSiblings(list, currentId);
            result = setMultipleSelection(result, siblings, true);
            result = setSelection(result, currentId, false);
            if (checkedAscendant === parent) {
                break;
            }
            currentId = parent;
        }
    }
    currentId = id;
    for (let i = 0; i < ascendants.length; i++) {
        const parent = ascendants[i];
        const siblings = [...findSiblings(list, currentId), currentId];
        const checkedSiblings = siblings.filter((siblingId) => result.includes(siblingId));
        if (parent && checkedSiblings.length && checkedSiblings.length === siblings.length) {
            result = setMultipleSelection(result, checkedSiblings, false);
            result = setSelection(result, parent, true);
        }
        currentId = parent;
    }
    return result;
};
const checkIsSelected = (id, selection) => {
    return selection.includes(id);
};
const setSelection = (selection, id, value) => {
    const isSelected = checkIsSelected(id, selection);
    switch (true) {
        case isSelected && !value:
            return selection.filter((item) => item !== id);
        case !isSelected && value:
            return [...selection, id];
        default:
            return [...selection];
    }
};
const setMultipleSelection = (selection, ids, value) => {
    let result = [...selection];
    ids.forEach((id) => (result = setSelection(result, id, value)));
    return result;
};
const findChildren = (list, id) => { var _a; return (_a = list.find((info) => info.id === id)) === null || _a === void 0 ? void 0 : _a.children; };
const findParent = (list, id) => list.find((node) => { var _a; return (_a = node.children) === null || _a === void 0 ? void 0 : _a.includes(id); });
const findSiblings = (list, id) => {
    var _a;
    const children = (_a = findParent(list, id)) === null || _a === void 0 ? void 0 : _a.children;
    if (children && dist.isArray(children)) {
        return children.filter((myId) => myId !== id);
    }
    else {
        return [];
    }
};

const selectedTaxon = Recoil_index_6({ key: "selectedTaxon", default: [] });
const useSelectedTaxonState = () => {
    return Recoil_index_18(selectedTaxon);
};
const useSelectedTaxonMutators = () => {
    const setSelectedTaxon = Recoil_index_22(selectedTaxon);
    const clearTaxonSelect = () => setSelectedTaxon([]);
    const updateSelection = (list, id) => {
        setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
    };
    return {
        __setSelectedTaxon: setSelectedTaxon,
        clearTaxonSelect,
        updateSelection,
    };
};

const taxonList = Recoil_index_6({ key: "taxonList", default: [] });
const useTaxonListState = () => {
    return Recoil_index_18(taxonList);
};
const useTaxonListMutators = () => {
    const setTaxonList = Recoil_index_22(taxonList);
    const addTaxonToList = (taxon) => {
        if (taxon.id === "157124") {
            console.log(taxon);
        }
        setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
    };
    const setTaxonChildren = (id, children) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children })];
        });
    };
    const setTaxonAsLoading = (id) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, Object.assign(Object.assign({}, target), { children: "loading" })];
        });
    };
    return { addTaxonToList, setTaxonAsLoading, setTaxonChildren };
};

const TaxonomicTreeBranch = ({ id, css, className }) => {
    const taxonList = useTaxonListState();
    const myInfo = react.exports.useMemo(() => {
        return taxonList.find((item) => item.id === id);
    }, [taxonList, id]);
    const { branchChildren } = useBranchChildren(myInfo);
    const { label, rank } = useTaxonInfo(id, myInfo);
    const { descendants, ascendants } = useLineages(id, taxonList);
    const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
    const { ascendantsLabel } = useAscendantsLabel(ascendants);
    const [linkString, linkURL] = useLinkString(id);
    const [isOpen, setIsOpen] = react.exports.useState(false);
    const onToggleChildren = () => {
        setIsOpen((prev) => !prev);
    };
    return (jsx(TreeBranchView, Object.assign({ css: css, className: className, label: label, id: id, tag: rank, linkString: linkString, linkURL: linkURL, toolTipLabel: ascendantsLabel, check: check, hasChildren: !!branchChildren.length, isOpen: isOpen, onClickCheck: () => onClickCheck(), onToggleChildren: onToggleChildren }, { children: isOpen &&
            branchChildren.length &&
            branchChildren.map((childId) => jsx(TaxonomicTreeBranch, { id: childId }, childId)) }), void 0));
};
const useLinkString = (id) => {
    const [linkString, setLinkString] = react.exports.useState("");
    const [linkURL, setLinkURL] = react.exports.useState("");
    react.exports.useEffect(() => {
        setLinkString(`tax_id:${id}`);
        setLinkURL(`http://growthmedium.org/organism/${id}`);
    }, [id]);
    return [linkString, linkURL];
};
const useBranchChildren = (info) => {
    const [branchChildren, setBranchChildren] = react.exports.useState([]);
    const { setTaxonAsLoading, addTaxonToList, setTaxonChildren } = useTaxonListMutators();
    react.exports.useEffect(() => {
        if ((info === null || info === void 0 ? void 0 : info.children) === "not-yet") {
            setTaxonAsLoading(info.id);
            retrieveTaxonInfo(info, addTaxonToList, setTaxonChildren);
        }
        if (info && dist.isArray(info.children)) {
            setBranchChildren(info.children);
        }
    }, [info]);
    return { branchChildren };
};
const useTaxonInfo = (id, myInfo) => {
    const [rank, setRank] = react.exports.useState("");
    const [label, setLabel] = react.exports.useState("");
    react.exports.useEffect(() => {
        if (myInfo) {
            setRank(myInfo.rank);
            setLabel(myInfo.label);
        }
    }, [id, myInfo]);
    return { rank, label };
};
const useChecked = (id, taxonList, ascendants, descendants) => {
    const selectedTaxon = useSelectedTaxonState();
    const [check, setCheck] = react.exports.useState("none");
    const { updateSelection } = useSelectedTaxonMutators();
    const onClickCheck = () => {
        updateSelection(taxonList, id);
    };
    react.exports.useEffect(() => {
        const isChecked = !!selectedTaxon.find((taxId) => taxId === id);
        const isGrouped = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
        const isIndeterminate = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
        switch (true) {
            case isChecked:
                setCheck("checked");
                break;
            case isGrouped:
                setCheck("grouped");
                break;
            case isIndeterminate:
                setCheck("indeterminate");
                break;
            default:
                setCheck("none");
        }
    }, [selectedTaxon, descendants, ascendants, id]);
    return { check, onClickCheck };
};
const useLineages = (id, taxonList) => {
    const [ascendants, setAscendants] = react.exports.useState([]);
    const [descendants, setDescendants] = react.exports.useState([]);
    react.exports.useEffect(() => {
        setAscendants(findAscendants(taxonList, id));
        setDescendants(findDescendants(taxonList, id));
    }, [taxonList, id]);
    return { ascendants, descendants };
};
const useAscendantsLabel = (ascendants) => {
    const [label, setLabel] = react.exports.useState("");
    const taxonList = useTaxonListState();
    react.exports.useEffect(() => {
        setLabel(ascendants.map((id) => { var _a; return (_a = taxonList.find((taxon) => taxon.id === id)) === null || _a === void 0 ? void 0 : _a.label; }).join(" > "));
    }, [ascendants]);
    return { ascendantsLabel: label };
};
css ``;

const useInitTaxonTree = () => {
    const { addTaxonToList } = useTaxonListMutators();
    const process = () => {
        superkingdoms.forEach((info) => {
            addTaxonToList(info);
        });
    };
    react.exports.useEffect(() => {
        process();
    }, []);
};
const superkingdoms = [
    {
        id: "2157",
        label: "Archaea",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2",
        label: "Bacteria",
        rank: "Superkingdom",
        children: "not-yet",
    },
    {
        id: "2759",
        label: "Eukaryota",
        rank: "Superkingdom",
        children: "not-yet",
    },
];

const TaxonomicTreeSection = () => {
    useInitTaxonTree();
    useMediaLoadFromTaxon();
    return (jsx("div", Object.assign({ css: [taxonomicTreeSection] }, { children: jsxs("div", { children: [jsx(TaxonomicTreeBranch, { id: "2157" }, void 0), jsx(TaxonomicTreeBranch, { id: "2" }, void 0), jsx(TaxonomicTreeBranch, { id: "2759" }, void 0)] }, void 0) }), void 0));
};
const taxonomicTreeSection = css `
  //overflow: scroll;
`;
const useMediaLoadFromTaxon = () => {
    const selectedTaxon = useSelectedTaxonState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    react.exports.useEffect(() => {
        if (selectedTaxon.length === 0) {
            setQueryData({});
            setFoundMedia([]);
            setNextMediaLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const params = { tax_ids: selectedTaxon };
            setQueryData(params);
            const abort = new AbortController();
            setNextMediaLoadAbort(abort);
            const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
            setNextMediaLoadAbort(null);
            if (response.body) {
                setFoundMedia(response.body.map((item) => ({
                    id: item.gm_id,
                    label: item.name,
                })));
            }
        }))();
    }, [selectedTaxon]);
};

const QueryPane = ({ css, className }) => {
    const queryMethod = useQueryMethodState();
    return (jsxs("div", Object.assign({ css: [wrapper$1, css], className: className }, { children: [jsx(QueryMethodTab, {}, void 0), jsxs("div", Object.assign({ css: contents }, { children: [queryMethod === "Taxonomic tree" && jsx(TaxonomicTreeSection, {}, void 0), queryMethod === "Organism phenotypes" && jsx(PhenotypeSection, {}, void 0), queryMethod === "Media attributes" && jsx(AttributesSection, {}, void 0)] }), void 0)] }), void 0));
};
const wrapper$1 = css `
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
`;
const contents = css `
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;

const AppContainer = ({}) => {
    return (jsxs("div", Object.assign({ css: wrapper }, { children: [jsx("div", { children: jsx(QueryPane, { css: queryPane }, void 0) }, void 0), jsxs("div", { children: [jsx(MediaSelectPane, { css: mediaQueryPane }, void 0), jsx(ActionPane, { actionLabel: "Compare" }, void 0)] }, void 0)] }), void 0));
};
const wrapper = css `
  position: relative;
  background-color: ${COLOR_GRAY_BG};
  padding: ${SIZE1};
  min-height: 600px;
  height: 1px;
  display: flex;
  gap: ${SIZE1};
  & > * {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${SIZE1};
    &:nth-of-type(2) {
      max-width: 360px;
      min-width: 360px;
    }
  }
`;
const queryPane = css `
  flex-grow: 1;
  height: 100%;
  overflow-y: auto;
`;
const mediaQueryPane = css `
  flex-grow: 1;
`;

const App = () => {
    return jsx(AppContainer, {}, void 0);
};

const muiTheme = createTheme({
    palette: {
        primary: {
            main: COLOR_PRIMARY,
            contrastText: COLOR_WHITE,
        },
    },
    typography: {
        fontFamily: FONT_EN,
    },
    components: {
        MuiTab: {
            styleOverrides: {},
        },
        MuiButton: {
            styleOverrides: {},
        },
    },
});

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
        ReactDOM.render(jsx(react.exports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, {}, void 0) }, void 0) }), void 0) }, void 0) }, void 0), main);
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
	"@id": "gmdb-media-finder",
	"stanza:label": "Media Finder",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2022-01-01",
	"stanza:parameter": [
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
//# sourceMappingURL=gmdb-media-finder.js.map
