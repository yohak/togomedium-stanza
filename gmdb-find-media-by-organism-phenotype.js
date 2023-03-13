import { _ as __awaiter, S as Stanza, d as defineStanzaElement } from './stanza-bd712360.js';
import { _ as _objectWithoutPropertiesLoose, G as defaultSxConfig, H as isPlainObject, i as capitalize, c as jsxRuntimeExports, f as COLOR_WHITE, r as COLOR_GRAY_LINE, S as SIZE1, o as SIZE2, C as COLOR_PRIMARY, b as jsxs, j as jsx, s as FONT_WEIGHT_BOLD, v as COLOR_GRAY700, w as SIZE4, m as ROUNDED_CORNER, F as Fragment, R as ReactDOM, E as EmotionCacheProvider } from './EmotionCacheProvider-3b758372.js';
import { _ as _extends, r as reactExports, c as css, j as jsx$1 } from './index-56cafe6b.js';
import { a as Recoil_index_6, b as Recoil_index_18, c as Recoil_index_22, R as Recoil_index_4 } from './recoil-b0ceac4c.js';
import { a as PATH_TAXON } from './consts-234f4433.js';
import { d as Checkbox, h as hasInfo, f as filterOutInfo, C as CircularProgress, P as Pagination, e as hasIdOfLabel, T as Tabs, g as Tab, B as Badge, a as useQueryDataMutators, u as useFoundMediaMutators, b as useMediaLoadAbortMutators, n as nullResponse$1, i as extractLabelIds, w as wrapper$2, q as queryPane, s as subPane, M as MediaPane, c as useFoundMediaState } from './MediaPane-8a75fa29.js';
import { b as API_ORGANISMS_BY_PHENOTYPES, c as API_MEDIA_BY_TAXON } from './paths-66dbaf1f.js';
import { g as getData } from './getData-b32e78c1.js';
import { c as clone } from './clone-e8609f76.js';
import { a as generateUtilityClass, g as generateUtilityClasses, s as styled, u as useThemeProps, i as clsx, k as composeClasses } from './Grow-1eacc08f.js';
import { f as formControlState, A as Autocomplete, T as TextField, C as Chip, F as FormControl } from './TextField-b194da9b.js';
import { a as useFormControl } from './useFormControl-a1db82cb.js';
import { S as Slider } from './Slider-f7cf2160.js';
import { T as ThemeProvider, m as muiTheme } from './muiTheme-c6ca75b5.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import './createSvgIcon-74eb21f1.js';
import './variables-0b8fac13.js';

