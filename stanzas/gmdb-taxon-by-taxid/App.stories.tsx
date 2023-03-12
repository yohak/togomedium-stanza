import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";

export default {
  title: "Stanzas/TaxonByTaxid",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  tax_id: "315405",
};

export const Result2 = Template.bind({});
Result2.args = {
  tax_id: "1301",
};

export const Result3 = Template.bind({});
Result3.args = {
  tax_id: "1300",
};
