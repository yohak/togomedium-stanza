import type { Preview } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../shared/components/muiTheme";
import { EmotionGlobalStyles } from "../shared/components/EmotionGlobalStyles";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#2A6A6F",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <ThemeProvider theme={muiTheme}>
          <EmotionGlobalStyles />
          <Story />
        </ThemeProvider>
      </RecoilRoot>
    ),
  ],
};

export default preview;
