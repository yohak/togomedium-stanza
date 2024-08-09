import { _ as __awaiter, d as defineStanzaElement } from './stanza-a84d7c1e.js';
import { _ as _objectWithoutPropertiesLoose, q as createTheme, $ as styleFunctionSx, W as isPlainObject, E as resolveProps, a4 as handleBreakpoints, a5 as resolveBreakpointValues, a6 as createUnarySpacing, V as deepmerge, a7 as mergeBreakpointsInOrder, y as jsxRuntimeExports, a8 as getValue, A as capitalize, l as COLOR_WHITE, M as COLOR_GRAY_LINE, H as SIZE1, J as SIZE2, C as COLOR_PRIMARY, a as jsxs, j as jsx, R as Recoil_index_8, p as Recoil_index_24, o as Recoil_index_20, N as FONT_WEIGHT_BOLD, P as COLOR_GRAY700, Q as SIZE4, I as ROUNDED_CORNER, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-36ae7cf4.js';
import { u as useQuery } from './emotion-styled.browser.esm-798c6504.js';
import { _ as _extends, r as reactExports, c as css, g as getData, j as jsx$1 } from './getData-1a784a8c.js';
import { b as PATH_TAXON } from './consts-55c53200.js';
import { f as useFormControl, C as Checkbox, h as hasInfo, g as filterOutInfo, P as Pagination, i as hasIdOfLabel, T as Tabs, j as Tab, k as Badge, w as wrapper$2, q as queryPane, s as subPane, M as MediaPane, u as useMediaPaginationState, b as useQueryDataMutators, a as useFoundMediaMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators, l as extractLabelIds } from './MediaPane-6dd0042c.js';
import { c as useTheme, h as API_ORGANISMS_BY_PHENOTYPES, i as API_MEDIA_BY_TAXON } from './paths-0bbd78cc.js';
import { c as clone } from './clone-1fb93465.js';
import { C as CircularProgress } from './CircularProgress-0433714e.js';
import { w as internal_processStyles, x as styled$1, y as extendSxProp, m as clsx, e as composeClasses, g as generateUtilityClass, b as generateUtilityClasses, f as styled$2, h as useDefaultProps } from './DefaultPropsProvider-4e645303.js';
import { f as formControlState, A as Autocomplete, T as TextField, C as Chip, F as FormControl } from './TextField-05737b42.js';
import { S as Slider } from './Slider-169f4ed4.js';
import './variables-58f3d1be.js';

const _excluded$3 = ["ownerState"],
  _excluded2 = ["variants"],
  _excluded3 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag) {
  return typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}

