import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";

export default {
  title: "Stanzas/MetaList",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  apiUrl: "http://togomedium.org/sparqlist/api/list_strains",
  initialLimit: 20,
  title: "GMDB",
  showColumnNames: true,
  columnSizes: [15, 15, 70],
  webFont: "Fira Sans Condensed",
};
