module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-addon-paddings"],
  framework: "@storybook/react",
  features: {
    emotionAlias: false,
  },
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, "@emotion/babel-preset-css-prop"],
  }),
  typescript: {
    reactDocgen: "react-docgen-typescript-plugin",
  },
};
