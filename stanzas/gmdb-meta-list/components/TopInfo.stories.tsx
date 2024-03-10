import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TopInfo } from "./TopInfo";

export default {
  title: TopInfo.name,
  component: TopInfo,
} as ComponentMeta<typeof TopInfo>;

const Template: ComponentStory<typeof TopInfo> = (args) => <TopInfo {...args} />;

const defaultArgs: ComponentProps<typeof TopInfo> = {
  total: 999,
  limit: 20,
  setOffset: () => {},
  setLimit: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