// Update /system/styled/#api in case if this changes
function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}
const systemDefaultTheme = createTheme();
const lowercaseFirstLetter = string => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
};
function resolveTheme({
  defaultTheme,
  theme,
  themeId
}) {
  return isEmpty(theme) ? defaultTheme : theme[themeId] || theme;
}
function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (props, styles) => styles[slot];
}
function processStyleArg(callableStyle, _ref) {
  let {
      ownerState
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  const resolvedStylesArg = typeof callableStyle === 'function' ? callableStyle(_extends({
    ownerState
  }, props)) : callableStyle;
  if (Array.isArray(resolvedStylesArg)) {
    return resolvedStylesArg.flatMap(resolvedStyle => processStyleArg(resolvedStyle, _extends({
      ownerState
    }, props)));
  }
  if (!!resolvedStylesArg && typeof resolvedStylesArg === 'object' && Array.isArray(resolvedStylesArg.variants)) {
    const {
        variants = []
      } = resolvedStylesArg,
      otherStyles = _objectWithoutPropertiesLoose(resolvedStylesArg, _excluded2);
    let result = otherStyles;
    variants.forEach(variant => {
      let isMatch = true;
      if (typeof variant.props === 'function') {
        isMatch = variant.props(_extends({
          ownerState
        }, props, ownerState));
      } else {
        Object.keys(variant.props).forEach(key => {
          if ((ownerState == null ? void 0 : ownerState[key]) !== variant.props[key] && props[key] !== variant.props[key]) {
            isMatch = false;
          }
        });
      }
      if (isMatch) {
        if (!Array.isArray(result)) {
          result = [result];
        }
        result.push(typeof variant.style === 'function' ? variant.style(_extends({
          ownerState
        }, props, ownerState)) : variant.style);
      }
    });
    return result;
  }
  return resolvedStylesArg;
}
function createStyled(input = {}) {
  const {
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp
  } = input;
  const systemSx = props => {
    return styleFunctionSx(_extends({}, props, {
      theme: resolveTheme(_extends({}, props, {
        defaultTheme,
        themeId
      }))
    }));
  };
  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    internal_processStyles(tag, styles => styles.filter(style => !(style != null && style.__mui_systemSx)));
    const {
        name: componentName,
        slot: componentSlot,
        skipVariantsResolver: inputSkipVariantsResolver,
        skipSx: inputSkipSx,
        // TODO v6: remove `lowercaseFirstLetter()` in the next major release
        // For more details: https://github.com/mui/material-ui/pull/37908
        overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot))
      } = inputOptions,
      options = _objectWithoutPropertiesLoose(inputOptions, _excluded3);

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver = inputSkipVariantsResolver !== undefined ? inputSkipVariantsResolver :
    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    componentSlot && componentSlot !== 'Root' && componentSlot !== 'root' || false;
    const skipSx = inputSkipSx || false;
    let label;
    let shouldForwardPropOption = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }
    const defaultStyledResolver = styled$1(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const transformStyleArg = stylesArg => {
      // On the server Emotion doesn't use React.forwardRef for creating components, so the created
      // component stays as a function. This condition makes sure that we do not interpolate functions
      // which are basically components used as a selectors.
      if (typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg || isPlainObject(stylesArg)) {
        return props => processStyleArg(stylesArg, _extends({}, props, {
          theme: resolveTheme({
            theme: props.theme,
            defaultTheme,
            themeId
          })
        }));
      }
      return stylesArg;
    };
    const muiStyledResolver = (styleArg, ...expressions) => {
      let transformedStyleArg = transformStyleArg(styleArg);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push(props => {
          const theme = resolveTheme(_extends({}, props, {
            defaultTheme,
            themeId
          }));
          if (!theme.components || !theme.components[componentName] || !theme.components[componentName].styleOverrides) {
            return null;
          }
          const styleOverrides = theme.components[componentName].styleOverrides;
          const resolvedStyleOverrides = {};
          // TODO: v7 remove iteration and use `resolveStyleArg(styleOverrides[slot])` directly
          Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
            resolvedStyleOverrides[slotKey] = processStyleArg(slotStyle, _extends({}, props, {
              theme
            }));
          });
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push(props => {
          var _theme$components;
          const theme = resolveTheme(_extends({}, props, {
            defaultTheme,
            themeId
          }));
          const themeVariants = theme == null || (_theme$components = theme.components) == null || (_theme$components = _theme$components[componentName]) == null ? void 0 : _theme$components.variants;
          return processStyleArg({
            variants: themeVariants
          }, _extends({}, props, {
            theme
          }));
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}

const styled = createStyled();
var systemStyled = styled;

function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

const _excluded$2 = ["component", "direction", "spacing", "divider", "children", "className", "useFlexGap"];
const defaultTheme = createTheme();
// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiStack',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
});
function useThemePropsDefault(props) {
  return useThemeProps({
    props,
    name: 'MuiStack',
    defaultTheme
  });
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children, separator) {
  const childrenArray = reactExports.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push( /*#__PURE__*/reactExports.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
const getSideFromDirection = direction => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};
const style = ({
  ownerState,
  theme
}) => {
  let styles = _extends({
    display: 'flex',
    flexDirection: 'column'
  }, handleBreakpoints({
    theme
  }, resolveBreakpointValues({
    values: ownerState.direction,
    breakpoints: theme.breakpoints.values
  }), propValue => ({
    flexDirection: propValue
  })));
  if (ownerState.spacing) {
    const transformer = createUnarySpacing(theme);
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (typeof ownerState.spacing === 'object' && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === 'object' && ownerState.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});
    const directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base
    });
    const spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base
    });
    if (typeof directionValues === 'object') {
      Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
        const directionValue = directionValues[breakpoint];
        if (!directionValue) {
          const previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : 'column';
          directionValues[breakpoint] = previousDirectionValue;
        }
      });
    }
    const styleFromPropValue = (propValue, breakpoint) => {
      if (ownerState.useFlexGap) {
        return {
          gap: getValue(transformer, propValue)
        };
      }
      return {
        // The useFlexGap={false} implement relies on each child to give up control of the margin.
        // We need to reset the margin to avoid double spacing.
        '& > :not(style):not(style)': {
          margin: 0
        },
        '& > :not(style) ~ :not(style)': {
          [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
        }
      };
    };
    styles = deepmerge(styles, handleBreakpoints({
      theme
    }, spacingValues, styleFromPropValue));
  }
  styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
  return styles;
};
function createStack(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiStack'
  } = options;
  const useUtilityClasses = () => {
    const slots = {
      root: ['root']
    };
    return composeClasses(slots, slot => generateUtilityClass(componentName, slot), {});
  };
  const StackRoot = createStyledComponent(style);
  const Stack = /*#__PURE__*/reactExports.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps(inProps);
    const props = extendSxProp(themeProps); // `color` type conflicts with html color attribute.
    const {
        component = 'div',
        direction = 'column',
        spacing = 0,
        divider,
        children,
        className,
        useFlexGap = false
      } = props,
      other = _objectWithoutPropertiesLoose(props, _excluded$2);
    const ownerState = {
      direction,
      spacing,
      useFlexGap
    };
    const classes = useUtilityClasses();
    return /*#__PURE__*/jsxRuntimeExports.jsx(StackRoot, _extends({
      as: component,
      ownerState: ownerState,
      ref: ref,
      className: clsx(classes.root, className)
    }, other, {
      children: divider ? joinChildren(children, divider) : children
    }));
  });
  return Stack;
}

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const _excluded$1 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];
const useUtilityClasses$1 = ownerState => {
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
const TypographyRoot = styled$2('span', {
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
}, ownerState.variant === 'inherit' && {
  // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
  font: 'inherit'
}, ownerState.variant !== 'inherit' && theme.typography[ownerState.variant], ownerState.align !== 'inherit' && {
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
};

// TODO v6: deprecate these color values in v5.x and remove the transformation in v6
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
const Typography = /*#__PURE__*/reactExports.forwardRef(function Typography(inProps, ref) {
  const themeProps = useDefaultProps({
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
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
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
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className)
  }, other));
});
var Typography$1 = Typography;

