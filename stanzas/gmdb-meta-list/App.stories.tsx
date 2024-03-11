import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";

export default {
  title: "Stanzas/MetaList",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Media = Template.bind({});
Media.args = {
  apiUrl: "http://togomedium.org/sparqlist/api/list_media",
  initialLimit: 20,
  title: "List Media",
  showColumnNames: true,
  columnSizes: [15, 15, 70],
  webFont: "Fira Sans Condensed",
};

export const Strains = Template.bind({});
Strains.args = {
  apiUrl: "http://togomedium.org/sparqlist/api/list_strains",
  initialLimit: 20,
  title: "List Media",
  showColumnNames: true,
  columnSizes: [15, 15, 70],
  webFont: "Fira Sans Condensed",
};
export const Components = Template.bind({});
Components.args = {
  apiUrl: "http://togomedium.org/sparqlist/api/list_components",
  initialLimit: 100,
  title: "List Media",
  showColumnNames: true,
  columnSizes: [15, 15, 70],
  webFont: "Fira Sans Condensed",
};
