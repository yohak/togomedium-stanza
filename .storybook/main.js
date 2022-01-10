module.exports = {
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  features: {
    emotionAlias: false,
  },
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, "@emotion/babel-preset-css-prop"],
  }),
};
