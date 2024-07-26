import type { Preview } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../shared/components/muiTheme";
import { EmotionGlobalStyles } from "../shared/components/EmotionGlobalStyles";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
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
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          <ThemeProvider theme={muiTheme}>
            <EmotionGlobalStyles />
            <Story />
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