const Stack = createStack({
  createStyledComponent: styled$2('div', {
    name: 'MuiStack',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root
  }),
  useThemeProps: inProps => useDefaultProps({
    props: inProps,
    name: 'MuiStack'
  })
});
var Stack$1 = Stack;

function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}
const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label', 'error', 'required', 'asterisk']);
var formControlLabelClasses$1 = formControlLabelClasses;

const _excluded = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "required", "slotProps", "value"];
const useUtilityClasses = ownerState => {
  const {
    classes,
    disabled,
    labelPlacement,
    error,
    required
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`, error && 'error', required && 'required'],
    label: ['label', disabled && 'disabled'],
    asterisk: ['asterisk', error && 'error']
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled$2('label', {
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
      color: (theme.vars || theme).palette.text.disabled
    }
  }
}));
const AsteriskComponent = styled$2('span', {
  name: 'MuiFormControlLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk
})(({
  theme
}) => ({
  [`&.${formControlLabelClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
}));

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = /*#__PURE__*/reactExports.forwardRef(function FormControlLabel(inProps, ref) {
  var _ref, _slotProps$typography;
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  const {
      className,
      componentsProps = {},
      control,
      disabled: disabledProp,
      disableTypography,
      label: labelProp,
      labelPlacement = 'end',
      required: requiredProp,
      slotProps = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const disabled = (_ref = disabledProp != null ? disabledProp : control.props.disabled) != null ? _ref : muiFormControl == null ? void 0 : muiFormControl.disabled;
  const required = requiredProp != null ? requiredProp : control.props.required;
  const controlProps = {
    disabled,
    required
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['error']
  });
  const ownerState = _extends({}, props, {
    disabled,
    labelPlacement,
    required,
    error: fcs.error
  });
  const classes = useUtilityClasses(ownerState);
  const typographySlotProps = (_slotProps$typography = slotProps.typography) != null ? _slotProps$typography : componentsProps.typography;
  let label = labelProp;
  if (label != null && label.type !== Typography$1 && !disableTypography) {
    label = /*#__PURE__*/jsxRuntimeExports.jsx(Typography$1, _extends({
      component: "span"
    }, typographySlotProps, {
      className: clsx(classes.label, typographySlotProps == null ? void 0 : typographySlotProps.className),
      children: label
    }));
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(FormControlLabelRoot, _extends({
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/reactExports.cloneElement(control, controlProps), required ? /*#__PURE__*/jsxRuntimeExports.jsxs(Stack$1, {
      display: "block",
      children: [label, /*#__PURE__*/jsxRuntimeExports.jsxs(AsteriskComponent, {
        ownerState: ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: ["\u2009", '*']
      })]
    }) : label]
  }));
});
var FormControlLabel$1 = FormControlLabel;

