import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { makeMswParameter } from "../../shared/utils/storybook";

export default {
  title: "Stanzas/ComponentByGmoid",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  gmo_id: "GMO_001001",
};

export const Result2 = Template.bind({});
Result2.args = {
  gmo_id: "GMO_001018",
};
