import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { makeMswParameter } from "../../shared/utils/storybook";

export default {
  title: "Stanzas/SimilarMediaNode",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  gmId: "M2294",
};

export const Result2 = Template.bind({});
Result2.args = {
  gmId: "M1015",
};

export const Result3 = Template.bind({});
Result3.args = {
  gmId: "M2293",
};