const OrganismListItem = ({ css, className, id, label, isChecked, onClick }) => {
    return (jsxs("div", { css: [organismListItem, css], className: className, children: [jsxs("div", { css: listInner, children: [jsx("span", { css: labelCol, children: label }), jsxs("a", { css: idCol, href: `${PATH_TAXON}${id}`, target: "_blank", rel: "noreferrer", children: ["[tax_id:", id, "]"] })] }), jsx("span", { css: checkCol, children: jsx(Checkbox, { checked: isChecked, onClick: () => onClick({ id, label }) }) })] }));
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

const organismPagination = Recoil_index_8({
    key: "organismPagination",
    default: 1,
});
const useOrganismPaginationState = () => {
    return Recoil_index_20(organismPagination);
};
const useOrganismPaginationMutators = () => {
    const setOrganismPagination = Recoil_index_24(organismPagination);
    const next = () => setOrganismPagination((prev) => prev + 1);
    const prev = () => setOrganismPagination((prev) => prev - 1);
    const reset = () => setOrganismPagination(1);
    return { next, prev, reset };
};

const phenotypeQuery = Recoil_index_8({ key: "phenotypeQuery", default: {} });
const usePhenotypeQueryState = () => {
    return Recoil_index_20(phenotypeQuery);
};
const usePhenotypeQueryMutators = () => {
    const setPhenotypeQuery = Recoil_index_24(phenotypeQuery);
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

const selectedOrganisms = Recoil_index_8({ key: "selectedOrganisms", default: [] });
const useSelectedOrganismsState = () => {
    return Recoil_index_20(selectedOrganisms);
};
const useSelectedOrganismsMutators = () => {
    const setSelectedOrganisms = Recoil_index_24(selectedOrganisms);
    const toggleOrganismSelection = (info) => {
        setSelectedOrganisms((prev) => {
            return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
        });
    };
    const clearSelectedOrganisms = () => {
        setSelectedOrganisms([]);
    };
    return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};

const FoundOrganismsList = ({ css, className }) => {
    const { data, isLoading, isPlaceholderData } = useOrganismQuery();
    const { next, prev } = useOrganismPaginationMutators();
    const { list, toggleOrganismSelection } = useOrganismList(data);
    return (jsx("div", { css: [foundOrganismsList, css], className: className, children: jsxs("div", { children: [(isLoading || isPlaceholderData) && (jsx("div", { css: loadingIndicator, children: jsx(CircularProgress, { color: "inherit", size: 40 }) })), jsx("p", { css: infoTextCSS, children: getInfoText(data === null || data === void 0 ? void 0 : data.total, isLoading) }), jsx("div", { css: inner, children: (list !== null && list !== void 0 ? list : []).map((item) => (jsx(OrganismListItem, Object.assign({}, item, { onClick: toggleOrganismSelection }), item.id))) }), !!(data === null || data === void 0 ? void 0 : data.total) && !isLoading && (jsx(Pagination, { total: data.total, current: data.offset, displayLength: data.limit, onClickNext: next, onClickPrev: prev }))] }) }));
};
const SHOW_COUNT$2 = 10;
const useOrganismQuery = () => {
    const page = useOrganismPaginationState();
    const phenotypeQueryParams = usePhenotypeQueryState();
    const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
    return useQuery({
        queryKey: [phenotypeQueryParams, { page }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (Object.entries(phenotypeQueryParams).length === 0)
                return nullResponse;
            const response = yield getData(API_ORGANISMS_BY_PHENOTYPES, Object.assign(Object.assign({}, phenotypeQueryParams), { limit: SHOW_COUNT$2, offset: (page - 1) * SHOW_COUNT$2 }));
            if (!response.body)
                throw new Error("No data");
            return response.body;
        }),
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
};
const useOrganismList = (response) => {
    const [list, setList] = reactExports.useState([]);
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    reactExports.useEffect(() => {
        var _a;
        const result = ((_a = response === null || response === void 0 ? void 0 : response.contents) !== null && _a !== void 0 ? _a : []).map((organism) => {
            return {
                id: organism.tax_id,
                label: organism.name,
                isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
            };
        });
        setList(result);
    }, [response, selectedOrganisms]);
    return { list, toggleOrganismSelection };
};
const getInfoText = (organismLength, isLoading) => {
    if (isLoading) {
        return "Loading...";
    }
    if (!organismLength) {
        return "No organisms found";
    }
    else if (organismLength === 1) {
        return "1 organism found";
    }
    else {
        return `${organismLength} organisms found`;
    }
};
const foundOrganismsList = css `
  position: relative;
`;
const infoTextCSS = css `
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-bottom: ${SIZE1};
`;
const inner = css `
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

const organismTabNames = ["Found organisms", "Selected organisms"];
const organismTabFocus = Recoil_index_8({
    key: "organismTabFocus",
    default: "Found organisms",
});
const useOrganismTabFocusState = () => {
    return Recoil_index_20(organismTabFocus);
};
const useOrganismTabFocusMutators = () => {
    const setOrganismTabFocus = Recoil_index_24(organismTabFocus);
    return { setOrganismTabFocus };
};

const OrganismTab = ({ css, className }) => {
    const tabFocus = useOrganismTabFocusState();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const selected = useSelectedOrganismsState();
    const handleChange = (event, newValue) => {
        setOrganismTabFocus(newValue);
    };
    return (jsx("div", { css: [wrapper$1, css], className: className, children: jsx(Tabs, { value: tabFocus, onChange: handleChange, children: organismTabNames.map((label) => {
                if (label === "Selected organisms") {
                    return (jsx(Tab, { label: jsx(Badge, { badgeContent: selected.length, color: "primary", children: label }), value: label, css: tabCSS }, label));
                }
                return jsx(Tab, { label: label, value: label, css: tabCSS }, label);
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

const SHOW_COUNT$1 = 10;
const SelectedOrganismsList = ({ css, className }) => {
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    const [data, setData] = reactExports.useState([]);
    const [current, setCurrent] = reactExports.useState(0);
    const next = () => {
        setCurrent(current + SHOW_COUNT$1);
    };
    const prev = () => {
        setCurrent(current - SHOW_COUNT$1);
    };
    reactExports.useEffect(() => {
        const filtered = selectedOrganisms
            .filter((item, i) => i >= current)
            .filter((item, i) => i < SHOW_COUNT$1);
        setData(filtered);
    }, [selectedOrganisms, current]);
    return (jsxs("div", { css: [selectedOrganismsList, css], className: className, children: [jsx("div", { children: data.map((item) => (jsx(OrganismListItem, Object.assign({}, item, { isChecked: true, onClick: () => {
                        toggleOrganismSelection(item);
                    } }), item.id))) }), !!selectedOrganisms.length && (jsx(Pagination, { total: selectedOrganisms.length, current: current, displayLength: SHOW_COUNT$1, onClickNext: next, onClickPrev: prev }))] }));
};
const selectedOrganismsList = css ``;

const OrganismPane = ({ css, className }) => {
    const tabFocus = useOrganismTabFocusState();
    const { reset } = useOrganismPaginationMutators();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const phenotypeQueryParams = usePhenotypeQueryState();
    reactExports.useEffect(() => {
        reset();
        setOrganismTabFocus("Found organisms");
    }, [phenotypeQueryParams]);
    return (jsxs("div", { css: [wrapper, css], className: className, children: [jsx(OrganismTab, {}), jsxs("div", { css: contents, children: [tabFocus === "Found organisms" && jsx(FoundOrganismsList, {}), tabFocus === "Selected organisms" && jsx(SelectedOrganismsList, {})] })] }));
};
const wrapper = css `
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
`;
const contents = css `
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;

function valuetext(value) {
    return `${value}°C`;
}
const RangeSlider = ({ css, className, min, max, label, marks, queryKey, handleValueChange, handleEnabledChange, }) => {
    const [value, setValue] = reactExports.useState([min, max]);
    const [enabled, setEnabled] = reactExports.useState(false);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
    };
    const handleChangeCommitted = (event, newValue) => {
        handleValueChange(queryKey, newValue.join(","));
    };
    reactExports.useEffect(() => {
        if (enabled) {
            handleValueChange(queryKey, value.join(","));
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [enabled]);
    return (jsxs("div", { css: [rangeSlider, css], className: className, children: [jsx("div", { children: jsx("span", { children: jsx(FormControlLabel$1, { label: label, control: jsx(Checkbox, { onChange: handleCheckChange, css: checkBoxStyle$1 }) }) }) }), jsx(Slider, { value: value, onChange: handleSliderChange, onChangeCommitted: handleChangeCommitted, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: min, max: max, marks: marks, step: 0.1, disabled: enabled ? undefined : true })] }));
};
const rangeSlider = css ``;
const checkBoxStyle$1 = css `
  padding-left: 0;
`;

const SelectBox = ({ css, className, label, items, queryKey, handleEnabledChange, handleValueChange, }) => {
    const [value, setValue] = reactExports.useState("");
    const [enabled, setEnabled] = reactExports.useState(false);
    const handleSelectChange = (event, value) => {
        if (value) {
            const [key, label] = value;
            setValue(key);
        }
        else {
            setValue("");
        }
    };
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
        setValue("");
    };
    reactExports.useEffect(() => {
        if (enabled && value !== "") {
            handleValueChange(queryKey, value);
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [value, enabled]);
    return (jsxs("div", { css: [selectBox, css], className: className, children: [jsx(Checkbox, { css: checkBoxStyle, onChange: handleCheckChange }), jsx(FormControl, { sx: { m: 1, minWidth: 200 }, children: jsx(Autocomplete, { filterSelectedOptions: true, onChange: handleSelectChange, disablePortal: true, disableClearable: true, options: items, disabled: enabled ? undefined : true, getOptionLabel: (item) => item[1], renderInput: (params) => (jsx(TextField, Object.assign({}, params, { label: label, InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: jsx(Fragment, { children: params.InputProps.endAdornment }) }) }))), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined" }, getTagProps({ index }), { label: option[1], key: option[0] })))) }) })] }));
};
const selectBox = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
`;
const checkBoxStyle = css `
  padding-left: 0;
`;

const PhenotypeSearchArea = ({ css, className }) => {
    const { updatePhenotypeQuery, removePhenotypeQuery } = usePhenotypeQueryMutators();
    const handleEnabledChange = (key, enabled) => {
        !enabled && removePhenotypeQuery(key);
    };
    const handleValueChange = (key, value) => {
        updatePhenotypeQuery(key, value);
    };
    return (jsxs("div", { css: [phenotypeSearchArea, css], className: className, children: [jsx(RangeSlider, { css: sliderStyle, min: 0, max: 110, label: "Growth temperature", marks: [
                    { value: 0, label: "0°C" },
                    { value: 37, label: "37°C" },
                    { value: 55, label: "55°C" },
                    { value: 75, label: "75°C" },
                    { value: 90, label: "90°C" },
                    { value: 110, label: "110°C" },
                ], queryKey: "growth_temp", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { css: sliderStyle, min: 0, max: 14, label: "Growth pH", marks: [
                    { value: 0, label: "0" },
                    { value: 14, label: "14" },
                ], queryKey: "growth_ph", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { css: sliderStyle, min: 0, max: 25, label: "Growth salinity", marks: [
                    { value: 0, label: "0%" },
                    { value: 25, label: "25%" },
                ], queryKey: "growth_salinity", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { css: sliderStyle, min: 0, max: 50, label: "Cell length", marks: [
                    { value: 0, label: "0µm" },
                    { value: 50, label: "50µm" },
                ], queryKey: "cell_length", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { css: sliderStyle, min: 0, max: 25, label: "Cell diameter", marks: [
                    { value: 0, label: "0µm" },
                    { value: 25, label: "25µm" },
                ], queryKey: "cell_diameter", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Oxygen requirement", items: [
                    ["MPO_04002", "Aerobe"],
                    ["MPO_04003", "Anaerobe"],
                    ["MPO_04004", "Obligate aerobe"],
                    ["MPO_04005", "Facultative aerobe"],
                    ["MPO_04006", "Obligate anaerobe"],
                    ["MPO_04007", "Facultative anaerobe"],
                    ["MPO_04009", "Microaerophilic"],
                ], queryKey: "MPO_10002", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Gram Strain", queryKey: "MPO_07001", items: [
                    ["MPO_07002", "Gram+"],
                    ["MPO_07003", "Gram-"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Motility", queryKey: "MPO_02000", items: [
                    ["MPO_02001", "Motile"],
                    ["MPO_02002", "Nonmotile"],
                    ["MPO_02007", "Chemotactic"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Cell shape", queryKey: "MPO_01001", items: [
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
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Salinity", queryKey: "MPO_03006", items: [
                    ["MPO_03007", "Halophile"],
                    ["MPO_03008", "Halotolerant"],
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Energy metabolism", queryKey: "MPO_04053", items: [["MPO_04153", "Carbon fixation"]], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange })] }));
};
const phenotypeSearchArea = css `
  background-color: ${COLOR_WHITE};
  padding: 0 20px;
  flex-grow: 1;
`;
const sliderStyle = css `
  & + & {
    margin-top: 10px;
  }
`;

const PhenotypeSection = ({ css, className }) => {
    return (jsx("div", { css: [phenotypeSection, css], className: className, children: jsx(PhenotypeSearchArea, {}) }));
};
const phenotypeSection = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-grow: 1;
`;

const AppContainer = ({ dispatchEvent }) => {
    useMediaLoadFromOrganismSelection();
    return (jsxs("div", { css: wrapper$2, children: [jsx("div", { css: queryPane, children: jsx(PhenotypeSection, {}) }), jsx("div", { css: subPane, children: jsx(OrganismPane, {}) }), jsx("div", { css: subPane, children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};
const SHOW_COUNT = 10;
const useMediaLoadFromOrganismSelection = () => {
    const page = useMediaPaginationState();
    const selectedOrganisms = useSelectedOrganismsState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
    const query = useQuery({
        queryKey: [selectedOrganisms, { page }],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            if (selectedOrganisms.length === 0)
                return nullResponse;
            const tax_ids = extractLabelIds(selectedOrganisms);
            setQueryData({ tax_ids });
            const response = yield getData(API_MEDIA_BY_TAXON, {
                tax_ids,
                limit: SHOW_COUNT,
                offset: (page - 1) * SHOW_COUNT,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        }),
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
    reactExports.useEffect(() => {
        query.data && setFoundMedia(query.data);
    }, [query.data]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData]);
    reactExports.useEffect(() => {
        reset();
    }, [selectedOrganisms]);
};

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        console.log(stanzaElement);
        if (!stanzaElement)
            return;
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
        console.log("dispatch", { detail: gmIds });
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        return jsx(App, { stanzaElement: this.root });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-find-media-by-organism-phenotype",
	"stanza:label": "FindMediaByOrganismPhenotype",
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
//# sourceMappingURL=gmdb-find-media-by-organism-phenotype.js.map
