import { ComponentMeta, ComponentStory } from "@storybook/react";
import { App } from "./App";
import { makeMswParameter } from "../../shared/utils/storybook";

export default {
  title: "Stanzas/MediumByGmid",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  gm_id: "M1470",
};

export const Result2 = Template.bind({});
Result2.args = {
  gm_id: "M439",
};

// export const Result3 = Template.bind({});
// Result3.args = {
//   gm_id: "GMO_001113",
// };
