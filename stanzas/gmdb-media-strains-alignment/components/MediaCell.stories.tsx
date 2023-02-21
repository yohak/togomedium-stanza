import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { MediaCell } from "./MediaCell";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(MediaCell.name, "MediaStrainAlignment"),
  component: MediaCell,
} as ComponentMeta<typeof MediaCell>;

const Template: ComponentStory<typeof MediaCell> = (args) => <MediaCell {...args} />;

const defaultArgs: ComponentProps<typeof MediaCell> = {
  label: "POTATO-SUCROSE AGAR",
  id: "JCM_333",
  size: 1,
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const LargeItem = Template.bind({});
LargeItem.args = { ...defaultArgs, size: 4 };

export const LongItem = Template.bind({});
LongItem.args = { ...defaultArgs, label: "Long long long text long long long text" };
