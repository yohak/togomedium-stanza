import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { allComponentsMocks } from "../../../api/all-components/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("AppContainer", "MediaFinder"),
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter(allComponentsMocks),
};
Primary.args = {};
