import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { FoundMediaListOld } from "./FoundMediaListOld";
import { makeComponentStoryTitle } from "../../utils/storybook";

export default {
  title: makeComponentStoryTitle(FoundMediaListOld.name, "MediaFinder"),
  component: FoundMediaListOld,
} as ComponentMeta<typeof FoundMediaListOld>;

const Template: ComponentStory<typeof FoundMediaListOld> = (args) => (
  <FoundMediaListOld {...args} />
);

const defaultArgs: ComponentProps<typeof FoundMediaListOld> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
