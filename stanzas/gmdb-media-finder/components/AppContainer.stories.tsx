import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { allComponentsMocks } from "../../../api/all-components/msw";
import { mediaByAttributesMocks } from "../../../api/media_by_attributes/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(AppContainer.name, "MediaFinder"),
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter([...allComponentsMocks, ...mediaByAttributesMocks]),
};
Primary.args = {};
