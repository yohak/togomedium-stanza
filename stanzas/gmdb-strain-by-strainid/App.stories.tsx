import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { makeMswParameter } from "../../shared/utils/storybook";

export default {
  title: "Stanzas/StrainByStrainId",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = {
  strain_id: "S602",
};
