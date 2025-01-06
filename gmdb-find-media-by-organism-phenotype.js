import { _ as __awaiter, d as defineStanzaElement } from './stanza-97f45b0e.js';
import { B as capitalize, z as jsxRuntimeExports, l as COLOR_WHITE, M as COLOR_GRAY_LINE, H as SIZE1, J as SIZE2, C as COLOR_PRIMARY, a as jsxs, j as jsx, R as Recoil_index_8, p as Recoil_index_24, o as Recoil_index_20, N as FONT_WEIGHT_BOLD, P as COLOR_GRAY700, Q as SIZE4, I as ROUNDED_CORNER, F as Fragment, T as TogoMediumReactStanza } from './StanzaReactProvider-d614d9ca.js';
import { u as useQuery } from './emotion-styled.browser.esm-981b7be3.js';
import { r as reactExports, c as css, g as getData, j as jsx$1 } from './getData-8b0d864a.js';
import { a as PATH_TAXON } from './consts-c38322df.js';
import { g as useFormControl, C as Checkbox, h as hasInfo, i as filterOutInfo, P as Pagination, j as hasIdOfLabel, T as Tabs, k as Tab, l as Badge, w as wrapper$2, q as queryPane, s as subPane, M as MediaPane, u as useMediaPaginationState, b as useQueryDataMutators, a as useFoundMediaMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators, m as extractLabelIds } from './MediaPane-fa665b62.js';
import { h as useSlot, m as API_ORGANISMS_BY_PHENOTYPES, n as API_MEDIA_BY_TAXON } from './paths-9c191287.js';
import { c as clone } from './clone-1fb93465.js';
import { c as createSimplePaletteValueFilter, C as CircularProgress } from './CircularProgress-5e108e03.js';
import { g as generateUtilityClass, c as generateUtilityClasses, h as styled, j as memoTheme, i as useDefaultProps, n as clsx, f as composeClasses } from './DefaultPropsProvider-0ba0cf40.js';
import { i as internal_createExtendSxProp, f as formControlState, A as Autocomplete, T as TextField, C as Chip, F as FormControl } from './TextField-940e7bf7.js';
import { S as Slider } from './Slider-927d1b36.js';
import './variables-58f3d1be.js';
import './isHostComponent-a8cd4d85.js';

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const v6Colors = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
const extendSxProp = internal_createExtendSxProp();
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
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  variants: [{
    props: {
      variant: 'inherit'
    },
    style: {
      // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
      font: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit'
    }
  }, ...Object.entries(theme.typography).filter(([variant, value]) => variant !== 'inherit' && value && typeof value === 'object').map(([variant, value]) => ({
    props: {
      variant
    },
    style: value
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  })), ...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === 'string').map(([color]) => ({
    props: {
      color: `text${capitalize(color)}`
    },
    style: {
      color: (theme.vars || theme).palette.text[color]
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.align !== 'inherit',
    style: {
      textAlign: 'var(--Typography-textAlign)'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.noWrap,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.gutterBottom,
    style: {
      marginBottom: '0.35em'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.paragraph,
    style: {
      marginBottom: 16
    }
  }]
})));
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
const Typography = /*#__PURE__*/reactExports.forwardRef(function Typography(inProps, ref) {
  const {
    color,
    ...themeProps
  } = useDefaultProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const isSxColor = !v6Colors[color];
  // TODO: Remove `extendSxProp` in v7
  const props = extendSxProp({
    ...themeProps,
    ...(isSxColor && {
      color
    })
  });
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;
  const ownerState = {
    ...props,
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  };
  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TypographyRoot, {
    as: Component,
    ref: ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState: ownerState,
    style: {
      ...(align !== 'inherit' && {
        '--Typography-textAlign': align
      }),
      ...other.style
    }
  });
});
var Typography$1 = Typography;

function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}
const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label', 'error', 'required', 'asterisk']);
var formControlLabelClasses$1 = formControlLabelClasses;

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
})(memoTheme(({
  theme
}) => ({
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
  },
  [`& .${formControlLabelClasses$1.label}`]: {
    [`&.${formControlLabelClasses$1.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled
    }
  },
  variants: [{
    props: {
      labelPlacement: 'start'
    },
    style: {
      flexDirection: 'row-reverse',
      marginRight: -11
    }
  }, {
    props: {
      labelPlacement: 'top'
    },
    style: {
      flexDirection: 'column-reverse'
    }
  }, {
    props: {
      labelPlacement: 'bottom'
    },
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      labelPlacement
    }) => labelPlacement === 'start' || labelPlacement === 'top' || labelPlacement === 'bottom',
    style: {
      marginLeft: 16 // used for row presentation of radio/checkbox
    }
  }]
})));
const AsteriskComponent = styled('span', {
  name: 'MuiFormControlLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk
})(memoTheme(({
  theme
}) => ({
  [`&.${formControlLabelClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
})));

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = /*#__PURE__*/reactExports.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  const {
    checked,
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label: labelProp,
    labelPlacement = 'end',
    name,
    onChange,
    required: requiredProp,
    slots = {},
    slotProps = {},
    value,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
  const required = requiredProp ?? control.props.required;
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
  const ownerState = {
    ...props,
    disabled,
    labelPlacement,
    required,
    error: fcs.error
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      ...componentsProps,
      ...slotProps
    }
  };
  const [TypographySlot, typographySlotProps] = useSlot('typography', {
    elementType: Typography$1,
    externalForwardedProps,
    ownerState
  });
  let label = labelProp;
  if (label != null && label.type !== Typography$1 && !disableTypography) {
    label = /*#__PURE__*/jsxRuntimeExports.jsx(TypographySlot, {
      component: "span",
      ...typographySlotProps,
      className: clsx(classes.label, typographySlotProps?.className),
      children: label
    });
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(FormControlLabelRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    ...other,
    children: [/*#__PURE__*/reactExports.cloneElement(control, controlProps), required ? /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      children: [label, /*#__PURE__*/jsxRuntimeExports.jsxs(AsteriskComponent, {
        ownerState: ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: ["\u2009", '*']
      })]
    }) : label]
  });
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
