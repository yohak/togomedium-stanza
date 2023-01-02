import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaTab } from "./MediaTab";
import { makeComponentStoryTitle } from "../../utils/storybook";

type WrapperProps = {} & ComponentProps<typeof MediaTab>;
const Wrapper: FC<WrapperProps> = (args) => {
  useEffect(() => {}, []);
  return <MediaTab {...args} />;
};

export default {
  title: makeComponentStoryTitle(MediaTab.name, "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

const defaultArgs: ComponentProps<typeof Wrapper> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