const _excluded$2 = ["sx"];
const splitProps = props => {
  var _props$theme$unstable, _props$theme;
  const result = {
    systemProps: {},
    otherProps: {}
  };
  const config = (_props$theme$unstable = props == null ? void 0 : (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : defaultSxConfig;
  Object.keys(props).forEach(prop => {
    if (config[prop]) {
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
    other = _objectWithoutPropertiesLoose(props, _excluded$2);
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

function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}
const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label', 'error']);
var formControlLabelClasses$1 = formControlLabelClasses;

const _excluded = ["checked", "className", "componentsProps", "control", "disabled", "disableTypography", "inputRef", "label", "labelPlacement", "name", "onChange", "slotProps", "value"];
const useUtilityClasses = ownerState => {
  const {
    classes,
    disabled,
    labelPlacement,
    error
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`, error && 'error'],
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
      color: (theme.vars || theme).palette.text.disabled
    }
  }
}));

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = /*#__PURE__*/reactExports.forwardRef(function FormControlLabel(inProps, ref) {
  var _slotProps$typography;
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
      label: labelProp,
      labelPlacement = 'end',
      slotProps = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
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
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['error']
  });
  const ownerState = _extends({}, props, {
    disabled,
    labelPlacement,
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
    children: [/*#__PURE__*/reactExports.cloneElement(control, controlProps), label]
  }));
});
var FormControlLabel$1 = FormControlLabel;

const OrganismListItem = ({ css, className, id, label, isChecked, onClick }) => {
    return (jsxs("div", Object.assign({ css: [organismListItem, css], className: className }, { children: [jsxs("div", Object.assign({ css: listInner }, { children: [jsx("span", Object.assign({ css: labelCol }, { children: label })), jsxs("a", Object.assign({ css: idCol, href: `${PATH_TAXON}${id}`, target: "_blank", rel: "noreferrer" }, { children: ["[tax_id:", id, "]"] }))] })), jsx("span", Object.assign({ css: checkCol }, { children: jsx(Checkbox, { checked: isChecked, onClick: () => onClick({ id, label }) }) }))] })));
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

const nullResponse = {
    total: 0,
    limit: 10,
    contents: [],
    offset: 0,
};
const foundOrganisms = Recoil_index_6({
    key: "foundOrganisms",
    default: nullResponse,
});
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

const selectedOrganisms = Recoil_index_6({ key: "selectedOrganisms", default: [] });
const useSelectedOrganismsState = () => {
    return Recoil_index_18(selectedOrganisms);
};
const useSelectedOrganismsMutators = () => {
    const setSelectedOrganisms = Recoil_index_22(selectedOrganisms);
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

const SHOW_COUNT$1 = 10;
const FoundOrganismsList = ({ css, className }) => {
    const { data, toggleChecked, isLoading, response } = useOrganismList();
    const { next, prev } = usePaginate();
    return (jsx("div", Object.assign({ css: [foundOrganismsList, css], className: className }, { children: jsxs("div", { children: [isLoading && (jsx("div", Object.assign({ css: loadingIndicator }, { children: jsx(CircularProgress, { color: "inherit", size: 40 }) }))), jsx("p", Object.assign({ css: infoTextCSS }, { children: getInfoText(response.total, isLoading) })), jsx("div", Object.assign({ css: inner }, { children: data.map((item) => (jsx(OrganismListItem, Object.assign({}, item, { onClick: toggleChecked }), item.id))) })), !!response.total && !isLoading && (jsx(Pagination, { total: response.total, current: response.offset, displayLength: response.limit, onClickNext: () => next(), onClickPrev: () => prev() }))] }) })));
};
const usePaginate = () => {
    const response = useFoundOrganismsState();
    const { setNextOrganismLoadAbort } = useOrganismLoadAbortMutators();
    const phenotypeQuery = usePhenotypeQueryState();
    const { setFoundOrganisms } = useFoundOrganismsMutators();
    const next = () => {
        paginate(response.offset + SHOW_COUNT$1);
    };
    const prev = () => {
        paginate(response.offset - SHOW_COUNT$1);
    };
    const paginate = (offset) => __awaiter(void 0, void 0, void 0, function* () {
        const abort = new AbortController();
        setNextOrganismLoadAbort(abort);
        const params = Object.assign(Object.assign({}, phenotypeQuery), { limit: SHOW_COUNT$1, offset });
        const response = yield getData(API_ORGANISMS_BY_PHENOTYPES, params, abort);
        setNextOrganismLoadAbort(null);
        if (response.body) {
            setFoundOrganisms(response.body);
        }
    });
    return { next, prev };
};
const useOrganismList = () => {
    const [data, setData] = reactExports.useState([]);
    const response = useFoundOrganismsState();
    const selectedOrganisms = useSelectedOrganismsState();
    const isLoading = useIsOrganismLoading();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    const toggleChecked = (info) => {
        toggleOrganismSelection(info);
    };
    reactExports.useEffect(() => {
        const result = response.contents.map((organism) => {
            return {
                id: organism.tax_id,
                label: organism.name,
                isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
            };
        });
        setData(result);
    }, [response, selectedOrganisms]);
    return { data, toggleChecked, isLoading, response };
};
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
const organismTabFocus = Recoil_index_6({
    key: "organismTabFocus",
    default: "Found organisms",
});
const useOrganismTabFocusState = () => {
    return Recoil_index_18(organismTabFocus);
};
const useOrganismTabFocusMutators = () => {
    const setOrganismTabFocus = Recoil_index_22(organismTabFocus);
    return { setOrganismTabFocus };
};

const OrganismTab = ({ css, className }) => {
    const tabFocus = useOrganismTabFocusState();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const selected = useSelectedOrganismsState();
    const handleChange = (event, newValue) => {
        setOrganismTabFocus(newValue);
    };
    return (jsx("div", Object.assign({ css: [wrapper$1, css], className: className }, { children: jsx(Tabs, Object.assign({ value: tabFocus, onChange: handleChange }, { children: organismTabNames.map((label) => {
                if (label === "Selected organisms") {
                    return (jsx(Tab, { label: jsx(Badge, Object.assign({ badgeContent: selected.length, color: "primary" }, { children: label })), value: label, css: tabCSS }, label));
                }
                return jsx(Tab, { label: label, value: label, css: tabCSS }, label);
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
const SelectedOrganismsList = ({ css, className }) => {
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    const [data, setData] = reactExports.useState([]);
    const [current, setCurrent] = reactExports.useState(0);
    const next = () => {
        setCurrent(current + SHOW_COUNT);
    };
    const prev = () => {
        setCurrent(current - SHOW_COUNT);
    };
    reactExports.useEffect(() => {
        const filtered = selectedOrganisms
            .filter((item, i) => i >= current)
            .filter((item, i) => i < SHOW_COUNT);
        setData(filtered);
    }, [selectedOrganisms, current]);
    return (jsxs("div", Object.assign({ css: [selectedOrganismsList, css], className: className }, { children: [jsx("div", { children: data.map((item) => (jsx(OrganismListItem, Object.assign({}, item, { isChecked: true, onClick: () => {
                        toggleOrganismSelection(item);
                    } }), item.id))) }), !!selectedOrganisms.length && (jsx(Pagination, { total: selectedOrganisms.length, current: current, displayLength: SHOW_COUNT, onClickNext: next, onClickPrev: prev }))] })));
};
const selectedOrganismsList = css ``;

const OrganismPane = ({ css, className }) => {
    useMediaLoadFromOrganismSelection();
    const { tabFocus } = useTabFocus();
    return (jsxs("div", Object.assign({ css: [wrapper, css], className: className }, { children: [jsx(OrganismTab, {}), jsxs("div", Object.assign({ css: contents }, { children: [tabFocus === "Found organisms" && jsx(FoundOrganismsList, {}), tabFocus === "Selected organisms" && jsx(SelectedOrganismsList, {})] }))] })));
};
const useTabFocus = () => {
    const tabFocus = useOrganismTabFocusState();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const foundOrganisms = useFoundOrganismsState();
    reactExports.useEffect(() => {
        setOrganismTabFocus("Found organisms");
    }, [foundOrganisms]);
    return { tabFocus };
};
const useMediaLoadFromOrganismSelection = () => {
    const selectedOrganisms = useSelectedOrganismsState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const exec = () => __awaiter(void 0, void 0, void 0, function* () {
        const tax_ids = extractLabelIds(selectedOrganisms);
        const params = { tax_ids, limit: 10, offset: 0 };
        setQueryData({ tax_ids });
        const abort = new AbortController();
        setNextMediaLoadAbort(abort);
        const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
        setNextMediaLoadAbort(null);
        if (response.body) {
            setFoundMedia(response.body);
        }
    });
    reactExports.useEffect(() => {
        if (selectedOrganisms.length === 0) {
            setQueryData({});
            setFoundMedia(nullResponse$1);
            setNextMediaLoadAbort(null);
            return;
        }
        exec();
    }, [selectedOrganisms]);
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
    return (jsxs("div", Object.assign({ css: [rangeSlider, css], className: className }, { children: [jsx("div", { children: jsx("span", { children: jsx(FormControlLabel$1, { label: label, control: jsx(Checkbox, { onChange: handleCheckChange, css: checkBoxStyle$1 }) }) }) }), jsx(Slider, { value: value, onChange: handleSliderChange, onChangeCommitted: handleChangeCommitted, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: min, max: max, marks: marks, step: 0.1, disabled: enabled ? undefined : true })] })));
};
const rangeSlider = css ``;
const checkBoxStyle$1 = css `
  padding-left: 0;
`;

const SelectBox = ({ css, className, label, items, queryKey, handleEnabledChange, handleValueChange, }) => {
    const [value, setValue] = reactExports.useState("");
    const [enabled, setEnabled] = reactExports.useState(false);
    const handleSelectChange = (event, value) => {
        console.log(value);
        if (value) {
            setValue(value[1]);
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
    return (jsxs("div", Object.assign({ css: [selectBox, css], className: className }, { children: [jsx(Checkbox, { css: checkBoxStyle, onChange: handleCheckChange }), jsx(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: jsx(Autocomplete, { filterSelectedOptions: true, onChange: handleSelectChange, disablePortal: true, disableClearable: true, options: items, disabled: enabled ? undefined : true, getOptionLabel: (item) => item[1], renderInput: (params) => (jsx(TextField, Object.assign({}, params, { label: label, InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: jsx(Fragment, { children: params.InputProps.endAdornment }) }) }))), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, Object.assign({ variant: "outlined" }, getTagProps({ index }), { label: option[1], key: option[0] })))) }) }))] })));
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
    const { handleEnabledChange, handleValueChange } = usePhenotypeQuery();
    return (jsxs("div", Object.assign({ css: [phenotypeSearchArea, css], className: className }, { children: [jsx(RangeSlider, { css: sliderStyle, min: 0, max: 110, label: "Growth temperature", marks: [
                    { value: 0, label: "0°C" },
                    { value: 37, label: "37°C" },
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
                ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange })] })));
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
    reactExports.useEffect(() => {
        if (Object.entries(phenotypeQuery).length === 0) {
            setFoundOrganisms(nullResponse);
            setNextOrganismLoadAbort(null);
            return;
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const abort = new AbortController();
            setNextOrganismLoadAbort(abort);
            const response = yield getData(API_ORGANISMS_BY_PHENOTYPES, Object.assign(Object.assign({}, phenotypeQuery), { limit: 10, offset: 0 }), abort);
            setNextOrganismLoadAbort(null);
            if (response.body) {
                setFoundOrganisms(response.body);
            }
        }))();
    }, [phenotypeQuery]);
    return { handleEnabledChange, handleValueChange };
};

const PhenotypeSection = ({ css, className }) => {
    return (jsx("div", Object.assign({ css: [phenotypeSection, css], className: className }, { children: jsx(PhenotypeSearchArea, {}) })));
};
const phenotypeSection = css `
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-grow: 1;
`;

const AppContainer = ({ dispatchEvent }) => {
    const { next, prev } = useMediaPagination();
    return (jsxs("div", Object.assign({ css: wrapper$2 }, { children: [jsx("div", Object.assign({ css: queryPane }, { children: jsx(PhenotypeSection, {}) })), jsx("div", Object.assign({ css: subPane }, { children: jsx(OrganismPane, {}) })), jsx("div", Object.assign({ css: subPane }, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent, next: next, prev: prev }) }))] })));
};
const useMediaPagination = () => {
    const selectedOrganisms = useSelectedOrganismsState();
    const response = useFoundMediaState();
    const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const next = () => {
        paginate({
            offset: response.offset + 10,
            tax_ids: extractLabelIds(selectedOrganisms),
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    const prev = () => {
        paginate({
            offset: response.offset - 10,
            tax_ids: extractLabelIds(selectedOrganisms),
            abortLoader: setNextMediaLoadAbort,
            setFoundMedia,
        });
    };
    return { next, prev };
};
const paginate = ({ offset, abortLoader, tax_ids, setFoundMedia }) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { tax_ids, offset, limit: 10 };
    const abort = new AbortController();
    abortLoader(abort);
    const response = yield getData(API_MEDIA_BY_TAXON, params, abort);
    abortLoader(null);
    if (response.body) {
        setFoundMedia(response.body);
    }
});

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
        ReactDOM.render(jsx(reactExports.StrictMode, { children: jsx(Recoil_index_4, { children: jsx(ThemeProvider, Object.assign({ theme: muiTheme }, { children: jsx(EmotionCacheProvider, { children: jsx(App, { stanzaElement: this.root }) }) })) }) }), main);
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
