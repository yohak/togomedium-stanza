import { initialize, mswDecorator } from "msw-storybook-addon";
import { RecoilRoot } from "recoil";

initialize();
export const decorators = [
  mswDecorator,
  (Story) => (
    <RecoilRoot>
      <Story />
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
