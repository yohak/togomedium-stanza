import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { FilterIcon } from "./FilterIcon";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(FilterIcon.name, "icons"),
  component: FilterIcon,
} as ComponentMeta<typeof FilterIcon>;

const Template: ComponentStory<typeof FilterIcon> = (args) => <FilterIcon {...args} />;

const defaultArgs: ComponentProps<typeof FilterIcon> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
