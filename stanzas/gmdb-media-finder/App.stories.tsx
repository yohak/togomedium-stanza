import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { mediaByAttributesMocks } from "../../api/media_by_attributes/msw";
import { taxonomyChildrenMocks } from "../../api/taxonomy_children/msw";
import { makeMswParameter } from "../../utils/storybook";

export default {
  title: "Stanzas/MediaFinder",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const Result1 = Template.bind({});
Result1.args = {
  gmids: ["HM_D00001a", "HM_D00065"],
};

Result1.parameters = {
  msw: makeMswParameter([...mediaByAttributesMocks, ...taxonomyChildrenMocks]),
};
