import { r as reactExports, _ as _extends, T as ThemeContext$1 } from './index-56cafe6b.js';
import { u as useTheme, e as jsxRuntimeExports, T as ThemeContext, f as useTheme$1, g as createTheme, b as COLOR_PRIMARY, C as COLOR_WHITE, h as FONT_EN } from './EmotionCacheProvider-d698af90.js';

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
  const theme = reactExports.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /*#__PURE__*/jsxRuntimeExports.jsx(ThemeContext.Provider, {
    value: theme,
    children: children
  });
}

const EMPTY_THEME = {};
function InnerThemeProvider(props) {
  const theme = useTheme$1();
  return /*#__PURE__*/jsxRuntimeExports.jsx(ThemeContext$1.Provider, {
    value: typeof theme === 'object' ? theme : EMPTY_THEME,
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
  return /*#__PURE__*/jsxRuntimeExports.jsx(ThemeProvider$1, {
    theme: localTheme,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(InnerThemeProvider, {
      children: children
    })
  });
}

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
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    fontWeight: "500",
                },
            },
        },
        MuiButton: {
            styleOverrides: {},
        },
        MuiBadge: {
            styleOverrides: {
                root: {
                    paddingRight: "12px",
                    fontWeight: "500",
                },
            },
        },
    },
});

export { ThemeProvider as T, muiTheme as m };
//# sourceMappingURL=muiTheme-ace01225.js.map
