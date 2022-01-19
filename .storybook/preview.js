import { initialize, mswDecorator } from "msw-storybook-addon";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../components/muiTheme";
import { EmotionGlobalStyles } from "../components/EmotionGlobalStyles";
import React from "react";
initialize();
export const decorators = [
  mswDecorator,
  (Story) => (
    <RecoilRoot>
      <ThemeProvider theme={muiTheme}>
        <EmotionGlobalStyles />
        <Story />
      </ThemeProvider>
    </RecoilRoot>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "dark",
    values: [
      {
        name: "dark",
        value: "#2A6A6F",
      },
    ],
  },
};
